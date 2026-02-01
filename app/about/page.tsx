"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Preloader from "../components/Preloader";
import Image from "next/image";

// Ensure plugin is registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TEAM = [
    { name: "Alex Chen", role: "Creative Director", image: "/images/hero-artist.png" },
    { name: "Sarah Vance", role: "Head of A&R", image: "/images/artist-velvet.png" },
    { name: "Marcus Thorne", role: "Chief Engineer", image: "/images/hero-studio-gear.png" },
];

const HISTORY = [
    { year: "2020", title: "Inception", description: "Antigravity Records founded in a basement in Berlin." },
    { year: "2022", title: "Global Reach", description: "Signed Neon Genesis, breaking 100M streams worldwide." },
    { year: "2024", title: "The New Era", description: "Launched the 'Void' protocol, redefining immersive audio." },
    { year: "2025", title: "Expansion", description: "Opened state-of-the-art studios in Tokyo and LA." },
];

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            // Hero Text Reveal
            gsap.from(".hero-char", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out",
                delay: 0.2
            });

            // Mission Section - Pinned Scroll Scrub
            // Ideally, we want the words to appear one by one as we SCROLL.
            const missionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".mission-section",
                    start: "top top", // Start when section hits top of viewport
                    end: "+=300%", // Scroll distance duration (3 screens worth)
                    pin: true,
                    scrub: 1, // Smooth interaction tied to scrollbar
                }
            });

            // Initial State handled in CSS/Markup (opacity 0 etc), animate to:
            missionTl
                .fromTo(".mission-word-1",
                    { opacity: 0, y: 50, filter: "blur(10px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }
                )
                .fromTo(".mission-word-2",
                    { opacity: 0, scale: 0.5 },
                    { opacity: 1, scale: 1, duration: 1 }
                )
                .fromTo(".mission-word-3",
                    { clipPath: "polygon(0 0, 0% 100%, 0% 100%, 0 0)", opacity: 0 },
                    { clipPath: "polygon(0 0, 0% 100%, 100% 100%, 100% 0)", opacity: 1, duration: 1 }
                );

            // Stats Counter Animation
            gsap.utils.toArray(".stat-item").forEach((el: any) => {
                const numElement = el.querySelector(".stat-number");
                const targetValue = parseInt(numElement.getAttribute("data-value"));

                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    onStart: () => {
                        let obj = { val: 0 };
                        gsap.to(obj, {
                            val: targetValue,
                            duration: 2,
                            ease: "power2.out",
                            onUpdate: () => {
                                numElement.innerText = Math.floor(obj.val) + (numElement.getAttribute("data-suffix") || "");
                            }
                        });
                    }
                });
            });

            // Timeline Vertical Line Draw
            gsap.from(".timeline-line", {
                scaleY: 0,
                transformOrigin: "top",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
                ease: "none"
            });

            // Timeline Beam Tracking
            gsap.fromTo(".timeline-beam",
                { top: "0%" },
                {
                    top: "100%",
                    scrollTrigger: {
                        trigger: ".timeline-container",
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                    ease: "none"
                }
            );

            // Timeline Items Fade In & 3D Tilt
            gsap.utils.toArray(".timeline-item").forEach((el: any) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 50,
                    rotationX: -15,
                    transformOrigin: "top center",
                    duration: 1,
                    ease: "power3.out"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <Preloader
                        onComplete={() => setLoading(false)}
                        topColor="#A1A1AA"
                        bottomColor="#000000"
                        topTextColor="#000000"
                        bottomTextColor="#A1A1AA"
                        topText={["OUR", "STORY"]}
                        bottomText={["ANTIGRAVITY"]}
                    />
                )}
            </AnimatePresence>

            <Navbar />

            <main ref={containerRef} className="bg-void-black text-white selection:bg-silver selection:text-black">
                {!loading && (
                    <>
                        {/* Hero Section */}
                        <section className="hero-section min-h-screen flex flex-col justify-center items-center px-6 container mx-auto text-center border-b border-white/10 relative z-10 pt-32 overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-white/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                            <h1 className="text-[11vmin] leading-[0.8] font-black font-heading tracking-tighter uppercase mb-12 mix-blend-difference">
                                <span className="hero-char inline-block">WE</span> <span className="hero-char inline-block text-silver">DEFINE</span><br />
                                <span className="hero-char inline-block">THE</span> <span className="hero-char inline-block">SOUND</span><br />
                                <span className="hero-char inline-block text-transparent stroke-text">OF</span> <span className="hero-char inline-block text-transparent stroke-text">TOMORROW</span>
                            </h1>
                            <p className="hero-subtitle text-xl md:text-2xl text-silver max-w-2xl mx-auto font-light leading-relaxed">
                                More than a label. We are a collective of visionaries pushing the boundaries of sonic possibility.
                            </p>
                        </section>

                        {/* Mission Section (Pinned & Scrubbed) */}
                        <section className="mission-section h-screen bg-void-black flex items-center justify-center relative overflow-hidden">
                            <div className="flex flex-col items-center justify-center gap-8">
                                <div className="mission-word-1 text-[10vmin] font-black uppercase tracking-tighter text-neutral-500 leading-none opacity-0">
                                    Innovate
                                </div>
                                <div className="mission-word-2 text-[12vmin] font-black uppercase tracking-tighter text-white leading-none opacity-0">
                                    Disrupt
                                </div>
                                <div className="mission-word-3 text-[12vmin] font-black uppercase tracking-tighter text-transparent stroke-text leading-none opacity-0">
                                    Amplify
                                </div>
                            </div>
                        </section>

                        {/* Stats Section */}
                        <section className="stats-section py-32 px-6 container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                                <div className="stat-item space-y-4">
                                    <div className="text-8xl font-black text-transparent stroke-text stat-number" data-value="25" data-suffix="+">0</div>
                                    <div className="text-sm font-bold uppercase tracking-[0.3em] text-white">Global Artists</div>
                                </div>
                                <div className="stat-item space-y-4">
                                    <div className="text-8xl font-black text-white stat-number" data-value="500" data-suffix="M+">0</div>
                                    <div className="text-sm font-bold uppercase tracking-[0.3em] text-silver border-t border-white/20 pt-4 w-1/2 mx-auto">Annual Streams</div>
                                </div>
                                <div className="stat-item space-y-4">
                                    <div className="text-8xl font-black text-transparent stroke-text stat-number" data-value="12" data-suffix="">0</div>
                                    <div className="text-sm font-bold uppercase tracking-[0.3em] text-white">Industry Awards</div>
                                </div>
                            </div>
                        </section>

                        {/* Timeline with Laser Beam */}
                        <section className="py-32 px-6 container mx-auto relative timeline-container">
                            <h2 className="text-4xl font-bold font-heading uppercase text-center mb-24">The Timeline</h2>

                            <div className="max-w-4xl mx-auto space-y-12 md:space-y-32 relative">
                                {/* Vertical Drawing Line with Gradient Pulse (Hidden on Mobile) */}
                                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-800 hidden md:block -translate-x-1/2">
                                    <div className="timeline-line absolute top-0 left-0 w-full bg-white opacity-20 h-full origin-top" />
                                    <div className="timeline-beam absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[100px] bg-gradient-to-b from-transparent via-white to-transparent blur-sm shadow-[0_0_15px_white]" />
                                </div>

                                {HISTORY.map((item, i) => (
                                    <div key={item.year} className={`timeline-item flex flex-col md:flex-row gap-8 md:gap-24 items-center relative z-10 group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Left Side Content (Desktop: Odd Items) */}
                                        <div className="flex-1 w-full md:text-right hidden md:block">
                                            {i % 2 !== 0 && (
                                                <TimelineCard item={item} align="right" />
                                            )}
                                        </div>

                                        {/* Central Node (Desktop Only) */}
                                        <div className="w-4 h-4 rounded-full bg-black border-2 border-neutral-700 z-10 hidden md:block group-hover:border-white group-hover:scale-150 group-hover:bg-white group-hover:shadow-[0_0_20px_white] transition-all duration-300" />

                                        {/* Right Side Content (Desktop: Even Items) */}
                                        <div className="flex-1 w-full md:text-left hidden md:block">
                                            {i % 2 === 0 && (
                                                <TimelineCard item={item} align="left" />
                                            )}
                                        </div>

                                        {/* Mobile Only View (Always shows for every item) */}
                                        <div className="md:hidden w-full">
                                            <TimelineCard item={item} align="left" isMobile={true} />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Team Section */}
                        <section className="team-section py-32 px-6 container mx-auto">
                            <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                                <h2 className="text-5xl font-bold font-heading uppercase tracking-tighter">Leadership</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {TEAM.map((member) => (
                                    <div key={member.name} className="team-card group cursor-pointer">
                                        <div className="aspect-[3/4] relative overflow-hidden bg-neutral-800 mb-6 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all duration-500">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                <p className="text-white font-mono text-sm">View Profile {'->'}</p>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold uppercase mb-1">{member.name}</h3>
                                        <p className="text-sm text-silver type-writer uppercase tracking-[0.2em]">{member.role}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </>
    );
}

// Helper Component to avoid code duplication
function TimelineCard({ item, align, isMobile = false }: { item: any, align: 'left' | 'right', isMobile?: boolean }) {
    return (
        <div className={`
            bg-neutral-900/50 backdrop-blur-md p-8 md:p-10 border border-white/5 rounded-3xl 
            group-hover:border-white/30 group-hover:bg-neutral-800/50 transition-all duration-500 
            relative overflow-hidden
            ${!isMobile ? 'group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : ''}
        `}>
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="text-6xl md:text-7xl font-black text-transparent stroke-text mb-4 group-hover:text-white transition-colors duration-500">
                {item.year}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase mb-3 text-white">
                {item.title}
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed group-hover:text-silver transition-colors">
                {item.description}
            </p>
        </div>
    );
}
