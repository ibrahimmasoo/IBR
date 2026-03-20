const translations = {
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    gallery: "Gallery",
    platforms: "Platforms",
    support: "Support",
    contact: "Contact",
    dashboard: "Dashboard",
    viewMore: "View More",
    viewProject: "VIEW PROJECT",
    explore: "Explore",
    getInTouch: "Get in touch",
    contactEmail: "EMAIL",
    contactLinkedin: "LINKEDIN",
    contactNameLabel: "NAME",
    contactEmailLabel: "EMAIL",
    contactMessageLabel: "MESSAGE",
    contactNamePlaceholder: "Your Name",
    contactEmailPlaceholder: "Your Email",
    contactMessagePlaceholder: "Your Message",
    sendMessage: "SEND MESSAGE",
    supportCoffee: "Buy Me a Coffee",
    supportPaypal: "PayPal",
    donate: "Donate",
    chatbotTitle: "IBR AI Assistant",
    chatbotSubtitle: "Ask me anything about Ibrahim",
    chatbotGreeting: "Hi! Ask me anything about Ibrahim.",
    chatbotPlaceholder: "Ask about Ibrahim...",
    chatbotSend: "Send"
  },
  ar: {
    home: "الرئيسية",
    about: "من أنا",
    projects: "المشاريع",
    gallery: "المعرض",
    platforms: "المنصات",
    support: "الدعم",
    contact: "تواصل",
    dashboard: "لوحة التحكم",
    viewMore: "عرض المزيد",
    viewProject: "عرض المشروع",
    explore: "استكشف",
    getInTouch: "تواصل معي",
    contactEmail: "البريد الإلكتروني",
    contactLinkedin: "لينكدإن",
    contactNameLabel: "الاسم",
    contactEmailLabel: "البريد الإلكتروني",
    contactMessageLabel: "الرسالة",
    contactNamePlaceholder: "اكتب اسمك",
    contactEmailPlaceholder: "اكتب بريدك الإلكتروني",
    contactMessagePlaceholder: "اكتب رسالتك",
    sendMessage: "إرسال الرسالة",
    supportCoffee: "اشترِ لي قهوة",
    supportPaypal: "باي بال",
    donate: "تبرع",
    chatbotTitle: "مساعد IBR الذكي",
    chatbotSubtitle: "اسألني أي شيء عن إبراهيم",
    chatbotGreeting: "مرحبًا! اسألني أي شيء عن إبراهيم.",
    chatbotPlaceholder: "اسأل عن إبراهيم...",
    chatbotSend: "إرسال"
  },
  tr: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    projects: "Projeler",
    gallery: "Galeri",
    platforms: "Platformlar",
    support: "Destek",
    contact: "İletişim",
    dashboard: "Panel",
    viewMore: "Daha Fazla",
    viewProject: "PROJEYİ GÖR",
    explore: "Keşfet",
    getInTouch: "İletişime Geç",
    contactEmail: "E-POSTA",
    contactLinkedin: "LINKEDIN",
    contactNameLabel: "İSİM",
    contactEmailLabel: "E-POSTA",
    contactMessageLabel: "MESAJ",
    contactNamePlaceholder: "Adınız",
    contactEmailPlaceholder: "E-posta adresiniz",
    contactMessagePlaceholder: "Mesajınız",
    sendMessage: "MESAJ GÖNDER",
    supportCoffee: "Bana Kahve Ismarla",
    supportPaypal: "PayPal",
    donate: "Bağış Yap",
    chatbotTitle: "IBR Yapay Zeka Asistanı",
    chatbotSubtitle: "İbrahim hakkında her şeyi sor",
    chatbotGreeting: "Merhaba! İbrahim hakkında istediğini sor.",
    chatbotPlaceholder: "İbrahim hakkında sor...",
    chatbotSend: "Gönder"
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
  hero_title_ar: "إبراهيم مسعود",
  hero_subtitle_ar: "أهلًا بك",
  hero_description_ar: "استكشف عالمي وملفي الشخصي ومشاريعي والمزيد",
  about_heading_ar: "من أنا",
  about_subtitle_ar: "رحلة صنعتها الهندسة والإبداع والشغف بابتكار له معنى.",
  about_paragraph_1_ar: "اسمي إبراهيم أشرف إبراهيم مسعود، المعروف أيضًا باسم IBR. وُلدت في 28 ديسمبر 2001 في المملكة العربية السعودية، وأنا مصري من أبوين مصريين.",
  about_paragraph_2_ar: "أدرس حاليًا هندسة الحاسبات في جامعة بارتن في تركيا. أنجزت عدة مشاريع يمكنك العثور عليها في قسم مشاريعي في هذه الصفحة.",
  about_paragraph_3_ar: "أحب اللون الأسود وأحب الفن بكل أشكاله. وكانت هوايتي المفضلة في الطفولة هي الرسم.",
  about_paragraph_4_ar: "إذا أردت معرفة المزيد عني، يمكنك متابعتي على منصات التواصل الخاصة بي.",
  projects_heading_ar: "مشاريعي",
  projects_description_ar: "استكشف المشاريع التي بنيتها في التكنولوجيا والبرمجيات.",
  gallery_heading_ar: "المعرض",
  gallery_description_ar: "استكشف مجموعة من الصور واللحظات واللقطات الإبداعية من رحلتي وأعمالي.",
  platforms_heading_ar: "منصاتي",
  platforms_description_ar: "تواصل معي عبر المنصات الرقمية ومواقع التواصل المختلفة.",
  contact_label_ar: "تواصل",
  contact_title_ar: "لنتحدث",
  contact_description_ar: "أنا دائمًا منفتح على الفرص الجديدة أو التعاون أو حتى محادثة ودية.",
  support_heading_ar: "ادعمني",
  support_description_ar: "إذا أعجبتك مشاريعي، يمكنك دعم أعمالي ومشاريعي القادمة.",
  footer_text_ar: "© 2026 إبراهيم مسعود",
  hero_title_tr: "İbrahim Masood",
  hero_subtitle_tr: "Hoş Geldiniz",
  hero_description_tr: "Dünyamı, profilimi, projelerimi ve daha fazlasını keşfedin",
  about_heading_tr: "Hakkımda",
  about_subtitle_tr: "Mühendislik, yaratıcılık ve anlamlı yenilik tutkusu ile şekillenen bir yolculuk.",
  about_paragraph_1_tr: "Benim adım Ibrahim Ashraf Ibrahim Masood, diğer adıyla IBR. 28 Aralık 2001'de Suudi Arabistan'da doğdum, ancak Mısırlıyım ve Mısırlı anne babadan geldim.",
  about_paragraph_2_tr: "Şu anda Türkiye'de Bartın Üniversitesi'nde Bilgisayar Mühendisliği okuyorum. Bu sayfadaki Projelerim bölümünde bulabileceğiniz birçok projeyi tamamladım.",
  about_paragraph_3_tr: "Siyah rengi seviyorum ve sanatın her türünü seviyorum. Çocukken en sevdiğim hobim resim yapmaktı.",
  about_paragraph_4_tr: "Benim hakkımda daha fazla bilgi edinmek isterseniz sosyal medya platformlarımdan beni takip edebilirsiniz.",
  projects_heading_tr: "Projelerim",
  projects_description_tr: "Teknoloji ve yazılım alanında geliştirdiğim projeleri keşfedin.",
  gallery_heading_tr: "Galeri",
  gallery_description_tr: "Yolculuğumdan ve işlerimden görselleri, anları ve yaratıcı kareleri keşfedin.",
  platforms_heading_tr: "Platformlarım",
  platforms_description_tr: "Farklı dijital alanlarda ve sosyal medya platformlarında benimle bağlantı kurun.",
  contact_label_tr: "İLETİŞİM",
  contact_title_tr: "KONUŞALIM",
  contact_description_tr: "Yeni fırsatlara, iş birliklerine veya sadece dostça bir sohbete her zaman açığım.",
  support_heading_tr: "Beni Destekle",
  support_description_tr: "Projelerimi beğendiyseniz gelecekteki çalışmalarımı desteklemeyi düşünebilirsiniz.",
  footer_text_tr: "© 2026 Ibrahim Masood",
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

