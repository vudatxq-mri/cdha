/* ============================================================================
   ĐIỀU KHIỂN CHÍNH — SỔ TAY ĐIỆN TỬ CĐHA
   BỆNH VIỆN VĨNH PHÚC VPI — KHOA CHẨN ĐOÁN HÌNH ẢNH
   Phiên bản chuẩn hóa cấu trúc 4 phần & phân loại theo Nhóm Vùng Cơ Thể Hàng Ngang
   ============================================================================ */

(function () {
  "use strict";

  // Danh mục 8 phân hệ chính và cấu hình màu
  var MODALITIES = [
    {
      id: "xq",
      name: "Quy trình X-quang",
      en: "X-Ray Protocols & Positioning",
      icon: "🦴",
      colorClass: "theme-xq",
      colorHex: "#0284c7",
      desc: "Hình ảnh tư thế chụp, hướng tia, thông số kVp - mAs và tiêu chuẩn phim đạt chuẩn."
    },
    {
      id: "ct",
      name: "Quy trình CT-Scanner",
      en: "CT Protocols & Checklists",
      icon: "⭕",
      colorClass: "theme-ct",
      colorHex: "#2563eb",
      desc: "Đầy đủ kỹ thuật chụp lồng ngực, sọ não, bụng đa pha, tích hợp bảng kiểm 7 bước ở cuối mỗi bài."
    },
    {
      id: "mri",
      name: "Quy trình MRI Master",
      en: "MRI Planning & 3-Vendor Guide",
      icon: "🧲",
      colorClass: "theme-mri",
      colorHex: "#4f46e5",
      desc: "Hướng đặt cắt chuẩn MRI Master (Axial, Sagittal, Coronal) và bảng đối chiếu thông số 3 hãng Siemens, Philips, GE."
    },
    {
      id: "us",
      name: "Siêu âm Tổng quát",
      en: "Ultrasound & RADS Scoring",
      icon: "🔊",
      colorClass: "theme-us",
      colorHex: "#059669",
      desc: "Mặt cắt giải phẫu chuẩn ổ bụng, phân loại ACR TI-RADS tuyến giáp, ACR BI-RADS tuyến vú, FAST cấp cứu."
    },
    {
      id: "canthiep",
      name: "Siêu âm Can thiệp",
      en: "Interventional Ultrasound",
      icon: "🎯",
      colorClass: "theme-canthiep",
      colorHex: "#ea580c",
      desc: "Bảng kiểm vô trùng, sinh thiết kim lõi (CNB), chọc hút FNA, dẫn lưu Pigtail, đốt nhiệt RFA/MWA."
    },
    {
      id: "dlx",
      name: "TDCN: Đo Loãng Xương",
      en: "DEXA Bone Densitometry",
      icon: "📊",
      colorClass: "theme-dlx",
      colorHex: "#7c3aed",
      desc: "Nguyên lý DEXA, định vị ROI cột sống L1-L4/khớp háng, tiêu chuẩn WHO T-score/Z-score và FRAX."
    },
    {
      id: "cq",
      name: "Thuốc Cản Quang & ĐQT",
      en: "Contrast Media Directory",
      icon: "🧪",
      colorClass: "theme-cq",
      colorHex: "#db2777",
      desc: "Tra cứu thuốc CT/MRI kèm hình ảnh bao bì, eGFR an toàn thận, dự phòng PC-AKI/CIN và máy tính liều."
    },
    {
      id: "emg",
      name: "Tai biến & Cấp cứu CĐHA",
      en: "Emergency Protocols & Safety",
      icon: "🚨",
      colorClass: "theme-emg",
      colorHex: "#dc2626",
      desc: "Phác đồ phản vệ Thông tư 51/2017/TT-BYT, tính liều Adrenalin, xử trí thoát mạch, sự cố MRI, CPR."
    }
  ];

  // Danh mục nhóm vùng cơ thể chuẩn — YÊU CẦU #4: THÔNG SỐ & AN TOÀN LÊN ĐẦU TIÊN
  var REGIONS = [
    { id: "thong-so", name: "⚡ Thông số & An toàn", icon: "⚡" },
    { id: "all", name: "Tất cả vùng", icon: "🌐" },
    { id: "so-nao-mat", name: "Sọ não - Đầu mặt cổ", icon: "🧠" },
    { id: "cot-song", name: "Cột sống", icon: "🦴" },
    { id: "nguc-tim", name: "Lồng ngực & Tim mạch", icon: "🫁" },
    { id: "bung-chau", name: "Ổ bụng & Tiểu khung", icon: "🩺" },
    { id: "chi-tren", name: "Chi trên & Khớp", icon: "💪" },
    { id: "chi-duoi", name: "Chi dưới & Khớp", icon: "🦵" },
    { id: "toan-than", name: "Toàn thân & Mạch máu", icon: "🌐" }
  ];

  var appState = {
    currentModId: null,
    currentProtocolId: null,
    filterKeyword: "",
    selectedRegion: "thong-so",
    checklistProgress: {} // Lưu trạng thái tick của từng checklist
  };

  /* Helper tạo phần tử DOM an toàn */
  function el(tag, className, innerHTML) {
    var elem = document.createElement(tag);
    if (className) elem.className = className;
    if (innerHTML !== undefined && innerHTML !== null) elem.innerHTML = innerHTML;
    return elem;
  }

  function esc(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Phân loại kỹ thuật vào Nhóm Vùng Cơ Thể */
  function getRegionCategory(item) {
    var t = ((item.nhom || "") + " " + (item.ten || "") + " " + (item.vung || "")).toLowerCase();
    if (t.indexOf("thông số") !== -1 || t.indexOf("vật lý") !== -1 || t.indexOf("alara") !== -1 || t.indexOf("chuỗi xung") !== -1 || t.indexOf("an toàn") !== -1 || t.indexOf("nguyên lý") !== -1) {
      return { id: "thong-so", name: "Thông số & An toàn", icon: "⚡" };
    }
    if (t.indexOf("sọ") !== -1 || t.indexOf("mặt") !== -1 || t.indexOf("đầu") !== -1 || t.indexOf("tai") !== -1 || t.indexOf("xoang") !== -1 || t.indexOf("não") !== -1 || t.indexOf("hàm") !== -1 || t.indexOf("thái dương") !== -1 || t.indexOf("mũi") !== -1) {
      return { id: "so-nao-mat", name: "Sọ não - Đầu mặt cổ", icon: "🧠" };
    }
    if (t.indexOf("cột sống") !== -1 || t.indexOf("cs ") !== -1 || t.indexOf("đốt sống") !== -1 || t.indexOf("tủy") !== -1 || t.indexOf("cùng cụt") !== -1 || t.indexOf("mỏm nha") !== -1 || t.indexOf("c1-c2") !== -1 || t.indexOf("c1–c7") !== -1) {
      return { id: "cot-song", name: "Cột sống", icon: "🦴" };
    }
    if (t.indexOf("ngực") !== -1 || t.indexOf("tim") !== -1 || t.indexOf("phổi") !== -1 || t.indexOf("sườn") !== -1 || t.indexOf("xương ức") !== -1 || t.indexOf("mạch vành") !== -1 || t.indexOf("trung thất") !== -1 || t.indexOf("động mạch chủ ngực") !== -1) {
      return { id: "nguc-tim", name: "Lồng ngực & Tim mạch", icon: "🫁" };
    }
    if (t.indexOf("bụng") !== -1 || t.indexOf("gan") !== -1 || t.indexOf("tụy") !== -1 || t.indexOf("thận") !== -1 || t.indexOf("tiểu khung") !== -1 || t.indexOf("chậu") !== -1 || t.indexOf("bàng quang") !== -1 || t.indexOf("trực tràng") !== -1 || t.indexOf("tử cung") !== -1 || t.indexOf("tiền liệt") !== -1 || t.indexOf("mrcp") !== -1 || t.indexOf("mật") !== -1) {
      return { id: "bung-chau", name: "Ổ bụng & Tiểu khung", icon: "🩺" };
    }
    if (t.indexOf("tay") !== -1 || t.indexOf("vai") !== -1 || t.indexOf("cánh tay") !== -1 || t.indexOf("cẳng tay") !== -1 || t.indexOf("cổ tay") !== -1 || t.indexOf("bàn tay") !== -1 || t.indexOf("ngón tay") !== -1 || t.indexOf("khuỷu") !== -1 || t.indexOf("xương đòn") !== -1 || t.indexOf("xương bả vai") !== -1) {
      return { id: "chi-tren", name: "Chi trên & Khớp", icon: "💪" };
    }
    if (t.indexOf("chân") !== -1 || t.indexOf("gối") !== -1 || t.indexOf("đùi") !== -1 || t.indexOf("cẳng chân") !== -1 || t.indexOf("cổ chân") !== -1 || t.indexOf("bàn chân") !== -1 || t.indexOf("gót") !== -1 || t.indexOf("háng") !== -1 || t.indexOf("xương chậu") !== -1) {
      return { id: "chi-duoi", name: "Chi dưới & Khớp", icon: "🦵" };
    }
    return { id: "toan-than", name: "Toàn thân & Mạch máu", icon: "🌐" };
  }

  /* Khởi tạo ứng dụng — chỉ chạy SAU KHI đăng nhập thành công (do ui-core.js gọi VUDAT_APP.start) */
  var appStarted = false;
  function initApp() {
    if (appStarted) return refreshApp();
    appStarted = true;
    renderNavPills();
    setupGlobalEvents();
    loadChecklistProgress();
    applySavedTheme();
    initSecurityAndPWA();
    trackVisitMetrics();
    initNavPillsAutoScroll();
    handleHashChange();
  }

  /* Vẽ lại sau khi đăng nhập lại / khi nội dung do Admin thay đổi */
  function refreshApp() {
    handleHashChange();
  }

  function refreshCurrent() {
    if (appStarted) handleHashChange();
  }

  function totalContentCount() {
    var n = 0;
    ["xq", "ct", "mri", "us", "canthiep", "dlx", "cq", "emg"].forEach(function (m) { n += getItemsForModality(m).length; });
    return n;
  }

  function applySavedTheme() {
    var theme = localStorage.getItem("vudat_cdha_theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    var fontSize = localStorage.getItem("vudat_cdha_font_size");
    if (fontSize) {
      document.documentElement.style.setProperty("--font-size-base", fontSize);
    }
  }

  function loadChecklistProgress() {
    try {
      var d = localStorage.getItem("vudat_cdha_checklists");
      if (d) appState.checklistProgress = JSON.parse(d);
    } catch (e) {}
  }

  function saveChecklistProgress() {
    try {
      localStorage.setItem("vudat_cdha_checklists", JSON.stringify(appState.checklistProgress));
    } catch (e) {}
  }

  function renderNavPills() {
    var box = document.getElementById("navpillsBox");
    if (!box) return;

    var html =
      '<button class="navpill active" data-mod="home" onclick="location.hash=\'home\'">' +
        '<span class="dot" style="background:var(--brand)"></span>' +
        '<span>Trang chủ VPI</span>' +
      '</button>';

    MODALITIES.forEach(function (m) {
      var count = getModalityItemCount(m.id);
      html +=
        '<button class="navpill ' + m.colorClass + '" data-mod="' + m.id + '" onclick="location.hash=\'mod-' + m.id + '\'">' +
          '<span class="dot"></span>' +
          '<span>' + esc(m.name) + '</span>' +
          '<span class="cnt">' + count + '</span>' +
        '</button>';
    });

    box.innerHTML = html;
  }

  function setupGlobalEvents() {
    window.addEventListener("hashchange", handleHashChange);

    var searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
      var searchTimer = null;
      searchInput.addEventListener("input", function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          var kw = searchInput.value.trim().toLowerCase();
          if (kw.length >= 2) {
            executeGlobalSearch(kw);
          }
        }, 250);
      });
    }

    var themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
      themeBtn.onclick = function () {
        var cur = document.documentElement.getAttribute("data-theme") || "light";
        var next = (cur === "light") ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("vudat_cdha_theme", next);
        themeBtn.textContent = (next === "dark") ? "☀️" : "🌙";
        showToast("Đã chuyển giao diện: " + (next === "dark" ? "Chế độ Tối" : "Chế độ Sáng"), "ok");
      };
    }
  }

  function setActiveNavPill(modId) {
    var pills = document.querySelectorAll(".navpill");
    pills.forEach(function (p) {
      p.classList.toggle("active", p.getAttribute("data-mod") === (modId || "home"));
    });

    // Cập nhật trạng thái active trên thanh Bottom Nav trên Điện thoại di động
    var mobItems = document.querySelectorAll(".mob-nav-item");
    mobItems.forEach(function (m) {
      var oc = m.getAttribute("onclick") || "";
      var target = (modId === "home" || !modId) ? "home" : ("mod-" + modId);
      m.classList.toggle("active", oc.indexOf(target) !== -1);
    });
  }

  /* Đếm số bài trong từng phân hệ (Không tính bảng kiểm rời!) */
  function getModalityItemCount(modId) {
    if (modId === "xq") {
      return (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.modality === "X-quang"; }).length;
    } else if (modId === "ct") {
      return (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.modality === "CT"; }).length;
    } else if (modId === "mri") {
      return (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.modality === "MRI"; }).length;
    } else if (modId === "us") {
      return (window.SOTAY_SIEUAM || []).length;
    } else if (modId === "canthiep") {
      return (window.SOTAY_CANTHIEP || []).length;
    } else if (modId === "dlx") {
      return 3;
    } else if (modId === "cq") {
      return 4;
    } else if (modId === "emg") {
      return 4;
    }
    return 0;
  }

  /* Xử lý chuyển đổi Hash URL */
  function handleHashChange() {
    var hash = (location.hash || "").replace("#", "").trim();

    // Kiểm tra an toàn bảo mật mã PIN nội bộ BV VPI
    if (typeof secState !== "undefined" && secState.pinEnabled && !secState.isUnlocked) {
      if (secState.pinScope === "all") {
        showPinLockOverlay("Nhập mã PIN để mở khóa sổ tay lâm sàng");
        return;
      } else if (secState.pinScope === "sensitive") {
        if (hash === "mod-emg" || hash === "mod-cq") {
          secState.pendingHash = hash;
          showPinLockOverlay("Vui lòng nhập PIN để truy cập chuyên mục Cấp cứu & Dược thư");
          return;
        }
      }
    }

    if (!hash || hash === "home") {
      showDashboardView();
      return;
    }

    if (hash.indexOf("mod-") === 0) {
      var modId = hash.replace("mod-", "");
      showModalityView(modId);
      return;
    }

    if (hash.indexOf("item:") === 0) {
      var itemId = hash.replace("item:", "");
      showItemDetail(itemId, false);
      return;
    }

    showDashboardView();
  }

  /* =========================================================================
     1. MÀN HÌNH DASHBOARD TRANG CHỦ
     ========================================================================= */
  function showDashboardView() {
    setActiveNavPill("home");
    var container = document.getElementById("mainAppView");
    if (!container) return;

    var html =
      '<div class="home-hero">' +
        '<div class="home-hero-text">' +
          '<h1>BỆNH VIỆN VĨNH PHÚC VPI — SỔ CĐHA</h1>' +
          '<p>Cẩm nang chuẩn hóa kỹ thuật thực hành lâm sàng, bảng kiểm an toàn y tế và dược thư cản quang toàn diện</p>' +
        '</div>' +
        '<div class="home-hero-stats">' +
          '<div class="stat-pill"><span class="dot"></span>Hệ thống: <b>' + totalContentCount() + ' nội dung chuẩn</b></div>' +
          '<div class="stat-pill" title="Số lần bạn đã mở Sổ tay trên thiết bị này (không phải tổng của mọi người dùng)"><span class="dot" style="background:#10b981;"></span>Lượt mở trên máy này: <b id="visitCounterHero">' + readVisitInt("vpi_device_total").toLocaleString("vi-VN") + '</b></div>' +
          '<div class="stat-pill" title="Số lần mở hôm nay trên thiết bị này"><span class="dot" style="background:#06b6d4;"></span>Hôm nay: <b id="visitCounterToday">' + readVisitInt("vpi_device_today").toLocaleString("vi-VN") + '</b></div>' +
          '<button class="stat-pill" onclick="window.VUDAT_APP.showFeedbackModal()" style="cursor:pointer;border-color:#059669;background:rgba(5,150,105,0.08);color:#059669;font-weight:700;">' +
            '💬 Góp ý Admin' +
          '</button>' +
          '<button class="stat-pill" onclick="window.VUDAT_APP.showSettingsModal()" style="cursor:pointer;border-color:var(--brand);background:var(--brand-wash);color:var(--brand-dark);">' +
            '⚙️ Cài đặt' +
          '</button>' +
        '</div>' +
      '</div>';

    // Cảnh báo an toàn y khoa tổng thể
    html +=
      '<div class="safety-alert-banner emg">' +
        '<div class="ic">⚠️</div>' +
        '<div class="txt">' +
          '<b>CẢNH BÁO AN TOÀN NGƯỜI BỆNH TRONG CHẨN ĐOÁN HÌNH ẢNH — BV VĨNH PHÚC VPI</b>' +
          '<span>Mọi thông số kỹ thuật (kVp, mAs, liều thuốc cản quang, ngưỡng eGFR, liều Adrenalin) phải được đối chiếu với bác sĩ điều trị và thực hiện bởi nhân viên y tế có chứng chỉ hành nghề. Trong tình huống khẩn cấp, kích hoạt báo động cấp cứu ngay lập tức!</span>' +
        '</div>' +
      '</div>';

    // Lưới 8 phân hệ
    html += '<div class="mod-grid">';
    MODALITIES.forEach(function (m) {
      var count = getModalityItemCount(m.id);
      html +=
        '<div class="mod-card ' + m.colorClass + '" onclick="location.hash=\'mod-' + m.id + '\'">' +
          '<div class="mod-card-head">' +
            '<div class="mod-card-icon">' + m.icon + '</div>' +
            '<div class="mod-card-count">' + count + '</div>' +
          '</div>' +
          '<h3 class="mod-card-title">' + esc(m.name) + '</h3>' +
          '<p class="mod-card-desc">' + esc(m.desc) + '</p>' +
          '<div class="mod-card-footer">' +
            '<span>' + esc(m.en) + '</span>' +
            '<span>Mở chuyên mục →</span>' +
          '</div>' +
        '</div>';
    });
    html += '</div>';

    // =========================================================================
    // NGUỒN TRI THỨC LÂM SÀNG, CẨM NANG THIẾT BỊ BV VPI & BÁCH KHOA KTV 3 MIỀN
    // =========================================================================
    html +=
      '<div class="dashboard-knowledge-section">' +
        '<div class="knowledge-section-title">' +
          '<h2>🔬 NGUỒN TRI THỨC LÂM SÀNG & CẨM NANG THIẾT BỊ BỆNH VIỆN VPI</h2>' +
          '<span>Đào tạo chuẩn hóa — Wikiradiology, KTV 3 Miền, GE SIGNA™ Explorer VPI & Siemens Academy</span>' +
        '</div>' +
        '<div class="knowledge-card-grid">' +
          // Thẻ 1: Cẩm nang GE SIGNA Explorer 1.5T BV Vĩnh Phúc VPI
          '<div class="knowledge-showcase-card ge-card">' +
            '<div>' +
              '<div class="knowledge-card-head">' +
                '<span class="icon">🧲</span>' +
                '<span class="knowledge-card-badge">GE SIGNA™ Explorer 1.5T</span>' +
              '</div>' +
              '<div class="knowledge-card-title">Cẩm Nang Hệ Thống Máy MRI GE SIGNA™ Explorer 1.5T — Bệnh viện Vĩnh Phúc VPI</div>' +
              '<div class="knowledge-card-desc">Cấu hình OpTix RF 16 kênh, 6 cuộn thu chuyên dụng, hướng dẫn 10 công nghệ độc quyền (Ready Brain, PROPELLER, IDEAL, 3D CUBE, LAVA-Flex, MAVRIC SL, FOCUS DWI) và bảng đối chiếu Siemens - Philips.</div>' +
              '<div class="knowledge-card-chips">' +
                '<span class="knowledge-chip">⚡ Ready Brain</span>' +
                '<span class="knowledge-chip">🔄 PROPELLER</span>' +
                '<span class="knowledge-chip">✨ IDEAL</span>' +
                '<span class="knowledge-chip">⏱️ LAVA-Flex</span>' +
                '<span class="knowledge-chip">🛡️ MAVRIC SL</span>' +
              '</div>' +
            '</div>' +
            '<div class="knowledge-card-actions">' +
              '<button class="btn-kc-primary" onclick="window.VUDAT_APP.showGeSignaModal()">' +
                '🔍 Mở Cẩm Nang Máy GE SIGNA Explorer' +
              '</button>' +
            '</div>' +
          '</div>' +

          // Thẻ 2: Wikiradiology & Bài giảng PPTX KTV 3 Miền
          '<div class="knowledge-showcase-card ktv-card">' +
            '<div>' +
              '<div class="knowledge-card-head">' +
                '<span class="icon">📚</span>' +
                '<span class="knowledge-card-badge">Wikiradiology & KTV 3 Miền</span>' +
              '</div>' +
              '<div class="knowledge-card-title">Bách Khoa Chuẩn Hóa & Thư Viện Bài Giảng PPTX Kỹ Thuật CĐHA</div>' +
              '<div class="knowledge-card-desc">Nguyên lý vật lý tạo ảnh, tiêu chuẩn chất lượng hình ảnh, xảo ảnh (artifacts) và cách khắc phục cho X-quang, CT, MRI. Danh mục bài giảng PPTX chuyên đề chính thức của KTV 3 Miền.</div>' +
              '<div class="knowledge-card-chips">' +
                '<span class="knowledge-chip">📖 Wikiradiology</span>' +
                '<span class="knowledge-chip">📊 Bài Giảng PPTX</span>' +
                '<span class="knowledge-chip">🎓 Siemens Academy</span>' +
                '<span class="knowledge-chip">⚠️ Phân tích Xảo ảnh</span>' +
              '</div>' +
            '</div>' +
            '<div class="knowledge-card-actions">' +
              '<button class="btn-kc-primary" onclick="window.VUDAT_APP.showKtv3MienModal()">' +
                '📖 Mở Bách Khoa KTV' +
              '</button>' +
              '<a href="https://wikirad.ktv3mien.com/" target="_blank" rel="noopener" class="btn-kc-link">' +
                'Wikirad ↗' +
              '</a>' +
              '<a href="https://exam.ktv3mien.com/pptx/index.html" target="_blank" rel="noopener" class="btn-kc-link">' +
                'PPTX ↗' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    container.innerHTML = html;
  }

  /* =========================================================================
     2. MÀN HÌNH CHUYÊN MỤC PHÂN HỆ — THANH CHỌN VÙNG HÀNG NGANG (BVHVGL STYLE)
     ========================================================================= */
  function showModalityView(modId) {
    setActiveNavPill(modId);
    appState.currentModId = modId;
    var container = document.getElementById("mainAppView");
    if (!container) return;

    var curMod = MODALITIES.filter(function (x) { return x.id === modId; })[0];
    if (!curMod) { showDashboardView(); return; }

    var items = getItemsForModality(modId);

    // Thu thập danh sách các nhóm vùng cơ thể thực tế có trong phân hệ này
    var availableRegionsMap = {};
    items.forEach(function (it) {
      var reg = getRegionCategory(it);
      availableRegionsMap[reg.id] = reg.name;
    });

    // Mặc định chọn vùng: "thong-so" nếu có, hoặc "all"
    if (availableRegionsMap["thong-so"]) {
      appState.selectedRegion = "thong-so";
    } else {
      appState.selectedRegion = "all";
    }

    var html = '<div class="modality-page-wrap ' + curMod.colorClass + '">';

    // =========================================================================
    // YÊU CẦU #7: THANH CHỌN THEO VÙNG CƠ THỂ HÀNG NGANG GIỐNG SỔ TAY CĐHA BVHVGL
    // YÊU CẦU #4: THÔNG SỐ & AN TOÀN NẰM Ở ĐẦU TIÊN
    // =========================================================================
    html +=
      '<div class="region-horizontal-bar-wrap">' +
        '<div class="region-horizontal-scroll" id="horizontalRegionBar">';

    REGIONS.forEach(function (r) {
      if (r.id === "all" || availableRegionsMap[r.id]) {
        var count = (r.id === "all") ? items.length : items.filter(function (it) { return getRegionCategory(it).id === r.id; }).length;
        var isActive = (r.id === appState.selectedRegion);
        html +=
          '<button class="region-pill' + (isActive ? ' active' : '') + '" data-reg="' + r.id + '" onclick="window.VUDAT_APP.filterByRegion(\'' + r.id + '\')">' +
            '<span>' + esc(r.name) + '</span>' +
            '<span class="cnt">' + count + '</span>' +
          '</button>';
      }
    });

    html +=
        '</div>' +
      '</div>';

    // THANH CHUYỂN ĐỔI CHẾ ĐỘ XEM TRÊN ĐIỆN THOẠI DI ĐỘNG (MOBILE VIEW TABS)
    html +=
      '<div class="mobile-view-tabs" id="mobileViewTabs">' +
        '<button class="mob-tab-btn active" id="mobTabListBtn" onclick="window.VUDAT_APP.switchMobileView(\'list\')">' +
          '📋 Danh mục (' + items.length + ' kỹ thuật)' +
        '</button>' +
        '<button class="mob-tab-btn" id="mobTabDetailBtn" onclick="window.VUDAT_APP.switchMobileView(\'detail\')">' +
          '📖 Chi tiết bài học' +
        '</button>' +
      '</div>';

    // KHUNG CHIA CỘT: Cột trái (Danh mục kỹ thuật) GIỮ NGUYÊN trên Desktop, tự co giãn trên Mobile
    html +=
      '<div class="split-view mobile-show-list" id="splitViewContainer">' +
        // CỘT TRÁI: DANH MỤC KỸ THUẬT (GIỮ NGUYÊN!)
        '<div class="col-panel col-sidebar-left">' +
          '<div class="list-filter-bar">' +
            '<input id="lessonSearchInput" type="text" placeholder="Tìm kỹ thuật trong ' + esc(curMod.name) + '...">' +
          '</div>' +
          '<div class="lesson-list-scroll" id="lessonListContainer">' +
            renderLessonItemsHtml(items, null, appState.selectedRegion) +
          '</div>' +
        '</div>' +

        // CỘT GIỮA: CHI TIẾT BÀI HỌC
        '<div class="col-panel main-detail-content" id="detailMainPanel">' +
          '<div style="text-align:center;padding:40px 20px;color:var(--text-soft);">' +
            '<div style="font-size:40px;margin-bottom:12px;">' + curMod.icon + '</div>' +
            '<h3>' + esc(curMod.name) + '</h3>' +
            '<p>Chọn một kỹ thuật ở danh mục bên trái để xem chi tiết theo thứ tự: <b>1. Thông số & An toàn ➔ 2. Nguyên lý ➔ 3. Kỹ thuật ➔ 4. Bảng kiểm</b>.</p>' +
          '</div>' +
        '</div>' +

        // CỘT PHẢI: HÌNH ẢNH MINH HỌA & TƯ THẾ CHỤP
        '<div class="col-panel col-sidebar-right" id="detailRightPanel">' +
          '<div class="gallery-header">Hình ảnh & Tư thế chụp</div>' +
          '<div class="gallery-body" id="galleryContainer">' +
            '<div style="text-align:center;padding:30px 10px;color:var(--text-muted);font-size:13px;">' +
              'Hình ảnh minh họa tư thế, hướng tia và phim chuẩn sẽ hiển thị tại đây khi chọn kỹ thuật.' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    html += '</div>';

    container.innerHTML = html;

    // Tự động mở bài đầu tiên hợp lệ theo vùng đang chọn
    var initialItems = getFilteredItems(items, "", appState.selectedRegion);
    if (initialItems.length > 0) {
      showItemDetail(initialItems[0].id, false);
    } else if (items.length > 0) {
      showItemDetail(items[0].id, false);
    }

    // Sự kiện tìm kiếm nhanh trong phân hệ
    var filterInput = document.getElementById("lessonSearchInput");
    if (filterInput) {
      filterInput.oninput = function () {
        var kw = filterInput.value.toLowerCase().trim();
        var region = appState.selectedRegion;
        var filtered = getFilteredItems(items, kw, region);
        var listContainer = document.getElementById("lessonListContainer");
        if (listContainer) {
          listContainer.innerHTML = renderLessonItemsHtml(filtered, appState.currentProtocolId, region);
        }
      };
    }
  }

  function getFilteredItems(items, keyword, region) {
    return items.filter(function (it) {
      var matchKw = !keyword || it.ten.toLowerCase().indexOf(keyword) !== -1 || ((it.nhom || "") + "").toLowerCase().indexOf(keyword) !== -1;
      var matchReg = (region === "all") || (getRegionCategory(it).id === region);
      return matchKw && matchReg;
    });
  }

  /* Tạo HTML danh sách bài học (YÊU CẦU #3: BỎ KHÓA TOÀN BỘ BÀI HỌC) */
  function renderLessonItemsHtml(items, activeId, selectedRegion) {
    if (!items || items.length === 0) {
      return '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">Không tìm thấy kỹ thuật trong vùng này.</div>';
    }

    var html = "";
    items.forEach(function (it) {
      var isCompleted = false;
      try {
        var completedList = JSON.parse(localStorage.getItem("vudat_cdha_completed_lessons") || "[]");
        if (completedList.indexOf(it.id) !== -1) isCompleted = true;
      } catch (e) {}

      var icon = isCompleted ? '<span style="color:var(--ok);font-weight:900;">✓</span>' : '📄';
      var statusClass = isCompleted ? "completed" : "unlocked";
      var isActive = (it.id === activeId);
      var hasChk = !!window.getChecklistForProtocol(it.id);

      html +=
        '<button class="lesson-item-btn ' + statusClass + (isActive ? ' active' : '') + '" onclick="window.VUDAT_APP.selectItem(\'' + it.id + '\')">' +
          '<span class="lesson-status-icon">' + icon + '</span>' +
          '<div class="lesson-info">' +
            '<span class="t">' + esc(it.ten) + '</span>' +
            '<span class="sub">' +
              esc(it.nhom || it.vung || it.modality || "") +
              (hasChk ? ' • <b style="color:var(--brand);">Có Bảng kiểm</b>' : '') +
            '</span>' +
          '</div>' +
        '</button>';
    });

    return html;
  }

  /* Lấy danh sách bài học theo phân hệ (Không tạo bảng kiểm rời!) */
  function getItemsForModality(modId) {
    if (modId === "xq") {
      return (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.modality === "X-quang"; });
    } else if (modId === "ct") {
      return (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.modality === "CT"; });
    } else if (modId === "mri") {
      return (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.modality === "MRI"; });
    } else if (modId === "us") {
      return window.SOTAY_SIEUAM || [];
    } else if (modId === "canthiep") {
      return window.SOTAY_CANTHIEP || [];
    } else if (modId === "dlx") {
      return [
        { id: "dlx-nguyen-ly", ten: "Nguyên lý & Chỉ định Đo Loãng Xương (DEXA)", nhom: "Thông số & An toàn", type: "dlx-section" },
        { id: "dlx-tu-the-roi", ten: "Đặt Tư Thế & Vùng Quan Tâm (ROI: Cột Sống & Khớp Háng)", nhom: "Quy trình đo", type: "dlx-section" },
        { id: "dlx-tieu-chuan-who", ten: "Tiêu Chuẩn Chẩn Đoán WHO (T-score / Z-score & Thang FRAX)", nhom: "Chẩn đoán & Xử trí", type: "dlx-section" }
      ];
    } else if (modId === "cq") {
      return [
        { id: "cq-ct-catalog", ten: "Tra Cứu Thuốc Cản Quang CT (Iodinated Contrast)", nhom: "Thông số & An toàn", type: "cq-section" },
        { id: "cq-mri-catalog", ten: "Tra Cứu Thuốc Đối Quang Từ MRI (Gadolinium GBCA)", nhom: "Thông số & An toàn", type: "cq-section" },
        { id: "cq-an-toan-than", ten: "Quy Trình An Toàn Chức Năng Thận & Dự Phòng PC-AKI / CIN", nhom: "An toàn thận", type: "cq-section" },
        { id: "cq-may-tinh-lieu", ten: "Máy Tính Liều Cản Quang CT & Động Mạch Vành CCTA", nhom: "Công cụ tính liều", type: "cq-section" }
      ];
    } else if (modId === "emg") {
      return [
        { id: "emg-phan-ve", ten: "Chẩn Đoán & Xử Trí Phản Vệ (Thông Tư 51/2017/TT-BYT) + Tính Liều Adrenalin", nhom: "Thông số & An toàn", type: "emg-section" },
        { id: "emg-thoat-mach", ten: "Quy Trình 8 Bước Xử Trí Thoát Mạch Thuốc Cản Quang & Vỡ Ven", nhom: "Sự cố cản quang", type: "emg-section" },
        { id: "emg-an-toan-mri", ten: "Quy Chuẩn An Toàn Từ Trường & Xử Trí Khẩn Cấp Trong Phòng MRI", nhom: "An toàn MRI", type: "emg-section" },
        { id: "emg-cpr", ten: "Hồi Sinh Tim Phổi (CPR) Cấp Cứu Ngừng Tuần Hoàn (AHA 2020)", nhom: "Hồi sinh tim phổi", type: "emg-section" }
      ];
    }
    return [];
  }

  /* =========================================================================
     3. HIỂN THỊ CHI TIẾT BÀI HỌC THEO THỨ TỰ HỌC:
        1. THÔNG SỐ & AN TOÀN (LÊN ĐẦU TIÊN)
        2. NGUYÊN LÝ & CHỈ ĐỊNH
        3. KỸ THUẬT CHỤP & HƯỚNG ĐẶT CẮT (SLICE PLANNING)
        4. BẢNG KIỂM THỰC HÀNH LÂM SÀNG (Ở CUỐI CÙNG)
     ========================================================================= */

  /* Chuyển đổi giữa Chế độ Danh mục và Chi tiết trên Điện thoại di động */
  function switchMobileView(mode) {
    var split = document.getElementById("splitViewContainer") || document.querySelector(".split-view");
    var btnList = document.getElementById("mobTabListBtn");
    var btnDetail = document.getElementById("mobTabDetailBtn");
    if (!split) return;

    if (mode === "list") {
      split.classList.remove("mobile-show-detail");
      split.classList.add("mobile-show-list");
      if (btnList) btnList.classList.add("active");
      if (btnDetail) btnDetail.classList.remove("active");
      var listScroll = document.getElementById("lessonListContainer") || split;
      if (listScroll) {
        listScroll.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      split.classList.remove("mobile-show-list");
      split.classList.add("mobile-show-detail");
      if (btnList) btnList.classList.remove("active");
      if (btnDetail) btnDetail.classList.add("active");
      var mainPanel = document.getElementById("detailMainPanel");
      if (mainPanel) {
        mainPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  /* Tạo thanh điều hướng bài học nhanh trên Điện thoại di động */
  function getMobileNavBarsHtml(itemId) {
    return {
      top:
        '<div class="mobile-protocol-top-bar">' +
          '<button class="btn-mob-back-list" onclick="window.VUDAT_APP.switchMobileView(\'list\')">' +
            '☰ Đổi kỹ thuật khác' +
          '</button>' +
          '<div class="mob-step-nav-group">' +
            '<button class="btn-mob-step" onclick="window.VUDAT_APP.prevLesson(\'' + itemId + '\')" title="Kỹ thuật trước">◀ Trước</button>' +
            '<button class="btn-mob-step" onclick="window.VUDAT_APP.nextLesson(\'' + itemId + '\')" title="Kỹ thuật kế tiếp">Tiếp ▶</button>' +
          '</div>' +
        '</div>',
      bottom:
        '<div class="mobile-protocol-bottom-bar">' +
          '<button class="btn-mob-step" onclick="window.VUDAT_APP.prevLesson(\'' + itemId + '\')">◀ Trước</button>' +
          '<button class="btn-mob-back-list" onclick="window.VUDAT_APP.switchMobileView(\'list\')">📋 Danh mục</button>' +
          '<button class="btn-mob-step" onclick="window.VUDAT_APP.nextLesson(\'' + itemId + '\')">Tiếp ▶</button>' +
        '</div>'
    };
  }

  function showItemDetail(itemId, updateHash) {
    if (updateHash !== false) {
      location.hash = "item:" + itemId;
    }
    appState.currentProtocolId = itemId;

    var item = findItemById(itemId);
    if (!item) {
      var mp = document.getElementById("detailMainPanel");
      if (mp) mp.innerHTML = '<div style="padding:30px;color:var(--danger);">Không tìm thấy thông tin kỹ thuật này.</div>';
      return;
    }

    var modId = "xq";
    if (item.modality === "X-quang") modId = "xq";
    else if (item.modality === "CT") modId = "ct";
    else if (item.modality === "MRI") modId = "mri";
    else if (item.modality === "Siêu âm") modId = "us";
    else if (item.modality === "Siêu âm can thiệp") modId = "canthiep";
    else if (item.type === "dlx-section") modId = "dlx";
    else if (item.type === "cq-section") modId = "cq";
    else if (item.type === "emg-section") modId = "emg";

    var mainPanel = document.getElementById("detailMainPanel");
    if (!mainPanel || appState.currentModId !== modId) {
      showModalityView(modId);
      mainPanel = document.getElementById("detailMainPanel");
    }
    var rightPanel = document.getElementById("detailRightPanel");
    if (!mainPanel) return;

    // Cập nhật trạng thái active trên danh sách bài học bên trái
    var buttons = document.querySelectorAll(".lesson-item-btn");
    buttons.forEach(function (b) {
      var isCur = b.getAttribute("onclick") && b.getAttribute("onclick").indexOf("'" + itemId + "'") !== -1;
      b.classList.toggle("active", isCur);
    });

    // Phân loại render
    if (item.modality === "Siêu âm") {
      renderUltrasoundDetail(item, mainPanel, rightPanel);
    } else if (item.modality === "Siêu âm can thiệp") {
      renderInterventionalDetail(item, mainPanel, rightPanel);
    } else if (item.type === "dlx-section") {
      renderDEXADetail(item.id, mainPanel, rightPanel);
    } else if (item.type === "cq-section") {
      renderContrastDetail(item.id, mainPanel, rightPanel);
    } else if (item.type === "emg-section") {
      renderEmergencyDetail(item.id, mainPanel, rightPanel);
    } else {
      renderStructuredProtocolDetail(item, mainPanel, rightPanel);
    }

    // Thanh công cụ chỉnh sửa (chỉ hiện với Admin — do ui-admin.js xử lý)
    if (window.VPI_UI && window.VPI_UI.onDetailRendered) window.VPI_UI.onDetailRendered(itemId, mainPanel);

    // Tự động chuyển tab chi tiết và cuộn mượt trên Mobile khi người dùng chọn bài
    if (window.innerWidth <= 768 && updateHash !== false) {
      switchMobileView("detail");
    }

    mainPanel.scrollTop = 0;
  }

  function findItemById(itemId) {
    var q = (window.SOTAY_QUYTRINH || []).filter(function (x) { return x.id === itemId; })[0];
    if (q) return q;

    var u = (window.SOTAY_SIEUAM || []).filter(function (x) { return x.id === itemId; })[0];
    if (u) return u;

    var ct = (window.SOTAY_CANTHIEP || []).filter(function (x) { return x.id === itemId; })[0];
    if (ct) return ct;

    var items = getItemsForModality("dlx").concat(getItemsForModality("cq")).concat(getItemsForModality("emg"));
    var sec = items.filter(function (x) { return x.id === itemId; })[0];
    if (sec) return sec;

    return null;
  }

  /* RENDER QUY TRÌNH CHUẨN ĐÚNG THỨ TỰ: THÔNG SỐ LÊN ĐẦU TIÊN (YÊU CẦU #4) */
  /* RENDER QUY TRÌNH CHUẨN ĐÚNG THỨ TỰ: NGUYÊN LÝ, ĐỊNH NGHĨA, CHI TIẾT, ỨNG DỤNG, THÔNG SỐ (WIKIRAD, GE SIGNA EXPLORER VPI, SIEMENS) */
  function renderStructuredProtocolDetail(item, mainPanel, rightPanel) {
    var isXray = (item.modality === "X-quang");
    var isCT = (item.modality === "CT");
    var isMRI = (item.modality === "MRI");

    var checklist = window.getChecklistForProtocol(item.id);

    // Lấy tri thức lâm sàng nền tảng từ data-clinical-knowledge.js
    var kn = window.SOTAY_CLINICAL_KNOWLEDGE || {};
    var modKey = isXray ? "xray" : (isCT ? "ct" : (isMRI ? "mri" : ""));
    var modPrinciple = (kn.principlesByModality && kn.principlesByModality[modKey]) ? kn.principlesByModality[modKey] : null;
    var geSystem = (kn.geSignaExplorerVPI || kn.geSignaCreatorVPI);

    // Lấy hướng đặt cắt MRI Master và đối chiếu 3 hãng
    var mriMasterPlan = null;
    if (isMRI && window.SOTAY_MRIMASTER && window.SOTAY_MRIMASTER.quyTrinhLapKeHoach) {
      mriMasterPlan = window.SOTAY_MRIMASTER.quyTrinhLapKeHoach.filter(function (p) {
        var t = item.ten.toLowerCase();
        var nhom = (item.nhom || "").toLowerCase();
        return (p.vung && nhom.indexOf(p.vung.toLowerCase()) !== -1) ||
               (t.indexOf("sọ não") !== -1 && p.id === "mri-plan-so-nao") ||
               (t.indexOf("tuyến yên") !== -1 && p.id === "mri-plan-tuyen-yen") ||
               (t.indexOf("cột sống cổ") !== -1 && p.id === "mri-plan-cot-song-co") ||
               (t.indexOf("cột sống") !== -1 && p.id === "mri-plan-cot-song-that-lung") ||
               (t.indexOf("gối") !== -1 && p.id === "mri-plan-khop-goi") ||
               (t.indexOf("vai") !== -1 && p.id === "mri-plan-khop-vai") ||
               (t.indexOf("háng") !== -1 && p.id === "mri-plan-khop-hang") ||
               (t.indexOf("tiền liệt") !== -1 && p.id === "mri-plan-tien-liet-tuyen") ||
               (t.indexOf("gan") !== -1 && p.id === "mri-plan-gan-mrcp");
      })[0];
    }

    var mobBars = getMobileNavBarsHtml(item.id);

    var html =
      mobBars.top +
      '<div class="detail-header">' +
        '<div class="badges">' +
          '<span class="badge-mod">' + esc(item.modality) + '</span>' +
          '<span class="badge-mod">' + esc(item.nhom || "") + '</span>' +
          '<span class="badge-mod" style="background:#f1f5f9;color:#334155;">Bệnh viện Vĩnh Phúc VPI</span>' +
        '</div>' +
        '<h2>' + esc(item.ten) + '</h2>' +
        (item.nguon ? '<p>Tài liệu tham chiếu chuyên môn: <i>' + esc(item.nguon) + '</i></p>' : '') +
      '</div>';

    // =========================================================================
    // NGUỒN TÀI LIỆU CHUYÊN SÂU & ĐÀO TẠO CHÍNH THỨC (4 NGUỒN YÊU CẦU)
    // =========================================================================
    html +=
      '<div class="source-links-box">' +
        '<div class="title">📚 NGUỒN TÀI LIỆU CHUYÊN SÂU & ĐÀO TẠO CHÍNH THỨC:</div>' +
        '<a href="https://wikirad.ktv3mien.com/" target="_blank" rel="noopener" class="btn-source-link wiki" title="Bách khoa toàn thư Kỹ thuật Hình ảnh Y học Việt Nam">' +
          '📖 Wikiradiology - KTV 3 Miền ↗' +
        '</a>' +
        '<a href="https://exam.ktv3mien.com/pptx/index.html" target="_blank" rel="noopener" class="btn-source-link pptx" title="Thư viện Bài giảng chuyên đề Kỹ thuật CĐHA PPTX">' +
          '📊 Bài giảng PPTX KTV 3 Miền ↗' +
        '</a>' +
        (isMRI ?
          '<button type="button" onclick="window.VUDAT_APP.showGeSignaModal()" class="btn-source-link ge" title="Cẩm nang hệ thống máy MRI GE SIGNA™ Explorer 1.5T Bệnh viện Vĩnh Phúc VPI">' +
            '🧲 Cẩm Nang GE SIGNA Explorer VPI' +
          '</button>' : '') +
        '<a href="https://academy.siemens-healthineers.com/vi-vn" target="_blank" rel="noopener" class="btn-source-link siemens" title="Cổng đào tạo trực tuyến Siemens Healthineers Academy">' +
          '🎓 Siemens Healthineers Academy ↗' +
        '</a>' +
      '</div>';

    // =========================================================================
    // CẢNH BÁO AN TOÀN LÂM SÀNG & CHỐNG CHỈ ĐỊNH QUAN TRỌNG
    // =========================================================================
    var criticalAlerts = [];
    (item.noiDung || []).forEach(function (sec) {
      var t = sec.tieuDe.toLowerCase();
      if (t.indexOf("chống chỉ định") !== -1 || t.indexOf("cảnh báo") !== -1 || t.indexOf("bảo vệ bức xạ") !== -1 || t.indexOf("lưu ý") !== -1) {
        (sec.items || []).forEach(function (it) { criticalAlerts.push(it); });
      }
    });

    if (isXray || isCT) {
      criticalAlerts.push("⛔ PHỤ NỮ CÓ THAI: Bắt buộc khai thác tiền sử chu kỳ kinh nguyệt và khả năng có thai. Cân nhắc siêu âm/MRI thay thế nếu không phải cấp cứu.");
      criticalAlerts.push("🛡️ NGUYÊN TẮC ALARA: Bắt buộc dùng áo/tạp dề chì che chắn tuyến sinh dục, tuyến giáp và khu trú chùm tia đúng vùng khảo sát.");
    }
    if (isCT && (item.ten.toLowerCase().indexOf("tiêm") !== -1 || item.ten.toLowerCase().indexOf("cản quang") !== -1 || (item.nhom && item.nhom.toLowerCase().indexOf("mạch") !== -1))) {
      criticalAlerts.push("⚠️ THUỐC CẢN QUANG: Đánh giá eGFR (thận trọng khi eGFR < 30 mL/phút/1.73m²), khai thác tiền sử dị ứng/hen suyễn. Sẵn sàng hộp cấp cứu phản vệ.");
      criticalAlerts.push("⚠️ NGUY CƠ THOÁT MẠCH: Kiểm tra ven kỹ trước khi tiêm máy áp lực cao (18G/20G), cố định đường truyền chắc chắn.");
    }
    if (isMRI) {
      criticalAlerts.push("⛔ TUYỆT ĐỐI CẤM ZONE IV: Không mang máy tạo nhịp tim cũ (Non-MR Conditional), clip phình mạch não kim loại từ tính hoặc dị vật hốc mắt kim loại.");
      criticalAlerts.push("⚠️ AN TOÀN SÓNG CAO TẦN (SAR): Giám sát công suất hấp thụ riêng SAR <= 2.0 W/kg, tránh tạo vòng khép kín dây dẫn gây bỏng RF.");
    }

    if (criticalAlerts.length > 0) {
      html +=
        '<div class="clinical-alert-box danger">' +
          '<div class="alert-header-row">' +
            '<span class="alert-pulse-icon">🚨</span>' +
            '<span class="alert-title-text">CẢNH BÁO AN TOÀN LÂM SÀNG & CHỐNG CHỈ ĐỊNH QUAN TRỌNG:</span>' +
            '<span class="alert-tag danger">BẮT BUỘC TUÂN THỦ</span>' +
          '</div>' +
          '<div class="alert-body-content">' +
            '<ul>';
      criticalAlerts.forEach(function (al) {
        html += '<li>' + esc(al) + '</li>';
      });
      html +=
            '</ul>' +
          '</div>' +
        '</div>';
    }

    // =========================================================================
    // PHẦN 1: ĐỊNH NGHĨA KỸ THUẬT & NGUYÊN LÝ TẠO ẢNH (WIKIRADIOLOGY KTV 3 MIỀN)
    // =========================================================================
    html +=
      '<div class="learning-step-card step-1">' +
        '<div class="step-badge-title">' +
          '<span class="num">1</span>' +
          '<h3>ĐỊNH NGHĨA & NGUYÊN LÝ TẠO ẢNH (WIKIRADIOLOGY KTV 3 MIỀN)</h3>' +
        '</div>' +
        '<div class="step-card-body">' +
          '<div style="margin-bottom:12px;">' +
            '<b style="color:var(--brand);font-size:14px;display:block;margin-bottom:4px;">📖 Định nghĩa kỹ thuật:</b>' +
            '<p style="margin:0;font-size:13.5px;line-height:1.55;color:var(--text);">' +
              (item.dinhNghia ? esc(item.dinhNghia) :
              ('Kỹ thuật <b>' + esc(item.ten) + '</b> là quy trình thăm khám chẩn đoán hình ảnh chuyên sâu thuộc phân hệ <b>' + esc(item.modality) + '</b> của vùng <b>' + esc(item.nhom || "khảo sát") + '</b> tại Bệnh viện Vĩnh Phúc VPI. Kỹ thuật cung cấp các hình ảnh giải phẫu không gian 2D và thể tích 3D chi tiết phục vụ phát hiện tổn thương, phân độ giai đoạn bệnh lý và định hướng phác đồ điều trị can thiệp - ngoại khoa.')) +
            '</p>' +
          '</div>' +
          '<div style="padding:10px 12px;background:var(--surface-2);border-radius:8px;border-left:3px solid var(--brand);">' +
            '<b style="color:var(--brand-dark);font-size:13.5px;display:block;margin-bottom:4px;">🔬 Cơ sở vật lý & Nguyên lý tạo ảnh (' + esc(item.modality) + '):</b>' +
            '<p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:var(--text-soft);">' +
              (modPrinciple ? esc(modPrinciple.nguyenLyVatLy) : 'Phương pháp ghi nhận tín hiệu dựa trên nguyên lý vật lý bức xạ / từ trường.') +
            '</p>' +
            '<div style="font-size:12px;color:var(--text-muted);">' +
              '<i>Nguồn chuẩn hóa: Wikiradiology - Kỹ Thuật Viên 3 Miền (wikirad.ktv3mien.com) & Bài giảng PPTX KTV (exam.ktv3mien.com/pptx)</i>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // =========================================================================
    // PHẦN 2: THÔNG SỐ KỸ THUẬT & CẤU HÌNH MÁY (GE SIGNA EXPLORER VPI & SIEMENS ACADEMY)
    // =========================================================================
    html +=
      '<div class="learning-step-card step-2">' +
        '<div class="step-badge-title">' +
          '<span class="num">2</span>' +
          '<h3>THÔNG SỐ KỸ THUẬT & CẤU HÌNH MÁY (GE SIGNA EXPLORER VPI & SIEMENS)</h3>' +
        '</div>' +
        '<div class="step-card-body">';

    // Chips thông số nổi bật
    if (item.thongSo && item.thongSo.length > 0) {
      html += '<div class="quick-chips-grid" style="margin:0 0 14px;">';
      item.thongSo.forEach(function (ts) {
        html +=
          '<div class="param-chip">' +
            '<span class="label">' + esc(ts.ten) + '</span>' +
            '<span class="val">' + esc(ts.giaTri) + '</span>' +
          '</div>';
      });
      html += '</div>';
    }

    // Nếu là MRI: Bổ sung cấu hình độc quyền GE SIGNA™ Explorer 1.5T tại Bệnh viện Vĩnh Phúc VPI
    if (isMRI) {
      // Xác định coil phù hợp
      var recommendedCoil = "Head-Neck 16-Channel Coil";
      var nhomLower = (item.nhom || "").toLowerCase();
      var tenLower = item.ten.toLowerCase();
      if (nhomLower.indexOf("gối") !== -1 || tenLower.indexOf("gối") !== -1) recommendedCoil = "Dedicated HD Knee 8-Channel Coil (GE SIGNA™ Explorer VPI)";
      else if (nhomLower.indexOf("vai") !== -1 || tenLower.indexOf("vai") !== -1) recommendedCoil = "Dedicated Shoulder 8-Channel Coil (GE SIGNA™ Explorer VPI)";
      else if (nhomLower.indexOf("cột sống") !== -1 || tenLower.indexOf("cột sống") !== -1) recommendedCoil = "Integrated Spine Matrix Coil + Head-Neck Coil";
      else if (nhomLower.indexOf("bụng") !== -1 || nhomLower.indexOf("chậu") !== -1 || tenLower.indexOf("gan") !== -1 || tenLower.indexOf("tụy") !== -1 || tenLower.indexOf("tiền liệt") !== -1) recommendedCoil = "Body / Torso Array 16-Channel Coil (GE SIGNA™ Explorer VPI)";

      html +=
        '<div class="ge-vpi-box">' +
          '<div class="ge-vpi-header">' +
            '<div class="ge-vpi-title">🧲 CẤU HÌNH MÁY GE SIGNA™ EXPLORER 1.5T — BỆNH VIỆN VĨNH PHÚC VPI</div>' +
            '<button type="button" onclick="window.VUDAT_APP.showGeSignaModal()" style="font-size:12px;color:#0e7490;font-weight:700;background:none;border:none;cursor:pointer;text-decoration:underline;">Xem Cẩm Nang Chi Tiết ↗</button>' +
          '</div>' +
          '<div style="font-size:13px;line-height:1.5;color:var(--text);">' +
            '<div>• <b>Cuộn thu (Coil) chuyên dụng:</b> ' + esc(recommendedCoil) + '</div>' +
            '<div>• <b>Hệ thống Gradient & RF:</b> OpTix Optical RF 16-channel, Gradient 33 mT/m, Slew Rate 120 T/m/s.</div>' +
            '<div>• <b>Công nghệ GE SIGNA™ Explorer tối ưu cho kỹ thuật này:</b></div>' +
          '</div>' +
          '<div class="ge-tech-pills">' +
            ((nhomLower.indexOf("sọ") !== -1 || tenLower.indexOf("não") !== -1) ?
              '<span class="ge-tech-pill">⚡ Ready Brain (Auto-alignment)</span>' +
              '<span class="ge-tech-pill">🔄 PROPELLER T2/FLAIR (Chống rung)</span>' +
              '<span class="ge-tech-pill">🧊 3D BRAVO (T1 giải phẫu mỏng)</span>' +
              '<span class="ge-tech-pill">🌊 Inhance 3D MRA (Mạch não không tiêm)</span>' : '') +
            ((nhomLower.indexOf("cột sống") !== -1 || tenLower.indexOf("cột sống") !== -1) ?
              '<span class="ge-tech-pill">🔄 PROPELLER T2 Sagittal</span>' +
              '<span class="ge-tech-pill">✨ IDEAL (Tách mỡ nước đồng nhất)</span>' +
              '<span class="ge-tech-pill">🛡️ MAVRIC SL (Chống xảo ảnh nẹp vít)</span>' : '') +
            ((nhomLower.indexOf("chi") !== -1 || nhomLower.indexOf("khớp") !== -1 || tenLower.indexOf("gối") !== -1 || tenLower.indexOf("vai") !== -1) ?
              '<span class="ge-tech-pill">📐 3D CUBE PD FS (Thể tích đa bình diện)</span>' +
              '<span class="ge-tech-pill">🔍 CartiGram (Bản đồ T2 sụn khớp)</span>' +
              '<span class="ge-tech-pill">🛡️ MAVRIC SL (Quanh kim loại khớp)</span>' : '') +
            ((nhomLower.indexOf("bụng") !== -1 || nhomLower.indexOf("chậu") !== -1 || tenLower.indexOf("gan") !== -1 || tenLower.indexOf("mrcp") !== -1) ?
              '<span class="ge-tech-pill">⏱️ LAVA-Flex (Động học gan 14s nín thở)</span>' +
              '<span class="ge-tech-pill">🌊 MRCP 3D CUBE (Tái tạo đường mật)</span>' +
              '<span class="ge-tech-pill">🎯 FOCUS DWI (Khuếch tán khu trú)</span>' : '') +
            '<span class="ge-tech-pill">🔇 Silent Scan (Giảm tiếng ồn)</span>' +
          '</div>' +
        '</div>';
    }

    // Nếu là MRI và có đối chiếu 3 hãng (Siemens, Philips, GE)
    if (mriMasterPlan && mriMasterPlan.thongSoVanHanh3Hang) {
      var ts3 = mriMasterPlan.thongSoVanHanh3Hang;
      html +=
        '<div style="margin-top:10px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
            '<b style="font-size:13.5px;color:var(--c-mri);">⚙️ Bảng đối chiếu thông số 3 hãng (Siemens Healthineers • Philips • GE Healthcare):</b>' +
            '<a href="https://academy.siemens-healthineers.com/vi-vn" target="_blank" rel="noopener" style="font-size:12px;color:var(--c-mri);font-weight:700;text-decoration:none;">Siemens Academy ↗</a>' +
          '</div>' +
          '<div class="ref-table-wrap">' +
            '<table class="ref-table">' +
              '<thead><tr><th>Thông số kỹ thuật</th><th>Siemens Healthineers (Syngo)</th><th>Philips (Achieva/Ingenia)</th><th>GE SIGNA™ Explorer (BV Vĩnh Phúc)</th></tr></thead>' +
              '<tbody>';
      (ts3.bangThongSo || []).forEach(function (row) {
        html += '<tr><td><b>' + esc(row.thongSo) + '</b></td><td>' + esc(row.siemens) + '</td><td>' + esc(row.philips) + '</td><td style="color:#0e7490;font-weight:700;">' + esc(row.ge) + '</td></tr>';
      });
      html += '</tbody></table></div></div>';
    }

    // An toàn bức xạ / An toàn từ trường
    html +=
      '<div style="margin-top:10px;padding:8px 12px;background:var(--surface-2);border-radius:6px;font-size:12.5px;color:var(--text-soft);">' +
        '🛡️ <b>An toàn vận hành:</b> ' +
        (isMRI ? 'Kiểm tra dị vật kim loại, máy tạo nhịp trước Zone IV. Giám sát SAR <= 2.0 W/kg. Sử dụng tai nghe/nút tai chống ồn.' : 'Tuân thủ nghiêm ngặt nguyên lý ALARA, che chắn tuyến giáp và tuyến sinh dục bằng áo chì. Kiểm soát chỉ số liều CTDIvol & DLP.') +
      '</div>';

    html += '</div></div>';

    // =========================================================================
    // PHẦN 3: CHỈ ĐỊNH LÂM SÀNG & ỨNG DỤNG CHUYÊN SÂU
    // =========================================================================
    html +=
      '<div class="learning-step-card step-3">' +
        '<div class="step-badge-title">' +
          '<span class="num">3</span>' +
          '<h3>CHỈ ĐỊNH LÂM SÀNG & ỨNG DỤNG CHUYÊN SÂU</h3>' +
        '</div>' +
        '<div class="step-card-body">';

    var p1Found = false;
    (item.noiDung || []).forEach(function (sec) {
      var t = sec.tieuDe.toLowerCase();
      if (t.indexOf("chỉ định") !== -1 || t.indexOf("chống chỉ định") !== -1 || t.indexOf("chuẩn bị") !== -1 || t.indexOf("mục đích") !== -1 || t.indexOf("vai trò") !== -1) {
        p1Found = true;
        html += '<h4 style="margin:10px 0 4px;color:var(--brand);font-size:14px;">' + esc(sec.tieuDe) + '</h4>';
        if (sec.bang && sec.bang.cols && sec.bang.rows) {
          html += '<div class="ref-table-wrap"><table class="ref-table"><thead><tr>';
          sec.bang.cols.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
          html += '</tr></thead><tbody>';
          sec.bang.rows.forEach(function (r) {
            html += '<tr>';
            r.forEach(function (cell) { html += '<td>' + esc(cell) + '</td>'; });
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        } else if (sec.items) {
          html += '<ul>';
          (sec.items || []).forEach(function (li) { html += '<li>' + esc(li) + '</li>'; });
          html += '</ul>';
        }
      }
    });

    if (!p1Found) {
      html +=
        '<p style="margin:0;font-size:13.5px;color:var(--text);">' +
          'Kỹ thuật được chỉ định rộng rãi trong chẩn đoán, đánh giá giai đoạn và theo dõi sau điều trị các bệnh lý viêm, chấn thương, thoái hóa, dị tật và u tân sinh thuộc vùng <b>' + esc(item.nhom || "khảo sát") + '</b>.' +
        '</p>';
    }
    html += '</div></div>';

    // =========================================================================
    // PHẦN 4: QUY TRÌNH THỰC HÀNH, HƯỚNG ĐẶT LÁT CẮT & TIÊU CHUẨN HÌNH ẢNH
    // =========================================================================
    html +=
      '<div class="learning-step-card step-4">' +
        '<div class="step-badge-title">' +
          '<span class="num">4</span>' +
          '<h3>' + (isMRI ? 'QUY TRÌNH KỸ THUẬT & HƯỚNG ĐẶT LÁT CẮT (SLICE PLANNING)' : 'QUY TRÌNH KỸ THUẬT CHỤP & TƯ THẾ') + '</h3>' +
        '</div>' +
        '<div class="step-card-body">';

    // Nếu là MRI: Hiển thị Hướng đặt lát cắt chuẩn MRI Master theo Axial, Sagittal, Coronal
    if (mriMasterPlan && mriMasterPlan.huongDatCat) {
      html +=
        '<div style="margin-bottom:14px;padding:12px;border-radius:8px;background:var(--c-mri-wash);border:1px solid var(--c-mri-border);">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
            '<b style="color:var(--c-mri);font-size:14px;">📐 Định hướng mặt phẳng lát cắt (Nguồn: mrimaster.com & GE Healthcare VPI):</b>' +
            '<a href="https://mrimaster.com/planning/" target="_blank" rel="noopener" style="color:var(--c-mri);font-weight:700;font-size:12px;text-decoration:none;">Xem mrimaster.com ↗</a>' +
          '</div>' +
          '<div class="mri-plan-grid">';

      mriMasterPlan.huongDatCat.forEach(function (h) {
        html +=
          '<div class="mri-plan-card">' +
            '<div class="plane-name"><span>🔹</span><b>Mặt phẳng ' + esc(h.matPhang) + '</b></div>' +
            '<p class="rule"><b>Nguyên tắc:</b> ' + esc(h.nguyenTac) + '</p>' +
            '<p class="rule" style="color:var(--text-soft);"><b>Phạm vi:</b> ' + esc(h.phamVi) + '</p>' +
            (h.chongXaoAnh ? '<p class="rule" style="color:var(--brand);"><b>Chống xảo ảnh:</b> ' + esc(h.chongXaoAnh) + '</p>' : '') +
            '<div class="landmarks">📍 <b>Mốc giải phẫu:</b> ' + esc(h.soDoGiaiPhau) + '</div>' +
          '</div>';
      });

      html += '</div></div>';
    }

    // Các mục nội dung kỹ thuật chụp
    (item.noiDung || []).forEach(function (sec) {
      var t = sec.tieuDe.toLowerCase();
      if (t.indexOf("chỉ định") === -1 && t.indexOf("chống chỉ định") === -1 && t.indexOf("chuẩn bị") === -1 && t.indexOf("mục đích") === -1 && t.indexOf("vai trò") === -1) {
        html += '<h4 style="margin:12px 0 6px;color:var(--brand-dark);font-size:14px;">' + esc(sec.tieuDe) + '</h4>';
        if (sec.bang && sec.bang.cols && sec.bang.rows) {
          html += '<div class="ref-table-wrap"><table class="ref-table"><thead><tr>';
          sec.bang.cols.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
          html += '</tr></thead><tbody>';
          sec.bang.rows.forEach(function (r) {
            html += '<tr>';
            r.forEach(function (cell) { html += '<td>' + esc(cell) + '</td>'; });
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        } else if (sec.items) {
          html += '<ul>';
          (sec.items || []).forEach(function (li) { html += '<li>' + esc(li) + '</li>'; });
          html += '</ul>';
        }
      }
    });

    // TIÊU CHUẨN CHẤT LƯỢNG HÌNH ẢNH & XẢO ẢNH THƯỜNG GẶP (WIKIRADIOLOGY KTV 3 MIỀN)
    if (modPrinciple) {
      html +=
        '<div class="quality-standards-box">' +
          '<b style="color:var(--ok);font-size:13.5px;display:block;margin-bottom:4px;">✨ Tiêu chuẩn đánh giá hình ảnh đạt yêu cầu (Wikiradiology KTV 3 Miền):</b>' +
          '<p style="margin:0 0 10px;font-size:13px;line-height:1.5;color:var(--text);">' + esc(modPrinciple.tieuChuanChatLuong) + '</p>' +
          '<b style="color:var(--danger);font-size:13.5px;display:block;margin-bottom:6px;">⚠️ Xảo ảnh (Artifacts) thường gặp & Cách khắc phục:</b>' +
          '<div class="artifact-list-wrap">';
      (modPrinciple.xaoAnhThuongGap || []).forEach(function (art) {
        html +=
          '<div class="artifact-item-card">' +
            '<b>• ' + esc(art.ten) + '</b>' +
            '<div><i>Nguyên nhân:</i> ' + esc(art.nguyenNhan) + '</div>' +
            '<div style="color:var(--ok);margin-top:2px;"><i>Khắc phục:</i> ' + esc(art.khacPhuc) + '</div>' +
          '</div>';
      });
      html += '</div></div>';
    }

    html += '</div></div>';

    // =========================================================================
    // PHẦN 5: BẢNG KIỂM THỰC HÀNH LÂM SÀNG (CHECKLIST AN TOÀN)
    // =========================================================================
    if (checklist) {
      var checklistKey = "ct_chk_" + item.id;
      var savedChecks = appState.checklistProgress[checklistKey] || [];

      html +=
        '<div class="learning-step-card step-4" style="border-color:var(--brand);">' +
          '<div class="step-badge-title" style="background:var(--brand-wash);color:var(--brand-dark);">' +
            '<span class="num" style="background:var(--brand);color:#fff;">5</span>' +
            '<h3>BẢNG KIỂM THỰC HÀNH AN TOÀN (' + esc(checklist.ten) + ')</h3>' +
            '<span class="chk-counter-badge" id="chkCounter_' + item.id + '">' + savedChecks.length + ' / ' + checklist.cacBuoc.length + '</span>' +
          '</div>' +
          '<div class="step-card-body" style="padding:0;">' +
            '<div class="checklist-body">';

      checklist.cacBuoc.forEach(function (b, idx) {
        var isChecked = savedChecks.indexOf(idx) !== -1;
        html +=
          '<label class="checklist-step' + (isChecked ? ' checked' : '') + '" id="chkRow_' + item.id + '_' + idx + '">' +
            '<input type="checkbox" onchange="window.VUDAT_APP.toggleChecklistInline(\'' + item.id + '\', ' + idx + ', this.checked)"' + (isChecked ? ' checked' : '') + '>' +
            '<div style="flex:1;">' +
              '<span class="t">Bước ' + b.buoc + ': ' + esc(b.tieuDe) + '</span>' +
              '<span class="desc">' + esc(b.noiDung) + '</span>' +
            '</div>' +
          '</label>';
      });

      html +=
            '</div>' +
          '</div>' +
        '</div>';
    }

    // Khung đánh dấu hoàn thành bài học (không khóa!)
    html += renderLMSUnlockBox(item.id, item.ten);
    html += mobBars.bottom;

    mainPanel.innerHTML = html;

    // Render cột phải: Hình ảnh tư thế chụp & Sơ đồ giải phẫu
    if (rightPanel) {
      renderImagesSidebar(item.hinhAnh, rightPanel, isXray ? "Hình ảnh Tư thế chụp & Phim chuẩn" : (isMRI ? "Định hướng Lát cắt & Giải phẫu" : "Hình ảnh minh họa kỹ thuật"), item);
    }
  }

  /* Render Siêu âm */
  function renderUltrasoundDetail(item, mainPanel, rightPanel) {
    var mobBars = getMobileNavBarsHtml(item.id);

    var html =
      mobBars.top +
      '<div class="detail-header">' +
        '<div class="badges">' +
          '<span class="badge-mod" style="background:var(--c-us-wash);color:var(--c-us-dark);border-color:var(--c-us-border);">Siêu âm</span>' +
          '<span class="badge-mod">' + esc(item.nhom) + '</span>' +
          '<span class="badge-mod">Bệnh viện Vĩnh Phúc VPI</span>' +
        '</div>' +
        '<h2>' + esc(item.ten) + '</h2>' +
      '</div>';

    // Cảnh báo lâm sàng siêu âm
    html +=
      '<div class="clinical-alert-box warning">' +
        '<div class="alert-header-row">' +
          '<span class="alert-pulse-icon">⚠️</span>' +
          '<span class="alert-title-text">LƯU Ý LÂM SÀNG & CHUẨN HÓA TIÊU CHUẨN ĐÁNH GIÁ:</span>' +
          '<span class="alert-tag warn">BẮT BUỘC ĐỐI CHIẾU</span>' +
        '</div>' +
        '<div class="alert-body-content">' +
          '<ul>' +
            '<li><b>Chuẩn bị người bệnh:</b> Nhịn ăn ít nhất 6 tiếng trước siêu âm gan mật/tụy; uống nước nhịn tiểu căng bàng quang trước siêu âm tiểu khung/tiền liệt tuyến.</li>' +
            '<li><b>Chuẩn hóa phân độ RADS:</b> Bắt buộc đối chiếu tiêu chuẩn ACR TI-RADS (tuyến giáp) và ACR BI-RADS (tuyến vú) để tránh bỏ sót ung thư giai đoạn sớm.</li>' +
          '</ul>' +
        '</div>' +
      '</div>';

    // 1. Thông số & Đầu dò (Lên đầu tiên)
    html +=
      '<div class="learning-step-card step-2">' +
        '<div class="step-badge-title"><span class="num">1</span><h3>THÔNG SỐ ĐẦU DÒ & AN TOÀN</h3></div>' +
        '<div class="step-card-body">' +
          '<p>• <b>Đầu dò khuyến cáo:</b> ' + esc(item.dauDo) + '</p>' +
          (item.chuanBi ? '<p>• <b>Chuẩn bị người bệnh:</b> ' + esc(item.chuanBi) + '</p>' : '') +
        '</div>' +
      '</div>';

    // 2. Quy trình mặt cắt
    html +=
      '<div class="learning-step-card step-3">' +
        '<div class="step-badge-title"><span class="num">2</span><h3>QUY TRÌNH CÁC MẶT CẮT GIẢI PHẪU CHUẨN</h3></div>' +
        '<div class="step-card-body">';
    (item.cacMatCatChuan || []).forEach(function (mc) {
      html +=
        '<div style="margin-bottom:14px;padding:12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);">' +
          '<b style="font-size:14.5px;color:var(--c-us);display:block;margin-bottom:4px;">' + esc(mc.ten) + '</b>' +
          '<div style="font-size:13.5px;line-height:1.55;white-space:pre-line;">' + esc(mc.moTa) + '</div>' +
        '</div>';
    });
    html += '</div></div>';

    html += renderLMSUnlockBox(item.id, item.ten);
    html += mobBars.bottom;
    mainPanel.innerHTML = html;

    if (rightPanel) {
      rightPanel.innerHTML =
        '<div class="gallery-header">Tiêu Chuẩn Mặt Cắt Chuẩn</div>' +
        '<div class="gallery-body" style="font-size:13px;line-height:1.5;">' +
          '<p>• Đặt trường nhìn (Depth) phù hợp, điểm hội tụ (Focus) ngang tầm tổn thương.</p>' +
          '<p>• Đo kích thước trên 2 mặt phẳng vuông góc (Dài x Rộng x Cao).</p>' +
        '</div>';
    }
  }

  /* Render Siêu âm can thiệp */
  function renderInterventionalDetail(item, mainPanel, rightPanel) {
    var mobBars = getMobileNavBarsHtml(item.id);

    var html =
      mobBars.top +
      '<div class="detail-header">' +
        '<div class="badges">' +
          '<span class="badge-mod" style="background:var(--c-canthiep-wash);color:var(--c-canthiep-dark);border-color:var(--c-canthiep-border);">Can thiệp</span>' +
          '<span class="badge-mod">Bệnh viện Vĩnh Phúc VPI</span>' +
        '</div>' +
        '<h2>' + esc(item.ten) + '</h2>' +
      '</div>';

    // Cảnh báo an toàn can thiệp
    html +=
      '<div class="clinical-alert-box danger">' +
        '<div class="alert-header-row">' +
          '<span class="alert-pulse-icon">🚨</span>' +
          '<span class="alert-title-text">CẢNH BÁO AN TOÀN CAN THIỆP & NGUY CƠ XUẤT HUYẾT:</span>' +
          '<span class="alert-tag danger">BẮT BUỘC KIỂM TRA ĐÔNG MÁU</span>' +
        '</div>' +
        '<div class="alert-body-content">' +
          '<ul>' +
            '<li><b>Chống chỉ định tuyệt đối:</b> Bệnh nhân rối loạn đông máu nặng (Tiểu cầu < 50.000/mm³, INR > 1.5, TQ < 50%).</li>' +
            '<li><b>Kiểm soát mạch máu Doppler:</b> Bắt buộc quét Doppler màu trước khi đâm kim để tránh chọc vào mạch máu lớn hoặc tạng lân cận.</li>' +
            '<li><b>Vô khuẩn ngoại khoa:</b> Bọc đầu dò vô khuẩn, sát khuẩn da 3 bước bằng Povidone Iodine 10%.</li>' +
          '</ul>' +
        '</div>' +
      '</div>';

    // 1. Dụng cụ & An toàn
    // dungCu có thể là mảng hoặc chuỗi phân tách bằng dấu phẩy (bỏ qua dấu phẩy nằm trong ngoặc)
    var dungCuList = Array.isArray(item.dungCu) ? item.dungCu :
      (item.dungCu ? String(item.dungCu).split(/,\s*(?![^()]*\))/).map(function (s) { return s.trim(); }).filter(Boolean) : []);
    html +=
      '<div class="learning-step-card step-2">' +
        '<div class="step-badge-title"><span class="num">1</span><h3>DỤNG CỤ, VÔ TRÙNG & CHUẨN BỊ</h3></div>' +
        '<div class="step-card-body">' +
          (dungCuList.length ? '<b>Dụng cụ can thiệp:</b><ul>' + dungCuList.map(function(d){ return '<li>'+esc(d)+'</li>'; }).join('') + '</ul>' : '') +
        '</div>' +
      '</div>';

    // 2. Kỹ thuật — dữ liệu dùng "cacBuoc" [{buoc, tieuDe, noiDung}]; giữ tương thích "quyTrinh" (mảng chuỗi)
    var stepsHtml = '';
    if (Array.isArray(item.cacBuoc) && item.cacBuoc.length) {
      stepsHtml = '<ol>' + item.cacBuoc.map(function (s) {
        return '<li style="margin-bottom:10px;"><b>' + esc(s.tieuDe || '') + '</b>' +
          '<div style="white-space:pre-line;margin-top:4px;">' + esc(s.noiDung || '') + '</div></li>';
      }).join('') + '</ol>';
    } else if (Array.isArray(item.quyTrinh)) {
      stepsHtml = '<ol>' + item.quyTrinh.map(function(q){ return '<li style="margin-bottom:6px;">'+esc(q)+'</li>'; }).join('') + '</ol>';
    }
    html +=
      '<div class="learning-step-card step-3">' +
        '<div class="step-badge-title"><span class="num">2</span><h3>QUY TRÌNH THỦ THUẬT CAN THIỆP</h3></div>' +
        '<div class="step-card-body">' + stepsHtml + '</div>' +
      '</div>';

    html += renderLMSUnlockBox(item.id, item.ten);
    html += mobBars.bottom;
    mainPanel.innerHTML = html;

    if (rightPanel) {
      rightPanel.innerHTML =
        '<div class="gallery-header">An Toàn Can Thiệp VPI</div>' +
        '<div class="gallery-body" style="font-size:13px;line-height:1.5;">' +
          '<p>• Luôn kiểm tra xét nghiệm đông máu (Tiểu cầu >= 50.000, INR <= 1.5).</p>' +
          '<p>• Kiểm tra Doppler màu tránh đâm xuyên mạch máu lớn.</p>' +
          '<p>• Sẵn sàng thuốc cấp cứu sốc phản xạ phế vị (Atropin 0.5mg).</p>' +
        '</div>';
    }
  }

  /* Render Đo loãng xương (DEXA) */
  function renderDEXADetail(sectionId, mainPanel, rightPanel) {
    var d = window.SOTAY_DOLOANGXUONG;
    var mobBars = getMobileNavBarsHtml(sectionId);

    var html =
      mobBars.top +
      '<div class="detail-header">' +
        '<div class="badges">' +
          '<span class="badge-mod" style="background:var(--c-dlx-wash);color:var(--c-dlx-dark);border-color:var(--c-dlx-border);">TDCN: Đo Loãng Xương</span>' +
          '<span class="badge-mod">Bệnh viện Vĩnh Phúc VPI</span>' +
        '</div>' +
        '<h2>' + esc(d.thongTinChung.tenKyThuat) + '</h2>' +
      '</div>';

    if (sectionId === "dlx-nguyen-ly") {
      html +=
        '<div class="learning-step-card step-2"><div class="step-badge-title"><span class="num">1</span><h3>THIẾT BỊ & THÔNG SỐ AN TOÀN</h3></div><div class="step-card-body">' +
          '<p>• <b>Thiết bị:</b> ' + esc(d.thongTinChung.thietBi) + ' • <b>Liều bức xạ:</b> ' + esc(d.thongTinChung.lieuBucXa) + '</p>' +
        '</div></div>' +
        '<div class="learning-step-card step-1"><div class="step-badge-title"><span class="num">2</span><h3>NGUYÊN LÝ VẬT LÝ & CHỈ ĐỊNH</h3></div><div class="step-card-body">' +
          '<p style="font-size:13.5px;line-height:1.6;">' + esc(d.thongTinChung.nguyenLy) + '</p>' +
          '<b>Chỉ định ISCD & Bộ Y tế:</b><ul>' + d.chiDinhChongChiDinh.chiDinh.map(function(c){ return '<li>'+esc(c)+'</li>'; }).join('') + '</ul>' +
        '</div></div>';
    } else if (sectionId === "dlx-tu-the-roi") {
      html += '<div class="learning-step-card step-3"><div class="step-badge-title"><span class="num">3</span><h3>QUY TRÌNH ĐẶT TƯ THẾ & VÙNG QUAN TÂM (ROI)</h3></div><div class="step-card-body">';
      d.quyTrinhDatTuTheVaRoi.forEach(function (r) {
        html +=
          '<div style="margin-bottom:14px;padding:12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);">' +
            '<b style="font-size:14.5px;color:var(--c-dlx);display:block;margin-bottom:4px;">' + esc(r.viTri) + '</b>' +
            '<p style="margin:0 0 6px;font-size:13px;"><b>Tư thế:</b> ' + esc(r.tuThe) + '</p>' +
            '<div style="font-size:13px;line-height:1.5;white-space:pre-line;color:var(--text-soft);">' + esc(r.phanTichRoi) + '</div>' +
          '</div>';
      });
      html += '</div></div>';
    } else {
      html +=
        '<div class="learning-step-card step-4"><div class="step-badge-title"><span class="num">4</span><h3>TIÊU CHUẨN WHO & ĐÁNH GIÁ NGUY CƠ GÃY XƯƠNG</h3></div><div class="step-card-body">' +
          '<div class="ref-table-wrap"><table class="ref-table"><thead><tr><th>Phân loại</th><th>Ngưỡng T-score</th><th>Ý nghĩa lâm sàng</th></tr></thead><tbody>';
      d.tieuChuanChanDoanWHO.bangPhanLoaiWHO.forEach(function (w) {
        html += '<tr><td><b>' + esc(w.phanLoai) + '</b></td><td style="color:var(--c-dlx);font-weight:700;">' + esc(w.tScore) + '</td><td>' + esc(w.yNghia) + '</td></tr>';
      });
      html += '</tbody></table></div></div></div>';
    }

    html += renderLMSUnlockBox(sectionId, "Đo Loãng Xương DEXA");
    html += mobBars.bottom;
    mainPanel.innerHTML = html;

    if (rightPanel) {
      rightPanel.innerHTML =
        '<div class="gallery-header">Tóm Tắt T-Score WHO</div>' +
        '<div class="gallery-body" style="font-size:13px;">' +
          '<p style="color:var(--ok);font-weight:700;">• Bình thường: T >= -1.0 SD</p>' +
          '<p style="color:var(--warn);font-weight:700;">• Thiếu xương: -2.5 < T < -1.0</p>' +
          '<p style="color:var(--danger);font-weight:700;">• Loãng xương: T <= -2.5 SD</p>' +
        '</div>';
    }
  }

  /* Render Thuốc cản quang — YÊU CẦU #9: BỔ SUNG HÌNH ẢNH MINH HỌA BAO BÌ CHAI/LỌ */
  function renderContrastDetail(sectionId, mainPanel, rightPanel) {
    var cq = window.SOTAY_THUOCCANQUANG;
    var mobBars = getMobileNavBarsHtml(sectionId);

    var html =
      mobBars.top +
      '<div class="detail-header">' +
        '<div class="badges">' +
          '<span class="badge-mod" style="background:var(--c-cq-wash);color:var(--c-cq-dark);border-color:var(--c-cq-border);">Dược thư CĐHA</span>' +
          '<span class="badge-mod">Bệnh viện Vĩnh Phúc VPI</span>' +
        '</div>' +
        '<h2>Dược Lý & An Toàn Thuốc Cản Quang</h2>' +
      '</div>';

    if (sectionId === "cq-ct-catalog") {
      html += '<div class="content-section"><h3>💊 CÁC DÒNG THUỐC CẢN QUANG CT (KÈM HÌNH ẢNH BAO BÌ)</h3>';
      cq.thuocCT.forEach(function (t) {
        var svgBottle = cq.getBottleSvg ? cq.getBottleSvg(t) : "";
        html +=
          '<div class="contrast-drug-card">' +
            '<div class="contrast-visual-box">' + svgBottle + '</div>' +
            '<div class="contrast-meta-info">' +
              '<b style="font-size:15px;color:var(--c-cq);display:block;margin-bottom:4px;">' + esc(t.tenThuongMai) + ' (' + esc(t.hoatChat) + ') — ' + esc(t.hangSanXuat) + '</b>' +
              '<p style="margin:2px 0 6px;font-size:12.5px;"><b>Nồng độ:</b> ' + esc(t.nongDo) + ' • <b>Quy cách:</b> ' + esc(t.quyCach) + ' • <b>Áp lực:</b> ' + esc(t.apLucThamThau) + '</p>' +
              '<p style="margin:2px 0 6px;font-size:12.5px;">' +
                (t.cauTruc ? '<b>Cấu trúc:</b> ' + esc(t.cauTruc) : '') +
                (t.doNhot ? ' • <b>Độ nhớt:</b> ' + esc(t.doNhot) : '') +
                (t.loaiBaoBi ? ' • <b>Bao bì:</b> ' + esc(t.loaiBaoBi) : '') +
              '</p>' +
              '<p style="margin:0;font-size:12px;color:var(--text-soft);line-height:1.45;">' + esc(t.dacDiemLamSang) + '</p>' +
            '</div>' +
          '</div>';
      });
      html += '</div>';
    } else if (sectionId === "cq-mri-catalog") {
      html += '<div class="content-section"><h3>🧲 CÁC DÒNG THUỐC ĐỐI QUANG TỪ MRI (KÈM HÌNH ẢNH BƠM TIÊM/LỌ)</h3>';
      cq.thuocMRI.forEach(function (m) {
        var svgBottle = cq.getBottleSvg ? cq.getBottleSvg(m) : "";
        html +=
          '<div class="contrast-drug-card">' +
            '<div class="contrast-visual-box">' + svgBottle + '</div>' +
            '<div class="contrast-meta-info">' +
              '<b style="font-size:15px;color:var(--c-mri);display:block;margin-bottom:4px;">' + esc(m.tenThuongMai) + ' (' + esc(m.hoatChat) + ') — ' + esc(m.hangSanXuat) + '</b>' +
              '<p style="margin:2px 0 6px;font-size:12.5px;"><b>Cấu trúc:</b> ' + esc(m.cauTruc) + ' • <b>An toàn NSF:</b> <span style="color:var(--ok);font-weight:700;">' + esc(m.anToanNSF) + '</span></p>' +
              '<p style="margin:2px 0 6px;font-size:12.5px;">' +
                (m.nongDo ? '<b>Nồng độ:</b> ' + esc(m.nongDo) : '') +
                (m.quyCach ? ' • <b>Quy cách:</b> ' + esc(m.quyCach) : '') +
                (m.doThuThaoTu ? ' • <b>Độ thư thái từ:</b> ' + esc(m.doThuThaoTu) : '') +
                (m.loaiBaoBi ? ' • <b>Bao bì:</b> ' + esc(m.loaiBaoBi) : '') +
              '</p>' +
              '<p style="margin:0;font-size:12px;color:var(--text-soft);line-height:1.45;">' + esc(m.dacDiemLamSang) + '</p>' +
            '</div>' +
          '</div>';
      });
      html += '</div>';
    } else if (sectionId === "cq-an-toan-than") {
      html +=
        '<div class="content-section"><h3>🩺 ĐÁNH GIÁ CHỨC NĂNG THẬN & PHÒNG NGỪA PC-AKI</h3>' +
          '<p style="font-size:13.5px;">' + esc(cq.anToanChucNangThan.dinhNghiaPCAKI) + '</p>' +
          '<div class="ref-table-wrap"><table class="ref-table"><thead><tr><th>Mức eGFR</th><th>Đánh giá nguy cơ</th><th>Khuyến cáo lâm sàng</th></tr></thead><tbody>';
      cq.anToanChucNangThan.nguongDanhGiaEGFR.forEach(function (g) {
        html += '<tr><td><b>' + esc(g.mucEGFR) + '</b></td><td>' + esc(g.danhGia) + '</td><td>' + esc(g.khuyenCao) + '</td></tr>';
      });
      html += '</tbody></table></div></div>';

      var bd = cq.anToanChucNangThan.phacDoBuDichChuan || [];
      if (bd.length) {
        html += '<div class="content-section"><h3>💧 PHÁC ĐỒ BÙ DỊCH DỰ PHÒNG PC-AKI</h3><ul>' +
          bd.map(function (s) { return '<li style="margin-bottom:6px;">' + esc(s) + '</li>'; }).join('') + '</ul></div>';
      }

      var tm = cq.phacDoTienMe;
      if (tm) {
        html += '<div class="content-section"><h3>💊 PHÁC ĐỒ TIỀN MÊ (BỆNH NHÂN CÓ TIỀN SỬ DỊ ỨNG CẢN QUANG)</h3>' +
          '<p style="font-size:13.5px;"><b>Chỉ định:</b> ' + esc(tm.chiDinh || '') + '</p>' +
          ((tm.phacDo13Gio || []).length ? '<b>Phác đồ chuẩn 13 giờ:</b><ul>' + tm.phacDo13Gio.map(function (s) { return '<li style="margin-bottom:6px;">' + esc(s) + '</li>'; }).join('') + '</ul>' : '') +
          ((tm.phacDoKhanCap4Gio || []).length ? '<b>Phác đồ khẩn cấp:</b><ul>' + tm.phacDoKhanCap4Gio.map(function (s) { return '<li style="margin-bottom:6px;">' + esc(s) + '</li>'; }).join('') + '</ul>' : '') +
        '</div>';
      }
    } else {
      html += renderContrastCalculators();
    }

    html += renderLMSUnlockBox(sectionId, "Thuốc Cản Quang & ĐQT");
    html += mobBars.bottom;
    mainPanel.innerHTML = html;

    if (rightPanel) {
      rightPanel.innerHTML =
        '<div class="gallery-header">Quy Tắc Tiêm Thuốc VPI</div>' +
        '<div class="gallery-body" style="font-size:13px;line-height:1.5;">' +
          '<p>• Luôn test ven bằng nước muối sinh lý NaCl 0.9% trước tiêm áp lực cao.</p>' +
          '<p>• Bơm đuổi ít nhất 40-50ml NaCl 0.9% sau thuốc.</p>' +
          '<p>• Lưu kim tĩnh mạch theo dõi người bệnh ít nhất 30 phút sau tiêm.</p>' +
        '</div>';
    }

    setupCalculatorEvents();
  }

  function renderContrastCalculators() {
    var c = window.SOTAY_CONGCU.lieuCanQuang;
    return (
      '<div class="calc-card">' +
        '<h3 style="margin:0 0 12px;color:var(--brand);font-size:17px;">Máy Tính Liều Thuốc Cản Quang CT Thường Quy</h3>' +
        '<div class="calc-form-grid">' +
          '<div class="form-field"><label>Cân nặng (kg)</label><input id="calc_w" type="number" value="60" min="20" max="150"></div>' +
          '<div class="form-field"><label>Loại khảo sát</label><select id="calc_type">' +
            c.loaiKhaoSat.map(function (k, i) { return '<option value="' + i + '">' + esc(k.ten) + ' (' + k.tocDo + ')</option>'; }).join('') +
          '</select></div>' +
          '<div class="form-field"><label>Nồng độ i-ốt</label><select id="calc_conc">' +
            c.nongDo.map(function (v) { return '<option value="' + v + '"' + (v === c.nongDoMacDinh ? ' selected' : '') + '>' + v + ' mgI/ml</option>'; }).join('') +
          '</select></div>' +
        '</div>' +
        '<div class="calc-result-box">' +
          '<div class="item">Thể tích thuốc cản quang: <span class="big" id="res_vol">—</span></div>' +
          '<div class="item">Tốc độ tiêm khuyến nghị: <span class="big" id="res_flow">—</span></div>' +
          '<div class="item">Tổng lượng i-ốt tương ứng: <span class="big" id="res_iod">—</span></div>' +
          '<div class="item">Nước muối sinh lý đuổi: <span class="big">40 – 50 ml</span></div>' +
        '</div>' +
        ((c.luuY || []).length ? '<ul style="font-size:12.5px;color:var(--text-soft);margin:10px 0 0;padding-left:18px;">' + c.luuY.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : '') +
      '</div>' +
      renderCCTACalculator()
    );
  }

  /* Máy tính CCTA theo IDR (dữ liệu & công thức từ SOTAY_CONGCU.lieuCCTA) */
  function renderCCTACalculator() {
    var d = window.SOTAY_CONGCU && window.SOTAY_CONGCU.lieuCCTA;
    if (!d) return '';
    var nk = d.nongDoKhoang || { min: 270, max: 400, buoc: 10 };
    function pair(id, v, lo, hi, step) {
      return '<div style="display:flex;gap:8px;align-items:center;">' +
        '<input id="' + id + '_r" type="range" value="' + v + '" min="' + lo + '" max="' + hi + '" step="' + step + '" style="flex:1;min-width:0;" aria-hidden="true" tabindex="-1">' +
        '<input id="' + id + '" type="number" value="' + v + '" min="' + lo + '" max="' + hi + '" step="' + step + '" inputmode="decimal" style="width:84px;flex:0 0 auto;">' +
      '</div>';
    }
    var chip = 'padding:4px 10px;border-radius:14px;border:1px solid var(--border,#ccc);background:transparent;color:inherit;font-weight:600;cursor:pointer;';
    return (
      '<div class="calc-card" style="margin-top:16px;">' +
        '<h3 style="margin:0 0 12px;color:var(--brand);font-size:17px;">Máy Tính Liều Cản Quang CT Động Mạch Vành (CCTA — WB-IDR)</h3>' +
        '<div class="calc-form-grid">' +
          '<div class="form-field"><label for="ccta_w">Cân nặng (kg)</label>' + pair('ccta_w', d.canNang.macDinh, d.canNang.min, d.canNang.max, 1) + '</div>' +
          '<div class="form-field"><label for="ccta_idr">Hệ số IDR (gI/kg/s)</label>' + pair('ccta_idr', d.idr.macDinh, d.idr.min, d.idr.max, d.idr.buoc || 0.0005) + '</div>' +
          '<div class="form-field"><label for="ccta_conc">Nồng độ i-ốt (mgI/ml)</label>' + pair('ccta_conc', d.nongDoMacDinh, nk.min, nk.max, nk.buoc) +
            '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">' +
              d.nongDo.map(function (v) { return '<button type="button" class="ccta-conc-chip" data-v="' + v + '" style="' + chip + '">' + v + '</button>'; }).join('') +
            '</div></div>' +
          '<div class="form-field"><label for="ccta_t">Thời gian tiêm (giây)</label>' + pair('ccta_t', d.thoiGian.macDinh, d.thoiGian.min, d.thoiGian.max, d.thoiGian.buoc || 0.5) + '</div>' +
        '</div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin:4px 0 10px;font-size:13px;">' +
          '<div style="flex:1;min-width:140px;padding:8px 10px;border-radius:10px;border:1px dashed var(--border,#ccc);">Khuyến nghị mức kV: <b id="ccta_kv" style="font-size:15px;">—</b></div>' +
          '<div style="flex:1;min-width:180px;padding:8px 10px;border-radius:10px;border:1px dashed var(--border,#ccc);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">Gợi ý IDR: <b id="ccta_idr_sug" style="font-size:15px;">—</b> <span id="ccta_idr_lbl" style="color:var(--text-soft);"></span>' +
            '<button type="button" id="ccta_idr_apply" style="' + chip + 'margin-left:auto;">Áp dụng</button></div>' +
        '</div>' +
        '<div class="calc-result-box">' +
          '<div class="item">Tốc độ tiêm (Flow rate): <span class="big" id="ccta_flow">—</span></div>' +
          '<div class="item">Tổng thể tích thuốc: <span class="big" id="ccta_vol">—</span></div>' +
          '<div class="item">Tổng lượng i-ốt: <span class="big" id="ccta_iod">—</span></div>' +
          '<div class="item" id="ccta_warn" style="color:var(--danger);font-weight:700;"></div>' +
        '</div>' +
        '<div id="ccta_formula" style="font-size:12.5px;line-height:1.6;margin-top:10px;padding:8px 10px;border-radius:8px;background:var(--surface-2,rgba(127,127,127,.08));font-family:ui-monospace,Consolas,monospace;"></div>' +
        '<div class="ref-table-wrap" style="margin-top:10px;"><table class="ref-table"><thead><tr><th>Cân nặng</th><th>BMI (kg/m²)</th><th>kVp</th><th>WB-IDR khuyến cáo</th></tr></thead><tbody>' +
          d.bangThamChieu.map(function (r) { return '<tr><td>' + esc(r.can) + '</td><td>' + esc(r.bmi) + '</td><td>' + esc(r.kvp) + '</td><td>' + esc(r.idr) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<ul style="font-size:12.5px;color:var(--text-soft);margin:10px 0 0;padding-left:18px;">' + d.luuY.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
        '<div style="font-size:11.5px;color:var(--text-muted);margin-top:6px;">Nguồn: ' + esc(d.nguon) + '</div>' +
      '</div>'
    );
  }

  function setupCCTACalculator() {
    var d = window.SOTAY_CONGCU && window.SOTAY_CONGCU.lieuCCTA;
    var w = document.getElementById("ccta_w"), idr = document.getElementById("ccta_idr"),
        conc = document.getElementById("ccta_conc"), t = document.getElementById("ccta_t");
    if (!d || !w || !idr || !conc || !t) return;
    var nk = d.nongDoKhoang || { min: 270, max: 400 };
    var $ = function (id) { return document.getElementById(id); };
    function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
    function pick(list, wv) { for (var i = 0; i < list.length; i++) if (wv < list[i].duoiKg) return list[i]; return list[list.length - 1]; }
    var sugIdr = null;
    function recalc() {
      var wv = parseFloat(w.value), iv = parseFloat(idr.value), cv = parseFloat(conc.value), tv = parseFloat(t.value);
      var warn = [];
      if (!(wv >= d.canNang.min && wv <= d.canNang.max)) warn.push("Cân nặng ngoài khoảng " + d.canNang.min + "–" + d.canNang.max + " kg");
      if (!(iv >= d.idr.min && iv <= d.idr.max)) warn.push("IDR ngoài khoảng " + d.idr.min + "–" + d.idr.max);
      if (!(cv >= nk.min && cv <= nk.max)) warn.push("Nồng độ ngoài khoảng " + nk.min + "–" + nk.max + " mgI/ml");
      if (!(tv >= d.thoiGian.min && tv <= d.thoiGian.max)) warn.push("Thời gian ngoài khoảng " + d.thoiGian.min + "–" + d.thoiGian.max + " s");
      wv = clamp(wv || d.canNang.macDinh, d.canNang.min, d.canNang.max);
      iv = clamp(iv || d.idr.macDinh, d.idr.min, d.idr.max);
      cv = clamp(cv || d.nongDoMacDinh, nk.min, nk.max);
      tv = clamp(tv || d.thoiGian.macDinh, d.thoiGian.min, d.thoiGian.max);
      // đồng bộ thanh trượt
      $("ccta_w_r").value = wv; $("ccta_idr_r").value = iv; $("ccta_conc_r").value = cv; $("ccta_t_r").value = tv;
      // gợi ý kV & IDR theo cân nặng
      if (d.goiYKV) $("ccta_kv").textContent = pick(d.goiYKV, wv).kv + " kV";
      if (d.goiYIDR) { var g = pick(d.goiYIDR, wv); sugIdr = g.idr; $("ccta_idr_sug").textContent = g.idr.toFixed(3); $("ccta_idr_lbl").textContent = "(" + g.nhan + ")"; }
      // công thức: Flow = W × IDR ÷ (C/1000); Volume = Flow × t
      var flow = (wv * iv) / (cv / 1000);
      var flowR = Math.round(flow * 10) / 10;
      var vol = Math.round(flowR * tv);
      $("ccta_flow").textContent = flowR.toFixed(1) + " ml/s";
      $("ccta_vol").textContent = vol + " ml";
      $("ccta_iod").textContent = (vol * cv / 1000).toFixed(1) + " gI";
      $("ccta_formula").innerHTML =
        "<b>FLOW</b> = (" + wv + "kg × " + iv + ") ÷ " + (cv / 1000).toFixed(3) + " g/ml = <b>" + flowR.toFixed(1) + " ml/s</b><br>" +
        "<b>VOLUME</b> = " + flowR.toFixed(1) + " ml/s × " + tv + "s = <b>" + vol + " ml</b>";
      $("ccta_warn").textContent = warn.length ? "⚠️ " + warn.join("; ") + " — đã giới hạn về khoảng an toàn." : "";
      var chips = document.querySelectorAll(".ccta-conc-chip");
      for (var i = 0; i < chips.length; i++) {
        var on = parseFloat(chips[i].getAttribute("data-v")) === cv;
        chips[i].style.background = on ? "var(--brand)" : "transparent";
        chips[i].style.color = on ? "#fff" : "inherit";
      }
    }
    // liên kết thanh trượt <-> ô số
    [w, idr, conc, t].forEach(function (inp) {
      var r = $(inp.id + "_r");
      inp.oninput = recalc;
      if (r) r.oninput = function () { inp.value = r.value; recalc(); };
    });
    var chips = document.querySelectorAll(".ccta-conc-chip");
    for (var i = 0; i < chips.length; i++) chips[i].onclick = function () { conc.value = this.getAttribute("data-v"); recalc(); };
    var ap = $("ccta_idr_apply");
    if (ap) ap.onclick = function () { if (sugIdr != null) { idr.value = sugIdr; recalc(); } };
    recalc();
  }

  function setupCalculatorEvents() {
    var wInput = document.getElementById("calc_w");
    var tSelect = document.getElementById("calc_type");
    var cSelect = document.getElementById("calc_conc");
    if (!wInput || !tSelect) return;

    function recalculate() {
      var w = parseFloat(wInput.value) || 60;
      w = Math.min(150, Math.max(20, w)); // giới hạn theo min/max của ô nhập
      var tIdx = parseInt(tSelect.value, 10) || 0;
      var khaoSat = window.SOTAY_CONGCU.lieuCanQuang.loaiKhaoSat[tIdx];
      var volMin = Math.round(w * khaoSat.mlKgMin);
      var volMax = Math.round(w * khaoSat.mlKgMax);
      var resVol = (volMin === volMax) ? volMin + " ml" : volMin + " – " + volMax + " ml";

      var vElem = document.getElementById("res_vol");
      var fElem = document.getElementById("res_flow");
      var iElem = document.getElementById("res_iod");
      if (vElem) vElem.textContent = resVol;
      if (fElem) fElem.textContent = khaoSat.tocDo;
      if (iElem && cSelect) {
        var conc = parseFloat(cSelect.value) || 350;
        var gMin = (volMin * conc / 1000).toFixed(1), gMax = (volMax * conc / 1000).toFixed(1);
        iElem.textContent = (gMin === gMax ? gMin : gMin + " – " + gMax) + " gI";
      }
    }
    wInput.oninput = recalculate;
    tSelect.onchange = recalculate;
    if (cSelect) cSelect.onchange = recalculate;
    recalculate();
    setupCCTACalculator();
  }

  /* Render Tai biến & Cấp cứu CĐHA */
  function renderEmergencyDetail(sectionId, mainPanel, rightPanel) {
    var tb = window.SOTAY_TAIBIEN;
    var mobBars = getMobileNavBarsHtml(sectionId);

    var html =
      mobBars.top +
      '<div class="detail-header">' +
        '<div class="badges">' +
          '<span class="badge-mod" style="background:var(--c-emg-wash);color:var(--c-emg-dark);border-color:var(--c-emg-border);">Khẩn cấp</span>' +
          '<span class="badge-mod">Bệnh viện Vĩnh Phúc VPI</span>' +
        '</div>' +
        '<h2>' + (sectionId === "emg-phan-ve" ? "Phác Đồ Phản Vệ (Thông Tư 51/2017/TT-BYT)" : "Xử Trí Sự Cố CĐHA") + '</h2>' +
      '</div>';

    if (sectionId === "emg-phan-ve") {
      html +=
        '<div class="safety-alert-banner emg clinical-alert-box danger">' +
          '<div class="ic">🚨</div>' +
          '<div class="txt">' +
            '<b>NGUYÊN TẮC VÀNG CẤP CỨU PHẢN VỆ:</b>' +
            '<span>' + esc(tb.phanVe.nguyenTacVang) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="content-section"><h3>📋 4 MỨC ĐỘ LÂM SÀNG VÀ HƯỚNG XỬ TRÍ</h3>';

      tb.phanVe.bonMucDo.forEach(function (m) {
        html +=
          '<div style="margin-bottom:12px;padding:12px;border-radius:8px;border:1px solid var(--line);background:var(--surface);">' +
            '<b style="font-size:15px;color:var(--danger);display:block;margin-bottom:4px;">' + esc(m["do"] || m.ten || "") + '</b>' +
            '<p style="margin:0 0 6px;font-size:13px;white-space:pre-line;">' + esc(m.trieuChung) + '</p>' +
            '<div style="font-size:13px;padding:8px 12px;border-radius:6px;background:var(--surface-2);border-left:3px solid var(--danger);">' +
              '<b>Xử trí:</b><ul>' + m.xuTri.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('') + '</ul>' +
            '</div>' +
          '</div>';
      });
      html += '</div>';

      // Máy tính liều Adrenalin
      html +=
        '<div class="calc-card" style="border-color:var(--danger);">' +
          '<h3 style="margin:0 0 10px;color:var(--danger);font-size:16px;">⚡ Máy Tính Liều Adrenalin Tự Động Theo Cân Nặng</h3>' +
          '<div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">' +
            '<label style="font-weight:700;font-size:13px;">Cân nặng người bệnh (kg):</label>' +
            '<input id="adrenalin_w" type="number" value="60" min="5" max="150" style="width:100px;height:36px;padding:0 10px;font-size:15px;font-weight:700;">' +
          '</div>' +
          '<div class="calc-result-box" style="background:var(--danger-wash);border-color:var(--danger);">' +
            '<div class="item">Liều tiêm bắp đùi ngay: <span class="big" id="adr_res_im" style="color:var(--danger);">—</span></div>' +
            '<div class="item">Liều truyền tĩnh mạch duy trì: <span class="big" id="adr_res_iv" style="color:var(--danger);">—</span></div>' +
            '<div class="item" style="width:100%;font-size:12.5px;" id="adr_res_desc"></div>' +
          '</div>' +
        '</div>';
    } else if (sectionId === "emg-thoat-mach") {
      html += '<div class="content-section"><h3>⚠️ QUY TRÌNH 8 BƯỚC XỬ TRÍ THOÁT MẠCH & VỠ VEN</h3>';
      tb.thoatMach.quyTrinh8BuocXuTri.forEach(function (s) {
        html +=
          '<div style="margin-bottom:10px;padding:10px;border-radius:8px;background:var(--surface);border:1px solid var(--line);">' +
            '<b style="color:var(--c-canthiep);">Bước ' + s.buoc + ': ' + esc(s.ten) + '</b>' +
            '<p style="margin:4px 0 0;font-size:13px;">' + esc(s.moTa) + '</p>' +
          '</div>';
      });
      html += '</div>';
    } else if (sectionId === "emg-an-toan-mri") {
      html += '<div class="content-section"><h3>🧲 AN TOÀN TỪ TRƯỜNG & SỰ CỐ QUENCH KHẨN CẤP</h3>';
      tb.anToanMRI.bonKhuVucAnToan.forEach(function (v) {
        html += '<div style="margin-bottom:8px;padding:10px;border-radius:8px;background:var(--surface);border:1px solid var(--line);"><b style="color:var(--c-mri);">' + esc(v.vung) + ':</b> ' + esc(v.moTa) + '</div>';
      });
      html += '</div>';
    } else {
      html += '<div class="content-section"><h3>💓 HỒI SINH TIM PHỔI (CPR) THEO AHA 2020</h3>';
      tb.cpr.cacBuocThucHien.forEach(function (b) {
        html += '<div style="margin-bottom:8px;padding:10px;border-radius:8px;background:var(--surface);border:1px solid var(--line);"><b style="color:var(--danger);">Bước ' + b.buoc + ': ' + esc(b.ten) + '</b><div style="font-size:13px;margin-top:2px;white-space:pre-line;">' + esc(b.moTa) + '</div></div>';
      });
      html += '</div>';
    }

    html += renderLMSUnlockBox(sectionId, "Tai Biến & Cấp Cứu CĐHA");
    html += mobBars.bottom;
    mainPanel.innerHTML = html;

    if (rightPanel) {
      rightPanel.innerHTML =
        '<div class="gallery-header">Dụng Cụ Cấp Cứu VPI</div>' +
        '<div class="gallery-body" style="font-size:13px;line-height:1.5;">' +
          '<p>• Hộp chống sốc phản vệ: Ít nhất 5 ống Adrenalin 1mg/1ml, 2 ống Solu-Medrol, Dimedrol.</p>' +
          '<p>• Bình oxy có dây thở mask, bóng Ambu.</p>' +
        '</div>';
    }

    if (sectionId === "emg-phan-ve") {
      var wAdr = document.getElementById("adrenalin_w");
      if (wAdr) {
        function updateAdrenalin() {
          var res = window.SOTAY_CONGCU.tinhLieuAdrenalin(wAdr.value);
          var imEl = document.getElementById("adr_res_im");
          var ivEl = document.getElementById("adr_res_iv");
          var descEl = document.getElementById("adr_res_desc");
          if (imEl) imEl.textContent = res.lieuBapMl + " ml (" + res.lieuBapMg + " mg)";
          if (ivEl) ivEl.textContent = res.tocDoKhoiDau;
          if (descEl) descEl.innerHTML = '<b>Cách dùng tiêm bắp:</b> ' + esc(res.moTaBap) + '<br><b>Pha truyền duy trì:</b> ' + esc(res.phaTruyen) + '<br><b>Bù dịch:</b> ' + esc(res.buDich);
        }
        wAdr.oninput = updateAdrenalin;
        updateAdrenalin();
      }
    }
  }

  /* Render Sidebar Hình ảnh với cơ chế Fallback */
  function renderImagesSidebar(hinhAnhList, rightPanel, title, item) {
    if (!rightPanel) return;

    var header = rightPanel.querySelector(".gallery-header");
    if (header) header.textContent = title || "Hình ảnh";

    var body = rightPanel.querySelector(".gallery-body");
    if (!body) return;

    var isAdmin = !!(window.VPI && window.VPI.isAdmin());
    var safe = window.VPI_UI ? window.VPI_UI.safeImgUrl : function (u) { return u; };

    if (!hinhAnhList || hinhAnhList.length === 0) {
      body.innerHTML =
        '<div class="no-img-box">' +
          '<div style="font-size:28px;margin-bottom:8px;">📷</div>' +
          'Chưa có ảnh tư thế / phim chuẩn cho kỹ thuật này.' +
          (isAdmin ? '<br><b>Admin: dùng nút 📷 Chụp ảnh / 🖼️ Tải ảnh lên ở trên để bổ sung.</b>' : '') +
        '</div>';
    } else {
      // Hỗ trợ cả 2 kiểu dữ liệu: {src, caption} (dữ liệu hiện có) và {url, chuThich}
      var html = '<div class="gallery-grid">';
      hinhAnhList.forEach(function (img, idx) {
        var src = safe(img.src || img.url || "");
        var cap = img.caption || img.chuThich || ("Hình ảnh " + (idx + 1));
        html +=
          '<div class="gallery-card" data-idx="' + idx + '" data-src="' + esc(src) + '" data-cap="' + esc(cap) + '">' +
            (src
              ? '<img src="' + esc(src) + '" alt="' + esc(cap) + '" loading="lazy">'
              : '<div class="no-img-box">Ảnh chưa có</div>') +
            '<div class="cap">' + esc(cap) + '</div>' +
          '</div>';
      });
      html += '</div>';
      body.innerHTML = html;

      // Ảnh lỗi/không tồn tại → hiện khung báo thay vì ô trống
      body.querySelectorAll(".gallery-card img").forEach(function (im) {
        im.addEventListener("error", function () {
          var ph = document.createElement("div");
          ph.className = "no-img-box";
          ph.textContent = "Ảnh chưa được tải lên";
          if (im.parentNode) im.parentNode.replaceChild(ph, im);
        });
      });
      // Phóng to ảnh — dùng data-attribute thay cho onclick nội tuyến (chống chèn mã)
      body.querySelectorAll(".gallery-card").forEach(function (card) {
        card.addEventListener("click", function () {
          if (!card.getAttribute("data-src") || !card.querySelector("img")) return;
          showLightbox(card.getAttribute("data-src"), card.getAttribute("data-cap"));
        });
      });
    }

    if (window.VPI_UI && window.VPI_UI.onGalleryRendered) window.VPI_UI.onGalleryRendered(item, rightPanel);
  }

  /* Khung ghi nhận đã học & chuyển bài nhanh (YÊU CẦU #3: KHÔNG KHÓA BÀI HỌC) */
  function renderLMSUnlockBox(lessonId, lessonTitle) {
    var isCompleted = false;
    try {
      var completedList = JSON.parse(localStorage.getItem("vudat_cdha_completed_lessons") || "[]");
      if (completedList.indexOf(lessonId) !== -1) isCompleted = true;
    } catch (e) {}

    return (
      '<div class="lms-unlock-action-box">' +
        '<div class="lms-unlock-info">' +
          '<b>Ghi Nhận Học Tập & Đào Tạo — Bệnh Viện Vĩnh Phúc VPI</b>' +
          '<span>Toàn bộ giáo trình đã được mở khóa tự do để thuận tiện tra cứu. Bạn có thể đánh dấu đã học để ghi nhận tiến độ thực hành.</span>' +
        '</div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">' +
          '<button class="btn-unlock-next" onclick="window.VUDAT_APP.markLessonRead(\'' + lessonId + '\')">' +
            '<span>' + (isCompleted ? '✅ Đã Hoàn Thành Bài Này' : '✓ Đánh Dấu Đã Học Xong') + '</span>' +
          '</button>' +
          '<button class="btn-action-pill" onclick="window.VUDAT_APP.goToNextLesson(\'' + lessonId + '\')">' +
            '<span>Bài tiếp theo ➔</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  /* =========================================================================
     4. MODAL DIALOGS, CÀI ĐẶT & GÁN SỰ KIỆN TOÀN CỤC (YÊU CẦU #8)
     ========================================================================= */
  /* Quyền Admin do MÁY CHỦ xác định theo tài khoản đăng nhập (xem cloud.js / schema.sql).
     Cài đặt cá nhân (giao diện, khóa PIN thiết bị, ngoại tuyến) mở cho mọi tài khoản;
     chỉnh sửa nội dung & quản lý tài khoản nằm ở bảng "Quản trị" chỉ Admin thấy. */
  function showSettingsModal() {
    var overlay = document.getElementById("settingsModalOverlay");
    if (overlay) overlay.style.display = "flex";
    var p = window.VPI && window.VPI.profile();
    var banner = document.getElementById("settingsRoleBanner");
    if (banner && p) {
      banner.textContent = (p.role === "admin" ? "👑 Quản trị viên: " : "👤 Nhân viên: ") + p.full_name;
    }
    switchSettingsTab("view");
  }

  function hideSettingsModal() {
    var overlay = document.getElementById("settingsModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function switchSettingsTab(tab) {
    var tabs = ["view", "sec", "data", "hosp"];
    tabs.forEach(function (t) {
      var btn = document.getElementById("setTab_" + t);
      var pane = document.getElementById("setPane_" + t);
      if (btn) btn.classList.toggle("active", t === tab);
      if (pane) pane.style.display = (t === tab) ? "block" : "none";
    });
  }

  function changeTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("vudat_cdha_theme", mode);
    showToast("Đã đổi sang giao diện: " + (mode === "dark" ? "Chế độ Tối" : "Chế độ Sáng"), "ok");
  }

  function setFontSize(size) {
    document.documentElement.style.setProperty("--font-size-base", size);
    localStorage.setItem("vudat_cdha_font_size", size);
    showToast("Đã điều chỉnh cỡ chữ đọc: " + size, "ok");
  }

  function exportDataJson() {
    var data = {
      hospital: "Bệnh viện Vĩnh Phúc VPI",
      app: "Sổ Tay Điện Tử CĐHA",
      contact: { email: "vudatxq@gmail.com", hotline: "+84916306115" },
      exportedAt: new Date().toISOString(),
      completedLessons: localStorage.getItem("vudat_cdha_completed_lessons") || "[]",
      checklists: localStorage.getItem("vudat_cdha_checklists") || "{}",
      theme: localStorage.getItem("vudat_cdha_theme") || "light"
    };
    data.contact = { developer: "Vũ Đạt", hospital: "Bệnh viện Vĩnh Phúc VPI" };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "sotay_cdha_vpi_backup_" + Date.now() + ".json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Đã xuất file sao lưu JSON thành công!", "ok");
  }

  function importDataJson(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var parsed = JSON.parse(ev.target.result);
        if (parsed.completedLessons) localStorage.setItem("vudat_cdha_completed_lessons", parsed.completedLessons);
        if (parsed.checklists) localStorage.setItem("vudat_cdha_checklists", parsed.checklists);
        if (parsed.theme) changeTheme(parsed.theme);
        showToast("Đã nhập dữ liệu sao lưu thành công!", "ok");
        hideSettingsModal();
        handleHashChange();
      } catch (err) {
        showToast("Tệp JSON không hợp lệ!", "err");
      }
    };
    reader.readAsText(file);
  }

  function resetDefaultData() {
    if (confirm("Xóa tiến độ học, bảng kiểm đã tick và cài đặt giao diện CỦA MÁY NÀY? (Tài khoản và nội dung dùng chung trên máy chủ không bị ảnh hưởng.)")) {
      try {
        Object.keys(localStorage).forEach(function (k) {
          if (k.indexOf("vudat_cdha_") === 0 || k === "vpi_device_total" || k === "vpi_device_today" || k === "vpi_device_last_date") {
            localStorage.removeItem(k);
          }
        });
      } catch (e) {}
      showToast("Đang tải lại...", "ok");
      setTimeout(function () { location.reload(); }, 600);
    }
  }

  function showLightbox(src, caption) {
    var overlay = document.getElementById("lightboxOverlay");
    var img = document.getElementById("lightboxImg");
    var cap = document.getElementById("lightboxCaption");
    if (!overlay || !img) return;
    img.src = src;
    if (cap) cap.textContent = caption || "";
    overlay.style.display = "flex";
  }

  function hideLightbox() {
    var overlay = document.getElementById("lightboxOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function showToast(msg, type) {
    var box = document.getElementById("toastContainer");
    if (!box) return;
    var t = el("div", "toast-item " + (type || "ok"), msg);
    box.appendChild(t);
    setTimeout(function () {
      t.style.opacity = "0";
      setTimeout(function () { t.remove(); }, 300);
    }, 3200);
  }

  function executeGlobalSearch(kw) {
    var list = [];
    (window.SOTAY_QUYTRINH || []).forEach(function (q) {
      if (q.ten.toLowerCase().indexOf(kw) !== -1 || (q.nhom && q.nhom.toLowerCase().indexOf(kw) !== -1)) {
        list.push({ id: q.id, name: q.ten, sub: q.modality + " • " + (q.nhom || "") });
      }
    });
    (window.SOTAY_SIEUAM || []).forEach(function (u) {
      if (u.ten.toLowerCase().indexOf(kw) !== -1) {
        list.push({ id: u.id, name: u.ten, sub: "Siêu âm • " + u.nhom });
      }
    });

    if (list.length > 0) {
      showToast("Tìm thấy " + list.length + " kết quả phù hợp!", "ok");
      showItemDetail(list[0].id);
    } else {
      showToast("Không tìm thấy kết quả cho: " + kw, "err");
    }
  }


  /* =========================================================================
     TỰ ĐỘNG CHẠY NGANG THANH PHÂN HỆ NAVPILLS (YÊU CẦU #2)
     ========================================================================= */
  var navScrollState = {
    timer: null,
    direction: 1,
    speed: 0.65,
    isPaused: false,
    pauseTimeout: null
  };

  function initNavPillsAutoScroll() {
    var bar = document.querySelector(".navpills-bar");
    if (!bar) return;

    function step() {
      if (!navScrollState.isPaused) {
        var maxScroll = bar.scrollWidth - bar.clientWidth;
        if (maxScroll > 15) {
          bar.scrollLeft += navScrollState.direction * navScrollState.speed;
          if (bar.scrollLeft >= maxScroll - 1) {
            bar.scrollLeft = maxScroll;
            navScrollState.direction = -1;
            pauseTemporarily(2200);
          } else if (bar.scrollLeft <= 1) {
            bar.scrollLeft = 0;
            navScrollState.direction = 1;
            pauseTemporarily(2200);
          }
        }
      }
      navScrollState.timer = requestAnimationFrame(step);
    }

    function pauseTemporarily(ms) {
      navScrollState.isPaused = true;
      clearTimeout(navScrollState.pauseTimeout);
      navScrollState.pauseTimeout = setTimeout(function () {
        navScrollState.isPaused = false;
      }, ms || 1500);
    }

    bar.addEventListener("mouseenter", function () {
      navScrollState.isPaused = true;
    });
    bar.addEventListener("mouseleave", function () {
      pauseTemporarily(1200);
    });
    bar.addEventListener("touchstart", function () {
      navScrollState.isPaused = true;
    }, { passive: true });
    bar.addEventListener("touchend", function () {
      pauseTemporarily(2000);
    }, { passive: true });
    bar.addEventListener("wheel", function () {
      pauseTemporarily(3000);
    }, { passive: true });

    if (navScrollState.timer) cancelAnimationFrame(navScrollState.timer);
    pauseTemporarily(1800);
    navScrollState.timer = requestAnimationFrame(step);
  }

  /* =========================================================================
     THỐNG KÊ SỐ LƯỢT TRUY CẬP (YÊU CẦU #3)
     ========================================================================= */
  // Số lượt mở THẬT trên thiết bị này (lưu localStorage, không cộng số nền giả).
  // Dùng khóa mới "vpi_device_*" để bỏ các giá trị cũ đã bị cộng sẵn 15.840.
  function readVisitInt(key) {
    try { var v = parseInt(localStorage.getItem(key), 10); return isNaN(v) ? 0 : v; } catch (e) { return 0; }
  }

  function trackVisitMetrics() {
    var d = new Date();
    var todayStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); // theo giờ máy, không theo UTC
    var lastDate = null;
    try { lastDate = localStorage.getItem("vpi_device_last_date"); } catch (e) {}

    var totalVisits = readVisitInt("vpi_device_total") + 1;
    var todayVisits = (lastDate === todayStr ? readVisitInt("vpi_device_today") : 0) + 1;

    try {
      localStorage.setItem("vpi_device_total", totalVisits);
      localStorage.setItem("vpi_device_today", todayVisits);
      localStorage.setItem("vpi_device_last_date", todayStr);
      localStorage.removeItem("vpi_total_visits");
      localStorage.removeItem("vpi_today_visits");
      localStorage.removeItem("vpi_last_visit_date");
    } catch (e) {}

    updateVisitCounterDisplays(totalVisits, todayVisits);
  }

  function updateVisitCounterDisplays(total, today) {
    var t = total || readVisitInt("vpi_device_total") || 1;
    var d = today || readVisitInt("vpi_device_today") || 1;

    var totalStr = t.toLocaleString("vi-VN");
    var todayStr = d.toLocaleString("vi-VN");

    var elH = document.getElementById("visitCounterHeader");
    if (elH) elH.textContent = totalStr;
    var elHero = document.getElementById("visitCounterHero");
    if (elHero) elHero.textContent = totalStr;
    var elToday = document.getElementById("visitCounterToday");
    if (elToday) elToday.textContent = todayStr;
    var elFt = document.getElementById("visitCounterFooter");
    if (elFt) elFt.textContent = totalStr;
    var elFtToday = document.getElementById("visitCounterFooterToday");
    if (elFtToday) elFtToday.textContent = todayStr;
  }

  /* =========================================================================
     NHẮN TIN, GÓP Ý KIẾN CHO ADMIN (YÊU CẦU #4)
     ========================================================================= */
  /* Góp ý gửi lên MÁY CHỦ (bảng feedback) — giao diện nằm ở ui-core.js */
  function showFeedbackModal(protocolName) {
    var ctx = protocolName;
    if (!ctx && appState.currentProtocolId) {
      var item = findItemById(appState.currentProtocolId);
      if (item) ctx = item.ten + (item.modality ? " (" + item.modality + ")" : "");
    }
    if (window.VPI_UI) window.VPI_UI.showFeedback(ctx || "");
  }
  function hideFeedbackModal() {}

  /* =========================================================================
     5. PWA ENGINE, XEM NGOẠI VIỆN & BẢO MẬT MÃ PIN (YÊU CẦU MỚI)
     ========================================================================= */
  var pwaDeferredPrompt = null;
  var secState = {
    pinEnabled: false,
    pinHash: "",      // SHA-256(muối + PIN) — KHÔNG lưu PIN dạng rõ, KHÔNG có PIN mặc định
    pinSalt: "",
    pinFails: 0,
    pinWant: false,
    pinScope: "sensitive",
    autoLockMinutes: 15,
    isUnlocked: false,
    enteredDigits: "",
    lastActivity: Date.now(),
    pendingHash: null
  };

  function initSecurityAndPWA() {
    try {
      secState.pinHash = localStorage.getItem("vpi_cdha_pin_hash") || "";
      secState.pinSalt = localStorage.getItem("vpi_cdha_pin_salt") || "";
      secState.pinEnabled = localStorage.getItem("vpi_cdha_pin_enabled") === "true" && !!secState.pinHash;
      // Di chuyển PIN dạng rõ của phiên bản cũ (nếu có) sang dạng băm rồi xóa bản rõ
      var legacyPin = localStorage.getItem("vpi_cdha_pin_code");
      if (legacyPin) {
        localStorage.removeItem("vpi_cdha_pin_code");
        if (/^\d{4}$/.test(legacyPin) && legacyPin !== "1234") { savePinHash(legacyPin); }
        else { localStorage.setItem("vpi_cdha_pin_enabled", "false"); secState.pinEnabled = false; }
      }
      secState.pinScope = localStorage.getItem("vpi_cdha_pin_scope") || "sensitive";
      var al = localStorage.getItem("vpi_cdha_pin_autolock");
      secState.autoLockMinutes = al ? parseInt(al, 10) : 15;
    } catch (e) {}

    var toggleEl = document.getElementById("cfgPinEnableToggle");
    var sliderEl = document.getElementById("cfgPinToggleSlider");
    var boxEl = document.getElementById("cfgPinDetailsBox");
    var scopeSel = document.getElementById("cfgPinScopeSelect");
    var lockSel = document.getElementById("cfgPinAutoLockSelect");

    if (toggleEl) toggleEl.checked = secState.pinEnabled;
    if (sliderEl) sliderEl.style.backgroundColor = secState.pinEnabled ? "var(--brand)" : "#cbd5e1";
    if (boxEl) boxEl.style.display = secState.pinEnabled ? "block" : "none";
    if (scopeSel) scopeSel.value = secState.pinScope;
    if (lockSel) lockSel.value = String(secState.autoLockMinutes);

    var updateActivity = function () {
      secState.lastActivity = Date.now();
    };
    ["touchstart", "click", "keydown", "mousemove"].forEach(function (evt) {
      window.addEventListener(evt, updateActivity, { passive: true });
    });

    setInterval(function () {
      if (secState.pinEnabled && secState.isUnlocked && secState.autoLockMinutes > 0) {
        var elapsedMin = (Date.now() - secState.lastActivity) / 60000;
        if (elapsedMin >= secState.autoLockMinutes) {
          lockAppNow();
          showToast("Phiên đã tự động khóa sau " + secState.autoLockMinutes + " phút không thao tác.", "warn");
        }
      }
    }, 30000);

    window.addEventListener("keydown", function (e) {
      var overlay = document.getElementById("pinLockOverlay");
      if (overlay && overlay.style.display !== "none") {
        if (e.key >= "0" && e.key <= "9") {
          enterPinDigit(e.key);
        } else if (e.key === "Backspace") {
          backspacePin();
        } else if (e.key === "Escape" || e.key === "Delete") {
          clearPin();
        }
      } else if (e.key === "Escape") {
        hideGeSignaModal();
        hideKtv3MienModal();
        hideSettingsModal();
        hideOfflineInfoModal();
        hideInstallModal();
        hideLightbox();
        hideFeedbackModal();
      }
    });

    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      pwaDeferredPrompt = e;
      var banner = document.getElementById("pwaFloatingBanner");
      var isDismissed = false;
      try { isDismissed = localStorage.getItem("vpi_dismiss_pwa_banner") === "true"; } catch (err) {}
      if (banner && !isDismissed && !isStandaloneMode()) {
        banner.style.display = "flex";
      }
    });

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    updateNetworkStatus();

    if (secState.pinEnabled && secState.pinScope === "all") {
      secState.isUnlocked = false;
      showPinLockOverlay("Nhập mã PIN để mở khóa sổ tay");
    } else {
      secState.isUnlocked = true;
    }
  }

  function isStandaloneMode() {
    return window.matchMedia("(display-mode: standalone)").matches || (window.navigator && window.navigator.standalone === true);
  }

  function updateNetworkStatus() {
    var badge = document.getElementById("networkStatusBadge");
    var txt = document.getElementById("networkStatusText");
    if (!badge || !txt) return;

    if (navigator.onLine) {
      badge.className = "network-badge online";
      txt.textContent = "Ngoại viện: Trực tuyến";
      badge.title = "Đang kết nối Vercel Cloud. Sẵn sàng xem ngoại viện 100%.";
    } else {
      badge.className = "network-badge offline";
      txt.textContent = "Ngoại viện: Offline";
      badge.title = "Đang chạy ngoại tuyến bằng bộ nhớ thiết bị. Mọi kỹ thuật & phác đồ đều hoạt động bình thường.";
    }
  }

  function showOfflineInfoModal() {
    var overlay = document.getElementById("offlineInfoModalOverlay");
    if (overlay) overlay.style.display = "flex";
  }

  function hideOfflineInfoModal() {
    var overlay = document.getElementById("offlineInfoModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function syncCloudData() {
    showToast("Đang kết nối đồng bộ Vercel Cloud...", "ok");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (r) { r.update(); });
      });
    }
    setTimeout(function () {
      showToast("🎉 Đã đồng bộ dữ liệu mới nhất thành công!", "ok");
      hideOfflineInfoModal();
    }, 800);
  }

  /* =========================================================================
     MODAL CẨM NANG HỆ THỐNG MÁY GE SIGNA™ EXPLORER 1.5T BỆNH VIỆN VĨNH PHÚC VPI
     ========================================================================= */
  function showGeSignaModal() {
    var overlay = document.getElementById("geSignaModalOverlay");
    var body = document.getElementById("geSignaModalBody");
    if (!overlay || !body) return;

    var kn = window.SOTAY_CLINICAL_KNOWLEDGE || {};
    var ge = (kn.geSignaExplorerVPI || kn.geSignaCreatorVPI);
    var siemens = kn.siemensAcademy;
    if (!ge) {
      body.innerHTML = '<p style="padding:20px;text-align:center;">Đang cập nhật dữ liệu...</p>';
      overlay.style.display = "flex";
      return;
    }

    var html =
      '<div style="margin-bottom:14px;padding:12px 14px;background:var(--surface-2);border-radius:10px;border-left:4px solid #0e7490;">' +
        '<b style="font-size:14.5px;color:#0e7490;display:block;margin-bottom:4px;">HỆ THỐNG CỘNG HƯỞNG TỪ GE SIGNA™ EXPLORER 1.5T — BỆNH VIỆN VĨNH PHÚC VPI</b>' +
        '<p style="margin:0;font-size:12.5px;color:var(--text-soft);line-height:1.5;">' +
          'Cẩm nang kỹ thuật thực hành lâm sàng trang bị tại Khoa Chẩn Đoán Hình Ảnh — Bệnh viện Vĩnh Phúc VPI. Máy vận hành trên kiến trúc quang học kỹ thuật số OpTix RF và nam châm siêu dẫn đồng nhất cao.' +
        '</p>' +
      '</div>';

    // 1. Thông số phần cứng cốt lõi
    html +=
      '<h4 style="margin:14px 0 6px;color:var(--text);font-size:14px;">⚙️ Thông số kỹ thuật phần cứng (Hardware):</h4>' +
      '<div class="modal-spec-grid">';
    for (var k in ge.thongSoPhanCung) {
      html +=
        '<div class="modal-spec-card">' +
          '<span class="lbl">' + esc(k) + '</span>' +
          '<span class="val">' + esc(ge.thongSoPhanCung[k]) + '</span>' +
        '</div>';
    }
    html += '</div>';

    // 2. Danh sách 6 bộ cuộn thu (Coils) thực tế
    html +=
      '<h4 style="margin:16px 0 6px;color:var(--text);font-size:14px;">🧲 Danh mục 6 cuộn thu (Coils) chuyên dụng tại BV VPI:</h4>' +
      '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">';
    ge.danhSachCuonThuCoils.forEach(function (c) {
      html +=
        '<div style="padding:10px 12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;">' +
          '<b style="color:#0e7490;font-size:13px;display:block;margin-bottom:2px;">• ' + esc(c.ten) + '</b>' +
          '<span style="font-size:12.5px;color:var(--text-soft);line-height:1.45;">' + esc(c.ungDung) + '</span>' +
        '</div>';
    });
    html += '</div>';

    // 3. 10 Công nghệ tạo ảnh chuyên sâu độc quyền
    html +=
      '<h4 style="margin:16px 0 6px;color:var(--text);font-size:14px;">🚀 10 Công nghệ tạo ảnh độc quyền của GE SIGNA™ Explorer:</h4>' +
      '<div class="modal-tech-list">';
    ge.congNgheDocQuyenGE.forEach(function (t, i) {
      html +=
        '<div class="modal-tech-item">' +
          '<b>' + (i + 1) + '. ' + esc(t.ten) + '</b>' +
          '<p>' + esc(t.moTa) + '</p>' +
        '</div>';
    });
    html += '</div>';

    // 4. Bảng đối chiếu 3 hãng (GE vs Siemens vs Philips)
    if (siemens && siemens.mriComparisons) {
      html +=
        '<h4 style="margin:16px 0 6px;color:var(--text);font-size:14px;">🔄 Bảng đối chiếu tương đương chuỗi xung 3 hãng (GE Healthcare • Siemens Healthineers • Philips):</h4>' +
        '<div class="ref-table-wrap">' +
          '<table class="ref-table">' +
            '<thead><tr><th>Ứng dụng lâm sàng</th><th style="color:#0e7490;">GE SIGNA™ Explorer (BV VPI)</th><th>Siemens (Syngo / Dot)</th><th>Philips Healthcare</th></tr></thead>' +
            '<tbody>';
      siemens.mriComparisons.forEach(function (r) {
        html +=
          '<tr>' +
            '<td><b>' + esc(r.ungDung) + '</b></td>' +
            '<td style="color:#0e7490;font-weight:700;">' + esc(r.ge) + '</td>' +
            '<td>' + esc(r.siemens) + '</td>' +
            '<td>' + esc(r.philips) + '</td>' +
          '</tr>';
      });
      html += '</tbody></table></div>';
    }

    html +=
      '<div style="margin-top:20px;padding-top:12px;border-top:1px solid var(--line);display:flex;justify-content:flex-end;">' +
        '<button class="btn-action-pill" onclick="window.VUDAT_APP.hideGeSignaModal()" style="background:#0e7490;color:#fff;padding:8px 20px;font-size:13px;font-weight:700;">' +
          'Đóng Cẩm Nang' +
        '</button>' +
      '</div>';

    body.innerHTML = html;
    overlay.style.display = "flex";
  }

  function hideGeSignaModal() {
    var overlay = document.getElementById("geSignaModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  /* =========================================================================
     MODAL BÁCH KHOA WIKIRADIOLOGY & THƯ VIỆN BÀI GIẢNG PPTX KTV 3 MIỀN
     ========================================================================= */
  function showKtv3MienModal() {
    var overlay = document.getElementById("ktv3MienModalOverlay");
    var body = document.getElementById("ktv3MienModalBody");
    if (!overlay || !body) return;

    var kn = window.SOTAY_CLINICAL_KNOWLEDGE || {};
    var principles = kn.principlesByModality || {};
    var lectures = kn.ktv3MienLectures || [];

    var html =
      '<div style="margin-bottom:14px;padding:12px 14px;background:var(--surface-2);border-radius:10px;border-left:4px solid #d97706;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
          '<b style="font-size:14.5px;color:#d97706;">BÁCH KHOA CHUẨN HÓA & THƯ VIỆN BÀI GIẢNG PPTX KTV 3 MIỀN</b>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
            '<a href="https://wikirad.ktv3mien.com/" target="_blank" rel="noopener" class="btn-action-pill" style="background:#d97706;color:#fff;font-size:12px;text-decoration:none;">📖 Wikirad ↗</a>' +
            '<a href="https://exam.ktv3mien.com/pptx/index.html" target="_blank" rel="noopener" class="btn-action-pill" style="background:#b45309;color:#fff;font-size:12px;text-decoration:none;">📊 Bài giảng PPTX ↗</a>' +
            '<a href="https://academy.siemens-healthineers.com/vi-vn" target="_blank" rel="noopener" class="btn-action-pill" style="background:#0f766e;color:#fff;font-size:12px;text-decoration:none;">🎓 Siemens Academy ↗</a>' +
          '</div>' +
        '</div>' +
        '<p style="margin:8px 0 0;font-size:12.5px;color:var(--text-soft);line-height:1.5;">' +
          'Tập hợp tri thức định nghĩa, nguyên lý vật lý tạo ảnh, tiêu chuẩn đánh giá chất lượng phim và phân tích xảo ảnh lâm sàng từ Wikiradiology KTV 3 Miền.' +
        '</p>' +
      '</div>';

    // 1. Nguyên lý tạo ảnh & Định nghĩa 3 phân hệ
    html += '<h4 style="margin:14px 0 8px;color:var(--text);font-size:14px;">🔬 Cơ sở vật lý & Nguyên lý tạo ảnh chuẩn hóa:</h4>';
    var mods = [
      { key: "xray", name: "X-quang Quy ước (Radiography)", color: "var(--c-xray)" },
      { key: "ct", name: "Cắt lớp vi tính (CT Scanner)", color: "var(--c-ct)" },
      { key: "mri", name: "Cộng hưởng từ (MRI 1.5T)", color: "var(--c-mri)" }
    ];

    mods.forEach(function (m) {
      var p = principles[m.key];
      if (p) {
        html +=
          '<div style="padding:12px;background:var(--surface);border:1px solid var(--line);border-radius:8px;margin-bottom:10px;border-left:3px solid ' + m.color + ';">' +
            '<b style="color:' + m.color + ';font-size:13.5px;display:block;margin-bottom:4px;">• ' + esc(m.name) + '</b>' +
            '<p style="margin:0 0 6px;font-size:12.5px;color:var(--text);line-height:1.5;"><b>Định nghĩa:</b> ' + esc(p.dinhNghia) + '</p>' +
            '<p style="margin:0 0 6px;font-size:12.5px;color:var(--text-soft);line-height:1.5;"><b>Nguyên lý vật lý:</b> ' + esc(p.nguyenLyVatLy) + '</p>' +
            '<p style="margin:0 0 6px;font-size:12.5px;color:var(--ok);line-height:1.5;"><b>Tiêu chuẩn chất lượng:</b> ' + esc(p.tieuChuanChatLuong) + '</p>' +
            '<div style="font-size:12px;color:var(--danger);margin-top:4px;"><b>Xảo ảnh tiêu biểu:</b> ' +
              (p.xaoAnhThuongGap || []).map(function (x) { return esc(x.ten); }).join(", ") +
            '</div>' +
          '</div>';
      }
    });

    // 2. Danh mục bài giảng PPTX KTV 3 Miền
    if (lectures.length > 0) {
      html +=
        '<h4 style="margin:16px 0 8px;color:var(--text);font-size:14px;">📊 Danh mục Bài giảng chuyên đề KTV 3 Miền (PPTX):</h4>';
      lectures.forEach(function (l) {
        html +=
          '<div class="modal-lecture-card">' +
            '<div class="title">' + esc(l.chuDe) + '</div>' +
            '<div class="speaker">Giảng viên / Ban biên soạn: ' + esc(l.giangVien) + '</div>' +
            '<div class="desc">' + esc(l.noiDungChinh) + '</div>' +
            '<a href="' + esc(l.link) + '" target="_blank" rel="noopener" style="font-size:12px;color:#d97706;font-weight:700;text-decoration:none;">Xem bài giảng PPTX trên KTV 3 Miền ↗</a>' +
          '</div>';
      });
    }

    html +=
      '<div style="margin-top:20px;padding-top:12px;border-top:1px solid var(--line);display:flex;justify-content:flex-end;">' +
        '<button class="btn-action-pill" onclick="window.VUDAT_APP.hideKtv3MienModal()" style="background:#d97706;color:#fff;padding:8px 20px;font-size:13px;font-weight:700;">' +
          'Đóng Bách Khoa' +
        '</button>' +
      '</div>';

    body.innerHTML = html;
    overlay.style.display = "flex";
  }

  function hideKtv3MienModal() {
    var overlay = document.getElementById("ktv3MienModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function showPinLockOverlay(prompt) {
    var overlay = document.getElementById("pinLockOverlay");
    var promptEl = document.getElementById("pinPromptText");
    var errorEl = document.getElementById("pinMsgError");
    if (promptEl && prompt) promptEl.textContent = prompt;
    if (errorEl) errorEl.textContent = "";
    secState.enteredDigits = "";
    updatePinDots();
    if (overlay) overlay.style.display = "flex";
  }

  function hidePinLockOverlay() {
    var overlay = document.getElementById("pinLockOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function updatePinDots() {
    for (var i = 0; i < 4; i++) {
      var dot = document.getElementById("pdot_" + i);
      if (dot) dot.classList.toggle("filled", i < secState.enteredDigits.length);
    }
  }

  function enterPinDigit(digit) {
    if (secState.enteredDigits.length >= 4) return;
    secState.enteredDigits += String(digit);
    updatePinDots();

    if (secState.enteredDigits.length === 4) {
      setTimeout(verifyEnteredPin, 100);
    }
  }

  function backspacePin() {
    if (secState.enteredDigits.length > 0) {
      secState.enteredDigits = secState.enteredDigits.slice(0, -1);
      updatePinDots();
    }
  }

  function clearPin() {
    secState.enteredDigits = "";
    updatePinDots();
  }

  /* --- Băm mã PIN (Web Crypto). PIN chỉ là khóa tiện lợi của thiết bị; bảo mật chính là tài khoản. --- */
  function bytesToHex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }
  function hashPin(pin, salt) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("no-crypto"));
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ":" + pin)).then(bytesToHex);
  }
  function savePinHash(pin) {
    var s = new Uint8Array(16);
    crypto.getRandomValues(s);
    var salt = bytesToHex(s);
    return hashPin(pin, salt).then(function (h) {
      secState.pinSalt = salt; secState.pinHash = h;
      localStorage.setItem("vpi_cdha_pin_salt", salt);
      localStorage.setItem("vpi_cdha_pin_hash", h);
    });
  }

  function verifyEnteredPin() {
    var digits = secState.enteredDigits;
    hashPin(digits, secState.pinSalt).then(function (h) {
      finishVerifyPin(h === secState.pinHash);
    }, function () { finishVerifyPin(false); });
  }

  function finishVerifyPin(ok) {
    var errorEl = document.getElementById("pinMsgError");
    var card = document.getElementById("pinCardBox");

    if (ok) {
      secState.pinFails = 0;
      secState.isUnlocked = true;
      secState.lastActivity = Date.now();
      hidePinLockOverlay();
      showToast("🔓 Mở khóa thành công!", "ok");

      if (secState.pendingHash) {
        var h = secState.pendingHash;
        secState.pendingHash = null;
        location.hash = h;
      }
    } else {
      if (card) {
        card.classList.add("shake");
        setTimeout(function () { card.classList.remove("shake"); }, 400);
      }
      secState.pinFails++;
      if (secState.pinFails >= 5) {
        // Chống dò PIN 4 số: sai 5 lần → đăng xuất tài khoản, phải nhập lại mật khẩu
        secState.pinFails = 0;
        hidePinLockOverlay();
        secState.isUnlocked = true;
        if (window.VPI) window.VPI.signOut();
        return;
      }
      if (errorEl) errorEl.textContent = "Mã PIN không chính xác (" + secState.pinFails + "/5). Thử lại!";
      setTimeout(function () {
        secState.enteredDigits = "";
        updatePinDots();
      }, 500);
    }
  }

  function lockAppNow() {
    if (!secState.pinHash) {
      showToast("Chưa đặt mã PIN. Vào Cài đặt → Bảo mật để đặt PIN 4 số trước khi dùng khóa nhanh.", "warn");
      return;
    }
    secState.isUnlocked = false;
    showPinLockOverlay("Nhập mã PIN để mở khóa sổ tay");
  }

  function setPinUi(enabled) {
    var sliderEl = document.getElementById("cfgPinToggleSlider");
    var boxEl = document.getElementById("cfgPinDetailsBox");
    var tg = document.getElementById("cfgPinEnableToggle");
    if (tg) tg.checked = enabled;
    if (sliderEl) sliderEl.style.backgroundColor = enabled ? "var(--brand)" : "#cbd5e1";
    if (boxEl) boxEl.style.display = enabled ? "block" : "none";
  }

  function togglePinLock(enabled) {
    if (enabled && !secState.pinHash) {
      // Chưa có PIN: bắt buộc tự đặt PIN riêng trước (không có PIN mặc định)
      secState.pinWant = true;
      setPinUi(true);
      showToast("Hãy nhập mã PIN 4 số của bạn rồi bấm \"Lưu PIN\" để bật khóa.", "warn");
      return;
    }
    secState.pinWant = false;
    secState.pinEnabled = enabled;
    localStorage.setItem("vpi_cdha_pin_enabled", enabled ? "true" : "false");
    setPinUi(enabled);
    showToast(enabled ? "Đã BẬT khóa bảo mật mã PIN." : "Đã TẮT khóa bảo mật mã PIN.", "ok");
  }

  function changePinScope(scope) {
    secState.pinScope = scope;
    localStorage.setItem("vpi_cdha_pin_scope", scope);
    showToast("Đã cập nhật phạm vi bảo vệ mã PIN.", "ok");
  }

  function changeAutoLock(minutes) {
    secState.autoLockMinutes = parseInt(minutes, 10);
    localStorage.setItem("vpi_cdha_pin_autolock", String(secState.autoLockMinutes));
    showToast("Đã lưu thời gian tự động khóa: " + (secState.autoLockMinutes ? secState.autoLockMinutes + " phút" : "Không bao giờ"), "ok");
  }

  function updatePinCode() {
    var inp = document.getElementById("cfgNewPinInput");
    if (!inp) return;
    var v = (inp.value || "").trim();
    if (!/^\d{4}$/.test(v)) {
      showToast("Mã PIN phải bao gồm đúng 4 chữ số (0-9)!", "err");
      return;
    }
    if (/^(\d)\1{3}$/.test(v) || v === "1234" || v === "0123" || v === "4321") {
      showToast("PIN quá dễ đoán (1234, 1111...). Hãy chọn số khác.", "err");
      return;
    }
    savePinHash(v).then(function () {
      inp.value = "";
      if (secState.pinWant || secState.pinEnabled) {
        secState.pinEnabled = true; secState.pinWant = false;
        localStorage.setItem("vpi_cdha_pin_enabled", "true");
        setPinUi(true);
      }
      showToast("🎉 Đã lưu mã PIN mới thành công!", "ok");
    }, function () {
      showToast("Trình duyệt không hỗ trợ mã hóa — không thể đặt PIN.", "err");
    });
  }

  function promptInstallApp() {
    if (pwaDeferredPrompt) {
      pwaDeferredPrompt.prompt();
      pwaDeferredPrompt.userChoice.then(function (choice) {
        if (choice && choice.outcome === "accepted") {
          showToast("🎉 Chúc mừng bạn đã cài đặt SỔ CĐHA thành công!", "ok");
        }
        pwaDeferredPrompt = null;
      });
      return;
    }
    showInstallModal();
  }

  function showInstallModal() {
    var overlay = document.getElementById("installModalOverlay");
    if (overlay) overlay.style.display = "flex";

    var ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) {
      switchInstTab("ios");
    } else if (/Android/i.test(ua)) {
      switchInstTab("android");
    } else {
      switchInstTab("pc");
    }
  }

  function hideInstallModal() {
    var overlay = document.getElementById("installModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function switchInstTab(tab) {
    var tabs = ["ios", "android", "pc"];
    tabs.forEach(function (t) {
      var btn = document.getElementById("instTab_" + t);
      var pane = document.getElementById("instPane_" + t);
      if (btn) btn.classList.toggle("active", t === tab);
      if (pane) pane.style.display = (t === tab) ? "block" : "none";
    });
  }

  function dismissPwaBanner() {
    var banner = document.getElementById("pwaFloatingBanner");
    if (banner) banner.style.display = "none";
    try { localStorage.setItem("vpi_dismiss_pwa_banner", "true"); } catch (e) {}
  }

  function triggerPwaPrompt() {
    if (pwaDeferredPrompt) {
      promptInstallApp();
      hideInstallModal();
    } else {
      showToast("Hãy làm theo hướng dẫn 3 bước bên dưới để thêm vào màn hình chính!", "ok");
    }
  }

  /* Gán API ra phạm vi toàn cục */
  window.VUDAT_APP = {
    selectItem: function (itemId) {
      showItemDetail(itemId);
    },
    filterByRegion: function (regId) {
      appState.selectedRegion = regId;
      var pills = document.querySelectorAll(".region-pill");
      pills.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-reg") === regId);
      });

      var items = getItemsForModality(appState.currentModId);
      var kw = ((document.getElementById("lessonSearchInput") || {}).value || "").toLowerCase().trim();
      var filtered = getFilteredItems(items, kw, regId);

      var listContainer = document.getElementById("lessonListContainer");
      if (listContainer) {
        listContainer.innerHTML = renderLessonItemsHtml(filtered, appState.currentProtocolId, regId);
      }

      if (filtered.length > 0) {
        showItemDetail(filtered[0].id, false);
      }
    },
    toggleChecklistInline: function (protocolId, stepIdx, isChecked) {
      var key = "ct_chk_" + protocolId;
      if (!appState.checklistProgress[key]) appState.checklistProgress[key] = [];
      var arr = appState.checklistProgress[key];
      var idx = arr.indexOf(stepIdx);
      if (isChecked && idx === -1) arr.push(stepIdx);
      else if (!isChecked && idx !== -1) arr.splice(idx, 1);
      saveChecklistProgress();

      var row = document.getElementById("chkRow_" + protocolId + "_" + stepIdx);
      if (row) row.classList.toggle("checked", isChecked);

      var chk = window.getChecklistForProtocol(protocolId);
      var cntEl = document.getElementById("chkCounter_" + protocolId);
      if (cntEl && chk) cntEl.textContent = arr.length + " / " + chk.cacBuoc.length;

      if (chk && arr.length === chk.cacBuoc.length) {
        showToast("🎉 Chúc mừng! Bạn đã hoàn thành 100% các bước Bảng kiểm an toàn!", "ok");
      }
    },
    markLessonRead: function (lessonId) {
      try {
        var completedList = JSON.parse(localStorage.getItem("vudat_cdha_completed_lessons") || "[]");
        if (completedList.indexOf(lessonId) === -1) {
          completedList.push(lessonId);
          localStorage.setItem("vudat_cdha_completed_lessons", JSON.stringify(completedList));
        }
      } catch (e) {}

      showToast("Đã ghi nhận hoàn thành bài học!", "ok");
      var curMod = appState.currentModId;
      if (curMod) {
        var items = getItemsForModality(curMod);
        var listContainer = document.getElementById("lessonListContainer");
        if (listContainer) {
          listContainer.innerHTML = renderLessonItemsHtml(items, lessonId, appState.selectedRegion);
        }
      }
    },
    goToNextLesson: function (currentLessonId) {
      var curMod = appState.currentModId;
      var items = getItemsForModality(curMod);
      var curId = currentLessonId || appState.currentProtocolId;
      var curIdx = -1;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === curId) { curIdx = i; break; }
      }
      if (curIdx !== -1 && curIdx < items.length - 1) {
        showItemDetail(items[curIdx + 1].id);
      } else {
        showToast("Bạn đã xem đến bài cuối cùng trong chuyên mục này!", "ok");
      }
    },
    goToPrevLesson: function (currentLessonId) {
      var curMod = appState.currentModId;
      var items = getItemsForModality(curMod);
      var curId = currentLessonId || appState.currentProtocolId;
      var curIdx = -1;
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === curId) { curIdx = i; break; }
      }
      if (curIdx > 0) {
        showItemDetail(items[curIdx - 1].id);
      } else {
        showToast("Bạn đang ở bài đầu tiên trong chuyên mục này!", "ok");
      }
    },
    nextLesson: function (currentLessonId) {
      window.VUDAT_APP.goToNextLesson(currentLessonId);
    },
    prevLesson: function (currentLessonId) {
      window.VUDAT_APP.goToPrevLesson(currentLessonId);
    },
    switchMobileView: switchMobileView,
    showSettingsModal: showSettingsModal,
    hideSettingsModal: hideSettingsModal,
    switchSettingsTab: switchSettingsTab,
    changeTheme: changeTheme,
    setFontSize: setFontSize,
    exportDataJson: exportDataJson,
    importDataJson: importDataJson,
    resetDefaultData: resetDefaultData,
    showLightbox: showLightbox,
    hideLightbox: hideLightbox,

    // PWA & Chế độ xem ngoại viện
    promptInstallApp: promptInstallApp,
    showInstallModal: showInstallModal,
    hideInstallModal: hideInstallModal,
    switchInstTab: switchInstTab,
    dismissPwaBanner: dismissPwaBanner,
    triggerPwaPrompt: triggerPwaPrompt,
    showOfflineInfoModal: showOfflineInfoModal,
    hideOfflineInfoModal: hideOfflineInfoModal,
    syncCloudData: syncCloudData,

    // Cẩm nang GE SIGNA™ Explorer 1.5T BV VPI & Wikiradiology KTV 3 Miền
    showGeSignaModal: showGeSignaModal,
    hideGeSignaModal: hideGeSignaModal,
    showKtv3MienModal: showKtv3MienModal,
    hideKtv3MienModal: hideKtv3MienModal,

    // Nhắn tin, góp ý Admin & Thống kê lượt truy cập
    showFeedbackModal: showFeedbackModal,
    hideFeedbackModal: hideFeedbackModal,
    trackVisitMetrics: trackVisitMetrics,
    updateVisitCounterDisplays: updateVisitCounterDisplays,

    // Bảo mật an toàn mã PIN (như App 5S & Quản lý CĐHA)
    lockAppNow: lockAppNow,
    enterPinDigit: enterPinDigit,
    backspacePin: backspacePin,
    clearPin: clearPin,
    togglePinLock: togglePinLock,
    changePinScope: changePinScope,
    changeAutoLock: changeAutoLock,
    updatePinCode: updatePinCode,

    // Vòng đời ứng dụng: chỉ khởi động sau khi đăng nhập (xem ui-core.js)
    start: initApp,
    refresh: refreshApp,
    refreshCurrent: refreshCurrent,
    showToast: showToast
  };
})();
