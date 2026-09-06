/**
 * LumaLife - Main Utilities & Global Script
 * Provides LocalStorage data wrappers, mobile navigation, toast alerts,
 * search redirects, and newsletter subscriptions.
 */

// ==========================================
// 1. REUSABLE LOCALSTORAGE UTILITIES
// ==========================================

/**
 * Retrieve data from LocalStorage with fallback
 */
function getData(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.error(`Error reading ${key} from LocalStorage:`, err);
    return defaultValue;
  }
}

/**
 * Save data to LocalStorage
 */
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving ${key} to LocalStorage:`, err);
    return false;
  }
}

/**
 * Update data using an updater function
 */
function updateData(key, updaterFn, defaultValue = []) {
  try {
    const current = getData(key, defaultValue);
    const updated = updaterFn(current);
    saveData(key, updated);
    return updated;
  } catch (err) {
    console.error(`Error updating ${key} in LocalStorage:`, err);
    return null;
  }
}

/**
 * Delete key from LocalStorage
 */
function deleteData(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error(`Error deleting ${key} from LocalStorage:`, err);
    return false;
  }
}

// ==========================================
// 2. TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger entering animation
  requestAnimationFrame(() => {
    toast.classList.add("toast-show");
  });

  // Automatically remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// ==========================================
// 3. READING TIME CALCULATOR
// ==========================================

function calculateReadingTime(textOrHtml) {
  if (!textOrHtml) return 1;
  // Strip HTML tags to get pure words
  const cleanText = textOrHtml.replace(/<[^>]*>/g, " ");
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  // Average reading speed: 200-220 words per minute
  const minutes = Math.ceil(words / 210);
  return Math.max(1, minutes);
}

// ==========================================
// 4. BOOKMARK COUNTER & HELPERS
// ==========================================

function updateBookmarkCountBadge() {
  const bookmarks = getData("lumalife_bookmarks", []);
  const badges = document.querySelectorAll(".bookmark-count-badge");
  badges.forEach(badge => {
    badge.textContent = bookmarks.length;
    badge.style.display = bookmarks.length > 0 ? "inline-flex" : "none";
  });
}

function isBookmarked(blogId) {
  const bookmarks = getData("lumalife_bookmarks", []);
  return bookmarks.some(id => String(id) === String(blogId));
}

function toggleBookmark(blogId) {
  const idStr = Number(blogId) || blogId;
  const bookmarks = getData("lumalife_bookmarks", []);
  const index = bookmarks.findIndex(id => String(id) === String(idStr));
  let saved = false;

  if (index >= 0) {
    bookmarks.splice(index, 1);
    saved = false;
    showToast("Story removed from Bookmarks", "info");
  } else {
    bookmarks.push(idStr);
    saved = true;
    showToast("Story saved to Bookmarks! 🔖", "success");
  }

  saveData("lumalife_bookmarks", bookmarks);
  updateBookmarkCountBadge();

  // Dispatch custom event for reactive UI updates
  window.dispatchEvent(new CustomEvent("lumalife:bookmarks-updated", { detail: { blogId, isSaved: saved } }));
  return saved;
}

// ==========================================
// 5. LIKE SYSTEM HELPERS
// ==========================================

function isLiked(blogId) {
  const likes = getData("lumalife_likes", []);
  return likes.some(id => String(id) === String(blogId));
}

function toggleLike(blogId) {
  const idStr = Number(blogId) || blogId;
  const likes = getData("lumalife_likes", []);
  const blogs = getData("lumalife_blogs", []);
  const blog = blogs.find(b => String(b.id) === String(blogId));

  if (!blog) return { count: 0, isLiked: false };

  const isAlreadyLiked = likes.some(id => String(id) === String(idStr));
  let newLikedState = false;

  if (isAlreadyLiked) {
    const nextLikes = likes.filter(id => String(id) !== String(idStr));
    saveData("lumalife_likes", nextLikes);
    blog.likes = Math.max(0, (blog.likes || 1) - 1);
    newLikedState = false;
    showToast("Like removed", "info");
  } else {
    likes.push(idStr);
    saveData("lumalife_likes", likes);
    blog.likes = (blog.likes || 0) + 1;
    newLikedState = true;
    showToast("Thank you for liking this story! ❤️", "success");
  }

  // Update in blogs list
  saveData("lumalife_blogs", blogs);

  // Dispatch event
  window.dispatchEvent(new CustomEvent("lumalife:likes-updated", { 
    detail: { blogId, likesCount: blog.likes, isLiked: newLikedState } 
  }));

  return { count: blog.likes, isLiked: newLikedState };
}

// ==========================================
// 6. GLOBAL NAVBAR & MOBILE DRAWER
// ==========================================

function setupNavigation() {
  const menuToggle = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("mobile-nav-overlay");
  const closeBtn = document.getElementById("mobile-menu-close");

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Highlight active link in both desktop and mobile navigation
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Header quick search bar
  const navSearchForm = document.getElementById("nav-search-form");
  if (navSearchForm) {
    navSearchForm.addEventListener("submit", e => {
      e.preventDefault();
      const input = navSearchForm.querySelector("input[type='search'], input[type='text']");
      if (input && input.value.trim()) {
        const query = encodeURIComponent(input.value.trim());
        window.location.href = `blogs.html?search=${query}`;
      }
    });
  }
}

// ==========================================
// 7. NEWSLETTER SUBSCRIPTION
// ==========================================

function setupNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      const statusEl = form.querySelector(".newsletter-status");

      if (!emailInput || !emailInput.value.trim()) return;

      const email = emailInput.value.trim().toLowerCase();
      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }

      const subscriptions = getData("lumalife_newsletter", []);
      if (subscriptions.includes(email)) {
        showToast("You're already subscribed! Thank you for reading.", "info");
      } else {
        subscriptions.push(email);
        saveData("lumalife_newsletter", subscriptions);
        showToast("You're subscribed! Welcome to LumaLife.", "success");
      }

      emailInput.value = "";
      if (statusEl) {
        statusEl.innerHTML = `<span class="text-success font-medium">You're subscribed! Welcome to LumaLife.</span>`;
        setTimeout(() => {
          statusEl.innerHTML = "";
        }, 5000);
      }
    });
  });
}

