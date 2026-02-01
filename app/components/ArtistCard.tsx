"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ArtistProps {
    name: string;
    image: string; // Placeholder or absolute URL
    slug: string;
}

export default function ArtistCard({ name, image, slug }: ArtistProps) {
    return (
        <Link href={`/artists/${slug}`} className="group relative block w-full aspect-square overflow-hidden mb-8">
            <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
            </motion.div>

            {/* WMG Style: Bold Text Overlay centered or bottom */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 bg-gradient-to-t from-void-black/90 to-transparent">
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-tighter opacity-90 group-hover:opacity-100 transition-opacity">
                    {name}
                </h3>
                <div className="h-[2px] w-0 group-hover:w-24 bg-electric-blue mt-2 transition-all duration-500" />
            </div>
        </Link>
    );
}
