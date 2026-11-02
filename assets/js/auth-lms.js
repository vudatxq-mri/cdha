/* ============================================================================
   HỆ THỐNG QUẢN LÝ TÀI KHOẢN & KIỂM SOÁT HỌC TUẦN TỰ (AUTH & LMS ENGINE)
   BỆNH VIỆN VĨNH PHÚC VPI — ADMIN VŨ ĐẠT
   ============================================================================ */

(function () {
  "use strict";

  var STORAGE_KEY_USERS = "vudat_cdha_users";
  var STORAGE_KEY_CURRENT_USER = "vudat_cdha_cur_user";
  var STORAGE_KEY_PROGRESS = "vudat_cdha_progress_";
  var STORAGE_KEY_MENTOR_MODE = "vudat_cdha_mentor_mode";

  // Danh sách tài khoản mẫu ban đầu: Admin Vũ Đạt & Học viên
  var DEFAULT_USERS = [
    {
      id: "user_vudat",
      username: "vudat",
      email: "vudat.cdha@vpihospital.vn",
      name: "Admin Vũ Đạt",
      hospital: "Bệnh viện Vĩnh Phúc VPI",
      role: "Admin Vũ Đạt (Giảng viên / Quản trị)",
      password: "123",
      createdAt: "2026-01-01"
    },
    {
      id: "user_hocvien",
      username: "hocvien",
      email: "hocvien@vpihospital.vn",
      name: "Học viên CĐHA VPI",
      hospital: "Bệnh viện Vĩnh Phúc VPI",
      role: "Học viên / KTV CĐHA",
      password: "123",
      createdAt: "2026-11-01"
    }
  ];

  function getUsers() {
    try {
      var d = localStorage.getItem(STORAGE_KEY_USERS);
      if (d) return JSON.parse(d);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {}
  }

  function getCurrentUser() {
    try {
      var u = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (u) return JSON.parse(u);
    } catch (e) {}
    return null;
  }

  function setCurrentUser(user) {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch (e) {}
  }

  function isMentorMode() {
    try {
      return localStorage.getItem(STORAGE_KEY_MENTOR_MODE) === "true";
    } catch (e) {
      return false;
    }
  }

  function setMentorMode(val) {
    try {
      localStorage.setItem(STORAGE_KEY_MENTOR_MODE, val ? "true" : "false");
    } catch (e) {}
  }

  function getUserProgress(userId) {
    if (!userId) return { completed: [], unlocked: [] };
    try {
      var p = localStorage.getItem(STORAGE_KEY_PROGRESS + userId);
      if (p) return JSON.parse(p);
    } catch (e) {}
    return { completed: [], unlocked: [] };
  }

  function saveUserProgress(userId, progress) {
    if (!userId) return;
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS + userId, JSON.stringify(progress));
    } catch (e) {}
  }

  /* Khởi tạo LMS Controller */
  window.VUDAT_LMS = {
    getCurrentUser: getCurrentUser,
    isMentorMode: isMentorMode,
    setMentorMode: setMentorMode,

    /* Đăng nhập */
    login: function (usernameOrEmail, password) {
      var users = getUsers();
      var u = (usernameOrEmail || "").trim().toLowerCase();
      var found = users.filter(function (x) {
        return (x.username.toLowerCase() === u || x.email.toLowerCase() === u) && x.password === password;
      })[0];
      if (found) {
        setCurrentUser(found);
        return { success: true, user: found };
      }
      return { success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác!" };
    },

    /* Đăng ký tài khoản mới */
    register: function (data) {
      var users = getUsers();
      var u = (data.username || "").trim().toLowerCase();
      var email = (data.email || "").trim().toLowerCase();

      if (!u || !data.password || !data.name) {
        return { success: false, message: "Vui lòng nhập đầy đủ họ tên, tên đăng nhập và mật khẩu!" };
      }

      var exists = users.filter(function (x) {
        return x.username.toLowerCase() === u || (email && x.email.toLowerCase() === email);
      })[0];

      if (exists) {
        return { success: false, message: "Tên đăng nhập hoặc email này đã tồn tại trong hệ thống!" };
      }

      var newUser = {
        id: "user_" + Date.now(),
        username: data.username.trim(),
        email: (data.email || (data.username + "@vpihospital.vn")).trim(),
        name: data.name.trim(),
        hospital: (data.hospital || "Bệnh viện Vĩnh Phúc VPI").trim(),
        role: data.role || "Học viên CĐHA VPI",
        password: data.password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser);

      // Khởi tạo tiến độ với bài đầu tiên được mở khóa
      var initialUnlocked = [];
      if (window.SOTAY_QUYTRINH && window.SOTAY_QUYTRINH.length > 0) {
        initialUnlocked.push(window.SOTAY_QUYTRINH[0].id);
      }
      saveUserProgress(newUser.id, { completed: [], unlocked: initialUnlocked });

      return { success: true, user: newUser };
    },

    /* Đăng xuất */
    logout: function () {
      setCurrentUser(null);
    },

    /* Lấy danh sách thứ tự bài học trong toàn bộ giáo trình (đã tích hợp bảng kiểm vào trong kỹ thuật) */
    getCurriculumSequence: function () {
      var list = [];

      // 1. Công cụ khẩn cấp & Tai biến
      list.push({ id: "emg-phan-ve", title: "Cấp cứu Phản vệ (TT 51/2017/TT-BYT) + Liều Adrenalin", category: "taibien" });
      list.push({ id: "emg-thoat-mach", title: "Quy trình 8 bước xử trí Thoát mạch & Vỡ ven", category: "taibien" });
      list.push({ id: "emg-an-toan-mri", title: "An toàn Từ trường & Xử trí Khẩn cấp MRI", category: "taibien" });
      list.push({ id: "emg-cpr", title: "Hồi sinh tim phổi CPR (AHA 2020)", category: "taibien" });

      // 2. Thuốc cản quang & Đối quang từ
      list.push({ id: "cq-ct-catalog", title: "Danh mục Thuốc cản quang CT (Iod)", category: "thuoccanquang" });
      list.push({ id: "cq-mri-catalog", title: "Danh mục Thuốc đối quang từ MRI (GBCA)", category: "thuoccanquang" });
      list.push({ id: "cq-an-toan-than", title: "An toàn chức năng thận & Dự phòng PC-AKI/CIN", category: "thuoccanquang" });
      list.push({ id: "cq-may-tinh-lieu", title: "Máy tính liều cản quang CT & CCTA", category: "thuoccanquang" });

      // 3. TDCN - Đo loãng xương DEXA
      list.push({ id: "dlx-nguyen-ly", title: "Nguyên lý & Chỉ định Đo loãng xương (DEXA)", category: "doloangxuong" });
      list.push({ id: "dlx-tu-the-roi", title: "Đặt tư thế & Vùng đo ROI L1-L4, Khớp háng", category: "doloangxuong" });
      list.push({ id: "dlx-tieu-chuan-who", title: "Tiêu chuẩn chẩn đoán WHO (T-score/Z-score/FRAX)", category: "doloangxuong" });

      // 4. Siêu âm tổng quát & Cấp cứu
      if (window.SOTAY_SIEUAM) {
        window.SOTAY_SIEUAM.forEach(function (u) {
          list.push({ id: u.id, title: u.ten, category: "sieuam" });
        });
      }

      // 5. Siêu âm can thiệp
      if (window.SOTAY_CANTHIEP) {
        window.SOTAY_CANTHIEP.forEach(function (ct) {
          list.push({ id: ct.id, title: ct.ten, category: "canthiep" });
        });
      }

      // 6. Các quy trình lâm sàng chuẩn (X-quang, CT, MRI) - Bảng kiểm đã tích hợp ở cuối bài!
      if (window.SOTAY_QUYTRINH) {
        window.SOTAY_QUYTRINH.forEach(function (q) {
          list.push({ id: q.id, title: q.ten, category: q.modality });
        });
      }

      return list;
    },

    /* Kiểm tra xem một bài học có được phép xem hay bị khóa (Bỏ khóa theo yêu cầu) */
    canAccessLesson: function (lessonId) {
      // Yêu cầu: Bỏ nội dung yêu cầu khóa - mở khóa các bài học để thuận tiện tra cứu lâm sàng
      return true;
    },

    /* Hoàn thành bài học hiện tại và mở khóa bài tiếp theo */
    completeAndUnlockNext: function (currentLessonId) {
      var curUser = getCurrentUser();
      if (!curUser) {
        return { success: false, message: "Vui lòng đăng nhập để lưu tiến độ học tập!" };
      }

      var progress = getUserProgress(curUser.id);
      if (!progress.completed) progress.completed = [];
      if (!progress.unlocked) progress.unlocked = [];

      if (progress.completed.indexOf(currentLessonId) === -1) {
        progress.completed.push(currentLessonId);
      }

      var curriculum = this.getCurriculumSequence();
      var curIndex = -1;
      for (var i = 0; i < curriculum.length; i++) {
        if (curriculum[i].id === currentLessonId) {
          curIndex = i;
          break;
        }
      }

      var nextLesson = null;
      if (curIndex !== -1 && curIndex < curriculum.length - 1) {
        nextLesson = curriculum[curIndex + 1];
        if (progress.unlocked.indexOf(nextLesson.id) === -1) {
          progress.unlocked.push(nextLesson.id);
        }
      }

      saveUserProgress(curUser.id, progress);

      return {
        success: true,
        completedCount: progress.completed.length,
        totalCount: curriculum.length,
        nextLesson: nextLesson,
        percent: Math.round((progress.completed.length / curriculum.length) * 100)
      };
    },

    /* Thống kê tiến độ học tập */
    getProgressSummary: function () {
      var curUser = getCurrentUser();
      var curriculum = this.getCurriculumSequence();
      var total = curriculum.length;

      if (!curUser) {
        return { isLoggedIn: false, completed: 0, total: total, percent: 0 };
      }

      var progress = getUserProgress(curUser.id);
      var completedCount = (progress.completed || []).length;
      var percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

      return {
        isLoggedIn: true,
        user: curUser,
        completed: completedCount,
        total: total,
        percent: percent,
        isMentor: isMentorMode() || (curUser.role && (curUser.role.indexOf("Admin") !== -1 || curUser.role.indexOf("Giảng viên") !== -1))
      };
    }
  };
})();
