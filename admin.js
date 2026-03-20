const SUPABASE_URL = window.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY;
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const siteContentKeys = [
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
  "contact_email",
  "contact_email_url",
  "contact_linkedin_url",
  "support_heading",
  "support_description",
  "footer_text",
  "site_logo_url"
];

window.projectsCache = [];
window.galleryCache = [];
window.linksCache = [];

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return alert(message);
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

function normalizeError(error) {
  const msg = String(error?.message || error || "Unknown error");
  if (msg.includes("relation") || msg.includes("does not exist")) return "جداول Supabase غير موجودة. شغّل ملف SQL داخل SQL Editor.";
  if (msg.includes("row-level security") || msg.includes("permission denied")) return "صلاحيات Supabase تمنع التعديل. شغّل ملف SQL الجديد الخاص بالداشبورد العامة.";
  if (msg.includes("Failed to fetch")) return "فشل الاتصال بـ Supabase. راجع Project URL و Publishable Key.";
  if (msg.includes("bucket")) return "Bucket الصور غير موجود. شغّل ملف SQL أو أنشئ site-media في Storage.";
  return msg;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fillForm(form, values) {
  if (!form) return;
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (!field) return;
    field.value = Array.isArray(value) ? value.join(", ") : (value ?? "");
  });
}

