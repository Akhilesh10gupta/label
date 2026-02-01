"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewsProps {
    title: string;
    category: string;
    date: string;
    slug: string;
}

export default function NewsCard({ title, category, date, slug }: NewsProps) {
    return (
        <Link href={`/news/${slug}`} className="group block border-t border-neutral-800 py-8 hover:bg-neutral-900/50 transition-colors px-4 -mx-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                        <span className="text-electric-blue">{category}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-400">{date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-body font-medium text-white group-hover:text-electric-blue transition-colors max-w-2xl">
                        {title}
                    </h3>
                </div>

                <div className="md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="text-electric-blue" />
                </div>
            </div>
        </Link>
    );
}
