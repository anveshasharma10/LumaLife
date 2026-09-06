/**
 * LumaLife - Bookmarks Page Logic
 * Renders all saved blogs stored in LocalStorage.
 * Supports individual removal and clearing all bookmarks.
 */

document.addEventListener("DOMContentLoaded", () => {
  const bookmarksGrid = document.getElementById("bookmarks-grid");
  const bookmarksEmpty = document.getElementById("bookmarks-empty");
  const bookmarksCountEl = document.getElementById("bookmarks-count-text");
  const clearAllBtn = document.getElementById("clear-all-bookmarks-btn");

  function renderBookmarks() {
    const savedIds = getData("lumalife_bookmarks", []);
    const allBlogs = getData("lumalife_blogs", []);

    // Filter matching blogs
    const savedBlogs = allBlogs.filter(b => savedIds.some(id => String(id) === String(b.id)));

    // Update count indicator
    if (bookmarksCountEl) {
      if (savedBlogs.length === 1) {
        bookmarksCountEl.textContent = "You have 1 saved story";
      } else {
        bookmarksCountEl.textContent = `You have ${savedBlogs.length} saved stories`;
      }
    }

    // Toggle clear all button
    if (clearAllBtn) {
      clearAllBtn.style.display = savedBlogs.length > 0 ? "inline-flex" : "none";
    }

    // Handle empty state
    if (savedBlogs.length === 0) {
      if (bookmarksGrid) {
        bookmarksGrid.innerHTML = "";
        bookmarksGrid.style.display = "none";
      }
      if (bookmarksEmpty) {
        bookmarksEmpty.style.display = "block";
      }
      return;
    }

    if (bookmarksEmpty) bookmarksEmpty.style.display = "none";
    if (bookmarksGrid) {
      bookmarksGrid.style.display = "grid";
      bookmarksGrid.innerHTML = savedBlogs.map(blog => createBlogCardHTML(blog)).join("");
    }
  }

  // Clear All Bookmarks
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to remove all saved bookmarks?")) {
        saveData("lumalife_bookmarks", []);
        updateBookmarkCountBadge();
        showToast("All bookmarks cleared", "info");
        renderBookmarks();
      }
    });
  }

  // Listen for custom bookmark events to re-render dynamically
  window.addEventListener("lumalife:bookmarks-updated", () => {
    renderBookmarks();
  });

  // Initial render
  renderBookmarks();
});
