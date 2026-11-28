/* =============================================================================
   PROTOCOL KỸ THUẬT — BỆNH VIỆN VĨNH PHÚC VPI (Khoa Chẩn đoán hình ảnh)
   - Mỗi protocol là MỘT KHÓA trong đối tượng dưới đây → Admin THÊM / SỬA / XÓA ngay trong app
     (thay đổi lưu trên máy chủ, đồng bộ tức thì tới mọi tài khoản; file này chỉ là BẢN MẪU BAN ĐẦU).
   - Trường dữ liệu: loai (MRI | CT | X-quang | Siêu âm | Khác), nhom (vùng), ten, thuTu (sắp xếp),
     mayApDung, chiDinh[], chuanBi[], tuThe, chuoiXung[{ten, matPhang, thongSo, ghiChu}],
     thuocCanQuang, luuY[], tieuChuanDat[], nguoiDuyet, capNhat, hinhAnh[{src, caption}].
   ⚠️ BẢN MẪU tham khảo theo thực hành phổ biến — Khoa CĐHA cần RÀ SOÁT, ĐIỀU CHỈNH theo máy
      thực tế và PHÊ DUYỆT trước khi áp dụng.
   Phát triển bởi: Vũ Đạt, Bệnh viện Vĩnh Phúc VPI
   ========================================================================== */
