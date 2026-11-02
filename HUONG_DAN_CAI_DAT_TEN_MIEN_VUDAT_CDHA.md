# HƯỚNG DẪN CÀI ĐẶT ĐỊA CHỈ TRUY CẬP VUDAT.CDHA CHO SỔ TAY CĐHA
**BỆNH VIỆN VĨNH PHÚC VPI — KHOA CHẨN ĐOÁN HÌNH ẢNH**
*Hotline: +84916306115 — Email: vudatxq@gmail.com*

---

Hệ thống Sổ tay điện tử CĐHA được xây dựng dưới dạng ứng dụng Web tĩnh (Zero Build Step, Pure HTML5/CSS3/JavaScript), sẵn sàng chạy offline không phụ thuộc internet và có thể cấu hình tên miền `vudat.cdha` theo 2 phương án tùy theo nhu cầu:

---

## PHƯƠNG ÁN 1: SỬ DỤNG NGAY LẬP TỨC TRÊN MÁY TÍNH & MẠNG NỘI BỘ BỆNH VIỆN (CHỈ MẤT 30 GIÂY)

Phương án này phù hợp nhất cho các máy trạm chụp X-quang, CT, MRI, phòng đọc kết quả PACS của Bệnh viện Vĩnh Phúc VPI.

### Bước 1: Trỏ tên miền `vudat.cdha` trên máy tính
1. Nhấn phím **Windows**, gõ `Notepad`.
2. Nhấp chuột phải vào biểu tượng Notepad, chọn **"Run as administrator"** (Chạy dưới quyền quản trị viên).
3. Trong Notepad, chọn **File** ➔ **Open** (hoặc nhấn `Ctrl + O`).
4. Dán đường dẫn sau vào ô File name:
   ```
   C:\Windows\System32\drivers\etc\hosts
   ```
   *(Nhớ chọn góc dưới bên phải là **"All Files (*.*)"** để thấy file `hosts`)*.
5. Thêm dòng sau vào cuối cùng của tệp:
   ```text
   127.0.0.1   vudat.cdha
   ```
6. Nhấn `Ctrl + S` để lưu file lại.

### Bước 2: Khởi chạy ứng dụng
- Nhấp đúp chuột vào tệp **`CHAY_SOTAY_VUDAT_CDHA.bat`** có sẵn trong thư mục gốc.
- Trình duyệt sẽ tự động mở ra. Bạn có thể gõ ngay trên thanh địa chỉ:
  ```
  http://vudat.cdha:8080/
  ```
  *(Nếu muốn chạy cổng mặc định 80 không cần gõ `:8080`, chỉ cần sửa số 8080 thành 80 trong file .bat)*.

### Bước 3: Cho phép các máy khác trong Khoa/Bệnh viện cùng truy cập qua mạng LAN / Wi-Fi
1. Trên máy chủ (máy của bạn), mở `cmd` gõ `ipconfig` để lấy địa chỉ IP LAN (ví dụ: `192.168.1.150`).
2. Trên các máy tính khác trong khoa hoặc điện thoại kết nối cùng Wi-Fi bệnh viện:
   - Thêm vào file hosts của các máy đó:
     ```text
     192.168.1.150   vudat.cdha
     ```
   - Hoặc truy cập trực tiếp bằng địa chỉ: `http://192.168.1.150:8080/`.

---

## PHƯƠNG ÁN 2: ĐƯA LÊN MẠNG INTERNET 24/7 MIỄN PHÍ VỚI TÊN MIỀN TÙY CHỌN

### Cách A: Triển khai qua GitHub Pages (Miễn phí 100%, có SSL HTTPS)
1. Đăng ký tài khoản miễn phí tại [github.com](https://github.com).
2. Tạo mới một Repository đặt tên là `vudat-cdha`.
3. Tải toàn bộ mã nguồn thư mục này lên Repository đó.
4. Vào mục **Settings** ➔ **Pages** ➔ Ở mục Branch chọn **main** (hoặc master) và folder `/ (root)` ➔ Nhấn **Save**.
5. Sau 1 phút, trang web sẽ hoạt động online tại:
   ```
   https://<username>.github.io/vudat-cdha/
   ```
6. Nếu bạn mua tên miền riêng (ví dụ: `vudat.cdha.vn`):
   - Trong phần **Custom domain** của GitHub Pages, điền `vudat.cdha.vn`.
   - Cấu hình bản ghi CNAME tại nhà cung cấp tên miền (PA Vietnam, Mắt Bão, Cloudflare...) trỏ về `<username>.github.io`.

### Cách B: Triển khai qua Cloudflare Pages (Tốc độ tại Việt Nam cực nhanh)
1. Đăng nhập [cloudflare.com](https://dash.cloudflare.com).
2. Chọn **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Upload assets**.
3. Kéo thả toàn bộ thư mục `SỔ TAY CĐHA` lên Cloudflare.
4. Đặt tên project: `vudat-cdha`. Trang web sẽ có địa chỉ trực tuyến ngay lập tức:
   ```
   https://vudat-cdha.pages.dev
   ```
5. Bạn có thể liên kết Custom Domain `vudat.cdha.vn` hoặc subdomain chỉ bằng 1 cú nhấp chuột.

---

## THÔNG TIN HỖ TRỢ KỸ THUẬT
- **Đơn vị:** Khoa Chẩn Đoán Hình Ảnh — Bệnh viện Vĩnh Phúc VPI
- **Email:** vudatxq@gmail.com
- **Hotline:** +84916306115
