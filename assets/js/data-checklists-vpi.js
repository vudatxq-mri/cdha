/* =============================================================================
   BẢNG KIỂM THỰC HÀNH — MRI · X-QUANG · SIÊU ÂM · ĐO LOÃNG XƯƠNG
   Bệnh viện Vĩnh Phúc VPI — Khoa Chẩn đoán hình ảnh | Phát triển bởi: Vũ Đạt
   - Bổ sung vào cùng sổ bảng kiểm với CT (SOTAY_CT_CHECKLISTS_MAP) → Admin sửa ngay trong app.
   - Cách gắn bảng kiểm với bài:
       targetIds  : mã bài cụ thể (ưu tiên trước)
       apDungNhom : "Phân hệ|Nhóm" — áp dụng cho MỌI bài trong nhóm đó (bài mới thêm cũng tự có bảng kiểm)
       boQua      : mã bài không áp dụng (bài lý thuyết / bảng tra cứu)
   ⚠️ Bản soạn theo thực hành phổ biến — Khoa cần rà soát, điều chỉnh theo quy trình đã phê duyệt.
   ========================================================================== */
(function () {
  var M = window.SOTAY_CT_CHECKLISTS_MAP = window.SOTAY_CT_CHECKLISTS_MAP || {};
  function add(key, v) { if (!M[key]) M[key] = v; }

  /* --------------------------------------------------------------------- MRI */
  var MRI_SAFETY = "Hoàn thành PHIẾU SÀNG LỌC AN TOÀN MRI có chữ ký: máy tạo nhịp/ICD, clip phình mạch, ốc tai điện tử, bơm thuốc cấy, dị vật kim loại (đặc biệt hốc mắt), stent/van tim/khớp nhân tạo (xác nhận MR Conditional), hình xăm, thai 3 tháng đầu, sợ chỗ kín. Tháo toàn bộ kim loại, thẻ từ, điện thoại, miếng dán thuốc; thay áo của khoa. Chỉ đưa vào Zone IV khi đã sàng lọc đầy đủ.";
  var MRI_END = "Rà soát toàn bộ chuỗi xung: đủ vùng, không xảo ảnh chuyển động/kim loại, đúng hướng cắt. Chụp bổ sung/lặp lại nếu cần trước khi cho người bệnh ra. Kiểm tra thông tin, gửi ảnh lên PACS, ghi số ml thuốc (nếu tiêm) và sự cố vào sổ; đưa người bệnh ra an toàn.";

  add("mri-so-nao-mat-co", {
    apDungNhom: ["MRI|Sọ não", "MRI|Mặt cổ"], boQua: ["mri-so-tra-cuu-nhanh", "mri-so-tiem-gadolinium"],
    ten: "Bảng kiểm Kỹ thuật MRI Sọ não – Mặt cổ", vung: "Sọ não - Mặt cổ",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu họ tên, năm sinh, mã người bệnh với phiếu chỉ định; xác định câu hỏi lâm sàng (đột quỵ, u, động kinh, tuyến yên, hốc mắt...) để chọn đúng protocol; xem phim cũ nếu có." },
      { buoc: 2, tieuDe: "Sàng lọc an toàn MRI", noiDung: MRI_SAFETY },
      { buoc: 3, tieuDe: "Chuẩn bị thuốc đối quang từ (nếu có tiêm)", noiDung: "Khai thác dị ứng, hen, suy thận; kiểm tra eGFR theo quy định khoa; ký cam kết; đặt kim luồn 20–22G thông tốt; chuẩn bị hộp chống sốc. Đột quỵ cấp: KHÔNG trì hoãn DWI để chờ thủ tục tiêm." },
      { buoc: 4, tieuDe: "Tư thế & cuộn thu", noiDung: "Nằm ngửa, đầu vào trước trong Head-Neck coil; đầu thẳng, cố định bằng đệm; nút tai/tai nghe; đưa chuông báo; không để dây/tay chân tạo vòng kín. Laser định vị tại nasion (giữa hai chân mày)." },
      { buoc: 5, tieuDe: "Định vị & đặt lát cắt chuẩn", noiDung: "Chụp localizer 3 mặt phẳng. Axial song song đường AC–PC, phủ từ lỗ chẩm đến đỉnh sọ; Sagittal song song khe liên bán cầu; Coronal vuông góc AC–PC. Hốc mắt/tuyến yên/CPA: lát mỏng 2–3 mm, FOV nhỏ theo protocol." },
      { buoc: 6, tieuDe: "Thực hiện protocol & theo dõi", noiDung: "Chạy đúng thứ tự chuỗi xung (đột quỵ: DWI/ADC đầu tiên, sau đó SWI/GRE). Quan sát người bệnh qua camera/liên lạc; dặn không cử động, không nuốt khi chụp vùng cổ; theo dõi SAR. Sau tiêm: theo dõi phản ứng thuốc." },
      { buoc: 7, tieuDe: "Kiểm tra chất lượng & lưu PACS", noiDung: MRI_END }
    ]
  });

  add("mri-tiem-gadolinium", {
    targetIds: ["mri-so-tiem-gadolinium"],
    ten: "Bảng kiểm Tiêm thuốc đối quang từ (Gadolinium) trong MRI", vung: "Thuốc đối quang từ",
    cacBuoc: [
      { buoc: 1, tieuDe: "Xác định chỉ định tiêm", noiDung: "Đối chiếu chỉ định của bác sĩ; xác nhận protocol cần tiêm (u, viêm, mạch máu, động học)." },
      { buoc: 2, tieuDe: "Sàng lọc nguy cơ", noiDung: "Tiền sử dị ứng/phản ứng với Gadolinium, hen, dị ứng nặng; eGFR (thận trọng khi < 30 mL/phút/1,73m², lọc máu); thai, cho con bú. Báo bác sĩ nếu có nguy cơ." },
      { buoc: 3, tieuDe: "Cam kết & đường truyền", noiDung: "Giải thích, ký cam kết. Đặt kim luồn 20–22G, thử thông bằng NaCl 0,9%; cố định chắc; nối máy tiêm tương thích MRI, đuổi khí." },
      { buoc: 4, tieuDe: "Liều & tốc độ", noiDung: "Liều theo cân nặng (thường 0,1 mmol/kg hoặc theo hướng dẫn của thuốc đang dùng); tốc độ 1–2 mL/s (động học/mạch máu theo protocol); bơm NaCl 0,9% 15–20 mL sau thuốc. Ghi tên thuốc, số lô, số mL." },
      { buoc: 5, tieuDe: "Sẵn sàng xử trí phản ứng", noiDung: "Hộp chống sốc, Adrenalin, oxy sẵn sàng ngoài Zone IV; quy trình đưa người bệnh ra khỏi phòng máy khi cấp cứu (KHÔNG mang thiết bị cấp cứu kim loại vào phòng)." },
      { buoc: 6, tieuDe: "Theo dõi sau tiêm", noiDung: "Theo dõi tại khoa tối thiểu 30 phút; kiểm tra vị trí tiêm (thoát mạch); rút kim, băng ép; hướng dẫn người bệnh uống nhiều nước và báo khi có dấu hiệu bất thường." }
    ]
  });

  add("mri-cot-song", {
    apDungNhom: ["MRI|Cột sống"],
    ten: "Bảng kiểm Kỹ thuật MRI Cột sống", vung: "Cột sống",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu người bệnh – phiếu chỉ định; xác định đoạn cột sống cần chụp (cổ / ngực / thắt lưng / toàn trục) và câu hỏi lâm sàng (thoát vị, chấn thương, u, viêm)." },
      { buoc: 2, tieuDe: "Sàng lọc an toàn MRI", noiDung: MRI_SAFETY + " Người bệnh có nẹp vít cột sống: chuẩn bị chuỗi giảm xảo ảnh kim loại." },
      { buoc: 3, tieuDe: "Tư thế & cuộn thu", noiDung: "Nằm ngửa trên Spine coil, đầu vào trước; kê gối dưới khoeo (thắt lưng) cho dễ chịu; cột sống thẳng trên trục giữa. Tâm định vị: cổ – sụn giáp; ngực – giữa xương ức; thắt lưng – mào chậu." },
      { buoc: 4, tieuDe: "Đánh số đốt sống", noiDung: "Chụp localizer dọc đủ dài để đếm đốt từ C2 (hoặc từ xương cùng); ghi chú đốt chuyển tiếp nếu có. Toàn trục: ghép ảnh nhiều trạm." },
      { buoc: 5, tieuDe: "Đặt lát cắt chuẩn", noiDung: "Sagittal phủ hết hai lỗ liên hợp; Axial song song từng đĩa đệm vùng tổn thương (thắt lưng tối thiểu L3-S1); đặt dải bão hòa (Sat band) phía trước để giảm xảo ảnh nuốt, nhịp thở, dòng chảy." },
      { buoc: 6, tieuDe: "Thực hiện protocol & theo dõi", noiDung: "T1, T2, STIR Sagittal; T2 (± T2*) Axial; tiêm thuốc khi nghi u, viêm, sau mổ. Theo dõi người bệnh, nhắc không cử động; theo dõi SAR." },
      { buoc: 7, tieuDe: "Kiểm tra chất lượng & lưu PACS", noiDung: MRI_END }
    ]
  });

  add("mri-bung-chau", {
    apDungNhom: ["MRI|Bụng", "MRI|Chậu"],
    ten: "Bảng kiểm Kỹ thuật MRI Bụng – Tiểu khung", vung: "Bụng - Chậu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu người bệnh – chỉ định; xác định cơ quan khảo sát (gan mật, tụy, thận, tiền liệt tuyến, tử cung – buồng trứng, trực tràng, đường rò) để chọn protocol." },
      { buoc: 2, tieuDe: "Sàng lọc an toàn MRI", noiDung: MRI_SAFETY + " Phụ nữ có thai: chỉ chụp khi có chỉ định rõ, không tiêm Gadolinium." },
      { buoc: 3, tieuDe: "Chuẩn bị đặc thù", noiDung: "Nhịn ăn 4–6 giờ (gan mật, MRCP). Tiểu khung: bàng quang đầy vừa phải; trực tràng/tiền liệt tuyến: làm sạch trực tràng theo quy định khoa; cân nhắc thuốc giảm nhu động nếu không chống chỉ định. Có tiêm: eGFR, cam kết, kim luồn." },
      { buoc: 4, tieuDe: "Tập thở & theo dõi hô hấp", noiDung: "Hướng dẫn và tập nín thở cuối thì thở ra (đồng nhất các lần); đặt đai/bóng nhận biết nhịp thở cho chuỗi gating. Người bệnh không hợp tác: dùng protocol thở tự do." },
      { buoc: 5, tieuDe: "Tư thế & cuộn thu", noiDung: "Nằm ngửa, Body/Torso coil phủ đúng vùng; hai tay để trên ngực hoặc đầu (không chạm thân tạo vòng kín). Tâm định vị: bụng – mũi ức/bờ sườn; tiểu khung – giữa mào chậu và khớp mu." },
      { buoc: 6, tieuDe: "Đặt lát cắt & thực hiện", noiDung: "Phủ đủ cơ quan; tiền liệt tuyến/trực tràng/tử cung: lát mỏng T2 3 mặt phẳng vuông góc trục cơ quan hoặc khối u. Động học: tiêm theo thời điểm (bolus tracking/test bolus), nhắc nín thở đúng lúc." },
      { buoc: 7, tieuDe: "Kiểm tra chất lượng & lưu PACS", noiDung: MRI_END }
    ]
  });

  add("mri-co-xuong-khop", {
    apDungNhom: ["MRI|Chi & các khớp"],
    ten: "Bảng kiểm Kỹ thuật MRI Cơ – Xương – Khớp", vung: "Chi & các khớp",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & đúng bên", noiDung: "Đối chiếu người bệnh – chỉ định; XÁC NHẬN BÊN (phải/trái) với người bệnh và phiếu; đánh dấu vị trí đau/khối bằng marker vitamin E nếu cần." },
      { buoc: 2, tieuDe: "Sàng lọc an toàn MRI", noiDung: MRI_SAFETY + " Có khớp nhân tạo/nẹp vít vùng chụp: chọn chuỗi giảm xảo ảnh kim loại." },
      { buoc: 3, tieuDe: "Chọn cuộn thu chuyên dụng", noiDung: "Gối: Knee coil; vai: Shoulder coil; cổ tay/khuỷu/cổ chân: coil chuyên dụng hoặc Flex coil; háng/xương dài: Body coil. Khớp đặt ở TÂM coil và gần tâm từ trường nhất có thể." },
      { buoc: 4, tieuDe: "Tư thế & cố định", noiDung: "Gối: gấp 10–15°, xoay ngoài nhẹ; vai: tay xuôi, ngón cái hướng lên (xoay ngoài nhẹ); cổ tay: tư thế Superman hoặc cạnh thân; cổ chân: gập 90°. Chèn đệm cố định chắc để không cử động." },
      { buoc: 5, tieuDe: "Đặt lát cắt chuẩn", noiDung: "Gối: Sagittal song song dây chằng chéo trước, Coronal song song đường nối hai lồi cầu sau; vai: Coronal chếch song song gân trên gai, Sagittal chếch vuông góc; FOV nhỏ 12–16 cm, lát 3–3,5 mm; ít nhất 1 chuỗi xóa mỡ (PD FS/STIR)." },
      { buoc: 6, tieuDe: "Thực hiện protocol & theo dõi", noiDung: "Chạy đủ 3 mặt phẳng theo protocol vùng khớp; tiêm thuốc khi nghi u, viêm, nhiễm trùng. Theo dõi người bệnh, nhắc giữ yên chi." },
      { buoc: 7, tieuDe: "Kiểm tra chất lượng & lưu PACS", noiDung: MRI_END }
    ]
  });

  add("mri-vu", {
    apDungNhom: ["MRI|Vú"],
    ten: "Bảng kiểm Kỹ thuật MRI Tuyến vú", vung: "Tuyến vú",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & thời điểm chụp", noiDung: "Đối chiếu người bệnh – chỉ định; ưu tiên ngày 7–14 của chu kỳ kinh (DCE-MRI); ghi nhận tiền sử phẫu thuật, sinh thiết, túi ngực, kết quả nhũ ảnh/siêu âm." },
      { buoc: 2, tieuDe: "Sàng lọc an toàn MRI", noiDung: MRI_SAFETY },
      { buoc: 3, tieuDe: "Đường truyền (DCE-MRI)", noiDung: "Kiểm tra eGFR, dị ứng; đặt kim luồn 20–22G ở tay KHÔNG cùng bên tổn thương nghi ngờ; nối máy tiêm, đuổi khí." },
      { buoc: 4, tieuDe: "Tư thế & cuộn thu", noiDung: "Nằm sấp trên Breast coil, hai vú thả tự do vào hai hốc, không bị gấp nếp; hai tay để dọc thân hoặc lên đầu; đệm ngực/đầu cho dễ chịu để giữ yên suốt thời gian chụp." },
      { buoc: 5, tieuDe: "Thực hiện protocol", noiDung: "T2/STIR, DWI; động học T1 xóa mỡ trước tiêm và nhiều thì sau tiêm (không thay đổi thông số giữa các thì); túi ngực: chuỗi silicone-only/silicone-suppressed theo protocol." },
      { buoc: 6, tieuDe: "Hậu xử lý & lưu PACS", noiDung: "Ảnh trừ (subtraction), MIP, đường cong động học; kiểm tra không xảo ảnh di động giữa các thì. " + MRI_END }
    ]
  });

  /* ---------------------------------------------------------------- X-QUANG */
  var XQ_ADMIN = "Đối chiếu họ tên, năm sinh, mã người bệnh với phiếu chỉ định; xác nhận VÙNG và BÊN chụp (phải/trái) với người bệnh; xem phim cũ nếu có.";
  var XQ_PREG = "Hỏi khả năng có thai ở nữ 12–50 tuổi (ghi nhận ngày kinh cuối); có thai → báo bác sĩ trước khi chụp. Che chắn tuyến sinh dục/tuyến giáp bằng áo chì khi không che vùng cần khảo sát; người nhà giữ trẻ phải mặc áo chì.";
  var XQ_END = "Đánh giá phim theo tiêu chuẩn đạt (đủ vùng, đúng tư thế, không xoay, độ tương phản và độ nét đạt, marker L/R đúng); chụp lại khi không đạt và ghi lý do. Kiểm tra thông tin trên ảnh, gửi PACS, ghi chỉ số liều (DAP/EI) nếu máy hiển thị.";

  add("xq-chi", {
    apDungNhom: ["X-quang|Chi trên", "X-quang|Chi dưới"],
    ten: "Bảng kiểm Kỹ thuật X-quang Chi trên – Chi dưới", vung: "Chi & khớp",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & đúng bên", noiDung: XQ_ADMIN },
      { buoc: 2, tieuDe: "An toàn bức xạ", noiDung: XQ_PREG },
      { buoc: 3, tieuDe: "Chuẩn bị vùng chụp", noiDung: "Tháo trang sức, đồng hồ, quần áo có khuy kim loại vùng chụp. Chấn thương: di chuyển nhẹ nhàng, không cố nắn chỉnh chi gãy; giữ nguyên nẹp nếu bác sĩ chưa cho tháo." },
      { buoc: 4, tieuDe: "Đặt tư thế", noiDung: "Ít nhất 2 tư thế vuông góc (thẳng + nghiêng/chếch theo bài). Xương dài: lấy đủ một khớp trên và/hoặc một khớp dưới. Khớp: khe khớp song song chùm tia. So sánh hai bên khi có chỉ định (trẻ em)." },
      { buoc: 5, tieuDe: "Tia trung tâm & khu trú chùm tia", noiDung: "Tia trung tâm đúng điểm mốc của bài, vuông góc phim (hoặc theo góc chếch quy định); SID 100 cm; khu trú chùm tia sát vùng khảo sát (thấy mép collimator trên ảnh); đặt marker L/R đúng bên." },
      { buoc: 6, tieuDe: "Thông số phát tia", noiDung: "Chọn kV – mAs theo bề dày vùng chụp và tuổi (trẻ em giảm liều); có/không dùng lưới chống tán xạ theo bề dày (> 10–12 cm dùng lưới). Dặn người bệnh giữ yên khi phát tia." },
      { buoc: 7, tieuDe: "Đánh giá phim & lưu PACS", noiDung: XQ_END }
    ]
  });

  add("xq-cot-song", {
    apDungNhom: ["X-quang|Cột sống"],
    ten: "Bảng kiểm Kỹ thuật X-quang Cột sống", vung: "Cột sống",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: XQ_ADMIN + " Chấn thương cột sống cổ: giữ nguyên nẹp cổ, chụp nghiêng tia ngang trước, KHÔNG xoay/cúi cổ khi chưa loại trừ tổn thương." },
      { buoc: 2, tieuDe: "An toàn bức xạ", noiDung: XQ_PREG },
      { buoc: 3, tieuDe: "Chuẩn bị", noiDung: "Tháo dây chuyền, kẹp tóc, răng giả tháo lắp (cột sống cổ, C1–C2 há miệng), áo ngực có gọng (cột sống ngực), quần áo có khóa kim loại (thắt lưng)." },
      { buoc: 4, tieuDe: "Đặt tư thế", noiDung: "Thẳng: mặt phẳng dọc giữa vuông góc phim, không xoay (gai sau ở giữa thân đốt). Nghiêng: hai vai/hai mào chậu chồng nhau; cổ nghiêng hạ thấp vai tối đa để thấy C7; thắt lưng kê đệm cho cột sống song song mặt bàn. Chếch, động (cúi – ngửa, gập – ưỡn) theo bài." },
      { buoc: 5, tieuDe: "Tia trung tâm & khu trú", noiDung: "Đúng điểm mốc từng đoạn (cổ: C4 – sụn giáp; ngực: T7; thắt lưng: L3 – ngang bờ sườn dưới/ 3 cm trên mào chậu); góc chếch theo bài (cổ thẳng chếch lên 15–20°); khu trú chùm tia dọc theo cột sống." },
      { buoc: 6, tieuDe: "Thông số & hô hấp", noiDung: "Dùng lưới chống tán xạ; kV – mAs theo bề dày; cột sống ngực nghiêng có thể dùng kỹ thuật thở nhẹ (breathing technique) làm mờ bóng sườn – phổi; các tư thế khác nín thở khi phát tia." },
      { buoc: 7, tieuDe: "Đánh giá phim & lưu PACS", noiDung: XQ_END }
    ]
  });

  add("xq-nguc-bung", {
    apDungNhom: ["X-quang|Lồng ngực", "X-quang|Lồng ngực - Bụng"],
    ten: "Bảng kiểm Kỹ thuật X-quang Ngực – Bụng", vung: "Ngực - Bụng",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: XQ_ADMIN + " Xác định người bệnh đứng được hay phải chụp tại giường/nằm." },
      { buoc: 2, tieuDe: "An toàn bức xạ", noiDung: XQ_PREG },
      { buoc: 3, tieuDe: "Chuẩn bị", noiDung: "Thay áo; tháo dây chuyền, áo ngực có gọng, cúc kim loại; buộc tóc dài lên. Đưa dây dẫn, điện cực, ống dẫn lưu ra khỏi trường chiếu khi an toàn." },
      { buoc: 4, tieuDe: "Đặt tư thế", noiDung: "Ngực thẳng PA đứng: ngực áp sát phim, hai mu bàn tay chống hông, xoay vai ra trước để hai xương bả vai ra ngoài phế trường; cằm nâng. Nghiêng: tay giơ cao. Bụng: đứng (thấy vòm hoành) và/hoặc nằm; decubitus: nằm nghiêng tối thiểu 5–10 phút trước khi chụp." },
      { buoc: 5, tieuDe: "Tia trung tâm & khoảng cách", noiDung: "Ngực PA: tia vào T6–T7, SID 180 cm; bụng: tia vào L3/mào chậu, SID 100 cm; khu trú chùm tia phủ đủ đỉnh phổi – góc sườn hoành (ngực) hoặc vòm hoành – khớp mu (bụng)." },
      { buoc: 6, tieuDe: "Hô hấp & thông số", noiDung: "Ngực: hít vào sâu và nín thở (thấy ≥ 10 cung sườn sau trên vòm hoành); bụng: thở ra hết và nín thở. kV cao cho ngực (~110–125 kV) với lưới; trẻ em giảm liều theo tuổi." },
      { buoc: 7, tieuDe: "Đánh giá phim & lưu PACS", noiDung: XQ_END + " Ngực: đầu trong hai xương đòn cách đều gai sau." }
    ]
  });

  add("xq-so-mat-rang", {
    apDungNhom: ["X-quang|Sọ - Mặt", "X-quang|Răng"],
    ten: "Bảng kiểm Kỹ thuật X-quang Sọ – Mặt – Răng", vung: "Sọ - Mặt",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: XQ_ADMIN },
      { buoc: 2, tieuDe: "An toàn bức xạ", noiDung: XQ_PREG + " Bảo vệ tuyến giáp bằng yếm chì khi không vào trường chiếu." },
      { buoc: 3, tieuDe: "Chuẩn bị", noiDung: "Tháo kẹp tóc, bông tai, kính, răng giả tháo lắp, khuyên mũi/môi, máy trợ thính." },
      { buoc: 4, tieuDe: "Đặt tư thế theo đường chuẩn", noiDung: "Dùng các đường chuẩn OML (đuôi mắt – lỗ tai), IOML, mặt phẳng dọc giữa; không xoay, không nghiêng đầu. Xoang (Blondeau/Hirtz...) theo góc quy định; Panorama: cắn khay, mặt phẳng Frankfort song song sàn, mặt phẳng dọc giữa trùng vạch laser, lưỡi áp vòm miệng." },
      { buoc: 5, tieuDe: "Tia trung tâm & khu trú", noiDung: "Tia trung tâm đúng điểm mốc và góc chếch của bài; khu trú chùm tia sát vùng khảo sát; đặt marker L/R." },
      { buoc: 6, tieuDe: "Thông số & giữ yên", noiDung: "kV – mAs theo bài, có lưới (sọ); dặn người bệnh không cử động, không nuốt (Panorama giữ yên suốt chu kỳ quay)." },
      { buoc: 7, tieuDe: "Đánh giá phim & lưu PACS", noiDung: XQ_END + " Sọ thẳng: hai hốc mắt cân xứng; nghiêng: hai ngành hàm/hai hố yên chồng khít." }
    ]
  });

  add("xq-dac-biet", {
    apDungNhom: ["X-quang|XQ đặc biệt"],
    ten: "Bảng kiểm X-quang có thuốc cản quang (thực quản – dạ dày, ruột, đại tràng, UIV, HSG, niệu đạo – bàng quang)", vung: "XQ đặc biệt",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: XQ_ADMIN + " Xác nhận đúng kỹ thuật và loại thuốc cản quang (Barit hay i-ốt tan trong nước)." },
      { buoc: 2, tieuDe: "Sàng lọc chống chỉ định", noiDung: "Nghi thủng tạng / rò / sau mổ tiêu hóa: KHÔNG dùng Barit, chuyển thuốc i-ốt tan trong nước. Thuốc i-ốt tĩnh mạch (UIV): dị ứng, hen, eGFR, Metformin. HSG: ngoài kỳ kinh và trước rụng trứng (thường ngày 7–10), loại trừ thai, viêm nhiễm sinh dục cấp." },
      { buoc: 3, tieuDe: "Chuẩn bị người bệnh", noiDung: "Nhịn ăn theo bài (thực quản – dạ dày: ≥ 6 giờ); làm sạch ruột (đại tràng, UIV) theo quy định khoa; đi tiểu trước UIV; ký cam kết; đặt đường truyền khi tiêm tĩnh mạch." },
      { buoc: 4, tieuDe: "Chuẩn bị thuốc & dụng cụ", noiDung: "Pha thuốc đúng nồng độ, kiểm tra hạn dùng; dụng cụ vô khuẩn (ống thông, canuyn HSG, ống thông niệu đạo); hộp chống sốc sẵn sàng; áo chì cho nhân viên ở lại phòng." },
      { buoc: 5, tieuDe: "Chụp phim chuẩn bị", noiDung: "Chụp phim không chuẩn bị (KUB/bụng) trước khi đưa thuốc để đánh giá sỏi, khí, mức độ sạch ruột và chọn thông số." },
      { buoc: 6, tieuDe: "Đưa thuốc & chụp theo thì", noiDung: "Đưa thuốc theo đúng đường (uống / bơm / tiêm), chụp đúng các thì và tư thế của bài (UIV: 5 – 15 – 30 phút ± muộn; đại tràng: đối quang kép; HSG: thì làm đầy và thì thuốc vào ổ bụng). Hạn chế thời gian chiếu tia, khu trú chùm tia." },
      { buoc: 7, tieuDe: "Theo dõi sau thủ thuật & lưu PACS", noiDung: "Theo dõi phản ứng thuốc, đau bụng, chảy máu; dặn uống nhiều nước (sau Barit để tránh táo bón). Ghi thuốc, liều, thời gian chiếu tia; gửi PACS; ghi nhận sự cố nếu có." }
    ]
  });

  /* ---------------------------------------------------------------- SIÊU ÂM */
  var US_PROBE = "Vệ sinh – khử khuẩn đầu dò trước và sau mỗi người bệnh theo quy định kiểm soát nhiễm khuẩn; dùng gel sạch, bao đầu dò vô khuẩn khi có vết thương/thủ thuật.";
  var US_END = "Lưu ảnh đại diện các mặt cắt chuẩn và tổn thương (có đo đạc, ghi chú bên/vị trí); đối chiếu thông tin trên máy; mô tả – kết luận theo mẫu của khoa; gửi PACS/in kết quả; lau sạch gel cho người bệnh.";

  add("us-bung", {
    targetIds: ["us-bung-tong-quat"], apDungNhom: ["Siêu âm|Ổ bụng"],
    ten: "Bảng kiểm Siêu âm Ổ bụng tổng quát", vung: "Ổ bụng",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu họ tên, năm sinh, mã người bệnh; đọc câu hỏi lâm sàng (đau hạ sườn phải, sỏi, theo dõi u...); xem kết quả cũ." },
      { buoc: 2, tieuDe: "Chuẩn bị người bệnh", noiDung: "Nhịn ăn 6 giờ (đánh giá túi mật, đường mật, tụy); uống nước để bàng quang căng vừa đủ khi cần khảo sát tiểu khung. Giải thích quy trình, bộc lộ vùng bụng, giữ kín đáo." },
      { buoc: 3, tieuDe: "Đầu dò & cài đặt máy", noiDung: US_PROBE + " Chọn đầu dò convex 2–5 MHz, preset Abdomen; chỉnh độ sâu, gain, TGC, focus đúng vùng khảo sát." },
      { buoc: 4, tieuDe: "Quét hệ thống theo thứ tự", noiDung: "Gan (kích thước, nhu mô, tĩnh mạch cửa, TM trên gan) → túi mật, đường mật (đo OMC) → tụy → lách → hai thận → bàng quang → tử cung – phần phụ / tiền liệt tuyến → dịch ổ bụng, hạch. Mỗi tạng quét 2 mặt phẳng vuông góc." },
      { buoc: 5, tieuDe: "Kỹ thuật hỗ trợ", noiDung: "Hít sâu nín thở để gan, lách hạ thấp; đổi tư thế nghiêng trái/phải, ngồi khi hơi ruột che; dùng Doppler màu khi nghi tổn thương mạch hoặc khối." },
      { buoc: 6, tieuDe: "Đo đạc & đánh giá", noiDung: "Đo theo chuẩn: gan, lách, thận (dọc), thành túi mật, OMC, thể tích bàng quang/nước tiểu tồn dư, tiền liệt tuyến. Ghi nhận tổn thương: vị trí, kích thước, cấu trúc âm, tưới máu." },
      { buoc: 7, tieuDe: "Lưu ảnh & trả kết quả", noiDung: US_END }
    ]
  });

  add("us-phan-nong", {
    targetIds: ["us-tuyen-giap-tirads", "us-tuyen-vu-birads"], apDungNhom: ["Siêu âm|Cổ - Giáp", "Siêu âm|Tuyến vú"],
    ten: "Bảng kiểm Siêu âm Phần nông (Tuyến giáp – Tuyến vú)", vung: "Phần nông",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu người bệnh – chỉ định; khai thác tiền sử (bướu giáp, phẫu thuật, FNA; khối vú, tiền sử gia đình, nhũ ảnh trước)." },
      { buoc: 2, tieuDe: "Đầu dò & cài đặt máy", noiDung: US_PROBE + " Đầu dò linear tần số cao 7–15 MHz, preset Thyroid/Breast; độ sâu vừa đủ, focus ở vùng tổn thương." },
      { buoc: 3, tieuDe: "Tư thế", noiDung: "Tuyến giáp: nằm ngửa, kê gối dưới vai, cổ ngửa tối đa. Tuyến vú: nằm ngửa, tay cùng bên đưa lên đầu; nghiêng nhẹ sang đối bên khi khám 1/4 ngoài vú lớn." },
      { buoc: 4, tieuDe: "Quét hệ thống", noiDung: "Giáp: hai thùy + eo, mặt cắt ngang và dọc, đo 3 chiều mỗi thùy. Vú: quét toàn bộ theo hình nan hoa (radial) và đối nan hoa hoặc theo hàng, đủ 4 phần tư, quầng vú và đuôi nách." },
      { buoc: 5, tieuDe: "Mô tả tổn thương theo chuẩn", noiDung: "Ghi vị trí (giáp: thùy, 1/3; vú: giờ đồng hồ + khoảng cách tới núm vú), kích thước 3 chiều; mô tả theo từ điển ACR TI-RADS (thành phần, hồi âm, hình dạng, bờ, nốt vôi) / ACR BI-RADS; dùng Doppler màu ± đàn hồi mô nếu có." },
      { buoc: 6, tieuDe: "Hạch vùng", noiDung: "Khảo sát hạch cổ các nhóm (giáp) hoặc hạch nách – trên đòn – vú trong (vú); mô tả hạch nghi ngờ (mất rốn hạch, vỏ dày, vôi hóa, dịch hóa)." },
      { buoc: 7, tieuDe: "Phân loại & lưu ảnh", noiDung: "Kết luận điểm TI-RADS / phân loại BI-RADS và khuyến cáo (theo dõi, FNA, sinh thiết) theo hướng dẫn. " + US_END }
    ]
  });

  add("us-fast", {
    targetIds: ["us-fast-efast"], apDungNhom: ["Siêu âm|Cấp cứu"],
    ten: "Bảng kiểm Siêu âm FAST / eFAST cấp cứu chấn thương", vung: "Cấp cứu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Không trì hoãn hồi sức", noiDung: "Thực hiện tại giường song song hồi sức (ABC); không di chuyển người bệnh không ổn định; ghi giờ thực hiện." },
      { buoc: 2, tieuDe: "Đầu dò & cài đặt", noiDung: "Đầu dò convex (bụng) hoặc phased array; linear cho màng phổi (eFAST). Preset FAST/Abdomen; khử khuẩn đầu dò." },
      { buoc: 3, tieuDe: "Vị trí 1 – Khoang Morrison", noiDung: "Hạ sườn phải, đường nách giữa: tìm dịch giữa gan – thận phải, quét cả cực dưới thận và rãnh cạnh đại tràng phải." },
      { buoc: 4, tieuDe: "Vị trí 2 – Lách – thận trái", noiDung: "Hạ sườn trái, đường nách sau (cao hơn bên phải): tìm dịch dưới hoành trái, quanh lách, khoang lách – thận." },
      { buoc: 5, tieuDe: "Vị trí 3 – Trên xương mu", noiDung: "Mặt cắt ngang và dọc trên khớp mu: tìm dịch túi cùng Douglas/sau bàng quang (dễ thấy hơn khi bàng quang còn nước tiểu)." },
      { buoc: 6, tieuDe: "Vị trí 4 – Dưới mũi ức (màng tim)", noiDung: "Mặt cắt 4 buồng dưới sườn: tìm dịch màng ngoài tim, dấu hiệu chèn ép." },
      { buoc: 7, tieuDe: "eFAST – Màng phổi hai bên", noiDung: "Đầu dò linear khoang liên sườn 2–3 đường giữa đòn hai bên: dấu trượt màng phổi, đường B (loại trừ tràn khí); vùng góc sườn hoành: tràn dịch/máu màng phổi." },
      { buoc: 8, tieuDe: "Kết luận & báo ngay", noiDung: "Kết luận FAST DƯƠNG TÍNH / ÂM TÍNH theo từng vị trí; báo ngay cho bác sĩ cấp cứu khi dương tính; FAST âm tính không loại trừ tổn thương — lặp lại khi diễn biến thay đổi. Lưu ảnh từng vị trí." }
    ]
  });

  add("us-doppler", {
    targetIds: ["us-doppler-mach-mau"], apDungNhom: ["Siêu âm|Mạch máu"],
    ten: "Bảng kiểm Siêu âm Doppler mạch máu", vung: "Mạch máu",
    cacBuoc: [
      { buoc: 1, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu người bệnh – chỉ định (hẹp động mạch cảnh, huyết khối tĩnh mạch sâu, suy tĩnh mạch...); xác nhận bên cần khảo sát." },
      { buoc: 2, tieuDe: "Đầu dò & cài đặt", noiDung: US_PROBE + " Linear 5–12 MHz (convex cho mạch sâu, béo phì); preset Carotid/Venous; chỉnh thang vận tốc (PRF), wall filter, gain màu phù hợp dòng chảy." },
      { buoc: 3, tieuDe: "Tư thế", noiDung: "Động mạch cảnh: nằm ngửa, cổ ngửa nhẹ, quay đầu sang đối bên. Tĩnh mạch chi dưới: nằm ngửa đầu cao (anti-Trendelenburg) hoặc ngồi thõng chân, đùi xoay ngoài, gối gấp nhẹ; khoeo: nằm sấp hoặc nghiêng." },
      { buoc: 4, tieuDe: "Thang xám & Doppler màu", noiDung: "Quét cắt ngang và dọc toàn bộ đoạn mạch; đánh giá thành mạch, mảng xơ vữa, huyết khối; Doppler màu tìm vùng hẹp, dòng chảy rối, khuyết màu." },
      { buoc: 5, tieuDe: "Doppler xung & đo vận tốc", noiDung: "Đặt cửa sổ mẫu giữa lòng mạch, góc Doppler ≤ 60° và căn chỉnh song song dòng chảy; đo PSV, EDV, tỷ số ICA/CCA tại vị trí hẹp nhất; ghi phổ trước – tại – sau chỗ hẹp." },
      { buoc: 6, tieuDe: "Nghiệm pháp tĩnh mạch", noiDung: "Ép tĩnh mạch từng đoạn 1–2 cm trên mặt cắt ngang (không ép được = huyết khối); nghiệm pháp bóp cơ/Valsalva đánh giá dòng chảy và trào ngược (thời gian trào ngược)." },
      { buoc: 7, tieuDe: "Kết luận & lưu ảnh", noiDung: "Phân độ hẹp theo tiêu chuẩn vận tốc đang áp dụng; vị trí, mức độ huyết khối (cấp/mạn). " + US_END }
    ]
  });

  /* -------------------------------------------------------- ĐO LOÃNG XƯƠNG */
  add("dlx-dexa", {
    targetIds: ["dlx-nguyen-ly", "dlx-tu-the-roi", "dlx-tieu-chuan-who"],
    ten: "Bảng kiểm Đo mật độ xương (DEXA)", vung: "Đo loãng xương",
    cacBuoc: [
      { buoc: 1, tieuDe: "Kiểm tra chất lượng máy (QC)", noiDung: "Chạy phantom hiệu chuẩn hằng ngày trước ca đầu tiên; kết quả trong giới hạn cho phép mới đo người bệnh; ghi sổ QC." },
      { buoc: 2, tieuDe: "Hành chính & chỉ định", noiDung: "Đối chiếu họ tên, năm sinh, mã người bệnh; xác định chỉ định (phụ nữ mãn kinh, nam > 70 tuổi, dùng corticoid kéo dài, gãy xương do chấn thương nhẹ, theo dõi điều trị)." },
      { buoc: 3, tieuDe: "Loại trừ yếu tố gây sai số", noiDung: "Có thai; đã chụp có Barit, thuốc cản quang hoặc xạ hình y học hạt nhân trong vài ngày gần đây (hoãn đo theo quy định khoa); dị vật kim loại, nẹp vít, khớp nhân tạo vùng đo (chọn vị trí khác). Thay áo, tháo kim loại, khuy, khóa kéo vùng bụng – hông." },
      { buoc: 4, tieuDe: "Nhập dữ liệu chính xác", noiDung: "Đo và nhập chiều cao, cân nặng thực tế; ngày sinh, giới, dân tộc/nhóm tham chiếu — sai dữ liệu làm sai T-score, Z-score và FRAX. Lần đo theo dõi: dùng cùng máy, cùng vị trí, cùng ROI." },
      { buoc: 5, tieuDe: "Đo cột sống thắt lưng", noiDung: "Nằm ngửa giữa bàn, cột sống thẳng trên trục; kê khối đỡ dưới cẳng chân (háng – gối gấp ~ 90°) để làm phẳng cột sống thắt lưng. Vùng quét từ giữa L5 đến giữa T12." },
      { buoc: 6, tieuDe: "Đo cổ xương đùi", noiDung: "Chân duỗi thẳng, xoay trong 15–25° (dùng dụng cụ cố định bàn chân) để cổ xương đùi song song mặt bàn, mấu chuyển bé gần như không thấy. Đo bên không có dị vật/gãy cũ (thường bên trái)." },
      { buoc: 7, tieuDe: "Kiểm tra ROI", noiDung: "Cột sống: L1–L4 đánh số đúng, đường giới hạn liên đốt chuẩn; loại đốt bất thường (gãy xẹp, gai xương lớn, chênh lệch T-score > 1,0 SD so với đốt kế cận), dùng tối thiểu 2 đốt. Háng: ROI cổ xương đùi đặt đúng, không chồng lên mấu chuyển." },
      { buoc: 8, tieuDe: "Kết quả & lưu trữ", noiDung: "Phân loại theo WHO dựa trên T-score thấp nhất (cột sống, cổ xương đùi, toàn bộ háng); dùng Z-score cho phụ nữ tiền mãn kinh, nam < 50 tuổi; tính FRAX khi có chỉ định. Lưu ảnh ROI kèm kết quả, so sánh lần đo trước (thay đổi có ý nghĩa vượt LSC)." }
    ]
  });
})();

