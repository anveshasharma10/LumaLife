<div align="center">

# 🌿 LumaLife

### A Modern Editorial Lifestyle Platform & In-Browser CMS

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-2ea44f?style=for-the-badge&logo=google-chrome&logoColor=white)](https://ais-pre-5gjecwmo7lzstiecrywg77-388543301451.asia-southeast1.run.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Pure Vanilla](https://img.shields.io/badge/Dependencies-Zero_Framework-orange?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<p align="center">
  <b>LumaLife</b> is a clean, responsive lifestyle publication and content management platform built with modern HTML5, CSS3, and Vanilla JavaScript. Engineered with zero framework overhead, it features client-side state persistence, real-time search, an interactive reader engine, and an author dashboard.
</p>

[Explore Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Project Structure](#-project-structure) • [Author](#-author)

</div>

---

## ✨ Features

### 📖 Editorial Reader Experience
- **Fluid Multi-Page Architecture**: 7 dedicated pages (`Home`, `Articles`, `Article Detail`, `Categories`, `Bookmarks`, `About`, and `Author Dashboard`).
- **Clean Minimalism Aesthetic**: Tailored color palettes, custom CSS variables, and bespoke typography (*Playfair Display* & *Plus Jakarta Sans*).
- **Theme Switcher**: Seamless dark and light mode toggle with state persisted across browser sessions.
- **Reading Progress Bar**: Dynamic top-scroll indicator that tracks user progression through long-form articles.

### 🔍 Discovery & Interaction
- **Instant Search**: Real-time keyword filtering across article titles, excerpts, and authors.
- **Category & Tag Filters**: Quick navigation by wellness, interior, slow living, travel, and mindful productivity.
- **Dynamic Sorting**: Filter articles by newest, popularity (views/likes), estimated reading time, or alphabetically.
- **Engagement Engine**: Like counter, article bookmarking, nested reader commenting, and native Web Share API integration with custom fallbacks.

### ✍️ Author Content Studio (CMS)
- **Full CRUD Capabilities**: Create, read, edit, and delete lifestyle articles on the fly.
- **Form Validation & Live Preview**: Real-time image URL preview, category selection, and instant article generation.
- **LocalStorage Persistence**: Full state management running completely client-side in your browser, complete with a one-click demo data reset option.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Core** | Semantic HTML5, CSS3 (Custom Variables, Flexbox, Grid), Vanilla JavaScript (ES6+) |
| **Persistence** | Browser `localStorage` API |
| **Typography** | Google Fonts (*Playfair Display*, *Plus Jakarta Sans*, *Outfit*) |
| **Assets & Media** | Unsplash Photography CDN |
| **Tooling / Dev** | Vite, TypeScript (for type verification) |

---

## 🚀 Quick Start

You can run this project locally in two ways:

### Option 1: Using Vite (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anveshasharma10/LumaLIfe.git
   cd LumaLIfe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

### Option 2: Zero-Install (Instant Preview)

Since the platform is built with pure HTML, CSS, and Vanilla JavaScript, no build tools are strictly required:

- **Using VS Code Live Server**: Open the project folder in VS Code, right-click `index.html`, and select **"Open with Live Server"**.
- **Direct Launch**: Simply double-click `index.html` in your file explorer to open it directly in any browser.

---

## 📁 Project Structure

```text
LumaLIfe/
├── index.html            # Landing page & featured editorial picks
├── blogs.html            # Searchable & filterable article directory
├── blog.html             # Detailed article view with comments & progress bar
├── categories.html       # Topic collections & curated feeds
├── bookmarks.html        # Reader saved articles feed
├── dashboard.html        # Author studio & article management (CMS)
├── about.html            # Publication story & philosophy
├── css/
│   ├── style.css         # Main stylesheet, theme tokens & design system
│   └── responsive.css    # Adaptive layout rules & media queries
├── js/
│   ├── app.js            # Core router, state manager, & storage helpers
│   ├── blog.js           # Article detail engine & comment handling
│   └── dashboard.js      # Author CRUD actions & analytics
├── package.json          # Project metadata & build scripts
└── README.md             # Documentation
```

---

## 💡 Engineering Highlights

- **Zero Heavy Frameworks**: High performance with instantaneous page loads by leveraging vanilla web standards.
- **Modular Data Layer**: Employs a single-source-of-truth data abstraction layer wrapping `localStorage` with initial seed fallbacks.
- **Accessible & Responsive**: Follows mobile-first responsive principles with accessible contrast ratios, touch targets, and semantic tags.

---

## 👤 Author

**Anvesha Sharma**
- GitHub: [@anveshasharma10](https://github.com/anveshasharma10)

---

<div align="center">
  <sub>Crafted with passion for mindful living and clean web craftsmanship.</sub>
</div>
