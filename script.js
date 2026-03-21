const translations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    gallery: "Gallery",
    platforms: "Platforms",
    support: "Support",
    contact: "Contact",
    heroSubtitle: "Computer Engineering Student",
    heroText: "Exploring hardware, software and digital innovation",
    explore: "Explore",
    aboutTitle: "About Me",
    aboutText:
      "I'm a Computer Engineering student passionate about hardware, embedded systems, and building innovative technology that interacts with the real world.",
    projectsTitle: "Selected Projects",
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
    gallery: "المعرض",
    platforms: "المنصات",
    support: "الدعم",
    contact: "تواصل",
    heroSubtitle: "طالب هندسة حاسبات",
    heroText: "أستكشف الهاردوير والسوفتوير والابتكار الرقمي",
    explore: "استكشف",
    aboutTitle: "من أنا",
    aboutText:
      "أنا طالب هندسة حاسبات شغوف بالهاردوير والأنظمة المدمجة وبناء تقنيات مبتكرة تتفاعل مع العالم الحقيقي.",
    projectsTitle: "المشاريع المختارة",
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
    gallery: "Galeri",
    platforms: "Platformlar",
    support: "Destek",
    contact: "İletişim",
    heroSubtitle: "Bilgisayar Mühendisliği Öğrencisi",
    heroText: "Donanım, yazılım ve dijital inovasyonu keşfediyorum",
    explore: "Keşfet",
    aboutTitle: "Hakkımda",
    aboutText:
      "Gerçek dünya ile etkileşen yenilikçi teknolojiler geliştirmeye tutkulu bir Bilgisayar Mühendisliği öğrencisiyim.",
    projectsTitle: "Seçili Projeler",
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

const FALLBACK_SITE_CONTENT = {
  hero_title: "IBRAHIM MASOOD",
  hero_subtitle: "Welcome Home",
  hero_description: "Exploring my world, my profile, projects, and more",
  about_heading: "About Me",
  about_subtitle: "A journey shaped by engineering, creativity, and a passion for meaningful innovation.",
  about_paragraph_1: "My name is Ibrahim Ashraf Ibrahim Masood, aka IBR. I was born on December 28, 2001, in Saudi Arabia, but I am Egyptian, born to Egyptian parents.",
  about_paragraph_2: "I am currently studying Computer Engineering at Bartın University in Turkey. I have completed several projects, which you can find in the My Projects section below on this page.",
  about_paragraph_3: "I love the color black and I love art in all its forms. As a child, my favorite hobby was drawing.",
  about_paragraph_4: "If you would like to learn more about me, you can follow me on my social media platforms.",
  projects_heading: "My Projects",
  projects_description: "Explore the projects I've built in technology and software.",
  gallery_heading: "Gallery",
  gallery_description: "Explore a selection of visuals, moments, and creative shots from my work and journey.",
  platforms_heading: "My Platforms",
  platforms_description: "Connect with me across various digital spaces and social media.",
  contact_label: "CONTACT",
  contact_title: "LET'S TALK",
  contact_description: "I'm always open to new opportunities, collaborations, or simply a friendly conversation.",
  contact_email: "ibrahimmasoud201@gmail.com",
  contact_email_url: "https://mail.google.com/mail/?view=cm&fs=1&to=ibrahimmasoud201@gmail.com",
  contact_linkedin_url: "https://www.linkedin.com/in/ibrahim-masood-2b14b2256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  support_heading: "Support Me",
  support_description: "If you like my projects, please consider supporting my future work and creations.",
  footer_text: "© 2026 Ibrahim Masood",
  site_logo_url: "",
  site_favicon_url: ""
};

