/**
 * LumaLife - Author & Blog Management Dashboard
 * Implements complete CRUD functionality (Create, Read, Update, Delete),
 * real-time metric counters, search/filter table, modal editor, and demo resets.
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const totalBlogsStat = document.getElementById("stat-total-blogs");
  const totalCategoriesStat = document.getElementById("stat-total-categories");
  const totalLikesStat = document.getElementById("stat-total-likes");
  const totalBookmarksStat = document.getElementById("stat-total-bookmarks");

  const tableBody = document.getElementById("dashboard-blogs-table-body");
  const dashboardSearch = document.getElementById("dashboard-search-input");
  const dashboardCategoryFilter = document.getElementById("dashboard-category-filter");
  const dashboardEmpty = document.getElementById("dashboard-empty-row");

  // Modal elements
  const blogModal = document.getElementById("blog-editor-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const blogForm = document.getElementById("blog-editor-form");
  const openAddModalBtn = document.getElementById("open-add-blog-modal-btn");
  const resetDemoDataBtn = document.getElementById("reset-demo-data-btn");

  // Form Fields
  const formBlogId = document.getElementById("form-blog-id");
  const formTitle = document.getElementById("form-title");
  const formExcerpt = document.getElementById("form-excerpt");
  const formCategory = document.getElementById("form-category");
  const formAuthorName = document.getElementById("form-author-name");
  const formAuthorRole = document.getElementById("form-author-role");
  const formAuthorAvatar = document.getElementById("form-author-avatar");
  const formImageUrl = document.getElementById("form-image-url");
  const formImagePreview = document.getElementById("form-image-preview");
  const formTags = document.getElementById("form-tags");
  const formContent = document.getElementById("form-content");

  // State
  let editingBlogId = null;

  // 1. Calculate & Render Statistics
  function updateDashboardStats() {
    const blogs = getData("lumalife_blogs", []);
    const bookmarks = getData("lumalife_bookmarks", []);

    // Total blogs
    if (totalBlogsStat) totalBlogsStat.textContent = blogs.length;

    // Unique active categories
    const uniqueCategories = new Set(blogs.map(b => b.category.trim()));
    if (totalCategoriesStat) totalCategoriesStat.textContent = uniqueCategories.size || 11;

    // Total likes
    const totalLikes = blogs.reduce((acc, curr) => acc + (Number(curr.likes) || 0), 0);
    if (totalLikesStat) totalLikesStat.textContent = totalLikes;

    // Total bookmarks
    if (totalBookmarksStat) totalBookmarksStat.textContent = bookmarks.length;
  }

  // 2. Render Blogs Table
  function renderBlogsTable() {
    const blogs = getData("lumalife_blogs", []);
    const searchQuery = (dashboardSearch ? dashboardSearch.value : "").toLowerCase().trim();
    const categoryFilter = (dashboardCategoryFilter ? dashboardCategoryFilter.value : "All");

    let filtered = blogs.filter(b => {
      // Category filter
      if (categoryFilter !== "All" && b.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const inTitle = (b.title || "").toLowerCase().includes(searchQuery);
        const inAuthor = (b.author && b.author.name ? b.author.name : "").toLowerCase().includes(searchQuery);
        const inCategory = (b.category || "").toLowerCase().includes(searchQuery);
        return inTitle || inAuthor || inCategory;
      }
      return true;
    });

    if (!tableBody) return;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-8 text-muted">
            <div class="empty-table-state">
              <span class="empty-table-icon">🔍</span>
              <p class="font-medium">No matching stories found.</p>
              <p class="text-sm">Try adjusting your search terms or publish a new story.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(blog => {
      const readTime = blog.readTime || calculateReadingTime(blog.content);
      const safeImg = blog.image || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80";

      return `
        <tr class="dashboard-table-row" data-blog-id="${blog.id}">
          <td class="table-col-story">
            <div class="story-cell">
              <img 
                src="${safeImg}" 
                alt="${escapeHTML(blog.title)}" 
                class="story-cell-thumb" 
                onerror="this.src='https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80'"
              />
              <div class="story-cell-info">
                <a href="blog.html?id=${blog.id}" target="_blank" class="story-cell-title" title="Open preview in new tab">
                  ${escapeHTML(blog.title)}
                </a>
                <span class="story-cell-meta">⏱️ ${readTime} min read &bull; ${blog.date}</span>
              </div>
            </div>
          </td>

          <td>
            <span class="blog-category-badge category-${slugify(blog.category)}">${blog.category}</span>
          </td>

          <td>
            <div class="author-cell">
              <span>${blog.author ? escapeHTML(blog.author.name) : 'LumaLife'}</span>
            </div>
          </td>

          <td>
            <span class="likes-badge">❤️ ${blog.likes || 0}</span>
          </td>

          <td>
            <span class="status-pill status-published">● Published</span>
          </td>

          <td class="table-col-actions">
            <div class="action-buttons-group">
              <a 
                href="blog.html?id=${blog.id}" 
                class="dash-btn dash-btn-view" 
                title="View Live Article" 
                target="_blank"
              >
                👁️ View
              </a>
              <button 
                type="button" 
                class="dash-btn dash-btn-edit" 
                data-id="${blog.id}" 
                title="Edit this article"
              >
                ✏️ Edit
              </button>
              <button 
                type="button" 
                class="dash-btn dash-btn-delete" 
                data-id="${blog.id}" 
                title="Delete this article"
              >
                🗑️ Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Attach row action listeners
    tableBody.querySelectorAll(".dash-btn-edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        openEditModal(id);
      });
    });

    tableBody.querySelectorAll(".dash-btn-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        handleDeleteBlog(id);
      });
    });
  }

  // 3. Modal Management (Open, Close, Pre-fill)
  function openAddModal() {
    editingBlogId = null;
    if (modalTitle) modalTitle.textContent = "Publish New Lifestyle Story";
    if (blogForm) blogForm.reset();
    if (formBlogId) formBlogId.value = "";
    
    // Default sensible values
    if (formAuthorName) formAuthorName.value = "Elena Vance";
    if (formAuthorRole) formAuthorRole.value = "Lifestyle Contributor";
    if (formAuthorAvatar) formAuthorAvatar.value = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
    if (formImageUrl) {
      formImageUrl.value = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80";
      updateImagePreview(formImageUrl.value);
    }

    if (blogModal) blogModal.classList.add("active");
    if (modalOverlay) modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function openEditModal(blogId) {
    const blogs = getData("lumalife_blogs", []);
    const blog = blogs.find(b => String(b.id) === String(blogId));
    if (!blog) return;

    editingBlogId = blog.id;
    if (modalTitle) modalTitle.textContent = "Edit Story Details";

    if (formBlogId) formBlogId.value = blog.id;
    if (formTitle) formTitle.value = blog.title || "";
    if (formExcerpt) formExcerpt.value = blog.excerpt || "";
    if (formCategory) formCategory.value = blog.category || "Wellness";
    if (formAuthorName) formAuthorName.value = (blog.author && blog.author.name) || "";
    if (formAuthorRole) formAuthorRole.value = (blog.author && blog.author.role) || "";
    if (formAuthorAvatar) formAuthorAvatar.value = (blog.author && blog.author.avatar) || "";
    if (formImageUrl) {
      formImageUrl.value = blog.image || "";
      updateImagePreview(blog.image);
    }
    if (formTags) formTags.value = Array.isArray(blog.tags) ? blog.tags.join(", ") : "";
    if (formContent) formContent.value = blog.content || "";

    if (blogModal) blogModal.classList.add("active");
    if (modalOverlay) modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (blogModal) blogModal.classList.remove("active");
    if (modalOverlay) modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    editingBlogId = null;
  }

  function updateImagePreview(url) {
    if (!formImagePreview) return;
    if (url && url.trim()) {
      formImagePreview.src = url.trim();
      formImagePreview.style.display = "block";
      formImagePreview.onerror = () => {
        formImagePreview.src = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80";
      };
    } else {
      formImagePreview.style.display = "none";
    }
  }

  if (formImageUrl) {
    formImageUrl.addEventListener("input", e => {
      updateImagePreview(e.target.value);
    });
  }

  // Quick preset image selector helper buttons
  document.querySelectorAll(".preset-image-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      if (formImageUrl && url) {
        formImageUrl.value = url;
        updateImagePreview(url);
      }
    });
  });

  // Modal trigger listeners
  if (openAddModalBtn) openAddModalBtn.addEventListener("click", openAddModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  // 4. Form Submission (Create & Update)
  if (blogForm) {
    blogForm.addEventListener("submit", e => {
      e.preventDefault();

      const title = formTitle ? formTitle.value.trim() : "";
      const excerpt = formExcerpt ? formExcerpt.value.trim() : "";
      const category = formCategory ? formCategory.value.trim() : "Wellness";
      const authorName = formAuthorName ? formAuthorName.value.trim() : "LumaLife Author";
      const authorRole = formAuthorRole ? formAuthorRole.value.trim() : "Lifestyle Writer";
      const authorAvatar = formAuthorAvatar ? formAuthorAvatar.value.trim() : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
      const image = formImageUrl && formImageUrl.value.trim() ? formImageUrl.value.trim() : "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80";
      const rawTags = formTags ? formTags.value.trim() : "";
      const content = formContent ? formContent.value.trim() : "";

      // Basic validation
      if (!title || title.length < 5) {
        showToast("Please enter a descriptive story title (at least 5 characters).", "error");
        if (formTitle) formTitle.focus();
        return;
      }

      if (!excerpt || excerpt.length < 10) {
        showToast("Please enter a short excerpt or summary for the story.", "error");
        if (formExcerpt) formExcerpt.focus();
        return;
      }

      if (!content || content.length < 20) {
        showToast("Please enter meaningful article content.", "error");
        if (formContent) formContent.focus();
        return;
      }

      // Parse tags
      const tags = rawTags.split(",").map(t => t.trim()).filter(Boolean);

      const blogs = getData("lumalife_blogs", []);
      const readTime = calculateReadingTime(content);

      if (editingBlogId) {
        // UPDATE Existing Blog
        const index = blogs.findIndex(b => String(b.id) === String(editingBlogId));
        if (index >= 0) {
          blogs[index] = {
            ...blogs[index],
            title,
            slug: slugify(title),
            excerpt,
            category,
            author: {
              name: authorName,
              role: authorRole,
              avatar: authorAvatar
            },
            image,
            tags,
            content,
            readTime
          };
          saveData("lumalife_blogs", blogs);
          showToast("Story updated successfully! ✨", "success");
        }
      } else {
        // CREATE New Blog
        // Generate new sequential numeric ID
        const maxId = blogs.reduce((max, b) => Math.max(max, Number(b.id) || 0), 0);
        const newId = maxId + 1;
        const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

        const newBlog = {
          id: newId,
          title,
          slug: slugify(title),
          excerpt,
          category,
          author: {
            name: authorName,
            role: authorRole,
            avatar: authorAvatar
          },
          date: today,
          readTime,
          image,
          likes: 0,
          featured: false,
          tags: tags.length > 0 ? tags : [category],
          content: content.startsWith("<") ? content : `<h2>Introduction</h2><p>${escapeHTML(content)}</p>`
        };

        blogs.unshift(newBlog);
        saveData("lumalife_blogs", blogs);
        showToast("Story published successfully! 🎉", "success");
      }

      closeModal();
      updateDashboardStats();
      renderBlogsTable();
    });
  }

  // 5. Delete Action with Confirmation
  function handleDeleteBlog(blogId) {
    const blogs = getData("lumalife_blogs", []);
    const blog = blogs.find(b => String(b.id) === String(blogId));
    if (!blog) return;

    if (confirm(`Are you sure you want to delete "${blog.title}"?\nThis action cannot be undone.`)) {
      const nextBlogs = blogs.filter(b => String(b.id) !== String(blogId));
      saveData("lumalife_blogs", nextBlogs);

      // Clean up bookmarks
      const bookmarks = getData("lumalife_bookmarks", []);
      const nextBookmarks = bookmarks.filter(id => String(id) !== String(blogId));
      saveData("lumalife_bookmarks", nextBookmarks);

      showToast("Story deleted from database", "info");
      updateBookmarkCountBadge();
      updateDashboardStats();
      renderBlogsTable();
    }
  }

  // 6. Reset to Default Demo Data
  if (resetDemoDataBtn) {
    resetDemoDataBtn.addEventListener("click", () => {
      if (confirm("Reset database to initial 15+ curated lifestyle articles?\nThis will restore all default stories, comments, and demo bookmarks.")) {
        localStorage.removeItem("lumalife_blogs");
        localStorage.removeItem("lumalife_comments");
        localStorage.removeItem("lumalife_likes");
        localStorage.removeItem("lumalife_bookmarks");
        initializeDatabase();
        updateBookmarkCountBadge();
        updateDashboardStats();
        renderBlogsTable();
        showToast("Database restored to default demo state! 🌟", "success");
      }
    });
  }

  // Search & Category Filters in Dashboard
  if (dashboardSearch) {
    dashboardSearch.addEventListener("input", () => {
      renderBlogsTable();
    });
  }

  if (dashboardCategoryFilter) {
    dashboardCategoryFilter.addEventListener("change", () => {
      renderBlogsTable();
    });
  }

  // Initial load
  updateDashboardStats();
  renderBlogsTable();
});
