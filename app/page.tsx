"use client";

import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import NewsCard from "./components/NewsCard";
import ArtistCard from "./components/ArtistCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugin is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock Data for Home Page
const FEATURED_NEWS = [
  { title: "Universal Music Group N.V. to Announce Financial Results", category: "Corporate", date: "OCT 24", slug: "finance-results" },
  { title: "NEON MIST Breaks Global Streaming Records with 'Void'", category: "Press", date: "OCT 22", slug: "neon-mist-record" },
  { title: "Antigravity Signs Viral Sensation 'Cyber Saint'", category: "Signings", date: "OCT 20", slug: "cyber-saint-signing" },
  { title: "World Tour Announced: The Velvet Echo Experience", category: "Tour", date: "OCT 18", slug: "velvet-echo-tour" },
  { title: "New AI Production Tools Available for Artists", category: "Tech", date: "OCT 15", slug: "tech-tools" },
  { title: "Charity Concert Raises $5M for Music Education", category: "Impact", date: "OCT 10", slug: "charity-concert" },
];

const TOP_ARTISTS = [
  { name: "Neon Gen", image: "/images/artist-neon.png", slug: "neon-gen" },
  { name: "Velvet Echo", image: "/images/artist-velvet.png", slug: "velvet-echo" },
  { name: "The Void", image: "/images/artist-void.png", slug: "the-void" },
];

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Manifesto Section - Pinned Scroll Scrub
      const manifestoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      manifestoTl
        .fromTo(".manifesto-word-1",
          { opacity: 0, filter: "blur(20px)" },
          { opacity: 1, filter: "blur(0px)", duration: 1 }
        )
        .fromTo(".manifesto-word-2",
          { opacity: 0, scale: 0.2 },
          { opacity: 1, scale: 1, duration: 1 }
        )
        .fromTo(".manifesto-word-3",
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1 }
        );

      // 2. Animate News Section (Staggered)
      const newsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".news-section",
          start: "top 70%",
        }
      });

      newsTl
        .from(".news-header", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".news-card", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4");

      // 3. Animate Artists Section (Staggered + Parallax)
      const artistTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".artist-section",
          start: "top 60%",
        }
      });

      artistTl
        .from(".artist-header", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".artist-card-wrapper", { y: 100, opacity: 0, rotationX: -10, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.4");

      // Parallax Watermark Animation
      gsap.to(".artist-bg-text", {
        scrollTrigger: {
          trigger: ".artist-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        xPercent: 10, // Subtle horizontal movement
        ease: "none"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main ref={mainRef} className="bg-void-black text-white selection:bg-electric-blue selection:text-white overflow-hidden">

        {/* 1. Hero Slider */}
        <HeroSlider />

        {/* 2. Manifesto Section (Pinned & Scrubbed) */}
        <section className="manifesto-section h-screen bg-void-black flex items-center justify-center relative overflow-hidden z-20">
          <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
          <div className="flex flex-col items-center justify-center gap-4 relative z-10">
            <div className="manifesto-word-1 text-[12vmin] font-black uppercase tracking-tighter text-neutral-500 leading-none">
              Boundaries
            </div>
            <div className="manifesto-word-2 text-[15vmin] font-black uppercase tracking-tighter text-white leading-[0.8]">
              Are
            </div>
            <div className="manifesto-word-3 text-[15vmin] font-black uppercase tracking-tighter text-transparent stroke-text leading-none">
              Illusions
            </div>
          </div>
        </section>

        {/* 3. Latest News (List Layout) */}
        <section className="news-section py-24 container mx-auto px-6 relative z-10 bg-void-black">
          <div className="news-header flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase">
              LATEST <span className="text-electric-blue">UPDATES</span>
            </h2>
            <Link href="/news" className="hidden md:flex items-center gap-2 text-silver hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
              View All News <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-neutral-800 pt-12">
            {FEATURED_NEWS.slice(0, 3).map((news) => (
              <div key={news.slug} className="news-card group cursor-pointer">
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
                  <span className="text-electric-blue">{news.category}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400">{news.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight group-hover:text-electric-blue transition-colors duration-300">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-neutral-800 pt-12 mt-12 hidden md:grid">
            {FEATURED_NEWS.slice(3, 6).map((news) => (
              <div key={news.slug} className="news-card group cursor-pointer">
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
                  <span className="text-electric-blue">{news.category}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400">{news.date}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-electric-blue transition-colors duration-300 text-silver group-hover:text-white">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/news" className="inline-block border border-neutral-800 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              View All News
            </Link>
          </div>
        </section>

        {/* 4. Featured Artists (Redesigned & Premium) */}
        <section className="artist-section py-32 border-t border-white/10 relative z-10 overflow-hidden bg-void-black">
          {/* Parallax Background Title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
            <h2 className="artist-bg-text text-[20vw] font-black font-heading text-neutral-900/50 leading-none tracking-tighter whitespace-nowrap opacity-20 transform translate-y-1/4">
              THE ROSTER
            </h2>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="artist-header flex flex-col md:flex-row justify-between items-end mb-20">
              <div className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-[2px] w-12 bg-electric-blue" />
                  <span className="text-electric-blue font-bold tracking-[0.2em] text-sm uppercase">Our Talent</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-[0.85]">
                  Recording<br />
                  <span className="text-transparent stroke-text">Artists</span>
                </h2>
              </div>

              <div className="flex flex-col items-end gap-4 mt-8 md:mt-0">
                <p className="text-neutral-400 max-w-sm text-right hidden md:block leading-relaxed">
                  Antigravity is home to many of the world's visionary artists — from emerging local talent to global superstars.
                </p>
                <Link href="/artists" className="flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold group">
                  View Full Roster <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TOP_ARTISTS.map((artist) => (
                <div key={artist.slug} className="artist-card-wrapper">
                  <ArtistCard {...artist} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
