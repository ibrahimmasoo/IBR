const supabase = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

const siteContentKeys = [
  "hero_title",
  "hero_subtitle",
  "hero_description",
  "about_heading",
  "about_body",
  "contact_title",
  "contact_description",
  "contact_email",
  "contact_button_text"
];

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

function normalizeError(error) {
  const msg = String(error?.message || error || "Unknown error");
  if (msg.includes("Invalid login credentials")) return "البريد أو كلمة السر غير صحيحة.";
  if (msg.includes("relation") || msg.includes("does not exist")) return "جداول Supabase غير موجودة. شغّل ملف SQL الأول داخل SQL Editor.";
  if (msg.includes("row-level security") || msg.includes("permission denied")) return "ليس لديك صلاحية. لازم تسجّل دخول بحساب موجود في Authentication.";
  if (msg.includes("Failed to fetch")) return "فشل الاتصال بـ Supabase. راجع Project URL و Publishable Key.";
  if (msg.includes("storage") && msg.includes("bucket")) return "Bucket الصور غير موجود. شغّل ملف SQL مرة واحدة ليتم إنشاؤه.";
  return msg;
}

function ensureAuth(actionName) {
  if (!window.currentSession) {
    showToast(`لازم تسجل دخول الأول قبل ${actionName}.`);
    return false;
  }
  return true;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fillForm(form, values) {
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) field.value = Array.isArray(value) ? value.join(", ") : (value ?? "");
  });
}

async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

function toggleManagerState(isLoggedIn) {
  document.querySelectorAll(".panel-form select, .panel-form input, .panel-form textarea, .panel-form button").forEach((el) => {
    if (el.id && ["resetProjectForm", "resetGalleryForm", "resetLinkForm"].includes(el.id)) {
      el.disabled = !isLoggedIn;
      return;
    }
    if (el.closest("#loginForm")) return;
    el.disabled = !isLoggedIn;
  });

  const lockText = document.getElementById("loginHint");
  if (lockText) {
    lockText.textContent = isLoggedIn
      ? "تم تسجيل الدخول. تقدر الآن تضيف وتعدل وتمسح البيانات."
      : "التعديل مقفول لحد ما تسجل دخول بحساب من Supabase Authentication.";
  }
}

async function loadSession() {
  const { data } = await supabase.auth.getSession();
  window.currentSession = data.session;
  const sessionInfo = document.getElementById("sessionInfo");
  sessionInfo.innerHTML = window.currentSession
    ? `<strong>Logged in:</strong> ${escapeHtml(window.currentSession.user.email)}`
    : `<strong>Status:</strong> Not logged in`;
  toggleManagerState(!!window.currentSession);
}

async function loadOverview() {
  const statsContainer = document.getElementById("dashboardStats");
  const [{ count: projectsCount }, { count: galleryCount }, { count: linksCount }, { count: eventsCount }] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("site_links").select("id", { count: "exact", head: true }),
    supabase.from("analytics_events").select("id", { count: "exact", head: true })
  ]);

  const { data: uniqueVisitorsData } = await supabase.rpc("get_unique_visitors_count");

  statsContainer.innerHTML = [
    ["Projects", projectsCount || 0, "ri-stack-line"],
    ["Gallery Images", galleryCount || 0, "ri-image-line"],
    ["Links", linksCount || 0, "ri-links-line"],
    ["Page Views", eventsCount || 0, "ri-bar-chart-line"],
    ["Unique Visitors", uniqueVisitorsData || 0, "ri-user-line"]
  ].map(([label, value, icon]) => `
    <article class="glass stat-box">
      <div>
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
      <i class="${icon}"></i>
    </article>
  `).join("");
}

async function loadSiteContent() {
  const form = document.getElementById("contentForm");
  const { data, error } = await supabase.from("site_content").select("*");
  if (error) throw error;

  const contentMap = {};
  siteContentKeys.forEach((key) => contentMap[key] = "");
  (data || []).forEach((row) => {
    contentMap[row.content_key] = row.content_value;
  });
  fillForm(form, contentMap);
}

async function saveSiteContent(event) {
  event.preventDefault();
  if (!ensureAuth("حفظ النصوص")) return;

  const formData = new FormData(event.target);
  const payload = siteContentKeys.map((key) => ({
    content_key: key,
    content_value: formData.get(key) || "",
    is_visible: true
  }));

  const { error } = await supabase.from("site_content").upsert(payload, { onConflict: "content_key" });
  if (error) throw error;
  showToast("تم حفظ النصوص بنجاح.");
}

