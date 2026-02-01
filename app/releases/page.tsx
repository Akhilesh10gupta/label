"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ReleaseCard from "../components/ReleaseCard";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import Preloader from "../components/Preloader";
import Image from "next/image";

const RELEASES = [
    {
        title: "Echoes of the Void",
        artist: "Neon Genesis",
        image: "/images/album-neon-void.png",
        type: "Album",
        year: "2025",
        slug: "echoes-void",
        description: "A sonic journey through the empty spaces of the digital age."
    },
    {
        title: "Raw Emotion (Live)",
        artist: "Velvet Echo",
        image: "/images/album-velvet-live.png",
        type: "Live Album",
        year: "2024",
        slug: "raw-emotion",
        description: "Unfiltered, unplugged, and undeniable energy recorded live."
    },
    {
        title: "Protocol Omega",
        artist: "Cyber Saint",
        image: "/images/album-cyber-protocol.png",
        type: "EP",
        year: "2025",
        slug: "protocol-omega",
        description: "Hard-hitting synthwave beats for the modern hacker."
    },
    {
        title: "Midnight City",
        artist: "Neon Genesis",
        image: "/images/artist-neon.png",
        type: "Single",
        year: "2024",
        slug: "midnight-city",
        description: "The anthem of the night. Driving rhythms and soaring synths."
    },
    {
        title: "Static Noise",
        artist: "The Void",
        image: "/images/artist-void.png",
        type: "Single",
        year: "2024",
        slug: "static-noise",
        description: "Experimental textures meeting pop sensibilities."
    },
    {
        title: "Lunar Tides",
        artist: "Luna Tide",
        image: "/images/hero-artist.png",
        type: "Album",
        year: "2023",
        slug: "lunar-tides",
        description: "Dreamy soundscapes that pull you in like the ocean."
    }
];

const FILTERS = ["All", "Album", "EP", "Single"];

export default function ReleasesPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    const filteredReleases = activeFilter === "All"
        ? RELEASES
        : RELEASES.filter(r => r.type.includes(activeFilter));

    useEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            // Marquee Animation
            gsap.to(".marquee-text", {
                xPercent: -50,
                duration: 20,
                ease: "none",
                repeat: -1
            });

            // Hero Image Reveal
            gsap.from(".hero-image", {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            });

        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    // Framer Motion Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-void-black text-white selection:bg-white selection:text-black overflow-hidden">
            <AnimatePresence mode="wait">
                {loading && (
                    <Preloader
                        onComplete={() => setLoading(false)}
                        topColor="#ffffff" // White
                        bottomColor="#000000" // Black
                        topTextColor="#000000" // Black Text
                        bottomTextColor="#ffffff" // White Text
                        topText={["FRESH", "SOUNDS"]}
                        bottomText={["INBOUND"]}
                    />
                )}
            </AnimatePresence>

            <Navbar />

            {!loading && (
                <>
                    {/* Spotlight Hero Section */}
                    {/* Changed h-screen to min-h-screen and added padding for mobile safety */}
                    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 md:py-0">

                        {/* Background Marquee (Kinetic Typography) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                            <div className="marquee-text whitespace-nowrap text-[30vw] font-black leading-none font-heading text-white">
                                LATEST DROPS LATEST DROPS LATEST DROPS LATEST DROPS
                            </div>
                        </div>

                        {/* Spotlight Content */}
                        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-24">

                            {/* Hero Image */}
                            <div className="hero-image relative w-full sm:w-3/4 md:w-1/2 aspect-square max-w-lg group">
                                <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="relative w-full h-full rounded-none overflow-hidden border border-white/10 shadow-2xl shadow-void-black">
                                    <Image
                                        src={RELEASES[0].image}
                                        alt={RELEASES[0].title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Vinyl Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                                <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] text-silver uppercase">
                                    Featured Release
                                </div>
                                {/* Responsive Text Sizing: text-5xl on mobile, 8xl on desktop */}
                                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-heading leading-[0.9] md:leading-[0.85] tracking-tighter uppercase relative">
                                    <span className="text-transparent stroke-text hover:text-white transition-colors duration-500">ECHOES</span><br />
                                    <span className="text-white">OF THE</span><br />
                                    <span className="text-transparent stroke-text hover:text-white transition-colors duration-500">VOID</span>
                                </h1>
                                <p className="text-silver text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                                    Neon Genesis returns with a masterpiece of digital melancholy. Experience the sound of the future, today.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                                    <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors text-sm md:text-base">
                                        Listen Now
                                    </button>
                                    <button className="px-6 py-3 md:px-8 md:py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-colors text-sm md:text-base">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Catalog Section */}
                    <section className="py-32 px-6 container mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-8">
                            <h2 className="text-4xl font-bold font-heading uppercase tracking-tighter">Full Catalog</h2>

                            {/* Minimal Filters */}
                            <div className="flex flex-wrap gap-2">
                                {FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${activeFilter === filter
                                            ? "text-white"
                                            : "text-neutral-500 hover:text-white"
                                            }`}
                                    >
                                        {filter}
                                        {activeFilter === filter && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* High-End Grid */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredReleases.map((release) => (
                                    <motion.div
                                        key={release.slug}
                                        layout
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="show"
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group cursor-pointer"
                                    >
                                        {/* Image Container */}
                                        <div className="aspect-square relative overflow-hidden bg-neutral-900 mb-6">
                                            <Image
                                                src={release.image}
                                                alt={release.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex justify-between items-start border-t border-white/20 pt-4 group-hover:border-white transition-colors duration-500">
                                            <div>
                                                <h3 className="text-2xl font-bold uppercase mb-1 leading-none">{release.title}</h3>
                                                <p className="text-neutral-500 text-sm font-mono mt-1">{release.artist}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded uppercase group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                                    {release.type}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </section>
                </>
            )}
        </main>
    );
}
