"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 border-t border-neutral-800 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-heading font-bold tracking-tighter text-white">
                            ANTIGRAVITY<span className="text-electric-blue">.</span>
                        </h2>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Shaping the culture of tomorrow through sound, vision, and technology.
                            Based in Los Angeles, London, and Tokyo.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                            <SocialIcon icon={<Twitter size={20} />} href="#" />
                            <SocialIcon icon={<Youtube size={20} />} href="#" />
                            <SocialIcon icon={<Linkedin size={20} />} href="#" />
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Company</h3>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/about" className="hover:text-electric-blue transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-electric-blue transition-colors">Careers</Link></li>
                            <li><Link href="/press" className="hover:text-electric-blue transition-colors">Press Room</Link></li>
                            <li><Link href="/impact" className="hover:text-electric-blue transition-colors">Global Impact</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Community</h3>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/artists" className="hover:text-electric-blue transition-colors">Our Artists</Link></li>
                            <li><Link href="/labels" className="hover:text-electric-blue transition-colors">Labels & Brands</Link></li>
                            <li><Link href="/news" className="hover:text-electric-blue transition-colors">News</Link></li>
                            <li><Link href="/newsletter" className="hover:text-electric-blue transition-colors">Newsletter</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Stay Connected</h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Join the inner circle. Get the latest releases and tour dates directly to your inbox.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-neutral-800 text-white px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-electric-blue"
                            />
                            <button className="bg-electric-blue text-white px-6 py-3 font-bold hover:bg-blue-600 transition-colors uppercase text-sm">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
                    <p>© 2026 Antigravity Records. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Choices</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white hover:bg-electric-blue hover:text-white transition-all duration-300"
        >
            {icon}
        </a>
    );
}
