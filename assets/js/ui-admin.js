/* =============================================================================
   GIAO DIỆN QUẢN TRỊ (CHỈ ADMIN): tài khoản, yêu cầu, hòm thư góp ý, trình chỉnh sửa nội dung, ảnh
   SỔ CĐHA — Bệnh viện Vĩnh Phúc VPI | Phát triển bởi: Vũ Đạt
   Lưu ý: nút chỉ hiện với Admin để tiện dùng; quyền thật do máy chủ kiểm tra (RLS + /api/admin-users).
   ========================================================================== */
(function () {
  "use strict";

  var V = window.VPI, U = window.VPI_UI;
  var esc = U.esc, toast = U.toast, openModal = U.openModal, closeModal = U.closeModal, setBusy = U.setBusy, val = U.val;
  var adminOv = null;
  var adminTab = "users";
  var fbFilter = "new";

  function guard() {
    if (!V.isAdmin()) { toast("Chỉ Admin mới có quyền thực hiện.", "err"); return false; }
    return true;
  }

  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return false; });
    return Promise.resolve(false);
  }

  function dlFile(name, text, type) {
    var b = new Blob(["﻿" + text], { type: type || "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* ============================================================ BẢNG QUẢN TRỊ == */
  function showAdmin(tab) {
    if (!guard()) return;
    if (tab) adminTab = tab;
    if (adminOv && adminOv.parentNode) { renderTab(); return; }
    adminOv = openModal({
      cls: "wide", title: "👑 Quản trị — SỔ CĐHA",
      body:
        '<div class="vpi-tabs" id="vpiAdTabs">' +
          '<button type="button" class="navpill" data-t="users">👥 Tài khoản</button>' +
          '<button type="button" class="navpill" data-t="requests">🆕 Yêu cầu tài khoản <span class="hdr-badge" id="tabReqBadge" data-n="0"></span></button>' +
          '<button type="button" class="navpill" data-t="feedback">📬 Hòm thư góp ý <span class="hdr-badge" id="tabFbBadge" data-n="0"></span></button>' +
          '<button type="button" class="navpill" data-t="content">📝 Nội dung</button></div>' +
        '<div id="vpiAdBody"></div>',
      onClose: function () { adminOv = null; }
    });
    adminOv.querySelectorAll("#vpiAdTabs button").forEach(function (b) {
      b.addEventListener("click", function () { adminTab = b.getAttribute("data-t"); renderTab(); });
    });
    renderTab();
  }

  function renderTab() {
    if (!adminOv) return;
    adminOv.querySelectorAll("#vpiAdTabs button").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-t") === adminTab); });
    var body = adminOv.querySelector("#vpiAdBody");
    body.innerHTML = '<div class="vpi-note">Đang tải...</div>';
    if (adminTab === "users") renderUsers(body);
    else if (adminTab === "requests") renderRequests(body);
    else if (adminTab === "feedback") renderFeedback(body);
    else renderContent(body);
    V.checkNotifications();
  }

  U.onNotify = function (d) {
    var r = document.getElementById("tabReqBadge"), f = document.getElementById("tabFbBadge");
    if (r) { r.textContent = d.counts.requests || ""; r.setAttribute("data-n", d.counts.requests || 0); }
    if (f) { f.textContent = d.counts.adminNew || ""; f.setAttribute("data-n", d.counts.adminNew || 0); }
    if (adminOv && adminOv.parentNode && V.isAdmin() && (d.fresh.adminNew) && adminTab === "feedback") renderTab();
  };

  /* ----------------------------------------------------------------- TÀI KHOẢN -- */
  function renderUsers(body) {
    V.listUsers().then(function (users) {
      var me = V.profile();
      body.innerHTML =
        '<div class="vpi-actions" style="justify-content:flex-start;margin:0 0 12px">' +
          '<button type="button" class="vpi-btn primary" data-a="new">➕ Tạo tài khoản</button>' +
          '<button type="button" class="vpi-btn" data-a="bulk">👥 Tạo hàng loạt</button>' +
          '<span style="margin-left:auto;font-size:12.5px;color:var(--text-soft);align-self:center">' + users.length + " tài khoản</span></div>" +
        '<div class="vpi-list">' + users.map(function (u) {
          var self = u.id === me.id;
          return '<div class="vpi-item ' + (u.status !== "active" ? "off" : "") + '" data-id="' + esc(u.id) + '">' + U.avatarHtml(u, "md") +
            '<div class="main"><b>' + esc(u.full_name) + " " + U.roleBadge(u) + (u.must_change_password ? ' <span class="role-badge off" title="Chưa đổi mật khẩu tạm">chưa đổi MK</span>' : "") + "</b>" +
            "<small>@" + esc(u.username) + [u.title, u.department, u.phone].filter(Boolean).map(function (x) { return " · " + esc(x); }).join("") + "</small></div>" +
            '<div class="acts">' +
              '<button type="button" class="vpi-btn sm" data-a="edit">✏️ Sửa</button>' +
              (self ? "" :
                '<button type="button" class="vpi-btn sm" data-a="reset">🔑 Cấp lại MK</button>' +
                '<button type="button" class="vpi-btn sm" data-a="status">' + (u.status === "active" ? "🔒 Khóa" : "🔓 Mở khóa") + "</button>" +
                '<button type="button" class="vpi-btn sm" data-a="role">' + (u.role === "admin" ? "↓ Hạ xuống Nhân viên" : "👑 Cấp quyền Admin") + "</button>" +
                '<button type="button" class="vpi-btn sm danger" data-a="del">🗑 Xóa</button>') +
            "</div></div>";
        }).join("") + "</div>";

      body.onclick = function (e) {
        var b = e.target.closest("button[data-a]"); if (!b) return;
        var a = b.getAttribute("data-a");
        var row = b.closest("[data-id]");
        var u = row && users.filter(function (x) { return x.id === row.getAttribute("data-id"); })[0];
        if (a === "new") return createDialog({});
        if (a === "bulk") return bulkDialog();
        if (!u) return;
        if (a === "edit") return editUserDialog(u);
        if (a === "reset") {
          reissuePassword(u, b);
        } else if (a === "status") {
          var to = u.status === "active" ? "disabled" : "active";
          if (to === "disabled" && !confirm("Khóa tài khoản " + u.full_name + "? Người này sẽ không đăng nhập được nữa.")) return;
          V.adminApi({ action: "set_status", user_id: u.id, status: to }).then(function (r) {
            if (!r.ok) return toast(r.message, "err");
            toast(to === "disabled" ? "Đã khóa tài khoản." : "Đã mở khóa tài khoản.", "ok"); renderTab();
          });
        } else if (a === "role") {
          var nr = u.role === "admin" ? "staff" : "admin";
          if (!confirm((nr === "admin" ? "Cấp quyền ADMIN cho " : "Hạ " + u.full_name + " xuống nhân viên: ") + (nr === "admin" ? u.full_name + "? Người này sẽ sửa được nội dung và quản lý tài khoản." : "bỏ quyền chỉnh sửa?"))) return;
          V.adminApi({ action: "set_role", user_id: u.id, role: nr }).then(function (r) {
            if (!r.ok) return toast(r.message, "err");
            toast("Đã cập nhật quyền.", "ok"); renderTab();
          });
        } else if (a === "del") {
          if (!confirm("XÓA VĨNH VIỄN tài khoản " + u.full_name + " (@" + u.username + ")?\nKhông thể hoàn tác. (Nếu chỉ muốn ngừng cho đăng nhập, hãy dùng Khóa.)")) return;
          V.adminApi({ action: "delete", user_id: u.id }).then(function (r) {
            if (!r.ok) return toast(r.message, "err");
            toast("Đã xóa tài khoản.", "ok"); renderTab();
          });
        }
      };
    });
  }

  function editUserDialog(u) {
    var ov = openModal({
      title: "✏️ Sửa thông tin: @" + esc(u.username),
      body: '<form autocomplete="off">' +
        '<div class="vpi-field"><label>Họ và tên</label><input name="full_name" maxlength="100" required value="' + esc(u.full_name) + '"></div>' +
        '<div class="vpi-row"><div class="vpi-field"><label>Chức danh</label><input name="title" maxlength="100" value="' + esc(u.title) + '"></div>' +
        '<div class="vpi-field"><label>Khoa / phòng</label><input name="department" maxlength="100" value="' + esc(u.department) + '"></div></div>' +
        '<div class="vpi-field"><label>Số điện thoại</label><input name="phone" maxlength="30" value="' + esc(u.phone) + '"></div>' +
        '<div class="vpi-actions"><button type="button" class="vpi-btn" data-close>Hủy</button><button type="submit" class="vpi-btn primary">Lưu</button></div></form>'
    });
    ov.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget;
      V.adminUpdateUser(u.id, { full_name: val(f, "[name=full_name]"), title: val(f, "[name=title]") || null, department: val(f, "[name=department]") || null, phone: val(f, "[name=phone]") || null })
        .then(function (r) { if (!r.ok) return toast(r.message, "err"); closeModal(ov); toast("Đã lưu.", "ok"); renderTab(); });
    });
  }

  function createDialog(pre) {
    var ov = openModal({
      title: "➕ Tạo tài khoản nhân viên",
      body: '<form autocomplete="off">' +
        '<div class="vpi-note">Hệ thống tự sinh <b>mật khẩu tạm</b> (chỉ hiển thị một lần). Nhân viên đăng nhập bằng tên đăng nhập + mật khẩu tạm rồi bắt buộc đổi mật khẩu.</div>' +
        '<div class="vpi-field"><label>Họ và tên *</label><input name="full_name" maxlength="100" required value="' + esc(pre.full_name) + '"></div>' +
        '<div class="vpi-field"><label>Tên đăng nhập * <small style="font-weight:500;color:var(--text-muted)">(chữ thường không dấu, số, . _ -)</small></label><input name="username" maxlength="32" pattern="[a-z0-9._-]{3,32}" required value="' + esc(pre.username || (pre.full_name ? V.suggestUsername(pre.full_name) : "")) + '"></div>' +
        '<div class="vpi-row"><div class="vpi-field"><label>Chức danh</label><input name="title" maxlength="100" placeholder="BS / KTV / ĐD"></div>' +
        '<div class="vpi-field"><label>Khoa / phòng</label><input name="department" maxlength="100" value="' + esc(pre.department) + '"></div></div>' +
        '<div class="vpi-row"><div class="vpi-field"><label>Số điện thoại</label><input name="phone" maxlength="30" value="' + esc(pre.phone) + '"></div>' +
        '<div class="vpi-field"><label>Vai trò</label><select name="role"><option value="staff">Nhân viên (chỉ xem)</option><option value="admin">Admin (sửa được nội dung)</option></select></div></div>' +
        '<div class="auth-err" role="alert"></div>' +
        '<div class="vpi-actions"><button type="button" class="vpi-btn" data-close>Hủy</button><button type="submit" class="vpi-btn primary">Tạo tài khoản</button></div></form>'
    });
    var f = ov.querySelector("form"), userEdited = !!pre.username;
    f.username.addEventListener("input", function () { userEdited = true; });
    f.full_name.addEventListener("input", function () { if (!userEdited) f.username.value = V.suggestUsername(f.full_name.value); });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = f.querySelector("button[type=submit]"), err = f.querySelector(".auth-err");
      setBusy(btn, true, "Đang tạo...");
      V.adminApi({
        action: "create", full_name: val(f, "[name=full_name]"), username: val(f, "[name=username]").toLowerCase(),
        title: val(f, "[name=title]"), department: val(f, "[name=department]"), phone: val(f, "[name=phone]"),
        role: f.role.value, request_id: pre.request_id
      }).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.textContent = r.message; return; }
        closeModal(ov);
        credDialog([{ name: val(f, "[name=full_name]"), username: r.username, password: r.temp_password }], "Đã tạo tài khoản");
        renderTab();
      });
    });
  }

  function credDialog(rows, title) {
    var text = rows.map(function (r) { return r.name + " | Tên đăng nhập: " + r.username + " | Mật khẩu tạm: " + r.password; }).join("\n");
    var ov = openModal({
      title: "🔐 " + esc(title),
      body:
        '<div class="vpi-note warn">⚠️ <b>Mật khẩu tạm chỉ hiển thị MỘT LẦN</b> — hãy gửi trực tiếp cho nhân viên (không đăng lên nhóm chung). Họ sẽ phải đổi mật khẩu khi đăng nhập lần đầu.</div>' +
        rows.map(function (r) {
          return '<div class="cred-box"><b>' + esc(r.name) + "</b><br>Tên đăng nhập: <code>" + esc(r.username) + "</code><br>Mật khẩu tạm: <code>" + esc(r.password) + "</code></div>";
        }).join("") +
        '<div class="vpi-actions"><button type="button" class="vpi-btn" data-copy>📋 Sao chép</button>' +
        '<button type="button" class="vpi-btn" data-csv>⬇ Tải CSV</button><button type="button" class="vpi-btn primary" data-close>Đã ghi lại</button></div>'
    });
    ov.querySelector("[data-copy]").addEventListener("click", function () { copyText(text).then(function (ok) { toast(ok ? "Đã sao chép." : "Không sao chép được.", ok ? "ok" : "err"); }); });
    ov.querySelector("[data-csv]").addEventListener("click", function () { dlFile("tai-khoan-moi.csv", toCsv(rows)); });
  }

  function reissuePassword(u, btn, requestId) {
    var ask = "Cấp lại mật khẩu cho " + u.full_name + " (@" + u.username + ")?\nMật khẩu cũ sẽ không còn dùng được; người này phải đổi mật khẩu ở lần đăng nhập tới." +
      (requestId ? "\n\nHãy XÁC MINH đúng người đã gửi yêu cầu (gặp trực tiếp hoặc gọi số đã biết)." : "");
    if (!confirm(ask)) return;
    setBusy(btn, true, "...");
    V.resetPassword(u.id).then(function (r) {
      setBusy(btn, false);
      if (!r.ok) return toast(r.message, "err");
      credDialog([{ name: u.full_name, username: u.username, password: r.temp_password }], "Đã cấp lại mật khẩu");
      if (requestId) V.updateRequest(requestId, "approved").then(renderTab); else renderTab();
    });
  }

  function toCsv(rows) {
    function q(s) { return '"' + String(s).replace(/"/g, '""') + '"'; }
    return ["Họ tên,Tên đăng nhập,Mật khẩu tạm"].concat(rows.map(function (r) { return [q(r.name), q(r.username), q(r.password)].join(","); })).join("\r\n");
  }

  function bulkDialog() {
    var ov = openModal({
      cls: "mid", title: "👥 Tạo tài khoản hàng loạt",
      body: '<div class="vpi-note">Mỗi dòng một người. Có thể thêm chức danh sau dấu <b>|</b>: <code>Nguyễn Duy Hạnh | KTV</code>. Tên đăng nhập tự sinh (VD: <b>hanh.nd</b>); nếu trùng sẽ thêm số.</div>' +
        '<div class="vpi-field"><textarea id="vpiBulk" rows="9" placeholder="Nguyễn Duy Hạnh\nNguyễn Khánh Linh\n..."></textarea></div>' +
        '<div class="vpi-field"><label>Khoa / phòng (áp dụng cho tất cả)</label><input id="vpiBulkDept" maxlength="100" value="Khoa Chẩn đoán hình ảnh"></div>' +
        '<div class="auth-err" id="vpiBulkErr" role="alert"></div>' +
        '<div class="vpi-actions"><button type="button" class="vpi-btn" data-close>Hủy</button><button type="button" class="vpi-btn primary" id="vpiBulkGo">Tạo tất cả</button></div>'
    });
    ov.querySelector("#vpiBulkGo").addEventListener("click", function () {
      var lines = ov.querySelector("#vpiBulk").value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
      var err = ov.querySelector("#vpiBulkErr");
      if (!lines.length) { err.textContent = "Chưa nhập họ tên."; return; }
      if (lines.length > 50) { err.textContent = "Tối đa 50 người mỗi lần."; return; }
      var dept = ov.querySelector("#vpiBulkDept").value.trim();
      var btn = ov.querySelector("#vpiBulkGo"); btn.disabled = true;
      var results = [], i = 0;
      (function next() {
        if (i >= lines.length) {
          closeModal(ov);
          var ok = results.filter(function (r) { return r.password; });
          if (ok.length) credDialog(ok, "Đã tạo " + ok.length + "/" + lines.length + " tài khoản");
          var bad = results.filter(function (r) { return !r.password; });
          if (bad.length) toast("Lỗi " + bad.length + " dòng: " + bad.map(function (b) { return b.name + " (" + b.error + ")"; }).join("; "), "err");
          renderTab(); return;
        }
        var parts = lines[i].split("|"), name = parts[0].trim(), title = (parts[1] || "").trim();
        btn.textContent = "Đang tạo " + (i + 1) + "/" + lines.length + "...";
        var base = V.suggestUsername(name) || "user", tries = 0;
        (function attempt() {
          var uname = tries ? base + (tries + 1) : base;
          if (uname.length < 3) uname = (uname + "xxx").slice(0, 5);
          V.adminApi({ action: "create", full_name: name, username: uname, title: title, department: dept, role: "staff" }).then(function (r) {
            if (r.ok) { results.push({ name: name, username: r.username, password: r.temp_password }); i++; next(); }
            else if (/tồn tại/.test(r.message) && tries < 8) { tries++; attempt(); }
            else { results.push({ name: name, error: r.message }); i++; next(); }
          });
        })();
      })();
    });
  }

  /* ------------------------------------------------------------------ YÊU CẦU -- */
  function renderRequests(body) {
    Promise.all([V.listRequests(), V.listUsers()]).then(function (res) {
      var list = res[0], users = res[1], me = V.profile();
      if (!list.length) { body.innerHTML = '<div class="vpi-note">Chưa có yêu cầu nào.</div>'; return; }
      var ST = { pending: "Chờ duyệt", approved: "Đã duyệt", rejected: "Đã từ chối" };
      function account(r) { return users.filter(function (u) { return u.username === r.desired_username; })[0]; }
      body.innerHTML = '<div class="vpi-list">' + list.map(function (r) {
        var reset = r.kind === "reset", u = reset ? account(r) : null, pending = r.status === "pending";
        var title = reset ? "🔑 Quên mật khẩu: @" + esc(r.desired_username) : "➕ " + esc(r.full_name);
        var info = reset
          ? ["Người gửi khai: " + r.full_name, r.phone, u ? "Tài khoản của: " + u.full_name + (u.phone ? " (SĐT hồ sơ: " + u.phone + ")" : "") : "⚠️ Không có tài khoản này"]
          : [r.department, r.phone, r.note];
        var acts = "";
        if (pending && !reset) acts = '<button type="button" class="vpi-btn sm primary" data-a="ok">✓ Duyệt & tạo tài khoản</button>';
        if (pending && u && u.id !== me.id) acts = '<button type="button" class="vpi-btn sm primary" data-a="pw">🔑 Cấp lại mật khẩu</button>';
        if (pending) acts += '<button type="button" class="vpi-btn sm" data-a="no">Từ chối</button>';
        return '<div class="vpi-item ' + (pending ? "new" : "off") + '" data-id="' + esc(r.id) + '">' +
          '<div class="main"><b>' + title + ' <span class="role-badge">' + ST[r.status] + "</span></b>" +
          "<small>" + info.filter(Boolean).map(esc).join(" · ") + " · " + esc(U.fmtDate(r.created_at)) + "</small></div>" +
          '<div class="acts">' + acts + '<button type="button" class="vpi-btn sm danger" data-a="del">Xóa</button></div></div>';
      }).join("") + "</div>";
      body.onclick = function (e) {
        var b = e.target.closest("button[data-a]"); if (!b) return;
        var row = b.closest("[data-id]"), id = row.getAttribute("data-id"), a = b.getAttribute("data-a");
        var r = list.filter(function (x) { return x.id === id; })[0];
        if (a === "ok") createDialog({ full_name: r.full_name, department: r.department, phone: r.phone, request_id: r.id });
        else if (a === "pw") reissuePassword(account(r), b, r.id);
        else if (a === "no") V.updateRequest(id, "rejected").then(renderTab);
        else if (a === "del") { if (confirm("Xóa yêu cầu này?")) V.deleteRequest(id).then(renderTab); }
      };
    });
  }

  /* ------------------------------------------------------------------- GÓP Ý --- */
  function renderFeedback(body) {
    V.listFeedback(false).then(function (all) {
      var list = fbFilter === "all" ? all : all.filter(function (x) { return x.status === fbFilter; });
      var counts = { "new": 0, seen: 0, resolved: 0 };
      all.forEach(function (x) { counts[x.status] = (counts[x.status] || 0) + 1; });
      var perm = window.Notification ? Notification.permission : "denied";
      body.innerHTML =
        '<div class="vpi-actions" style="justify-content:flex-start;margin:0 0 12px;align-items:center">' +
          '<select id="vpiFbFilter" class="vpi-input" style="width:auto">' +
            [["new", "Mới (" + counts["new"] + ")"], ["seen", "Đã xem (" + counts.seen + ")"], ["resolved", "Đã xử lý (" + counts.resolved + ")"], ["all", "Tất cả (" + all.length + ")"]]
              .map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === fbFilter ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select>" +
          (perm === "default" ? '<button type="button" class="vpi-btn sm" data-a="notif">🔔 Bật thông báo trên thiết bị này</button>' : "") +
          '<span style="font-size:12px;color:var(--text-soft)">Hệ thống tự kiểm tra góp ý mới mỗi phút khi bạn đang mở ứng dụng.</span></div>' +
        (list.length ? '<div class="vpi-list">' + list.map(function (x) {
          return '<div class="vpi-item vpi-fb ' + (x.status === "new" ? "new" : "") + '" data-id="' + esc(x.id) + '">' +
            "<div><b>" + esc(x.sender_name) + "</b>" + (x.phone ? " <small>(" + esc(x.phone) + ")</small>" : "") + ' <span class="role-badge">' + esc(x.category) + "</span></div>" +
            (x.protocol ? '<small>🎯 ' + esc(x.protocol) + "</small>" : "") +
            '<div class="msg">' + esc(x.message) + "</div>" +
            "<small>🕒 " + esc(U.fmtDate(x.created_at)) + " · " + (x.status === "new" ? "🟢 Mới" : x.status === "seen" ? "👁 Đã xem" : "✓ Đã xử lý") + "</small>" +
            (x.admin_reply ? '<div class="reply"><b>Đã phản hồi (' + esc(x.replied_by_name || "Admin") + "):</b><br>" + esc(x.admin_reply) + "</div>" : "") +
            '<details style="margin-top:8px"><summary style="cursor:pointer;font-size:12.5px;font-weight:700">↩ Trả lời / cập nhật trạng thái</summary>' +
              '<div class="vpi-field" style="margin-top:6px"><textarea rows="3" maxlength="4000" placeholder="Nội dung phản hồi (VD: Đã cập nhật lại thông số kV ở bài X)...">' + esc(x.admin_reply) + "</textarea></div>" +
              '<div class="acts"><button type="button" class="vpi-btn sm primary" data-a="reply">Gửi phản hồi & đánh dấu đã xử lý</button>' +
              (x.status === "new" ? '<button type="button" class="vpi-btn sm" data-a="seen">Đã xem</button>' : "") +
              '<button type="button" class="vpi-btn sm danger" data-a="del">Xóa</button></div></details></div>';
        }).join("") + "</div>" : '<div class="vpi-note">Không có góp ý nào ở mục này.</div>');

      var sel = body.querySelector("#vpiFbFilter");
      sel.addEventListener("change", function () { fbFilter = sel.value; renderTab(); });
      body.onclick = function (e) {
        var b = e.target.closest("button[data-a]"); if (!b) return;
        var a = b.getAttribute("data-a");
        if (a === "notif") { Notification.requestPermission().then(renderTab); return; }
        var card = b.closest("[data-id]"), id = card.getAttribute("data-id");
        if (a === "seen") V.updateFeedback(id, { status: "seen" }).then(function (r) { if (!r.ok) toast(r.message, "err"); renderTab(); });
        else if (a === "del") { if (confirm("Xóa góp ý này?")) V.deleteFeedback(id).then(function (r) { if (!r.ok) toast(r.message, "err"); renderTab(); }); }
        else if (a === "reply") {
          var t = card.querySelector("textarea").value.trim();
          V.updateFeedback(id, { admin_reply: t || null, status: "resolved", replied_by_name: V.profile().full_name }).then(function (r) {
            if (!r.ok) return toast(r.message, "err");
            toast("Đã gửi phản hồi — nhân viên sẽ nhận được thông báo.", "ok"); renderTab();
          });
        }
      };
    });
  }

  /* ------------------------------------------------------------------ NỘI DUNG -- */
  function allItemDocs() {
    var out = [];
    [["SOTAY_QUYTRINH", null], ["SOTAY_SIEUAM", "Siêu âm"], ["SOTAY_CANTHIEP", "Siêu âm can thiệp"]].forEach(function (p) {
      (window[p[0]] || []).forEach(function (it) { out.push({ key: p[0] + "#" + it.id, label: it.ten, group: p[1] || it.modality || "Quy trình", sub: it.nhom || "" }); });
    });
    return out;
  }

  function renderContent(body) {
    var cat = V.docCatalog(), items = allItemDocs();
    body.innerHTML =
      '<div class="vpi-note">Muốn sửa <b>một quy trình</b>: mở bài đó rồi bấm <b>✏️ Sửa nội dung</b> (hoặc tìm bên dưới). Mọi thay đổi được <b>lưu lịch sử</b> trên máy chủ và có thể <b>khôi phục về bản gốc</b>.</div>' +
      '<div class="vpi-field"><input id="vpiDocQ" placeholder="🔎 Tìm quy trình / tài liệu cần sửa..." autocomplete="off"></div>' +
      '<div id="vpiDocList" class="vpi-list"></div>';
    var box = body.querySelector("#vpiDocList"), q = body.querySelector("#vpiDocQ");
    function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); }
    function draw() {
      var k = norm(q.value), rows = cat.concat(items).filter(function (d) { return !k || norm(d.label + " " + d.group + " " + d.sub).indexOf(k) > -1; });
      var edited = rows.filter(function (d) { return V.isEdited(d.key); });
      var rest = rows.filter(function (d) { return !V.isEdited(d.key); });
      rows = edited.concat(rest).slice(0, 60);
      box.innerHTML = rows.length ? rows.map(function (d) {
        var inf = V.editInfo(d.key);
        return '<div class="vpi-item" data-k="' + esc(d.key) + '"><div class="main"><b>' + esc(d.label) + (inf ? ' <span class="role-badge admin">đã chỉnh sửa</span>' : "") + "</b>" +
          "<small>" + esc(d.group) + (d.sub ? " · " + esc(d.sub) : "") + (inf ? " · " + esc(inf.by || "") + " " + esc(U.fmtDate(inf.at)) : "") + "</small></div>" +
          '<div class="acts"><button type="button" class="vpi-btn sm primary" data-a="edit">✏️ Sửa</button>' +
          (inf ? '<button type="button" class="vpi-btn sm" data-a="rs">↩ Khôi phục gốc</button>' : "") + "</div></div>";
      }).join("") : '<div class="vpi-note">Không tìm thấy.</div>';
    }
    q.addEventListener("input", draw); draw();
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-a]"); if (!b) return;
      var key = b.closest("[data-k]").getAttribute("data-k");
      if (b.getAttribute("data-a") === "edit") openEditor(key, b.closest("[data-k]").querySelector("b").firstChild.textContent);
      else restoreWithConfirm(key, draw);
    });
  }

  function restoreWithConfirm(key, cb) {
    if (!guard()) return;
    if (!confirm("Khôi phục mục này về NỘI DUNG GỐC? Các chỉnh sửa hiện tại sẽ bị gỡ (vẫn còn trong lịch sử).")) return;
    V.restoreDoc(key).then(function (r) {
      if (!r.ok) return toast(r.message, "err");
      toast("Đã khôi phục bản gốc.", "ok");
      if (cb) cb();
      window.VUDAT_APP.refreshCurrent();
    });
  }

  /* ============================================================ TRÌNH CHỈNH SỬA == */
  var LBL = {
    ten: "Tên", nhom: "Nhóm", tuKhoa: "Từ khóa tìm kiếm", thongSo: "Bảng thông số", giaTri: "Giá trị", noiDung: "Nội dung",
    tieuDe: "Tiêu đề", items: "Các ý", nguon: "Nguồn tài liệu", moTa: "Mô tả", xuTri: "Xử trí", trieuChung: "Triệu chứng",
    cacBuoc: "Các bước", buoc: "Bước", cacMatCatChuan: "Các mặt cắt chuẩn", dauDo: "Đầu dò", chuanBi: "Chuẩn bị",
    dungCu: "Dụng cụ", chuThich: "Chú thích", caption: "Chú thích", viTri: "Vị trí", tuThe: "Tư thế", phanTichRoi: "Phân tích ROI",
    chiDinh: "Chỉ định", chongChiDinh: "Chống chỉ định", tenThuongMai: "Tên thương mại", hoatChat: "Hoạt chất", nongDo: "Nồng độ",
    hangSanXuat: "Hãng sản xuất", dacDiemLamSang: "Đặc điểm lâm sàng", tieuDeChinh: "Tiêu đề chính", ten_: "Tên", vung: "Vùng",
    targetIds: "Áp dụng cho mã bài", nguyenTacVang: "Nguyên tắc vàng", bonMucDo: "Các mức độ", "do": "Mức độ"
  };
  var READONLY = { id: 1, phanHe: 1, modality: 1, type: 1 };
  var SKIP = { hinhAnh: 1 };

  function label(k) { return LBL[k] || k; }
  function isPlain(v) { return v !== null && typeof v === "object" && !Array.isArray(v); }

  function textFieldNode(v, key, forceMulti) {
    var s = v == null ? "" : String(v);
    var multi = forceMulti || s.length > 70 || /\n/.test(s);
    var wrap = document.createElement("div"); wrap.className = "ed-field";
    var inp;
    if (multi) {
      inp = document.createElement("textarea");
      inp.rows = Math.min(14, Math.max(2, s.split("\n").length + Math.floor(s.length / 100)));
    } else { inp = document.createElement("input"); inp.type = "text"; }
    inp.value = s;
    if (key) { var l = document.createElement("label"); l.textContent = label(key); if (label(key) !== key) { var sm = document.createElement("small"); sm.textContent = key; l.appendChild(sm); } wrap.appendChild(l); }
    wrap.appendChild(inp);
    return { el: wrap, get: function () { return v == null && inp.value === "" ? null : inp.value; } };
  }

  function numFieldNode(v, key) {
    var wrap = document.createElement("div"); wrap.className = "ed-field";
    var inp = document.createElement("input"); inp.type = "number"; inp.step = "any"; inp.value = v;
    if (key) { var l = document.createElement("label"); l.textContent = label(key); wrap.appendChild(l); }
    wrap.appendChild(inp);
    return { el: wrap, get: function () { return inp.value === "" || isNaN(Number(inp.value)) ? v : Number(inp.value); } };
  }

  function boolFieldNode(v, key) {
    var wrap = document.createElement("div"); wrap.className = "ed-field";
    var l = document.createElement("label"); var inp = document.createElement("input"); inp.type = "checkbox"; inp.checked = v;
    l.appendChild(inp); l.appendChild(document.createTextNode(" " + label(key))); wrap.appendChild(l);
    return { el: wrap, get: function () { return inp.checked; } };
  }

  function rawNode(v, key) {
    var wrap = document.createElement("div"); wrap.className = "ed-field";
    var l = document.createElement("label"); l.textContent = label(key) + " (JSON nâng cao)"; wrap.appendChild(l);
    var ta = document.createElement("textarea"); ta.rows = 8; ta.value = JSON.stringify(v, null, 2); wrap.appendChild(ta);
    return { el: wrap, get: function () { try { return JSON.parse(ta.value); } catch (e) { throw new Error("JSON không hợp lệ ở mục: " + label(key)); } } };
  }

  function blankOf(v) {
    if (Array.isArray(v)) return v.length ? [blankOf(v[0])] : [];
    if (isPlain(v)) { var o = {}; Object.keys(v).forEach(function (k) { o[k] = (READONLY[k] || SKIP[k]) ? v[k] : blankOf(v[k]); }); return o; }
    if (typeof v === "number") return 0;
    if (typeof v === "boolean") return false;
    return "";
  }

  function titleOf(o, idx) {
    if (isPlain(o)) {
      var ks = ["ten", "tieuDe", "viTri", "do", "tenThuongMai", "ten_", "buoc", "giaTri"];
      for (var i = 0; i < ks.length; i++) if (typeof o[ks[i]] === "string" && o[ks[i]].trim()) return o[ks[i]].trim();
      for (var k in o) if (typeof o[k] === "string" && o[k].trim()) return o[k].trim();
    }
    return "Mục " + (idx + 1);
  }

  function objNode(v, key) {
    var holder = document.createElement(key ? "fieldset" : "div");
    holder.className = key ? "ed-obj" : "";
    if (key) { var lg = document.createElement("legend"); lg.textContent = label(key); holder.appendChild(lg); }
    var kids = [];
    Object.keys(v).forEach(function (k) {
      if (SKIP[k] || typeof v[k] === "function") return;
      if (READONLY[k]) { var c = document.createElement("span"); c.className = "ed-ro"; c.textContent = k + ": " + v[k]; holder.appendChild(c); return; }
      var n = makeNode(v[k], k); kids.push([k, n]); holder.appendChild(n.el);
    });
    return { el: holder, get: function () { var out = JSON.parse(JSON.stringify(v)); kids.forEach(function (p) { out[p[0]] = p[1].get(); }); return out; } };
  }

  function listNode(arr, key) {
    var isObj = arr.length && arr.every(isPlain);
    var prim = !arr.length || arr.every(function (x) { return typeof x !== "object" || x === null; });
    if (!isObj && !prim) return rawNode(arr, key);
    var template = arr.length ? blankOf(arr[0]) : "";
    var multiStr = /^(items|xuTri|noiDung|trieuChung|chiDinh|chongChiDinh|luuY)$/.test(key || "");
    var wrap = document.createElement("div"); wrap.className = "ed-field";
    if (key) { var l = document.createElement("label"); l.textContent = label(key); var sm = document.createElement("small"); sm.textContent = key; l.appendChild(sm); wrap.appendChild(l); }
    var rows = document.createElement("div"); wrap.appendChild(rows);

    function ctl(rowEl, cls) {
      var c = document.createElement("div"); c.className = cls;
      c.innerHTML = '<button type="button" data-m="up" title="Lên">↑</button><button type="button" data-m="down" title="Xuống">↓</button><button type="button" class="del" data-m="del" title="Xóa">✕</button>';
      c.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-m]"); if (!b) return; e.preventDefault(); e.stopPropagation();
        var m = b.getAttribute("data-m");
        if (m === "up" && rowEl.previousElementSibling) rows.insertBefore(rowEl, rowEl.previousElementSibling);
        else if (m === "down" && rowEl.nextElementSibling) rows.insertBefore(rowEl.nextElementSibling, rowEl);
        else if (m === "del") { if (confirm("Xóa mục này?")) rowEl.remove(); }
        rows.dispatchEvent(new Event("input", { bubbles: true }));
      });
      return c;
    }

    function addRow(v, open) {
      var n = makeNode(v, null, multiStr), row;
      if (isObj) {
        row = document.createElement("details"); row.className = "ed-card"; row.open = !!open;
        var sum = document.createElement("summary");
        sum.innerHTML = '<span class="t"></span>';
        sum.appendChild(ctl(row, "ed-card-ctl"));
        row.appendChild(sum);
        var bd = document.createElement("div"); bd.className = "ed-card-body"; bd.appendChild(n.el); row.appendChild(bd);
        var upd = function () { try { sum.querySelector(".t").textContent = titleOf(n.get(), Array.prototype.indexOf.call(rows.children, row)); } catch (e) {} };
        row.addEventListener("input", upd); row.addEventListener("toggle", upd); upd();
      } else {
        row = document.createElement("div"); row.className = "ed-list-item";
        var b2 = document.createElement("div"); b2.className = "ed-body"; b2.appendChild(n.el); row.appendChild(b2);
        row.appendChild(ctl(row, "ed-ctl"));
      }
      row._n = n; rows.appendChild(row);
      return row;
    }
    arr.forEach(function (x) { addRow(x, false); });

    var add = document.createElement("button"); add.type = "button"; add.className = "vpi-btn sm ed-add";
    add.textContent = isObj ? "➕ Thêm mục" : "➕ Thêm ý";
    add.addEventListener("click", function () {
      var r = addRow(JSON.parse(JSON.stringify(template)), true);
      rows.dispatchEvent(new Event("input", { bubbles: true }));
      var f = r.querySelector("input,textarea"); if (f) f.focus();
    });
    wrap.appendChild(add);

    return {
      el: wrap,
      get: function () {
        var out = Array.prototype.map.call(rows.children, function (r) { return r._n.get(); });
        if (out.length && out.every(function (o) { return isPlain(o) && typeof o.buoc === "number"; })) out.forEach(function (o, i) { o.buoc = i + 1; });
        return out;
      }
    };
  }

  function makeNode(v, key, multi) {
    if (Array.isArray(v)) return listNode(v, key);
    if (isPlain(v)) return objNode(v, key);
    if (typeof v === "boolean") return boolFieldNode(v, key || "");
    if (typeof v === "number") return numFieldNode(v, key);
    return textFieldNode(v, key, multi);
  }

  function openEditor(docKey, title) {
    if (!guard()) return;
    var doc = V.getDoc(docKey);
    if (doc === undefined) { toast("Mục này chưa chỉnh sửa được.", "err"); return; }
    var inf = V.editInfo(docKey), dirty = false;
    var root = makeNode(doc, null);
    var ov = openModal({
      cls: "mid", title: "✏️ " + esc(title || docKey),
      onClose: function () { if (dirty && !confirm("Bạn có thay đổi chưa lưu. Đóng và bỏ thay đổi?")) return false; },
      body:
        '<div class="vpi-note warn">⚠️ Đây là nội dung y khoa: kiểm tra kỹ <b>thông số (kV, mAs, liều thuốc, ngưỡng eGFR…)</b> với tài liệu đã được duyệt trước khi lưu.' +
        (inf ? "<br>Lần sửa gần nhất: <b>" + esc(inf.by || "") + "</b> · " + esc(U.fmtDate(inf.at)) : "<br>Đang hiển thị nội dung gốc.") + "</div>" +
        '<div id="vpiEdBox"></div><div class="auth-err" id="vpiEdErr" role="alert"></div>' +
        '<div class="vpi-actions ed-sticky"><button type="button" class="vpi-btn" data-close>Hủy</button>' +
        '<button type="button" class="vpi-btn" data-hist>🕘 Lịch sử</button>' +
        (inf ? '<button type="button" class="vpi-btn danger" data-rs>↩ Khôi phục gốc</button>' : "") +
        '<button type="button" class="vpi-btn primary" data-save>💾 Lưu thay đổi</button></div>'
    });
    ov.querySelector("#vpiEdBox").appendChild(root.el);
    ov.addEventListener("input", function () { dirty = true; });
    ov.addEventListener("click", function (e) { if (e.target.closest(".ed-add,[data-m]")) dirty = true; });

    ov.querySelector("[data-save]").addEventListener("click", function (e) {
      var err = ov.querySelector("#vpiEdErr"); err.textContent = "";
      var full;
      try { full = root.get(); } catch (ex) { err.textContent = ex.message; return; }
      if (isPlain(full) && "ten" in full && !String(full.ten || "").trim()) { err.textContent = "Tên không được để trống."; return; }
      var btn = e.currentTarget; setBusy(btn, true, "Đang lưu...");
      V.saveDoc(docKey, full).then(function (r) {
        setBusy(btn, false);
        if (!r.ok) { err.textContent = r.message; return; }
        dirty = false; closeModal(ov);
        toast("✓ Đã lưu — mọi nhân viên sẽ thấy nội dung mới.", "ok");
        window.VUDAT_APP.refreshCurrent();
        if (adminOv) renderTab();
      });
    });
    var rs = ov.querySelector("[data-rs]");
    if (rs) rs.addEventListener("click", function () { dirty = false; closeModal(ov); restoreWithConfirm(docKey, function () { if (adminOv) renderTab(); }); });
    ov.querySelector("[data-hist]").addEventListener("click", function () {
      V.listHistory(docKey).then(function (h) {
        openModal({ title: "🕘 Lịch sử chỉnh sửa", body: h.length ? '<table class="vpi-table"><tr><th>Thời gian</th><th>Người sửa</th><th>Thao tác</th></tr>' +
          h.map(function (x) { return "<tr><td>" + esc(U.fmtDate(x.created_at)) + "</td><td>" + esc(x.actor_name || "") + "</td><td>" + esc({ insert: "Sửa lần đầu", update: "Cập nhật", "restore-default": "Khôi phục gốc" }[x.action] || x.action) + "</td></tr>"; }).join("") + "</table>" : '<div class="vpi-note">Chưa có lịch sử.</div>' });
      });
    });
  }

  /* ===================================================== THANH CÔNG CỤ TRANG ==== */
  function docsFor(itemId) {
    var out = [];
    function inArr(name) { return (window[name] || []).some(function (x) { return x.id === itemId; }); }
    if (inArr("SOTAY_QUYTRINH")) out.push({ key: "SOTAY_QUYTRINH#" + itemId, label: "Sửa nội dung" });
    else if (inArr("SOTAY_SIEUAM")) out.push({ key: "SOTAY_SIEUAM#" + itemId, label: "Sửa nội dung" });
    else if (inArr("SOTAY_CANTHIEP")) out.push({ key: "SOTAY_CANTHIEP#" + itemId, label: "Sửa nội dung" });
    var map = {
      "emg-phan-ve": [["SOTAY_TAIBIEN.phanVe", "Sửa phác đồ phản vệ"]], "emg-thoat-mach": [["SOTAY_TAIBIEN.thoatMach", "Sửa quy trình thoát mạch"]],
      "emg-an-toan-mri": [["SOTAY_TAIBIEN.anToanMRI", "Sửa an toàn MRI"]], "emg-cpr": [["SOTAY_TAIBIEN.cpr", "Sửa CPR"]],
      "dlx-nguyen-ly": [["SOTAY_DOLOANGXUONG.thongTinChung", "Sửa thông tin chung"], ["SOTAY_DOLOANGXUONG.chiDinhChongChiDinh", "Sửa chỉ định / CCĐ"]],
      "dlx-tu-the-roi": [["SOTAY_DOLOANGXUONG.quyTrinhDatTuTheVaRoi", "Sửa tư thế & ROI"]],
      "dlx-tieu-chuan-who": [["SOTAY_DOLOANGXUONG.tieuChuanChanDoanWHO", "Sửa tiêu chuẩn WHO"], ["SOTAY_DOLOANGXUONG.congCuFRAX", "Sửa FRAX"]],
      "cq-ct-catalog": [["SOTAY_THUOCCANQUANG.thuocCT", "Sửa danh mục thuốc CT"]], "cq-mri-catalog": [["SOTAY_THUOCCANQUANG.thuocMRI", "Sửa danh mục thuốc MRI"]],
      "cq-an-toan-than": [["SOTAY_THUOCCANQUANG.anToanChucNangThan", "Sửa an toàn thận"], ["SOTAY_THUOCCANQUANG.phacDoTienMe", "Sửa phác đồ tiền mê"]],
      "cq-may-tinh-lieu": [["SOTAY_CONGCU.lieuCanQuang", "Sửa tham số liều CT"], ["SOTAY_CONGCU.lieuCCTA", "Sửa tham số CCTA"]]
    };
    (map[itemId] || []).forEach(function (m) { out.push({ key: m[0], label: m[1] }); });
    var cl = window.getChecklistForProtocol && window.getChecklistForProtocol(itemId);
    if (cl && window.SOTAY_CT_CHECKLISTS_MAP) {
      Object.keys(window.SOTAY_CT_CHECKLISTS_MAP).forEach(function (k) {
        if (window.SOTAY_CT_CHECKLISTS_MAP[k] === cl) out.push({ key: "SOTAY_CT_CHECKLISTS_MAP." + k, label: "Sửa bảng kiểm CT" });
      });
    }
    return out.filter(function (d) { return V.getDoc(d.key) !== undefined; });
  }

  function onDetailRendered(itemId, mainPanel) {
    if (!mainPanel) return;
    var old = mainPanel.querySelector(".admin-toolbar"); if (old) old.remove();
    if (!V.isAdmin()) return;
    var docs = docsFor(itemId);
    if (!docs.length) return;
    var edited = docs.filter(function (d) { return V.isEdited(d.key); });
    var bar = document.createElement("div"); bar.className = "admin-toolbar";
    bar.innerHTML = "<b>👑 Admin</b>" + docs.map(function (d, i) { return '<button type="button" class="vpi-btn sm primary" data-ed="' + i + '">✏️ ' + esc(d.label) + "</button>"; }).join("") +
      '<span class="grow"></span>' +
      (edited.length ? "<small>Đã chỉnh sửa" + (V.editInfo(edited[0].key).by ? " bởi " + esc(V.editInfo(edited[0].key).by) : "") + "</small>" +
        '<button type="button" class="vpi-btn sm" data-rs>↩ Khôi phục gốc</button>' : "<small>Nội dung gốc</small>");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.hasAttribute("data-ed")) {
        var d = docs[+b.getAttribute("data-ed")];
        var h2 = mainPanel.querySelector(".detail-header h2");
        var base = h2 ? h2.textContent.trim() : "";
        openEditor(d.key, (base ? base + " — " : "") + d.label.replace(/^Sửa /, ""));
      }
      else if (b.hasAttribute("data-rs")) {
        var keys = edited.map(function (d) { return d.key; });
        if (!confirm("Khôi phục " + keys.length + " mục của bài này về nội dung GỐC?")) return;
        Promise.all(keys.map(function (k) { return V.restoreDoc(k); })).then(function () { toast("Đã khôi phục bản gốc.", "ok"); window.VUDAT_APP.refreshCurrent(); });
      }
    });
    mainPanel.insertBefore(bar, mainPanel.firstChild);
  }

  /* ========================================================== ẢNH TƯ THẾ / PHIM == */
  var PRESET_CAPS = ["Tư thế & hướng tia", "Phim đạt yêu cầu", "Phim đạt yêu cầu (có chú thích)", "Ảnh đặt tư thế người bệnh", "Khác..."];

  function onGalleryRendered(item, rightPanel) {
    if (!rightPanel) return;
    var body = rightPanel.querySelector(".gallery-body"); if (!body) return;
    var old = rightPanel.querySelector(".gallery-admin-bar"); if (old) old.remove();
    if (!V.isAdmin() || !item || !item.id) return;
    var key = "SOTAY_QUYTRINH#" + item.id;
    if (V.getDoc(key) === undefined) return;

    var bar = document.createElement("div"); bar.className = "gallery-admin-bar";
    bar.innerHTML = '<button type="button" class="vpi-btn sm primary" data-cam>📷 Chụp ảnh</button><button type="button" class="vpi-btn sm" data-up>🖼️ Tải ảnh lên</button>' +
      '<input type="file" accept="image/*" capture="environment" hidden data-fc><input type="file" accept="image/*" multiple hidden data-fu>';
    body.parentNode.insertBefore(bar, body);
    function pick(files) { if (files && files.length) askMeta(key, Array.prototype.slice.call(files, 0, 10)); }
    bar.querySelector("[data-cam]").addEventListener("click", function () { bar.querySelector("[data-fc]").click(); });
    bar.querySelector("[data-up]").addEventListener("click", function () { bar.querySelector("[data-fu]").click(); });
    bar.querySelectorAll("input[type=file]").forEach(function (i) { i.addEventListener("change", function () { pick(i.files); i.value = ""; }); });

    body.querySelectorAll(".gallery-card[data-idx]").forEach(function (card) {
      var idx = +card.getAttribute("data-idx");
      var c = document.createElement("div"); c.className = "gc-admin";
      c.innerHTML = '<button type="button" class="cap" title="Đổi chú thích">✎</button><button type="button" title="Xóa ảnh">🗑</button>';
      c.addEventListener("click", function (e) {
        e.stopPropagation();
        var b = e.target.closest("button"); if (!b) return;
        var doc = V.getDoc(key), list = (doc.hinhAnh || []).slice(), im = list[idx];
        if (!im) return;
        if (b.classList.contains("cap")) {
          var nc = prompt("Chú thích ảnh:", im.caption || im.chuThich || ""); if (nc === null) return;
          list[idx] = { src: im.src || im.url, caption: nc.trim() };
        } else {
          if (!confirm("Xóa ảnh này khỏi bài?")) return;
          list.splice(idx, 1);
        }
        V.saveDoc(key, Object.assign(doc, { hinhAnh: list })).then(function (r) {
          if (!r.ok) return toast(r.message, "err");
          if (!b.classList.contains("cap")) {
            var u = String(im.src || im.url || ""), mk = "/object/public/cdha-media/";
            if (u.indexOf(mk) > -1) V.deleteMedia(u.split(mk)[1]);
          }
          window.VUDAT_APP.refreshCurrent();
        });
      });
      card.appendChild(c);
    });
  }

  function askMeta(key, files) {
    var thumbs = files.map(function (f) { return '<img src="' + URL.createObjectURL(f) + '" alt="" style="width:84px;height:84px;object-fit:cover;border-radius:8px;border:1px solid var(--line)">'; }).join("");
    var ov = openModal({
      title: "🖼️ Thêm " + files.length + " ảnh vào bài",
      onClose: function () { files.forEach(function (_, i) {}); },
      body: '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">' + thumbs + "</div>" +
        '<div class="vpi-field"><label>Chú thích</label><select id="vpiCapSel">' + PRESET_CAPS.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("") + "</select></div>" +
        '<div class="vpi-field" id="vpiCapOther" style="display:none"><input id="vpiCapTxt" maxlength="120" placeholder="Nhập chú thích riêng"></div>' +
        '<label style="display:flex;gap:8px;align-items:flex-start;font-size:13px;margin:6px 0 10px;cursor:pointer"><input type="checkbox" id="vpiAnon" style="margin-top:3px"> ' +
          "<span>Tôi xác nhận ảnh <b>không chứa thông tin nhận dạng người bệnh</b> (họ tên, mã bệnh nhân, ngày sinh trên phim đã được che/xóa).</span></label>" +
        '<div class="auth-err" id="vpiMetaErr" role="alert"></div>' +
        '<div class="vpi-actions"><button type="button" class="vpi-btn" data-close>Hủy</button><button type="button" class="vpi-btn primary" id="vpiMetaGo">Tải lên</button></div>'
    });
    var sel = ov.querySelector("#vpiCapSel");
    sel.addEventListener("change", function () { ov.querySelector("#vpiCapOther").style.display = sel.value === "Khác..." ? "" : "none"; });
    ov.querySelector("#vpiMetaGo").addEventListener("click", function (e) {
      var err = ov.querySelector("#vpiMetaErr");
      if (!ov.querySelector("#vpiAnon").checked) { err.textContent = "Cần xác nhận ảnh đã ẩn thông tin người bệnh."; return; }
      var cap = sel.value === "Khác..." ? ov.querySelector("#vpiCapTxt").value.trim() : sel.value;
      var btn = e.currentTarget; btn.disabled = true;
      var added = [], i = 0;
      (function nxt() {
        if (i >= files.length) {
          var doc = V.getDoc(key), list = (doc.hinhAnh || []).concat(added);
          V.saveDoc(key, Object.assign(doc, { hinhAnh: list })).then(function (r) {
            if (!r.ok) { err.textContent = r.message; btn.disabled = false; btn.textContent = "Tải lên"; return; }
            closeModal(ov); toast("✓ Đã thêm " + added.length + " ảnh.", "ok"); window.VUDAT_APP.refreshCurrent();
          });
          return;
        }
        btn.textContent = "Đang tải " + (i + 1) + "/" + files.length + "...";
        V.uploadContentImage(files[i]).then(function (r) {
          if (!r.ok) { err.textContent = r.message; btn.disabled = false; btn.textContent = "Tải lên"; if (added.length) { var d2 = V.getDoc(key); V.saveDoc(key, Object.assign(d2, { hinhAnh: (d2.hinhAnh || []).concat(added) })); } return; }
          added.push({ src: r.url, caption: cap + (files.length > 1 ? " (" + (i + 1) + ")" : "") });
          i++; nxt();
        });
      })();
    });
  }

  U.showAdmin = showAdmin;
  U.openEditor = openEditor;
  U.onDetailRendered = onDetailRendered;
  U.onGalleryRendered = onGalleryRendered;
})();