function renderTable(targetId, columns, rows, actions) {
  const container = document.getElementById(targetId);
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">لا توجد عناصر بعد.</div>`;
    return;
  }

  const head = columns.map((col) => `<th>${col.label}</th>`).join("") + `<th>Actions</th>`;
  const body = rows.map((row) => `
    <tr>
      ${columns.map((col) => `<td>${col.render ? col.render(row[col.key], row) : escapeHtml(row[col.key] ?? '')}</td>`).join("")}
      <td class="action-cell">
        ${actions.map((action) => `<button class="table-btn ${action.className || ''}" data-action="${action.name}" data-id="${row.id}">${action.label}</button>`).join("")}
      </td>
    </tr>
  `).join("");

  container.innerHTML = `<table class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

async function loadProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw error;
  window.projectsCache = data || [];
  renderTable("projectsTable", [
    { key: "title", label: "Title" },
    { key: "is_featured", label: "Featured", render: (v) => v ? "Yes" : "No" },
    { key: "is_visible", label: "Visible", render: (v) => v ? "Yes" : "No" },
    { key: "display_order", label: "Order" }
  ], window.projectsCache, [
    { name: "edit", label: "Edit" },
    { name: "delete", label: "Delete", className: "danger" }
  ]);
}

async function saveProject(event) {
  event.preventDefault();
  if (!ensureAuth("حفظ المشروع")) return;

  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get("id");
  const payload = {
    title: formData.get("title"),
    project_url: formData.get("project_url") || null,
    image_url: formData.get("image_url") || null,
    icon: formData.get("icon") || "✦",
    description: formData.get("description") || "",
    tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    display_order: Number(formData.get("display_order") || 0),
    is_featured: formData.get("is_featured") === "true",
    is_visible: formData.get("is_visible") === "true"
  };

  const query = id
    ? supabase.from("projects").update(payload).eq("id", id)
    : supabase.from("projects").insert(payload);

  const { error } = await query;
  if (error) throw error;
  form.reset();
  form.elements.namedItem("id").value = "";
  await loadProjects();
  await loadOverview();
  showToast("تم حفظ المشروع.");
}

async function handleProjectsTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (!ensureAuth("إدارة المشاريع")) return;

  const item = window.projectsCache.find((project) => project.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("projectForm"), item);
    return;
  }

  if (button.dataset.action === "delete") {
    if (!confirm(`Delete project: ${item.title}?`)) return;
    const { error } = await supabase.from("projects").delete().eq("id", item.id);
    if (error) throw error;
    await loadProjects();
    await loadOverview();
    showToast("تم حذف المشروع.");
  }
}

async function uploadImageIfNeeded() {
  const fileInput = document.getElementById("galleryFile");
  const file = fileInput.files[0];
  if (!file) return null;

  const path = `gallery/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

async function loadGallery() {
  const { data, error } = await supabase.from("gallery_images").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw error;
  window.galleryCache = data || [];
  renderTable("galleryTable", [
    { key: "title", label: "Title" },
    { key: "layout_type", label: "Layout" },
    { key: "is_visible", label: "Visible", render: (v) => v ? "Yes" : "No" },
    { key: "display_order", label: "Order" }
  ], window.galleryCache, [
    { name: "edit", label: "Edit" },
    { name: "delete", label: "Delete", className: "danger" }
  ]);
}

async function saveGallery(event) {
  event.preventDefault();
  if (!ensureAuth("حفظ الصورة")) return;

  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get("id");
  const uploadedImageUrl = await uploadImageIfNeeded();
  const payload = {
    title: formData.get("title"),
    image_url: uploadedImageUrl || formData.get("image_url") || null,
    alt_text: formData.get("alt_text") || "",
    display_order: Number(formData.get("display_order") || 0),
    is_visible: formData.get("is_visible") === "true",
    layout_type: formData.get("layout_type") || "normal"
  };

  if (!payload.image_url) {
    showToast("لازم ترفع صورة أو تحط رابط صورة.");
    return;
  }

  const query = id
    ? supabase.from("gallery_images").update(payload).eq("id", id)
    : supabase.from("gallery_images").insert(payload);

  const { error } = await query;
  if (error) throw error;
  form.reset();
  form.elements.namedItem("id").value = "";
  document.getElementById("galleryFile").value = "";
  await loadGallery();
  await loadOverview();
  showToast("تم حفظ الصورة.");
}

async function handleGalleryTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (!ensureAuth("إدارة الصور")) return;

  const item = window.galleryCache.find((image) => image.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("galleryForm"), item);
    return;
  }

  if (button.dataset.action === "delete") {
    if (!confirm(`Delete image: ${item.title}?`)) return;
    const { error } = await supabase.from("gallery_images").delete().eq("id", item.id);
    if (error) throw error;
    await loadGallery();
    await loadOverview();
    showToast("تم حذف الصورة.");
  }
}

async function loadLinks() {
  const { data, error } = await supabase.from("site_links").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw error;
  window.linksCache = data || [];
  renderTable("linksTable", [
    { key: "label", label: "Label" },
    { key: "platform", label: "Platform" },
    { key: "is_visible", label: "Visible", render: (v) => v ? "Yes" : "No" },
    { key: "display_order", label: "Order" }
  ], window.linksCache, [
    { name: "edit", label: "Edit" },
    { name: "delete", label: "Delete", className: "danger" }
  ]);
}