/* Bảng kiểm cho một bài: (1) mã bài cụ thể → (2) theo "Phân hệ|Nhóm" (trừ bài bị bỏ qua).
   Thay thế hàm cũ trong data-ct-checklists.js (vẫn tương thích targetIds của CT). */
window.getChecklistForProtocol = function (protocolId) {
  if (!protocolId) return null;
  var map = window.SOTAY_CT_CHECKLISTS_MAP || {};
  var keys = Object.keys(map), i, c;
  for (i = 0; i < keys.length; i++) {
    c = map[keys[i]];
    if (c && c.targetIds && c.targetIds.indexOf(protocolId) !== -1) return c;
  }
  var it = null, lists = [window.SOTAY_QUYTRINH, window.SOTAY_SIEUAM, window.SOTAY_CANTHIEP];
  for (i = 0; i < lists.length && !it; i++) {
    (lists[i] || []).some(function (x) { if (x && x.id === protocolId) { it = x; return true; } return false; });
  }
  if (!it) return null;
  var tag = (it.modality || (window.SOTAY_SIEUAM && window.SOTAY_SIEUAM.indexOf(it) !== -1 ? "Siêu âm" : "")) + "|" + (it.nhom || "");
  for (i = 0; i < keys.length; i++) {
    c = map[keys[i]];
    if (c && c.apDungNhom && c.apDungNhom.indexOf(tag) !== -1 && !(c.boQua && c.boQua.indexOf(protocolId) !== -1)) return c;
  }
  return null;
};
