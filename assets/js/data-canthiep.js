/* ============================================================================
   QUY TRÌNH SIÊU ÂM CAN THIỆP (INTERVENTIONAL ULTRASOUND)
   SỔ TAY ĐIỆN TỬ CĐHA — VŨ ĐẠT CĐHA
   Chuẩn hóa theo Hiệp hội Can thiệp Điện quang (SIR, CIRSE, VSIR) & Bộ Y tế
   ============================================================================ */

window.SOTAY_CANTHIEP = [
  {
    id: "canthiep-bang-kiem-an-toan",
    ten: "Bảng kiểm An toàn & Vô trùng Tiền Can thiệp",
    phanHe: "canthiep",
    modality: "Siêu âm can thiệp",
    nhom: "An toàn can thiệp",
    dungCu: "Bọc đầu dò siêu âm vô khuẩn (Probe Sheath), gel vô khuẩn, săng mổ có lỗ, găng tay vô trùng, bơm tiêm áp lực, Lidocaine 1-2%, hộp cấp cứu phản vệ",
    cacBuoc: [
      {
        buoc: 1,
        tieuDe: "Quy trình Time-out & Cam kết thủ thuật",
        noiDung: "Dừng lại 1 phút trước can thiệp cùng điều dưỡng: Đối chiếu họ tên, năm sinh, mã số người bệnh; Xác nhận đúng cơ quan và vị trí bên can thiệp (Trái/Phải); Kiểm tra bản cam kết đồng ý làm thủ thuật có chữ ký của người bệnh/người nhà."
      },
      {
        buoc: 2,
        tieuDe: "Đánh giá Xét nghiệm Đông máu & Thuốc chống đông",
        noiDung: "Bắt buộc kiểm tra:\n" +
              "• Số lượng tiểu cầu: Yêu cầu >= 50.000 /uL (tối ưu >= 70.000 /uL đối với sinh thiết tạng sâu như gan, thận).\n" +
              "• Thời gian Prothrombin (PT): Yêu cầu >= 60%, tỷ số INR <= 1.5.\n" +
              "• Ngừng các thuốc chống đông/chống ngưng tập tiểu cầu trước thủ thuật:\n" +
              "   - Aspirin / Clopidogrel (Plavix): Ngừng 5 - 7 ngày trước can thiệp.\n" +
              "   - Warfarin (Sintrom): Ngừng 4 - 5 ngày (kiểm tra lại INR < 1.5 vào buổi sáng làm thủ thuật).\n" +
              "   - Thuốc chống đông đường uống thế hệ mới NOAC (Rivaroxaban, Apixaban, Dabigatran): Ngừng trước 48 giờ."
      },
      {
        buoc: 3,
        tieuDe: "Nguyên tắc Vô trùng Tuyệt đối",
        noiDung: "Bác sĩ và điều dưỡng sát khuẩn tay ngoại khoa, mang áo choàng mổ và găng tay vô trùng. Sát trùng da vùng thủ thuật 3 lần bằng cồn Betadine hoặc Chlorhexidine 2% từ trong ra ngoài hình xoắn ốc (đường kính >= 15cm). Trải săng vô khuẩn. Dùng vỏ bọc đầu dò siêu âm vô trùng chuyên dụng có chứa gel bên trong và bôi gel vô trùng bên ngoài."
      },
      {
        buoc: 4,
        tieuDe: "Kỹ thuật Dẫn đường Siêu âm Thời gian thực (Real-time)",
        noiDung: "• Kỹ thuật Trong mặt phẳng (In-plane): Thân và đầu kim nằm hoàn toàn trong chùm tia siêu âm -> Quan sát liên tục toàn bộ chiều dài thân kim và vị trí mũi kim tiến vào tổn thương, tránh mạch máu lớn.\n" +
              "• Kỹ thuật Ngoài mặt phẳng (Out-of-plane): Kim đi vuông góc với chùm tia -> Chỉ thấy đầu kim là 1 điểm tăng âm sáng có bóng lưng; cần liên tục di chuyển đầu dò bám theo đầu kim."
      }
    ]
  },
  {
    id: "canthiep-fna-tuyen-giap",
    ten: "Chọc hút Tế bào bằng Kim nhỏ (FNA Tuyến Giáp / Hạch)",
    phanHe: "canthiep",
    modality: "Siêu âm can thiệp",
    nhom: "Chẩn đoán tế bào",
    dungCu: "Kim nhỏ 23G – 25G (chiều dài 30-40mm), bơm tiêm 10ml hoặc 20ml có súng trợ lực (Cameco), lam kính sạch, cồn cố định 95%",
    cacBuoc: [
      {
        buoc: 1,
        tieuDe: "Chỉ định & Chuẩn bị",
        noiDung: "Chỉ định cho các nhân giáp ACR TI-RADS 3-5 đạt ngưỡng kích thước hoặc hạch cổ nghi ngờ ác tính. Bệnh nhân nằm ngửa, kê gối dưới vai ngửa cổ. Sát trùng vô khuẩn tuyệt đối."
      },
      {
        buoc: 2,
        tieuDe: "Gây tê & Định vị đầu kim",
        noiDung: "Gây tê tại chỗ bằng Lidocaine 1% (1-2ml) tại lớp da và bao trước tuyến giáp. Cầm đầu dò bằng tay không thuận, tay thuận cầm kim 25G gắn bơm tiêm. Dùng kỹ thuật In-plane đưa mũi kim xuyên qua bao giáp vào chính xác tâm khối nhân."
      },
      {
        buoc: 3,
        tieuDe: "Kỹ thuật Lấy mẫu Tế bào (Mao dẫn vs Hút áp lực âm)",
        noiDung: "• Kỹ thuật Mao dẫn (Non-aspiration / Capillary): Không kéo piston tạo áp lực âm, chỉ di chuyển kim tịnh tiến tới lui 5-8 lần theo nhiều hướng trong nhân. Tế bào sẽ tự động lọt vào lòng kim nhờ lực mao dẫn. Ưu điểm: Bệnh phẩm không bị lẫn nhiều hồng cầu/máu loãng.\n" +
              "• Kỹ thuật Hút áp lực âm: Dùng súng hút kéo piston 1-2ml áp lực âm nhẹ khi kim đang di chuyển trong nhân. Nhả áp lực âm về bình thường TRƯỚC KHI rút kim ra khỏi da để tránh hút ngược tế bào vào nòng bơm tiêm."
      },
      {
        buoc: 4,
        tieuDe: "Phết lam kính & Cố định Bệnh phẩm",
        noiDung: "Tháo kim, hút 2-3ml không khí vào bơm tiêm rồi lắp lại kim. Bơm đẩy một giọt dịch tế bào nhỏ lên đầu lam kính. Dùng lam kính thứ hai đặt nghiêng góc 45 độ kéo phết mỏng đều tay. Ngâm cố định ngay vào lọ cồn 95% trong 15-30 phút (đối với nhuộm Papanicolaou/HE) hoặc sấy khô tự nhiên (đối với nhuộm Giemsa). Đóng gói gửi khoa Giải phẫu bệnh."
      },
      {
        buoc: 5,
        tieuDe: "Băng ép & Theo dõi",
        noiDung: "Dùng gạc vô trùng ấn đè tại vị trí chọc kim trong 5-10 phút. Bệnh nhân ngồi nghỉ 15 phút, kiểm tra không có khối tụ máu vùng cổ, không khàn tiếng, không khó thở trước khi ra về."
      }
    ]
  },
  {
    id: "canthiep-sinh-thiet-kim-loi-cnb",
    ten: "Sinh thiết Kim lõi dưới hướng dẫn Siêu âm (Core Needle Biopsy - CNB)",
    phanHe: "canthiep",
    modality: "Siêu âm can thiệp",
    nhom: "Chẩn đoán mô bệnh học",
    dungCu: "Súng sinh thiết tự động hoặc bán tự động (cỡ kim 14G - 18G, hành trình cắt 15 - 22mm), dao mổ số 11, lọ formol đệm trung tính 10%",
    cacBuoc: [
      {
        buoc: 1,
        tieuDe: "Chỉ định sinh thiết kim lõi",
        noiDung: "U gan nghi ngờ thoái hóa ác tính/di căn, khối u vú BI-RADS 4-5, u mô mềm vùng chậu, u sau phúc mạc, bệnh lý cầu thận/sinh thiết thận ghép."
      },
      {
        buoc: 2,
        tieuDe: "Lựa chọn đường vào an toàn (Safe Path Planning)",
        noiDung: "Bật Doppler màu kiểm tra loại trừ các nhánh mạch máu lớn (ĐM gan, tĩnh mạch cửa, ĐM vú trong). Chọn đường vào xuyên qua một đoạn nhu mô lành (ít nhất 1-2cm đối với gan) trước khi vào u để tạo tác dụng chèn ép cầm máu tự nhiên khi rút kim."
      },
      {
        buoc: 3,
        tieuDe: "Gây tê từng lớp & Rạch da nhỏ",
        noiDung: "Gây tê Lidocaine 1-2% từ da, mô dưới da, cân mạc đến bao tạng (Bao Glisson gan hoặc màng phổi). Dùng đầu mũi dao số 11 rạch một vết nhỏ 2mm trên da để đầu kim sinh thiết dễ đi qua."
      },
      {
        buoc: 4,
        tieuDe: "Thao tác Bắn súng Sinh thiết & Thu thập mẫu",
        noiDung: "Đưa kim sinh thiết qua vết rạch da đến sát bờ khối u dưới dẫn đường In-plane. Xác nhận khoảng cách hành trình bắn (Throw: 15mm hoặc 22mm) không đâm thủng bao đối diện hoặc chạm mạch máu lớn. Bấm nút bắn súng (máy tự động đưa lõi khuyết vào mô và ống cắt trượt qua cắt đứt mảnh mô). Rút kim, gắp dải mô (dài 1.5 - 2cm màu trắng ngà) cho vào lọ Formol 10%. Thường lấy 2 - 3 mảnh mô để làm hóa mô miễn dịch."
      },
      {
        buoc: 5,
        tieuDe: "Kiểm tra siêu âm sau sinh thiết & Băng ép",
        noiDung: "Dùng đầu dò siêu âm quan sát ngay vị trí sinh thiết và bao tạng trong 5 phút. Bật Doppler màu tìm dấu hiệu thoát máu hoạt động (active bleeding / dải mạch xoáy). Băng ép chắc chắn bằng băng dính chun. Cho bệnh nhân nằm bất động tại giường 4-6 giờ, theo dõi mạch, HA mỗi 30 phút."
      }
    ]
  },
  {
    id: "canthiep-dan-luu-pigtail",
    ten: "Dẫn lưu Áp xe & Ổ tụ dịch qua da bằng Catheter Pigtail",
    phanHe: "canthiep",
    modality: "Siêu âm can thiệp",
    nhom: "Điều trị dẫn lưu",
    dungCu: "Bộ dẫn lưu Pigtail 8Fr – 12Fr (bao gồm Catheter đuôi lợn, nòng sắt, nòng nhựa, guide wire đầu J cứng, bộ nong Amplatz 8-10-12Fr), dao mổ, chỉ khâu da, túi hứng dịch kín có van một chiều",
    cacBuoc: [
      {
        buoc: 1,
        tieuDe: "Định vị ổ dịch & Đo khoảng cách",
        noiDung: "Đo khoảng cách từ mặt da đến tâm ổ dịch, thể tích ổ dịch, tính chất dịch (dịch trong, dịch mủ đặc có vách ngăn). Chọn cỡ Catheter: Dịch loãng dùng 8-10Fr; Mủ đặc áp xe gan/tụy dùng 10-14Fr."
      },
      {
        buoc: 2,
        tieuDe: "Kỹ thuật chọc Trocar (Trực tiếp) vs Seldinger (Qua dây dẫn)",
        noiDung: "• Phương pháp Seldinger (An toàn nhất): Dùng kim 18G chọc vào tâm ổ dịch -> Hút thử ra mủ/dịch xác nhận -> Luồn Guide wire đầu J vào sâu trong ổ dịch cuộn tròn 1-2 vòng -> Rút kim 18G giữ nguyên guide wire -> Nong đường hầm bằng que nong -> Đưa Catheter Pigtail trượt trên guide wire vào ổ dịch -> Rút guide wire và nòng kim loại -> Kéo sợi chỉ khóa đầu Pigtail cuộn chặt hình đuôi lợn."
      },
      {
        buoc: 3,
        tieuDe: "Hút dịch làm Xét nghiệm vi sinh",
        noiDung: "Hút dịch gửi làm xét nghiệm: Soi tươi tìm vi khuẩn, Cấy vi khuẩn định danh và làm Kháng sinh đồ (KSĐ), tế bào học. Bơm rửa ổ áp xe nhẹ nhàng bằng dung dịch NaCl 0.9% cho đến khi dịch chảy ra tương đối trong (tránh bơm áp lực mạnh gây vỡ ổ áp xe)."
      },
      {
        buoc: 4,
        tieuDe: "Khâu cố định & Chăm sóc ống dẫn lưu",
        noiDung: "Khâu cố định chân Catheter vào da bằng chỉ Silk 2.0 hoặc đĩa cố định chống tuột. Nối với túi dẫn lưu kín đặt thấp hơn vị trí người bệnh. Ghi nhận số lượng và màu sắc dịch hàng ngày. Chỉ định rút dẫn lưu khi: Lượng dịch ra < 10-15 ml/ngày trong 2 ngày liên tiếp, siêu âm kiểm tra ổ dịch xẹp hoàn toàn và bệnh nhân hết sốt, bạch cầu về bình thường."
      }
    ]
  },
  {
    id: "canthiep-dot-nhiet-rfa-mwa",
    ten: "Đốt nhiệt U gan / U giáp bằng Vi sóng (MWA) hoặc Sóng cao tần (RFA)",
    phanHe: "canthiep",
    modality: "Siêu âm can thiệp",
    nhom: "Điều trị triệt căn u",
    dungCu: "Máy phát vi sóng (Microwave Ablation - MWA) hoặc sóng cao tần (RFA), kim đốt có hệ thống làm mát bên trong bằng nước muối lạnh, máy bơm nhu động, dung dịch bóc tách tạng (Hydrodissection)",
    cacBuoc: [
      {
        buoc: 1,
        tieuDe: "Chỉ định & Đánh giá biên an toàn (Safety Margin)",
        noiDung: "Chỉ định u gan HCC giai đoạn sớm (kích thước <= 3cm, số lượng <= 3 u), u tuyến giáp lành tính gây chèn ép/thẩm mỹ. Mục tiêu: Đốt toàn bộ khối u kèm một vòng biên an toàn mô lành 5 - 10 mm (Ablative Margin) xung quanh khối u để diệt sạch tế bào vi di căn."
      },
      {
        buoc: 2,
        tieuDe: "Kỹ thuật Tách tạng bằng Dịch (Hydrodissection)",
        noiDung: "Đối với u nằm sát cơ hoành, đại tràng, túi mật, dạ dày: Chọc kim vào khoang phúc mạc cạnh u, bơm truyền dung dịch Glucose 5% hoặc nước cất (100 - 300ml) tạo một khoảng đệm dịch ngăn cách u với tạng nhạy cảm. Giúp bảo vệ tạng không bị bỏng nhiệt và tránh cảm giác đau dữ dội cho người bệnh."
      },
      {
        buoc: 3,
        tieuDe: "Chọc kim Đốt nhiệt & Kiểm soát công suất",
        noiDung: "Chọc kim đốt xuyên qua tâm khối u dưới hướng dẫn siêu âm In-plane. Bật hệ thống tuần hoàn nước muối lạnh làm mát kim. Cài đặt công suất máy (ví dụ MWA: 40 - 60W trong 5 - 8 phút). Trong lúc đốt: Quan sát vùng hồi âm bọt khí tăng âm (Echogenic hyperechoic cloud) lan rộng dần bao phủ toàn bộ khối u và vượt qua bờ u 5mm."
      },
      {
        buoc: 4,
        tieuDe: "Đốt đường hầm kim khi rút (Track Ablation)",
        noiDung: "Khi hoàn tất chu kỳ đốt: Bật chế độ đốt đường hầm khi rút kim từ từ ra ngoài để cầm máu diện chọc và tiêu diệt các tế bào u có nguy cơ gieo rắc dọc đường kim."
      }
    ]
  },
  {
    id: "canthiep-tai-bien-va-xu-tri",
    ten: "Các Tai biến trong Siêu âm Can thiệp & Cách xử trí khẩn cấp",
    phanHe: "canthiep",
    modality: "Siêu âm can thiệp",
    nhom: "Xử trí tai biến",
    dungCu: "Hộp cấp cứu, Atropin 0.5mg, Adrenalin, dịch truyền NaCl 0.9%, bộ dẫn lưu màng phổi",
    cacBuoc: [
      {
        buoc: 1,
        tieuDe: "1. Phản xạ Phế vị (Vasovagal Syncope - Hạ huyết áp, chậm nhịp tim)",
        noiDung: "Triệu chứng: Người bệnh đột ngột chóng mặt, toát mồ hôi lạnh, hoa mắt, buồn nôn, tụt huyết áp và mạch chậm < 50 lần/phút do quá lo lắng, căng thẳng hoặc đau.\n" +
              "Xử trí: Ngừng ngay thao tác; Đặt bệnh nhân nằm đầu bằng hoặc kê chân cao Trendelenburg; Thở oxy; Tiêm tĩnh mạch Atropin 0.5mg (1 ống) nếu nhịp tim < 50 l/p; Truyền dịch nhanh NaCl 0.9% 500ml. Thường hồi phục nhanh sau vài phút."
      },
      {
        buoc: 2,
        tieuDe: "2. Chảy máu Nội tạng & Xuất huyết Sau Can thiệp",
        noiDung: "Triệu chứng: Đau bụng tăng dần, huyết áp tụt, mạch nhanh, da niêm mạc nhợt sau sinh thiết gan/thận hoặc RFA.\n" +
              "Xử trí: Đặt đầu dò siêu âm tại giường kiểm tra ngay khoang Morrison và quanh tạng. Bật Doppler màu tìm ổ giả phình mạch hoặc dòng chảy thoát mạch tự do. Bù dịch, truyền hồng cầu lắng nếu mất máu nặng. Hội chẩn ngay đơn vị Chụp mạch can thiệp (DSA) để nút mạch cầm máu (Transarterial Embolization - TAE) hoặc phẫu thuật cấp cứu."
      },
      {
        buoc: 3,
        tieuDe: "3. Tràn Khí Màng Phổi Cấp (Pneumothorax)",
        noiDung: "Xảy ra khi sinh thiết nốt phổi, u trung thất hoặc can thiệp RFA vùng đỉnh gan sát vòm hoành.\n" +
              "Xử trí: Dùng đầu dò siêu âm đặt tại khoang liên sườn 2-3 đường giữa đòn kiểm tra mất dấu hiệu trượt màng phổi (Lung Sliding) và tìm điểm phổi (Lung Point). Đo độ dày lớp khí. Cho thở oxy 100% mask. Nếu tràn khí lượng ít (< 15-20%) và không suy hô hấp: Theo dõi sát. Nếu tràn khí áp lực hoặc khó thở nhiều: Chọc kim hút khí khoang màng phổi hoặc đặt ống dẫn lưu ngực cấp cứu."
      }
    ]
  }
];