const FALLBACK_PROJECTS = [
  {
    title: "Autonomous Drone Controller",
    description: "A custom flight controller built with ESP32 featuring PID stabilization.",
    image_url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    project_url: "#",
    icon: "⚙",
    tags: ["C++", "ESP32", "Embedded"],
    is_featured: true,
    is_visible: true,
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    title: "FPGA Image Processor",
    description: "Hardware accelerated image filtering implemented in Verilog.",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    project_url: "#",
    icon: "▣",
    tags: ["Verilog", "FPGA", "Hardware"],
    is_featured: true,
    is_visible: true,
    display_order: 2,
    created_at: new Date().toISOString()
  },
  {
    title: "Smart Home System",
    description: "IoT-based smart home automation system using sensors and ESP32.",
    image_url: "https://images.unsplash.com/photo-1581091870627-3c0c3e9c9b2b?auto=format&fit=crop&w=1200&q=80",
    project_url: "#",
    icon: "💡",
    tags: ["IoT", "ESP32", "Automation"],
    is_featured: true,
    is_visible: true,
    display_order: 3,
    created_at: new Date().toISOString()
  },
  {
    title: "Portfolio Website",
    description: "A personal responsive portfolio website built with HTML, CSS, and JavaScript.",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    project_url: "#",
    icon: "🌐",
    tags: ["HTML", "CSS", "JavaScript"],
    is_featured: true,
    is_visible: true,
    display_order: 4,
    created_at: new Date().toISOString()
  },
  {
    title: "Embedded Monitoring System",
    description: "A real-time monitoring solution for sensors and devices using microcontrollers.",
    image_url: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    project_url: "#",
    icon: "🖧",
    tags: ["Embedded", "Sensors", "C"],
    is_featured: true,
    is_visible: true,
    display_order: 5,
    created_at: new Date().toISOString()
  },
  {
    title: "Digital Logic Simulator",
    description: "A project for simulating digital logic circuits and testing hardware behavior.",
    image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    project_url: "#",
    icon: "🔌",
    tags: ["Logic Design", "Simulation", "Engineering"],
    is_featured: true,
    is_visible: true,
    display_order: 6,
    created_at: new Date().toISOString()
  }
];

const FALLBACK_GALLERY = [
  { title: "Gallery 1", image_url: "images/gallery-1.jpeg", alt_text: "Gallery Image 1", layout_type: "tall", is_visible: true, display_order: 1 },
  { title: "Gallery 2", image_url: "images/gallery-2.jpeg", alt_text: "Gallery Image 2", layout_type: "normal", is_visible: true, display_order: 2 }
];

const FALLBACK_LINKS = [
  { label: "Instagram", url: "https://www.instagram.com/ibrahimasooo/", platform: "instagram", icon_class: "ri-instagram-line", description: "Instagram", open_in_new_tab: true, is_visible: true, display_order: 1 },
  { label: "Facebook", url: "https://www.facebook.com/ibrahim.masoud.5686/", platform: "facebook", icon_class: "ri-facebook-circle-line", description: "Facebook", open_in_new_tab: true, is_visible: true, display_order: 2 },
  { label: "TikTok", url: "https://www.tiktok.com/@ibrahimmasood201", platform: "tiktok", icon_class: "ri-tiktok-line", description: "TikTok", open_in_new_tab: true, is_visible: true, display_order: 3 },
  { label: "X", url: "https://x.com/Gadamadafada", platform: "twitter", icon_class: "ri-twitter-x-line", description: "X", open_in_new_tab: true, is_visible: true, display_order: 4 },
  { label: "YouTube", url: "https://youtube.com/@ibrahimmasood29?si=sDG70g6_lIs7Lnxn", platform: "youtube", icon_class: "ri-youtube-line", description: "YouTube", open_in_new_tab: true, is_visible: true, display_order: 5 },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/ibrahim-masood-2b14b2256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", platform: "linkedin", icon_class: "ri-linkedin-box-line", description: "LinkedIn", open_in_new_tab: true, is_visible: true, display_order: 6 },
  { label: "Linktree", url: "https://linktr.ee/IBR.201?utm_source=linktree_profile_share&ltsid=7fb4e0c1-9398-4ce5-9638-5ffcdda308f7", platform: "linktree", icon_class: "ri-links-line", description: "Linktree", open_in_new_tab: true, is_visible: true, display_order: 7 },
  { label: "GitHub", url: "https://github.com/ibrahimmasoo", platform: "github", icon_class: "ri-github-line", description: "GitHub", open_in_new_tab: true, is_visible: true, display_order: 8 }
];

