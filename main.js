const supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

const fallbackSiteContent = {
  hero_title: "Ibrahim Masood",
  hero_subtitle: "Computer Engineering Student & Builder",
  hero_description: "This portfolio is now connected to Supabase. You can control content, projects, images, links, and analytics from the admin dashboard.",
  about_heading: "A portfolio backed by a real dashboard",
  about_body: "This website now reads its content from Supabase instead of hard-coded HTML. That means you can edit text, add projects, upload images, and manage links without opening the code every time.",
  contact_title: "Let’s work together",
  contact_description: "Use the dashboard to change this contact section whenever you want.",
  contact_email: "hello@example.com",
  contact_button_text: "Send Email"
};

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function setupTheme() {
  const savedTheme = localStorage.getItem("site-theme");
  if (savedTheme === "light") document.body.classList.add("light-mode");
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;
  themeBtn.textContent = document.body.classList.contains("light-mode") ? "☾" : "☀";
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("site-theme", isLight ? "light" : "dark");
    themeBtn.textContent = isLight ? "☾" : "☀";
  });
}

function setupMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (!menuToggle || !navLinks) return;
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("active") ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderProjects(targetId, items, limit = null) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const visibleItems = (limit ? items.slice(0, limit) : items);
  if (!visibleItems.length) {
    container.innerHTML = `<div class="empty-state glass">No projects yet. Add them from the dashboard.</div>`;
    return;
  }
  container.innerHTML = visibleItems.map((project) => `
    <article class="card project-card glass">
      <img src="${escapeHtml(project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80')}" alt="${escapeHtml(project.title)}">
      <div class="project-content">
        <div class="project-icon">${escapeHtml(project.icon || '✦')}</div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description || '')}</p>
        <div class="project-tags">${(project.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        ${project.project_url ? `<a href="${escapeHtml(project.project_url)}" target="_blank" rel="noreferrer" class="project-btn">View Project</a>` : `<span class="project-btn disabled">No Link</span>`}
      </div>
    </article>
  `).join("");
}

function renderGallery(targetId, items, limit = null) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const visibleItems = (limit ? items.slice(0, limit) : items);
  if (!visibleItems.length) {
    container.innerHTML = `<div class="empty-state glass">No gallery images yet. Add them from the dashboard.</div>`;
    return;
  }
  container.innerHTML = visibleItems.map((image) => `
    <figure class="gallery-item ${escapeHtml(image.layout_type || 'normal')} glass">
      <img src="${escapeHtml(image.image_url)}" alt="${escapeHtml(image.alt_text || image.title || 'Gallery image')}">
      <figcaption>${escapeHtml(image.title || '')}</figcaption>
    </figure>
  `).join("");
}

function renderLinks(items) {
  const container = document.getElementById("linksGrid");
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<div class="empty-state glass">No links yet. Add them from the dashboard.</div>`;
    return;
  }
  container.innerHTML = items.map((link) => `
    <a class="glass link-card" href="${escapeHtml(link.url)}" ${link.open_in_new_tab ? 'target="_blank" rel="noreferrer"' : ''}>
      <div class="link-icon"><i class="${escapeHtml(link.icon_class || 'ri-links-line')}"></i></div>
      <div>
        <h3>${escapeHtml(link.label)}</h3>
        <p>${escapeHtml(link.description || link.platform || '')}</p>
      </div>
      <i class="ri-arrow-right-up-line"></i>
    </a>
  `).join("");
}

async function loadSiteContent() {
  const { data } = await supabase
    .from("site_content")
    .select("content_key, content_value")
    .eq("is_visible", true);

  const contentMap = { ...fallbackSiteContent };
  (data || []).forEach((item) => {
    contentMap[item.content_key] = item.content_value;
  });

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "";
  };

  setText("heroTitle", contentMap.hero_title);
  setText("heroSubtitle", contentMap.hero_subtitle);
  setText("heroDescription", contentMap.hero_description);
  setText("aboutHeading", contentMap.about_heading);
  setText("aboutBody", contentMap.about_body);
  setText("contactTitle", contentMap.contact_title);
  setText("contactDescription", contentMap.contact_description);

  const contactButton = document.getElementById("contactButton");
  if (contactButton) {
    contactButton.textContent = contentMap.contact_button_text || "Send Email";
    contactButton.href = `mailto:${contentMap.contact_email || 'hello@example.com'}`;
  }
}

async function loadProjectsAndGallery() {
  const [{ data: projects }, { data: gallery }, { data: links }] = await Promise.all([
    supabase.from("projects").select("*").eq("is_visible", true).order("display_order", { ascending: true }).order("created_at", { ascending: false }),
    supabase.from("gallery_images").select("*").eq("is_visible", true).order("display_order", { ascending: true }).order("created_at", { ascending: false }),
    supabase.from("site_links").select("*").eq("is_visible", true).order("display_order", { ascending: true }).order("created_at", { ascending: false })
  ]);

  const featuredProjects = (projects || []).filter((item) => item.is_featured);
  renderProjects("featuredProjects", featuredProjects.length ? featuredProjects : (projects || []), 6);
  renderProjects("allProjectsGrid", projects || []);
  renderGallery("galleryGrid", gallery || [], 6);
  renderGallery("allGalleryGrid", gallery || []);
  renderLinks(links || []);

  const count = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  count("heroProjectsCount", (projects || []).length);
  count("heroGalleryCount", (gallery || []).length);
  count("heroLinksCount", (links || []).length);
}

async function trackAnalytics() {
  try {
    const visitorIdKey = "ibr_visitor_id";
    let visitorId = localStorage.getItem(visitorIdKey);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(visitorIdKey, visitorId);
    }

    await supabase.from("analytics_events").insert({
      event_type: "page_view",
      page_path: window.location.pathname,
      visitor_id: visitorId,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      screen_size: `${window.innerWidth}x${window.innerHeight}`
    });
  } catch (error) {
    console.warn("Analytics tracking skipped", error.message);
  }
}

async function init() {
  setupTheme();
  setupMenu();
  await Promise.all([loadSiteContent(), loadProjectsAndGallery(), trackAnalytics()]);
}

document.addEventListener("DOMContentLoaded", init);
