/* ============================================================================
   BỘ DỮ LIỆU TRI THỨC LÂM SÀNG, NGUYÊN LÝ & CẨM NANG VẬN HÀNH THIẾT BỊ
   SỔ CĐHA — KHOA CHẨN ĐOÁN HÌNH ẢNH — BỆNH VIỆN VĨNH PHÚC (VPI)
   
   NGUỒN THAM CHIẾU CHÍNH THỨC:
   1. Bệnh Viện Vĩnh Phúc VPI - GE SIGNA™ Explorer 1.5T:
      https://academy.siemens-healthineers.com/vi-vn
   2. Siemens Healthineers Academy:
      https://academy.siemens-healthineers.com/vi-vn
   3. Wikiradiology - Kỹ Thuật Viên 3 Miền:
      https://wikirad.ktv3mien.com/
   4. Thư viện Bài giảng Kỹ thuật CĐHA PPTX KTV 3 Miền:
      https://exam.ktv3mien.com/pptx/index.html
   ============================================================================ */

window.SOTAY_CLINICAL_KNOWLEDGE = {

  /* =========================================================================
     1. CẨM NANG VẬN HÀNH MÁY GE SIGNA™ EXPLORER 1.5T TẠI BỆNH VIỆN VĨNH PHÚC VPI
     ========================================================================= */
  geSignaExplorerVPI: {
    tenThietBi: "GE SIGNA™ Explorer 1.5 Tesla (Bệnh viện Vĩnh Phúc VPI)",
    // taiLieuVPI
    thongSoPhanCung: {
      tuTruong: "1.5 Tesla (Nam châm siêu dẫn đồng nhất cao)",
      congLongChup: "Bore 60 cm (Thiết kế ngắn, giảm hội chứng sợ phòng kín)",
      congNgheTu: "Zero Boil-off Technology (Không hao hụt khí Heli lỏng)",
      heThongGradient: "OpTix RF Architecture - Gradient 33 mT/m, Slew Rate 120 T/m/s",
      kenhThuNhan: "OpTix Optical RF 16 kênh quang học trực tiếp (Tăng SNR tới 27%)"
    },
    danhSachCuonThuCoils: [
      { ten: "Head-Neck 16-Channel Coil", ungDung: "Khảo sát Sọ não, Mạch máu não (TOF MRA), Hốc mắt, Tuyến yên, Vòm họng và Cột sống cổ." },
      { ten: "Body / Torso Array 16-Channel Coil", ungDung: "Khảo sát Ngực, Tim, Gan mật đa pha (LAVA-Flex), MRCP đường mật, Tụy, Thận và Vùng chậu." },
      { ten: "Dedicated HD Knee 8-Channel Coil", ungDung: "Khảo sát Khớp gối chuyên sâu (Dây chằng chéo ACL/PCL, sụn chêm, sụn bánh chè)." },
      { ten: "Dedicated Shoulder 8-Channel Coil", ungDung: "Khảo sát Khớp vai chuyên sâu (Gân trên gai chóp xoay, sụn viền ổ chảo Labrum)." },
      { ten: "Integrated Spine Matrix Coil", ungDung: "Cuộn thu tích hợp sẵn ngầm dưới mặt bàn bệnh nhân, chụp toàn bộ Cột sống Cổ - Ngực - Thắt lưng." },
      { ten: "Flex Large & Small Multi-purpose Coils", ungDung: "Khảo sát Khớp cổ chân, Khớp cổ tay, Khuỷu tay và khối u mô mềm chi." }
    ],
    congNgheDocQuyenGE: [
      {
        ma: "ReadyBrain",
        ten: "Ready Brain (Tự động thiết lập lát cắt sọ não)",
        moTa: "Tự động nhận diện các bình diện giải phẫu não (đường liên mép AC-PC, rãnh liên bán cầu não thất) từ ảnh định vị 3D. Tự động căn chỉnh góc nghiêng và trường nhìn FOV, chuẩn hóa 100% chất lượng lát cắt giữa các KTV khác nhau."
      },
      {
        ma: "PROPELLER",
        ten: "PROPELLER (Chống xảo ảnh cử động k-space xoay)",
        moTa: "Thu nhận dữ liệu k-space theo hình các nan quạt xoay quanh tâm (radial blades). Triệt tiêu hoàn toàn xảo ảnh chuyển động do hô hấp, rung giật đầu, nhấp nháy mắt, cử động nuốt ở bệnh nhi, người già và bệnh nhân lú lẫn/kích thích."
      },
      {
        ma: "IDEAL",
        ten: "IDEAL (Tách mỡ - nước 4 pha đẳng hướng)",
        moTa: "Sử dụng thuật toán bình phương tối thiểu (Least-squares) tái tạo đồng thời 4 bộ ảnh trong 1 lần chụp: Water-Only (xóa mỡ), Fat-Only (chỉ lấy mỡ), In-Phase (đồng pha), Out-of-Phase (đối pha). Xóa mỡ đồng nhất ngay cả vùng từ trường không đồng nhất cao như cổ, cột sống vẹo, cạnh khớp có kim loại."
      },
      {
        ma: "3DCUBE",
        ten: "3D CUBE (Chụp thể tích FSE 3D siêu nét)",
        moTa: "Thu nhận thể tích 3D đẳng thể tích (Isotropic voxel), cho phép kỹ thuật viên tái tạo đa bình diện MPR (Axial, Coronal, Sagittal, Oblique) bất kỳ theo ý muốn mà không hề suy giảm độ sắc nét. Tối ưu cho MRCP đường mật và khớp gối."
      },
      {
        ma: "3DBRAVO",
        ten: "3D BRAVO (Brain Volume Imaging)",
        moTa: "Chuỗi xung T1 FSPGR 3D phân giải cực cao (voxel < 1mm). Tái tạo giải phẫu vỏ não và cấu trúc thần kinh phục vụ định vị mổ thần kinh (Neuronavigation) và đo thể tích hải mã (Volumetry) trong động kinh."
      },
      {
        ma: "FOCUS_DWI",
        ten: "FOCUS DWI (Khuếch tán trường nhìn khu trú)",
        moTa: "Thu hẹp trường nhìn FOV theo hướng pha bằng xung RF kích thích chọn lọc 2D. Loại bỏ méo hình từ trường và tăng độ phân giải không gian cho các vùng khó: tủy sống, tiền liệt tuyến, tụy, trực tràng."
      },
      {
        ma: "LAVA_Flex",
        ten: "LAVA & LAVA-Flex (Động học ngấm thuốc gan mật 3D)",
        moTa: "Chuỗi xung 3D T1 Gradient Echo nín thở cực nhanh (12-14 giây), cho 4 bộ ảnh giải nén mỡ trong 1 lần quét. Bắt trọn vẹn thì động mạch sớm (18s), động mạch muộn (30s), tĩnh mạch cửa (65s) và thì cân bằng/muộn (3-5 phút)."
      },
      {
        ma: "InhanceMRA",
        ten: "Inhance Suite (MRA mạch máu không tiêm thuốc)",
        moTa: "Chụp mạch máu phân giải cao không cần tiêm thuốc đối quang từ Gadolinium (Inhance Inflow IR cho động mạch thận, Inhance 3D Velocity cho não, Inhance 3D DeltaFlow cho mạch chi dưới), bảo vệ tuyệt đối bệnh nhân suy thận nặng."
      },
      {
        ma: "MAVRIC_SL",
        ten: "MAVRIC SL (Giảm xảo ảnh quanh kim loại)",
        moTa: "Kỹ thuật chuyên biệt kết hợp đa dải tần số để chụp MRI cho bệnh nhân đã phẫu thuật thay khớp nhân tạo, nẹp vít cột sống kim loại, bộc lộ rõ tình trạng lỏng khớp, nhiễm trùng và mô hạt quanh kim loại."
      },
      {
        ma: "SilentScan",
        ten: "Silent Scan (Giảm tiếng ồn gradient cực đại)",
        moTa: "Áp dụng chuỗi xung 3D gradient góc lật cực nhỏ Silenz, giảm tiếng ồn phát ra từ cuộn gradient xuống dưới 3dB so với môi trường phòng khám, mang lại trải nghiệm êm ái cho người bệnh."
      }
    ]
  },

  /* =========================================================================
     2. ĐỐI CHIẾU THUẬT NGỮ & CÔNG NGHỆ SIEMENS HEALTHINEERS ACADEMY
     ========================================================================= */
  siemensAcademy: {
    portalUrl: "https://academy.siemens-healthineers.com/vi-vn",
    moTa: "Nền tảng đào tạo chuyên môn chẩn đoán hình ảnh Siemens Healthineers Academy. Hệ thống đối chiếu tương đương giữa các dòng máy.",
    mriComparisons: [
      { ungDung: "Chống xảo ảnh chuyển động", ge: "PROPELLER", siemens: "BLADE", philips: "MultiVane" },
      { ungDung: "Chụp 3D FSE thể tích đẳng hướng", ge: "3D CUBE", siemens: "SPACE (3D TSE)", philips: "3D VISTA / 3D TSE" },
      { ungDung: "Chụp 3D T1 phân giải cao sọ não", ge: "3D BRAVO", siemens: "3D MPRAGE", philips: "3D TFE" },
      { ungDung: "Tách mỡ nước đa pha đồng nhất", ge: "IDEAL", siemens: "Dixon / Quick Dixon", philips: "mDIXON" },
      { ungDung: "Động học đa pha gan mật 3D T1", ge: "LAVA / LAVA-Flex", siemens: "VIBE / CAIPIRINHA-VIBE", philips: "e-THRIVE" },
      { ungDung: "Khuếch tán trường nhìn khu trú", ge: "FOCUS DWI", siemens: "RESOLVE (readout segmented)", philips: "Zoomed DWI" },
      { ungDung: "SSFP cân bằng (T2/T1 cao, dịch sáng)", ge: "FIESTA", siemens: "TrueFISP", philips: "balanced FFE (bFFE)" },
      { ungDung: "Chuỗi xung nhạy từ trường (xuất huyết)", ge: "SWAN", siemens: "SWI (Susceptibility Weighted)", philips: "SWIp" },
      { ungDung: "Chụp mạch máu không tiêm thuốc", ge: "Inhance Inflow IR", siemens: "NATIVE", philips: "Non-contrast MRA" },
      { ungDung: "Giảm xảo ảnh quanh kim loại", ge: "MAVRIC SL", siemens: "SEMAC / VAT", philips: "O-MAR" }
    ],
    ctComparisons: [
      { congNghe: "Tự động điều biến liều tia", siemens: "Care Dose 4D", ge: "SmartmA / AutomA", philips: "DoseRight" },
      { congNghe: "Tái tạo lặp giảm liều", siemens: "SAFIRE / ADMIRE", ge: "ASiR / ASiR-V", philips: "iDose / IMR" },
      { congNghe: "Bộ lọc thiếc giảm liều phổ thấp", siemens: "Tin Filter (Sn100/140)", ge: "Gemstone Spectral", philips: "Spectral CT" }
    ]
  },

  /* =========================================================================
     3. NGUYÊN LÝ TẠO ẢNH & ĐỊNH NGHĨA KỸ THUẬT (CHUẨN WIKIRADIOLOGY KTV 3 MIỀN)
     ========================================================================= */
  principlesByModality: {
    xray: {
      dinhNghia: "X-quang quy ước (Radiography) là kỹ thuật ghi hình cấu trúc giải phẫu bên trong cơ thể bằng chùm tia X truyền qua và ghi nhận trên tấm cảm ứng kỹ thuật số (Flat Panel Detector - FPD hoặc CR).",
      nguyenLyVatLy: "Tia X là bức xạ điện từ ion hóa bước sóng ngắn (0.01 - 10 nm). Khi chùm tia xuyên qua cơ thể, mức độ hấp thụ tuân theo định luật suy giảm theo cấp số nhân dựa trên mật độ điện tử và số nguyên tử Z của mô (Hiệu ứng quang điện chiếm ưu thế ở năng lượng thấp và tán xạ Compton ở năng lượng cao). 5 đậm độ tự nhiên cơ bản từ đen đến trắng: Khí -> Mỡ -> Nước/Mô mềm -> Xương -> Kim loại.",
      ungDungChung: "Tầm soát ban đầu chấn thương xương khớp, bệnh lý lồng ngực (viêm phổi, tràn dịch, tràn khí, u phổi), tim to, thủng tạng rỗng (liềm hơi dưới hoành), tắc ruột cơ học (mức nước - hơi) và sỏi hệ tiết niệu cản quang.",
      tieuChuanChatLuong: "1. Độ xuyên sâu (kVp) phù hợp thấy rõ vân phổi và đốt sống sau bóng tim; 2. Độ tương phản và độ đen (mAs) chuẩn; 3. Không xảo ảnh cử động thở; 4. Lấy trọn vẹn vùng giải phẫu chỉ định; 5. Có dấu định vị Phải/Trái (R/L).",
      xaoAnhThuongGap: [
        { ten: "Xảo ảnh cử động (Motion artifact)", nguyenNhan: "Bệnh nhân thở hoặc cử động khi phát tia.", khacPhuc: "Hướng dẫn nín thở rõ ràng, tăng mA để rút ngắn thời gian phát tia (ms)." },
        { ten: "Hiệu ứng gót cực dương (Heel Effect)", nguyenNhan: "Cường độ tia X ở phía cực âm (Cathode) mạnh hơn phía cực dương (Anode).", khacPhuc: "Đặt phần cơ thể dày hơn (bụng, đùi) về phía Cathode của bóng phát tia." },
        { ten: "Xảo ảnh lưới lọc (Grid Cut-off)", nguyenNhan: "Tia trung tâm không vuông góc hoặc lệch tâm với lưới Bucky.", khacPhuc: "Căn chỉnh bóng tia X thẳng góc tuyệt đối với tâm cassette và lưới lọc." }
      ]
    },

    ct: {
      dinhNghia: "Cắt lớp vi tính (Computed Tomography - CT Scanner) là phương pháp chẩn đoán hình ảnh cắt ngang (Cross-sectional) sử dụng hệ thống bóng phát tia X và dãy đầu thu quay liên tục quanh bệnh nhân để tạo ra các lát cắt giải phẫu 2D và mô hình không gian 3D độ phân giải cao.",
      nguyenLyVatLy: "Thuật toán máy tính tính toán hệ số suy giảm tuyến tính của từng phần tử thể tích (Voxel) và quy đổi sang đơn vị tỷ trọng Hounsfield (HU): Nước nguyên chất = 0 HU; Không khí = -1000 HU; Xương đặc = +1000 HU; Mô mềm = 30 đến 60 HU; Máu tụ cấp = 60 đến 85 HU; Mỡ = -120 đến -60 HU. Kỹ thuật tái tạo lặp (Iterative Reconstruction) giúp giảm 40-70% liều bức xạ mà vẫn duy trì độ sắc nét.",
      ungDungChung: "Tiêu chuẩn vàng cấp cứu chấn thương sọ não, nhồi máu não/xuất huyết não tối cấp, đa chấn thương toàn thân (Pan-scan), bệnh lý lồng ngực (CTA thuyên tắc phổi PE, bóc tách động mạch chủ), bụng cấp (viêm ruột thừa, thủng tạng, viêm tụy, thiếu máu mạc treo), giai đoạn ung thư (TNM staging).",
      tieuChuanChatLuong: "1. Lát cắt tái tạo mỏng (0.625 - 1.25 mm) cho tái tạo đa bình diện MPR sắc nét; 2. Bắt đúng thì thuốc cản quang (Bolus tracking chính xác động mạch/tĩnh mạch); 3. Cài đặt cửa sổ (Window Width/Level) đúng mô khảo sát; 4. Kiểm soát chỉ số liều CTDIvol và DLP đạt chuẩn an toàn bức xạ.",
      xaoAnhThuongGap: [
        { ten: "Nhiễu sọc kim loại (Metal Streak Artifact)", nguyenNhan: "Vật liệu kim loại (răng giả, nẹp vít) gây hấp thụ triệt để chùm tia (Beam Hardening & Photon Starvation).", khacPhuc: "Sử dụng thuật toán triệt kim loại chuyên biệt (MARS/SEMAR/O-MAR), tăng nhẹ kVp, điều chỉnh góc gantry." },
        { ten: "Xảo ảnh thể tích một phần (Partial Volume Effect)", nguyenNhan: "Lát cắt quá dày chứa nhiều loại mô có tỷ trọng khác nhau trong cùng một voxel.", khacPhuc: "Giảm độ dày lát cắt (Slice thickness) xuống <= 1.0 mm và tái tạo lại." },
        { ten: "Xảo ảnh bậc thang (Step Artifact)", nguyenNhan: "Bệnh nhân cử động thở giữa các lần quét hoặc tái tạo lát cắt không chồng lấp.", khacPhuc: "Tăng tốc độ bàn, giảm thời gian quay bóng (Rotation time), dùng chế độ nín thở tự động." }
      ]
    },

    mri: {
      dinhNghia: "Cộng hưởng từ (Magnetic Resonance Imaging - MRI) là phương pháp chẩn đoán hình ảnh không xâm lấn, không dùng bức xạ ion hóa, dựa trên sự tương tác giữa hạt nhân Hydro (proton 1H) trong cơ thể với từ trường tĩnh B0 cường độ cao (1.5 Tesla) và các xung sóng cao tần RF.",
      nguyenLyVatLy: "Tại từ trường 1.5 Tesla, tần số tiến động Larmor của proton Hydro là 63.87 MHz. Xung RF cộng hưởng lật véc tơ từ hóa ròng sang mặt phẳng ngang. Quá trình hồi phục dọc T1 (Spin-Lattice) và hồi phục ngang T2 (Spin-Spin) phản ánh đặc tính sinh hóa vi mô của từng mô. Ba cặp cuộn chênh từ Gradient (Gx, Gy, Gz) mã hóa không gian lát cắt và nạp vào không gian K (k-space), sau đó dùng phép biến đổi Fourier 2D-iFT để tái tạo ảnh.",
      ungDungChung: "Tiêu chuẩn vàng số 1 chẩn đoán bệnh lý thần kinh sọ não (đột quỵ nhồi máu não tối cấp với DWI, u não, dị dạng mạch máu, động kinh, viêm não màng não), tủy sống và cột sống (thoát vị đĩa đệm, u tủy, lao cột sống), cơ xương khớp (dây chằng chéo, sụn chêm, rách chóp xoay vai, hoại tử vô khuẩn chỏm xương đùi), gan mật (MRCP 3D dựng hình đường mật không tiêm thuốc), tiền liệt tuyến (PI-RADS) và trực tràng.",
      tieuChuanChatLuong: "1. Tỷ số tín hiệu trên nhiễu (SNR) cao; 2. Độ phân giải không gian rõ nét các cấu trúc milimet; 3. Kiểm soát công suất hấp thụ riêng SAR <= 2.0 W/kg; 4. Khử mỡ đồng nhất (FatSat/IDEAL); 5. Tuân thủ tuyệt đối an toàn 4 vùng (Zone I đến Zone IV).",
      xaoAnhThuongGap: [
        { ten: "Xảo ảnh cuộn / Gấp góc (Aliasing / Wrap-around)", nguyenNhan: "Bộ phận cơ thể nằm ngoài trường nhìn FOV nhưng vẫn nằm trong độ nhạy cuộn thu.", khacPhuc: "Bật chế độ No-Phase-Wrap (Phase Oversampling) hoặc tăng FOV theo chiều mã hóa pha." },
        { ten: "Xảo ảnh chuyển dịch hóa học (Chemical Shift)", nguyenNhan: "Tần số cộng hưởng của proton trong mỡ chậm hơn trong nước khoảng 3.5 ppm (khoảng 224 Hz tại 1.5T), gây viền sáng/tối tại ranh giới mỡ-nước.", khacPhuc: "Tăng độ rộng dải thu (Receiver Bandwidth) hoặc áp dụng kỹ thuật xóa mỡ (FatSat/IDEAL)." },
        { ten: "Xảo ảnh đập dòng chảy dịch não tủy & mạch máu (Pulsation Artifact)", nguyenNhan: "Chuyển động có chu kỳ của nhịp đập mạch máu và dịch não tủy gây các bóng mờ dọc theo hướng mã hóa pha.", khacPhuc: "Đổi hướng mã hóa pha (Swap Phase/Freq), đặt dải bão hòa (Saturation Band) ở thượng nguồn dòng chảy, dùng kỹ thuật bù dòng chảy (Flow Compensation)." }
      ]
    }
  },

  /* =========================================================================
     4. DANH MỤC BÀI GIẢNG CHUYÊN ĐỀ PPTX KTV 3 MIỀN (EXAM & WORKFLOWS)
     ========================================================================= */
  ktv3MienLectures: [
    {
      chuDe: "Kỹ thuật X-quang Cột sống & Khớp chi",
      giangVien: "Hội Kỹ thuật viên Hình ảnh Y học Việt Nam - KTV 3 Miền",
      link: "https://exam.ktv3mien.com/pptx/index.html",
      noiDungChinh: "Chuẩn hóa góc nghiêng bóng tia X, tiêu chuẩn đánh giá phim đạt chuẩn, mốc giải phẫu các tư thế đặc biệt (C1-C2 há miệng, Schuller, Stenvers, Blondeau, Hirtz)."
    },
    {
      chuDe: "Kỹ thuật Cắt lớp vi tính (CT) Sọ não & Đa chấn thương",
      giangVien: "KTV 3 Miền — Module Đào tạo Lâm sàng",
      link: "https://exam.ktv3mien.com/pptx/index.html",
      noiDungChinh: "Quy trình Pan-scan chấn thương toàn thân, tối ưu hóa thì thuốc cản quang Bolus Tracking, phân biệt nhồi máu não và xuất huyết não cấp, đánh giá thang điểm ASPECTS."
    },
    {
      chuDe: "Kỹ thuật Cộng hưởng từ (MRI) Cơ Xương Khớp & Hướng đặt cắt",
      giangVien: "KTV 3 Miền — Chuyên đề MRI Master",
      link: "https://exam.ktv3mien.com/pptx/index.html",
      noiDungChinh: "Kỹ thuật đặt lát cắt Sagittal Oblique theo trục dây chằng chéo trước ACL, Coronal Oblique theo gân trên gai khớp vai, nhận diện rách sụn chêm và sụn viền."
    },
    {
      chuDe: "An toàn thuốc cản quang & Xử trí sốc phản vệ theo Thông tư 51/2017/TT-BYT",
      giangVien: "Khoa CĐHA & Hồi sức Cấp cứu",
      link: "https://wikirad.ktv3mien.com/",
      noiDungChinh: "Phác đồ 4 mức độ phản vệ, kỹ thuật tiêm bắp Adrenalin ngay lập tức tại phòng chụp, theo dõi chức năng thận dự phòng PC-AKI/CIN."
    }
  ]
};
window.SOTAY_CLINICAL_KNOWLEDGE.geSignaCreatorVPI = window.SOTAY_CLINICAL_KNOWLEDGE.geSignaExplorerVPI;