const localizedTextKeys = [
  "hero_title",
  "hero_subtitle",
  "hero_description",
  "about_heading",
  "about_subtitle",
  "about_paragraph_1",
  "about_paragraph_2",
  "about_paragraph_3",
  "about_paragraph_4",
  "projects_heading",
  "projects_description",
  "gallery_heading",
  "gallery_description",
  "platforms_heading",
  "platforms_description",
  "contact_label",
  "contact_title",
  "contact_description",
  "support_heading",
  "support_description",
  "footer_text"
];

function getLocalizedSiteContent(lang) {
  const base = { ...state.siteContent };
  if (lang === 'en') return base;
  localizedTextKeys.forEach((key) => {
    const localizedValue = state.siteContent?.[`${key}_${lang}`];
    if (localizedValue != null && String(localizedValue).trim() !== '') {
      base[key] = localizedValue;
    }
  });
  return base;
}

const state = {
  db: null,
  dataSource: 'fallback',
  siteContent: { ...FALLBACK_SITE_CONTENT },
  projects: [...FALLBACK_PROJECTS],
  gallery: [...FALLBACK_GALLERY],
  links: [...FALLBACK_LINKS],
  currentLang: localStorage.getItem('site-language') || 'en'
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }
function byId(id) { return document.getElementById(id); }

function createDbClient() {
  if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return null;
  try {
    return window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  } catch (_) {
    return null;
  }
}

function setLanguage(lang) {
  qsa("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });

  qsa("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
  });

  state.currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem("site-language", lang);

  qsa(".lang-switcher button").forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`.lang-switcher button[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  renderSiteContent();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("site-theme", isLight ? "light" : "dark");
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) themeBtn.textContent = isLight ? "☾" : "☀";
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");
  if (!navLinks || !menuToggle) return;
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("active") ? "true" : "false");
}

function renderHeroTitle(name) {
  const title = String(name || "IBRAHIM MASOOD");
  const heroName = byId("heroName");
  if (!heroName) return;
  heroName.innerHTML = title.split("").map((char) => char === ' ' ? '<span class="space">&nbsp;</span>' : `<span>${escapeHtml(char)}</span>`).join("");
  bindHeroLetters();
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value != null) el.textContent = value;
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el && value != null) el.innerHTML = value;
}

function renderSiteLogo() {
  const logoUrl = String(state.siteContent?.site_logo_url || "").trim();
  document.querySelectorAll(".logo").forEach((logo) => {
    const img = logo.querySelector(".site-logo-image");
    if (!img) return;

    img.onerror = () => {
      img.hidden = true;
      img.removeAttribute("src");
      logo.classList.remove("has-image");
    };

    if (logoUrl) {
      img.src = logoUrl;
      img.hidden = false;
      logo.classList.add("has-image");
    } else {
      img.hidden = true;
      img.removeAttribute("src");
      logo.classList.remove("has-image");
    }
  });
}

function renderSiteFavicon() {
  const faviconUrl = String(state.siteContent?.site_favicon_url || "").trim();
  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = faviconUrl || 'favicon.jpeg';
}

function renderSiteContent() {
  const content = getLocalizedSiteContent(state.currentLang || 'en');
  renderHeroTitle(content.hero_title);
  setText("#typing", content.hero_subtitle || "Welcome Home");
  setText(".hero-content > p", content.hero_description);
  setText(".about-title", content.about_heading);
  setText(".about-subtitle", content.about_subtitle);

  const aboutParagraphs = qsa(".about-text > p:not(.about-subtitle)");
  const values = [content.about_paragraph_1, content.about_paragraph_2, content.about_paragraph_3, content.about_paragraph_4];
  aboutParagraphs.forEach((p, index) => {
    if (values[index]) p.textContent = values[index];
  });

  setText("#projects .projects-header h2", content.projects_heading);
  setText("#projects .projects-header p", content.projects_description);
  setText("#gallery .gallery-header h2", content.gallery_heading);
  setText("#gallery .gallery-header p", content.gallery_description);
  setText("#platforms .platforms-header h2", content.platforms_heading);
  setText("#platforms .platforms-header p", content.platforms_description);
  setText(".talk-label", content.contact_label);
  setText(".talk-title", content.contact_title);
  setText(".talk-text", content.contact_description);

  const talkItems = qsa(".talk-links .talk-item");
  if (talkItems[0]) {
    talkItems[0].href = content.contact_email_url || (content.contact_email ? `mailto:${content.contact_email}` : '#');
    const label = talkItems[0].querySelector("span");
    if (label) label.textContent = content.contact_email ? String(content.contact_email).toUpperCase() : "EMAIL";
  }
  if (talkItems[1] && content.contact_linkedin_url) {
    talkItems[1].href = content.contact_linkedin_url;
  }

  setText("#support .projects-header h2", content.support_heading);
  setText("#support .projects-header p", content.support_description);
  setText("footer", content.footer_text);
  renderSiteLogo();
  renderSiteFavicon();
}

function projectCardMarkup(project) {
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const url = project.project_url || '#';
  return `
    <div class="project-card">
      ${project.image_url ? `<img src="${escapeHtml(project.image_url)}" alt="${escapeHtml(project.title)}">` : ''}
      <div class="project-content">
        <div class="project-icon">${escapeHtml(project.icon || '✦')}</div>
        <h3>${escapeHtml(project.title || '')}</h3>
        <p>${escapeHtml(project.description || '')}</p>
        <div class="project-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        <a href="${escapeHtml(url)}" class="project-btn" ${url !== '#' ? 'target="_blank" rel="noopener"' : ''}>VIEW PROJECT</a>
      </div>
    </div>`;
}

function renderProjects() {
  const homepageGrid = document.querySelector("#projects .projects-grid");
  const allProjectsGrid = document.querySelector("body.projects-page .projects-grid");
  const items = state.projects.filter((item) => item.is_visible !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || new Date(b.created_at || 0) - new Date(a.created_at || 0));

  if (homepageGrid) homepageGrid.innerHTML = items.slice(0, 6).map(projectCardMarkup).join('');
  if (allProjectsGrid) allProjectsGrid.innerHTML = items.map(projectCardMarkup).join('');
}

function galleryItemMarkup(item) {
  const layout = item.layout_type && ["normal", "wide", "tall"].includes(item.layout_type) ? item.layout_type : "normal";
  return `<div class="gallery-item ${layout}"><img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(item.alt_text || item.title || 'Gallery image')}"></div>`;
}

