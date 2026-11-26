/* =============================================================================
   LÕI KẾT NỐI MÁY CHỦ (SUPABASE REST) — SỔ CĐHA, Bệnh viện Vĩnh Phúc VPI
   Phát triển bởi: Vũ Đạt
   - Không dùng thư viện ngoài: toàn bộ gọi bằng fetch tới /auth/v1, /rest/v1, /storage/v1
     → CSP chặt, chạy được offline (PWA), không phụ thuộc CDN.
   - Mật khẩu KHÔNG bao giờ lưu ở trình duyệt; chỉ lưu token phiên (tự làm mới).
   - Quyền Admin / nhân viên do MÁY CHỦ kiểm tra (Row Level Security trong schema.sql);
     giao diện chỉ ẩn/hiện nút cho tiện.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.VPI_CONFIG || {};
  var BASE = String(C.SUPABASE_URL || "").replace(/\/+$/, "");
  var KEY_SESSION = "vpi_cdha_session_v1";
  var KEY_PROFILE = "vpi_cdha_profile_v1";
  var KEY_OVERRIDES = "vpi_cdha_overrides_v1";

  var state = { session: null, profile: null, overrides: {}, base: {}, offline: false };
  var listeners = {};

  function on(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); }
  function emit(ev, data) {
    (listeners[ev] || []).forEach(function (f) { try { f(data); } catch (e) { console.error(e); } });
  }
  function configured() { return !!(BASE && C.SUPABASE_ANON_KEY); }

  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

  /* ------------------------------------------------------------------ HTTP -- */
  var refreshing = null;

  function parseSession(d) {
    return {
      access_token: d.access_token,
      refresh_token: d.refresh_token,
      expires_at: d.expires_at || (Math.floor(Date.now() / 1000) + (d.expires_in || 3600)),
      user: d.user ? { id: d.user.id } : (state.session && state.session.user)
    };
  }

  function refresh() {
    if (refreshing) return refreshing;
    if (!state.session || !state.session.refresh_token) return Promise.resolve(false);
    refreshing = fetch(BASE + "/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      headers: { apikey: C.SUPABASE_ANON_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: state.session.refresh_token })
    }).then(function (r) {
      if (r.status >= 500) throw new Error("net");
      return r.ok ? r.json() : null;
    }).then(function (d) {
      if (!d || !d.access_token) { clearSession(); emit("signedout", { reason: "expired" }); return false; }
      state.session = parseSession(d);
      lsSet(KEY_SESSION, state.session);
      return true;
    }).catch(function () { return false; }).then(function (ok) { refreshing = null; return ok; });
    return refreshing;
  }

  function clearSession() {
    state.session = null; state.profile = null;
    lsDel(KEY_SESSION); lsDel(KEY_PROFILE);
  }

  function freshToken() {
    if (!state.session) return Promise.resolve(C.SUPABASE_ANON_KEY);
    if (state.session.expires_at - Date.now() / 1000 < 60) {
      return refresh().then(function () { return state.session ? state.session.access_token : C.SUPABASE_ANON_KEY; });
    }
    return Promise.resolve(state.session.access_token);
  }

  /* o: {method, body, rawBody, headers, anon, retried, base, count} */
  function http(path, o) {
    o = o || {};
    return (o.anon ? Promise.resolve(C.SUPABASE_ANON_KEY) : freshToken()).then(function (tok) {
      var h = { apikey: C.SUPABASE_ANON_KEY };
      // Khóa publishable (sb_publishable_...) không phải JWT → chỉ gửi qua apikey, không đặt vào Authorization
      if (tok && tok !== C.SUPABASE_ANON_KEY) h.Authorization = "Bearer " + tok;
      if (o.body !== undefined && !o.rawBody) h["Content-Type"] = "application/json";
      for (var k in (o.headers || {})) h[k] = o.headers[k];
      return fetch((o.base || BASE) + path, {
        method: o.method || "GET",
        headers: h,
        body: o.body === undefined ? undefined : (o.rawBody ? o.body : JSON.stringify(o.body))
      });
    }).then(function (r) {
      if (r.status === 401 && !o.anon && !o.retried && state.session) {
        return refresh().then(function (ok) {
          if (ok) return http(path, Object.assign({}, o, { retried: true }));
          return r.text().then(function () { return { ok: false, status: 401, data: null, headers: r.headers }; });
        });
      }
      return r.text().then(function (t) {
        var d = null;
        try { d = t ? JSON.parse(t) : null; } catch (e) { d = t; }
        return { ok: r.ok, status: r.status, data: d, headers: r.headers };
      });
    });
  }

  function errMsg(r, fallback) {
    var d = r && r.data;
    if (d && typeof d === "object") {
      var m = d.message || d.msg || d.error_description || d.error || d.hint;
      if (m && /row-level security|violates|permission denied/i.test(String(m))) return "Bạn không có quyền thực hiện thao tác này.";
      if (m && /duplicate key|already exists/i.test(String(m))) return "Dữ liệu đã tồn tại.";
      if (m && /Password should|weak_password/i.test(String(m) + (d.error_code || ""))) return "Mật khẩu quá yếu (tối thiểu 8 ký tự, có chữ và số).";
    }
    return fallback || "Có lỗi xảy ra, vui lòng thử lại.";
  }

  function netFail() { return { ok: false, message: "Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại." }; }

  /* ------------------------------------------------------------------ AUTH -- */
  function toEmail(id) {
    id = String(id || "").trim().toLowerCase();
    return id.indexOf("@") > -1 ? id : id + "@" + (C.USERNAME_DOMAIN || "cdha-vpi.example.com");
  }

  function loadProfile() {
    if (!state.session || !state.session.user) return Promise.resolve(null);
    return http("/rest/v1/profiles?select=*&id=eq." + encodeURIComponent(state.session.user.id)).then(function (r) {
      if (r.ok && r.data && r.data[0]) {
        state.profile = r.data[0];
        lsSet(KEY_PROFILE, state.profile);
        return state.profile;
      }
      if (r.ok) return null;          // phiên hợp lệ nhưng không có hồ sơ (đã bị xóa)
      throw new Error("net");          // lỗi mạng/máy chủ → để nơi gọi quyết định dùng bản offline
    });
  }

  function signIn(identifier, password) {
    if (!configured()) return Promise.resolve({ ok: false, message: "Ứng dụng chưa được kết nối máy chủ." });
    if (!identifier || !password) return Promise.resolve({ ok: false, message: "Vui lòng nhập tên đăng nhập và mật khẩu." });
    return http("/auth/v1/token?grant_type=password", {
      method: "POST", anon: true, body: { email: toEmail(identifier), password: password }
    }).then(function (r) {
      if (!r.ok) {
        // Thông báo chung, không tiết lộ tài khoản có tồn tại hay không
        if (r.status >= 500) return { ok: false, message: "Máy chủ đang bận, thử lại sau ít phút." };
        if (r.status === 429) return { ok: false, message: "Thử quá nhiều lần. Vui lòng đợi vài phút." };
        return { ok: false, message: "Tên đăng nhập hoặc mật khẩu không đúng." };
      }
      state.session = parseSession(r.data);
      lsSet(KEY_SESSION, state.session);
      return loadProfile().then(function (p) {
        if (!p) { return signOut().then(function () { return { ok: false, message: "Tài khoản chưa có hồ sơ. Vui lòng liên hệ Admin." }; }); }
        if (p.status !== "active") { return signOut().then(function () { return { ok: false, message: "Tài khoản đã bị khóa. Vui lòng liên hệ Admin." }; }); }
        state.offline = false;
        return loadOverrides().then(function () { emit("signedin", p); return { ok: true, profile: p }; });
      });
    }).catch(netFail);
  }

  function restoreSession() {
    if (!configured()) return Promise.resolve(false);
    var s = lsGet(KEY_SESSION);
    if (!s || !s.refresh_token) return Promise.resolve(false);
    state.session = s;
    var cachedProfile = lsGet(KEY_PROFILE);
    return freshToken().then(function () {
      if (!state.session) return false;
      return loadProfile();
    }).then(function (p) {
      if (p === false) return false;
      if (p) {
        if (p.status !== "active") { clearSession(); return false; }
        state.offline = false;
        return loadOverrides().then(function () { return true; });
      }
      clearSession();                  // không còn hồ sơ trên máy chủ
      return false;
    }).catch(function () {
      // Mất mạng / máy chủ lỗi → xem offline bằng bản hồ sơ đã lưu (chỉ đọc, không có quyền Admin)
      if (cachedProfile && state.session && cachedProfile.id === state.session.user.id && cachedProfile.status === "active") {
        state.profile = cachedProfile; state.offline = true; applyCachedOverrides(); return true;
      }
      return false;
    });
  }

  function signOut() {
    var tok = state.session && state.session.access_token;
    var p = Promise.resolve();
    if (tok) {
      p = fetch(BASE + "/auth/v1/logout", {
        method: "POST", headers: { apikey: C.SUPABASE_ANON_KEY, Authorization: "Bearer " + tok }
      }).catch(function () {});
    }
    clearSession();
    return p.then(function () { emit("signedout", { reason: "manual" }); });
  }

  function validPassword(pw) {
    if (!pw || pw.length < 8) return "Mật khẩu tối thiểu 8 ký tự.";
    if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return "Mật khẩu cần có cả chữ và số.";
    return "";
  }

  function changePassword(oldPw, newPw) {
    var bad = validPassword(newPw);
    if (bad) return Promise.resolve({ ok: false, message: bad });
    if (oldPw === newPw) return Promise.resolve({ ok: false, message: "Mật khẩu mới phải khác mật khẩu cũ." });
    if (!state.profile) return Promise.resolve({ ok: false, message: "Chưa đăng nhập." });
    // Xác minh mật khẩu hiện tại bằng cách đăng nhập lại (không thay phiên hiện tại)
    return http("/auth/v1/token?grant_type=password", {
      method: "POST", anon: true, body: { email: toEmail(state.profile.username), password: oldPw }
    }).then(function (r) {
      if (!r.ok) return { ok: false, message: "Mật khẩu hiện tại không đúng." };
      return http("/auth/v1/user", { method: "PUT", body: { password: newPw } }).then(function (u) {
        if (!u.ok) return { ok: false, message: errMsg(u, "Không đổi được mật khẩu.") };
        return updateProfile({ must_change_password: false }).then(function () { return { ok: true }; });
      });
    }).catch(netFail);
  }

  /* --------------------------------------------------------------- PROFILE -- */
  var PROFILE_FIELDS = ["full_name", "title", "department", "phone", "contact_email", "bio", "avatar_url", "must_change_password"];

  function pick(obj, fields) {
    var out = {};
    fields.forEach(function (f) { if (obj[f] !== undefined) out[f] = obj[f]; });
    return out;
  }

  function updateProfile(patch) {
    if (!state.profile) return Promise.resolve({ ok: false, message: "Chưa đăng nhập." });
    var body = pick(patch, PROFILE_FIELDS);
    return http("/rest/v1/profiles?id=eq." + encodeURIComponent(state.profile.id), {
      method: "PATCH", body: body, headers: { Prefer: "return=representation" }
    }).then(function (r) {
      if (!r.ok || !r.data || !r.data[0]) return { ok: false, message: errMsg(r, "Không lưu được hồ sơ.") };
      state.profile = r.data[0]; lsSet(KEY_PROFILE, state.profile);
      emit("profile", state.profile);
      return { ok: true, profile: state.profile };
    }).catch(netFail);
  }

  /* ---------------------------------------------------------------- MEDIA ---- */
  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("decode")); };
      img.src = url;
    });
  }

  /* Thu nhỏ & chuyển JPEG ở trình duyệt: giảm dung lượng, và bỏ metadata (EXIF/GPS) của ảnh chụp. */
  function resizeImage(file, maxDim, quality, square) {
    if (!file || !/^image\//.test(file.type)) return Promise.reject(new Error("type"));
    if (file.size > 20 * 1024 * 1024) return Promise.reject(new Error("size"));
    return loadImage(file).then(function (img) {
      var w = img.naturalWidth, h = img.naturalHeight, sx = 0, sy = 0, sw = w, sh = h;
      if (square) { var s = Math.min(w, h); sx = (w - s) / 2; sy = (h - s) / 2; sw = sh = s; }
      var scale = Math.min(1, maxDim / Math.max(sw, sh));
      var cw = Math.max(1, Math.round(sw * scale)), ch = Math.max(1, Math.round(sh * scale));
      var cv = document.createElement("canvas");
      cv.width = cw; cv.height = ch;
      var ctx = cv.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      return new Promise(function (resolve, reject) {
        cv.toBlob(function (b) { b ? resolve(b) : reject(new Error("encode")); }, "image/jpeg", quality);
      });
    });
  }

  function randId() {
    var a = new Uint8Array(8);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.prototype.map.call(a, function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
  }

  function publicUrl(path) { return BASE + "/storage/v1/object/public/cdha-media/" + path; }

  function uploadBlob(path, blob) {
    return http("/storage/v1/object/cdha-media/" + path, {
      method: "POST", rawBody: true, body: blob, headers: { "Content-Type": blob.type || "image/jpeg", "x-upsert": "false" }
    }).then(function (r) {
      if (!r.ok) return { ok: false, message: errMsg(r, "Không tải được ảnh lên.") };
      return { ok: true, path: path, url: publicUrl(path) };
    }).catch(netFail);
  }

  function deleteMedia(path) {
    return http("/storage/v1/object/cdha-media", { method: "DELETE", body: { prefixes: [path] } }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  function imgErr(e) {
    var m = e && e.message;
    if (m === "size") return "Ảnh quá lớn (tối đa 20 MB).";
    if (m === "type") return "Tệp không phải ảnh.";
    return "Không đọc được ảnh (định dạng không hỗ trợ).";
  }

  function uploadAvatar(file) {
    if (!state.profile) return Promise.resolve({ ok: false, message: "Chưa đăng nhập." });
    var old = state.profile.avatar_url || "";
    return resizeImage(file, 320, 0.88, true).then(function (blob) {
      var path = "avatars/" + state.profile.id + "/" + Date.now() + "-" + randId() + ".jpg";
      return uploadBlob(path, blob).then(function (u) {
        if (!u.ok) return u;
        return updateProfile({ avatar_url: u.url }).then(function (r) {
          var m = old.indexOf("/object/public/cdha-media/") > -1 ? old.split("/object/public/cdha-media/")[1] : "";
          if (r.ok && m) deleteMedia(m);
          return r;
        });
      });
    }, function (e) { return { ok: false, message: imgErr(e) }; });
  }

  function uploadContentImage(file) {
    return resizeImage(file, 1600, 0.86, false).then(function (blob) {
      var d = new Date();
      var path = "content/" + d.getFullYear() + "/" + Date.now() + "-" + randId() + ".jpg";
      return uploadBlob(path, blob);
    }, function (e) { return { ok: false, message: imgErr(e) }; });
  }

  /* ------------------------------------------------- GHI ĐÈ NỘI DUNG (ADMIN) --
     docKey:  "SOTAY_QUYTRINH#xq-so-thang"   (phần tử trong mảng, tìm theo id → lưu các trường đã đổi)
              "SOTAY_TAIBIEN.phanVe"        (khóa cấp 1 của đối tượng → lưu toàn bộ giá trị)          */
  var ROOT_KIND = {
    SOTAY_QUYTRINH: "arr", SOTAY_SIEUAM: "arr", SOTAY_CANTHIEP: "arr",
    SOTAY_TAIBIEN: "obj", SOTAY_DOLOANGXUONG: "obj", SOTAY_THUOCCANQUANG: "obj", SOTAY_CONGCU: "obj",
    SOTAY_CT_CHECKLISTS_MAP: "obj", SOTAY_MRIMASTER: "obj", SOTAY_CLINICAL_KNOWLEDGE: "obj"
  };

  function parseKey(docKey) {
    var m = /^([A-Z_]+)([#.])(.+)$/.exec(String(docKey || ""));
    if (!m || !ROOT_KIND[m[1]]) return null;
    var root = window[m[1]];
    if (!root) return null;
    if (m[2] === "#" && ROOT_KIND[m[1]] !== "arr") return null;
    if (m[2] === "." && ROOT_KIND[m[1]] !== "obj") return null;
    return { rootName: m[1], root: root, kind: ROOT_KIND[m[1]], id: m[3] };
  }

  function arrIndex(arr, id) {
    for (var i = 0; i < arr.length; i++) if (arr[i] && arr[i].id === id) return i;
    return -1;
  }

  /* Giá trị hiện hành (đã gồm ghi đè) — bản sao an toàn để sửa */
  function getDoc(docKey) {
    var p = parseKey(docKey);
    if (!p) return undefined;
    if (p.kind === "arr") { var i = arrIndex(p.root, p.id); return i < 0 ? undefined : clone(p.root[i]); }
    return typeof p.root[p.id] === "function" ? undefined : clone(p.root[p.id]);
  }

  /* Giá trị GỐC (trước khi áp ghi đè) */
  function getBase(docKey) {
    if (state.base.hasOwnProperty(docKey)) return clone(state.base[docKey]);
    return getDoc(docKey);
  }

  function applyOne(docKey, value) {
    var p = parseKey(docKey);
    if (!p) return false;
    if (!state.base.hasOwnProperty(docKey)) state.base[docKey] = getDoc(docKey);
    if (p.kind === "arr") {
      var i = arrIndex(p.root, p.id);
      if (i < 0) return false;
      var merged = clone(state.base[docKey]);
      for (var k in value) { if (k !== "id") merged[k] = clone(value[k]); }
      p.root[i] = merged;
    } else {
      p.root[p.id] = clone(value);
    }
    return true;
  }

  function revertOne(docKey) {
    if (!state.base.hasOwnProperty(docKey)) return;
    var p = parseKey(docKey);
    if (!p) return;
    if (p.kind === "arr") { var i = arrIndex(p.root, p.id); if (i >= 0) p.root[i] = clone(state.base[docKey]); }
    else p.root[p.id] = clone(state.base[docKey]);
    delete state.base[docKey];
  }

  function applyAll(rows) {
    // Đưa mọi bản ghi cũ về gốc trước, rồi áp lại (xử lý trường hợp Admin khác vừa khôi phục)
    Object.keys(state.overrides).forEach(function (k) { if (!rows[k]) revertOne(k); });
    state.overrides = rows;
    Object.keys(rows).forEach(function (k) {
      if (state.base.hasOwnProperty(k)) revertOne(k);
      applyOne(k, rows[k].value);
    });
  }

  function applyCachedOverrides() {
    var c = lsGet(KEY_OVERRIDES);
    if (c && typeof c === "object") applyAll(c);
  }

  function loadOverrides() {
    return http("/rest/v1/content_overrides?select=doc_key,value,updated_by_name,updated_at").then(function (r) {
      if (!r.ok || !Array.isArray(r.data)) { applyCachedOverrides(); return false; }
      var rows = {};
      r.data.forEach(function (x) { rows[x.doc_key] = { value: x.value, by: x.updated_by_name, at: x.updated_at }; });
      applyAll(rows);
      lsSet(KEY_OVERRIDES, rows);
      return true;
    }).catch(function () { applyCachedOverrides(); return false; });
  }

  /* Nạp lại nội dung từ máy chủ (khi Admin khác vừa sửa). Tối đa 1 lần / 2 phút; chỉ báo khi có thay đổi. */
  var lastContentSync = Date.now();
  function refreshContent() {
    if (!state.profile || state.offline || Date.now() - lastContentSync < 120000) return Promise.resolve(false);
    lastContentSync = Date.now();
    var before = JSON.stringify(Object.keys(state.overrides).sort().map(function (k) { return [k, state.overrides[k].at]; }));
    return loadOverrides().then(function () {
      var after = JSON.stringify(Object.keys(state.overrides).sort().map(function (k) { return [k, state.overrides[k].at]; }));
      if (before !== after) { emit("contentchanged", null); return true; }
      return false;
    });
  }

  function isEdited(docKey) { return !!state.overrides[docKey]; }
  function editInfo(docKey) { return state.overrides[docKey] || null; }

  function saveDoc(docKey, full) {
    if (!isAdmin()) return Promise.resolve({ ok: false, message: "Chỉ Admin được chỉnh sửa nội dung." });
    var p = parseKey(docKey);
    if (!p) return Promise.resolve({ ok: false, message: "Mục này không chỉnh sửa được." });
    var base = getBase(docKey);
    var value;
    if (p.kind === "arr") {
      value = {};
      Object.keys(full).forEach(function (k) { if (k !== "id" && !same(full[k], base[k])) value[k] = full[k]; });
      if (!Object.keys(value).length) return restoreDoc(docKey);
    } else {
      if (same(full, base)) return restoreDoc(docKey);
      value = full;
    }
    return http("/rest/v1/content_overrides?on_conflict=doc_key", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: { doc_key: docKey, value: value, updated_by_name: state.profile.full_name }
    }).then(function (r) {
      if (!r.ok) return { ok: false, message: errMsg(r, "Không lưu được nội dung.") };
      if (state.base.hasOwnProperty(docKey)) revertOne(docKey);
      state.overrides[docKey] = { value: value, by: state.profile.full_name, at: new Date().toISOString() };
      applyOne(docKey, value);
      lsSet(KEY_OVERRIDES, state.overrides);
      emit("contentchanged", docKey);
      return { ok: true };
    }).catch(netFail);
  }

  function restoreDoc(docKey) {
    if (!isAdmin()) return Promise.resolve({ ok: false, message: "Chỉ Admin được thực hiện." });
    return http("/rest/v1/content_overrides?doc_key=eq." + encodeURIComponent(docKey), { method: "DELETE" }).then(function (r) {
      if (!r.ok) return { ok: false, message: errMsg(r, "Không khôi phục được.") };
      revertOne(docKey);
      delete state.overrides[docKey];
      lsSet(KEY_OVERRIDES, state.overrides);
      emit("contentchanged", docKey);
      return { ok: true };
    }).catch(netFail);
  }

  function listHistory(docKey) {
    return http("/rest/v1/content_history?select=id,action,actor_name,created_at&doc_key=eq." + encodeURIComponent(docKey) + "&order=created_at.desc&limit=20")
      .then(function (r) { return r.ok ? r.data : []; }).catch(function () { return []; });
  }

  /* ------------------------------------------------------------- GÓP Ý ------- */
  function countOf(path) {
    return http(path + (path.indexOf("?") > -1 ? "&" : "?") + "select=id", {
      headers: { Prefer: "count=exact", Range: "0-0" }
    }).then(function (r) {
      var cr = r.headers && r.headers.get("content-range");
      var n = cr ? parseInt(cr.split("/")[1], 10) : 0;
      return isNaN(n) ? 0 : n;
    }).catch(function () { return 0; });
  }

  function sendFeedback(f) {
    return http("/rest/v1/feedback", {
      method: "POST", headers: { Prefer: "return=minimal" },
      body: {
        sender_name: f.sender_name, phone: f.phone || null, category: f.category,
        protocol: f.protocol || null, message: f.message
      }
    }).then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r, "Không gửi được góp ý.") }; }).catch(netFail);
  }

  function listFeedback(mineOnly) {
    var q = "/rest/v1/feedback?select=*&order=created_at.desc&limit=300";
    if (mineOnly && state.profile) q += "&user_id=eq." + encodeURIComponent(state.profile.id);
    return http(q).then(function (r) { return r.ok && Array.isArray(r.data) ? r.data : []; }).catch(function () { return []; });
  }

  function updateFeedback(id, patch) {
    return http("/rest/v1/feedback?id=eq." + encodeURIComponent(id), {
      method: "PATCH", body: patch, headers: { Prefer: "return=minimal" }
    }).then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r) }; }).catch(netFail);
  }

  function deleteFeedback(id) {
    return http("/rest/v1/feedback?id=eq." + encodeURIComponent(id), { method: "DELETE" })
      .then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r) }; }).catch(netFail);
  }

  /* Thăm dò thông báo: Admin → góp ý mới; nhân viên → phản hồi mới của Admin. */
  var poll = { timer: null, lastAdmin: null, lastMine: null };

  function checkNotifications() {
    if (!state.profile || state.offline || !state.session) return Promise.resolve();
    var jobs = [countOf("/rest/v1/feedback?user_id=eq." + encodeURIComponent(state.profile.id) + "&user_seen=eq.false")];
    if (isAdmin()) jobs.push(countOf("/rest/v1/feedback?status=eq.new"), countOf("/rest/v1/account_requests?status=eq.pending"));
    return Promise.all(jobs).then(function (c) {
      var n = { mine: c[0], adminNew: c[1] || 0, requests: c[2] || 0 };
      var fresh = {
        mine: poll.lastMine !== null && n.mine > poll.lastMine,
        adminNew: poll.lastAdmin !== null && n.adminNew > poll.lastAdmin
      };
      poll.lastMine = n.mine; poll.lastAdmin = n.adminNew;
      emit("notify", { counts: n, fresh: fresh });
    });
  }

  function startPolling() {
    stopPolling();
    poll.lastAdmin = null; poll.lastMine = null;
    checkNotifications();
    poll.timer = setInterval(function () { if (!document.hidden) checkNotifications(); }, 60000);
  }
  function stopPolling() { if (poll.timer) clearInterval(poll.timer); poll.timer = null; }
  document.addEventListener("visibilitychange", function () { if (!document.hidden && poll.timer) checkNotifications(); });

  /* -------------------------------------------------- QUẢN TRỊ TÀI KHOẢN ------ */
  function isAdmin() { return !!(state.profile && state.profile.role === "admin" && state.profile.status === "active" && !state.offline); }

  function listUsers() {
    return http("/rest/v1/profiles?select=*&order=full_name.asc").then(function (r) { return r.ok && Array.isArray(r.data) ? r.data : []; }).catch(function () { return []; });
  }

  function adminUpdateUser(id, patch) {
    var body = pick(patch, ["full_name", "title", "department", "phone"]);
    return http("/rest/v1/profiles?id=eq." + encodeURIComponent(id), { method: "PATCH", body: body, headers: { Prefer: "return=minimal" } })
      .then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r) }; }).catch(netFail);
  }

  function adminApi(payload) {
    return freshToken().then(function (tok) {
      return fetch("/api/admin-users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok },
        body: JSON.stringify(payload)
      });
    }).then(function (r) {
      return r.text().then(function (t) {
        var d = {}; try { d = JSON.parse(t); } catch (e) {}
        if (r.ok && d.ok) return d;
        return { ok: false, message: d.error || ("Lỗi máy chủ (" + r.status + ")") };
      });
    }).catch(netFail);
  }

  /* Admin cấp lại mật khẩu tạm (hàm trong cơ sở dữ liệu tự kiểm tra quyền Admin) */
  function resetPassword(userId) {
    return http("/rest/v1/rpc/cdha_admin_reset_password", { method: "POST", body: { target: userId } }).then(function (r) {
      if (r.ok && typeof r.data === "string") return { ok: true, temp_password: r.data };
      if (r.status === 404) return { ok: false, message: "Máy chủ chưa có chức năng này. Hãy chạy tools/update-quen-mat-khau.sql trong Supabase." };
      return { ok: false, message: errMsg(r, "Không đặt lại được mật khẩu.") };
    }).catch(netFail);
  }

  function submitAccountRequest(d) {
    if (!configured()) return Promise.resolve({ ok: false, message: "Ứng dụng chưa được kết nối máy chủ." });
    return http("/rest/v1/account_requests", {
      method: "POST", anon: true, headers: { Prefer: "return=minimal" },
      body: Object.assign({
        full_name: d.full_name, phone: d.phone || null, department: d.department || null,
        desired_username: d.desired_username || null, note: d.note || null
      }, d.kind === "reset" ? { kind: "reset" } : {})
    }).then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r, "Không gửi được yêu cầu.") }; }).catch(netFail);
  }

  function listRequests() {
    return http("/rest/v1/account_requests?select=*&order=created_at.desc&limit=100").then(function (r) { return r.ok && Array.isArray(r.data) ? r.data : []; }).catch(function () { return []; });
  }
  function updateRequest(id, status) {
    return http("/rest/v1/account_requests?id=eq." + encodeURIComponent(id), { method: "PATCH", body: { status: status }, headers: { Prefer: "return=minimal" } })
      .then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r) }; }).catch(netFail);
  }
  function deleteRequest(id) {
    return http("/rest/v1/account_requests?id=eq." + encodeURIComponent(id), { method: "DELETE" })
      .then(function (r) { return r.ok ? { ok: true } : { ok: false, message: errMsg(r) }; }).catch(netFail);
  }

  /* Gợi ý tên đăng nhập: "Nguyễn Duy Hạnh" → "hanh.nd" */
  function suggestUsername(fullName) {
    var s = String(fullName || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
      .toLowerCase().replace(/[^a-z\s]/g, " ").trim().split(/\s+/).filter(Boolean);
    if (!s.length) return "";
    var given = s[s.length - 1];
    var ini = s.slice(0, -1).map(function (w) { return w.charAt(0); }).join("");
    return ini ? given + "." + ini : given;
  }

  /* Danh mục các tài liệu có thể chỉnh sửa (ngoài các quy trình xem theo từng bài) */
  function docCatalog() {
    var out = [];
    function addObj(root, label, keys) {
      keys.forEach(function (k) {
        var key = root + "." + k;
        if (getDoc(key) !== undefined) out.push({ key: key, label: label[k] || k, group: label._g });
      });
    }
    addObj("SOTAY_TAIBIEN", { _g: "Tai biến & Cấp cứu", phanVe: "Phản vệ (TT 51/2017)", thoatMach: "Thoát mạch", anToanMRI: "An toàn MRI", cpr: "Hồi sinh tim phổi (CPR)" }, ["phanVe", "thoatMach", "anToanMRI", "cpr"]);
    addObj("SOTAY_DOLOANGXUONG", { _g: "Đo loãng xương", thongTinChung: "Thông tin chung DEXA", chiDinhChongChiDinh: "Chỉ định / Chống chỉ định", quyTrinhDatTuTheVaRoi: "Đặt tư thế & ROI", tieuChuanChanDoanWHO: "Tiêu chuẩn WHO", congCuFRAX: "FRAX" }, ["thongTinChung", "chiDinhChongChiDinh", "quyTrinhDatTuTheVaRoi", "tieuChuanChanDoanWHO", "congCuFRAX"]);
    addObj("SOTAY_THUOCCANQUANG", { _g: "Thuốc cản quang", thuocCT: "Thuốc cản quang CT", thuocMRI: "Thuốc đối quang từ MRI", anToanChucNangThan: "An toàn chức năng thận", phacDoTienMe: "Phác đồ tiền mê" }, ["thuocCT", "thuocMRI", "anToanChucNangThan", "phacDoTienMe"]);
    addObj("SOTAY_CONGCU", { _g: "Công cụ tính liều", lieuCanQuang: "Liều cản quang CT (tham số máy tính)", lieuCCTA: "Liều CCTA (tham số máy tính)" }, ["lieuCanQuang", "lieuCCTA"]);
    addObj("SOTAY_MRIMASTER", { _g: "MRI Master", bangDoiChieuHang: "Đối chiếu 3 hãng MRI", quyTrinhLapKeHoach: "Hướng đặt cắt MRI" }, ["bangDoiChieuHang", "quyTrinhLapKeHoach"]);
    addObj("SOTAY_CLINICAL_KNOWLEDGE", { _g: "Tri thức nền", geSignaExplorerVPI: "GE SIGNA Explorer 1.5T", siemensAcademy: "Siemens Academy", principlesByModality: "Nguyên lý theo kỹ thuật", ktv3MienLectures: "Bài giảng KTV 3 Miền" }, ["geSignaExplorerVPI", "siemensAcademy", "principlesByModality", "ktv3MienLectures"]);
    if (window.SOTAY_CT_CHECKLISTS_MAP) {
      Object.keys(window.SOTAY_CT_CHECKLISTS_MAP).forEach(function (k) {
        var v = window.SOTAY_CT_CHECKLISTS_MAP[k];
        if (v && typeof v === "object") out.push({ key: "SOTAY_CT_CHECKLISTS_MAP." + k, label: v.ten || k, group: "Bảng kiểm CT" });
      });
    }
    return out;
  }

  window.VPI = {
    config: C,
    configured: configured,
    on: on,
    state: state,
    isAdmin: isAdmin,
    profile: function () { return state.profile; },
    isOffline: function () { return state.offline; },
    signIn: signIn, signOut: signOut, restoreSession: restoreSession,
    changePassword: changePassword, validPassword: validPassword,
    updateProfile: updateProfile, uploadAvatar: uploadAvatar, uploadContentImage: uploadContentImage, deleteMedia: deleteMedia,
    getDoc: getDoc, getBase: getBase, saveDoc: saveDoc, restoreDoc: restoreDoc, isEdited: isEdited, editInfo: editInfo,
    listHistory: listHistory, docCatalog: docCatalog, applyCachedOverrides: applyCachedOverrides, refreshContent: refreshContent,
    sendFeedback: sendFeedback, listFeedback: listFeedback, updateFeedback: updateFeedback, deleteFeedback: deleteFeedback,
    checkNotifications: checkNotifications, startPolling: startPolling, stopPolling: stopPolling,
    listUsers: listUsers, adminUpdateUser: adminUpdateUser, adminApi: adminApi,
    resetPassword: resetPassword, submitAccountRequest: submitAccountRequest, listRequests: listRequests, updateRequest: updateRequest, deleteRequest: deleteRequest,
    suggestUsername: suggestUsername
  };
})();
