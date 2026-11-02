/* ============================================================================
   CÔNG CỤ TÍNH TOÁN & CẤP CỨU CĐHA (CLINICAL TOOLS & CALCULATORS)
   SỔ TAY ĐIỆN TỬ CĐHA — VŨ ĐẠT CĐHA
   ============================================================================ */

window.SOTAY_CONGCU = {
  /* 1. MÁY TÍNH LIỀU THUỐC CẢN QUANG CT THƯỜNG QUY */
  lieuCanQuang: {
    loaiKhaoSat: [
      { ten: "Thường quy (Đa số vùng)", mlKgMin: 1.5, mlKgMax: 2.0, tocDo: "3.0 – 4.0 ml/s" },
      { ten: "Liều thấp hơn (Một số protocol)", mlKgMin: 1.0, mlKgMax: 1.5, tocDo: "2.0 – 3.0 ml/s" },
      { ten: "Gan mật đa pha (Liver 3-4 phase)", mlKgMin: 1.8, mlKgMax: 2.0, tocDo: "3.5 – 4.5 ml/s" },
      { ten: "Động mạch phổi (CTPA)", mlKgMin: 1.0, mlKgMax: 1.2, tocDo: "4.5 – 5.0 ml/s" },
      { ten: "CTA Mạch não / Đa giác Willis", mlKgMin: 1.0, mlKgMax: 1.2, tocDo: "4.5 – 5.0 ml/s" }
    ],
    congThucMacDinh: 1.5,
    nongDo: [300, 320, 350, 370, 400],
    nongDoMacDinh: 350,
    nguongEGFR: {
      canTrong: 45,
      chongChiDinh: 30
    },
    luuY: [
      "Liều cản quang tính theo cân nặng lý tưởng (nếu bệnh nhân béo phì tính theo lean body mass).",
      "Luôn bơm đuổi 30 - 50 ml nước muối sinh lý NaCl 0.9% sau thuốc với cùng tốc độ tiêm để tận dụng lượng thuốc trong dây nối và lòng tĩnh mạch.",
      "Đối chiếu eGFR trước tiêm: eGFR < 45 ml/phút cần bù dịch dự phòng; eGFR < 30 ml/phút chống chỉ định tương đối."
    ]
  },

  /* 2. MÁY TÍNH LIỀU CCTA (ĐỘNG MẠCH VÀNH) THEO WB-IDR */
  lieuCCTA: {
    nguon: "Từ điển CT – CT Coronary Smart Protocol v3.2 (Khoa CĐHA & Hướng dẫn SCCT)",
    canNang: { min: 20, max: 150, macDinh: 65 },
    idr: { min: 0.010, max: 0.030, macDinh: 0.021 }, // gI/kg/s
    nongDo: [300, 320, 350, 370],
    nongDoMacDinh: 350,
    thoiGian: { min: 10, max: 15, macDinh: 12 }, // giây
    bangThamChieu: [
      { can: "< 60 kg", bmi: "< 22", kvp: "80 - 100 kVp", idr: "0.018 - 0.020 gI/kg/s", luuY: "Ưu tiên 80-100 kVp để tăng độ tương phản i-ốt và giảm liều tia" },
      { can: "60 – 75 kg", bmi: "22 - 25", kvp: "100 kVp", idr: "0.021 gI/kg/s", luuY: "Tốc độ tiêm 4.5 - 5.0 ml/s" },
      { can: "75 – 90 kg", bmi: "25 - 30", kvp: "100 - 120 kVp", idr: "0.022 - 0.025 gI/kg/s", luuY: "Tốc độ tiêm 5.0 - 5.5 ml/s" },
      { can: "> 90 kg", bmi: "> 30", kvp: "120 kVp", idr: "0.025 - 0.028 gI/kg/s", luuY: "Tốc độ tiêm 5.5 - 6.0 ml/s, kim luồn 18G" }
    ],
    luuY: [
      "Công thức: Tốc độ tiêm (Flow rate ml/s) = (Cân nặng x IDR) / (Nồng độ i-ốt / 1000).",
      "Tổng thể tích thuốc (ml) = Tốc độ tiêm x Thời gian tiêm (giây).",
      "Bơm đuổi bằng nước muối sinh lý NaCl 0.9% ít nhất 40-50 ml ở cùng tốc độ tiêm."
    ]
  },

  /* 3. MÁY TÍNH LIỀU ADRENALIN CẤP CỨU PHẢN VỆ THEO CÂN NẶNG */
  tinhLieuAdrenalin: function(canNangKg) {
    var w = parseFloat(canNangKg) || 60;
    if (w < 5) w = 5;
    if (w > 150) w = 150;

    var lieuBapMg = 0.5;
    var lieuBapMl = 0.5;
    var moTa = "";

    if (w < 10) {
      lieuBapMg = 0.1;
      lieuBapMl = 0.1;
      moTa = "0.1 ml (1/10 ống 1mg/1ml) tiêm bắp đùi trước ngoài bằng bơm tiêm 1ml";
    } else if (w < 20) {
      lieuBapMg = 0.15;
      lieuBapMl = 0.15;
      moTa = "0.15 ml (khoảng 1/7 ống) tiêm bắp đùi bằng bơm tiêm 1ml";
    } else if (w < 30) {
      lieuBapMg = 0.2;
      lieuBapMl = 0.2;
      moTa = "0.2 ml (1/5 ống) tiêm bắp đùi bằng bơm tiêm 1ml";
    } else if (w < 50) {
      lieuBapMg = 0.3;
      lieuBapMl = 0.3;
      moTa = "0.3 ml (1/3 ống) tiêm bắp đùi bằng bơm tiêm 1ml hoặc 3ml";
    } else {
      lieuBapMg = 0.5;
      lieuBapMl = 0.5;
      moTa = "1/2 ống (0.5 ml = 0.5 mg) tiêm bắp sâu mặt trước ngoài đùi. Nhắc lại sau 3-5 phút nếu huyết áp chưa lên";
    }

    // Liều truyền tĩnh mạch duy trì: 0.1 ug/kg/phút
    // Pha 1 ống 1mg Adrenalin vào 50ml NaCl 0.9% -> nồng độ 20 ug/ml
    // Tốc độ truyền (ml/h) = (w * 0.1 * 60) / 20 = w * 0.3 ml/h
    var tocDoTruyenMlH = (w * 0.3).toFixed(1);

    return {
      canNang: w,
      lieuBapMg: lieuBapMg,
      lieuBapMl: lieuBapMl,
      moTaBap: moTa,
      phaTruyen: "Pha 1 ống Adrenalin 1mg/1ml vào 50ml NaCl 0.9% (bơm tiêm điện nồng độ 20 µg/ml)",
      tocDoKhoiDau: tocDoTruyenMlH + " ml/giờ (tương đương 0.1 µg/kg/phút)",
      buDich: "Truyền nhanh NaCl 0.9% " + (w >= 40 ? "1000 – 2000 ml" : (w * 20) + " ml") + " trong giờ đầu chống sốc giãn mạch"
    };
  }
};
