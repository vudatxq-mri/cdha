# SỔ CĐHA — BỆNH VIỆN VĨNH PHÚC VPI
**Tên ứng dụng:** SỔ CĐHA (chuẩn hóa đồng bộ cùng 5S VPI và CĐHA VPI)  
**Đơn vị:** Bệnh viện Vĩnh Phúc VPI — Khoa Chẩn Đoán Hình Ảnh  
**Địa chỉ Vercel Cloud:** `https://sotay-cdha-vudat.vercel.app/`  
**Liên hệ:** Email: vudatxq@gmail.com | Hotline: +84916306115  
**Phiên bản:** v2.7 Clinical Admin & Safety Edition (Phối màu phân hệ riêng • Quyền Admin Cài đặt • Cảnh báo an toàn nổi bật)

---

## 🏥 TỔNG QUAN HỆ THỐNG
Nền tảng sổ tay điện tử và đào tạo thực hành Chẩn đoán Hình ảnh của **Bệnh viện Vĩnh Phúc VPI** được xây dựng nhằm chuẩn hóa quy trình kỹ thuật chụp, bảng kiểm an toàn và kiểm soát quá trình học tập thực hành của bác sĩ, kỹ thuật viên và học viên:

1. **Cấu trúc bài học chuẩn sư phạm y khoa 4 phần**:
   - **Phần 1: Nguyên lý & Chỉ định lâm sàng**: Cơ chế tạo ảnh, chỉ định, chống chỉ định, chuẩn bị người bệnh.
   - **Phần 2: Các thông số kỹ thuật**: kVp, mAs, FOV, Matrix, Lát cắt, Pitch, Kernel, TR/TE, thông số 3 hãng Siemens/Philips/GE, liều thuốc cản quang.
   - **Phần 3: Kỹ thuật chụp & Quy trình các bước**: Chiếu thế, hướng tia, trường quét, khẩu lệnh nín thở, các thì chụp đa pha, tái tạo MPR/MIP/VRT, tiêu chuẩn đánh giá phim.
   - **Phần 4: Bảng kiểm an toàn (Checklist)**: Bảng kiểm 7 bước an toàn được tích hợp ở cuối mỗi kỹ thuật.

2. **Cài đặt App ra màn hình chính (Progressive Web App - PWA)**:
   - Cài đặt trực tiếp lên điện thoại iPhone, Android và máy tính Windows, Mac.
   - Khởi động siêu tốc trong 0.2 giây như một phần mềm độc lập, không thanh địa chỉ trình duyệt.

3. **Chế độ Xem Ngoại Viện & Offline (Service Worker)**:
   - Lưu trữ toàn bộ 210+ kỹ thuật, phác đồ cấp cứu phản vệ, bảng liều cản quang trực tiếp vào bộ nhớ thiết bị.
   - Hoạt động 100% khi ra ngoài bệnh viện, đi công tác, trên xe cấp cứu hoặc trong phòng chụp chắn sóng không có mạng.

4. **Bảo Mật An Toàn Nội Bộ (Mã PIN & Auto-lock)**:
   - Tương tự như hệ thống **App 5S** và **Quản trị CĐHA**:
     - Khóa bằng mã PIN 4 số (Mặc định: `1234`, có thể đổi trong Cài đặt).
     - Tùy chọn phạm vi bảo vệ: Khóa toàn bộ App hoặc chỉ khóa vùng Nhạy cảm (Cấp cứu, Cản quang, Cài đặt).
     - Tự động khóa phiên làm việc (Auto-lock) sau 5 - 15 - 30 phút không thao tác.
     - Tuân thủ Bộ 83 Tiêu chí Chất lượng Bệnh viện (Quyết định 6858/QĐ-BYT).

---

## 🎨 HỆ THỐNG MÀU SẮC 8 PHÂN HỆ
* 🦴 **X-quang**: Màu Xanh Ngọc / Cyan (`#0284c7`) — Có hình ảnh tư thế chụp, hướng tia, phim chuẩn.
* ⭕ **CT-Scanner**: Màu Xanh Sapphire / Cobalt (`#2563eb`) — Tích hợp bảng kiểm 7 bước an toàn ở cuối bài.
* 🧲 **MRI Master**: Màu Tím Hoàng Gia / Indigo (`#4f46e5`) — Hướng đặt cắt mrimaster.com & thông số 3 hãng.
* 🔊 **Siêu âm Tổng quát**: Màu Xanh Lục Bảo / Emerald (`#059669`) — TI-RADS, BI-RADS, FAST, Doppler.
* 🎯 **Siêu âm Can thiệp**: Màu Cam San Hô / Tangerine (`#ea580c`) — Bảng kiểm vô trùng, FNA, CNB, Pigtail, RFA.
* 📊 **TDCN: Đo Loãng Xương**: Màu Tím Thạch Anh / Violet (`#7c3aed`) — DEXA, ROI L1-L4, Khớp háng, WHO.
* 🧪 **Thuốc Cản Quang & ĐQT**: Màu Hồng Cánh Sen / Magenta (`#db2777`) — Dược thư CT/MRI, eGFR, máy tính liều.
* 🚨 **Tai Biến & Cấp Cứu**: Màu Đỏ Báo Động / Crimson (`#dc2626`) — Phản vệ TT 51/2017, Adrenalin, Thoát mạch.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT APP RA MÀN HÌNH CHÍNH
1. **Trên iPhone / iPad (Safari)**:
   - Mở link: `https://sotay-cdha-vudat.vercel.app/`
   - Bấm nút **Chia sẻ** (biểu tượng ⎋ ở dưới cùng).
   - Chọn **"Thêm vào MH chính"** (Add to Home Screen ➕).
   - Nhấn **"Thêm"** (Add).

2. **Trên Android (Chrome / Cốc Cốc)**:
   - Mở link: `https://sotay-cdha-vudat.vercel.app/`
   - Bấm nút **"📲 Cài App"** trên thanh đầu trang hoặc bấm menu 3 chấm (⋮) ➔ Chọn **"Cài đặt ứng dụng"**.

3. **Trên Máy tính (Windows / Mac)**:
   - Mở link trên Chrome hoặc Edge ➔ Bấm biểu tượng Cài đặt 🖥️ trên thanh địa chỉ URL.

---
*Bản quyền nội dung thuộc Bệnh viện Vĩnh Phúc VPI — Khoa Chẩn Đoán Hình Ảnh.*