function renderGallery() {
  const homepageGrid = document.querySelector("#gallery .gallery-grid");
  const galleryPageGrid = document.querySelector("body.gallery-page .gallery-grid");
  const items = state.gallery.filter((item) => item.is_visible !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || new Date(b.created_at || 0) - new Date(a.created_at || 0));

  if (homepageGrid) homepageGrid.innerHTML = items.slice(0, 6).map(galleryItemMarkup).join('');
  if (galleryPageGrid) galleryPageGrid.innerHTML = items.map(galleryItemMarkup).join('');
}

function platformItemMarkup(link) {
  const platformClass = escapeHtml((link.platform || '').toLowerCase());
  return `
    <a href="${escapeHtml(link.url || '#')}" ${link.open_in_new_tab !== false ? 'target="_blank" rel="noopener"' : ''} class="platform-item ${platformClass}">
      <div class="platform-inner">
        <span class="platform-icon"><i class="${escapeHtml(link.icon_class || 'ri-links-line')}"></i></span>
        <span class="platform-name">${escapeHtml(link.label || '')}</span>
      </div>
    </a>`;
}

function renderLinks() {
  const grid = document.querySelector("#platforms .platforms-grid");
  if (!grid) return;
  const items = state.links.filter((item) => item.is_visible !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || new Date(b.created_at || 0) - new Date(a.created_at || 0));
  grid.innerHTML = items.map(platformItemMarkup).join('');
}

async function fetchTable(name, fallback) {
  if (!state.db) return fallback;
  const { data, error } = await state.db.from(name).select('*');
  if (error || !data) return fallback;
  state.dataSource = 'supabase';
  return data;
}

