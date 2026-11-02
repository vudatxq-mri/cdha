/* ============================================================================
   QUY TRÌNH SIÊU ÂM CHẨN ĐOÁN (ULTRASOUND PROTOCOLS)
   SỔ TAY ĐIỆN TỬ CĐHA — VŨ ĐẠT CĐHA
   Chuẩn hóa theo ACR, AIUM, WFUMB và Hướng dẫn thực hành Bộ Y tế
   ============================================================================ */

window.SOTAY_SIEUAM = [
  {
    id: "us-bung-tong-quat",
    ten: "Siêu âm Ổ bụng tổng quát",
    phanHe: "sieuam",
    modality: "Siêu âm",
    nhom: "Ổ bụng",
    dauDo: "Convex 3.5 – 5.0 MHz (kết hợp Linear 7.5 – 12 MHz khi khảo sát ruột thừa / thành bụng)",
    chuanBi: "Nhịn ăn >= 6 giờ (để túi mật căng to, giảm hơi dạ dày - tá tràng); Nhịn tiểu căng vừa bàng quang (để khảo sát tiểu khung, bàng quang, tiền liệt tuyến/tử cung buồng trứng).",
    cacMatCatChuan: [
      {
        ten: "1. Khảo sát Gan & Tĩnh mạch cửa - Tĩnh mạch trên gan",
        moTa: "Mặt cắt dưới sườn, mặt cắt qua kẽ sườn, mặt cắt dọc qua thùy trái và thùy phải. Đánh giá: Kích thước gan (chiều cao gan phải trên đường trung đòn <= 15cm); Đường bờ gan nhẵn đều hay mấp mô gồ ghề (xơ gan); Cấu trúc âm nhu mô gan (đồng nhất, tăng âm dạng thoái hóa mỡ, nốt khu trú); Hệ thống tĩnh mạch cửa (đường kính thân chung TM cửa <= 12-13mm, phổ dòng chảy liên tục hướng về gan); Hệ 3 tĩnh mạch trên gan (đổ về TM chủ dưới, phổ 3 pha)."
      },
      {
        ten: "2. Đường mật & Túi mật",
        moTa: "Mặt cắt dọc túi mật, mặt cắt ngang túi mật, mặt cắt dọc bám theo trục ống mật chủ. Đánh giá: Túi mật kích thước bình thường (dài < 10cm, ngang < 4cm); Độ dày thành túi mật <= 3mm (lúc đói); Lòng túi mật trống âm hoàn toàn (tìm sỏi tăng âm kèm bóng cản, bùn mật, polyp không bóng cản không đổi tư thế); Ống mật chủ (đường kính đoạn ngoài gan <= 6mm ở người trẻ, có thể giãn nhẹ đến 8-10mm ở người già hoặc sau cắt túi mật)."
      },
      {
        ten: "3. Tụy (Pancreas)",
        moTa: "Mặt cắt ngang thượng vị chếch nhẹ, dùng gan trái làm cửa sổ âm học; cho bệnh nhân phình bụng hoặc uống 200-300ml nước lọc nếu bị hơi dạ dày che lấp. Đánh giá: Đầu tụy (< 3cm), thân tụy (< 2.5cm), đuôi tụy (< 2cm); Đường bờ rõ, âm vang đồng nhất (thường đồng âm hoặc tăng âm nhẹ so với gan); Ống tụy chính Wirsung (đường kính <= 2-3mm, trơn láng, không sỏi)."
      },
      {
        ten: "4. Lách & Khoang lách thận",
        moTa: "Mặt cắt qua kẽ sườn 9-10-11 bên trái đường nách giữa. Đánh giá: Chiều dài lách (< 12cm), bề dày (< 4cm); Tĩnh mạch lách tại rốn lách (< 8-9mm); Tìm tụ dịch khoang lách - thận."
      },
      {
        ten: "5. Hai Thận & Bàng quang",
        moTa: "Mặt cắt dọc và ngang hai hố thắt lưng. Đánh giá: Kích thước thận (dài 9-12cm, dày 3-5cm); Độ dày nhu mô thận (1.5-2cm); Phân biệt vỏ - tủy rõ ràng; Xoang thận tăng âm sáng; Loại trừ sỏi, nang thận, khối u và giãn đài bể thận (ứ nước độ 1 đến độ 4). Khảo sát bàng quang: Thành mỏng đều (< 3-5mm khi căng), không cặn lắng, không sỏi/u sùi."
      },
      {
        ten: "6. Tiền liệt tuyến (Nam) / Tử cung & Phần phụ (Nữ)",
        moTa: "Mặt cắt trên xương mu: Đánh giá thể tích tuyến tiền liệt ($V = 0.52 \times D \times R \times C$, bình thường < 20-25g; nhân phì đại, nốt vôi hóa, u xơ); Tử cung (kích thước, tư thế gập trước/ngửa sau, độ dày nội mạc tử cung theo chu kỳ, nhân xơ) và hai buồng trứng (nang buồng trứng, khối u)."
      }
    ]
  },
  {
    id: "us-tuyen-giap-tirads",
    ten: "Siêu âm Tuyến Giáp & Đánh giá ACR TI-RADS 2017",
    phanHe: "sieuam",
    modality: "Siêu âm",
    nhom: "Cổ - Giáp",
    dauDo: "Linear tần số cao 7.5 – 14 MHz",
    chuanBi: "Bệnh nhân nằm ngửa, kê gối nhỏ dưới vai để ưỡn cổ tối đa, bộc lộ toàn bộ vùng cổ trước từ xương hàm dưới đến hõm ức.",
    cacMatCatChuan: [
      {
        ten: "1. Đo đạc kích thước & Đánh giá lan tỏa nhu mô",
        moTa: "Mặt cắt ngang và mặt cắt dọc hai thùy tuyến giáp và eo giáp. Đo 3 chiều mỗi thùy: Chiều cao (dọc), chiều ngang và chiều trước sau (bề dày). Bình thường thể tích tuyến giáp nữ < 18ml, nam < 25ml. Đánh giá nhu mô: Mịn đồng âm bình thường hay thô giảm âm lan tỏa, tăng sinh mạch dạng 'bão giáp' (Viêm giáp Hashimoto, Basedow)."
      },
      {
        ten: "2. Hệ thống tính điểm ACR TI-RADS 2017 cho Nhân Giáp",
        moTa: "Đánh giá 5 đặc tính hình thái và cộng dồn điểm số:\n" +
              "• 1. Thành phần (Composition): Nang hoàn toàn / Bọt biển (0 điểm) | Hỗn hợp đặc - nang (1 điểm) | Đặc hoàn toàn / Hầu như đặc (2 điểm)\n" +
              "• 2. Hồi âm (Echogenicity): Trống âm (0 điểm) | Tăng âm hoặc đồng âm (1 điểm) | Giảm âm (2 điểm) | Rất giảm âm (3 điểm)\n" +
              "• 3. Hình dáng (Shape): Rộng hơn cao / Tỷ lệ C/R <= 1 (0 điểm) | Cao hơn rộng / Tỷ lệ C/R > 1 trên mặt cắt ngang (3 điểm - dấu hiệu ác tính cao)\n" +
              "• 4. Đường bờ (Margin): Nhẵn đều (0 điểm) | Không rõ (0 điểm) | Đa cung gập góc hoặc thùy múi (2 điểm) | Xâm lấn ra ngoài bao tuyến giáp (3 điểm)\n" +
              "• 5. Điểm hồi âm sáng / Vôi hóa (Echogenic Foci): Không có hoặc bóng chổi sao lớn dạng keo (0 điểm) | Vôi hóa thô to có bóng cản (1 điểm) | Vôi hóa viền xung quanh (2 điểm) | Vi vôi hóa lấm tấm lốm đốm (Punctate echogenic foci / 3 điểm - rất gợi ý K giáp thể nhú)."
      },
      {
        ten: "3. Phân loại & Khuyến cáo Can thiệp FNA theo kích thước",
        moTa: "• TR1 (0 điểm): Lành tính -> Không cần FNA, không cần theo dõi.\n" +
              "• TR2 (2 điểm): Không nghi ngờ ác tính -> Không cần FNA.\n" +
              "• TR3 (3 điểm): Nghi ngờ nhẹ -> Chỉ định FNA nếu nốt >= 2.5 cm; Theo dõi định kỳ nếu nốt >= 1.5 cm.\n" +
              "• TR4 (4 - 6 điểm): Nghi ngờ vừa -> Chỉ định FNA nếu nốt >= 1.5 cm; Theo dõi định kỳ nếu nốt >= 1.0 cm.\n" +
              "• TR5 (>= 7 điểm): Nghi ngờ ác tính cao -> Chỉ định FNA nếu nốt >= 1.0 cm; Theo dõi định kỳ nếu nốt >= 0.5 cm."
      },
      {
        ten: "4. Sàng lọc Hạch cổ di căn",
        moTa: "Bắt buộc quét hạch cổ các nhóm I, II, III, IV, V và VI (nhóm cạnh khí quản). Dấu hiệu hạch nghi ngờ ác tính: Mất rốn hạch mỡ, hạch hình tròn (tỷ lệ L/S < 2), thoái hóa nang trong hạch, vi vôi hóa trong hạch, tăng sinh mạch hỗn loạn ở ngoại vi."
      }
    ]
  },
  {
    id: "us-tuyen-vu-birads",
    ten: "Siêu âm Tuyến Vú & Đánh giá ACR BI-RADS",
    phanHe: "sieuam",
    modality: "Siêu âm",
    nhom: "Tuyến vú",
    dauDo: "Linear tần số cao 10 – 18 MHz",
    chuanBi: "Nằm ngửa, hai tay giơ cao đặt sau đầu, nghiêng nhẹ người sang bên đối diện khoảng 30 độ để làm mỏng mô tuyến vú áp sát thành ngực.",
    cacMatCatChuan: [
      {
        ten: "1. Phương pháp quét hệ thống toàn diện",
        moTa: "Quét theo nan hoa bánh xe từ núm vú tỏa ra ngoại vi hoặc quét theo các đường zíc-zắc song song bao phủ toàn bộ 4 góc phần tư vú: Trên ngoài, trên trong, dưới ngoài, dưới trong và vùng trung tâm sau quầng vú. Luôn đối chiếu vị trí theo kim đồng hồ (ví dụ: góc 2 giờ cách núm vú 3cm) và khoảng cách đến núm vú."
      },
      {
        ten: "2. Phân tích tổn thương khu trú vú theo ACR BI-RADS",
        moTa: "• Hình thái (Shape): Bầu dục (Oval), Tròn (Round), Không đều (Irregular).\n" +
              "• Trục (Orientation): Song song với mặt da (Parallel - bề rộng > chiều cao, gợi ý lành tính) vs Không song song (Not parallel - chiều cao > bề rộng, gợi ý ác tính).\n" +
              "• Đường bờ (Margin): Nhẵn rõ (Circumscribed) vs Không rõ / Tua gai (Spiculated) / Đa cung nhỏ (Microlobulated) / Góc cạnh (Angular).\n" +
              "• Âm vang (Echo Pattern): Trống âm (Nang đơn thuần), Tăng âm, Đồng âm, Giảm âm, Hỗn hợp âm.\n" +
              "• Tính chất âm phía sau: Tăng âm phía sau (Nang hoặc u xơ lành), Không đổi, Bóng cản âm phía sau (Tổn thương ác tính do mô xơ hóa co kéo)."
      },
      {
        ten: "3. Phân loại BI-RADS & Xử trí lâm sàng",
        moTa: "• BI-RADS 0: Chưa đủ kết luận, cần kết hợp chụp X-quang tuyến vú (Mammography) hoặc MRI vú.\n" +
              "• BI-RADS 1: Bình thường, không có tổn thương (Khám sàng lọc định kỳ 1 năm).\n" +
              "• BI-RADS 2: Tổn thương chắc chắn lành tính (Nang vú đơn thuần, u xơ tuyến vú ổn định lâu năm, vôi hóa mạch máu).\n" +
              "• BI-RADS 3: Khả năng cao lành tính (Nguy cơ ác tính < 2% -> Theo dõi ngắn hạn sau 6 tháng).\n" +
              "• BI-RADS 4: Nghi ngờ ác tính (Nguy cơ ác tính 2 - 95% -> Chỉ định Sinh thiết kim lõi CNB / FNA):\n" +
              "   - 4A: Nguy cơ ác tính thấp (2 - 10%)\n" +
              "   - 4B: Nguy cơ ác tính vừa (10 - 50%)\n" +
              "   - 4C: Nguy cơ ác tính cao (50 - 95%)\n" +
              "• BI-RADS 5: Rất gợi ý ác tính (Nguy cơ >= 95% -> Chỉ định sinh thiết mô bệnh học khẩn cấp và hội chẩn ung thư).\n" +
              "• BI-RADS 6: Đã có kết quả sinh thiết giải phẫu bệnh xác định ung thư trước đó."
      },
      {
        ten: "4. Khảo sát Hạch nách hai bên",
        moTa: "Đánh giá các chặng hạch nách mức độ I, II, III. Dấu hiệu hạch di căn: Vỏ hạch dày khu trú > 3mm, mất rốn hạch, mạch máu hỗn loạn phân bố lệch tâm."
      }
    ]
  },
  {
    id: "us-fast-efast",
    ten: "Siêu âm Cấp cứu Chấn thương FAST & eFAST (Extended FAST)",
    phanHe: "sieuam",
    modality: "Siêu âm",
    nhom: "Cấp cứu",
    dauDo: "Convex / Phased Array 2.5 – 5.0 MHz kết hợp Linear cho màng phổi",
    chuanBi: "Thực hiện ngay tại giường cấp cứu trong vòng < 3 phút, không cần chuẩn bị bệnh nhân, tiến hành song song với hồi sức ABC.",
    cacMatCatChuan: [
      {
        ten: "Vị trí 1: Khoang Morrison (Hạ sườn phải - Quanh Gan)",
        moTa: "Đặt đầu dò ở khoang liên sườn 8-11 đường nách giữa bên phải. Tìm dịch tự do (dải trống âm màu đen) tại ngách gan - thận (Morrison's pouch), cực dưới thận phải và góc sườn hoành phải. Đây là vị trí nhạy cảm nhất phát hiện tràn dịch/máu ổ bụng ở bệnh nhân nằm ngửa (chỉ cần 100-200ml dịch là thấy được)."
      },
      {
        ten: "Vị trí 2: Khoang Lách - Thận (Hạ sườn trái - Quanh Lách)",
        moTa: "Đặt đầu dò ở liên sườn 8-10 đường nách sau bên trái. Tìm dải dịch tự do giữa bao lách và thận trái, hoặc trong khoang dưới hoành trái."
      },
      {
        ten: "Vị trí 3: Vùng Trên Xương Mu (Tiểu khung / Túi cùng Douglas)",
        moTa: "Đặt đầu dò ngay trên khớp mu, quét theo hướng dọc và ngang. Tìm dịch tự do đọng ở túi cùng Bàng quang - Tử cung và Túi cùng Sau (Douglas) ở nữ, hoặc ngách Bàng quang - Trực tràng ở nam."
      },
      {
        ten: "Vị trí 4: Dưới Mũi Ức (Mặt cắt 4 buồng tim dưới sườn)",
        moTa: "Đặt đầu dò ngay dưới mũi ức hướng chếch lên vai trái, dùng gan trái làm cửa sổ. Mục tiêu: Phát hiện tràn dịch màng ngoài tim cấp gây chèn ép tim (Cardiac Tamponade). Đánh giá dấu hiệu đè sụp tâm thất phải hoặc nhĩ phải ở thì tâm trương."
      },
      {
        ten: "Vị trí 5 & 6 (eFAST): Màng Phổi 2 Bên & Tràn Khí Màng Phổi",
        moTa: "• Đỉnh phổi (Liên sườn 2-3 đường giữa đòn): Dùng đầu dò Linear. Bình thường: Thấy dấu hiệu trượt màng phổi (Lung Sliding) và trên M-mode có hình ảnh 'bờ biển cát vàng' (Seashore Sign). Khi TRÀN KHÍ MÀNG PHỔI: Mất dấu hiệu trượt màng phổi, trên M-mode xuất hiện hình ảnh 'mã vạch / tầng bình lưu' (Barcode / Stratosphere Sign); Tìm điểm phổi (Lung Point) - ranh giới giữa vùng tràn khí và phổi bình thường (độ đặc hiệu 100% chẩn đoán tràn khí).\n" +
              "• Đáy phổi (Liên sườn 7-9 đường nách sau): Tìm tràn máu/tràn dịch màng phổi (mất góc sườn hoành, dấu hiệu cột sống kéo dài trên cơ hoành - Spine Sign)."
      }
    ]
  },
  {
    id: "us-doppler-mach-mau",
    ten: "Siêu âm Doppler Mạch Máu (ĐM Cảnh & Tĩnh Mạch Sâu Chi Dưới)",
    phanHe: "sieuam",
    modality: "Siêu âm",
    nhom: "Mạch máu",
    dauDo: "Linear 5.0 – 12 MHz (mạch nông) và Convex 3.5 MHz (mạch sâu/ổ bụng)",
    chuanBi: "Nhiệt độ phòng ấm (tránh co mạch ngoại vi); Bệnh nhân nằm ngửa thư giãn.",
    cacMatCatChuan: [
      {
        ten: "1. Siêu âm Doppler Động Mạch Cảnh",
        moTa: "Khảo sát dọc và ngang động mạch cảnh chung (CCA), hành cảnh (Bulb), động mạch cảnh trong (ICA) và ngoài (ECA). Bật Doppler màu chỉnh hộp màu (Color Box) nghiêng theo chiều dòng chảy. Đặt cổng Doppler xung (Sample Volume) ở giữa lòng mạch, hiệu chỉnh GÓC DOPPLER THETA <= 60 ĐỘ. Đo vận tốc đỉnh tâm thu (PSV) và cuối tâm trương (EDV). Phân loại hẹp theo tiêu chuẩn NASCET: Bình thường PSV < 125 cm/s; Hẹp 50-69% khi PSV 125-230 cm/s; Hẹp >= 70% khi PSV > 230 cm/s kèm tỷ số PSV ICA/CCA > 4.0."
      },
      {
        ten: "2. Siêu âm Doppler Tĩnh Mạch Sâu Chi Dưới (Tìm Huyết Khối DVT)",
        moTa: "TIÊU CHUẨN VÀNG: Nghiệm pháp đè ép đầu dò (Compression Ultrasound - CUS) trên mặt cắt ngang mỗi đoạn cách nhau 2cm từ nếp bẹn xuống đến khoeo: Tĩnh mạch đùi chung (CFV), Tĩnh mạch đùi (FV), Tĩnh mạch đùi sâu (DFV), Tĩnh mạch khoeo (Popliteal Vein) và các nhánh tĩnh mạch cẳng chân. Kết luận huyết khối tĩnh mạch sâu cấp (DVT) khi: Lòng tĩnh mạch KHÔNG THỂ ĐÈ XẸP HOÀN TOÀN dưới lực ấn đầu dò; Lòng mạch có hồi âm cục máu đông; Mất phổ biến đổi theo nhịp thở trên Doppler xung."
      }
    ]
  }
];
