"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Preloader from "../components/Preloader";
import { clsx } from "clsx";
import Image from "next/image";

// Extended Data with Images
const NEWS_ITEMS = [
    {
        title: "NEON GENESIS Signs Global Publishing Deal with Antigravity",
        category: "Signings",
        date: "OCT 24, 2025",
        slug: "neon-genesis-signing",
        summary: "The cyber-punk sensation joins our roster in a historic multi-album agreement.",
        image: "/images/artist-neon.png"
    },
    {
        title: "Quarterly Financial Results: Record Streaming Growth",
        category: "Corporate",
        date: "OCT 20, 2025",
        slug: "financial-results-q3",
        summary: "Antigravity reports a 40% increase in digital revenue across all platforms.",
        image: "/images/hero-studio-gear.png" // Placeholder: Generic Studio
    },
    {
        title: "VELVET ECHO Announces World Tour 'Midnight Sun'",
        category: "Press",
        date: "OCT 15, 2025",
        slug: "velvet-echo-tour",
        summary: "Dates confirmed for Europe, Asia, and the Americas starting late 2025.",
        image: "/images/hero-concert.png" // Placeholder: Concert
    },
    {
        title: "Antigravity Launches New AI-Powered Production Suite",
        category: "Tech",
        date: "OCT 10, 2025",
        slug: "tech-launch",
        summary: "Revolutionary tools for our artists to create immersive soundscapes.",
        image: "/images/album-cyber-protocol.png" // Placeholder: Tech Visual
    },
    {
        title: "THE VOID Drops Surprise Album 'Abyss'",
        category: "Press",
        date: "OCT 05, 2025",
        slug: "the-void-album",
        summary: "Critics are calling it 'a masterpiece of silence and noise'.",
        image: "/images/artist-void.png"
    },
    {
        title: "Executive Leadership Update: New Creative Director",
        category: "Corporate",
        date: "SEP 28, 2025",
        slug: "exec-update",
        summary: "Visionary designer Alex Chen takes the helm of visual identity.",
        image: "/images/hero-artist.png" // Placeholder: Portrait
    },
];

const FILTERS = ["All", "Press", "Signings", "Corporate", "Tech"];

export default function NewsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    const filteredNews = activeFilter === "All"
        ? NEWS_ITEMS
        : NEWS_ITEMS.filter(item => item.category === activeFilter);

    // Split for Layout: Featured (First Item) vs The Rest
    // Note: When filtering, the "Featured" item might change.
    const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
    const otherNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];

    useEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            gsap.from(".news-title-char", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out",
                delay: 0.2
            });
        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    return (
        <main ref={containerRef} className="min-h-screen bg-void-black text-white selection:bg-[#ccff00] selection:text-black">
            <AnimatePresence mode="wait">
                {loading && (
                    <Preloader
                        onComplete={() => setLoading(false)}
                        topColor="#ccff00" // Neon Green
                        bottomColor="#000000" // Black
                        topTextColor="#000000" // Black Text
                        bottomTextColor="#ccff00" // Neon Green Text
                        topText={["BREAKING", "NEWS"]}
                        bottomText={["UPDATE"]}
                    />
                )}
            </AnimatePresence>

            <Navbar />

            {!loading && (
                <>
                    {/* Header Section */}
                    <section className="pt-32 pb-12 px-6 container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/20 pb-8">
                            <h1 className="text-[12vmin] leading-[0.8] font-black font-heading tracking-tighter uppercase">
                                <span className="news-title-char inline-block text-transparent stroke-text hover:text-white transition-colors duration-300">GLOBAL</span><br />
                                <span className="news-title-char inline-block text-white">UPDATES</span>
                            </h1>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={clsx(
                                            "px-4 py-2 border border-white/20 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black",
                                            activeFilter === filter
                                                ? "bg-white text-black"
                                                : "bg-transparent text-silver"
                                        )}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Featured Article */}
                    <div className="min-h-[50vh] mb-20 px-6 container mx-auto">
                        <AnimatePresence mode="wait">
                            {featuredNews && (
                                <motion.div
                                    key={featuredNews.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="group relative w-full h-[60vh] md:h-auto md:aspect-[21/9] overflow-hidden bg-neutral-900"
                                >
                                    <Image
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
                                        <div className="inline-block px-3 py-1 bg-[#ccff00] text-black text-xs font-bold uppercase tracking-widest mb-4">
                                            Featured • {featuredNews.category}
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase leading-tight mb-4 group-hover:text-[#ccff00] transition-colors duration-300">
                                            {featuredNews.title}
                                        </h2>
                                        <p className="text-lg text-silver/90 max-w-xl">
                                            {featuredNews.summary}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* News Grid */}
                    <section className="px-6 container mx-auto pb-32">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                        >
                            <AnimatePresence mode="popLayout">
                                {otherNews.map((news) => (
                                    <motion.div
                                        layout
                                        key={news.slug}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group cursor-pointer flex flex-col h-full"
                                    >
                                        {/* Image */}
                                        <div className="aspect-video relative overflow-hidden bg-neutral-900 mb-6 border-b border-white/10">
                                            <Image
                                                src={news.image}
                                                alt={news.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-xs font-bold text-[#ccff00] uppercase tracking-widest">
                                                    {news.category}
                                                </span>
                                                <span className="text-xs text-neutral-500 font-mono">
                                                    {news.date}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold uppercase leading-tight mb-3 group-hover:underline decoration-[#ccff00] decoration-2 underline-offset-4">
                                                {news.title}
                                            </h3>
                                            <p className="text-neutral-400 text-sm line-clamp-2">
                                                {news.summary}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredNews.length === 0 && (
                            <div className="py-20 text-center text-silver uppercase tracking-widest">
                                No updates found.
                            </div>
                        )}
                    </section>
                </>
            )}
        </main>
    );
}
