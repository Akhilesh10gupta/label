"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Artists", href: "/artists" },
        { name: "Releases", href: "/releases" },
        { name: "News", href: "/news" },
        { name: "About", href: "/about" },
    ];

    // Sample searchable data
    const searchableData = {
        artists: [
            { name: "Neon Genesis", slug: "neon-genesis", type: "Artist" },
            { name: "Velvet Echo", slug: "velvet-echo", type: "Artist" },
            { name: "Cyber Saint", slug: "cyber-saint", type: "Artist" },
            { name: "The Void", slug: "the-void", type: "Artist" },
        ],
        releases: [
            { name: "Neon Mist - Void", slug: "neon-mist-void", type: "Release" },
            { name: "Velvet Echo - Live", slug: "velvet-echo-live", type: "Release" },
        ],
        news: [
            { name: "Antigravity Signs Neon Genesis", slug: "sign-neon-genesis", type: "News" },
            { name: "Void Tour 2026 Announced", slug: "void-tour-2026", type: "News" },
        ]
    };

    // Filter search results
    const searchResults = searchQuery.trim() === "" ? [] : [
        ...searchableData.artists,
        ...searchableData.releases,
        ...searchableData.news
    ].filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-void-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center relative z-20">
                {/* Logo */}
                <Link href="/" className="text-2xl font-heading font-bold tracking-tighter text-white">
                    ANTIGRAVITY<span className="text-electric-blue">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-silver hover:text-white transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        className="p-2 text-white hover:text-electric-blue transition-colors"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* Mobile Search & Menu Buttons */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        className="text-white p-2"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Search size={20} />
                    </button>
                    <button
                        className="text-white z-[70] relative p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={28} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={28} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Slide-Down Search Panel */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 w-full bg-void-black/95 backdrop-blur-xl border-b border-white/10 z-10"
                    >
                        {/* Search Input */}
                        <div className="container mx-auto px-6 py-6 flex items-center gap-4 border-b border-white/5">
                            <Search className="text-neutral-500" size={24} />
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search artists, releases, news..."
                                className="flex-1 bg-transparent text-2xl font-medium text-white placeholder:text-neutral-600 focus:outline-none"
                            />
                            <button
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery("");
                                }}
                                className="text-neutral-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Search Results */}
                        {searchQuery.trim() !== "" && (
                            <div className="container mx-auto px-6 py-6 max-h-[400px] overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {searchResults.map((result, idx) => (
                                            <Link
                                                key={idx}
                                                href={`/${result.type.toLowerCase()}s/${result.slug}`}
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery("");
                                                }}
                                                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-white group-hover:text-electric-blue transition-colors">
                                                        {result.name}
                                                    </span>
                                                    <span className="text-sm text-neutral-500 uppercase tracking-wider">
                                                        {result.type}
                                                    </span>
                                                </div>
                                                <Search className="text-neutral-600 group-hover:text-electric-blue transition-colors" size={20} />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <p className="text-neutral-500 text-lg font-medium">
                                            No results found for "<span className="text-white">{searchQuery}</span>"
                                        </p>
                                        <p className="text-neutral-600 text-sm mt-2">
                                            Try searching for artists, releases, or news
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-void-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden overflow-hidden z-40"
                    >
                        {/* Close Button Inside Menu */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-white hover:text-electric-blue transition-colors p-2"
                        >
                            <X size={32} strokeWidth={2} />
                        </button>

                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-heading font-bold text-white hover:text-electric-blue transition-colors tracking-tighter"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
