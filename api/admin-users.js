/* =============================================================================
   /api/admin-users — Vercel Serverless Function (Node 18+)
   SỔ CĐHA — Bệnh viện Vĩnh Phúc VPI | Phát triển bởi: Vũ Đạt

   Việc tạo / đặt lại mật khẩu / khóa / xóa tài khoản cần quyền service-role của Supabase.
   Khóa này CHỈ nằm ở biến môi trường Vercel (SUPABASE_SERVICE_ROLE_KEY), KHÔNG bao giờ gửi xuống
   trình duyệt. Mỗi yêu cầu đều được xác thực: người gọi phải đăng nhập và là Admin đang hoạt động.
   ========================================================================== */
"use strict";
const crypto = require("crypto");

const SB_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const USER_DOMAIN = process.env.USERNAME_DOMAIN || "cdha-vpi.example.com";
const USERNAME_RE = /^[a-z0-9._-]{3,32}$/;

function json(res, code, body) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function tempPassword() {
  // 12 ký tự, bỏ ký tự dễ nhầm (0/O, 1/l/I)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  const bytes = crypto.randomBytes(12);
  for (let i = 0; i < 12; i++) out += alphabet[bytes[i] % alphabet.length];
  return out + "#7";
}

async function sb(path, opts) {
  opts = opts || {};
  const hdr = { apikey: SB_SERVICE, "Content-Type": "application/json" };
  // Khóa kiểu mới (sb_secret_...) không phải JWT: chỉ gửi qua apikey. Khóa service_role cũ (JWT) thì gửi cả Authorization.
  if (opts.bearer) hdr.Authorization = "Bearer " + opts.bearer;
  else if (!/^sb_/.test(SB_SERVICE)) hdr.Authorization = "Bearer " + SB_SERVICE;
  const r = await fetch(SB_URL + path, {
    method: opts.method || "GET",
    headers: Object.assign(hdr, opts.headers || {}),
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  const text = await r.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  return { ok: r.ok, status: r.status, data };
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 20000) throw new Error("Payload quá lớn");
    chunks.push(c);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch (e) { return {}; }
}

function str(v, max) {
  if (v === undefined || v === null) return null;
  v = String(v).trim();
  return v ? v.slice(0, max) : null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  if (!SB_URL || !SB_SERVICE) return json(res, 500, { error: "Máy chủ chưa được cấu hình (thiếu biến môi trường)." });

  // Chống CSRF từ trang khác: chỉ nhận cùng nguồn gốc
  const origin = req.headers.origin;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (origin) {
    try { if (new URL(origin).host !== host) return json(res, 403, { error: "Forbidden" }); }
    catch (e) { return json(res, 403, { error: "Forbidden" }); }
  }

  // 1) Xác thực người gọi
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return json(res, 401, { error: "Chưa đăng nhập" });
  const me = await sb("/auth/v1/user", { bearer: token });
  if (!me.ok || !me.data || !me.data.id) return json(res, 401, { error: "Phiên đăng nhập không hợp lệ" });
  const caller = me.data.id;
  const prof = await sb("/rest/v1/profiles?select=id,role,status,full_name&id=eq." + encodeURIComponent(caller));
  const cp = prof.ok && prof.data && prof.data[0];
  if (!cp || cp.role !== "admin" || cp.status !== "active") return json(res, 403, { error: "Chỉ Admin mới có quyền này" });

  let b;
  try { b = await readBody(req); } catch (e) { return json(res, 400, { error: "Dữ liệu không hợp lệ" }); }
  const action = b.action;

  try {
    // ---------------------------------------------------------------- create
    if (action === "create") {
      const username = String(b.username || "").trim().toLowerCase();
      const fullName = str(b.full_name, 100);
      if (!USERNAME_RE.test(username)) return json(res, 400, { error: "Tên đăng nhập 3–32 ký tự: chữ thường không dấu, số, . _ -" });
      if (!fullName || fullName.length < 2) return json(res, 400, { error: "Thiếu họ tên" });
      const role = b.role === "admin" ? "admin" : "staff";
      const password = tempPassword();
      const created = await sb("/auth/v1/admin/users", {
        method: "POST",
        body: { email: username + "@" + USER_DOMAIN, password, email_confirm: true, user_metadata: { full_name: fullName } }
      });
      if (!created.ok) {
        const exists = created.status === 422 || /already|registered|exists/i.test(JSON.stringify(created.data));
        return json(res, exists ? 409 : 500, { error: exists ? "Tên đăng nhập đã tồn tại" : "Không tạo được tài khoản" });
      }
      const uid = created.data.id;
      const ins = await sb("/rest/v1/profiles", {
        method: "POST", headers: { Prefer: "return=minimal" },
        body: {
          id: uid, username, full_name: fullName, role, status: "active", must_change_password: true,
          title: str(b.title, 100), department: str(b.department, 100), phone: str(b.phone, 30)
        }
      });
      if (!ins.ok) {
        await sb("/auth/v1/admin/users/" + uid, { method: "DELETE" }); // hoàn tác
        return json(res, 500, { error: "Không tạo được hồ sơ" });
      }
      if (b.request_id) {
        await sb("/rest/v1/account_requests?id=eq." + encodeURIComponent(String(b.request_id)), {
          method: "PATCH", headers: { Prefer: "return=minimal" }, body: { status: "approved" }
        });
      }
      return json(res, 200, { ok: true, user_id: uid, username, temp_password: password });
    }

    // -------------------------------------------------------- reset_password
    if (action === "reset_password") {
      const uid = str(b.user_id, 64);
      if (!uid) return json(res, 400, { error: "Thiếu user_id" });
      const password = tempPassword();
      const r = await sb("/auth/v1/admin/users/" + encodeURIComponent(uid), { method: "PUT", body: { password } });
      if (!r.ok) return json(res, 500, { error: "Không đặt lại được mật khẩu" });
      await sb("/rest/v1/profiles?id=eq." + encodeURIComponent(uid), {
        method: "PATCH", headers: { Prefer: "return=minimal" }, body: { must_change_password: true }
      });
      return json(res, 200, { ok: true, temp_password: password });
    }

    // ------------------------------------------------------------ set_status
    if (action === "set_status") {
      const uid = str(b.user_id, 64);
      const status = b.status === "disabled" ? "disabled" : "active";
      if (!uid) return json(res, 400, { error: "Thiếu user_id" });
      if (uid === caller && status === "disabled") return json(res, 400, { error: "Không thể tự khóa tài khoản của mình" });
      await sb("/rest/v1/profiles?id=eq." + encodeURIComponent(uid), {
        method: "PATCH", headers: { Prefer: "return=minimal" }, body: { status }
      });
      await sb("/auth/v1/admin/users/" + encodeURIComponent(uid), {
        method: "PUT", body: { ban_duration: status === "disabled" ? "876000h" : "none" }
      });
      return json(res, 200, { ok: true });
    }

    // -------------------------------------------------------------- set_role
    if (action === "set_role") {
      const uid = str(b.user_id, 64);
      const role = b.role === "admin" ? "admin" : "staff";
      if (!uid) return json(res, 400, { error: "Thiếu user_id" });
      if (uid === caller && role !== "admin") return json(res, 400, { error: "Không thể tự hạ quyền của mình" });
      await sb("/rest/v1/profiles?id=eq." + encodeURIComponent(uid), {
        method: "PATCH", headers: { Prefer: "return=minimal" }, body: { role }
      });
      return json(res, 200, { ok: true });
    }

    // ---------------------------------------------------------------- delete
    if (action === "delete") {
      const uid = str(b.user_id, 64);
      if (!uid) return json(res, 400, { error: "Thiếu user_id" });
      if (uid === caller) return json(res, 400, { error: "Không thể tự xóa tài khoản của mình" });
      const r = await sb("/auth/v1/admin/users/" + encodeURIComponent(uid), { method: "DELETE" });
      if (!r.ok) return json(res, 500, { error: "Không xóa được tài khoản" });
      return json(res, 200, { ok: true });
    }

    return json(res, 400, { error: "Hành động không hợp lệ" });
  } catch (e) {
    return json(res, 500, { error: "Lỗi máy chủ" });
  }
};
