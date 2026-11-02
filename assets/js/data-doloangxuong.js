/* ============================================================================
   THĂM DÒ CHỨC NĂNG: ĐO MẬT ĐỘ XƯƠNG (DEXA BONE DENSITOMETRY)
   SỔ TAY ĐIỆN TỬ CĐHA — VŨ ĐẠT CĐHA
   Chuẩn hóa theo Hiệp hội Đo mật độ xương quốc tế (ISCD) & Hội Loãng xương Việt Nam
   ============================================================================ */

window.SOTAY_DOLOANGXUONG = {
  thongTinChung: {
    tenKyThuat: "Đo mật độ khoáng chất xương bằng phương pháp hấp thụ tia X năng lượng kép (DEXA / DXA)",
    thietBi: "Máy đo loãng xương DEXA toàn thân (Hologic Discovery / Horizon, GE Lunar Prodigy / iDXA)",
    nguyenLy: "Sử dụng nguồn phát tia X với hai mức năng lượng photon khác nhau (High energy và Low energy). Khi chùm tia đi qua cơ thể, phần mềm toán học phân tách mức độ suy giảm năng lượng của mô mềm và khoáng chất xương, từ đó tính toán chính xác mật độ xương diện tích (Areal BMD) tính bằng đơn vị g/cm².",
    lieuBucXa: "Rất thấp (chỉ khoảng 1 - 5 µSv, tương đương 1/10 liều chụp X-quang ngực thẳng hoặc lượng bức xạ tự nhiên một ngày)."
  },

  chiDinhChongChiDinh: {
    chiDinh: [
      "Tất cả phụ nữ từ 65 tuổi trở lên và nam giới từ 70 tuổi trở lên (dù không có yếu tố nguy cơ lâm sàng).",
      "Phụ nữ sau mãn kinh dưới 65 tuổi hoặc nam giới từ 50 đến 69 tuổi có các yếu tố nguy cơ: Cân nặng thấp (BMI < 19 kg/m²), tiền sử gãy xương do giòn sau 50 tuổi, tiền sử gia đình có bố/mẹ gãy cổ xương đùi, hút thuốc lá, lạm dụng rượu bia (> 3 đơn vị cồn/ngày).",
      "Bệnh nhân sử dụng Corticoid liều kéo dài (tương đương Prednisolone >= 5mg/ngày trong >= 3 tháng).",
      "Mắc các bệnh lý gây loãng xương thứ phát: Viêm khớp dạng thấp, cường cận giáp tiên phát, hội chứng Cushing, suy sinh dục, cắt buồng trứng sớm trước 45 tuổi, bệnh viêm ruột mạn tính (Crohn, loét đại tràng), bệnh thận mạn.",
      "Người bệnh giảm chiều cao > 4cm so với thời trẻ hoặc giảm > 2cm trong vòng 1 năm (nghi ngờ xẹp lún đốt sống thầm lặng).",
      "Theo dõi định kỳ hiệu quả điều trị loãng xương (sau 1 - 2 năm điều trị bằng Bisphosphonate, Denosumab, Teriparatide)."
    ],
    chongChiDinh: [
      "Phụ nữ có thai hoặc nghi ngờ có thai (chống chỉ định tuyệt đối do bức xạ ion hóa).",
      "Bệnh nhân vừa chụp có sử dụng chất cản quang đường tiêu hóa (Baryt) trong vòng 7 - 14 ngày (bột baryt đọng trong ruột sẽ hấp thụ tia X làm tăng BMD giả tạo rất lớn).",
      "Bệnh nhân vừa tiêm chất đồng vị phóng xạ y học hạt nhân (Tc-99m, I-131, PET-CT) trong vòng 3 - 7 ngày.",
      "Có kim loại nhân tạo tại vị trí đo (thay khớp háng toàn phần 2 bên, nẹp vít cố định cột sống L1-L4 toàn bộ) -> Chuyển sang đo xương cẳng tay 33%."
    ]
  },

  quyTrinhDatTuTheVaRoi: [
    {
      viTri: "1. Cột sống thắt lưng (Lumbar Spine: L1 – L4)",
      tuThe: "Người bệnh nằm ngửa ngay ngắn ở giữa bàn đo. Kê khối đệm hình hộp vuông góc dưới cẳng chân để nâng hai đùi tạo góc 60 - 90 độ với thân mình -> Động tác này giúp làm thẳng độ cong ưỡn sinh lý của cột sống thắt lưng, mở rộng các khe đĩa đệm và ép sát cột sống xuống mặt bàn. Tia trung tâm định vị dưới rốn 2 - 3 cm (ngang mức L3-L4).",
      phanTichRoi: "Xác định rõ các đốt sống từ L1 đến L4 (mào chậu ngang mức L4-L5, xương sườn số 12 gắn vào D12). Kiểm tra đường viền bao quanh từng đốt sống.\n" +
                    "⚠️ QUY TẮC LOẠI TRỪ ĐỐT SỐNG (Theo chuẩn ISCD):\n" +
                    "• Loại trừ đốt sống có dị dạng bẩm sinh, gãy xẹp lún hoặc thoái hóa quá nặng (gai xương to, xơ đặc mâm đệm) làm T-score của đốt đó cao bất thường chênh lệch > 1.0 SD so với đốt liền kề.\n" +
                    "• Kết luận T-score cột sống thắt lưng phải dựa trên giá trị trung bình của ít nhất 2 đốt sống liên tiếp (ví dụ: L1-L4, L2-L4, L1-L3). Nếu chỉ còn 1 đốt sống hợp lệ thì không dùng cột sống để chẩn đoán, phải chuyển sang khớp háng hoặc cẳng tay."
    },
    {
      viTri: "2. Khớp háng & Cổ xương đùi (Femoral Neck & Total Hip)",
      tuThe: "Đo khớp háng bên không thuận (hoặc bên không gãy xương, không thoái hóa nặng). Đặt nẹp định vị bàn chân chuyên dụng: Cố định bàn chân xoay trong một góc 15 - 25 độ -> Giúp đưa cổ xương đùi về bình diện song song với mặt bàn, làm lộ rõ toàn bộ chiều dài cổ xương đùi và mấu chuyển lớn không bị chồng lấp.",
      phanTichRoi: "Phần mềm tự động định vị 3 vùng quan tâm (ROI):\n" +
                    "• Cổ xương đùi (Femoral Neck)\n" +
                    "• Vùng mấu chuyển (Trochanter)\n" +
                    "• Khớp háng toàn phần (Total Hip)\n" +
                    "⚠️ QUY TẮC CHẨN ĐOÁN: Theo ISCD, dùng giá trị T-score thấp nhất giữa 'Cổ xương đùi' (Femoral Neck) hoặc 'Khớp háng toàn phần' (Total Hip) để phân loại chẩn đoán. KHÔNG sử dụng vùng Ward để chẩn đoán."
    },
    {
      viTri: "3. Xương cẳng tay 1/3 dưới (Radius 33% / 1/3 distal)",
      tuThe: "Đo ở cẳng tay bên không thuận. Bệnh nhân ngồi cạnh bàn máy, cẳng tay đặt sấp ngay ngắn trên đệm xốp, khớp khuỷu gập 90 độ.",
      phanTichRoi: "Chỉ định đo cẳng tay 33% khi:\n" +
                    "• Không thể đo hoặc kết quả không đánh giá được ở cả hai bên khớp háng và cột sống thắt lưng (thay khớp háng 2 bên, thoái hóa cột sống quá nặng, vẹo cột sống nặng).\n" +
                    "• Bệnh nhân cường tuyến cận giáp tiên phát (Hyperparathyroidism) vì hormone PTH gây tiêu hủy ưu thế xương vỏ ở vùng thân xương cẳng tay.\n" +
                    "• Bệnh nhân có cân nặng vượt quá tải trọng tối đa của bàn máy DEXA (> 135 - 160 kg)."
    }
  ],

  tieuChuanChanDoanWHO: {
    dinhNghiaTScore: "T-score là số độ lệch chuẩn (SD) biểu thị mật độ khoáng chất xương của người bệnh so với mật độ xương đỉnh trung bình của nhóm dân số người trưởng thành khỏe mạnh (20 - 29 tuổi) cùng giới tính.",
    dinhNghiaZScore: "Z-score là số độ lệch chuẩn biểu thị mật độ xương của người bệnh so với người cùng độ tuổi và cùng giới tính.",
    bangPhanLoaiWHO: [
      {
        phanLoai: "Bình thường (Normal)",
        tScore: "T-score >= -1.0 SD",
        yNghia: "Mật độ xương trong giới hạn an toàn. Tiếp tục duy trì chế độ dinh dưỡng giàu canxi (1000-1200 mg/ngày), vitamin D3 (800-1000 IU/ngày) và vận động thể lực."
      },
      {
        phanLoai: "Thiếu xương (Osteopenia / Low bone mass)",
        tScore: "-2.5 SD < T-score < -1.0 SD",
        yNghia: "Mật độ xương giảm mức độ nhẹ đến vừa, tăng nguy cơ tiến triển thành loãng xương. Cần tính toán thang điểm FRAX để quyết định có cần điều trị thuốc ức chế hủy xương hay không."
      },
      {
        phanLoai: "Loãng xương (Osteoporosis)",
        tScore: "T-score <= -2.5 SD",
        yNghia: "Mật độ khoáng xương giảm trầm trọng, cấu trúc bè xương bị xốp mỏng. Bắt buộc can thiệp điều trị thuốc đặc hiệu chống loãng xương (nhóm Bisphosphonate uống hàng tuần/tháng hoặc truyền tĩnh mạch hàng năm, Denosumab...)."
      },
      {
        phanLoai: "Loãng xương nặng (Severe / Established Osteoporosis)",
        tScore: "T-score <= -2.5 SD kèm tiền sử gãy xương",
        yNghia: "Bệnh nhân có T-score <= -2.5 kèm tiền sử có ít nhất 1 lần gãy xương do giòn (chấn thương nhẹ té ngã ở tư thế đứng: gãy cổ xương đùi, xẹp lún đốt sống, gãy Pouteau-Colles đầu dưới xương quay). Cần điều trị tích cực, phối hợp thuốc kích thích tạo xương nếu có điều kiện."
      }
    ],
    luuYZScore: "ĐỐI TƯỢNG ÁP DỤNG Z-SCORE: Phụ nữ tiền mãn kinh, nam giới dưới 50 tuổi và trẻ em:\n" +
                "• Z-score > -2.0 SD: Mật độ xương trong khoảng kỳ vọng theo tuổi (Within expected range for age).\n" +
                "• Z-score <= -2.0 SD: Mật độ xương dưới mức kỳ vọng theo tuổi (Below expected range for age). Cần khẩn trương tìm kiếm các nguyên nhân loãng xương thứ phát (bệnh nội tiết, suy sinh dục, thiếu máu mạn tính, rối loạn hấp thu ruột, dùng corticoid...)."
  },

  congCuFRAX: {
    ten: "Thang điểm FRAX (Fracture Risk Assessment Tool - WHO)",
    moTa: "Mô hình dịch tễ học tính toán xác suất (%) bị gãy xương trong vòng 10 năm tới dựa trên: Tuổi, giới tính, cân nặng, chiều cao, tiền sử gãy xương bản thân, bố mẹ gãy khớp háng, hút thuốc lá, dùng corticoid, viêm khớp dạng thấp, uống rượu và chỉ số BMD cổ xương đùi.",
    nguongCanThiep: [
      "Nguy cơ gãy cổ xương đùi trong 10 năm >= 3% -> Có chỉ định điều trị thuốc chống loãng xương ngay (dù T-score chỉ ở mức thiếu xương).",
      "Nguy cơ gãy xương lớn do loãng xương (cột sống, cẳng tay, khớp háng, khớp vai) trong 10 năm >= 20% -> Có chỉ định điều trị thuốc."
    ]
  }
};