// ==========================================
// 8. CARD RENDERING HELPER (Standardized across pages)
// ==========================================

function createBlogCardHTML(blog) {
  const isSaved = isBookmarked(blog.id);
  const liked = isLiked(blog.id);
  const readTime = blog.readTime || calculateReadingTime(blog.content);
  const safeImg = blog.image || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80";

  return `
    <article class="blog-card" data-id="${blog.id}">
      <div class="blog-card-img-wrapper">
        <a href="blog.html?id=${blog.id}" class="blog-card-img-link" aria-label="Read ${escapeHTML(blog.title)}">
          <img 
            src="${safeImg}" 
            alt="${escapeHTML(blog.title)}" 
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'"
            class="blog-card-img"
          />
        </a>
        <span class="blog-category-badge category-${slugify(blog.category)}">${blog.category}</span>
        <button 
          type="button" 
          class="bookmark-btn ${isSaved ? 'bookmarked' : ''}" 
          data-blog-id="${blog.id}"
          title="${isSaved ? 'Remove Bookmark' : 'Save Story'}"
          aria-label="${isSaved ? 'Remove Bookmark' : 'Save Story'}"
        >
          <span class="bookmark-icon">${isSaved ? '🔖' : '📑'}</span>
        </button>
      </div>

      <div class="blog-card-content">
        <div class="blog-meta-top">
          <span class="blog-date">📅 ${blog.date}</span>
          <span class="blog-read-time">⏱️ ${readTime} min read</span>
        </div>

        <h3 class="blog-card-title">
          <a href="blog.html?id=${blog.id}">${escapeHTML(blog.title)}</a>
        </h3>

        <p class="blog-card-excerpt">
          ${escapeHTML(blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 110) + '...' : ''))}
        </p>

        <div class="blog-card-footer">
          <div class="blog-author-info">
            <img 
              src="${blog.author && blog.author.avatar ? blog.author.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}" 
              alt="${blog.author ? escapeHTML(blog.author.name) : 'Author'}" 
              class="author-avatar-sm"
              onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'"
            />
            <div class="author-text-wrapper">
              <span class="author-name">${blog.author ? escapeHTML(blog.author.name) : 'LumaLife Team'}</span>
            </div>
          </div>

          <div class="blog-card-actions">
            <button 
              type="button" 
              class="like-btn-inline ${liked ? 'liked' : ''}" 
              data-blog-id="${blog.id}"
              title="Like this story"
            >
              <span class="like-heart">${liked ? '❤️' : '🤍'}</span>
              <span class="like-count-num">${blog.likes || 0}</span>
            </button>
            <a href="blog.html?id=${blog.id}" class="read-more-btn">
              Read <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

// Utility string functions
function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(text) {
  if (!text) return "general";
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Attach event delegation for bookmark & like clicks across all cards
document.addEventListener("click", e => {
  // Bookmark button click
  const bookmarkBtn = e.target.closest(".bookmark-btn");
  if (bookmarkBtn) {
    e.preventDefault();
    e.stopPropagation();
    const blogId = bookmarkBtn.getAttribute("data-blog-id");
    if (blogId) {
      const isSaved = toggleBookmark(blogId);
      // Update this button
      bookmarkBtn.classList.toggle("bookmarked", isSaved);
      const icon = bookmarkBtn.querySelector(".bookmark-icon");
      if (icon) icon.textContent = isSaved ? "🔖" : "📑";
      bookmarkBtn.title = isSaved ? "Remove Bookmark" : "Save Story";
    }
    return;
  }

  // Like button inline click
  const likeBtn = e.target.closest(".like-btn-inline");
  if (likeBtn) {
    e.preventDefault();
    e.stopPropagation();
    const blogId = likeBtn.getAttribute("data-blog-id");
    if (blogId) {
      const result = toggleLike(blogId);
      likeBtn.classList.toggle("liked", result.isLiked);
      const heart = likeBtn.querySelector(".like-heart");
      const countEl = likeBtn.querySelector(".like-count-num");
      if (heart) heart.textContent = result.isLiked ? "❤️" : "🤍";
      if (countEl) countEl.textContent = result.count;
    }
    return;
  }
});

// Sync bookmark states if updated anywhere
window.addEventListener("lumalife:bookmarks-updated", e => {
  const { blogId, isSaved } = e.detail;
  document.querySelectorAll(`.bookmark-btn[data-blog-id="${blogId}"]`).forEach(btn => {
    btn.classList.toggle("bookmarked", isSaved);
    const icon = btn.querySelector(".bookmark-icon");
    if (icon) icon.textContent = isSaved ? "🔖" : "📑";
    btn.title = isSaved ? "Remove Bookmark" : "Save Story";
  });
});

// Sync like states if updated anywhere
window.addEventListener("lumalife:likes-updated", e => {
  const { blogId, likesCount, isLiked } = e.detail;
  document.querySelectorAll(`.like-btn-inline[data-blog-id="${blogId}"]`).forEach(btn => {
    btn.classList.toggle("liked", isLiked);
    const heart = btn.querySelector(".like-heart");
    const countEl = btn.querySelector(".like-count-num");
    if (heart) heart.textContent = isLiked ? "❤️" : "🤍";
    if (countEl) countEl.textContent = likesCount;
  });
});

// Initialize general features on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateBookmarkCountBadge();
  setupNewsletterForms();
});
