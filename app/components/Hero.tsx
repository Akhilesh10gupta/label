"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline for header reveal
            const tl = gsap.timeline();

            tl.from(".hero-text-line", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
            })
                .from(".hero-cta", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-void-black"
        >
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-void-black/60 z-10" /> {/* Overlay for text readability */}
                {/* Placeholder for video - in production this would be a real mp4 */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black animate-pulse" />
                {/* Text mentioning to user to replace this with <video autoPlay loop muted playsInline className="object-cover w-full h-full"> ... </video> */}
            </div>

            {/* Content Layer */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <h1
                    ref={textRef}
                    className="font-heading font-bold text-5xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none mb-8"
                >
                    <div className="overflow-hidden">
                        <span className="hero-text-line block">SHAPING THE</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-text-line block text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600">
                            CULTURE
                        </span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-text-line block">OF TOMORROW</span>
                    </div>
                </h1>

                <button className="hero-cta mt-8 px-8 py-4 bg-white text-void-black font-bold text-lg uppercase tracking-wider hover:bg-electric-blue hover:text-white transition-colors duration-300 rounded-full">
                    Discover Artists
                </button>
            </div>
        </div>
    );
}
