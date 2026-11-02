# BỆNH VIỆN VĨNH PHÚC VPI — SỔ TAY ĐIỆN TỬ & ĐÀO TẠO THỰC HÀNH CĐHA
**Đơn vị:** Bệnh viện Vĩnh Phúc VPI — Khoa Chẩn Đoán Hình Ảnh  
**Chủ biên / Quản trị:** Admin Vũ Đạt  
**Tên địa chỉ nhận diện:** `vudat.cdha...`  
**Phiên bản:** v2.5 Clinical & LMS Edition

---

## 🏥 TỔNG QUAN HỆ THỐNG
Nền tảng sổ tay điện tử và đào tạo thực hành Chẩn đoán Hình ảnh của **Bệnh viện Vĩnh Phúc VPI** được xây dựng nhằm chuẩn hóa quy trình kỹ thuật chụp, bảng kiểm an toàn và kiểm soát quá trình học tập thực hành của bác sĩ, kỹ thuật viên và học viên:

1. **Cấu trúc bài học chuẩn sư phạm y khoa 4 phần**:
   - **Phần 1: Nguyên lý & Chỉ định lâm sàng**: Cơ chế tạo ảnh, chỉ định, chống chỉ định, chuẩn bị người bệnh.
   - **Phần 2: Các thông số kỹ thuật**: kVp, mAs, FOV, Matrix, Lát cắt, Pitch, Kernel, TR/TE, thông số 3 hãng Siemens/Philips/GE, liều thuốc cản quang.
   - **Phần 3: Kỹ thuật chụp & Quy trình các bước**: Chiếu thế, hướng tia, trường quét, khẩu lệnh nín thở, các thì chụp đa pha, tái tạo MPR/MIP/VRT, tiêu chuẩn đánh giá phim.
   - **Phần 4: Bảng kiểm thực hành (Checklist)**: Bảng kiểm tương tác từng bước được **sắp xếp ở phần cuối cùng** của kỹ thuật đó, hỗ trợ tích chọn trực quan.

2. **Phân loại danh mục theo Nhóm Vùng Cơ Thể**:
   - 🧠 **Sọ não & Đầu mặt cổ**: Sọ thẳng/nghiêng, xoang, hàm mặt, xương đá, CTA mạch não, MRI sọ não...
   - 🦴 **Cột sống**: Cổ, Ngực, Thắt lưng, Cùng cụt, Mạch máu tủy...
   - 🫁 **Lồng ngực & Tim mạch**: Ngực thẳng/nghiêng, HRCT phổi kẽ, CTPA động mạch phổi, CCTA động mạch vành...
   - 🩺 **Ổ bụng & Tiểu khung**: Bụng KUB, CT gan đa pha, CT tụy, CTU hệ tiết niệu, MRCP 3D đường mật...
   - 💪 **Chi trên & Các khớp**: Vai, Cánh tay, Khuỷu, Cẳng tay, Cổ tay, Xương thuyền, Bàn tay...
   - 🦵 **Chi dưới & Các khớp**: Khung chậu, Háng, Đùi, Gối, Cẳng chân, Cổ chân, Bàn chân...
   - 🌐 **Toàn thân & Kỹ thuật đặc biệt**: Đa chấn thương (Polytrauma Pan-scan), tầm soát toàn thân...
   - ⚙️ **Thông số & An toàn**: kVp, mAs, ALARA, An toàn bức xạ, Vật lý MRI, Dự phòng CIN...

3. **Hệ thống Kiểm soát Học Tuần Tự (LMS Engine)**:
   - Học viên đăng ký tài khoản và học theo lộ trình tuần tự.
   - Hoàn thành bài trước mới mở khóa bài tiếp theo (khóa 🔒 ➔ mở khóa 🔓 ➔ hoàn thành ✅).
   - Nút bật **Chế độ Giảng viên (Admin Vũ Đạt)** cho phép mở khóa toàn bộ tức thì khi cần tra cứu khẩn cấp trong ca trực.

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

## 🚀 HƯỚNG DẪN SỬ DỤNG
* **Chạy ứng dụng**: Nhấp đúp chuột vào file `index.html` để mở trong trình duyệt (Chrome, Edge, Safari...).
* **Đăng nhập nhanh**:
  - 👑 **Admin Vũ Đạt**: `vudat` • Mật khẩu `123` (Toàn quyền xem mọi bài).
  - 🎓 **Học viên mới**: `hocvien` • Mật khẩu `123` (Học tuần tự).

---
*Bản quyền nội dung thuộc Bệnh viện Vĩnh Phúc VPI — Khoa Chẩn Đoán Hình Ảnh — Admin Vũ Đạt.*
