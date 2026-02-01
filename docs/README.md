# Record Label Website Project

## 🎵 Vision: "The Modern Powerhouse"
This project aims to build a world-class record label website that combines the best elements of industry giants:
-   **Universal Music's Structure**: Clean grids and authoritative layout.
-   **Warner Music's Emotion**: Artist-first storytelling and rich media.
-   **Modern Tech**: A premium **Dark Mode** aesthetic (inspired by Warner India) built for speed and visual impact.

## 🛠 Tech Stack
We are building this "from scratch" using the most modern, scalable tools available in 2026:

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
    *   *Why?* It's the industry standard for fast, SEO-friendly React apps.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    *   *Why?* Allows us to craft a bespoke "Void Black" theme without fighting default browser styles.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
    *   *Why?* Essential for those premium "fade-up" and "reveal" effects seen on top-tier sites.
*   **Icons**: [Lucide React](https://lucide.dev/)
    *   *Why?* Clean, sharp, and lightweight icons.

## 🚀 Features Roadmap

### Phase 1: The Foundation (Current Focus)
-   [ ] **Project Setup**: Next.js & Tailwind configuration.
-   [ ] **Design System**: Defining the `Void Black` (#050505) and `Electric Blue` (#2563EB) theme.
-   [ ] **Navbar**: Glass-morphism navigation with mobile support.

### Phase 2: Core Experience
-   [ ] **Hero Section**: Full-screen auto-playing video loop.
-   [ ] **Artist Roster**: A searchable grid of artist cards (B&W to Color hover effects).
-   [ ] **News Feed**: A filterable list of press releases and signings.

### Phase 3: Polish
-   [ ] **Smart Links**: Modal integration for streaming services.
-   [ ] **Careers Page**: Clean text layout for recruitment.

## 📂 Project Structure
```bash
/app
  /components    # Reusable UI (Hero, Navbar, ArtistCard)
  /artists       # Artist Roster Page
  /news          # News Feed Page
  layout.tsx     # Main wrapper (Fonts, Global CSS)
/public          # Images & Assets
```

## 🤝 How We Build This
1.  **Analyze**: We studied Universal, Sony, and Warner to understand the "rules" of the industry.
2.  **Plan**: We created a design spec and implementation plan (see `docs/`).
3.  **Code**: We generate clean, modular code, verifying each component as we go.
