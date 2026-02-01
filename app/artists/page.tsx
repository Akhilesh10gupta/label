"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import ArtistCard from "../components/ArtistCard";
import { Search, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Preloader from "../components/Preloader";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Placeholder Data
const ARTISTS = [
    { name: "Neon Genesis", slug: "neon-genesis", image: "/images/artist-neon.png" },
    { name: "Velvet Echo", slug: "velvet-echo", image: "/images/artist-velvet.png" },
    { name: "Cyber Saint", slug: "cyber-saint", image: "/images/artist-void.png" },
    { name: "Luna Tide", slug: "luna-tide", image: "/images/hero-artist.png" },
    { name: "The Void", slug: "the-void", image: "/images/artist-void.png" },
    { name: "Astro Funk", slug: "astro-funk", image: "/images/hero-concert.png" },
];

export default function ArtistsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    const filteredArtists = ARTISTS.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            // 1. Parallax Watermark Text
            gsap.to(".artist-bg-text", {
                scrollTrigger: {
                    trigger: ".header-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                },
                xPercent: 15, // Horizontal movement
                ease: "none"
            });

            // 2. Header Reveal
            const headerTl = gsap.timeline();
            headerTl
                .from(".header-line", { width: 0, duration: 1, ease: "power3.out" })
                .from(".header-title", { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
                .from(".header-desc", { opacity: 0, x: 20, duration: 1, ease: "power3.out" }, "-=0.8");

            // 3. Mosaic Reveal
            gsap.from(".mosaic-item", {
                scrollTrigger: {
                    trigger: ".mosaic-grid",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out"
            });

            // 4. Banner Reveal
            gsap.from(".banner-text", {
                scrollTrigger: {
                    trigger: ".banner-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });

            // 5. Batch Reveal for Grid Items
            ScrollTrigger.batch(".artist-item", {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: "power2.out",
                        overwrite: true
                    });
                },
                onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
                onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
                onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
                start: "top 85%",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    return (
        <main ref={containerRef} className="min-h-screen bg-void-black text-white selection:bg-electric-blue selection:text-white overflow-hidden">
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <Navbar />

            {/* SECTION 1: HEADER WITH PARALLAX & MOSAIC */}
            <section className="header-section pt-24 md:pt-40 pb-12 md:pb-20 px-6 container mx-auto relative z-10">
                {/* Parallax Background Title */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none -z-10">
                    <h2 className="artist-bg-text text-[15vw] md:text-[20vw] font-black font-heading text-neutral-900/50 leading-none tracking-tighter whitespace-nowrap opacity-20">
                        THE ROSTER
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 relative z-10">
                    <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="header-line h-[2px] w-12 md:w-20 bg-electric-blue" />
                            <span className="text-electric-blue font-bold tracking-[0.2em] text-xs md:text-sm uppercase">Our Talent</span>
                        </div>
                        <h1 className="header-title text-5xl md:text-7xl lg:text-9xl font-black font-heading tracking-tighter uppercase leading-[0.9]">
                            Recording<br />
                            <span className="text-transparent stroke-text">Artists</span>
                        </h1>
                    </div>

                    <div className="header-desc flex flex-col items-start md:items-end gap-6 mt-8 md:mt-0 max-w-md text-left md:text-right">
                        <p className="text-neutral-400 leading-relaxed text-base md:text-lg">
                            Antigravity is home to many of the world's visionary artists — from emerging local talent to global superstars.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-silver">
                            Scout New Talent <ArrowRight size={14} />
                        </div>
                    </div>
                </div>

                {/* Visual Mosaic (Top 3 Features) */}
                <div className="mosaic-grid grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh] min-h-[500px]">
                    <div className="mosaic-item relative col-span-1 md:col-span-2 bg-neutral-800 overflow-hidden group">
                        <Image src="/images/artist-neon.png" alt="Featured" fill className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100" />
                        <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
                            <span className="bg-electric-blue text-white text-xs font-bold px-3 py-1 uppercase tracking-widest mb-3 inline-block">Global Icon</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase italic">NEON GENESIS</h2>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="mosaic-item relative flex-1 bg-neutral-800 overflow-hidden group">
                            <Image src="/images/artist-velvet.png" alt="Featured" fill className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h2 className="text-xl md:text-2xl font-heading font-bold uppercase italic">VELVET ECHO</h2>
                            </div>
                        </div>
                        <div className="mosaic-item relative flex-1 bg-neutral-800 overflow-hidden group">
                            <Image src="/images/artist-void.png" alt="Featured" fill className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h2 className="text-xl md:text-2xl font-heading font-bold uppercase italic">THE VOID</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: VIBRANT WMG BANNER */}
            <section className="banner-section bg-[#ff00cc] py-24 px-6 mb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
                <div className="container mx-auto relative z-10">
                    <h2 className="text-4xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-[#eaff00] text-center uppercase drop-shadow-md">
                        <span className="banner-text inline-block">Championing</span> <br />
                        <span className="banner-text inline-block">Original</span> <br />
                        <span className="banner-text inline-block text-white">Artists</span>
                    </h2>
                </div>
            </section>

            {/* SECTION 3: ROSTER GRID + SEARCH */}
            <section className="pb-32 px-6 container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-white/10 pb-8 gap-8">
                    <h3 className="text-3xl font-black font-heading tracking-tighter uppercase">Full Roster ({filteredArtists.length})</h3>

                    {/* Minimal Search */}
                    <div className="relative w-full max-w-md group">
                        <input
                            type="text"
                            placeholder="SEARCH ROSTER..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-neutral-900/50 border border-white/10 px-6 py-4 rounded-full text-white text-lg focus:outline-none focus:border-electric-blue transition-colors uppercase tracking-widest font-bold placeholder:text-neutral-600"
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500 group-hover:text-white transition-colors" size={20} />
                    </div>
                </div>

                {/* Grid */}
                {filteredArtists.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredArtists.map((artist) => (
                            <div key={artist.slug} className="artist-item opacity-0 translate-y-12">
                                <ArtistCard
                                    name={artist.name}
                                    image={artist.image}
                                    slug={artist.slug}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-neutral-500 uppercase tracking-widest">
                        No artists found matching "{searchTerm}"
                    </div>
                )}
            </section>
        </main>
    );
}
