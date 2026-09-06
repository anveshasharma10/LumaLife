/**
 * LumaLife - Single Blog Details Page Logic
 * Handles URL parameter parsing, rich content rendering, reading progress bar,
 * like & bookmark actions, share drawer/copy link, and related stories.
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  const notFoundSection = document.getElementById("blog-not-found");
  const blogContentSection = document.getElementById("blog-detail-container");
  const progressBar = document.getElementById("reading-progress-bar");

  // Read data
  const blogs = getData("lumalife_blogs", []);
  const blog = blogs.find(b => String(b.id) === String(blogId));

  if (!blog) {
    if (notFoundSection) notFoundSection.style.display = "block";
    if (blogContentSection) blogContentSection.style.display = "none";
    return;
  }

  // Update Page Title
  document.title = `${blog.title} — LumaLife Magazine`;

  // Render Story
  renderBlogDetails(blog);
  renderRelatedStories(blog, blogs);
  setupScrollProgressBar();
  setupShareControls(blog);
  setupArticleActions(blog);
});

/**
 * Render the main article details
 */
function renderBlogDetails(blog) {
  const readTime = blog.readTime || calculateReadingTime(blog.content);
  const isSaved = isBookmarked(blog.id);
  const liked = isLiked(blog.id);

  // Category Badge & Breadcrumb
  const categoryBadge = document.getElementById("article-category");
  if (categoryBadge) {
    categoryBadge.textContent = blog.category;
    categoryBadge.className = `blog-category-badge category-${slugify(blog.category)}`;
    categoryBadge.href = `blogs.html?category=${encodeURIComponent(blog.category)}`;
  }

  const breadcrumbCategory = document.getElementById("breadcrumb-category");
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = blog.category;
    breadcrumbCategory.href = `blogs.html?category=${encodeURIComponent(blog.category)}`;
  }

  // Title
  const titleEl = document.getElementById("article-title");
  if (titleEl) titleEl.textContent = blog.title;

  // Meta info
  const dateEl = document.getElementById("article-date");
  if (dateEl) dateEl.textContent = blog.date;

  const readTimeEl = document.getElementById("article-read-time");
  if (readTimeEl) readTimeEl.textContent = `${readTime} min read`;

  // Author details
  const authorNameEl = document.getElementById("article-author-name");
  const authorRoleEl = document.getElementById("article-author-role");
  const authorAvatarEl = document.getElementById("article-author-avatar");

  if (blog.author) {
    if (authorNameEl) authorNameEl.textContent = blog.author.name || "LumaLife Staff";
    if (authorRoleEl) authorRoleEl.textContent = blog.author.role || "Lifestyle Contributor";
    if (authorAvatarEl) {
      authorAvatarEl.src = blog.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
      authorAvatarEl.alt = blog.author.name || "Author";
    }
  }

  // Featured Hero Image
  const featuredImg = document.getElementById("article-featured-image");
  if (featuredImg) {
    featuredImg.src = blog.image || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80";
    featuredImg.alt = blog.title;
  }

  // Lead Excerpt
  const excerptEl = document.getElementById("article-lead-excerpt");
  if (excerptEl) {
    if (blog.excerpt) {
      excerptEl.textContent = blog.excerpt;
      excerptEl.style.display = "block";
    } else {
      excerptEl.style.display = "none";
    }
  }

  // Main Article Body
  const bodyEl = document.getElementById("article-body-content");
  if (bodyEl) {
    bodyEl.innerHTML = blog.content || `<p>${escapeHTML(blog.excerpt)}</p>`;
  }

  // Tags List
  const tagsContainer = document.getElementById("article-tags-list");
  if (tagsContainer) {
    if (Array.isArray(blog.tags) && blog.tags.length > 0) {
      tagsContainer.innerHTML = blog.tags.map(tag => `
        <a href="blogs.html?tag=${encodeURIComponent(tag)}" class="article-tag-chip">
          #${escapeHTML(tag)}
        </a>
      `).join("");
    } else {
      tagsContainer.innerHTML = "";
    }
  }

  // Action Buttons Sync (Like, Bookmark)
  updateActionButtonsUI(blog.id, liked, blog.likes || 0, isSaved);
}

/**
 * Setup Article Like and Bookmark action buttons
 */
function setupArticleActions(blog) {
  const likeBtn = document.getElementById("article-like-btn");
  const bookmarkBtn = document.getElementById("article-bookmark-btn");

  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      const result = toggleLike(blog.id);
      updateActionButtonsUI(blog.id, result.isLiked, result.count, isBookmarked(blog.id));
    });
  }

  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", () => {
      const isSaved = toggleBookmark(blog.id);
      updateActionButtonsUI(blog.id, isLiked(blog.id), blog.likes || 0, isSaved);
    });
  }
}

