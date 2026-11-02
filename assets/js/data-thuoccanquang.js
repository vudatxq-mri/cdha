/* ============================================================================
   DANH MỤC THUỐC CẢN QUANG & ĐỐI QUANG TỪ (CONTRAST MEDIA DIRECTORY)
   BỆNH VIỆN VĨNH PHÚC VPI — KHOA CHẨN ĐOÁN HÌNH ẢNH
   Chuẩn hóa theo ACR Manual on Contrast Media 2023, ESUR Guidelines & Bộ Y tế
   Tích hợp đồ họa bao bì, hình ảnh chai/lọ/bơm tiêm đóng sẵn và thông số chi tiết
   ============================================================================ */

window.SOTAY_THUOCCANQUANG = {
  /* =========================================================================
     1. THUỐC CẢN QUANG CHO CT-SCANNER (IODINATED CONTRAST MEDIA - ICM)
     ========================================================================= */
  thuocCT: [
    {
      id: "ct-omnipaque",
      tenThuongMai: "Omnipaque",
      hoatChat: "Iohexol",
      hangSanXuat: "GE Healthcare (Mỹ / Na Uy)",
      cauTruc: "Monomer không ion hóa (Non-ionic monomer)",
      nongDo: "300 mgI/ml & 350 mgI/ml",
      apLucThamThau: "672 mOsm/kg H2O (ở 350 mgI/ml) — Độ thẩm thấu thấp (LOCM)",
      doNhot: "10.4 mPa.s tại 37°C",
      quyCach: "Chai thủy tinh / nhựa 50ml, 100ml",
      theTichChuan: "100 ml",
      loaiBaoBi: "Chai truyền dịch có vạch chia dung tích",
      mauNhanDien: "#0284c7",
      mauNap: "#0369a1",
      dacDiemLamSang: "Dòng thuốc cản quang kinh điển, rất phổ biến tại các bệnh viện Việt Nam. Dung nạp mô tốt, giá thành hợp lý, dùng rộng rãi cho chụp CT ngực, bụng, sọ não thường quy."
    },
    {
      id: "ct-ultravist",
      tenThuongMai: "Ultravist",
      hoatChat: "Iopromide",
      hangSanXuat: "Bayer Healthcare (Đức)",
      cauTruc: "Monomer không ion hóa (Non-ionic monomer)",
      nongDo: "300 mgI/ml & 370 mgI/ml",
      apLucThamThau: "774 mOsm/kg H2O (ở 370 mgI/ml) — LOCM",
      doNhot: "9.5 mPa.s tại 37°C — Độ nhớt thấp",
      quyCach: "Chai thủy tinh 50ml, 100ml",
      theTichChuan: "100 ml",
      loaiBaoBi: "Chai thủy tinh chịu áp lực bơm tiêm cao",
      mauNhanDien: "#ea580c",
      mauNap: "#c2410c",
      dacDiemLamSang: "Đặc tính độ nhớt thấp hơn đáng kể so với các dòng khác, giúp giảm áp lực bơm tiêm, cực kỳ thích hợp cho tiêm tốc độ cao (4.0 - 5.5 ml/s) trong chụp CTA mạch máu, động mạch phổi và động mạch vành CCTA."
    },
    {
      id: "ct-xenetix",
      tenThuongMai: "Xenetix",
      hoatChat: "Iobitridol",
      hangSanXuat: "Guerbet (Pháp)",
      cauTruc: "Monomer không ion hóa (Non-ionic monomer)",
      nongDo: "300 mgI/ml & 350 mgI/ml",
      apLucThamThau: "695 mOsm/kg H2O (ở 350 mgI/ml) — LOCM",
      doNhot: "11.0 mPa.s tại 37°C",
      quyCach: "Lọ 50ml, 100ml",
      theTichChuan: "100 ml",
      loaiBaoBi: "Lọ thủy tinh màng ưa nước an toàn",
      mauNhanDien: "#0d9488",
      mauNap: "#0f766e",
      dacDiemLamSang: "Phân tử có lớp màng bảo vệ ưa nước (Hydrophilic shell) che chắn nhân thơm i-ốt, giúp giảm tương tác với thụ thể tế bào và giảm tỷ lệ phản ứng dị ứng giả (Pseudo-allergic reaction). An toàn cao cho bệnh nhân cơ địa nhạy cảm."
    },
    {
      id: "ct-visipaque",
      tenThuongMai: "Visipaque",
      hoatChat: "Iodixanol",
      hangSanXuat: "GE Healthcare (Mỹ / Na Uy)",
      cauTruc: "Dimer không ion hóa (Non-ionic dimer)",
      nongDo: "270 mgI/ml & 320 mgI/ml",
      apLucThamThau: "290 mOsm/kg H2O — ĐỒNG ÁP LỰC THẨM THẤU (ISOSMOLAR - IOCM)",
      doNhot: "11.8 mPa.s tại 37°C (ở 320 mgI/ml)",
      quyCach: "Chai 50ml, 100ml",
      theTichChuan: "100 ml",
      loaiBaoBi: "Chai nhựa y tế an toàn thận (Isosmolar)",
      mauNhanDien: "#d97706",
      mauNap: "#b45309",
      dacDiemLamSang: "DUY NHẤT có áp lực thẩm thấu bằng chính xác áp lực máu người (290 mOsm/kg). Không gây rối loạn điện giải tế bào, không kích thích co mạch thận, giảm thiểu tối đa cảm giác nóng bừng khi tiêm. LỰA CHỌN SỐ 1 cho người bệnh suy tim, đái tháo đường, suy giảm chức năng thận (eGFR 30-44 ml/min) hoặc người cao tuổi."
    },
    {
      id: "ct-iomeron",
      tenThuongMai: "Iomeron",
      hoatChat: "Iomeprol",
      hangSanXuat: "Bracco (Ý)",
      cauTruc: "Monomer không ion hóa (Non-ionic monomer)",
      nongDo: "350 mgI/ml & 400 mgI/ml (Nồng độ i-ốt cực cao)",
      apLucThamThau: "726 mOsm/kg H2O (ở 400 mgI/ml)",
      doNhot: "12.6 mPa.s tại 37°C",
      quyCach: "Lọ 50ml, 100ml",
      theTichChuan: "100 ml",
      loaiBaoBi: "Lọ thủy tinh nồng độ đậm đặc cao",
      mauNhanDien: "#be123c",
      mauNap: "#9f1239",
      dacDiemLamSang: "Nồng độ i-ốt lên đến 400 mgI/ml giúp tạo độ tương phản đỉnh (Peak Enhancement) cực đại với thể tích tiêm nhỏ hơn. Chuyên dùng cho chụp can thiệp tim mạch, chụp mạch tạng và CT mạch máu ngoại vi."
    },
    {
      id: "ct-optiray",
      tenThuongMai: "Optiray",
      hoatChat: "Ioversol",
      hangSanXuat: "Guerbet (Mỹ / Pháp)",
      cauTruc: "Monomer không ion hóa (Non-ionic monomer)",
      nongDo: "300 mgI/ml & 350 mgI/ml",
      apLucThamThau: "792 mOsm/kg H2O (ở 350 mgI/ml) — LOCM",
      doNhot: "9.0 mPa.s tại 37°C",
      quyCach: "Lọ 50ml, 100ml",
      theTichChuan: "100 ml",
      loaiBaoBi: "Lọ dung dịch tiêm độ nhớt thấp",
      mauNhanDien: "#7c3aed",
      mauNap: "#6d28d9",
      dacDiemLamSang: "Độ hòa tan cao, tính ổn định nhiệt độ tốt, độ nhớt thấp, dùng rộng rãi cho toàn bộ các kỹ thuật cắt lớp vi tính toàn thân."
    }
  ],

  /* =========================================================================
     2. THUỐC ĐỐI QUANG TỪ CHO MRI (GADOLINIUM-BASED CONTRAST AGENTS - GBCA)
     ========================================================================= */
  thuocMRI: [
    {
      id: "mri-dotarem",
      tenThuongMai: "Dotarem / Clariscan",
      hoatChat: "Gadoterate meglumine",
      hangSanXuat: "Guerbet (Pháp) / GE Healthcare",
      cauTruc: "Cấu trúc Vòng (Macrocyclic), Ion hóa",
      nongDo: "0.5 mol/L (0.5M)",
      doThuThaoTu: "r1 = 3.6 L/mmol.s (tại 1.5T, 37°C)",
      quyCach: "Lọ / Bơm tiêm đóng sẵn 10ml, 15ml, 20ml",
      theTichChuan: "15 ml",
      loaiBaoBi: "Bơm tiêm đóng sẵn (Prefilled Syringe) hoặc lọ thủy tinh",
      mauNhanDien: "#0284c7",
      mauNap: "#0369a1",
      anToanNSF: "NHÓM NGUY CƠ NSF CỰC THẤP (Nhóm II theo ACR / ESUR)",
      dacDiemLamSang: "Cấu trúc vòng Macrocyclic lồng ion Gadolinium (Gd3+) cực kỳ bền vững, hằng số phân ly nhiệt động học cao nhất, đào thải nguyên vẹn 100% qua thận mà không giải phóng Gd tự do. Rất an toàn, phổ biến nhất tại Việt Nam cho MRI sọ não, cột sống, xương khớp, phần mềm."
    },
    {
      id: "mri-gadovist",
      tenThuongMai: "Gadovist",
      hoatChat: "Gadobutrol",
      hangSanXuat: "Bayer Healthcare (Đức)",
      cauTruc: "Cấu trúc Vòng (Macrocyclic), Không ion hóa",
      nongDo: "1.0 mol/L (1.0M — NỒNG ĐỘ CAO GẤP ĐÔI)",
      doThuThaoTu: "r1 = 5.2 L/mmol.s (độ hồi phục T1 rất cao)",
      quyCach: "Lọ / Bơm tiêm đóng sẵn 7.5ml, 10ml, 15ml",
      theTichChuan: "10 ml",
      loaiBaoBi: "Bơm tiêm đóng sẵn nồng độ cao 1.0M",
      mauNhanDien: "#db2777",
      mauNap: "#be185d",
      anToanNSF: "NHÓM NGUY CƠ NSF CỰC THẤP (Nhóm II theo ACR)",
      dacDiemLamSang: "Nồng độ 1.0M giúp thể tích tiêm chỉ bằng 1/2 so với thuốc thường (0.1 ml/kg thay vì 0.2 ml/kg). Bolus thuốc đậm đặc đi vào hệ tuần hoàn rất sắc nét, cho tín hiệu sáng vượt trội trên hình T1W. Lựa chọn hàng đầu cho chụp tưới máu não (Perfusion MRI), MRA mạch máu và ung bướu."
    },
    {
      id: "mri-primovist",
      tenThuongMai: "Primovist (Eovist)",
      hoatChat: "Gadoxetate disodium (Gd-EOB-DTPA)",
      hangSanXuat: "Bayer Healthcare (Đức)",
      cauTruc: "Thuốc ĐẶC HIỆU TẾ BÀO GAN MẬT (Hepatobiliary Contrast Agent)",
      nongDo: "0.25 mol/L",
      doThuThaoTu: "r1 = 6.9 L/mmol.s",
      quyCach: "Bơm tiêm đóng sẵn 10ml",
      theTichChuan: "10 ml",
      loaiBaoBi: "Bơm tiêm đóng sẵn chuyên biệt gan mật",
      mauNhanDien: "#16a34a",
      mauNap: "#15803d",
      anToanNSF: "Nhóm II (Cực kỳ an toàn, liều tiêm rất nhỏ)",
      dacDiemLamSang: "Thuốc có cơ chế đào thải độc nhất vô nhị: 50% qua thận, 50% được tế bào gan bình thường hấp thu qua thụ thể OATP1B1/B3 và bài xuất qua đường mật. Chụp được cả 2 thì: Thì mạch máu động học (30 giây) và THÌ GAN MẬT (Hepatobiliary Phase ở phút thứ 20). TIÊU CHUẨN VÀNG phân biệt HCC sớm (mất chức năng tế bào gan -> khuyết tín hiệu đen) với Tăng sản thể nốt FNH (chứa tế bào gan lành -> bắt thuốc sáng)."
    },
    {
      id: "mri-prohance",
      tenThuongMai: "ProHance",
      hoatChat: "Gadoteridol",
      hangSanXuat: "Bracco (Ý)",
      cauTruc: "Cấu trúc Vòng (Macrocyclic), Không ion hóa",
      nongDo: "0.5 mol/L",
      doThuThaoTu: "r1 = 4.1 L/mmol.s",
      quyCach: "Lọ 10ml, 15ml, 20ml",
      theTichChuan: "15 ml",
      loaiBaoBi: "Lọ thủy tinh Type I không đệm meglumine",
      mauNhanDien: "#4f46e5",
      mauNap: "#4338ca",
      anToanNSF: "Nhóm II (Nguy cơ NSF cực thấp)",
      dacDiemLamSang: "Tính ổn định phân tử cao, độ dung nạp mô thần kinh rất tốt, không chứa chất đệm meglumine nên phù hợp cho cả bệnh nhân ăn kiêng muối nghiêm ngặt."
    },
    {
      id: "mri-multihance",
      tenThuongMai: "Multihance",
      hoatChat: "Gadobenate dimeglumine",
      hangSanXuat: "Bracco (Ý)",
      cauTruc: "Cấu trúc Chuỗi thẳng (Linear), Đào thải kép (95% thận, 3-5% gan)",
      nongDo: "0.5 mol/L",
      doThuThaoTu: "r1 = 6.3 L/mmol.s (rất cao do gắn kết protein huyết tương)",
      quyCach: "Lọ 10ml, 15ml, 20ml",
      theTichChuan: "15 ml",
      loaiBaoBi: "Lọ dung dịch tiêm gắn kết protein",
      mauNhanDien: "#0891b2",
      mauNap: "#0e7490",
      anToanNSF: "Nhóm III (Theo dõi chặt chẽ, thận trọng ở BN suy thận)",
      dacDiemLamSang: "Tín hiệu tương phản rất sáng do gắn kết protein. Tuy nhiên do cấu trúc chuỗi thẳng, cần hạn chế dùng ở bệnh nhân có eGFR < 30 ml/min."
    }
  ],

  /* =========================================================================
     3. QUY TRÌNH AN TOÀN CHỨC NĂNG THẬN & DỰ PHÒNG CIN / PC-AKI
     ========================================================================= */
  anToanChucNangThan: {
    dinhNghiaPCAKI: "Tổn thương thận cấp sau tiêm thuốc cản quang (Post-Contrast Acute Kidney Injury - PC-AKI): Tình trạng nồng độ Creatinine huyết thanh tăng >= 26.5 µmol/L (0.3 mg/dL) hoặc tăng >= 50% so với giá trị nền trong vòng 48 giờ sau tiêm cản quang.",
    nguongDanhGiaEGFR: [
      {
        mucEGFR: "eGFR >= 45 ml/phút/1.73m2",
        danhGia: "Nguy cơ PC-AKI cực thấp (< 1%)",
        khuyenCao: "Chụp thuốc cản quang bình thường. Khuyến khích người bệnh uống nhiều nước (1.5 - 2 lít) trong ngày trước và sau chụp."
      },
      {
        mucEGFR: "eGFR 30 – 44 ml/phút/1.73m2",
        danhGia: "Nguy cơ PC-AKI trung bình (2 - 5%)",
        khuyenCao: "Cân nhắc kỹ chỉ định (có phương pháp khác thay thế như Siêu âm, MRI không tiêm không?). Nếu bắt buộc tiêm: ÁP DỤNG PHÁC ĐỒ BÙ DỊCH BẮT BUỘC bằng NaCl 0.9%; Ưu tiên chọn thuốc cản quang đồng áp lực thẩm thấu (Visipaque); Sử dụng thể tích thuốc tối thiểu cần thiết."
      },
      {
        mucEGFR: "eGFR < 30 ml/phút/1.73m2 (Suy thận nặng)",
        danhGia: "Nguy cơ PC-AKI cao (> 15%) hoặc nguy cơ Xơ hóa hệ thống do thận (NSF)",
        khuyenCao: "CHỐNG CHỈ ĐỊNH TƯƠNG ĐỐI. Chỉ tiêm trong tình huống cấp cứu đe dọa tính mạng (bóc tách ĐM chủ, nhồi máu mạc treo...). Cần có chỉ định của Bác sĩ chuyên khoa, giải thích ký cam kết nguy cơ phải lọc máu chu kỳ, hội chẩn bác sĩ Thận nhân tạo sẵn sàng."
      }
    ],
    phacDoBuDichChuan: [
      "Phác đồ truyền dịch đường tĩnh mạch kinh điển: Truyền dung dịch Natri Clorid 0.9% với tốc độ 1.0 ml/kg/giờ trong vòng 6 - 12 giờ trước khi chụp và tiếp tục duy trì 6 - 12 giờ sau khi chụp.",
      "Phác đồ truyền dịch nhanh (Cấp cứu / Ngoại trú): Truyền Natri Clorid 0.9% liều 3.0 ml/kg trong vòng 1 giờ trước khi tiêm và 1.0 - 1.5 ml/kg/giờ trong vòng 4 - 6 giờ sau tiêm.",
      "Lưu ý: Không dùng dung dịch kiềm hóa Bicarbonat thường quy; Không khuyến cáo sử dụng N-acetylcystein (NAC) vì các thử nghiệm ngẫu nhiên lớn (PRESERVE trial) chứng minh NAC không vượt trội hơn truyền dịch NaCl 0.9% đơn thuần."
    ]
  },

  /* =========================================================================
     4. PHÁC ĐỒ DỰ PHÒNG TIỀN MÊ (PRE-MEDICATION) CHO BỆNH NHÂN CÓ TIỀN SỬ DỊ ỨNG
     ========================================================================= */
  phacDoTienMe: {
    chiDinh: "Chỉ định cho bệnh nhân có tiền sử phản ứng dị ứng vừa hoặc nặng với thuốc cản quang ở lần chụp trước mà lần này bắt buộc phải chụp lại.",
    phacDo13Gio: [
      "Prednisone 50 mg (uống) lúc 13 giờ, 7 giờ và 1 giờ trước thời điểm tiêm thuốc cản quang.",
      "Phối hợp: Diphenhydramine (Dimedrol) 50 mg (uống hoặc tiêm bắp) lúc 1 giờ trước khi tiêm thuốc cản quang.",
      "Thay thế nếu không uống được: Methylprednisolone (Solu-Medrol) 32 mg hoặc 40 mg tiêm tĩnh mạch ở các mốc thời gian tương tự."
    ],
    phacDoKhanCap4Gio: [
      "Áp dụng khi cần chụp cấp cứu trong ngày: Hydrocortisone 200 mg tiêm tĩnh mạch ngay lập tức và nhắc lại mỗi 4 giờ cho đến khi chụp (kèm Diphenhydramine 50 mg tiêm bắp trước chụp 1 giờ)."
    ]
  },

  /* =========================================================================
     5. BỘ TẠO ĐỒ HỌA HÌNH ẢNH MINH HỌA BAO BÌ CHAI / LỌ / BƠM TIÊM THUỐC
     ========================================================================= */
  getBottleSvg: function (item) {
    var c = item.mauNhanDien || "#0284c7";
    var cap = item.mauNap || "#0369a1";
    var name = item.tenThuongMai.split("/")[0].trim().toUpperCase();
    var act = item.hoatChat;
    var conc = item.nongDo.split("&")[0].trim();
    var vol = item.theTichChuan || "100 ml";
    var isSyringe = (item.loaiBaoBi && item.loaiBaoBi.indexOf("Bơm tiêm") !== -1);

    if (isSyringe) {
      // Đồ họa Bơm tiêm đóng sẵn (Prefilled Syringe) chuyên dụng MRI
      return (
        '<svg viewBox="0 0 140 190" class="contrast-visual-svg" xmlns="http://www.w3.org/2000/svg">' +
          '<defs>' +
            '<linearGradient id="syrGrad_' + item.id + '" x1="0" y1="0" x2="1" y2="0">' +
              '<stop offset="0%" stop-color="#f8fafc" />' +
              '<stop offset="50%" stop-color="#ffffff" />' +
              '<stop offset="100%" stop-color="#e2e8f0" />' +
            '</linearGradient>' +
          '</defs>' +
          '<rect x="63" y="10" width="14" height="42" fill="#94a3b8" rx="2" stroke="#475569" stroke-width="1.5"/>' +
          '<path d="M49 10 h42 v5 h-42 z" fill="#64748b" stroke="#334155" stroke-width="1.5"/>' +
          '<rect x="57" y="48" width="26" height="8" rx="3" fill="' + cap + '"/>' +
          '<rect x="47" y="54" width="46" height="110" rx="6" fill="url(#syrGrad_' + item.id + ')" stroke="#334155" stroke-width="2"/>' +
          '<rect x="63" y="164" width="14" height="18" fill="' + cap + '" stroke="#1e293b" stroke-width="1.5"/>' +
          '<rect x="67" y="182" width="6" height="8" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>' +
          '<rect x="51" y="70" width="38" height="74" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>' +
          '<rect x="51" y="70" width="38" height="14" fill="' + c + '" rx="4 4 0 0"/>' +
          '<text x="70" y="80" font-size="7" font-weight="900" fill="#ffffff" text-anchor="middle">GBCA</text>' +
          '<text x="70" y="96" font-size="7.5" font-weight="900" fill="#0f172a" text-anchor="middle">' + name + '</text>' +
          '<text x="70" y="108" font-size="6.5" font-weight="800" fill="' + c + '" text-anchor="middle">' + conc + '</text>' +
          '<text x="70" y="122" font-size="6" fill="#64748b" text-anchor="middle">' + vol + '</text>' +
          '<line x1="83" y1="80" x2="91" y2="80" stroke="#64748b" stroke-width="1.2"/>' +
          '<line x1="85" y1="95" x2="91" y2="95" stroke="#94a3b8" stroke-width="1"/>' +
          '<line x1="83" y1="110" x2="91" y2="110" stroke="#64748b" stroke-width="1.2"/>' +
          '<line x1="85" y1="125" x2="91" y2="125" stroke="#94a3b8" stroke-width="1"/>' +
          '<line x1="83" y1="140" x2="91" y2="140" stroke="#64748b" stroke-width="1.2"/>' +
        '</svg>'
      );
    } else {
      // Đồ họa Chai / Lọ truyền dịch CT / MRI
      return (
        '<svg viewBox="0 0 140 190" class="contrast-visual-svg" xmlns="http://www.w3.org/2000/svg">' +
          '<defs>' +
            '<linearGradient id="botGrad_' + item.id + '" x1="0" y1="0" x2="1" y2="0">' +
              '<stop offset="0%" stop-color="#f1f5f9" />' +
              '<stop offset="35%" stop-color="#ffffff" />' +
              '<stop offset="100%" stop-color="#cbd5e1" />' +
            '</linearGradient>' +
          '</defs>' +
          '<rect x="52" y="12" width="36" height="18" rx="4" fill="' + cap + '" stroke="#0f172a" stroke-width="1.5"/>' +
          '<rect x="56" y="8" width="28" height="6" rx="2" fill="' + cap + '"/>' +
          '<rect x="58" y="30" width="24" height="14" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>' +
          '<rect x="30" y="44" width="80" height="132" rx="16" fill="url(#botGrad_' + item.id + ')" stroke="#334155" stroke-width="2"/>' +
          '<path d="M35 55 Q42 50 48 50 v116 Q40 166 35 158 Z" fill="#ffffff" opacity="0.6"/>' +
          '<rect x="36" y="64" width="68" height="96" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>' +
          '<rect x="36" y="64" width="68" height="18" fill="' + c + '" rx="6 6 0 0"/>' +
          '<text x="70" y="77" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">' + (item.cauTruc && item.cauTruc.indexOf("Dimer") !== -1 ? "IOCM 290" : "CONTRAST") + '</text>' +
          '<text x="70" y="98" font-size="9" font-weight="900" fill="#0f172a" text-anchor="middle">' + name + '</text>' +
          '<text x="70" y="112" font-size="8" font-weight="800" fill="' + c + '" text-anchor="middle">' + conc + '</text>' +
          '<text x="70" y="125" font-size="6.5" font-weight="600" fill="#475569" text-anchor="middle">' + act + '</text>' +
          '<rect x="46" y="134" width="48" height="16" rx="3" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>' +
          '<text x="70" y="145" font-size="8" font-weight="800" fill="#1e293b" text-anchor="middle">' + vol + '</text>' +
          '<line x1="92" y1="85" x2="102" y2="85" stroke="#64748b" stroke-width="1.2"/>' +
          '<line x1="96" y1="105" x2="102" y2="105" stroke="#94a3b8" stroke-width="1"/>' +
          '<line x1="92" y1="125" x2="102" y2="125" stroke="#64748b" stroke-width="1.2"/>' +
          '<line x1="96" y1="145" x2="102" y2="145" stroke="#94a3b8" stroke-width="1"/>' +
        '</svg>'
      );
    }
  }
};
