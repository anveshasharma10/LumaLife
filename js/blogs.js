/**
 * LumaLife - Blogs Listing Page Logic
 * Features live instant search, category pill filter, sort dropdown, tag filtering,
 * URL query parameters synchronization, and pagination/load more.
 */

document.addEventListener("DOMContentLoaded", () => {
  const blogsGrid = document.getElementById("blogs-grid");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const categoryFiltersContainer = document.getElementById("category-filters");
  const sortSelect = document.getElementById("sort-select");
  const resultsCountEl = document.getElementById("results-count");
  const emptyStateEl = document.getElementById("empty-state");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const loadMoreContainer = document.getElementById("load-more-container");

  // State
  let currentCategory = "All";
  let searchQuery = "";
  let currentTag = "";
  let currentSort = "latest";
  let visibleCount = 9;
  const ITEMS_PER_PAGE = 9;

  // Initialize query parameters from URL e.g. ?category=Travel or ?search=morning or ?tag=Mindfulness
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    currentCategory = urlParams.get("category");
  }
  if (urlParams.has("search")) {
    searchQuery = urlParams.get("search");
    if (searchInput) searchInput.value = searchQuery;
  }
  if (urlParams.has("tag")) {
    currentTag = urlParams.get("tag");
  }
  if (urlParams.has("sort")) {
    currentSort = urlParams.get("sort");
    if (sortSelect) sortSelect.value = currentSort;
  }

  // Render category filter buttons dynamically
  function renderCategoryFilters() {
    if (!categoryFiltersContainer) return;

    const allCategories = [
      "All",
      "Travel",
      "Food",
      "Fashion",
      "Wellness",
      "Fitness",
      "Self-Care",
      "Personal Growth",
      "Productivity",
      "Hobbies",
      "Books",
      "Home & Living"
    ];

    categoryFiltersContainer.innerHTML = allCategories.map(cat => {
      const isSelected = cat.toLowerCase() === currentCategory.toLowerCase();
      return `
        <button 
          type="button" 
          class="category-filter-chip ${isSelected ? 'active' : ''}" 
          data-category="${cat}"
        >
          ${cat}
        </button>
      `;
    }).join("");

    // Add click listeners to filter buttons
    categoryFiltersContainer.querySelectorAll(".category-filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        currentCategory = btn.getAttribute("data-category");
        // Reset tag filter if category selected
        currentTag = "";
        visibleCount = ITEMS_PER_PAGE;
        updateActiveCategoryUI();
        updateURL();
        filterAndRenderBlogs();
      });
    });
  }

  function updateActiveCategoryUI() {
    if (!categoryFiltersContainer) return;
    categoryFiltersContainer.querySelectorAll(".category-filter-chip").forEach(btn => {
      const cat = btn.getAttribute("data-category");
      btn.classList.toggle("active", cat.toLowerCase() === currentCategory.toLowerCase());
    });
  }

  function updateURL() {
    const params = new URLSearchParams();
    if (currentCategory && currentCategory !== "All") params.set("category", currentCategory);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (currentTag.trim()) params.set("tag", currentTag.trim());
    if (currentSort && currentSort !== "latest") params.set("sort", currentSort);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Core filter and render pipeline
  function filterAndRenderBlogs() {
    const allBlogs = getData("lumalife_blogs", []);
    
    // 1. Filter by category
    let filtered = allBlogs.filter(blog => {
      if (currentCategory && currentCategory !== "All") {
        if (currentCategory.toLowerCase() === "books" && blog.category.toLowerCase().includes("book")) {
          return true;
        }
        if (blog.category.toLowerCase() !== currentCategory.toLowerCase()) {
          return false;
        }
      }
      return true;
    });

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(blog => {
        const inTitle = (blog.title || "").toLowerCase().includes(q);
        const inExcerpt = (blog.excerpt || "").toLowerCase().includes(q);
        const inCategory = (blog.category || "").toLowerCase().includes(q);
        const inAuthor = (blog.author && blog.author.name ? blog.author.name : "").toLowerCase().includes(q);
        const inTags = Array.isArray(blog.tags) && blog.tags.some(t => t.toLowerCase().includes(q));
        const inContent = (blog.content || "").toLowerCase().includes(q);
        return inTitle || inExcerpt || inCategory || inAuthor || inTags || inContent;
      });
    }

    // 3. Filter by tag
    if (currentTag.trim()) {
      const t = currentTag.toLowerCase().trim();
      filtered = filtered.filter(blog => {
        return Array.isArray(blog.tags) && blog.tags.some(tag => tag.toLowerCase() === t);
      });
    }

    // 4. Sort
    filtered.sort((a, b) => {
      if (currentSort === "popular") {
        return (b.likes || 0) - (a.likes || 0);
      } else if (currentSort === "read-time-asc") {
        const timeA = a.readTime || calculateReadingTime(a.content);
        const timeB = b.readTime || calculateReadingTime(b.content);
        return timeA - timeB;
      } else if (currentSort === "read-time-desc") {
        const timeA = a.readTime || calculateReadingTime(a.content);
        const timeB = b.readTime || calculateReadingTime(b.content);
        return timeB - timeA;
      } else if (currentSort === "alphabetical") {
        return (a.title || "").localeCompare(b.title || "");
      } else {
        // "latest" default (id descending or date)
        return (b.id || 0) - (a.id || 0);
      }
    });

    // Toggle clear search button visibility
    if (clearSearchBtn) {
      clearSearchBtn.style.display = (searchQuery.trim() || currentTag.trim()) ? "inline-flex" : "none";
    }

    // Update results count indicator
    if (resultsCountEl) {
      let filterContext = [];
      if (currentCategory !== "All") filterContext.push(`in <strong>${escapeHTML(currentCategory)}</strong>`);
      if (searchQuery.trim()) filterContext.push(`matching "<strong>${escapeHTML(searchQuery)}</strong>"`);
      if (currentTag.trim()) filterContext.push(`tagged #<strong>${escapeHTML(currentTag)}</strong>`);

      const contextStr = filterContext.length ? ` ${filterContext.join(" ")}` : "";
      resultsCountEl.innerHTML = `Showing <strong>${Math.min(visibleCount, filtered.length)}</strong> of <strong>${filtered.length}</strong> stories${contextStr}`;
    }

    // Check empty state
    if (filtered.length === 0) {
      if (blogsGrid) blogsGrid.innerHTML = "";
      if (emptyStateEl) emptyStateEl.style.display = "block";
      if (loadMoreContainer) loadMoreContainer.style.display = "none";
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = "none";
    }

    // Slice for pagination
    const paginatedItems = filtered.slice(0, visibleCount);

    if (blogsGrid) {
      blogsGrid.innerHTML = paginatedItems.map(blog => createBlogCardHTML(blog)).join("");
    }

    // Handle Load More Button
    if (loadMoreContainer) {
      if (visibleCount < filtered.length) {
        loadMoreContainer.style.display = "flex";
        if (loadMoreBtn) {
          const remaining = filtered.length - visibleCount;
          loadMoreBtn.textContent = `Load More Stories (${remaining} remaining)`;
        }
      } else {
        loadMoreContainer.style.display = "none";
      }
    }
  }

  // Event Listeners for Search
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      searchQuery = e.target.value;
      visibleCount = ITEMS_PER_PAGE;
      updateURL();
      filterAndRenderBlogs();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchQuery = "";
      currentTag = "";
      if (searchInput) searchInput.value = "";
      visibleCount = ITEMS_PER_PAGE;
      updateURL();
      filterAndRenderBlogs();
    });
  }

  // Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      currentSort = e.target.value;
      updateURL();
      filterAndRenderBlogs();
    });
  }

  // Reset Filters Button in Empty State
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      currentCategory = "All";
      searchQuery = "";
      currentTag = "";
      currentSort = "latest";
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "latest";
      visibleCount = ITEMS_PER_PAGE;
      updateActiveCategoryUI();
      updateURL();
      filterAndRenderBlogs();
    });
  }

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += ITEMS_PER_PAGE;
      filterAndRenderBlogs();
    });
  }

  // Initial Boot
  renderCategoryFilters();
  filterAndRenderBlogs();
});
