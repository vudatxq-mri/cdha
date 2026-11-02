/* ============================================================================
   MRI MASTER PROTOCOLS & 3-VENDOR TECHNICAL COMPARISON
   KHOA CHẨN ĐOÁN HÌNH ẢNH — BỆNH VIỆN VĨNH PHÚC VPI
   Nguồn tham chiếu: MRI Master (mrimaster.com/planning/), Siemens, Philips & GE
   Tích hợp sơ đồ giải phẫu định hướng cắt các mặt phẳng: Axial, Sagittal, Coronal
   ============================================================================ */

window.SOTAY_MRIMASTER = {
  /* =========================================================================
     1. TỪ ĐIỂN ĐỐI CHIẾU THUẬT NGỮ & CHUỖI XUNG 3 HÃNG (SIEMENS - PHILIPS - GE)
     ========================================================================= */
  bangDoiChieuHang: [
    {
      loai: "Spin Echo thường quy",
      siemens: "SE (Spin Echo)",
      philips: "SE (Spin Echo)",
      ge: "SE (Spin Echo)",
      moTa: "Chuỗi xung kinh điển, độ tương phản mô mềm cao, tỷ lệ tín hiệu/nhiễu (SNR) tốt nhưng thời gian quét dài."
    },
    {
      loai: "Fast Spin Echo (Turbo SE)",
      siemens: "TSE (Turbo Spin Echo)",
      philips: "TSE (Turbo Spin Echo)",
      ge: "FSE (Fast Spin Echo)",
      moTa: "Sử dụng chuỗi nhiều xung 180° tái hội tụ trong 1 chu kỳ TR (Echo Train Length - ETL) giúp rút ngắn 80% thời gian chụp."
    },
    {
      loai: "Single Shot Fast Spin Echo",
      siemens: "HASTE",
      philips: "SSH-TSE / Single-Shot",
      ge: "SSFSE",
      moTa: "Thu toàn bộ không gian K chỉ trong 1 chu kỳ TR, thời gian quét < 1 giây/lát. Cực kỳ hữu ích chụp thai nhi, bụng, MRCP chống cử động thở."
    },
    {
      loai: "Xóa dịch não tủy (Inversion Recovery)",
      siemens: "FLAIR / Dark Fluid",
      philips: "FLAIR",
      ge: "FLAIR",
      moTa: "Đảo ngược hồi phục với thời gian TI ~ 2000-2500ms để triệt tiêu tín hiệu nước tự do, bộc lộ tổn thương viêm, phù não, xơ cứng rải rác."
    },
    {
      loai: "Xóa mỡ ngắn hạn (Short Tau IR)",
      siemens: "STIR",
      philips: "STIR",
      ge: "STIR",
      moTa: "Sử dụng TI ~ 130-170ms triệt tín hiệu mỡ không phụ thuộc vào độ đồng nhất của từ trường B0, rất tốt cho vùng cổ, cột sống và xương khớp."
    },
    {
      loai: "Gradient Echo 2D / 3D T1W",
      siemens: "FLASH / FISP",
      philips: "FFE (Fast Field Echo) / TFE",
      ge: "SPGR / FSPGR (Fast SPGR)",
      moTa: "Dùng góc lật nhỏ (flip angle < 90°) và đảo chiều gradient để tạo echo. Tốc độ nhanh, nhạy với xuất huyết (chất thuận từ)."
    },
    {
      loai: "Cân bằng trạng thái ổn định (SSFP)",
      siemens: "TrueFISP",
      philips: "balanced FFE (bFFE)",
      ge: "FIESTA",
      moTa: "Hình ảnh có tỷ số T2/T1 cao, dịch và máu có tín hiệu rất sáng, thành mạch và mô tối. Tối ưu cho tim mạch, ống tai trong, màng não."
    },
    {
      loai: "Xung chống xảo ảnh cử động",
      siemens: "BLADE",
      philips: "MultiVane",
      ge: "PROPELLER",
      moTa: "Lấy mẫu không gian K theo hình nan hoa quay vòng quanh tâm. Triệt tiêu xảo ảnh chuyển động do thở, nhấp nháy mắt, run giật ở trẻ em và người già."
    },
    {
      loai: "Khuếch tán phân tử nước (DWI)",
      siemens: "DWI (ep2d_diff)",
      philips: "DWI (DWI-EPI)",
      ge: "DWI (EPI)",
      moTa: "Đo chuyển động Brown của phân tử nước (b-value: 0, 500, 1000 s/mm2). Chẩn đoán nhồi máu não tối cấp trong vòng vài phút đầu và phát hiện u mật độ tế bào cao."
    },
    {
      loai: "3D T1 Động học ngấm thuốc có xóa mỡ",
      siemens: "VIBE",
      philips: "THRIVE",
      ge: "LAVA (Liver) / DISCO / VIBRANT (Breast)",
      moTa: "Thu nhận thể tích 3D siêu mỏng trong 1 lần nín thở (12-18 giây) kết hợp xóa mỡ đồng nhất. Chụp động học đa pha gan mật, tụy, vú."
    },
    {
      loai: "3D T2 Độ phân giải siêu cao (MRCP 3D)",
      siemens: "SPACE (3D TSE)",
      philips: "3D TSE",
      ge: "CUBE (3D FSE)",
      moTa: "Tái tạo cây đường mật - túi mật và ống tụy 3 chiều không cần tiêm cản quang, xoay mọi góc nhìn."
    },
    {
      loai: "Nhạy từ trường (Xuất huyết vi thể)",
      siemens: "SWI (Susceptibility Weighted)",
      philips: "SWIp",
      ge: "SWAN",
      moTa: "Nhạy cảm cực cao với lắng đọng sắt, hemosiderin, canxi, tĩnh mạch nhỏ và vi xuất huyết não sau chấn thương hoặc bệnh lý mạch máu thoái hóa dạng bột (CAA)."
    },
    {
      loai: "Kỹ thuật Xóa mỡ tiên tiến",
      siemens: "FatSat / Dixon / SPAIR",
      philips: "FatSat / mDIXON / SPAIR",
      ge: "FatSat / IDEAL / ASPIR",
      moTa: "Dixon/mDIXON/IDEAL cung cấp đồng thời 4 bộ ảnh trong 1 lần chụp: In-Phase, Out-of-Phase, Water-Only (xóa mỡ), Fat-Only (chỉ lấy mỡ)."
    },
    {
      loai: "Gia tốc thu nhận ảnh song song",
      siemens: "GRAPPA / CAIPIRINHA",
      philips: "SENSE",
      ge: "ASSET / ARC",
      moTa: "Sử dụng độ nhạy đa kênh của cuộn thu (coil) để giảm thời gian chụp mà vẫn bảo toàn độ phân giải không gian."
    }
  ],

  /* =========================================================================
     2. HƯỚNG DẪN HƯỚNG ĐẶT CẮT (SLICE PLANNING) CHUẨN MRI MASTER & HÌNH GIẢI PHẪU
     ========================================================================= */
  quyTrinhLapKeHoach: [
    {
      id: "mri-plan-so-nao",
      ten: "MRI Sọ Não (Brain Planning & Positioning)",
      vung: "Sọ não",
      nguon: "mrimaster.com/plan%20brain.html",
      viTriCuonThu: "Head Matrix Coil / Cuộn đầu 16 – 64 kênh chuyên dụng",
      hinhMinhHoa: "https://mrimaster.com/images/brain%20planning%20axial.jpg",
      huongDatCat: [
        {
          matPhang: "Axial (Ngang trục)",
          nguyenTac: "Đường chuẩn AC-PC: Đặt các lát cắt song song với đường thẳng nối mép trước và mép sau (Anterior Commissure - Posterior Commissure) hoặc đường viền dưới của gối và lồi thể chai (Genu & Splenium of Corpus Callosum) trên hình Sagittal định vị.",
          phamVi: "Trường quét bao phủ toàn diện từ lỗ chẩm (Foramen Magnum) đến hết đỉnh vòm sọ (Vertex).",
          chongXaoAnh: "Trên hình Coronal: Căn chỉnh khối cắt vuông góc với rãnh liên bán cầu não (Interhemispheric Fissure). Đặt Saturation Band ở nền cổ phía dưới để xóa nhiễu dòng đập mạch cảnh.",
          soDoGiaiPhau: "AC-PC Line ➔ Song song thể chai ➔ Vuông góc rãnh liên bán cầu"
        },
        {
          matPhang: "Sagittal (Đứng dọc giữa)",
          nguyenTac: "Trên hình Axial: Đặt mặt phẳng cắt song song tuyệt đối với rãnh liên bán cầu não (Interhemispheric Fissure).",
          phamVi: "Bao phủ từ mặt ngoài thùy thái dương bên phải sang thùy thái dương bên trái.",
          chongXaoAnh: "Trên hình Coronal: Đường cắt song song với liềm đại não và đường giữa thân não.",
          soDoGiaiPhau: "Dọc giữa ➔ Cân xứng hai bán cầu ➔ Thấy rõ thể chai, tuyến yên, thân não, tiểu não"
        },
        {
          matPhang: "Coronal (Đứng ngang)",
          nguyenTac: "Trên hình Sagittal: Đặt các lát cắt vuông góc với đường AC-PC (song song với trục thân não / sàn não thất IV).",
          phamVi: "Bao phủ từ bờ trước xoang trán đến hết bờ sau xương chẩm.",
          chongXaoAnh: "Trên hình Axial: Khối cắt vuông góc với rãnh liên bán cầu não.",
          soDoGiaiPhau: "Vuông góc AC-PC ➔ Song song thân não ➔ Bộc lộ hồi hải mã (Hippocampus)"
        }
      ],
      thongSoVanHanh3Hang: {
        chuoiXung: "T2W TSE/FSE Axial, T1W SE/FSE Axial, FLAIR Axial, DWI (b0, b1000), T2* GRE / SWI Axial",
        bangThongSo: [
          { thongSo: "TR (ms)", siemens: "4000 - 5500", philips: "4000 - 5000", ge: "4000 - 5500" },
          { thongSo: "TE (ms)", siemens: "90 - 110 (T2W)", philips: "90 - 100", ge: "95 - 115" },
          { thongSo: "TI (ms) trên FLAIR", siemens: "2200 - 2500", philips: "2400 - 2600", ge: "2250 - 2500" },
          { thongSo: "Độ dày lát cắt (mm)", siemens: "4.0 - 5.0", philips: "4.0 - 5.0", ge: "4.0 - 5.0" },
          { thongSo: "Khoảng cách lát (Gap)", siemens: "0.5 - 1.0 mm (10-20%)", philips: "0.5 - 1.0 mm", ge: "0.5 - 1.0 mm" },
          { thongSo: "Trường nhìn (FOV)", siemens: "220 - 230 mm", philips: "220 - 230 mm", ge: "220 - 240 mm" },
          { thongSo: "Ma trận (Matrix)", siemens: "320 x 256", philips: "320 x 256", ge: "320 x 256" },
          { thongSo: "Hệ số gia tốc (iPAT/SENSE)", siemens: "GRAPPA = 2", philips: "SENSE = 2", ge: "ASSET = 2" }
        ]
      }
    },
    {
      id: "mri-plan-cot-song-that-lung",
      ten: "MRI Cột Sống Thắt Lưng (Lumbar Spine Planning)",
      vung: "Cột sống",
      nguon: "mrimaster.com/plan%20lumbar%20spine.html",
      viTriCuonThu: "Spine Matrix Coil tích hợp sẵn dưới mặt bàn",
      hinhMinhHoa: "https://mrimaster.com/images/lumbar%20spine%20planning%20axial.jpg",
      huongDatCat: [
        {
          matPhang: "Sagittal (Đứng dọc giữa)",
          nguyenTac: "Trên hình Axial: Đặt các lát cắt song song với đường trục giữa thân đốt sống và gai sau. Trên hình Coronal: Uốn lượn song song với trục cột sống.",
          phamVi: "Từ mấu khớp bên phải sang mấu khớp bên trái (bao trọn lỗ tiếp hợp). Chiều dọc từ D11 đến hết toàn bộ xương cùng S2.",
          chongXaoAnh: "Đặt Saturation Band phía trước thân đốt sống để xóa xảo ảnh cử động thở của thành bụng và nhịp đập ĐM chủ bụng.",
          soDoGiaiPhau: "Trục giữa thân đốt ➔ Đánh giá tủy sống, nón tủy (ngang L1-L2), chùm đuôi ngựa"
        },
        {
          matPhang: "Axial (Ngang từng tầng đĩa đệm)",
          nguyenTac: "Trên hình Sagittal: Đặt từng block 3 - 5 lát cắt chếch song song hoàn toàn với từng khe đĩa đệm (L1-L2, L2-L3, L3-L4, L4-L5, L5-S1). Đĩa đệm L5-S1 thường nghiêng 25-35°.",
          phamVi: "Bao phủ từ mấu khớp trên đến mấu khớp dưới, quan sát rõ rễ thần kinh đi trong ngách bên và lỗ tiếp hợp.",
          chongXaoAnh: "Trên hình Coronal: Đặt vuông góc với thân đốt sống.",
          soDoGiaiPhau: "Song song khe đĩa đệm ➔ Đánh giá lồi đĩa đệm, thoát vị rách bao xơ, chèn ép bao màng cứng"
        }
      ],
      thongSoVanHanh3Hang: {
        chuoiXung: "T1W Sagittal, T2W Sagittal, STIR/T2 FatSat Sagittal, T2W TSE Axial (từng tầng đĩa đệm)",
        bangThongSo: [
          { thongSo: "TR (ms)", siemens: "3000 - 4000 (T2W)", philips: "3200 - 4000", ge: "3000 - 4500" },
          { thongSo: "TE (ms)", siemens: "95 - 110", philips: "100 - 120", ge: "100 - 115" },
          { thongSo: "Độ dày lát cắt (Sag)", siemens: "3.5 - 4.0 mm", philips: "3.5 - 4.0 mm", ge: "3.5 - 4.0 mm" },
          { thongSo: "Độ dày lát cắt (Ax)", siemens: "3.5 - 4.0 mm", philips: "3.5 - 4.0 mm", ge: "3.5 - 4.0 mm" },
          { thongSo: "Trường nhìn (FOV Sag)", siemens: "280 - 320 mm", philips: "280 - 320 mm", ge: "300 - 320 mm" },
          { thongSo: "Trường nhìn (FOV Ax)", siemens: "180 - 200 mm", philips: "180 - 200 mm", ge: "180 - 200 mm" },
          { thongSo: "Tên chuỗi xung chống cử động", siemens: "BLADE T2 Sag", philips: "MultiVane T2 Sag", ge: "PROPELLER T2 Sag" }
        ]
      }
    },
    {
      id: "mri-plan-khop-goi",
      ten: "MRI Khớp Gối (Knee Joint Planning)",
      vung: "Chi dưới",
      nguon: "mrimaster.com/plan%20knee.html",
      viTriCuonThu: "Dedicated Knee Coil / Cuộn gối chuyên dụng 8 - 16 kênh",
      hinhMinhHoa: "https://mrimaster.com/images/knee%20planning%20sagittal.jpg",
      huongDatCat: [
        {
          matPhang: "Sagittal Oblique (Bám theo dây chằng chéo trước ACL)",
          nguyenTac: "QUAN TRỌNG NHẤT KHỚP GỐI: Trên hình Axial định vị, đặt lát cắt Sagittal chếch một góc nghiêng song song với bờ trong lồi cầu ngoài xương đùi (Medial border of lateral femoral condyle) hoặc song song với hướng đi của dây chằng chéo trước (ACL).",
          phamVi: "Bao trọn từ chỏm mác và dải chậu chày phía ngoài sang dây chằng bên trong (MCL) ở phía trong.",
          chongXaoAnh: "Trên hình Coronal: Lát cắt vuông góc với đường liên lồi cầu xương đùi.",
          soDoGiaiPhau: "Song song lồi cầu ngoài ➔ Bộc lộ liên tục toàn bộ chiều dài sợi ACL và PCL"
        },
        {
          matPhang: "Coronal (Đứng ngang theo lồi cầu sau)",
          nguyenTac: "Trên hình Axial: Đặt các lát cắt song song với đường nối hai bờ sau lồi cầu xương đùi (Posterior Condylar Line).",
          phamVi: "Bao phủ từ diện khớp bánh chè - đùi phía trước đến hết khoeo chân phía sau.",
          chongXaoAnh: "Trên hình Sagittal: Đặt song song với trục thân xương chày.",
          soDoGiaiPhau: "Song song bờ sau lồi cầu ➔ Đánh giá sụn chêm trong, sụn chêm ngoài, dây chằng bên MCL/LCL"
        },
        {
          matPhang: "Axial (Ngang trục bánh chè - đùi)",
          nguyenTac: "Trên hình Sagittal: Đặt vuông góc với diện khớp bánh chè - đùi hoặc vuông góc với trục thân xương chày.",
          phamVi: "Bao phủ từ cực trên xương bánh chè xuống đến hết lồi củ trước xương chày.",
          chongXaoAnh: "Trên hình Coronal: Đường cắt song song với khe khớp gối.",
          soDoGiaiPhau: "Vuông góc bánh chè ➔ Đánh giá sụn khớp bánh chè, mạc giữ bánh chè trong/ngoài, gân bánh chè"
        }
      ],
      thongSoVanHanh3Hang: {
        chuoiXung: "PD FatSat (Proton Density Xóa mỡ) Sagittal, Coronal, Axial; T1W Coronal; T2W Sagittal",
        bangThongSo: [
          { thongSo: "TR (ms)", siemens: "2500 - 3200 (PD)", philips: "2500 - 3000", ge: "2400 - 3200" },
          { thongSo: "TE (ms)", siemens: "30 - 38 (PD FatSat)", philips: "30 - 35", ge: "28 - 36" },
          { thongSo: "Độ dày lát cắt", siemens: "2.5 - 3.0 mm (No gap)", philips: "2.5 - 3.0 mm", ge: "2.5 - 3.0 mm" },
          { thongSo: "Trường nhìn (FOV)", siemens: "140 - 160 mm", philips: "140 - 160 mm", ge: "140 - 160 mm" },
          { thongSo: "Ma trận (Matrix)", siemens: "320 x 256", philips: "320 x 256", ge: "320 x 256" },
          { thongSo: "Chuỗi xung 3D độ phân giải siêu cao", siemens: "3D SPACE PD FS", philips: "3D TSE View", ge: "3D CUBE PD FS" }
        ]
      }
    },
    {
      id: "mri-plan-khop-vai",
      ten: "MRI Khớp Vai (Shoulder Joint Planning)",
      vung: "Chi trên",
      nguon: "mrimaster.com/plan%20shoulder.html",
      viTriCuonThu: "Dedicated Shoulder Coil / Cuộn vai chuyên dụng",
      hinhMinhHoa: "https://mrimaster.com/images/shoulder%20planning%20coronal%20oblique.jpg",
      huongDatCat: [
        {
          matPhang: "Coronal Oblique (Đứng ngang chếch - Bám gân trên gai)",
          nguyenTac: "MẶT CẮT QUAN TRỌNG NHẤT KHỚP VAI: Trên hình Axial định vị, đặt lát cắt song song hoàn toàn với thân và gân cơ trên gai (Supraspinatus muscle & tendon).",
          phamVi: "Bao phủ từ mỏm quạ phía trước đến hết cơ dưới gai (Infraspinatus) phía sau.",
          chongXaoAnh: "Trên hình Sagittal: Đặt song song với trục thân xương cánh tay.",
          soDoGiaiPhau: "Song song gân trên gai ➔ Phát hiện rách bán phần, toàn phần chóp xoay, co rút gân"
        },
        {
          matPhang: "Sagittal Oblique (Đứng dọc chếch - Song song ổ chảo)",
          nguyenTac: "Trên hình Axial: Đặt các lát cắt vuông góc với gân cơ trên gai HOẶC song song với diện bờ ổ chảo (Glenoid fossa).",
          phamVi: "Bao phủ từ mỏm cùng vai và mấu động lớn phía ngoài vào đến hết bờ trong ổ chảo.",
          chongXaoAnh: "Đánh giá hình thái vòm cùng vai (Phân loại Bigliani Type I, II, III) và teo mỡ các cơ chóp xoay (Goutallier).",
          soDoGiaiPhau: "Song song ổ chảo ➔ Đánh giá vòm cùng vai đòn, cơ trên gai, dưới gai, dưới vai"
        },
        {
          matPhang: "Axial (Ngang trục khớp vai)",
          nguyenTac: "Trên hình Coronal Oblique: Đặt các lát cắt vuông góc với diện ổ chảo xương bả vai.",
          phamVi: "Bao phủ từ khớp cùng vai đòn (AC joint) phía trên xuống đến hết bờ dưới ổ chảo và nếp nách phía dưới.",
          chongXaoAnh: "Đánh giá sụn viền trước/sau (Labrum), rãnh nhị đầu và gân cơ dưới vai (Subscapularis).",
          soDoGiaiPhau: "Vuông góc ổ chảo ➔ Phát hiện tổn thương Bankart, Hill-Sachs, trật khớp vai tái hồi"
        }
      ],
      thongSoVanHanh3Hang: {
        chuoiXung: "T2 FatSat Coronal Oblique, T1 Coronal Oblique, T2 FatSat Sagittal Oblique, T2 FatSat Axial",
        bangThongSo: [
          { thongSo: "TR (ms)", siemens: "2800 - 3500", philips: "2600 - 3200", ge: "2800 - 3500" },
          { thongSo: "TE (ms)", siemens: "35 - 45 (PD/T2 FS)", philips: "30 - 40", ge: "35 - 45" },
          { thongSo: "Độ dày lát cắt", siemens: "3.0 mm (No gap)", philips: "3.0 mm (0.3 gap)", ge: "3.0 mm" },
          { thongSo: "Trường nhìn (FOV)", siemens: "140 - 160 mm", philips: "140 - 150 mm", ge: "140 - 160 mm" },
          { thongSo: "Ma trận", siemens: "320 x 224", philips: "320 x 224", ge: "320 x 224" }
        ]
      }
    },
    {
      id: "mri-plan-gan-mrcp",
      ten: "MRI Gan Mật & MRCP Tái Tạo Đường Mật (Liver & MRCP Planning)",
      vung: "Ổ bụng",
      nguon: "mrimaster.com/plan%20liver.html",
      viTriCuonThu: "Body / Torso Matrix Coil 16 – 32 kênh kết hợp Spine Coil",
      hinhMinhHoa: "https://mrimaster.com/images/liver%20planning%20axial.jpg",
      huongDatCat: [
        {
          matPhang: "Axial (Ngang trục toàn bộ gan và tụy)",
          nguyenTac: "Trên hình Sagittal/Coronal định vị: Đặt các lát cắt ngang trục bao phủ từ vòm hoành (đỉnh gan) đến hết cực dưới thận phải và tá tràng.",
          phamVi: "Toàn bộ nhu mô gan, đường mật, tụy, lách và hai thận.",
          chongXaoAnh: "Sử dụng đai thở (Respiratory Sensor) hoặc cảm biến Navigator đặt tại cơ hoành để đồng thì với nhịp thở; Đặt Saturation Band phía trước thành bụng để xóa xảo ảnh thành bụng nhấp nhô.",
          soDoGiaiPhau: "Bao phủ toàn bộ gan ➔ Thì động mạch sớm (18s), muộn (30s), tĩnh mạch cửa (65s), muộn (3-5m)"
        },
        {
          matPhang: "MRCP 3D Thick Slab (Lát dày đơn chụp nhanh)",
          nguyenTac: "Chụp 1 lát cắt siêu dày (40 - 60 mm) trong 1-2 giây: Trên hình Axial, xoay góc lát cắt bám dọc theo đường đi của ống mật chủ (CBD) và ống tụy chính (Wirsung).",
          phamVi: "Chụp 6 - 8 góc xoay khác nhau (-30°, -20°, -10°, 0°, +10°, +20°, +30°) quanh trục ống mật chủ.",
          chongXaoAnh: "Triệt tiêu hoàn toàn mô mềm, chỉ có dịch mật và dịch tụy đứng yên là phát tín hiệu cực sáng (Heavy T2W HASTE/SingleShot/SSFSE với TE > 600 - 800ms).",
          soDoGiaiPhau: "Trục ống mật chủ ➔ Xoay nan hoa ➔ Bộc lộ sỏi túi mật, sỏi OMC, giãn ống Wirsung"
        },
        {
          matPhang: "MRCP 3D Thin Slice (Khối 3D lát mỏng tái tạo thể tích)",
          nguyenTac: "Đặt khối 3D Coronal Oblique bao phủ toàn bộ đường mật trong gan, ngã ba đường mật, túi mật, ống mật chủ và bóng Vater.",
          phamVi: "Tái tạo xoay 360 độ MIP để phát hiện sỏi mật dù chỉ 1-2mm và hẹp đường mật.",
          chongXaoAnh: "Áp dụng kỹ thuật thở tự do có định vị Navigator đồng thì cơ hoành.",
          soDoGiaiPhau: "Khối 3D Coronal ➔ Tái tạo MIP xoay 360° ➔ Tiêu chuẩn vàng đánh giá u Klatskin, rò mật"
        }
      ],
      thongSoVanHanh3Hang: {
        chuoiXung: "In-phase & Out-of-phase T1W, T2W HASTE/SSH, Diffusion DWI (b50, b400, b800), MRCP Thick/Thin Slab, 3D Dynamic T1 FatSat (VIBE/THRIVE/LAVA)",
        bangThongSo: [
          { thongSo: "T1 In-Phase / Out-of-Phase", siemens: "Dual Echo Dixon (TE 2.38 / 4.76 ms tại 1.5T)", philips: "mDIXON (TE 2.3 / 4.6 ms)", ge: "IDEAL (TE 2.1 / 4.4 ms)" },
          { thongSo: "MRCP Thick Slab TE", siemens: "HASTE TE = 650 - 800 ms", philips: "SSH-TSE TE = 700 - 850 ms", ge: "SSFSE TE = 600 - 800 ms" },
          { thongSo: "Động học ngấm thuốc 3D T1", siemens: "VIBE 3D (14-16s nín thở)", philips: "THRIVE (14-16s nín thở)", ge: "LAVA / DISCO (14s nín thở)" },
          { thongSo: "Thuốc đặc hiệu gan mật", siemens: "Primovist (chụp thì gan mật 20 phút)", philips: "Primovist / Eovist", ge: "Primovist / Eovist" }
        ]
      }
    }
  ]
};
