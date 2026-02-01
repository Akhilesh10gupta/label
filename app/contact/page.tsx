"use client";

import Navbar from "../components/Navbar";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Preloader from "../components/Preloader";

export default function Contact() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Mouse Follower (Spotlight)
            const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
            const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });

            window.addEventListener("mousemove", (e) => {
                xTo(e.clientX);
                yTo(e.clientY);

                // Tilt Effect for Form
                if (formRef.current) {
                    const rect = formRef.current.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;

                    const rotateX = ((mouseY - centerY) / (rect.height / 2)) * -2; // Max -2deg to 2deg
                    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 2;   // Max -2deg to 2deg

                    gsap.to(formRef.current, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });

            // Staggered Character Reveal for Header
            const chars = document.querySelectorAll(".char");

            tl.from(chars, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out"
            })
                .from(infoRef.current, {
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5")
                .from(formRef.current, {
                    x: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.8");

            // Floating Background Shapes
            gsap.to(".floating-shape", {
                y: "random(-20, 20)",
                x: "random(-20, 20)",
                rotation: "random(-15, 15)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    amount: 2,
                    from: "random"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    return (
        <>
            {loading && (
                <Preloader
                    onComplete={() => setLoading(false)}
                    topColor="#2563EB"
                    bottomColor="#050505"
                    topText={["GET IN", "TOUCH"]}
                    bottomText={["WITH US"]}
                    topTextColor="#ffffff"
                    bottomTextColor="#ffffff"
                />
            )}
            <Navbar />
            <main ref={containerRef} className="min-h-screen bg-void-black text-white selection:bg-electric-blue selection:text-white pt-32 pb-20 relative overflow-hidden perspective-1000">

                {/* Interactive Cursor Spotlight */}
                <div ref={cursorRef} className="fixed top-0 left-0 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 mix-blend-screen opacity-50 hidden md:block" />

                {/* Floating Geometric Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full floating-shape opacity-20" />
                <div className="absolute bottom-40 left-10 w-24 h-24 border border-electric-blue/10 rotate-45 floating-shape opacity-20" />
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 floating-shape opacity-5 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 perspective-1000 items-start">

                        {/* Left Column: Header + Contact Info */}
                        <div className="space-y-12">
                            {/* Header with Split Text */}
                            <div className="contact-header relative">
                                <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-[0.85] mb-6 overflow-hidden">
                                    <div className="flex flex-wrap">
                                        {"GET IN".split("").map((char, i) => (
                                            <span key={i} className={`char inline-block ${char === " " ? "mr-4" : ""}`}>{char}</span>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap text-transparent stroke-text">
                                        {"TOUCH".split("").map((char, i) => (
                                            <span key={i} className={`char inline-block ${char === " " ? "mr-4" : ""}`}>{char}</span>
                                        ))}
                                    </div>
                                </h1>
                                <p className="text-neutral-400 max-w-xl text-lg leading-relaxed mix-blend-plus-lighter">
                                    Whether you're an artist looking for representation, a brand seeking partnership,
                                    or just a fan with a question — we're listening.
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div ref={infoRef} className="space-y-12">
                                <div className="space-y-8">
                                    <ContactItem
                                        icon={<Mail size={24} />}
                                        label="General Inquiries"
                                        value="hello@antigravity.rec"
                                        href="mailto:hello@antigravity.rec"
                                    />
                                    <ContactItem
                                        icon={<Mail size={24} />}
                                        label="Demo Submissions"
                                        value="demos@antigravity.rec"
                                        href="mailto:demos@antigravity.rec"
                                    />
                                    <ContactItem
                                        icon={<Phone size={24} />}
                                        label="Press Office"
                                        value="+1 (323) 555-0192"
                                        href="tel:+13235550192"
                                    />
                                    <ContactItem
                                        icon={<MapPin size={24} />}
                                        label="Headquarters"
                                        value="808 Bassline Blvd, Los Angeles, CA 90028"
                                        href="#"
                                    />
                                </div>

                                <div className="pt-12 border-t border-white/10">
                                    <h3 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">Office Hours</h3>
                                    <div className="space-y-2 text-neutral-400 text-sm">
                                        <p className="flex justify-between max-w-xs">
                                            <span>Mon - Fri</span>
                                            <span className="text-white">9:00 AM - 6:00 PM PST</span>
                                        </p>
                                        <p className="flex justify-between max-w-xs">
                                            <span>Sat - Sun</span>
                                            <span className="text-white">Closed</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form with Tilt */}
                        <div
                            ref={formRef}
                            style={{ transformStyle: "preserve-3d" }}
                            className="bg-neutral-900/30 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-2xl relative group transform-gpu"
                        >
                            {/* Form Glow Effect on Hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-blue to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500 blur-xl pointer-events-none" />

                            <form className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label="First Name" placeholder="e.g. Neo" />
                                    <InputGroup label="Last Name" placeholder="Anderson" />
                                </div>

                                <InputGroup label="Email Address" type="email" placeholder="neo@matrix.com" />

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Subject</label>
                                    <div className="relative">
                                        <select className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors appearance-none relative z-10 bg-transparent">
                                            <option>General Inquiry</option>
                                            <option>Artist Booking</option>
                                            <option>Press Request</option>
                                            <option>Partnership Proposal</option>
                                            <option>Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-0 opacity-50">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us what's on your mind..."
                                        className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:outline-none focus:border-electric-blue transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-electric-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Send Message
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-electric-blue transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 -z-0" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
    return (
        <a href={href} className="flex items-start gap-6 group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-electric-blue group-hover:bg-electric-blue/10 transition-all duration-300">
                {icon}
            </div>
            <div>
                <h3 className="font-bold uppercase tracking-widest text-xs text-neutral-500 mb-1 group-hover:text-electric-blue transition-colors">{label}</h3>
                <p className="text-lg md:text-xl font-medium text-white group-hover:text-white transition-colors">{value}</p>
            </div>
        </a>
    );
}

function InputGroup({ label, type = "text", placeholder }: { label: string, type?: string, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-neutral-700 focus:outline-none focus:border-electric-blue transition-colors"
            />
        </div>
    );
}
