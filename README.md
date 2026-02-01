# 🎵 Antigravity Records

A premium, modern record label website built with Next.js, featuring stunning animations, responsive design, and a sophisticated user experience inspired by industry leaders like Universal Music Group, Sony Music, and Warner Music Group.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)

## ✨ Features

### 🎨 Premium Design
- **Dark, Cyber-Aesthetic Theme** with custom color palette (Void Black, Electric Blue, Neon Purple)
- **Parallax Effects** and scroll-triggered animations throughout
- **Glassmorphism** and backdrop blur effects for modern UI
- **Responsive Design** optimized for all devices (mobile, tablet, desktop)

### 🎬 Advanced Animations
- **GSAP ScrollTrigger** for pinned sections and scrub animations
- **Framer Motion** for smooth page transitions and micro-interactions
- **Staggered Entry Animations** for content reveals
- **Custom Preloader** with animated logo
- **404 Glitch Effect** for a thematic error experience

### 🎯 Key Pages
- **Home**: Hero slider, manifesto section, latest updates, featured artists
- **Artists**: Parallax header, visual mosaic, searchable roster grid
- **Releases**: Album showcase with GSAP stagger animations
- **News**: Masonry grid layout with category filtering and mobile-optimized featured articles
- **About**: Mission section with advanced scroll animations, timeline, team showcase
- **Contact**: Interactive form with GSAP focus animations and validation
- **404 / Under Construction**: Creative "Signal Lost" page with interactive mouse follower

### 🔍 Interactive Features
- **Global Search**: Slide-down search panel with real-time filtering
- **Mobile Menu**: Animated hamburger menu with full-screen overlay
- **Artist Cards**: Hover effects and gradient overlays
- **Responsive Navigation**: Adaptive navbar with scroll effects

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: 
  - [GSAP](https://greensock.com/gsap/) with ScrollTrigger plugin
  - [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: 
  - [Outfit](https://fonts.google.com/specimen/Outfit) (Headings)
  - [Inter](https://fonts.google.com/specimen/Inter) (Body)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Optimization**: Next.js Image component

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akhilesh10gupta/label.git
   cd label
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
album/
├── app/
│   ├── components/        # Reusable React components
│   │   ├── Navbar.tsx    # Navigation with search
│   │   ├── Hero.tsx      # Hero slider
│   │   ├── ArtistCard.tsx
│   │   ├── Preloader.tsx
│   │   └── Footer.tsx
│   ├── artists/          # Artists page
│   ├── releases/         # Releases page
│   ├── news/             # News page
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── globals.css       # Global styles & theme
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── not-found.tsx     # 404 / Under Construction page
├── public/
│   └── images/           # Static images
├── tailwind.config.ts    # Tailwind configuration
└── next.config.ts        # Next.js configuration
```

## 🎨 Design System

### Color Palette
- **Void Black**: `#050505` - Primary background
- **Electric Blue**: `#2563EB` - Primary accent
- **Neon Purple**: `#7C3AED` - Secondary accent
- **Silver**: `#A1A1AA` - Text/borders

### Typography
- **Headings**: Outfit (Black, Bold weights)
- **Body**: Inter (Regular, Medium weights)

### Key Design Patterns
- **Stroke Text**: Outlined typography for emphasis
- **Parallax Watermarks**: Large background text with scroll effects
- **Gradient Overlays**: Smooth transitions on images
- **Backdrop Blur**: Frosted glass effects

## 🌟 Key Features Breakdown

### Search Functionality
- Real-time search across artists, releases, and news
- Slide-down panel with smooth animations
- "No results" feedback with helpful suggestions
- Mobile-optimized interface

### Mobile Experience
- Dedicated mobile menu with full-screen overlay
- Touch-optimized interactions
- Responsive typography scaling
- Optimized image loading

### Performance
- Next.js Image optimization
- Code splitting and lazy loading
- Optimized animations with GSAP
- Minimal bundle size

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Akhilesh Gupta**
- GitHub: [@Akhilesh10gupta](https://github.com/Akhilesh10gupta)

## 🙏 Acknowledgments

- Design inspiration from Universal Music Group, Sony Music, and Warner Music Group
- Built with modern web technologies and best practices
- Special thanks to the Next.js and GSAP communities

---

**Made with ❤️ and ☕ by Akhilesh Gupta**