const state = {
  db: null,
  dataSource: 'fallback',
  siteContent: { ...FALLBACK_SITE_CONTENT },
  projects: [...FALLBACK_PROJECTS],
  gallery: [...FALLBACK_GALLERY],
  links: [...FALLBACK_LINKS],
  currentLang: 'en'
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

function getLocalizedContent(key) {
  const lang = state.currentLang || 'en';
  const localizedKey = lang === 'en' ? key : `${key}_${lang}`;
  const localizedValue = state.siteContent?.[localizedKey];
  const baseValue = state.siteContent?.[key];
  return String(localizedValue || baseValue || '').trim();
}

function applyStaticTranslations() {
  const lang = state.currentLang || 'en';
  const t = translations[lang] || translations.en;
  const navLinks = qsa('.nav-links a');
  if (navLinks[0]) navLinks[0].textContent = t.home;
  if (navLinks[1]) navLinks[1].textContent = t.about;
  if (navLinks[2]) navLinks[2].textContent = t.projects;
  if (navLinks[3]) navLinks[3].textContent = t.gallery;
  if (navLinks[4]) navLinks[4].textContent = t.platforms;
  if (navLinks[5]) navLinks[5].textContent = t.support;
  if (navLinks[6]) navLinks[6].textContent = t.contact;
  if (navLinks[7]) navLinks[7].textContent = t.dashboard;
  setText('.hero-content .btn', t.explore);
  setText('.about-btn', t.getInTouch);
  setText('#projects .view-more-link span', t.viewMore);
  const galleryMore = document.querySelector('#gallery .view-more-link');
  if (galleryMore) galleryMore.childNodes[0].textContent = `${t.viewMore} `;
  const talkItems = qsa('.talk-links .talk-item span');
  if (talkItems[0]) talkItems[0].textContent = t.contactEmail;
  if (talkItems[1]) talkItems[1].textContent = t.contactLinkedin;
  const talkForm = document.querySelector('.talk-form');
  if (talkForm) {
    const labels = talkForm.querySelectorAll('label');
    if (labels[0]) labels[0].textContent = t.contactNameLabel;
    if (labels[1]) labels[1].textContent = t.contactEmailLabel;
    if (labels[2]) labels[2].textContent = t.contactMessageLabel;
  }
  const talkName = byId('talkName');
  const talkEmail = byId('talkEmail');
  const talkMessage = byId('talkMessage');
  if (talkName) talkName.placeholder = t.contactNamePlaceholder;
  if (talkEmail) talkEmail.placeholder = t.contactEmailPlaceholder;
  if (talkMessage) talkMessage.placeholder = t.contactMessagePlaceholder;
  setText('.talk-btn', t.sendMessage);
  const supportCards = qsa('#support .card.center h3');
  if (supportCards[0]) supportCards[0].textContent = t.supportCoffee;
  if (supportCards[1]) supportCards[1].textContent = t.supportPaypal;
  qsa('#support .card.center .btn').forEach((btn) => btn.textContent = t.donate);
  setText('.chatbot-header h3', t.chatbotTitle);
  setText('.chatbot-header p', t.chatbotSubtitle);
  const firstBot = document.querySelector('#chatbotMessages .bot-message');
  if (firstBot && firstBot.dataset.localized !== 'user') firstBot.textContent = t.chatbotGreeting;
  const chatbotInput = byId('chatbotInput');
  if (chatbotInput) chatbotInput.placeholder = t.chatbotPlaceholder;
  const chatbotSend = document.querySelector('#chatbotForm button[type="submit"]');
  if (chatbotSend) chatbotSend.textContent = t.chatbotSend;
}

function setLanguage(lang) {
  state.currentLang = translations[lang] ? lang : 'en';
  document.documentElement.lang = state.currentLang;
  document.documentElement.dir = state.currentLang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('site-language', state.currentLang);
  qsa('.lang-switcher button').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === state.currentLang));
  applyStaticTranslations();
  renderSiteContent();
  renderProjects();
  renderGallery();
  renderLinks();
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
  const content = state.siteContent;
  renderHeroTitle(getLocalizedContent('hero_title') || content.hero_title);
  setText('#typing', getLocalizedContent('hero_subtitle') || 'Welcome Home');
  setText('.hero-content > p', getLocalizedContent('hero_description') || content.hero_description);
  setText('.about-title', getLocalizedContent('about_heading') || content.about_heading);
  setText('.about-subtitle', getLocalizedContent('about_subtitle') || content.about_subtitle);

  const aboutParagraphs = qsa('.about-text > p:not(.about-subtitle)');
  const values = [
    getLocalizedContent('about_paragraph_1') || content.about_paragraph_1,
    getLocalizedContent('about_paragraph_2') || content.about_paragraph_2,
    getLocalizedContent('about_paragraph_3') || content.about_paragraph_3,
    getLocalizedContent('about_paragraph_4') || content.about_paragraph_4
  ];
  aboutParagraphs.forEach((p, index) => {
    if (values[index]) p.textContent = values[index];
  });

  setText('#projects .projects-header h2', getLocalizedContent('projects_heading') || content.projects_heading);
  setText('#projects .projects-header p', getLocalizedContent('projects_description') || content.projects_description);
  setText('#gallery .gallery-header h2', getLocalizedContent('gallery_heading') || content.gallery_heading);
  setText('#gallery .gallery-header p', getLocalizedContent('gallery_description') || content.gallery_description);
  setText('#platforms .platforms-header h2', getLocalizedContent('platforms_heading') || content.platforms_heading);
  setText('#platforms .platforms-header p', getLocalizedContent('platforms_description') || content.platforms_description);
  setText('.talk-label', getLocalizedContent('contact_label') || content.contact_label);
  setText('.talk-title', getLocalizedContent('contact_title') || content.contact_title);
  setText('.talk-text', getLocalizedContent('contact_description') || content.contact_description);

  const talkItems = qsa('.talk-links .talk-item');
  if (talkItems[0]) {
    talkItems[0].href = content.contact_email_url || (content.contact_email ? `mailto:${content.contact_email}` : '#');
  }
  if (talkItems[1] && content.contact_linkedin_url) {
    talkItems[1].href = content.contact_linkedin_url;
  }

  setText('#support .projects-header h2', getLocalizedContent('support_heading') || content.support_heading);
  setText('#support .projects-header p', getLocalizedContent('support_description') || content.support_description);
  setText('footer', getLocalizedContent('footer_text') || content.footer_text);
  renderSiteLogo();
  renderSiteFavicon();
  applyStaticTranslations();
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
        <a href="${escapeHtml(url)}" class="project-btn" ${url !== '#' ? 'target="_blank" rel="noopener"' : ''}>${escapeHtml((translations[state.currentLang] || translations.en).viewProject)}</a>
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
      let reply = (translations[state.currentLang] || translations.en).chatbotGreeting;
      if (state.currentLang === 'ar') {
        reply = 'اسألني عن مشاريع إبراهيم أو مهاراته أو خلفيته أو طرق التواصل معه.';
        if (msg.includes('مين') || msg.includes('من') || msg.includes('about')) reply = 'إبراهيم أشرف إبراهيم مسعود، المعروف باسم IBR، طالب هندسة حاسبات مصري يدرس في جامعة بارتن في تركيا.';
        else if (msg.includes('مهارة') || msg.includes('skills')) reply = 'من مهاراته: FPGA وVerilog والأنظمة المدمجة وESP32 والهندسة بين الهاردوير والسوفتوير.';
        else if (msg.includes('مشروع') || msg.includes('project')) reply = 'يمكنك استكشاف مشاريع إبراهيم في قسم المشروعات على هذا الموقع.';
      } else if (state.currentLang === 'tr') {
        reply = "İbrahim'in projeleri, becerileri, geçmişi veya iletişim bilgileri hakkında sorular sorabilirsiniz.";
        if (msg.includes('kim') || msg.includes('about')) reply = "Ibrahim Ashraf Ibrahim Masood, yani IBR, Türkiye'de Bartın Üniversitesi'nde okuyan Mısırlı bir Bilgisayar Mühendisliği öğrencisidir.";
        else if (msg.includes('beceri') || msg.includes('skills')) reply = "Becerileri arasında FPGA, Verilog, Gömülü Sistemler, ESP32 ve donanım/yazılım mühendisliği bulunur.";
        else if (msg.includes('proje') || msg.includes('project')) reply = "İbrahim'in çalışmalarını bu sitedeki Projeler bölümünde inceleyebilirsiniz.";
      } else {
        reply = "Ask me about Ibrahim's projects, skills, background, or contact information.";
        if (msg.includes("who") || msg.includes("about")) reply = "Ibrahim Ashraf Ibrahim Masood, also known as IBR, is an Egyptian Computer Engineering student at Bartın University in Turkey.";
        else if (msg.includes("skills")) reply = "His skills include FPGA, Verilog, Embedded Systems, ESP32, and hardware/software engineering.";
        else if (msg.includes("project")) reply = "You can explore Ibrahim's completed work in the My Projects section on this website.";
        else if (msg.includes("gallery")) reply = "The gallery section highlights visual snapshots from Ibrahim's engineering journey and creative work.";
        else if (msg.includes("contact") || msg.includes("email")) reply = "You can contact Ibrahim through the contact form on this website or through his social media platforms.";
        else if (msg.includes("study") || msg.includes("education") || msg.includes("student")) reply = "Ibrahim is currently studying Computer Engineering at Bartın University in Turkey.";
        else if (msg.includes("art") || msg.includes("draw") || msg.includes("drawing")) reply = "Ibrahim loves art in all its forms, and drawing was his favorite hobby as a child.";
        else if (msg.includes("color") || msg.includes("black")) reply = "His favorite color is black.";
      }
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
        <a href="${detailsUrl}" class="project-btn">${escapeHtml((translations[state.currentLang] || translations.en).viewProject)}</a>
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
