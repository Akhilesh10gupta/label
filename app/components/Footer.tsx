"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
    return (
        <footer className="relative bg-void-black text-neutral-400 overflow-hidden pt-16 pb-8 border-t border-white/5">

            {/* Ambient Background - Subtle & Clean */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px]" />
                <div className="w-full h-full opacity-[0.03] bg-[url('/images/noise.png')]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Main Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">

                    {/* Brand Section (Col 1-5) */}
                    <div className="lg:col-span-5 flex flex-col items-start pr-12">
                        <Link href="/" className="mb-6 block">
                            <span className="text-3xl md:text-4xl font-black font-heading tracking-tighter text-white">
                                ANTIGRAVITY<span className="text-electric-blue">.</span>
                            </span>
                        </Link>
                        <p className="text-lg leading-relaxed mb-8 max-w-sm text-neutral-500">
                            Pioneering the future of sound and visual culture.
                            Los Angeles • London • Tokyo
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                            <SocialIcon icon={<Twitter size={20} />} href="#" />
                            <SocialIcon icon={<Youtube size={20} />} href="#" />
                            <SocialIcon icon={<Linkedin size={20} />} href="#" />
                        </div>
                    </div>

                    {/* Navigation Links (Col 6-7) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <FooterLink href="/about" label="About" />
                            <FooterLink href="/careers" label="Careers" />
                            <FooterLink href="/contact" label="Contact" />
                            <FooterLink href="/press" label="Press" />
                        </ul>
                    </div>

                    {/* Community Links (Col 8-9) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Community</h4>
                        <ul className="space-y-4 text-sm">
                            <FooterLink href="/artists" label="Artists" />
                            <FooterLink href="/releases" label="Releases" />
                            <FooterLink href="/events" label="Events" />
                            <FooterLink href="/labels-brands" label="Labels & Brands" />
                            <FooterLink href="/news" label="Journal" />
                        </ul>
                    </div>

                    {/* Newsletter (Col 10-12) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Newsletter</h4>
                        <p className="text-sm mb-6 text-neutral-500">
                            Subscribe for exclusive drops and updates.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-electric-blue transition-colors placeholder:text-neutral-700"
                            />
                            <button className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-3 rounded-lg hover:bg-electric-blue hover:text-white transition-colors duration-300">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Copyright */}
                    <p className="text-xs text-neutral-600 font-medium tracking-wide">
                        © 2026 ANTIGRAVITY RECORDS. ALL RIGHTS RESERVED.
                    </p>

                    {/* Legal Links */}
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-xs text-neutral-600 hover:text-white transition-colors uppercase tracking-wider font-bold">Privacy</Link>
                        <Link href="/terms" className="text-xs text-neutral-600 hover:text-white transition-colors uppercase tracking-wider font-bold">Terms</Link>
                        <Link href="/cookies" className="text-xs text-neutral-600 hover:text-white transition-colors uppercase tracking-wider font-bold">Cookies</Link>
                    </div>
                </div>

                {/* Massive Background Text (Placed very bottom, cleaner integration) */}


            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a href={href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue transition-all duration-300">
            {icon}
        </a>
    )
}

function FooterLink({ href, label }: { href: string, label: string }) {
    return (
        <li>
            <Link href={href} className="hover:text-white transition-colors block">
                {label}
            </Link>
        </li>
    )
}
