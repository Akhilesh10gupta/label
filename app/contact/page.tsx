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
    const formRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".contact-header", {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
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
            <main ref={containerRef} className="min-h-screen bg-void-black text-white selection:bg-electric-blue selection:text-white pt-32 pb-20 relative overflow-hidden">

                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="contact-header mb-20">
                        <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter uppercase leading-[0.85] mb-6">
                            Get In <br />
                            <span className="text-transparent stroke-text">Touch</span>
                        </h1>
                        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
                            Whether you're an artist looking for representation, a brand seeking partnership,
                            or just a fan with a question — we're listening.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

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

                        {/* Contact Form */}
                        <div ref={formRef} className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 p-8 md:p-10 rounded-2xl relative group">
                            {/* Form Glow Effect on Hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-blue to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur-lg pointer-events-none" />

                            <form className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label="First Name" placeholder="e.g. Neo" />
                                    <InputGroup label="Last Name" placeholder="Anderson" />
                                </div>

                                <InputGroup label="Email Address" type="email" placeholder="neo@matrix.com" />

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Subject</label>
                                    <select className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Artist Booking</option>
                                        <option>Press Request</option>
                                        <option>Partnership Proposal</option>
                                        <option>Other</option>
                                    </select>
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
                                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-electric-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                >
                                    Send Message
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
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