function renderTable(targetId, columns, rows, actions) {
  const container = document.getElementById(targetId);
  if (!container) return;
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">No items yet.</div>`;
    return;
  }
  const head = columns.map((col) => `<th>${col.label}</th>`).join("") + "<th>Actions</th>";
  const body = rows.map((row) => `
    <tr>
      ${columns.map((col) => `<td>${col.render ? col.render(row[col.key], row) : escapeHtml(row[col.key] ?? "")}</td>`).join("")}
      <td>
        ${actions.map((action) => `<button type="button" class="table-btn ${action.className || ""}" data-action="${action.name}" data-id="${row.id}">${action.label}</button>`).join(" ")}
      </td>
    </tr>`).join("");
  container.innerHTML = `<table class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

async function loadOverview() {
  const statsContainer = document.getElementById("dashboardStats");
  const connectionStatus = document.getElementById("connectionStatus");
  if (!statsContainer) return;

  const [projectsRes, galleryRes, linksRes, eventsRes] = await Promise.all([
    db.from("projects").select("id", { count: "exact", head: true }),
    db.from("gallery_images").select("id", { count: "exact", head: true }),
    db.from("site_links").select("id", { count: "exact", head: true }),
    db.from("analytics_events").select("id", { count: "exact", head: true })
  ]);

  if (projectsRes.error) throw projectsRes.error;
  if (galleryRes.error) throw galleryRes.error;
  if (linksRes.error) throw linksRes.error;
  if (eventsRes.error) throw eventsRes.error;

  let uniqueVisitors = 0;
  const uniqueRes = await db.rpc("get_unique_visitors_count");
  if (!uniqueRes.error) uniqueVisitors = uniqueRes.data || 0;

  if (connectionStatus) connectionStatus.textContent = "Connected to Supabase";

  statsContainer.innerHTML = [
    ["Projects", projectsRes.count || 0, "ri-stack-line"],
    ["Gallery", galleryRes.count || 0, "ri-image-line"],
    ["Links", linksRes.count || 0, "ri-links-line"],
    ["Page Views", eventsRes.count || 0, "ri-bar-chart-line"],
    ["Visitors", uniqueVisitors || 0, "ri-user-line"]
  ].map(([label, value, icon]) => `
    <article class="card stat-box">
      <div><span>${label}</span><strong>${value}</strong></div>
      <i class="${icon}"></i>
    </article>`).join("");
}

async function loadSiteContent() {
  const form = document.getElementById("contentForm");
  const { data, error } = await db.from("site_content").select("*");
  if (error) throw error;
  const contentMap = {};
  siteContentKeys.forEach((key) => { contentMap[key] = ""; });
  (data || []).forEach((row) => {
    contentMap[row.content_key] = row.content_value;
  });
  fillForm(form, contentMap);
}

async function saveSiteContent(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = siteContentKeys.map((key) => ({
    content_key: key,
    content_value: formData.get(key) || "",
    is_visible: true
  }));
  const { error } = await db.from("site_content").upsert(payload, { onConflict: "content_key" });
  if (error) throw error;
  showToast("Texts saved successfully.");
}

async function loadLogoSettings() {
  const form = document.getElementById("logoForm");
  if (!form) return;
  const { data, error } = await db.from("site_content").select("content_key, content_value").eq("content_key", "site_logo_url").maybeSingle();
  if (error && !String(error.message || '').toLowerCase().includes('no rows')) throw error;
  const value = data?.content_value || "";
  form.elements.namedItem("site_logo_url").value = value;
  const preview = document.getElementById("siteLogoPreview");
  if (preview && value) {
    preview.src = value;
    preview.hidden = false;
  } else if (preview) {
    preview.hidden = true;
    preview.removeAttribute('src');
  }
}

async function uploadLogoIfNeeded() {
  const fileInput = document.getElementById("siteLogoFile");
  const file = fileInput?.files?.[0];
  if (!file) return null;
  const safeName = file.name.replace(/\s+/g, "-");
  const path = `branding/${Date.now()}-${safeName}`;
  const { error } = await db.storage.from("site-media").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = db.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

async function saveLogoSettings(event) {
  event.preventDefault();
  const form = event.target;
  const uploaded = await uploadLogoIfNeeded();
  const value = uploaded || form.elements.namedItem("site_logo_url").value || "";
  const { error } = await db.from("site_content").upsert([{
    content_key: "site_logo_url",
    content_value: value,
    is_visible: true
  }], { onConflict: "content_key" });
  if (error) throw error;
  form.elements.namedItem("site_logo_url").value = value;
  const preview = document.getElementById("siteLogoPreview");
  if (preview && value) {
    preview.src = value;
    preview.hidden = false;
  }
  if (document.getElementById("siteLogoFile")) document.getElementById("siteLogoFile").value = "";
  showToast("Logo saved successfully.");
}

function previewSiteLogoFile() {
  const input = document.getElementById("siteLogoFile");
  const preview = document.getElementById("siteLogoPreview");
  const file = input?.files?.[0];
  if (!file || !preview) { if (preview) preview.hidden = true; return; }
  const reader = new FileReader();
  reader.onload = () => { preview.src = reader.result; preview.hidden = false; };
  reader.readAsDataURL(file);
}

async function loadProjects() {
  const { data, error } = await db.from("projects").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
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
  const query = id ? db.from("projects").update(payload).eq("id", id) : db.from("projects").insert(payload);
  const { error } = await query;
  if (error) throw error;
  form.reset();
  form.elements.namedItem("id").value = "";
  await loadProjects();
  await loadOverview();
  showToast("Project saved.");
}

async function handleProjectsTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = window.projectsCache.find((project) => String(project.id) === String(button.dataset.id));
  if (!item) return;
  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("projectForm"), item);
    return;
  }
  if (button.dataset.action === "delete") {
    if (!confirm(`Delete project: ${item.title}?`)) return;
    const { error } = await db.from("projects").delete().eq("id", item.id);
    if (error) throw error;
    await loadProjects();
    await loadOverview();
    showToast("Project deleted.");
  }
}

async function uploadImageIfNeeded() {
  const fileInput = document.getElementById("galleryFile");
  const file = fileInput?.files?.[0];
  if (!file) return null;
  const safeName = file.name.replace(/\s+/g, "-");
  const path = `gallery/${Date.now()}-${safeName}`;
  const { error } = await db.storage.from("site-media").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = db.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

async function loadGallery() {
  const { data, error } = await db.from("gallery_images").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
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
    showToast("Upload an image or paste an image URL.");
    return;
  }
  const query = id ? db.from("gallery_images").update(payload).eq("id", id) : db.from("gallery_images").insert(payload);
  const { error } = await query;
  if (error) throw error;
  form.reset();
  form.elements.namedItem("id").value = "";
  document.getElementById("galleryFile").value = "";
  await loadGallery();
  await loadOverview();
  showToast("Image saved.");
}

async function handleGalleryTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = window.galleryCache.find((image) => String(image.id) === String(button.dataset.id));
  if (!item) return;
  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("galleryForm"), item);
    return;
  }
  if (button.dataset.action === "delete") {
    if (!confirm(`Delete image: ${item.title}?`)) return;
    const { error } = await db.from("gallery_images").delete().eq("id", item.id);
    if (error) throw error;
    await loadGallery();
    await loadOverview();
    showToast("Image deleted.");
  }
}

async function loadLinks() {
  const { data, error } = await db.from("site_links").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
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
  const query = id ? db.from("site_links").update(payload).eq("id", id) : db.from("site_links").insert(payload);
  const { error } = await query;
  if (error) throw error;
  form.reset();
  form.elements.namedItem("id").value = "";
  await loadLinks();
  await loadOverview();
  showToast("Link saved.");
}

async function handleLinksTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = window.linksCache.find((link) => String(link.id) === String(button.dataset.id));
  if (!item) return;
  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("linkForm"), item);
    return;
  }
  if (button.dataset.action === "delete") {
    if (!confirm(`Delete link: ${item.label}?`)) return;
    const { error } = await db.from("site_links").delete().eq("id", item.id);
    if (error) throw error;
    await loadLinks();
    await loadOverview();
    showToast("Link deleted.");
  }
}

async function loadAnalytics() {
  const topPages = document.getElementById("topPages");
  const recentVisits = document.getElementById("recentVisits");
  const topRes = await db.rpc("get_top_pages");
  if (!topRes.error) {
    topPages.innerHTML = (topRes.data || []).length
      ? topRes.data.map((item) => `<div class="list-row"><span>${escapeHtml(item.page_path)}</span><strong>${item.views}</strong></div>`).join("")
      : `<div class="empty-state">No visits yet.</div>`;
  }
  const recentRes = await db.from("analytics_events").select("page_path, created_at, referrer, visitor_id").order("created_at", { ascending: false }).limit(12);
  if (!recentRes.error) {
    recentVisits.innerHTML = (recentRes.data || []).length
      ? recentRes.data.map((item) => `
        <div class="visit-row">
          <strong>${escapeHtml(item.page_path)}</strong>
          <span>${new Date(item.created_at).toLocaleString()}</span>
          <small>${escapeHtml(item.referrer || "Direct visit")} • ${escapeHtml(item.visitor_id || "-")}</small>
        </div>`).join("")
      : `<div class="empty-state">No visits yet.</div>`;
  }
}

async function initializeDashboard() {
  await Promise.all([
    loadOverview(),
    loadSiteContent(),
    loadProjects(),
    loadLogoSettings(),
    loadGallery(),
    loadLinks(),
    loadAnalytics()
  ]);
}

function registerEvents() {
  document.getElementById("contentForm")?.addEventListener("submit", async (event) => {
    try { await saveSiteContent(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("projectForm")?.addEventListener("submit", async (event) => {
    try { await saveProject(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("logoForm")?.addEventListener("submit", async (event) => {
    try { await saveLogoSettings(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("galleryForm")?.addEventListener("submit", async (event) => {
    try { await saveGallery(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("linkForm")?.addEventListener("submit", async (event) => {
    try { await saveLink(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("projectsTable")?.addEventListener("click", async (event) => {
    try { await handleProjectsTableClick(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("galleryTable")?.addEventListener("click", async (event) => {
    try { await handleGalleryTableClick(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("linksTable")?.addEventListener("click", async (event) => {
    try { await handleLinksTableClick(event); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("resetProjectForm")?.addEventListener("click", () => {
    const form = document.getElementById("projectForm"); form.reset(); form.elements.namedItem("id").value = "";
  });
  document.getElementById("resetLogoForm")?.addEventListener("click", async () => {
    const form = document.getElementById("logoForm");
    if (!form) return;
    form.reset();
    const preview = document.getElementById("siteLogoPreview");
    if (preview) { preview.hidden = true; preview.removeAttribute("src"); }
    try { await loadLogoSettings(); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("removeLogoBtn")?.addEventListener("click", async () => {
    try { await removeLogo(); } catch (error) { showToast(normalizeError(error)); }
  });
  document.getElementById("resetGalleryForm")?.addEventListener("click", () => {
    const form = document.getElementById("galleryForm"); form.reset(); form.elements.namedItem("id").value = ""; document.getElementById("galleryFile").value = "";
  });
  document.getElementById("resetLinkForm")?.addEventListener("click", () => {
    const form = document.getElementById("linkForm"); form.reset(); form.elements.namedItem("id").value = "";
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  registerEvents();
  try {
    await initializeDashboard();
  } catch (error) {
    document.getElementById("connectionStatus").textContent = "Connection issue";
    showToast(normalizeError(error));
    console.error(error);
  }
});


const LOCAL_PROJECTS_KEY = "ibr_local_projects";

function getLocalProjects() {
  try { return JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY) || "[]"); }
  catch (_) { return []; }
}

function setLocalProjects(items) {
  localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(items));
}

function mergeProjects(remote, localItems) {
  return [...(localItems || []), ...(remote || [])];
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function previewProjectFile() {
  const input = document.getElementById("projectImageFile");
  const preview = document.getElementById("projectImagePreview");
  const file = input?.files?.[0];
  if (!file || !preview) { if (preview) preview.hidden = true; return; }
  const reader = new FileReader();
  reader.onload = () => { preview.src = reader.result; preview.hidden = false; };
  reader.readAsDataURL(file);
}

const originalLoadProjects = loadProjects;
loadProjects = async function() {
  let remote = [];
  try {
    const { data, error } = await db.from("projects").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
    if (error) throw error;
    remote = data || [];
  } catch (_) {}
  window.projectsCache = mergeProjects(remote, getLocalProjects());
  renderTable("projectsTable", [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "source", label: "Source", render: (_, row) => row.source === "local" ? "Dashboard" : "Supabase" },
    { key: "display_order", label: "Order" }
  ], window.projectsCache, [
    { name: "edit", label: "Edit" },
    { name: "delete", label: "Delete", className: "danger" }
  ]);
}

const originalSaveProject = saveProject;
saveProject = async function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get("id") || `local-${Date.now()}`;
  const file = document.getElementById("projectImageFile")?.files?.[0];
  const uploadedImage = file ? await fileToDataUrl(file) : null;
  const localItems = getLocalProjects();
  const payload = {
    id,
    source: "local",
    title: formData.get("title") || "",
    project_url: formData.get("project_url") || "",
    image_url: uploadedImage || formData.get("image_url") || "",
    icon: formData.get("icon") || "✦",
    description: formData.get("description") || "",
    details: formData.get("details") || "",
    tags: String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    display_order: Number(formData.get("display_order") || 0),
    is_featured: formData.get("is_featured") === "true",
    is_visible: formData.get("is_visible") === "true",
    created_at: new Date().toISOString()
  };
  const index = localItems.findIndex((item) => String(item.id) === String(id));
  if (index >= 0) localItems[index] = { ...localItems[index], ...payload };
  else localItems.unshift(payload);
  setLocalProjects(localItems);
  form.reset();
  form.elements.namedItem("id").value = "";
  const preview = document.getElementById("projectImagePreview");
  if (preview) preview.hidden = true;
  await loadProjects();
  showToast("Project saved to dashboard.");
}

const originalHandleProjectsTableClick = handleProjectsTableClick;
handleProjectsTableClick = async function(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = window.projectsCache.find((project) => String(project.id) === String(button.dataset.id));
  if (!item) return;
  if (button.dataset.action === "edit") {
    fillForm(document.getElementById("projectForm"), item);
    const preview = document.getElementById("projectImagePreview");
    if (preview && item.image_url) { preview.src = item.image_url; preview.hidden = false; }
    return;
  }
  if (button.dataset.action === "delete") {
    if (!confirm(`Delete project: ${item.title}?`)) return;
    if (item.source === "local") {
      setLocalProjects(getLocalProjects().filter((project) => String(project.id) !== String(item.id)));
    } else {
      const { error } = await db.from("projects").delete().eq("id", item.id);
      if (error) throw error;
    }
    await loadProjects();
    showToast("Project deleted.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("projectImageFile")?.addEventListener("change", previewProjectFile);
  document.getElementById("siteLogoFile")?.addEventListener("change", previewSiteLogoFile);
});


async function removeLogo() {
  const { error } = await db.from("site_content").upsert([{
    content_key: "site_logo_url",
    content_value: "",
    is_visible: true
  }], { onConflict: "content_key" });
  if (error) throw error;

  const form = document.getElementById("logoForm");
  if (form) form.reset();

  const preview = document.getElementById("siteLogoPreview");
  if (preview) {
    preview.hidden = true;
    preview.removeAttribute("src");
  }

  showToast("Logo removed. IBR text restored.");
}
async function uploadFavicon() {
  const file = document.getElementById("faviconInput").files[0];
  if (!file) return alert("Choose image first");

  const fileName = "favicon-" + Date.now();

  const { error } = await supabase.storage
    .from("site-media")
    .upload(fileName, file);

  if (error) {
    alert("Upload failed ❌");
    return;
  }

  const url = supabase.storage
    .from("site-media")
    .getPublicUrl(fileName).data.publicUrl;

  await supabase.from("site_content").upsert({
    key: "site_favicon",
    value: url
  });

  document.getElementById("faviconPreview").src = url;

  alert("Favicon updated ✅");
}

async function removeFavicon() {
  await supabase.from("site_content").upsert({
    key: "site_favicon",
    value: null
  });

  alert("Favicon removed");
}
