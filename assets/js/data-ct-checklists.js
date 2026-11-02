/* ============================================================================
   BẢNG KIỂM KỸ THUẬT CẮT LỚP VI TÍNH (CT-SCANNER CHECKLISTS REGISTRY)
   BỆNH VIỆN VĨNH PHÚC VPI — KHOA CHẨN ĐOÁN HÌNH ẢNH — ADMIN VŨ ĐẠT
   Chuẩn hóa theo khuyến cáo Hội Điện quang & Y học Hạt nhân VN, ACR & ESUR
   Bảng kiểm được liên kết và hiển thị ở PHẦN CUỐI CÙNG của từng kỹ thuật chụp
   ============================================================================ */

window.SOTAY_CT_CHECKLISTS_MAP = {
  /* 1. BẢNG KIỂM CT SỌ NÃO THƯỜNG QUY */
  "ct-so-nao": {
    targetIds: ["ct-so-nao-khong-tiem", "ct-so-nao-tiem"],
    ten: "Bảng kiểm Kỹ thuật CT Sọ não (NECT / CECT)",
    vung: "Sọ não",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & An toàn người bệnh", noiDung: "Xác nhận đúng họ tên, mã ID người bệnh; Loại trừ phụ nữ mang thai; Tháo bỏ hoàn toàn răng giả kim loại, khuyên tai, kẹp tóc, kính mắt." },
      { buoc: 2, tieuDe: "Sàng lọc thuốc cản quang (Nếu có tiêm)", noiDung: "Kiểm tra xét nghiệm Creatinine & eGFR (khuyến cáo >= 45 ml/phút/1.73m2); Khai thác tiền sử dị ứng, hen suyễn; Bệnh nhân tiểu đường dùng Metformin; Ký cam đoan tiêm cản quang; Thiết lập đường truyền TM kim luồn 20G/18G nếp khuỷu, test áp lực thông suốt bằng NaCl 0.9% 20ml." },
      { buoc: 3, tieuDe: "Đặt tư thế & Cố định người bệnh", noiDung: "Người bệnh nằm ngửa, đầu hướng vào gantry (Head First). Đặt đầu ngay ngắn trong giá đỡ đầu chuyên dụng, cằm hơi gập nhẹ để đường hốc mắt - lỗ tai (OM line) song song với mặt phẳng quét. Cố định trán và cằm bằng đai chuyên dụng." },
      { buoc: 4, tieuDe: "Định vị Laser & Chụp Topogram / Scout", noiDung: "Laser dọc giữa trùng rãnh trán; laser ngang qua lỗ tai ngoài. Chụp Scout nghiêng. Đặt trường quét (Scan FOV) từ bờ dưới lỗ chẩm (C1-C2) đến hết đỉnh vòm sọ (Vertex)." },
      { buoc: 5, tieuDe: "Cài đặt thông số & Tối ưu liều ALARA", noiDung: "120 kVp, điều biến liều tự động CARE Dose 4D / SmartmA tương đương 200 - 300 mAs; Độ dày lát cắt tái tạo 0.625 - 1.25 mm. Bật thuật toán lọc xảo ảnh xương đáy sọ và hố sau." },
      { buoc: 6, tieuDe: "Kỹ thuật tiêm cản quang (Nếu có tiêm)", noiDung: "Liều lượng 1.0 - 1.5 ml/kg (50 - 70ml nồng độ 300-350 mgI/ml), tốc độ 2.0 - 2.5 ml/s. Thì tiêm thuốc chụp sau khi bắt đầu tiêm 60 - 70 giây (thì nhu mô tĩnh mạch muộn để thuốc ngấm vỏ bao u/áp xe)." },
      { buoc: 7, tieuDe: "Tái tạo hình ảnh, Đánh giá chất lượng & Lưu PACS", noiDung: "Cửa sổ nhu mô não (WW 80, WL 35-40), cửa sổ hố sau/đột quỵ (WW 30, WL 30), cửa sổ xương sọ (WW 2500, WL 500), cửa sổ máu tụ dưới màng cứng (WW 150, WL 75). Tái tạo đa mặt phẳng Coronal, Sagittal. Kiểm tra không rung lắc, đẩy PACS Bệnh viện Vĩnh Phúc VPI." }
    ]
  },

  /* 2. BẢNG KIỂM CT HÀM MẶT & TAI XƯƠNG ĐÁ */
  "ct-ham-mat": {
    targetIds: ["ct-ham-mat-khong-tiem", "ct-ham-mat-tiem", "ct-tai-xuong-da-khong-tiem"],
    ten: "Bảng kiểm Kỹ thuật CT Hàm Mặt – Xoang – Tai Xương Đá",
    vung: "Đầu mặt cổ",
    cacBuoc: [
      { buoc: 1, tieuDe: "Chuẩn bị & Loại bỏ dị vật", noiDung: "Tháo bỏ khuyên mũi, khuyên tai, răng giả kim loại tháo lắp để tránh tia xảo ảnh che lấp hốc mắt và xoang hàm." },
      { buoc: 2, tieuDe: "Tư thế người bệnh", noiDung: "Nằm ngửa, cằm hơi ngửa nhẹ. Laser dọc giữa chia đôi khuôn mặt, laser ngang qua khóe mắt ngoài." },
      { buoc: 3, tieuDe: "Trường quét Topogram", noiDung: "Từ bờ trên xoang trán đến hết bờ dưới xương hàm dưới (đối với hàm mặt/xoang); Từ bờ trên ống bán khuyên trên đến hết mỏm chũm (đối với tai xương đá HRCT)." },
      { buoc: 4, tieuDe: "Thông số quét độ phân giải cao", noiDung: "Lát cắt siêu mỏng 0.5 - 0.625 mm, Kernel xương sắc nét siêu cao (Ultra-high Bone Kernel), ma trận 512x512." },
      { buoc: 5, tieuDe: "Tái tạo & Đánh giá", noiDung: "Tái tạo MPR Coronal song song thành sau xoang hàm, Sagittal và 3D VRT khung xương mặt. Cửa sổ xương (WW 2500 - 3000, WL 500 - 700)." }
    ]
  },

  /* 3. BẢNG KIỂM CTA MẠCH MÁU NÃO */
  "ct-mach-mau-nao": {
    targetIds: ["ct-mach-mau-nao"],
    ten: "Bảng kiểm Kỹ thuật CTA Mạch Máu Não & Đa Giác Willis",
    vung: "Mạch máu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Đường truyền tĩnh mạch áp lực cao", noiDung: "Bắt buộc đặt kim luồn lớn 18G/20G tại nếp khuỷu. Test máy tiêm điện 2 nòng bằng NaCl 0.9% tốc độ 4.5 - 5.0 ml/s đảm bảo ven thông suốt, không phồng." },
      { buoc: 2, tieuDe: "Tư thế & Cố định đầu tuyệt đối", noiDung: "Nằm ngửa, hai tay xuôi sát đùi (hạ vai tối đa tránh xảo ảnh nền cổ). Cố định đầu bằng băng đai. Dặn người bệnh nuốt nước bọt trước và KHÔNG CỬ ĐỘNG trong lúc chụp." },
      { buoc: 3, tieuDe: "Phạm vi quét Topogram", noiDung: "Từ quai động mạch chủ (ngang D4) lên đến hết đỉnh vòm sọ (Vertex)." },
      { buoc: 4, tieuDe: "Cài đặt Bolus Tracking tự động", noiDung: "Nòng A: 50-60 ml thuốc i-ốt 350-370 mgI/ml; Nòng B: 40 ml NaCl 0.9%. Tốc độ 4.5 - 5.0 ml/s. Đặt ROI tại quai ĐM chủ hoặc ĐM cảnh chung C4, Trigger: 100 - 120 HU." },
      { buoc: 5, tieuDe: "Quét xoắn ốc lát siêu mỏng", noiDung: "Lát cắt 0.5 - 0.625 mm, hướng quét Caudocranial (từ ngực lên đỉnh đầu) bám theo dòng cản quang." },
      { buoc: 6, tieuDe: "Tái tạo mạch máu chuyên sâu", noiDung: "Tái tạo MIP lát mỏng 5-10mm các hướng Axial, Coronal, Sagittal; Dựng hình 3D VRT xóa xương sọ bộc lộ đa giác Willis và túi phình mạch; Đo độ hẹp NASCET." }
    ]
  },

  /* 4. BẢNG KIỂM CT CỘT SỐNG (CỔ, NGỰC, THẮT LƯNG) */
  "ct-cot-song": {
    targetIds: ["ct-cs-co-khong-tiem", "ct-cs-co-tiem", "ct-cs-nguc-khong-tiem", "ct-cs-nguc-tiem", "ct-cs-tl-khong-tiem", "ct-cs-tl-tiem", "ct-mach-mau-tuy"],
    ten: "Bảng kiểm Kỹ thuật CT Cột Sống (Cổ, Ngực, Thắt Lưng)",
    vung: "Cột sống",
    cacBuoc: [
      { buoc: 1, tieuDe: "Đặt tư thế theo từng đoạn cột sống", noiDung: "• CS Cổ: Hai tay xuôi dọc thân, kéo hạ hai vai tối đa (hoặc cho BN cầm quả tạ nhỏ/dây kéo vai) để lộ rõ đốt C7-D1.\n• CS Thắt lưng: Hai tay đưa lên đầu, kê gối dưới khoeo để làm phẳng cột sống." },
      { buoc: 2, tieuDe: "Trường quét Scout View", noiDung: "Chụp Scout AP và Lateral. Đặt trường quét bao phủ đủ đoạn tổn thương cộng thêm ít nhất 1 đốt sống trên và 1 đốt sống dưới." },
      { buoc: 3, tieuDe: "Thông số quét lát mỏng", noiDung: "Lát cắt 0.625 - 1.0 mm, Pitch 0.8, Kernel xương sắc nét (Bone Kernel) kết hợp Kernel mô mềm (Standard)." },
      { buoc: 4, tieuDe: "Tái tạo đa mặt phẳng & 3D", noiDung: "Tái tạo Sagittal uốn theo độ cong cột sống; Tái tạo Axial bẻ góc song song với từng khe đĩa đệm; Dựng hình 3D VRT đánh giá gãy xương vỡ lún cột sống, trật mấu khớp." }
    ]
  },

  /* 5. BẢNG KIỂM CT LỒNG NGỰC & HRCT PHỔI KẼ */
  "ct-long-nguc": {
    targetIds: ["ct-long-nguc-khong-tiem", "ct-long-nguc-tiem", "ct-ref-ldct-phoi"],
    ten: "Bảng kiểm Kỹ thuật CT Lồng Ngực & HRCT Phổi Kẽ",
    vung: "Lồng ngực",
    cacBuoc: [
      { buoc: 1, tieuDe: "Luyện tập nín thở", noiDung: "Hướng dẫn người bệnh hít sâu vào hết mức và NÍN THỞ tuyệt đối trong 5-8 giây. Tháo vòng cổ, áo lót có gọng sắt." },
      { buoc: 2, tieuDe: "Tư thế người bệnh", noiDung: "Nằm ngửa, hai tay giơ cao đặt qua đầu để tránh xảo ảnh tia cứng. Laser ngang mức góc ức." },
      { buoc: 3, tieuDe: "Trường quét toàn diện", noiDung: "Từ trên đỉnh phổi 2cm đến hết hai góc sườn hoành (bao phủ hết tuyến thượng thận hai bên)." },
      { buoc: 4, tieuDe: "Thông số HRCT độ phân giải cao", noiDung: "Lát cắt 0.625 - 1.0 mm, High-resolution Lung Kernel. Bổ sung thì thở ra hết sức (Expiratory CT) nếu nghi ngờ bẫy khí tiểu phế quản." },
      { buoc: 5, tieuDe: "Tái tạo & Cửa sổ hiển thị", noiDung: "Cửa sổ phổi (WW 1500, WL -600), Cửa sổ trung thất (WW 350, WL 40). Tái tạo MinIP phát hiện giãn phế quản; Tái tạo MIP phát hiện nốt mờ phổi." }
    ]
  },

  /* 6. BẢNG KIỂM CT ĐỘNG MẠCH PHỔI (CTPA) */
  "ct-dong-mach-phoi": {
    targetIds: ["ct-ref-ctpa"],
    ten: "Bảng kiểm Kỹ thuật CTPA Động Mạch Phổi Tìm Thuyên Tắc",
    vung: "Lồng ngực",
    cacBuoc: [
      { buoc: 1, tieuDe: "Chuẩn bị đường truyền & Hô hấp", noiDung: "Kim luồn 18G/20G nếp khuỷu. Dặn bệnh nhân hít vào nhẹ nhàng và nín thở (tránh hít sâu đột ngột gây pha loãng thuốc từ TM chủ dưới)." },
      { buoc: 2, tieuDe: "Cài đặt máy tiêm áp lực cao", noiDung: "Nòng A: 50-60 ml thuốc i-ốt 350 mgI/ml; Nòng B: 40 ml NaCl 0.9%. Tốc độ tiêm 4.5 - 5.0 ml/s." },
      { buoc: 3, tieuDe: "Bolus Tracking tại Thân chung ĐM phổi", noiDung: "Đặt ROI tại Thân chung ĐM phổi (Main Pulmonary Artery), ngưỡng Trigger 100 - 130 HU." },
      { buoc: 4, tieuDe: "Hướng quét từ đáy lên đỉnh (Caudocranial)", noiDung: "Quét ngược từ đáy phổi lên đỉnh phổi để bắt trọn đỉnh thuốc ở vùng tập trung nhiều huyết khối nhất." },
      { buoc: 5, tieuDe: "Tái tạo & Đánh giá gánh nặng tim phải", noiDung: "Lát mỏng 1mm cửa sổ mạch máu (WW 600, WL 120). Dựng hình MPR bám nhánh ĐM phổi, đo tỷ số thất phải / thất trái (RV/LV ratio)." }
    ]
  },

  /* 7. BẢNG KIỂM CT ĐỘNG MẠCH VÀNH (CCTA) */
  "ct-dm-vanh": {
    targetIds: ["ct-dm-vanh", "ct-diem-voi-hoa-vanh"],
    ten: "Bảng kiểm Kỹ thuật Chụp CT Động Mạch Vành (CCTA)",
    vung: "Tim mạch",
    cacBuoc: [
      { buoc: 1, tieuDe: "Kiểm soát nhịp tim mục tiêu 55 – 65 l/p", noiDung: "Uống Betaloc (Metoprolol 25-50mg) trước chụp 45-60 phút nếu nhịp tim > 65 l/p. Gắn điện cực ECG theo dõi trực tiếp." },
      { buoc: 2, tieuDe: "Thuốc giãn mạch vành Nitroglycerin", noiDung: "Xịt/ngậm dưới lưỡi 1 liều Nitroglycerin 0.4mg trước chụp 2-3 phút (loại trừ HA < 90 mmHg hoặc dùng thuốc ức chế PDE-5)." },
      { buoc: 3, tieuDe: "Liều cản quang theo công thức WB-IDR", noiDung: "Tính liều cản quang i-ốt 350-370 mgI/ml (50-65ml), tốc độ 5.0 - 5.5 ml/s, bơm đuổi 40-50ml NaCl 0.9%." },
      { buoc: 4, tieuDe: "Bolus Tracking & Đồng thì điện tim (ECG Gating)", noiDung: "ROI tại ĐM chủ lên, Trigger 120-140 HU. Chụp Prospective ECG Triggering ở thì tâm trương 70-75% RR để giảm 80% liều tia." },
      { buoc: 5, tieuDe: "Hậu xử lý mạch vành CAD-RADS", noiDung: "Dựng hình CPR duỗi thẳng các nhánh LAD, LCx, RCA; Dựng 3D VRT tim; Đo hẹp theo phân loại CAD-RADS 2.0." }
    ]
  },

  /* 8. BẢNG KIỂM CT Ổ BỤNG ĐA PHA GAN MẬT TỤY */
  "ct-bung-da-pha": {
    targetIds: ["ct-tang-tren-o-bung-tiem", "ct-tang-tren-o-bung"],
    ten: "Bảng kiểm Kỹ thuật CT Ổ Bụng Đa Pha Động Học (Gan – Tụy)",
    vung: "Ổ bụng",
    cacBuoc: [
      { buoc: 1, tieuDe: "Chuẩn bị đường tiêu hóa", noiDung: "Nhịn ăn >= 4-6 giờ; Cho uống 500-800ml nước lọc trước chụp 30 phút làm căng dạ dày và tá tràng; Kiểm tra eGFR >= 45 ml/phút." },
      { buoc: 2, tieuDe: "Liều thuốc cản quang & Tốc độ", noiDung: "Kim luồn 18G/20G tay phải. Liều 1.5 - 2.0 ml/kg (khoảng 90-120ml loại 350 mgI/ml), tốc độ 3.5 - 4.5 ml/s, đuổi 40ml NaCl 0.9%." },
      { buoc: 3, tieuDe: "Pha 1: Thì trước tiêm (Non-contrast)", noiDung: "Quét từ vòm hoành đến gai chậu trước trên. Tìm vôi hóa, sỏi mật, sỏi thận, mỡ nội u, máu tụ tự nhiên." },
      { buoc: 4, tieuDe: "Pha 2: Thì Động mạch muộn (30 – 35s)", noiDung: "Bolus tracking ĐM chủ bụng (Trigger 120-140 HU + Delay 12s) hoặc cố định 35s. Tìm hiện tượng ngấm thuốc mạnh thì ĐM (APHE) của HCC." },
      { buoc: 5, tieuDe: "Pha 3: Thì Tĩnh mạch cửa (65 – 70s)", noiDung: "Quét ở giây thứ 65-70. Nhu mô gan ngấm tối đa. Đánh giá hiện tượng thải thuốc (washout) của HCC và khảo sát toàn bộ tạng ổ bụng." },
      { buoc: 6, tieuDe: "Pha 4: Thì muộn (3 – 5 phút)", noiDung: "Quét ở phút thứ 3-5. Đánh giá vỏ bao ngấm thuốc của u gan (enhancing capsule), phân biệt u máu và u đường mật xơ sợi." },
      { buoc: 7, tieuDe: "Tái tạo & Phân loại LI-RADS", noiDung: "Tái tạo mỏng 1-2mm Axial, Coronal, Sagittal. Xếp loại tổn thương gan theo bảng tiêu chuẩn quốc tế LI-RADS (LR-1 đến LR-5)." }
    ]
  },

  /* 9. BẢNG KIỂM CT HỆ TIẾT NIỆU (CTU) */
  "ct-he-tiet-nieu": {
    targetIds: ["ct-he-tiet-nieu-tiem", "ct-he-tiet-nieu-thuong-quy"],
    ten: "Bảng kiểm Kỹ thuật CT Hệ Tiết Niệu Đa Pha (CT Urography)",
    vung: "Hệ tiết niệu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Chuẩn bị & Bù nước", noiDung: "Uống 500ml nước lọc trước chụp 30-45 phút, nhịn tiểu để làm căng vừa bàng quang." },
      { buoc: 2, tieuDe: "Pha không tiêm (KUB trên CT)", noiDung: "Quét từ cực trên thận đến bờ dưới khớp mu. Tìm sỏi cản quang đài bể thận, niệu quản và bàng quang." },
      { buoc: 3, tieuDe: "Pha nhu mô thận (80 – 100s)", noiDung: "Tiêm 1.5 ml/kg tốc độ 3.0 ml/s. Quét thì vỏ tủy (30s) và thì nhu mô (80-100s) bộc lộ rõ u thận, áp xe thận." },
      { buoc: 4, tieuDe: "Pha bài xuất (Excretory Phase / 8 – 15 phút)", noiDung: "Thuốc cản quang bài xuất đầy toàn bộ đài bể thận, niệu quản 2 bên và bàng quang. Tìm hẹp niệu quản, u sùi đường dẫn niệu (TCC)." },
      { buoc: 5, tieuDe: "Tái tạo MIP đường dẫn niệu 3D", noiDung: "Tái tạo Coronal MIP toàn bộ cây đường dẫn niệu từ thận xuống bàng quang mô phỏng phim UIV kinh điển." }
    ]
  },

  /* 10. BẢNG KIỂM CTA ĐỘNG MẠCH CHỦ (NGỰC & BỤNG) */
  "ct-dm-chu": {
    targetIds: ["ct-dm-chu-nguc", "ct-dm-chu-chau"],
    ten: "Bảng kiểm Kỹ thuật CTA Động Mạch Chủ Toàn Diện",
    vung: "Mạch máu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Đường truyền & Tiêm áp lực", noiDung: "Kim luồn 18G tĩnh mạch tay phải. Nạp 80-100ml cản quang nồng độ cao 350 mgI/ml, tốc độ 4.0 - 5.0 ml/s, bơm đuổi 40ml NaCl 0.9%." },
      { buoc: 2, tieuDe: "Trường quét từ nền cổ đến hết ngã ba đùi", noiDung: "Từ trên quai ĐM chủ đến hết bờ dưới xương mu (chia nhánh ĐM đùi chung hai bên)." },
      { buoc: 3, tieuDe: "Bolus Tracking tại ĐM chủ lên", noiDung: "Đặt ROI tại ĐM chủ lên, ngưỡng Trigger 120 - 150 HU. Máy tự động quét theo chiều Craniocaudal." },
      { buoc: 4, tieuDe: "Hậu xử lý & Đo đạc bóc tách / phình mạch", noiDung: "Dựng hình CPR duỗi thẳng toàn bộ chiều dài ĐM chủ; Đo đường kính cổ túi phình, góc gập và chiều dài để lập kế hoạch can thiệp đặt Stent Graft (EVAR / TEVAR)." }
    ]
  },

  /* 11. BẢNG KIỂM CT CƠ XƯƠNG KHỚP & CHI */
  "ct-xuong-khop": {
    targetIds: ["ct-khop-khong-tiem", "ct-xuong-chi-khong-tiem", "ct-khop-arthrography", "ct-mach-chi-duoi", "ct-mach-chi-tren"],
    ten: "Bảng kiểm Kỹ thuật CT Cơ Xương Khớp & Tái Tạo 3D",
    vung: "Xương khớp",
    cacBuoc: [
      { buoc: 1, tieuDe: "Tư thế đối xứng hai bên", noiDung: "Đặt hai chi đối xứng để so sánh; Chi đối bên kê lệch ra ngoài trường quét nếu chỉ khảo sát 1 bên để giảm liều tia và tránh xảo ảnh." },
      { buoc: 2, tieuDe: "Thông số quét siêu mỏng", noiDung: "Lát cắt 0.5 - 0.75 mm, Pitch 0.6 - 0.8, Kernel xương sắc nét." },
      { buoc: 3, tieuDe: "Dựng hình 3D VRT xương khớp", noiDung: "Tái tạo 3D thể tích xoay mọi góc nhìn; Cắt bỏ xương chậu che lấp chỏm xương đùi; Đánh giá đường gãy phức tạp nội khớp phục vụ phẫu thuật kết hợp xương." }
    ]
  },

  /* 12. BẢNG KIỂM CT ĐA CHẤN THƯƠNG TOÀN THÂN (PAN-SCAN) */
  "ct-da-chan-thuong": {
    targetIds: ["ct-toan-than-da-chan-thuong-khong-tiem", "ct-tam-soat-toan-than"],
    ten: "Bảng kiểm Kỹ thuật CT Đa Chấn Thương Toàn Thân (Polytrauma Pan-Scan)",
    vung: "Toàn thân cấp cứu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Phối hợp Hồi sức Cấp cứu tại chỗ", noiDung: "Tiến hành quét khẩn cấp song song kiểm soát hô hấp tuần hoàn, nẹp cổ cứng chống tổn thương tủy sống, hai tay đặt trên ngực hoặc giơ cao có hỗ trợ." },
      { buoc: 2, tieuDe: "Thì 1: CT Sọ não & Cột sống cổ không tiêm", noiDung: "Quét từ đỉnh sọ đến hết đốt sống ngực D1. Phát hiện xuất huyết nội sọ, phù não, gãy vỡ xương sọ và trật đốt sống cổ cấp tính." },
      { buoc: 3, tieuDe: "Thì 2: Tiêm cản quang quét một khối từ ngực đến hết tiểu khung", noiDung: "Liều 100-120ml cản quang tốc độ 3.5 - 4.0 ml/s. Quét thì tĩnh mạch cửa phối hợp (65s) hoặc kỹ thuật Split-bolus (tiêm 2 lần để bắt đồng thời cả thì động mạch và tĩnh mạch trong 1 lần quét duy nhất)." },
      { buoc: 4, tieuDe: "Tìm kiếm các tổn thương chí mạng (Category 1)", noiDung: "Tìm tràn khí/máu màng phổi áp lực, rách vỡ eo ĐM chủ ngực, thoát thuốc cản quang hoạt động (active contrast extravasation) thể hiện đang chảy máu trong gan/lách/thận/tiểu khung, liềm khí tự do vỡ tạng rỗng." }
    ]
  }
};

/* Helper lấy bảng kiểm tương ứng với mã kỹ thuật bất kỳ */
window.getChecklistForProtocol = function(protocolId) {
  if (!protocolId) return null;
  var map = window.SOTAY_CT_CHECKLISTS_MAP;
  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      var item = map[key];
      if (item.targetIds && item.targetIds.indexOf(protocolId) !== -1) {
        return item;
      }
    }
  }
  return null;
};
