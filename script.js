const translations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    support: "Support",
    contact: "Contact",
    heroSubtitle: "Computer Engineering Student",
    heroText: "Exploring hardware, software and digital innovation",
    explore: "Explore",
    aboutTitle: "About Me",
    aboutText:
      "I'm a Computer Engineering student passionate about hardware, embedded systems, and building innovative technology that interacts with the real world.",
    projectsTitle: "Selected Projects",
    project1Title: "Autonomous Drone Controller",
    project1Text: "ESP32 drone flight controller with PID stabilization.",
    project2Title: "FPGA Image Processor",
    project2Text: "Hardware accelerated image processing using Verilog.",
    supportTitle: "Support My Work",
    supportCoffee: "Buy Me a Coffee",
    donate: "Donate",
    contactTitle: "Let's Connect",
    sendMessage: "Send Message",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    messagePlaceholder: "Message"
  },
  ar: {
    home: "الرئيسية",
    about: "من أنا",
    projects: "المشاريع",
    support: "الدعم",
    contact: "تواصل",
    heroSubtitle: "طالب هندسة حاسبات",
    heroText: "أستكشف الهاردوير والسوفتوير والابتكار الرقمي",
    explore: "استكشف",
    aboutTitle: "من أنا",
    aboutText:
      "أنا طالب هندسة حاسبات شغوف بالهاردوير والأنظمة المدمجة وبناء تقنيات مبتكرة تتفاعل مع العالم الحقيقي.",
    projectsTitle: "المشاريع المختارة",
    project1Title: "وحدة تحكم لطائرة بدون طيار",
    project1Text: "وحدة تحكم طيران ESP32 مع تثبيت PID.",
    project2Title: "معالج صور باستخدام FPGA",
    project2Text: "معالجة صور مسرعة عتاديًا باستخدام Verilog.",
    supportTitle: "ادعم عملي",
    supportCoffee: "اشترِ لي قهوة",
    donate: "تبرع",
    contactTitle: "دعنا نتواصل",
    sendMessage: "إرسال الرسالة",
    namePlaceholder: "الاسم",
    emailPlaceholder: "البريد الإلكتروني",
    messagePlaceholder: "الرسالة"
  },
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    projects: "Projeler",
    support: "Destek",
    contact: "İletişim",
    heroSubtitle: "Bilgisayar Mühendisliği Öğrencisi",
    heroText: "Donanım, yazılım ve dijital inovasyonu keşfediyorum",
    explore: "Keşfet",
    aboutTitle: "Hakkımda",
    aboutText:
      "Gerçek dünya ile etkileşen yenilikçi teknolojiler geliştirmeye tutkulu bir Bilgisayar Mühendisliği öğrencisiyim.",
    projectsTitle: "Seçili Projeler",
    project1Title: "Otonom Drone Kontrolcüsü",
    project1Text: "PID stabilizasyonlu ESP32 drone uçuş kontrolcüsü.",
    project2Title: "FPGA Görüntü İşleyici",
    project2Text: "Verilog kullanılarak donanım hızlandırmalı görüntü işleme.",
    supportTitle: "Çalışmalarımı Destekle",
    supportCoffee: "Bana Kahve Ismarla",
    donate: "Bağış Yap",
    contactTitle: "İletişime Geçelim",
    sendMessage: "Mesaj Gönder",
    namePlaceholder: "İsim",
    emailPlaceholder: "E-posta",
    messagePlaceholder: "Mesaj"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem("site-language", lang);

  document.querySelectorAll(".lang-switcher button").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeBtn = document.querySelector(`.lang-switcher button[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("site-theme", isLight ? "light" : "dark");

  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.textContent = isLight ? "☾" : "☀";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("site-theme");
  const savedLang = localStorage.getItem("site-language") || "en";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.textContent = document.body.classList.contains("light-mode") ? "☾" : "☀";
    themeBtn.addEventListener("click", toggleTheme);
  }

  document.querySelectorAll(".lang-switcher button").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  setLanguage(savedLang);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-section");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".section, .card").forEach((el) => {
    observer.observe(el);
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  const heroLetters = document.querySelectorAll("#heroName span:not(.space)");
  const heroName = document.getElementById("heroName");

  heroLetters.forEach((letter, index) => {
    letter.addEventListener("mouseenter", () => {
      heroLetters.forEach((l) => {
        l.classList.remove("active-letter", "near-1", "near-2");
      });

      letter.classList.add("active-letter");

      if (heroLetters[index - 1]) heroLetters[index - 1].classList.add("near-1");
      if (heroLetters[index + 1]) heroLetters[index + 1].classList.add("near-1");
      if (heroLetters[index - 2]) heroLetters[index - 2].classList.add("near-2");
      if (heroLetters[index + 2]) heroLetters[index + 2].classList.add("near-2");
    });

    letter.addEventListener("click", () => {
      letter.classList.remove("clicked-letter");
      void letter.offsetWidth;
      letter.classList.add("clicked-letter");

      setTimeout(() => {
        letter.classList.remove("clicked-letter");
      }, 650);
    });
  });

  if (heroName) {
    heroName.addEventListener("mouseleave", () => {
      heroLetters.forEach((l) => {
        l.classList.remove("active-letter", "near-1", "near-2");
      });
    });
  }
});
