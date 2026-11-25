/* =============================================================================
   CẤU HÌNH KẾT NỐI MÁY CHỦ — SỔ CĐHA, Bệnh viện Vĩnh Phúc VPI
   Điền 2 giá trị lấy ở Supabase → Project Settings → API:
     - Project URL            (dạng https://xxxx.supabase.co)
     - anon / public key      (khóa CÔNG KHAI, được phép để ở đây)
   ⚠️ TUYỆT ĐỐI KHÔNG dán "service_role key" vào file này. Khóa đó chỉ đặt ở biến môi trường Vercel.
   ========================================================================== */
window.VPI_CONFIG = {
  SUPABASE_URL: "https://yctsolorlafyvzygwyqt.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_UwnMmg6nnn1-vN64-JdZSw_LOwX756Q",
  // Tên đăng nhập của nhân viên được ánh xạ thành "<tên>@<miền này>" (không gửi email thật).
  USERNAME_DOMAIN: "cdha-vpi.example.com",
  DEVELOPER: "Vũ Đạt",
  HOSPITAL: "Bệnh viện Vĩnh Phúc VPI"
};