async function saveLink(event) {
  event.preventDefault();
  if (!ensureAuth("حفظ اللينك")) return;

  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get("id");
  const payload = {
    label: formData.get("label"),
    url: formData.get("url"),
    platform: formData.get("platform") || "",
    icon_class: formData.get("icon_class") || "ri-links-line",
    description: formData.get("description") || "",
    display_order: Number(formData.get("display_order") || 0),
    is_visible: formData.get("is_visible") === "true",
    open_in_new_tab: formData.get("open_in_new_tab") === "true"
  };

  const query = id
    ? supabase.from("site_links").update(payload).eq("id", id)
    : supabase.from("site_links").insert(payload);

  const { error } = await query;
  if (error) throw error;
  form.reset();
  form.elements.namedItem("id").value = "";
  await loadLinks();
  await loadOverview();
  showToast("تم حفظ اللينك.");
}

async function handleLinksTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (!ensureAuth("إدارة اللينكات")) return;

  const item = window.linksCache.find((link) => link.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("linkForm"), item);
    return;
  }

  if (button.dataset.action === "delete") {
    if (!confirm(`Delete link: ${item.label}?`)) return;
    const { error } = await supabase.from("site_links").delete().eq("id", item.id);
    if (error) throw error;
    await loadLinks();
    await loadOverview();
    showToast("تم حذف اللينك.");
  }
}

async function loadAnalytics() {
  const { data: topPagesData, error: topPagesError } = await supabase.rpc("get_top_pages");
  if (topPagesError) throw topPagesError;
  document.getElementById("topPages").innerHTML = (topPagesData || []).length
    ? topPagesData.map((item) => `<div class="list-row"><span>${escapeHtml(item.page_path)}</span><strong>${item.views}</strong></div>`).join("")
    : `<div class="empty-state">لا توجد زيارات بعد.</div>`;

  const { data: recentVisitsData, error: recentError } = await supabase
    .from("analytics_events")
    .select("page_path, created_at, referrer, visitor_id")
    .order("created_at", { ascending: false })
    .limit(12);

  if (recentError) throw recentError;
  document.getElementById("recentVisits").innerHTML = (recentVisitsData || []).length
    ? recentVisitsData.map((item) => `
      <div class="visit-row">
        <strong>${escapeHtml(item.page_path)}</strong>
        <span>${new Date(item.created_at).toLocaleString()}</span>
        <small>${escapeHtml(item.referrer || 'Direct visit')} • ${escapeHtml(item.visitor_id || '-')}</small>
      </div>
    `).join("")
    : `<div class="empty-state">لا توجد زيارات مسجلة بعد.</div>`;
}

async function initializeDashboard() {
  await loadSession();
  await Promise.all([loadOverview(), loadSiteContent(), loadProjects(), loadGallery(), loadLinks(), loadAnalytics()]);
}

function setupTheme() {
  const savedTheme = localStorage.getItem("site-theme");
  if (savedTheme === "light") document.body.classList.add("light-mode");
}

function registerEvents() {
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await login(document.getElementById("loginEmail").value, document.getElementById("loginPassword").value);
      await initializeDashboard();
      showToast("تم تسجيل الدخول بنجاح.");
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
      await logout();
      await loadSession();
      showToast("تم تسجيل الخروج.");
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("contentForm").addEventListener("submit", async (event) => {
    try {
      await saveSiteContent(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("projectForm").addEventListener("submit", async (event) => {
    try {
      await saveProject(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("galleryForm").addEventListener("submit", async (event) => {
    try {
      await saveGallery(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("linkForm").addEventListener("submit", async (event) => {
    try {
      await saveLink(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("projectsTable").addEventListener("click", async (event) => {
    try {
      await handleProjectsTableClick(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("galleryTable").addEventListener("click", async (event) => {
    try {
      await handleGalleryTableClick(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("linksTable").addEventListener("click", async (event) => {
    try {
      await handleLinksTableClick(event);
    } catch (error) {
      showToast(normalizeError(error));
    }
  });

  document.getElementById("resetProjectForm").addEventListener("click", () => {
    const form = document.getElementById("projectForm");
    form.reset();
    form.elements.namedItem("id").value = "";
  });

  document.getElementById("resetGalleryForm").addEventListener("click", () => {
    const form = document.getElementById("galleryForm");
    form.reset();
    form.elements.namedItem("id").value = "";
    document.getElementById("galleryFile").value = "";
  });

  document.getElementById("resetLinkForm").addEventListener("click", () => {
    const form = document.getElementById("linkForm");
    form.reset();
    form.elements.namedItem("id").value = "";
  });

  supabase.auth.onAuthStateChange(async () => {
    await loadSession();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setupTheme();
  registerEvents();
  try {
    await initializeDashboard();
  } catch (error) {
    showToast(normalizeError(error));
  }
});
