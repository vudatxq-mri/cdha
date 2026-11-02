/* ============================================================================
   CÁC TAI BIẾN THƯỜNG GẶP TRONG CĐHA & PHÁC ĐỒ CẤP CỨU
   SỔ TAY ĐIỆN TỬ CĐHA — VŨ ĐẠT CĐHA
   Chuẩn hóa theo Thông tư 51/2017/TT-BYT, ACR Manual on Contrast Media & AHA 2020
   ============================================================================ */

window.SOTAY_TAIBIEN = {
  /* =========================================================================
     1. PHẢN VỆ SAU TIÊM THUỐC CẢN QUANG & ĐỐI QUANG TỪ (THÔNG TƯ 51/2017/TT-BYT)
     ========================================================================= */
  phanVe: {
    tieuDe: "Chẩn đoán & Xử trí Phản vệ — Thông tư 51/2017/TT-BYT",
    nguyenTacVang: "ADRENALIN LÀ THUỐC THIẾT YẾU, QUAN TRỌNG HÀNG ĐẦU CỨU SỐNG NGƯỜI BỆNH. TIÊM BẮP NGAY KHI CÓ DẤU HIỆU PHẢN VỆ TỪ ĐỘ II TRỞ LÊN!",
    bonMucDo: [
      {
        "do": "Độ I (Mức độ Nhẹ)",
        trieuChung: "Chỉ có các triệu chứng da và tổ chức dưới da: Mày đay, ngứa đỏ da, phù môi, phù mắt, cảm giác nóng bừng, ngứa mũi họng, hắt hơi. Chưa có triệu chứng hô hấp hay tuần hoàn.",
        xuTri: [
          "Dừng tiêm thuốc cản quang ngay lập tức nhưng GIỮ NGUYÊN ĐƯỜNG TRUYỀN TĨNH MẠCH.",
          "Cho bệnh nhân nằm nghỉ tại chỗ, đắp ấm.",
          "Thuốc sử dụng: Kháng Histamin H1 (Diphenhydramine / Dimedrol 10-20mg tiêm bắp hoặc tiêm tĩnh mạch chậm; hoặc Cetirizine/Loratadine 10mg uống).",
          "Có thể phối hợp Methylprednisolone 40mg tiêm tĩnh mạch.",
          "Theo dõi sát mạch, huyết áp, nhịp thở và SpO2 mỗi 15 phút trong ít nhất 2 giờ vì phản vệ có thể tiến triển sang Độ II."
        ]
      },
      {
        "do": "Độ II (Mức độ Nặng) — TIÊM ADRENALIN BẮP NGAY!",
        trieuChung: "Có từ 2 biểu hiện ở nhiều cơ quan:\n" +
                    "• Da niêm mạc: Mày đay rầm rộ, phù Quincke xuất hiện nhanh.\n" +
                    "• Hô hấp: Khó thở nhẹ, tức ngực, thở rít nhẹ, nghẹt thở, khàn tiếng.\n" +
                    "• Tiêu hóa: Đau quặn bụng, buồn nôn, nôn mửa, ỉa chảy.\n" +
                    "• Tuần hoàn: Mạch nhanh hoặc rối loạn nhịp tim; Huyết áp chưa tụt hoặc có thể tăng huyết áp.",
        xuTri: [
          "TIÊM BẮP NGAY ADRENALIN 1mg/1ml (Mặt trước ngoài đùi):\n" +
          "   - Người lớn: Tiêm bắp 1/2 ống (0.5 ml = 0.5 mg).\n" +
          "   - Trẻ em: Tiêm bắp 0.01 mg/kg (tối đa 0.3 ml ở trẻ nhỏ, 0.5 ml ở trẻ lớn).\n" +
          "   - Sau 3 - 5 phút nếu triệu chứng chưa giảm: TIÊM BẮP LẶP LẠI LIỀU THỨ 2.",
          "Đặt bệnh nhân nằm ngửa đầu bằng, hai chân kê cao (nếu nôn cho nằm nghiêng an toàn).",
          "Thở oxy mask 6 - 8 lít/phút.",
          "Lập tức thiết lập đường truyền tĩnh mạch thứ hai kim lớn 18G/16G, truyền nhanh Natri Clorid 0.9% 500 - 1000 ml trong 30 phút.",
          "Phối hợp: Methylprednisolone 40 - 80 mg tiêm tĩnh mạch; Dimedrol 10 - 20 mg tiêm tĩnh mạch/tiêm bắp."
        ]
      },
      {
        "do": "Độ III (Mức độ Nguy kịch — Sốc phản vệ)",
        trieuChung: "Biểu hiện ở nhiều cơ quan với mức độ đe dọa tử vong:\n" +
                    "• Hô hấp: Khó thở dữ dội, thở rít thanh quản (Stridor), tím tái đầu chi và môi, co kéo cơ hô hấp, SpO2 < 90%.\n" +
                    "• Tuần hoàn: SỐC PHẢN VỆ — Huyết áp tụt sâu (Huyết áp tâm thu < 90 mmHg hoặc giảm > 30% so với HA nền), mạch nhanh nhỏ khó bắt hoặc mất mạch ngoại vi.\n" +
                    "• Thần kinh: Ý thức u ám, lú lẫn, vật vã, hôn mê, co giật, tiểu tiện không tự chủ.",
        xuTri: [
          "BÁO ĐỘNG CẤP CỨU TOÀN VIỆN (CODE BLUE) & HỖ TRỢ ĐỘI HỒI SỨC TÍCH CỰC NGAY LẬP TỨC.",
          "TIÊM BẮP ADRENALIN NGAY: Người lớn 1/2 đến 1 ống (0.5 - 1.0 mg) bắp đùi; nhắc lại mỗi 3 phút.",
          "NẾU HUYẾT ÁP KHÔNG LÊN SAU 2 LẦN TIÊM BẮP: LẬP ĐƯỜNG TRUYỀN TĨNH MẠCH ADRENALIN LIÊN TỤC QUA BƠM TIÊM ĐIỆN:\n" +
          "   - Pha 1 ống Adrenalin 1mg vào 50ml NaCl 0.9% (nồng độ 20 µg/ml).\n" +
          "   - Tốc độ khởi đầu: 0.1 µg/kg/phút (ví dụ người 60kg: 18 ml/giờ), điều chỉnh liều mỗi 2-3 phút duy trì HA tâm thu >= 90 mmHg.",
          "Bù dịch ồ ạt chống sốc giãn mạch: Truyền nhanh Natri Clorid 0.9% 1000 - 2000 ml trong giờ đầu.",
          "Kiểm soát đường thở: Bóp bóng Ambu có oxy, chuẩn bị đặt nội khí quản sớm trước khi phù nề thanh môn bít tắc hoàn toàn; mở khí quản cấp cứu nếu không đặt được ống."
        ]
      },
      {
        "do": "Độ IV (Ngừng tuần hoàn hô hấp)",
        trieuChung: "Bệnh nhân đột ngột ngừng thở, mất mạch cảnh, mất ý thức hoàn toàn, giãn đồng tử.",
        xuTri: [
          "TIẾN HÀNH HỒI SINH TIM PHỔI (CPR) NGAY LẬP TỨC THEO AHA 2020.",
          "Ép tim ngoài lồng ngực liên tục 100 - 120 lần/phút, độ sâu 5 - 6 cm.",
          "Tiêm tĩnh mạch trực tiếp (Bolus) Adrenalin 1 mg (1 ống nguyên chất hoặc pha loãng 10ml NaCl 0.9%), bơm đuổi 20ml dịch và nâng cao tay; nhắc lại mỗi 3 - 5 phút.",
          "Bóp bóng qua mặt nạ hoặc ống nội khí quản tỷ lệ 30 ép tim : 2 thổi ngạt.",
          "Gắn máy sốc điện khử rung tim ngay khi máy đến."
        ]
      }
    ],
    bangLieuAdrenalinTheoCanNang: [
      { canNang: "< 10 kg (Trẻ sơ sinh/nhũ nhi)", lieuBapMg: "0.1 mg", lieuBapMl: "0.1 ml (1/10 ống)", bomTiem: "Dùng bơm tiêm 1ml (bơm tiêm lao) để chia vạch chính xác" },
      { canNang: "10 – 19 kg", lieuBapMg: "0.15 mg", lieuBapMl: "0.15 ml (khoảng 1/7 ống)", bomTiem: "Bơm tiêm 1ml" },
      { canNang: "20 – 29 kg", lieuBapMg: "0.2 mg", lieuBapMl: "0.2 ml (1/5 ống)", bomTiem: "Bơm tiêm 1ml" },
      { canNang: "30 – 49 kg", lieuBapMg: "0.3 mg", lieuBapMl: "0.3 ml (1/3 ống)", bomTiem: "Bơm tiêm 1ml hoặc 3ml" },
      { canNang: ">= 50 kg (Người lớn)", lieuBapMg: "0.5 – 1.0 mg", lieuBapMl: "0.5 – 1.0 ml (1/2 đến 1 ống nguyên)", bomTiem: "Bơm tiêm 1ml - 3ml tiêm bắp sâu mặt trước ngoài đùi" }
    ]
  },

  /* =========================================================================
     2. THOÁT MẠCH THUỐC CẢN QUANG & VỠ VEN (CONTRAST EXTRAVASATION)
     ========================================================================= */
  thoatMach: {
    tieuDe: "Quy trình Xử trí Thoát mạch Thuốc cản quang & Vỡ ven",
    nguyenNhan: "Do tiêm thuốc cản quang với máy tiêm điện áp lực cao (tốc độ 3.0 - 5.0 ml/s), tĩnh mạch nhỏ dễ vỡ, thành mạch xơ vữa ở người cao tuổi, tiêm ở mu tay/cổ tay, kim luồn bị lệch khỏi lòng mạch.",
    phanDoThoatMach: [
      {
        "do": "Độ 1 (Nhẹ — Thể tích < 20 ml)",
        bieuHien: "Sưng phù nhẹ khu trú quanh vị trí chọc kim, đau nhẹ hoặc cảm giác căng tức nhẹ, da hồng hào, tưới máu ngoại vi bình thường."
      },
      {
        "do": "Độ 2 (Trung bình — Thể tích 20 – 50 ml)",
        bieuHien: "Khối sưng phù to rõ rệt, đau vừa phải, căng tức da, giảm nhẹ tầm vận động khớp lân cận nhưng tuần hoàn ngón tay và cảm giác còn nguyên vẹn."
      },
      {
        "do": "Độ 3 (Nặng — Thể tích > 50 ml HOẶC vị trí nguy cơ cao)",
        bieuHien: "Khối thoát mạch lớn > 50ml hoặc xảy ra ở mu bàn tay, cổ tay (khoang hẹp). Đau chói dữ dội ngoài tỷ lệ, da căng bóng, tím tái hoặc nhợt nhạt, tê bì dị cảm ngón tay, mất mạch quay -> CẢNH BÁO NGUY CƠ HỘI CHỨNG CHÈN ÉP KHOANG (COMPARTMENT SYNDROME) VÀ HOẠI TỬ DA."
      }
    ],
    quyTrinh8BuocXuTri: [
      { buoc: 1, ten: "Dừng tiêm ngay lập tức", moTa: "Nhấn nút dừng khẩn cấp (Emergency Stop) trên máy tiêm điện ngay khi phát hiện áp lực tăng vọt hoặc người bệnh kêu đau." },
      { buoc: 2, ten: "Hút dịch & Rút kim tiêm", moTa: "Nếu kim luồn tĩnh mạch còn tại chỗ, gắn bơm tiêm 10-20ml hút ngược lại để cố gắng lấy bớt tối đa lượng thuốc cản quang tự do trong mô dưới da trước khi rút kim." },
      { buoc: 3, ten: "Nâng cao chi bị tổn thương", moTa: "Kê cao cánh tay/cẳng tay bị thoát mạch lên cao hơn mức tim bằng gối đệm để tạo thuận lợi cho hồi lưu tĩnh mạch và dẫn lưu bạch huyết, giúp giảm phù nề mô." },
      { buoc: 4, ten: "Chườm lạnh ngắt quãng (Cold Compress)", moTa: "Chườm túi đá bọc trong khăn sạch hoặc túi gel lạnh trong 15 - 20 phút mỗi lần, lặp lại mỗi 2 - 4 giờ trong 24 giờ đầu. Lạnh giúp co mạch, giảm đau tại chỗ và hạn chế thuốc lan rộng. (Sau 24 giờ có thể chuyển sang chườm ấm để kích thích giãn mạch tăng hấp thu)." },
      { buoc: 5, ten: "Đo chu vi chi & Đánh giá tuần hoàn ngoại vi", moTa: "Dùng thước dây đo chu vi chi tại điểm sưng to nhất và ghi nhận vào biên bản. Kiểm tra '5 chữ P' đánh giá chèn ép khoang: Pain (đau dữ dội), Pallor (tái nhợt), Pulselessness (mất mạch), Paresthesia (tê bì ngón), Paralysis (liệt vận động ngón). Kiểm tra thời gian hồi ứng mao mạch (Capillary Refill Time < 2 giây)." },
      { buoc: 6, ten: "Hội chẩn Phẫu thuật khẩn cấp khi có dấu hiệu báo động", moTa: "Hội chẩn bác sĩ Chấn thương chỉnh hình hoặc Phẫu thuật tạo hình ngay khi: Có triệu chứng chèn ép khoang; Rối loạn cảm giác vận động; Hoại tử da/bọng nước; Hoặc thể tích thuốc cản quang thoát mạch > 100 - 150 ml (chỉ định rạch giải áp khoang hoặc hút mỡ/rửa mô dưới da)." },
      { buoc: 7, ten: "Lập Biên bản theo dõi tai biến sự cố y khoa", moTa: "Ghi nhận đầy đủ: Loại thuốc cản quang, nồng độ, thể tích ước tính thoát mạch, tốc độ tiêm, vị trí ven, các biện pháp xử trí đã thực hiện và tên nhân viên phụ trách." },
      { buoc: 8, ten: "Bàn giao & Hướng dẫn theo dõi tại nhà", moTa: "Dặn dò người bệnh hoặc thân nhân theo dõi trong 24 - 48 giờ. Hướng dẫn đến viện khám lại ngay nếu: Đau tăng dữ dội, ngón tay tê bì mất cảm giác, da tím tái hoặc xuất hiện bọng nước phỏng rộp." }
    ]
  },

  /* =========================================================================
     3. TAI BIẾN & SỰ CỐ AN TOÀN TRONG PHÒNG CHỤP MRI
     ========================================================================= */
  anToanMRI: {
    tieuDe: "Quy chuẩn An toàn Từ trường & Xử trí Khẩn cấp trong Phòng MRI",
    bonKhuVucAnToan: [
      { vung: "Zone I", moTa: "Khu vực tự do hoàn toàn bên ngoài khoa CĐHA, công chúng có thể đi lại." },
      { vung: "Zone II", moTa: "Khu vực tiếp đón, đăng ký bệnh nhân và phòng thay đồ của khoa MRI." },
      { vung: "Zone III", moTa: "Khu vực phòng điều khiển máy MRI: Chỉ nhân viên được đào tạo và bệnh nhân đã qua sàng lọc kim loại mới được phép vào. Phải có khóa từ bảo vệ." },
      { vung: "Zone IV (CỰC KỲ NGUY HIỂM)", moTa: "PHÒNG CHỨA MÁY CHỤP MRI VÀ TỪ TRƯỜNG CHÍNH B0. TỪ TRƯỜNG LUÔN LUÔN BẬT 24/7/365 KỂ CẢ KHI MÁY KHÔNG CHỤP. CẤM TUYỆT ĐỐI MANG BẤT KỲ VẬT SẮT TỪ NÀO VÀO ĐÂY!" }
    ],
    cacTaiBienChinh: [
      {
        taiBien: "1. Hiệu ứng Vật thể bay (Missile / Projectile Effect)",
        nguyCo: "Từ trường tĩnh cực mạnh (1.5 Tesla mạnh gấp 30.000 lần từ trường trái đất) sẽ hút các vật liệu sắt từ (kéo, dao kéo, bình oxy sắt, kẹp ghim, cáng đẩy, xe lăn, búa phản xạ) bay với vận tốc tên lửa đâm thẳng vào lòng máy -> Gây tử vong hoặc chấn thương dập nát cho người nằm bên trong.",
        phongTranh: "Kiểm tra bằng cổng dò kim loại chuyên dụng; Chỉ sử dụng trang thiết bị tương thích MRI (MRI Conditional / MRI Safe) làm từ nhôm, titan hoặc nhựa."
      },
      {
        taiBien: "2. Bỏng nhiệt do Sóng cao tần (RF Burn)",
        nguyCo: "Nhiệt lượng RF tạo dòng điện cảm ứng trong các vòng lặp khép kín: Quần áo có chứa sợi kim loại (áo lót có gọng thép, quần áo thể thao kháng khuẩn chứa sợi bạc), hình xăm chứa oxit sắt, dây đo điện cực ECG tạo vòng tròn tiếp xúc da, hoặc hiện tượng da-chạm-da (hai đùi chạm nhau, cánh tay chạm vào đùi).",
        phongTranh: "Bệnh nhân bắt buộc thay hoàn toàn quần áo bệnh viện; Đặt miếng đệm xốp cách điện dày >= 1 cm ngăn cách giữa da bệnh nhân với thành máy và giữa hai chi."
      },
      {
        taiBien: "3. Quy trình Xả khí Heli khẩn cấp (Emergency Quench)",
        nguyCo: "Nút bấm Quench sẽ kích hoạt đun sôi làm bay hơi hàng ngàn lít Heli lỏng (-269°C) qua đường ống xả lên nóc nhà để triệt tiêu từ trường máy trong vòng 20 - 30 giây.\n" +
                "⚠️ CHỈ ĐƯỢC BẤM QUENCH KHI:\n" +
                "• Có người bệnh bị kẹt dưới vật kim loại nặng bị hút vào máy mà tính mạng đang bị đe dọa trực tiếp.\n" +
                "• Cháy nổ lớn trong phòng máy không thể dập tắt bằng bình cứu hỏa CO2 phi từ tính.\n" +
                "⚠️ NGUY CƠ: Heli rò rỉ vào phòng gây ngạt thở cấp tính (do đẩy hết oxy) và bỏng lạnh cực độ. Sơ tán người bệnh ra khỏi phòng máy ngay lập tức trong vòng 60 giây khi có báo động Quench!"
      }
    ]
  },

  /* =========================================================================
     4. HỒI SINH TIM PHỔI (CPR) CẤP CỨU NGỪNG TUẦN HOÀN (AHA 2020)
     ========================================================================= */
  cpr: {
    tieuDe: "Hồi sinh Tim Phổi Cơ bản & Nâng cao — Khuyến cáo AHA 2020",
    cacBuocThucHien: [
      { buoc: 1, ten: "Xác nhận Ngừng tuần hoàn", moTa: "Người bệnh mất tri giác đột ngột, không thở hoặc chỉ thở ngáp cá, bắt mạch cảnh trong vòng 10 giây không thấy có mạch đập." },
      { buoc: 2, ten: "Kêu gọi hỗ trợ & Kích hoạt Code Blue", moTa: "Hô to 'Cấp cứu ngừng tuần hoàn tại phòng chụp!' để huy động toàn bộ nhân lực và điều dưỡng mang hộp cấp cứu, máy sốc điện đến ngay." },
      { buoc: 3, ten: "ÉP TIM CHẤT LƯỢNG CAO NGAY LẬP TỨC", moTa: "• Đặt bệnh nhân nằm trên mặt phẳng cứng (ván ép tim).\n• Đặt gót bàn tay ở nửa dưới xương ức.\n• Ép tim với tần số 100 – 120 lần/phút.\n• Độ sâu ép tim ít nhất 5 cm nhưng không quá 6 cm (đối với người lớn).\n• Để lồng ngực nở hoàn toàn sau mỗi lần ép tim, không tựa tay lên ngực.\n• Hạn chế tối đa gián đoạn ép tim (thời gian ngắt quãng < 10 giây)." },
      { buoc: 4, ten: "Hỗ trợ Hô hấp (Tỷ lệ 30 : 2)", moTa: "Mở thông đường thở (ngửa đầu - nâng cằm), bóp bóng Ambu có oxy tỷ lệ 30 lần ép tim : 2 lần bóp bóng. Mỗi nhịp bóp bóng trong 1 giây đủ làm lồng ngực nhô lên nhẹ nhàng." },
      { buoc: 5, ten: "Đánh giá Nhịp & Sốc điện khử rung tim sớm", moTa: "Gắn máy sốc điện / AED:\n• Nhịp SỐC ĐƯỢC (Rung thất VF / Nhanh thất vô mạch pVT): Sốc điện ngay liều 200J (máy hai pha) -> Ngay sau khi bấm sốc điện, TIẾP TỤC ÉP TIM 2 PHÚT mà không kiểm tra mạch ngay.\n• Nhịp KHÔNG SỐC ĐƯỢC (Vô tâm thu Asystole / Phân ly điện cơ PEA): Tiếp tục ép tim liên tục + Tiêm tĩnh mạch Adrenalin 1mg mỗi 3 - 5 phút." }
    ]
  }
};