window.SOTAY_PROTOCOL_VPI = {
  "vpi-mri-so-nao": {
    id: "vpi-mri-so-nao", loai: "MRI", nhom: "Sọ não", thuTu: 1,
    ten: "MRI sọ não thường quy (không tiêm)",
    mayApDung: "GE SIGNA™ Explorer 1.5T — Head-Neck 16-Channel Coil",
    chiDinh: ["Đau đầu, chóng mặt, co giật chưa rõ nguyên nhân", "Theo dõi tổn thương chất trắng, sa sút trí tuệ", "Sàng lọc trước khi quyết định tiêm thuốc"],
    chuanBi: ["Sàng lọc an toàn MRI (máy tạo nhịp, clip mạch, dị vật kim loại)", "Tháo kim loại, trang sức, thẻ từ; đeo nút tai chống ồn", "Giải thích để người bệnh nằm yên; trẻ nhỏ/kích động: phối hợp gây an thần"],
    tuThe: "Nằm ngửa, đầu vào trước; đầu cố định trong coil bằng đệm. Đèn định vị tại giữa hai chân mày (nasion).",
    chuoiXung: [
      { ten: "3-Plane Localizer", matPhang: "3 mặt phẳng", thongSo: "Định vị nhanh", ghiChu: "Có thể dùng Ready Brain tự căn chỉnh" },
      { ten: "T1 FSE / T1 FLAIR", matPhang: "Sagittal", thongSo: "Lát 5 mm, gap 1 mm, FOV 24 cm", ghiChu: "Đường giữa: thể chai, tuyến yên, hố sau" },
      { ten: "T2 FSE (PROPELLER)", matPhang: "Axial", thongSo: "Lát 5 mm, gap 1 mm, FOV 22–24 cm", ghiChu: "Song song đường AC–PC" },
      { ten: "T2 FLAIR", matPhang: "Axial", thongSo: "Lát 5 mm, gap 1 mm", ghiChu: "Tổn thương quanh não thất, chất trắng" },
      { ten: "DWI b0/b1000 + ADC", matPhang: "Axial", thongSo: "Lát 5 mm", ghiChu: "Bắt buộc — nhồi máu cấp, áp xe" },
      { ten: "SWI / T2* GRE", matPhang: "Axial", thongSo: "Lát 2–5 mm", ghiChu: "Vi xuất huyết, vôi hóa, cavernoma" },
      { ten: "T2 FSE", matPhang: "Coronal", thongSo: "Lát 5 mm", ghiChu: "Khi cần: hải mã, hố yên" }
    ],
    thuocCanQuang: "Không tiêm. Nếu phát hiện tổn thương nghi u/viêm → chuyển protocol có tiêm theo chỉ định bác sĩ.",
    luuY: ["Xem DWI trước khi kết thúc ca để báo ngay bác sĩ nếu nghi nhồi máu cấp", "Người bệnh cử động: dùng PROPELLER, rút ngắn thời gian chuỗi"],
    tieuChuanDat: ["Phủ toàn bộ từ đỉnh sọ đến lỗ chẩm", "Không xảo ảnh chuyển động, đối xứng hai bán cầu"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-mri-so-nao-tiem": {
    id: "vpi-mri-so-nao-tiem", loai: "MRI", nhom: "Sọ não", thuTu: 2,
    ten: "MRI sọ não có tiêm Gadolinium (u, di căn, viêm nhiễm)",
    mayApDung: "GE SIGNA™ Explorer 1.5T — Head-Neck 16-Channel Coil",
    chiDinh: ["Nghi u não nguyên phát / di căn", "Viêm màng não, áp xe, viêm não", "Theo dõi sau phẫu thuật / xạ trị"],
    chuanBi: ["Sàng lọc an toàn MRI", "Khai thác dị ứng thuốc đối quang từ, hen; xét nghiệm eGFR theo quy định khoa", "Đặt đường truyền tĩnh mạch 20–22G"],
    tuThe: "Như MRI sọ não thường quy.",
    chuoiXung: [
      { ten: "Các chuỗi của protocol thường quy", matPhang: "Sag T1 · Ax T2 · Ax FLAIR · Ax DWI · Ax SWI", thongSo: "Như protocol thường quy", ghiChu: "Chụp trước tiêm" },
      { ten: "T1 FSE (trước tiêm)", matPhang: "Axial", thongSo: "Lát 5 mm", ghiChu: "Để so sánh với sau tiêm" },
      { ten: "3D T1 BRAVO + C", matPhang: "Axial (tái tạo Sag/Cor)", thongSo: "Lát 1 mm, đẳng hướng", ghiChu: "Sau tiêm — di căn nhỏ" },
      { ten: "T1 FSE FS + C", matPhang: "Coronal / Sagittal", thongSo: "Lát 4–5 mm", ghiChu: "Màng não, hố yên" },
      { ten: "FLAIR + C (tùy chọn)", matPhang: "Axial", thongSo: "Lát 5 mm", ghiChu: "Viêm màng não, gieo rắc màng não" }
    ],
    thuocCanQuang: "Gadolinium 0,1 mmol/kg (theo hướng dẫn của thuốc đang dùng tại khoa), tiêm tay hoặc máy 1–2 mL/s, bơm NaCl 0,9% 15–20 mL.",
    luuY: ["Theo dõi người bệnh 30 phút sau tiêm; sẵn hộp chống sốc", "Thận trọng khi eGFR < 30 mL/phút/1,73m² — hội chẩn bác sĩ"],
    tieuChuanDat: ["Ngấm thuốc đồng đều, không xảo ảnh dòng chảy che tổn thương"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-mri-cs-that-lung": {
    id: "vpi-mri-cs-that-lung", loai: "MRI", nhom: "Cột sống", thuTu: 3,
    ten: "MRI cột sống thắt lưng",
    mayApDung: "GE SIGNA™ Explorer 1.5T — Spine Coil",
    chiDinh: ["Đau thắt lưng lan chân, thoát vị đĩa đệm", "Hẹp ống sống, trượt đốt sống", "Nghi viêm đĩa đệm – đốt sống, u, chấn thương"],
    chuanBi: ["Sàng lọc an toàn MRI", "Kê gối dưới khoeo cho người bệnh dễ chịu, nằm yên"],
    tuThe: "Nằm ngửa, đầu vào trước; tâm định vị ngang mào chậu / L3.",
    chuoiXung: [
      { ten: "T2 FSE", matPhang: "Sagittal", thongSo: "Lát 4 mm, gap 0,4–1 mm, FOV 28–32 cm", ghiChu: "Từ T11 đến xương cùng" },
      { ten: "T1 FSE", matPhang: "Sagittal", thongSo: "Lát 4 mm", ghiChu: "Tủy xương, gãy xẹp" },
      { ten: "STIR / T2 FS (IDEAL)", matPhang: "Sagittal", thongSo: "Lát 4 mm", ghiChu: "Phù tủy xương, viêm" },
      { ten: "T2 FSE", matPhang: "Axial", thongSo: "Lát 4 mm, song song từng đĩa đệm", ghiChu: "Tối thiểu L3-L4, L4-L5, L5-S1" },
      { ten: "T2 FSE (tùy chọn)", matPhang: "Coronal", thongSo: "Lát 4 mm", ghiChu: "Vẹo cột sống, đám rối thắt lưng" }
    ],
    thuocCanQuang: "Chỉ tiêm khi nghi u, viêm nhiễm hoặc sau mổ đĩa đệm (phân biệt sẹo xơ – thoát vị tái phát).",
    luuY: ["Đặt dải bão hòa (Sat band) phía trước cột sống để giảm xảo ảnh nhu động ruột, mạch máu", "Có nẹp vít: dùng MAVRIC SL / tăng băng thông"],
    tieuChuanDat: ["Sagittal phủ hết hai lỗ liên hợp hai bên", "Axial song song mặt phẳng đĩa đệm"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-mri-cs-co": {
    id: "vpi-mri-cs-co", loai: "MRI", nhom: "Cột sống", thuTu: 4,
    ten: "MRI cột sống cổ",
    mayApDung: "GE SIGNA™ Explorer 1.5T — Head-Neck + Spine Coil",
    chiDinh: ["Đau cổ vai gáy lan tay, thoát vị đĩa đệm cổ", "Bệnh lý tủy cổ, hẹp ống sống cổ", "Chấn thương cột sống cổ"],
    chuanBi: ["Sàng lọc an toàn MRI", "Dặn người bệnh không nuốt khi máy đang chụp"],
    tuThe: "Nằm ngửa, đầu vào trước; tâm định vị ngang sụn giáp (C4–C5).",
    chuoiXung: [
      { ten: "T2 FSE", matPhang: "Sagittal", thongSo: "Lát 3 mm, FOV 24 cm", ghiChu: "Từ hố sau đến T2" },
      { ten: "T1 FSE", matPhang: "Sagittal", thongSo: "Lát 3 mm", ghiChu: "" },
      { ten: "STIR", matPhang: "Sagittal", thongSo: "Lát 3 mm", ghiChu: "Phù tủy, tổn thương dây chằng" },
      { ten: "T2* GRE (MERGE)", matPhang: "Axial", thongSo: "Lát 3 mm, C2–T1", ghiChu: "Tủy cổ, rễ thần kinh" },
      { ten: "T2 FSE", matPhang: "Axial", thongSo: "Lát 3 mm", ghiChu: "Song song đĩa đệm vùng tổn thương" }
    ],
    thuocCanQuang: "Chỉ tiêm khi nghi u, viêm, mảng xơ cứng hoạt động.",
    luuY: ["Đặt Sat band phía trước để giảm xảo ảnh nuốt và dòng chảy"],
    tieuChuanDat: ["Thấy rõ tủy cổ, khoang dịch não tủy trước – sau tủy"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-mri-khop-goi": {
    id: "vpi-mri-khop-goi", loai: "MRI", nhom: "Khớp gối", thuTu: 5,
    ten: "MRI khớp gối",
    mayApDung: "GE SIGNA™ Explorer 1.5T — HD Knee 8-Channel Coil",
    chiDinh: ["Chấn thương: rách sụn chêm, dây chằng chéo, dây chằng bên", "Đau gối mạn, thoái hóa sụn khớp", "Nghi u xương – phần mềm quanh gối"],
    chuanBi: ["Sàng lọc an toàn MRI", "Tháo vật kim loại vùng chân"],
    tuThe: "Nằm ngửa, chân vào trước; gối gấp nhẹ 10–15°, xoay ngoài nhẹ 10–15°; tâm định vị ở cực dưới xương bánh chè.",
    chuoiXung: [
      { ten: "PD FS", matPhang: "Sagittal", thongSo: "Lát 3–3,5 mm, FOV 14–16 cm", ghiChu: "Song song dây chằng chéo trước" },
      { ten: "T1 / PD", matPhang: "Sagittal", thongSo: "Lát 3–3,5 mm", ghiChu: "Giải phẫu, tủy xương" },
      { ten: "PD FS", matPhang: "Coronal", thongSo: "Lát 3 mm", ghiChu: "Song song đường nối hai lồi cầu sau" },
      { ten: "T1", matPhang: "Coronal", thongSo: "Lát 3 mm", ghiChu: "" },
      { ten: "PD FS", matPhang: "Axial", thongSo: "Lát 3–4 mm", ghiChu: "Khớp chè – đùi, sụn bánh chè" },
      { ten: "3D CUBE PD FS (tùy chọn)", matPhang: "Sagittal, tái tạo đa bình diện", thongSo: "Lát 0,6–0,8 mm", ghiChu: "" }
    ],
    thuocCanQuang: "Thường không tiêm; tiêm khi nghi u, viêm màng hoạt dịch.",
    luuY: ["Có khớp nhân tạo/kim loại: MAVRIC SL, tăng băng thông, tránh chuỗi GRE"],
    tieuChuanDat: ["Thấy rõ toàn bộ sụn chêm trong – ngoài, dây chằng chéo trước và sau"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-mri-gan-mrcp": {
    id: "vpi-mri-gan-mrcp", loai: "MRI", nhom: "Gan mật – ổ bụng", thuTu: 6,
    ten: "MRI gan mật – MRCP",
    mayApDung: "GE SIGNA™ Explorer 1.5T — Body / Torso Array Coil",
    chiDinh: ["Sỏi đường mật, giãn đường mật chưa rõ nguyên nhân", "Đặc trưng khối u gan, theo dõi xơ gan", "Bệnh lý tụy, nang tụy"],
    chuanBi: ["Nhịn ăn 4–6 giờ (giảm dịch dạ dày – ruột, túi mật căng)", "Tập nín thở theo khẩu lệnh; đặt đai nhận biết nhịp thở", "Sàng lọc an toàn MRI; đặt đường truyền nếu có tiêm"],
    tuThe: "Nằm ngửa, chân hoặc đầu vào trước; tâm định vị ở mũi ức – bờ sườn.",
    chuoiXung: [
      { ten: "T2 SSFSE", matPhang: "Axial + Coronal", thongSo: "Lát 5–6 mm, nín thở", ghiChu: "" },
      { ten: "T2 FSE FS (gating hô hấp)", matPhang: "Axial", thongSo: "Lát 6 mm", ghiChu: "Tổn thương gan khu trú" },
      { ten: "T1 In/Out phase (LAVA-Flex)", matPhang: "Axial", thongSo: "Nín thở", ghiChu: "Gan nhiễm mỡ, u chứa mỡ" },
      { ten: "DWI b50/b800 + ADC", matPhang: "Axial", thongSo: "Lát 6 mm, gating hô hấp", ghiChu: "" },
      { ten: "MRCP 3D FRFSE / 2D thick-slab", matPhang: "Coronal chếch", thongSo: "3D gating; 2D lát dày 40–60 mm, nhiều góc", ghiChu: "Tái tạo MIP" },
      { ten: "LAVA động học + C", matPhang: "Axial", thongSo: "Trước tiêm, động mạch muộn, TM cửa, muộn 3–5 phút", ghiChu: "Khi có chỉ định tiêm" }
    ],
    thuocCanQuang: "Gadolinium 0,1 mmol/kg, máy tiêm 2 mL/s, bơm NaCl 0,9% 20 mL; thì động mạch dùng bolus tracking hoặc test bolus.",
    luuY: ["Hướng dẫn nín thở cuối thì thở ra, đồng nhất giữa các lần", "Có thể cho uống nước dứa/việt quất trước MRCP để giảm tín hiệu dạ dày – tá tràng (theo quy định khoa)"],
    tieuChuanDat: ["Ống mật chủ và ống tụy thấy liên tục trên MIP", "Không xảo ảnh hô hấp trên chuỗi động học"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-ct-so-nao": {
    id: "vpi-ct-so-nao", loai: "CT", nhom: "Sọ não", thuTu: 10,
    ten: "CT sọ não không tiêm (cấp cứu, chấn thương, đột quỵ)",
    mayApDung: "Máy CT đa dãy đầu thu của khoa",
    chiDinh: ["Chấn thương sọ não", "Nghi đột quỵ (loại trừ xuất huyết)", "Đau đầu dữ dội đột ngột, rối loạn ý thức"],
    chuanBi: ["Tháo kẹp tóc, răng giả tháo lắp, hoa tai", "Khai thác khả năng có thai ở nữ tuổi sinh đẻ", "Che chắn tuyến giáp nếu không ảnh hưởng vùng chụp"],
    tuThe: "Nằm ngửa, đầu vào trước, đặt trong máng đầu; đường OM (lỗ tai – đuôi mắt) vuông góc mặt bàn hoặc nghiêng gantry tránh thủy tinh thể.",
    chuoiXung: [
      { ten: "Scout (Topogram)", matPhang: "Lateral", thongSo: "", ghiChu: "" },
      { ten: "Xoắn ốc / tuần tự", matPhang: "Axial", thongSo: "120 kV, mA tự động theo chỉ số liều; lát 5 mm (tái tạo 0,625–1,25 mm)", ghiChu: "Từ lỗ chẩm đến đỉnh sọ" },
      { ten: "Tái tạo", matPhang: "Axial · Coronal · Sagittal", thongSo: "Kernel nhu mô não (Standard) và xương (Bone)", ghiChu: "Chấn thương: thêm cửa sổ xương, tái tạo 3D xương sọ" }
    ],
    thuocCanQuang: "Không tiêm.",
    luuY: ["Đột quỵ cấp: báo ngay kết quả cho bác sĩ, sẵn sàng làm thêm CTA/CTP nếu có chỉ định", "Kiểm soát liều: CTDIvol tham chiếu sọ não người lớn (theo mức liều tham chiếu khoa đang áp dụng)"],
    tieuChuanDat: ["Phủ đủ từ lỗ chẩm đến đỉnh sọ, không xảo ảnh chuyển động", "Hai bán cầu đối xứng"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-ct-nguc-ldct": {
    id: "vpi-ct-nguc-ldct", loai: "CT", nhom: "Lồng ngực", thuTu: 11,
    ten: "CT ngực liều thấp (sàng lọc ung thư phổi)",
    mayApDung: "Máy CT đa dãy đầu thu của khoa",
    chiDinh: ["Sàng lọc ung thư phổi ở người có nguy cơ cao theo chỉ định bác sĩ", "Theo dõi nốt phổi"],
    chuanBi: ["Tháo vật kim loại vùng ngực", "Tập hít vào – nín thở"],
    tuThe: "Nằm ngửa, hai tay giơ cao qua đầu; tâm định vị ở giữa xương ức.",
    chuoiXung: [
      { ten: "Scout", matPhang: "AP", thongSo: "", ghiChu: "" },
      { ten: "Xoắn ốc liều thấp", matPhang: "Axial", thongSo: "100–120 kV, mA thấp / điều biến liều; mục tiêu CTDIvol ≤ 3 mGy (người chuẩn)", ghiChu: "Từ đỉnh phổi đến hết góc sườn hoành, hít vào nín thở" },
      { ten: "Tái tạo", matPhang: "Axial · Coronal · MIP", thongSo: "Lát 1–1,25 mm, kernel phổi; thêm kernel trung thất", ghiChu: "MIP hỗ trợ tìm nốt" }
    ],
    thuocCanQuang: "Không tiêm.",
    luuY: ["Ghi lại CTDIvol và DLP vào phiếu", "Dùng tái tạo lặp (iterative) để giảm nhiễu khi liều thấp"],
    tieuChuanDat: ["Phủ đủ toàn bộ phổi, không xảo ảnh hô hấp"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  },
  "vpi-ct-bung-3-thi": {
    id: "vpi-ct-bung-3-thi", loai: "CT", nhom: "Ổ bụng – tiểu khung", thuTu: 12,
    ten: "CT bụng – chậu có tiêm thuốc cản quang (đa thì)",
    mayApDung: "Máy CT đa dãy đầu thu + máy tiêm thuốc 2 nòng",
    chiDinh: ["Đánh giá khối u gan, tụy, thận", "Đau bụng chưa rõ nguyên nhân, viêm tụy, áp xe", "Đánh giá giai đoạn ung thư tiêu hóa"],
    chuanBi: ["Nhịn ăn 4–6 giờ", "Xét nghiệm eGFR, khai thác dị ứng / hen / suy thận / đái tháo đường dùng metformin", "Đặt kim 18–20G tĩnh mạch nền khuỷu; uống nước hoặc cản quang đường uống theo quy định khoa"],
    tuThe: "Nằm ngửa, hai tay giơ cao qua đầu; tâm định vị ngang mũi ức.",
    chuoiXung: [
      { ten: "Không tiêm", matPhang: "Axial", thongSo: "120 kV, lát 5 mm; tái tạo 1–1,25 mm", ghiChu: "Vôi hóa, xuất huyết, sỏi" },
      { ten: "Thì động mạch muộn", matPhang: "Axial", thongSo: "Bolus tracking ĐM chủ bụng ngưỡng ~150 HU + trễ ~15 s (≈ 35–40 s)", ghiChu: "Gan, tụy, u giàu mạch" },
      { ten: "Thì tĩnh mạch cửa", matPhang: "Axial (tái tạo Cor/Sag)", thongSo: "≈ 70 s sau tiêm", ghiChu: "Từ vòm hoành đến khớp mu" },
      { ten: "Thì muộn (tùy chỉ định)", matPhang: "Axial", thongSo: "3–5 phút (bài xuất 8–10 phút với hệ tiết niệu)", ghiChu: "U gan, đường bài xuất" }
    ],
    thuocCanQuang: "Thuốc cản quang i-ốt 300–370 mgI/mL, liều ≈ 1–1,5 mL/kg (tối đa theo quy định khoa), tốc độ 3–4 mL/s, bơm NaCl 0,9% 30–40 mL.",
    luuY: ["Theo dõi phản vệ và thoát mạch; sẵn hộp chống sốc", "Ghi CTDIvol, DLP; chỉ chụp các thì cần thiết theo chỉ định"],
    tieuChuanDat: ["ĐM chủ bụng thì động mạch ≥ 250 HU; gan ngấm đều thì TM cửa"],
    nguoiDuyet: "", capNhat: "", hinhAnh: []
  }
};