function updateActionButtonsUI(blogId, liked, likeCount, isSaved) {
  const likeBtn = document.getElementById("article-like-btn");
  const likeCountEl = document.getElementById("article-like-count");
  const likeHeartEl = document.getElementById("article-like-heart");

  if (likeBtn) {
    likeBtn.classList.toggle("liked", liked);
    if (likeHeartEl) likeHeartEl.textContent = liked ? "❤️" : "🤍";
    if (likeCountEl) likeCountEl.textContent = likeCount;
  }

  const bookmarkBtn = document.getElementById("article-bookmark-btn");
  const bookmarkIconEl = document.getElementById("article-bookmark-icon");
  const bookmarkLabelEl = document.getElementById("article-bookmark-label");

  if (bookmarkBtn) {
    bookmarkBtn.classList.toggle("bookmarked", isSaved);
    if (bookmarkIconEl) bookmarkIconEl.textContent = isSaved ? "🔖" : "📑";
    if (bookmarkLabelEl) bookmarkLabelEl.textContent = isSaved ? "Saved" : "Save Story";
  }
}

/**
 * Scroll Reading Progress Bar (0% -> 100%)
 */
function setupScrollProgressBar() {
  const progressBar = document.getElementById("reading-progress-bar");
  if (!progressBar) return;

  function updateProgress() {
    const article = document.querySelector(".article-main");
    if (!article) return;

    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate progress through the article
    const totalScrollable = articleHeight - windowHeight + 200;
    const currentProgress = scrollY - articleTop;

    let percentage = 0;
    if (currentProgress > 0 && totalScrollable > 0) {
      percentage = Math.min(100, Math.max(0, (currentProgress / totalScrollable) * 100));
    }

    progressBar.style.width = `${percentage}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

/**
 * Share Modal & Social Handlers
 */
function setupShareControls(blog) {
  const shareBtn = document.getElementById("article-share-btn");
  const shareModal = document.getElementById("share-modal");
  const shareOverlay = document.getElementById("share-modal-overlay");
  const closeModalBtn = document.getElementById("close-share-modal");

  const copyLinkBtn = document.getElementById("copy-link-btn");
  const shareWhatsappBtn = document.getElementById("share-whatsapp");
  const shareTwitterBtn = document.getElementById("share-twitter");
  const shareLinkedinBtn = document.getElementById("share-linkedin");

  const currentUrl = window.location.href;
  const shareTitle = `${blog.title} — LumaLife`;
  const shareText = blog.excerpt || `Read "${blog.title}" on LumaLife`;

  function openShare() {
    // If native navigator.share is supported on mobile, offer native share or fallback modal
    if (navigator.share && window.innerWidth < 768) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: currentUrl
      }).catch(err => {
        if (err.name !== "AbortError") {
          if (shareModal) shareModal.classList.add("active");
          if (shareOverlay) shareOverlay.classList.add("active");
        }
      });
    } else {
      if (shareModal) shareModal.classList.add("active");
      if (shareOverlay) shareOverlay.classList.add("active");
    }
  }

  function closeShare() {
    if (shareModal) shareModal.classList.remove("active");
    if (shareOverlay) shareOverlay.classList.remove("active");
  }

  if (shareBtn) shareBtn.addEventListener("click", openShare);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeShare);
  if (shareOverlay) shareOverlay.addEventListener("click", closeShare);

  // Copy Link with Clipboard API
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(currentUrl);
        showToast("Link copied to clipboard! 📋", "success");
        copyLinkBtn.classList.add("copied");
        const btnText = copyLinkBtn.querySelector(".btn-text");
        if (btnText) btnText.textContent = "Copied!";
        setTimeout(() => {
          copyLinkBtn.classList.remove("copied");
          if (btnText) btnText.textContent = "Copy Link";
        }, 2500);
      } catch (err) {
        // Fallback prompt
        window.prompt("Copy this URL:", currentUrl);
      }
    });
  }

  // Social Share links
  if (shareWhatsappBtn) {
    shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + currentUrl)}`;
  }
  if (shareTwitterBtn) {
    shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`;
  }
  if (shareLinkedinBtn) {
    shareLinkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  }
}

/**
 * Render 3 related stories from same category (or fallback)
 */
function renderRelatedStories(currentBlog, allBlogs) {
  const container = document.getElementById("related-stories-grid");
  if (!container) return;

  // Filter out current blog
  const candidates = allBlogs.filter(b => String(b.id) !== String(currentBlog.id));

  // First priority: same category
  let related = candidates.filter(b => b.category.toLowerCase() === currentBlog.category.toLowerCase());

  // If fewer than 3, fill with other stories
  if (related.length < 3) {
    const others = candidates.filter(b => b.category.toLowerCase() !== currentBlog.category.toLowerCase());
    related = [...related, ...others];
  }

  const top3 = related.slice(0, 3);
  container.innerHTML = top3.map(blog => createBlogCardHTML(blog)).join("");
}