async function loadDynamicContent() {
  state.db = createDbClient();
  if (!state.db) {
    renderSiteContent(); renderProjects(); renderGallery(); renderLinks();
    return;
  }

  const [siteContentRows, projectsRows, galleryRows, linksRows] = await Promise.all([
    fetchTable('site_content', []),
    fetchTable('projects', FALLBACK_PROJECTS),
    fetchTable('gallery_images', FALLBACK_GALLERY),
    fetchTable('site_links', FALLBACK_LINKS)
  ]);

  if (Array.isArray(siteContentRows) && siteContentRows.length) {
    const mapped = { ...FALLBACK_SITE_CONTENT };
    siteContentRows.forEach((row) => {
      if (row.content_key) mapped[row.content_key] = row.content_value || '';
    });
    state.siteContent = mapped;
  }

  state.projects = Array.isArray(projectsRows) && projectsRows.length ? projectsRows : [...FALLBACK_PROJECTS];
  state.gallery = Array.isArray(galleryRows) && galleryRows.length ? galleryRows : [...FALLBACK_GALLERY];
  state.links = Array.isArray(linksRows) && linksRows.length ? linksRows : [...FALLBACK_LINKS];

  renderSiteContent();
  renderProjects();
  renderGallery();
  renderLinks();
  trackPageView();
}

async function trackPageView() {
  if (!state.db) return;
  try {
    let visitorId = localStorage.getItem('site_visitor_id');
    if (!visitorId) {
      visitorId = (window.crypto?.randomUUID?.() || String(Date.now()));
      localStorage.setItem('site_visitor_id', visitorId);
    }
    await state.db.from('analytics_events').insert({
      event_type: 'page_view',
      page_path: window.location.pathname || '/',
      visitor_id: visitorId,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      screen_size: `${window.innerWidth}x${window.innerHeight}`
    });
  } catch (_) {}
}

function bindHeroLetters() {
  const heroLetters = qsa("#heroName span:not(.space)");
  const heroName = byId("heroName");
  heroLetters.forEach((letter, index) => {
    letter.addEventListener("mouseenter", () => {
      heroLetters.forEach((l) => l.classList.remove("active-letter", "near-1", "near-2"));
      letter.classList.add("active-letter");
      if (heroLetters[index - 1]) heroLetters[index - 1].classList.add("near-1");
      if (heroLetters[index + 1]) heroLetters[index + 1].classList.add("near-1");
      if (heroLetters[index - 2]) heroLetters[index - 2].classList.add("near-2");
      if (heroLetters[index + 2]) heroLetters[index + 2].classList.add("near-2");
    });
    letter.addEventListener("click", () => {
      letter.classList.remove("clicked-letter", "shake");
      void letter.offsetWidth;
      letter.classList.add("clicked-letter", "shake");
      setTimeout(() => letter.classList.remove("clicked-letter", "shake"), 650);
    });
  });
  if (heroName) heroName.addEventListener("mouseleave", () => heroLetters.forEach((l) => l.classList.remove("active-letter", "near-1", "near-2")));
}

