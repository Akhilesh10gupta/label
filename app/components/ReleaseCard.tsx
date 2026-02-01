"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ReleaseCardProps {
    title: string;
    artist: string;
    image: string;
    type: string; // Album, EP, Single
    year: string;
    slug: string;
}

export default function ReleaseCard({ title, artist, image, type, year, slug }: ReleaseCardProps) {
    return (
        <Link href={`/releases/${slug}`} className="group relative block w-full aspect-square bg-neutral-900 overflow-hidden">
            {/* Image Container */}
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-electric-blue flex items-center justify-center text-white"
                    >
                        <Play fill="white" size={24} className="ml-1" />
                    </motion.div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-void-black/80 backdrop-blur text-white text-xs font-bold uppercase px-3 py-1 tracking-widest border border-white/10">
                    {type}
                </div>
            </div>

            {/* Info (Below Image) */}
            <div className="mt-4 space-y-1">
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-electric-blue transition-colors truncate">
                    {title}
                </h3>
                <p className="text-silver text-sm font-medium uppercase tracking-wide">
                    {artist} • {year}
                </p>
            </div>
        </Link>
    );
}
