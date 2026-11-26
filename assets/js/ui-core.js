/* =============================================================================
   GIAO DIỆN TÀI KHOẢN: đăng nhập, hồ sơ, đổi mật khẩu, góp ý, thông báo
   SỔ CĐHA — Bệnh viện Vĩnh Phúc VPI | Phát triển bởi: Vũ Đạt
   ========================================================================== */
(function () {
  "use strict";

  var V = window.VPI;
  var C = window.VPI_CONFIG || {};
  var started = false;
  var authEl = null;
  var failCount = 0;

  /* ------------------------------------------------------------- TIỆN ÍCH -- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function toast(msg, type) {
    var box = document.getElementById("toastContainer");
    if (!box) return;
    var t = document.createElement("div");
    t.className = "toast-item " + (type || "ok");
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; setTimeout(function () { t.remove(); }, 320); }, 4200);
  }

  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    return isNaN(d) ? "" : d.toLocaleString("vi-VN", { hour12: false });
  }

  function initials(name) {
    var w = String(name || "?").trim().split(/\s+/);
    var a = w[w.length - 1].charAt(0);
    var b = w.length > 1 ? w[0].charAt(0) : "";
    return (b + a).toUpperCase();
  }

  /* Chỉ cho phép ảnh từ chính ứng dụng hoặc kho ảnh Supabase của dự án */
  function safeImgUrl(u) {
    u = String(u || "");
    if (!u) return "";
    if (/^assets\/|^images\/|^\.\/assets\//.test(u)) return u;
    var base = String(C.SUPABASE_URL || "").replace(/\/+$/, "");
    if (base && u.indexOf(base + "/storage/v1/object/public/cdha-media/") === 0) return u;
    return "";
  }

  function avatarHtml(p, cls) {
    var url = p && safeImgUrl(p.avatar_url);
    if (url) return '<img class="avatar ' + (cls || "") + '" src="' + esc(url) + '" alt="">';
    return '<span class="avatar ' + (cls || "") + '" aria-hidden="true">' + esc(initials(p && p.full_name)) + "</span>";
  }

  function roleBadge(p) {
    if (p.status !== "active") return '<span class="role-badge off">Đã khóa</span>';
    return p.role === "admin" ? '<span class="role-badge admin">👑 Admin</span>' : '<span class="role-badge">Nhân viên</span>';
  }

  function openModal(o) {
    var ov = document.createElement("div");
    ov.className = "modal-overlay vpi-modal " + (o.cls || "");
    if (o.id) ov.id = o.id;
    var closable = o.closable !== false;
    ov.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true">' +
        '<div class="modal-head"' + (o.headStyle ? ' style="' + o.headStyle + '"' : "") + "><b>" + o.title + "</b>" +
          (closable ? '<button type="button" class="modal-close-btn" data-close aria-label="Đóng">&times;</button>' : "") +
        '</div><div class="modal-body">' + o.body + "</div></div>";
    ov._onClose = o.onClose;
    ov._closable = closable;
    ov.addEventListener("mousedown", function (e) { ov._downOnBg = (e.target === ov); });
    ov.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-close]") && closable) { closeModal(ov); return; }
      if (e.target === ov && ov._downOnBg && closable) closeModal(ov);
    });
    document.body.appendChild(ov);
    return ov;
  }

  function closeModal(ov) {
    if (!ov || !ov.parentNode) return;
    if (ov._onClose && ov._onClose() === false) return;
    ov.remove();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var all = document.querySelectorAll(".vpi-modal");
    var top = all[all.length - 1];
    if (top && top._closable) closeModal(top);
  });

  function setBusy(btn, busy, txt) {
    if (!btn) return;
    if (busy) { btn._t = btn.textContent; btn.disabled = true; if (txt) btn.textContent = txt; }
    else { btn.disabled = false; if (btn._t) btn.textContent = btn._t; }
  }

  function val(root, sel) { var e = root.querySelector(sel); return e ? e.value.trim() : ""; }

  /* ------------------------------------------------------ MÀN HÌNH ĐĂNG NHẬP -- */
  function buildAuth() {
    authEl = document.createElement("div");
    authEl.id = "vpiAuthOverlay";
    authEl.className = "auth-overlay";
    authEl.innerHTML =
      '<div class="auth-card" role="dialog" aria-label="Đăng nhập">' +
        '<div class="auth-top"><img src="assets/images/logo-vpi.jpg" alt="Logo VPI">' +
          "<h1>SỔ CĐHA</h1><p>Bệnh viện Vĩnh Phúc VPI — Khoa Chẩn đoán hình ảnh</p></div>" +
        (V.configured() ? "" :
          '<div class="auth-warn">⚠️ Ứng dụng chưa được kết nối máy chủ. Quản trị viên cần điền <b>SUPABASE_URL</b> và <b>SUPABASE_ANON_KEY</b> trong <code>assets/js/config.js</code> (xem hướng dẫn HUONG-DAN-TRIEN-KHAI.md).</div>') +
        '<div class="auth-tabs"><button type="button" data-tab="login" class="active">Đăng nhập</button>' +
          '<button type="button" data-tab="request">Nhân viên mới</button></div>' +
        '<form class="auth-form" data-pane="login" autocomplete="on">' +
          '<div class="fld"><label for="vpiLoginUser">Tên đăng nhập</label>' +
            '<input id="vpiLoginUser" name="username" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="VD: hanh.nd"></div>' +
          '<div class="fld"><label for="vpiLoginPw">Mật khẩu</label><div class="pw-wrap">' +
            '<input id="vpiLoginPw" name="password" type="password" autocomplete="current-password" required placeholder="Nhập mật khẩu">' +
            '<button type="button" class="pw-toggle" data-pw aria-label="Hiện/ẩn mật khẩu">👁</button></div></div>' +
          '<div class="auth-err" id="vpiLoginErr" role="alert"></div>' +
          '<button class="btn-primary" type="submit">Đăng nhập</button>' +
          '<button type="button" class="auth-link" data-go="forgot">Quên mật khẩu?</button>' +
        "</form>" +
        '<form class="auth-form" data-pane="forgot" style="display:none" autocomplete="off">' +
          '<p class="auth-hint">Gửi yêu cầu để Admin <b>cấp lại mật khẩu tạm</b>. Admin sẽ xác minh và gửi mật khẩu trực tiếp cho bạn.</p>' +
          '<div class="fld"><label>Tên đăng nhập *</label><input name="username" type="text" maxlength="32" autocapitalize="none" spellcheck="false" required placeholder="VD: hanh.nd"></div>' +
          '<div class="fld"><label>Họ và tên *</label><input name="full_name" type="text" minlength="2" maxlength="100" required></div>' +
          '<div class="fld"><label>Số điện thoại / Zalo</label><input name="phone" type="tel" maxlength="30"></div>' +
          '<div class="auth-err" id="vpiForgotErr" role="alert"></div>' +
          '<button class="btn-primary" type="submit">Gửi yêu cầu cấp lại mật khẩu</button>' +
          '<button type="button" class="auth-link" data-go="login">← Quay lại đăng nhập</button>' +
          '<p class="auth-hint">Admin quên mật khẩu: nhờ một Admin khác cấp lại, hoặc người quản trị hệ thống khôi phục trong Supabase.</p>' +
        "</form>" +
        '<form class="auth-form" data-pane="request" style="display:none" autocomplete="off">' +
          '<div class="fld"><label>Họ và tên *</label><input name="full_name" type="text" maxlength="100" required placeholder="VD: Nguyễn Văn A"></div>' +
          '<div class="fld"><label>Khoa / phòng</label><input name="department" type="text" maxlength="100" placeholder="VD: Khoa CĐHA"></div>' +
          '<div class="fld"><label>Số điện thoại / Zalo</label><input name="phone" type="tel" maxlength="30"></div>' +
          '<div class="fld"><label>Ghi chú</label><textarea name="note" rows="2" maxlength="500" placeholder="Vị trí công tác, thời gian bắt đầu..."></textarea></div>' +
          '<div class="auth-err" id="vpiReqErr" role="alert"></div>' +
          '<button class="btn-primary" type="submit">Gửi yêu cầu cấp tài khoản</button>' +
          '<p class="auth-hint">Yêu cầu <b>không chứa mật khẩu</b>. Admin sẽ duyệt, tạo tài khoản và gửi mật khẩu tạm cho bạn trực tiếp; bạn phải đổi mật khẩu ngay lần đăng nhập đầu tiên.</p>' +
        "</form>" +
        '<p class="auth-hint" data-pane-hint="login">Chưa có tài khoản? Chọn "Nhân viên mới" hoặc liên hệ Admin khoa.</p>' +
        '<div class="auth-dev">Phát triển bởi: <b>' + esc(C.DEVELOPER || "Vũ Đạt") + "</b>, " + esc(C.HOSPITAL || "Bệnh viện Vĩnh Phúc VPI") + "</div>" +
      "</div>";
    document.body.appendChild(authEl);

    var tabs = authEl.querySelectorAll(".auth-tabs button");
    function showPane(name) {
      var active = name === "request" ? "request" : "login";   // "forgot" thuộc nhóm đăng nhập
      tabs.forEach(function (x) { x.classList.toggle("active", x.getAttribute("data-tab") === active); });
      authEl.querySelectorAll("[data-pane]").forEach(function (p) { p.style.display = p.getAttribute("data-pane") === name ? "" : "none"; });
      var hint = authEl.querySelector("[data-pane-hint]");
      if (hint) hint.style.display = name === "login" ? "" : "none";
    }
    tabs.forEach(function (b) {
      b.addEventListener("click", function () { showPane(b.getAttribute("data-tab")); });
    });
    authEl.querySelectorAll("[data-go]").forEach(function (b) {
      b.addEventListener("click", function () {
        var to = b.getAttribute("data-go");
        showPane(to);
        document.getElementById("vpiForgotErr").textContent = "";
        if (to === "forgot") authEl.querySelector('[data-pane="forgot"] [name=username]').value = document.getElementById("vpiLoginUser").value.trim();
      });
    });

    authEl.querySelector('[data-pane="forgot"]').addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, btn = f.querySelector("button[type=submit]"), err = document.getElementById("vpiForgotErr");
      err.className = "auth-err"; err.textContent = "";
      var uname = val(f, "[name=username]").toLowerCase().split("@")[0];
      setBusy(btn, true, "Đang gửi...");
      V.submitAccountRequest({
        kind: "reset", desired_username: uname, full_name: val(f, "[name=full_name]"), phone: val(f, "[name=phone]")
      }).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.textContent = r.message; return; }
        f.reset();
        err.className = "auth-err auth-ok";
        err.textContent = "✓ Đã gửi yêu cầu. Admin sẽ liên hệ để cấp mật khẩu tạm.";
      });
    });

    authEl.querySelector("[data-pw]").addEventListener("click", function () {
      var i = document.getElementById("vpiLoginPw");
      i.type = i.type === "password" ? "text" : "password";
    });

    authEl.querySelector('[data-pane="login"]').addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, btn = f.querySelector("button[type=submit]"), err = document.getElementById("vpiLoginErr");
      err.textContent = "";
      setBusy(btn, true, "Đang đăng nhập...");
      var wait = failCount > 2 ? Math.min(failCount * 800, 6000) : 0;   // làm chậm dò mật khẩu
      setTimeout(function () {
        V.signIn(val(f, "[name=username]"), f.querySelector("[name=password]").value).then(function (r) {
          setBusy(btn, false);
          if (!r.ok) { failCount++; err.textContent = r.message; f.querySelector("[name=password]").value = ""; return; }
          failCount = 0;
          f.reset();
          afterLogin();
        });
      }, wait);
    });

    authEl.querySelector('[data-pane="request"]').addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, btn = f.querySelector("button[type=submit]"), err = document.getElementById("vpiReqErr");
      err.className = "auth-err"; err.textContent = "";
      setBusy(btn, true, "Đang gửi...");
      V.submitAccountRequest({
        full_name: val(f, "[name=full_name]"), department: val(f, "[name=department]"),
        phone: val(f, "[name=phone]"), note: val(f, "[name=note]"),
        desired_username: V.suggestUsername(val(f, "[name=full_name]"))
      }).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.textContent = r.message; return; }
        f.reset();
        err.className = "auth-err auth-ok";
        err.textContent = "✓ Đã gửi yêu cầu. Vui lòng chờ Admin cấp tài khoản.";
      });
    });
  }

  function showAuth(msg) {
    document.body.classList.add("vpi-locked");
    document.body.classList.remove("is-admin");
    if (!authEl) buildAuth();
    authEl.style.display = "";
    var err = document.getElementById("vpiLoginErr");
    if (err && msg) err.textContent = msg;
  }

  /* ----------------------------------------------------------- SAU ĐĂNG NHẬP -- */
  function afterLogin() {
    var p = V.profile();
    document.body.classList.remove("vpi-locked");
    document.body.classList.toggle("is-admin", V.isAdmin());
    if (authEl) authEl.style.display = "none";
    renderChip();
    if (!started) { started = true; window.VUDAT_APP.start(); } else { window.VUDAT_APP.refresh(); }
    if (!V.isOffline()) V.startPolling();
    if (V.isOffline()) toast("Đang xem ở chế độ ngoại tuyến (chỉ đọc).", "warn");
    else if (p.must_change_password) showPasswordModal(true);
  }

  V.on("signedout", function (d) {
    document.querySelectorAll(".vpi-modal").forEach(function (m) { m.remove(); });
    ["settingsModalOverlay", "feedbackModalOverlay", "lightboxOverlay"].forEach(function (id) {
      var m = document.getElementById(id); if (m) m.style.display = "none";
    });
    var menu = document.getElementById("vpiUserMenu"); if (menu) menu.remove();
    V.stopPolling();
    var main = document.getElementById("mainAppView"); if (main) main.innerHTML = "";
    showAuth(d && d.reason === "expired" ? "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại." : "");
  });

  V.on("profile", function () { renderChip(); });

  /* Tự đăng xuất khi không thao tác 2 giờ (chỉ khi đang trực tuyến) */
  var lastActive = Date.now();
  ["click", "keydown", "touchstart", "mousemove"].forEach(function (ev) {
    document.addEventListener(ev, function () { lastActive = Date.now(); }, { passive: true });
  });
  setInterval(function () {
    if (V.profile() && !V.isOffline() && navigator.onLine && Date.now() - lastActive > 2 * 60 * 60 * 1000) {
      V.signOut().then(function () { showAuth("Đã tự đăng xuất do không thao tác trong 2 giờ."); });
    }
  }, 60000);

  /* ----------------------------------------------------- THẺ NGƯỜI DÙNG / MENU -- */
  function renderChip() {
    var p = V.profile();
    var host = document.getElementById("userChipWrap");
    if (!host || !p) return;
    host.innerHTML =
      '<button type="button" class="user-chip" id="vpiChipBtn" aria-haspopup="menu" title="Tài khoản của tôi">' +
        avatarHtml(p) + '<span class="nm">' + esc(p.full_name) + "</span></button>";
    document.body.classList.toggle("is-admin", V.isAdmin());
    document.getElementById("vpiChipBtn").addEventListener("click", function (e) { e.stopPropagation(); toggleMenu(host); });
  }

  function toggleMenu(host) {
    var old = document.getElementById("vpiUserMenu");
    if (old) { old.remove(); return; }
    var p = V.profile();
    var m = document.createElement("div");
    m.id = "vpiUserMenu"; m.className = "user-menu"; m.setAttribute("role", "menu");
    m.innerHTML =
      '<div class="who"><b>' + esc(p.full_name) + "</b><span>@" + esc(p.username) + " · " + (p.role === "admin" ? "Quản trị viên" : "Nhân viên") + "</span></div>" +
      '<button type="button" data-a="profile">👤 Hồ sơ cá nhân</button>' +
      '<button type="button" data-a="password">🔑 Đổi mật khẩu</button>' +
      '<button type="button" data-a="settings">⚙️ Cài đặt giao diện</button>' +
      (V.isAdmin() ? '<button type="button" data-a="admin">👑 Quản trị</button>' : "") +
      '<button type="button" class="danger" data-a="logout">🚪 Đăng xuất</button>';
    host.appendChild(m);
    m.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-a]"); if (!b) return;
      m.remove();
      var a = b.getAttribute("data-a");
      if (a === "profile") showProfile();
      else if (a === "password") showPasswordModal(false);
      else if (a === "settings") window.VUDAT_APP.showSettingsModal();
      else if (a === "admin") window.VPI_UI.showAdmin();
      else if (a === "logout") V.signOut();
    });
  }
  document.addEventListener("click", function (e) {
    var m = document.getElementById("vpiUserMenu");
    if (m && !m.contains(e.target)) m.remove();
  });

  /* --------------------------------------------------------------- HỒ SƠ ----- */
  function showProfile() {
    var p = V.profile();
    if (!p) return;
    var off = V.isOffline();
    var ov = openModal({
      title: "👤 Hồ sơ cá nhân",
      body:
        (off ? '<div class="vpi-note warn">Đang ngoại tuyến — chưa thể lưu thay đổi.</div>' : "") +
        '<div class="avatar-edit"><div id="vpiPfAvatar">' + avatarHtml(p, "lg") + "</div>" +
          '<div><div style="font-weight:800;font-size:16px">' + esc(p.full_name) + "</div>" +
          '<div style="font-size:12.5px;color:var(--text-soft);margin:2px 0 8px">@' + esc(p.username) + " · " + roleBadge(p) + "</div>" +
          '<div class="btns"><button type="button" class="vpi-btn sm" data-cam>📷 Chụp ảnh</button>' +
          '<button type="button" class="vpi-btn sm" data-pick>🖼️ Chọn ảnh</button>' +
          (p.avatar_url ? '<button type="button" class="vpi-btn sm danger" data-rm>Xóa ảnh</button>' : "") + "</div>" +
          '<input type="file" accept="image/*" capture="user" hidden data-f="cam"><input type="file" accept="image/*" hidden data-f="pick"></div></div>' +
        '<form id="vpiPfForm" autocomplete="off">' +
          '<div class="vpi-row"><div class="vpi-field"><label>Họ và tên *</label><input name="full_name" maxlength="100" required value="' + esc(p.full_name) + '"></div>' +
          '<div class="vpi-field"><label>Chức danh</label><input name="title" maxlength="100" placeholder="BS / KTV / ĐD..." value="' + esc(p.title) + '"></div></div>' +
          '<div class="vpi-row"><div class="vpi-field"><label>Khoa / phòng</label><input name="department" maxlength="100" value="' + esc(p.department) + '"></div>' +
          '<div class="vpi-field"><label>Số điện thoại / Zalo</label><input name="phone" type="tel" maxlength="30" value="' + esc(p.phone) + '"></div></div>' +
          '<div class="vpi-field"><label>Email liên hệ</label><input name="contact_email" type="email" maxlength="120" value="' + esc(p.contact_email) + '"></div>' +
          '<div class="vpi-field"><label>Giới thiệu ngắn</label><textarea name="bio" rows="2" maxlength="500">' + esc(p.bio) + "</textarea></div>" +
          '<div class="auth-err" id="vpiPfErr" role="alert"></div>' +
          '<div class="vpi-actions"><button type="button" class="vpi-btn" data-pw>🔑 Đổi mật khẩu</button>' +
          '<button type="submit" class="vpi-btn primary"' + (off ? " disabled" : "") + ">💾 Lưu thay đổi</button></div>" +
        "</form>"
    });
    var err = ov.querySelector("#vpiPfErr");

    function upload(file) {
      if (!file) return;
      err.className = "auth-err"; err.textContent = "Đang tải ảnh...";
      V.uploadAvatar(file).then(function (r) {
        if (!r.ok) { err.textContent = r.message; return; }
        err.className = "auth-err auth-ok"; err.textContent = "✓ Đã cập nhật ảnh đại diện";
        ov.querySelector("#vpiPfAvatar").innerHTML = avatarHtml(r.profile, "lg");
      });
    }
    ov.querySelector("[data-cam]").addEventListener("click", function () { ov.querySelector('[data-f="cam"]').click(); });
    ov.querySelector("[data-pick]").addEventListener("click", function () { ov.querySelector('[data-f="pick"]').click(); });
    ov.querySelectorAll("input[type=file]").forEach(function (i) {
      i.addEventListener("change", function () { upload(i.files[0]); i.value = ""; });
    });
    var rm = ov.querySelector("[data-rm]");
    if (rm) rm.addEventListener("click", function () {
      var old = V.profile().avatar_url || "";
      V.updateProfile({ avatar_url: null }).then(function (r) {
        if (!r.ok) { err.textContent = r.message; return; }
        var m = old.indexOf("/object/public/cdha-media/") > -1 ? old.split("/object/public/cdha-media/")[1] : "";
        if (m) V.deleteMedia(m);
        closeModal(ov); showProfile();
      });
    });
    ov.querySelector("[data-pw]").addEventListener("click", function () { closeModal(ov); showPasswordModal(false); });
    ov.querySelector("#vpiPfForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, btn = f.querySelector("button[type=submit]");
      var em = val(f, "[name=contact_email]");
      if (em && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { err.className = "auth-err"; err.textContent = "Email liên hệ không hợp lệ."; return; }
      setBusy(btn, true, "Đang lưu...");
      V.updateProfile({
        full_name: val(f, "[name=full_name]"), title: val(f, "[name=title]") || null, department: val(f, "[name=department]") || null,
        phone: val(f, "[name=phone]") || null, contact_email: em || null, bio: val(f, "[name=bio]") || null
      }).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.className = "auth-err"; err.textContent = r.message; return; }
        err.className = "auth-err auth-ok"; err.textContent = "✓ Đã lưu hồ sơ";
        toast("Đã lưu hồ sơ cá nhân.", "ok");
      });
    });
  }

  /* ---------------------------------------------------------- ĐỔI MẬT KHẨU --- */
  function showPasswordModal(forced) {
    var ov = openModal({
      title: forced ? "🔑 Đặt mật khẩu mới" : "🔑 Đổi mật khẩu",
      closable: !forced,
      body:
        (forced ? '<div class="vpi-note warn">Đây là lần đăng nhập đầu tiên (hoặc Admin vừa đặt lại mật khẩu). Vui lòng đặt mật khẩu riêng của bạn trước khi tiếp tục.</div>' : "") +
        '<form id="vpiPwForm" autocomplete="off">' +
          '<div class="vpi-field"><label>Mật khẩu hiện tại' + (forced ? " (mật khẩu tạm Admin đã cấp)" : "") + '</label><input type="password" name="old" autocomplete="current-password" required></div>' +
          '<div class="vpi-field"><label>Mật khẩu mới</label><input type="password" name="n1" autocomplete="new-password" minlength="8" required></div>' +
          '<div class="vpi-field"><label>Nhập lại mật khẩu mới</label><input type="password" name="n2" autocomplete="new-password" minlength="8" required></div>' +
          '<div class="vpi-note">Tối thiểu 8 ký tự, gồm cả chữ và số. Không dùng lại mật khẩu của tài khoản khác.</div>' +
          '<div class="auth-err" id="vpiPwErr" role="alert"></div>' +
          '<div class="vpi-actions">' + (forced ? '<button type="button" class="vpi-btn" data-out>Đăng xuất</button>' : "") +
          '<button type="submit" class="vpi-btn primary">Đổi mật khẩu</button></div></form>'
    });
    var out = ov.querySelector("[data-out]");
    if (out) out.addEventListener("click", function () { ov._closable = true; ov.remove(); V.signOut(); });
    ov.querySelector("#vpiPwForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, btn = f.querySelector("button[type=submit]"), err = ov.querySelector("#vpiPwErr");
      var n1 = f.querySelector("[name=n1]").value, n2 = f.querySelector("[name=n2]").value;
      if (n1 !== n2) { err.textContent = "Hai mật khẩu mới không khớp."; return; }
      setBusy(btn, true, "Đang đổi...");
      V.changePassword(f.querySelector("[name=old]").value, n1).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.textContent = r.message; return; }
        toast("✓ Đã đổi mật khẩu thành công.", "ok");
        ov._closable = true; ov.remove();
      });
    });
  }

  /* ---------------------------------------------------------------- GÓP Ý ---- */
  var CATS = [
    ["Sửa quy trình", "📝 Góp ý sửa quy trình kỹ thuật"], ["Đề xuất kỹ thuật mới", "➕ Đề xuất kỹ thuật / chỉ định mới"],
    ["Báo lỗi", "⚠️ Báo lỗi / nhầm lẫn thông số"], ["Ý kiến giao diện", "💡 Cải tiến ứng dụng"], ["Tin nhắn chung", "💬 Tin nhắn cho Admin"]
  ];
  var STATUS_TXT = { "new": "Đã gửi", seen: "Admin đã xem", resolved: "Đã xử lý" };

  function showFeedback(protocolName) {
    var p = V.profile();
    if (!p) return;
    if (document.getElementById("vpiFeedbackModal")) { return; }
    var ov = openModal({
      id: "vpiFeedbackModal",
      title: "💬 Nhắn tin & góp ý cho Admin " + esc(C.DEVELOPER || "Vũ Đạt"),
      headStyle: "background:linear-gradient(135deg,#0f172a,#059669);color:#fff",
      body:
        '<div class="vpi-tabs"><button type="button" class="navpill active" data-t="send">✍️ Gửi góp ý</button>' +
        '<button type="button" class="navpill" data-t="mine">📨 Góp ý của tôi <span class="hdr-badge" id="vpiMineBadge" data-n="0"></span></button></div>' +
        '<div data-p="send"><div class="vpi-note">Góp ý được gửi trực tiếp tới Admin và hiển thị ngay trong mục <b>Quản trị → Hòm thư góp ý</b>. Khi Admin phản hồi hoặc cập nhật nội dung, bạn sẽ nhận được thông báo tại đây.</div>' +
        '<form id="vpiFbForm" autocomplete="off">' +
          '<div class="vpi-row"><div class="vpi-field"><label>Người gửi</label><input value="' + esc(p.full_name) + '" readonly></div>' +
          '<div class="vpi-field"><label>Loại góp ý</label><select name="category">' +
            CATS.map(function (c) { return '<option value="' + esc(c[0]) + '">' + esc(c[1]) + "</option>"; }).join("") + "</select></div></div>" +
          '<div class="vpi-row"><div class="vpi-field"><label>Số điện thoại / Zalo (tùy chọn)</label><input name="phone" type="tel" maxlength="30" value="' + esc(p.phone) + '"></div>' +
          '<div class="vpi-field"><label>Quy trình liên quan</label><input name="protocol" maxlength="200" placeholder="VD: CT sọ não có tiêm" value="' + esc(protocolName || "") + '"></div></div>' +
          '<div class="vpi-field"><label>Nội dung chi tiết *</label><textarea name="message" rows="5" maxlength="4000" required placeholder="Mô tả nội dung cần sửa, thông số đề xuất, nguồn tham khảo..."></textarea></div>' +
          '<div class="vpi-note warn">⚠️ Không ghi họ tên, mã bệnh án hoặc hình ảnh có thông tin người bệnh.</div>' +
          '<div class="auth-err" id="vpiFbErr" role="alert"></div>' +
          '<div class="vpi-actions"><button type="button" class="vpi-btn" data-zalo>💬 Nhắn thêm qua Zalo</button>' +
          '<button type="submit" class="vpi-btn primary">📨 Gửi cho Admin</button></div></form></div>' +
        '<div data-p="mine" style="display:none"><div id="vpiFbMine" class="vpi-list"><div class="vpi-note">Đang tải...</div></div></div>'
    });
    var tabs = ov.querySelectorAll("[data-t]");
    function openTab(t) {
      tabs.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-t") === t); });
      ov.querySelectorAll("[data-p]").forEach(function (x) { x.style.display = x.getAttribute("data-p") === t ? "" : "none"; });
      if (t === "mine") loadMine(ov);
    }
    tabs.forEach(function (b) { b.addEventListener("click", function () { openTab(b.getAttribute("data-t")); }); });
    ov._openTab = openTab;

    ov.querySelector("[data-zalo]").addEventListener("click", function () {
      var f = ov.querySelector("#vpiFbForm");
      var text = "Xin chào Admin " + (C.DEVELOPER || "Vũ Đạt") + ",\nTôi là: " + p.full_name + "\n[" + f.category.value + "] " + f.message.value +
        (f.protocol.value ? " (Liên quan: " + f.protocol.value + ")" : "");
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).catch(function () {}); toast("Đã sao chép nội dung. Đang mở Zalo...", "ok"); }
      window.open("https://zalo.me/0916306115", "_blank", "noopener");
    });

    ov.querySelector("#vpiFbForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget, btn = f.querySelector("button[type=submit]"), err = ov.querySelector("#vpiFbErr");
      err.className = "auth-err"; err.textContent = "";
      if (V.isOffline()) { err.textContent = "Đang ngoại tuyến — chưa gửi được. Hãy thử lại khi có mạng."; return; }
      setBusy(btn, true, "Đang gửi...");
      V.sendFeedback({
        sender_name: p.full_name, phone: val(f, "[name=phone]"), category: f.category.value,
        protocol: val(f, "[name=protocol]"), message: val(f, "[name=message]")
      }).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.textContent = r.message; return; }
        toast("✓ Đã gửi góp ý tới Admin. Cảm ơn bạn!", "ok");
        closeModal(ov);
      });
    });

    if (V.profile()) V.checkNotifications();
    V.listFeedback(true).then(function (list) {
      var n = list.filter(function (x) { return x.user_seen === false; }).length;
      var b = ov.querySelector("#vpiMineBadge"); if (b) { b.textContent = n || ""; b.setAttribute("data-n", n); }
      if (n) openTab("mine");
    });
  }

  function loadMine(ov) {
    var box = ov.querySelector("#vpiFbMine");
    V.listFeedback(true).then(function (list) {
      if (!list.length) { box.innerHTML = '<div class="vpi-note">Bạn chưa gửi góp ý nào.</div>'; return; }
      box.innerHTML = list.map(function (x) {
        return '<div class="vpi-item vpi-fb ' + (x.user_seen === false ? "new" : "") + '">' +
          "<b>" + esc(x.category) + (x.protocol ? " — " + esc(x.protocol) : "") + "</b>" +
          '<div class="msg">' + esc(x.message) + "</div>" +
          "<small>🕒 " + esc(fmtDate(x.created_at)) + " · <b>" + esc(STATUS_TXT[x.status] || x.status) + "</b></small>" +
          (x.admin_reply ? '<div class="reply"><b>Phản hồi của ' + esc(x.replied_by_name || "Admin") + ":</b><br>" + esc(x.admin_reply) + "</div>" : "") +
          "</div>";
      }).join("");
      var unseen = list.filter(function (x) { return x.user_seen === false; });
      Promise.all(unseen.map(function (x) { return V.updateFeedback(x.id, { user_seen: true }); })).then(function () {
        var b = ov.querySelector("#vpiMineBadge"); if (b) { b.textContent = ""; b.setAttribute("data-n", 0); }
        V.checkNotifications();
      });
    });
  }

  /* ------------------------------------------------------------ THÔNG BÁO ---- */
  function setBadge(id, n) {
    var b = document.getElementById(id);
    if (!b) return;
    b.textContent = n > 0 ? (n > 99 ? "99+" : n) : "";
    b.setAttribute("data-n", n);
  }

  V.on("notify", function (d) {
    var c = d.counts;
    setBadge("adminBadge", (c.adminNew || 0) + (c.requests || 0));
    setBadge("feedbackBadge", c.mine || 0);
    if (d.fresh.adminNew) {
      toast("📬 Có góp ý mới gửi tới Admin (" + c.adminNew + " chưa xử lý).", "ok");
      if (document.hidden && window.Notification && Notification.permission === "granted") {
        try { new Notification("SỔ CĐHA", { body: "Có góp ý mới gửi tới Admin", icon: "assets/icons/icon-192.png" }); } catch (e) {}
      }
    }
    if (d.fresh.mine) {
      toast("📣 Admin vừa phản hồi / cập nhật góp ý của bạn. Mở 💬 Góp ý để xem.", "ok");
      if (document.hidden && window.Notification && Notification.permission === "granted") {
        try { new Notification("SỔ CĐHA", { body: "Admin đã phản hồi góp ý của bạn", icon: "assets/icons/icon-192.png" }); } catch (e) {}
      }
    }
    if (window.VPI_UI && window.VPI_UI.onNotify) window.VPI_UI.onNotify(d);
  });

  /* Khi Admin sửa nội dung từ máy khác: làm mới nội dung khi người dùng quay lại tab */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && V.profile() && !V.isOffline() && started) V.refreshContent();
  });
  V.on("contentchanged", function () {
    if (started && V.profile()) window.VUDAT_APP.refreshCurrent();
  });

  /* --------------------------------------------------------------- KHỞI ĐỘNG -- */
  function boot() {
    buildAuth();
    if (!V.configured()) { showAuth(); return; }
    V.restoreSession().then(function (ok) {
      if (ok) afterLogin(); else showAuth();
    });
  }

  window.VPI_UI = {
    esc: esc, toast: toast, fmtDate: fmtDate, avatarHtml: avatarHtml, safeImgUrl: safeImgUrl, roleBadge: roleBadge,
    openModal: openModal, closeModal: closeModal, setBusy: setBusy, val: val,
    showFeedback: showFeedback, showProfile: showProfile, showPasswordModal: showPasswordModal, boot: boot,
    showAdmin: function () { toast("Chức năng quản trị chưa sẵn sàng.", "warn"); }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