function bindCommonInteractions() {
  const savedTheme = localStorage.getItem("site-theme");
  const savedLang = localStorage.getItem("site-language") || "en";
  if (savedTheme === "light") document.body.classList.add("light-mode");

  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.textContent = document.body.classList.contains("light-mode") ? "☾" : "☀";
    themeBtn.addEventListener("click", toggleTheme);
  }

  qsa(".lang-switcher button").forEach((btn) => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
  setLanguage(savedLang);

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", toggleMobileMenu);
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show-section");
    });
  }, { threshold: 0.15 });

  qsa(".section, .card, .project-card, .talk-section, .gallery-item, .platform-item").forEach((el) => observer.observe(el));

  const logoLink = byId("logoLink");
  if (logoLink && logoLink.getAttribute("href") === "#home") {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const chatbotToggle = byId("chatbotToggle");
  const chatbotClose = byId("chatbotClose");
  const chatbotBox = byId("chatbotBox");
  const chatbotForm = byId("chatbotForm");
  const chatbotInput = byId("chatbotInput");
  const chatbotMessages = byId("chatbotMessages");

  if (chatbotToggle && chatbotClose && chatbotBox && chatbotForm && chatbotInput && chatbotMessages) {
    chatbotToggle.addEventListener("click", () => chatbotBox.classList.toggle("open"));
    chatbotClose.addEventListener("click", () => chatbotBox.classList.remove("open"));
    chatbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rawMsg = chatbotInput.value.trim();
      const msg = rawMsg.toLowerCase();
      if (!rawMsg) return;
      addMessage(rawMsg, "user", chatbotMessages);
      chatbotInput.value = "";
      let reply = "Ask me about Ibrahim's projects, skills, background, or contact information.";
      if (msg.includes("who") || msg.includes("about")) reply = "Ibrahim Ashraf Ibrahim Masood, also known as IBR, is an Egyptian Computer Engineering student at Bartın University in Turkey.";
      else if (msg.includes("skills")) reply = "His skills include FPGA, Verilog, Embedded Systems, ESP32, and hardware/software engineering.";
      else if (msg.includes("project")) reply = "You can explore Ibrahim's completed work in the My Projects section on this website.";
      else if (msg.includes("gallery")) reply = "The gallery section highlights visual snapshots from Ibrahim's engineering journey and creative work.";
      else if (msg.includes("contact") || msg.includes("email")) reply = "You can contact Ibrahim through the contact form on this website or through his social media platforms.";
      else if (msg.includes("study") || msg.includes("education") || msg.includes("student")) reply = "Ibrahim is currently studying Computer Engineering at Bartın University in Turkey.";
      else if (msg.includes("art") || msg.includes("draw") || msg.includes("drawing")) reply = "Ibrahim loves art in all its forms, and drawing was his favorite hobby as a child.";
      else if (msg.includes("color") || msg.includes("black")) reply = "His favorite color is black.";
      setTimeout(() => addMessage(reply, "bot", chatbotMessages), 300);
    });
  }
}

function addMessage(text, sender, chatbotMessages) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.textContent = text;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

document.addEventListener("DOMContentLoaded", async () => {
  bindCommonInteractions();
  renderSiteContent();
  renderProjects();
  renderGallery();
  renderLinks();
  await loadDynamicContent();
});


const LOCAL_PROJECTS_KEY = "ibr_local_projects";

function getLocalProjects() {
  try { return JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || "[]"); }
  catch (_) { return []; }
}

function buildProjectDetailsUrl(project) {
  const id = encodeURIComponent(project.id || project.title || "project");
  const source = encodeURIComponent(project.source || "remote");
  return `project-details.html?id=${id}&source=${source}`;
}

const originalProjectCardMarkup = projectCardMarkup;
projectCardMarkup = function(project) {
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const detailsUrl = buildProjectDetailsUrl(project);
  return `
    <div class="project-card">
      ${project.image_url ? `<img src="${escapeHtml(project.image_url)}" alt="${escapeHtml(project.title)}">` : ''}
      <div class="project-content">
        <div class="project-icon">${escapeHtml(project.icon || '✦')}</div>
        <h3>${escapeHtml(project.title || '')}</h3>
        <p>${escapeHtml(project.description || '')}</p>
        <div class="project-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        <a href="${detailsUrl}" class="project-btn">VIEW PROJECT</a>
      </div>
    </div>`;
}

const originalLoadDynamicContent = loadDynamicContent;
loadDynamicContent = async function() {
  await originalLoadDynamicContent();
  const localItems = getLocalProjects();
  if (localItems.length) {
    const remoteIds = new Set((state.projects || []).map((item) => String(item.id)));
    const merged = [...localItems.filter((item) => !remoteIds.has(String(item.id))), ...state.projects];
    state.projects = merged;
    renderProjects();
  }
}
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("talkName").value.trim();
    const email = document.getElementById("talkEmail").value.trim();
    const message = document.getElementById("talkMessage").value.trim();

    try {
      const res = await fetch("https://tgbgeobkdolfxkzmtxf.supabase.co/functions/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully 🚀");
        form.reset();
        form.querySelector(".talk-btn").textContent = "Sent ✅";
      } else {
        alert("Failed to send ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  });
}
