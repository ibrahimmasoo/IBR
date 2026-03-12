
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
      "I'm a Computer Engineering student passionate about hardware, embedded systems, and building innovative technology that interacts with the real world."
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
      "أنا طالب هندسة حاسبات شغوف بالهاردوير والأنظمة المدمجة وبناء تقنيات مبتكرة تتفاعل مع العالم الحقيقي."
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
      "Gerçek dünya ile etkileşen yenilikçi teknolojiler geliştirmeye tutkulu bir Bilgisayar Mühendisliği öğrencisiyim."
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  localStorage.setItem("site-language", lang);

  document.querySelectorAll(".lang-switcher button").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeBtn = document.querySelector(`.lang-switcher button[onclick="setLanguage('${lang}')"]`);
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

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("site-theme");
  const savedLang = localStorage.getItem("site-language") || "en";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.textContent = document.body.classList.contains("light-mode") ? "☾" : "☀";
  }

  setLanguage(savedLang);
});
