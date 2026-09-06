/**
 * LumaLife - Comments System Module
 * Allows readers to post comments with name, email, and message.
 * Comments persist in LocalStorage per blog ID and can be deleted.
 */

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  if (!blogId) return;

  const commentsListEl = document.getElementById("comments-list");
  const commentsCountEl = document.getElementById("comments-count");
  const commentForm = document.getElementById("comment-form");

  // Load and render comments
  function renderComments() {
    const allComments = getData("lumalife_comments", {});
    const blogComments = allComments[blogId] || [];

    if (commentsCountEl) {
      commentsCountEl.textContent = `(${blogComments.length})`;
    }

    if (!commentsListEl) return;

    if (blogComments.length === 0) {
      commentsListEl.innerHTML = `
        <div class="empty-comments">
          <p>No comments yet. Be the first to share your thoughts on this story!</p>
        </div>
      `;
      return;
    }

    commentsListEl.innerHTML = blogComments.map(comment => {
      const avatarUrl = comment.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(comment.name)}&backgroundColor=e07a5f,81b29a,f4a261`;
      
      return `
        <div class="comment-card" data-comment-id="${comment.id}">
          <div class="comment-header">
            <div class="comment-author-meta">
              <img 
                src="${avatarUrl}" 
                alt="${escapeHTML(comment.name)}" 
                class="comment-avatar" 
                onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'"
              />
              <div>
                <h4 class="comment-author-name">${escapeHTML(comment.name)}</h4>
                <span class="comment-date">${comment.date}</span>
              </div>
            </div>
            <button 
              type="button" 
              class="comment-delete-btn" 
              data-comment-id="${comment.id}" 
              title="Delete this comment"
              aria-label="Delete this comment"
            >
              🗑️ Delete
            </button>
          </div>
          <p class="comment-body-text">${escapeHTML(comment.text)}</p>
        </div>
      `;
    }).join("");

    // Attach delete listeners
    commentsListEl.querySelectorAll(".comment-delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const commentId = btn.getAttribute("data-comment-id");
        if (confirm("Are you sure you want to delete this comment?")) {
          deleteComment(commentId);
        }
      });
    });
  }

  // Handle comment form submission
  if (commentForm) {
    commentForm.addEventListener("submit", e => {
      e.preventDefault();

      const nameInput = document.getElementById("comment-name");
      const emailInput = document.getElementById("comment-email");
      const textInput = document.getElementById("comment-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const text = textInput ? textInput.value.trim() : "";

      // Validation
      if (!name || name.length < 2) {
        showToast("Please enter your name.", "error");
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        if (emailInput) emailInput.focus();
        return;
      }

      if (!text || text.length < 3) {
        showToast("Please write a meaningful comment.", "error");
        if (textInput) textInput.focus();
        return;
      }

      // Create comment object
      const newComment = {
        id: "c_" + Date.now(),
        name,
        email,
        text,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=e07a5f,81b29a,f4a261`
      };

      // Save to LocalStorage
      const allComments = getData("lumalife_comments", {});
      if (!allComments[blogId]) {
        allComments[blogId] = [];
      }
      allComments[blogId].unshift(newComment);
      saveData("lumalife_comments", allComments);

      // Reset form
      commentForm.reset();
      showToast("Comment posted successfully! 💬", "success");

      // Re-render
      renderComments();
    });
  }

  function deleteComment(commentId) {
    const allComments = getData("lumalife_comments", {});
    if (allComments[blogId]) {
      allComments[blogId] = allComments[blogId].filter(c => c.id !== commentId);
      saveData("lumalife_comments", allComments);
      showToast("Comment deleted", "info");
      renderComments();
    }
  }

  // Initial render
  renderComments();
});
