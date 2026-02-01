"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [debris, setDebris] = useState<{ width: string, height: string, top: string, left: string, borderRadius: string }[]>([]);

    useEffect(() => {
        // Generate debris positions only on client side to avoid hydration mismatch
        setDebris([...Array(10)].map(() => ({
            width: Math.random() * 50 + 20 + "px",
            height: Math.random() * 50 + 20 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            borderRadius: Math.random() > 0.5 ? "50%" : "0"
        })));
    }, []);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !cursorRef.current) return;

        const ctx = gsap.context(() => {
            // Mouse Follower
            const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });

            const handleMouseMove = (e: MouseEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };

            window.addEventListener("mousemove", handleMouseMove);

            // Glitch Animation for 404 Text
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

            tl.to(textRef.current, {
                skewX: 10,
                duration: 0.1,
                ease: "power4.inOut"
            })
                .to(textRef.current, {
                    skewX: -10,
                    x: -5,
                    duration: 0.05,
                    color: "#00f0ff" // Electric Blue skew
                })
                .to(textRef.current, {
                    skewX: 0,
                    x: 0,
                    duration: 0.1,
                    color: "white"
                })
                .to(textRef.current, {
                    opacity: 0.5,
                    duration: 0.05,
                    yoyo: true,
                    repeat: 3
                })
                .to(textRef.current, {
                    opacity: 1,
                    duration: 0.1
                });

            // Floating Background Elements
            // Using a simple delay or ensure it runs after render. 
            // Since we don't depend on debris state here, we target class ".debris" which will be populated.
            gsap.to(".debris", {
                y: -100,
                rotation: 360,
                duration: "random(10, 20)",
                stagger: {
                    amount: 5,
                    from: "random"
                },
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, [debris]); // Re-run GSAP when debris is populated

    return (
        <main ref={containerRef} className="h-screen w-full bg-void-black relative overflow-hidden flex flex-col items-center justify-center text-white selection:bg-electric-blue selection:text-white cursor-none">

            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-electric-blue pointer-events-none mix-blend-difference z-50 -translate-x-1/2 -translate-y-1/2"
            />

            {/* Background Ambient Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="w-full h-full opacity-10 bg-[url('/images/noise.png')]" />
            </div>

            {/* Floating Debris */}
            {debris.map((style, i) => (
                <div
                    key={i}
                    className="debris absolute opacity-20 border border-white/10"
                    style={{
                        width: style.width,
                        height: style.height,
                        top: style.top,
                        left: style.left,
                        borderRadius: style.borderRadius
                    }}
                />
            ))}

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <div className="mb-8 relative inline-block">
                    <h1 ref={textRef} className="text-[15vw] md:text-[200px] font-black leading-none tracking-tighter mix-blend-overlay opacity-80">
                        404
                    </h1>
                    <div className="absolute inset-0 bg-electric-blue/20 blur-3xl rounded-full -z-10 animate-pulse" />
                </div>

                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mb-6">
                    Signal Lost
                </h2>

                <p className="text-neutral-400 max-w-md mx-auto mb-12 text-lg leading-relaxed">
                    The frequency you are looking for has not been discovered yet, or it has drifted into the void.
                </p>

                <Link
                    href="/"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-electric-blue hover:text-white transition-all duration-500 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Base
                    </span>
                    <div className="absolute inset-0 bg-void-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 opacity-10" />
                </Link>
            </div>

            {/* Bottom Tech Details */}
            <div className="absolute bottom-12 left-0 w-full text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 font-mono">
                    Error Code: NULL_REFERENCE // System: ANTIGRAVITY
                </p>
            </div>
        </main>
    );
}
