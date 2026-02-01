"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
    {
        id: 1,
        title: "NEON MIST",
        subtitle: "NEW ALBUM OUT NOW",
        image: "/images/hero-artist.png", // Custom AI Asset
        cta: "Listen Now",
        color: "from-purple-900"
    },
    {
        id: 2,
        title: "WORLD TOUR 2026",
        subtitle: "THE VELVET ECHO EXPERIENCE",
        image: "/images/hero-concert.png", // Custom AI Asset
        cta: "Get Tickets",
        color: "from-blue-900"
    },
    {
        id: 3,
        title: "STUDIO LIFE",
        subtitle: "BEHIND THE SCENES",
        image: "/images/hero-studio.png", // Custom AI Asset
        cta: "Read Story",
        color: "from-red-900"
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate Slide Change
        const ctx = gsap.context(() => {
            console.log("GSAP Animation Triggered"); // Debug log

            // Image Fade & Zoom (More dramatic)
            gsap.fromTo(".hero-image",
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
            );

            // Text Reveal (More dramatic vertical move)
            gsap.fromTo(".hero-text-reveal",
                { y: 100, opacity: 0, filter: "blur(10px)" }, // Added blur for cinematic effect
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "back.out(1.7)" }
            );
        }, slideRef);

        return () => ctx.revert();
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    };

    const slide = SLIDES[currentSlide];

    return (
        <div ref={slideRef} className="relative w-full h-screen overflow-hidden bg-void-black text-white">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    key={slide.id}
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="hero-image object-cover opacity-60"
                    priority
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${slide.color} via-void-black/40 to-void-black/30 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-black/20" /> {/* General Darkener */}
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6">
                <div ref={textRef} className="max-w-4xl space-y-6">
                    <p className="hero-text-reveal text-electric-blue font-bold tracking-[0.2em] font-body uppercase text-sm md:text-base">
                        {slide.subtitle}
                    </p>
                    <h1 className="hero-text-reveal text-5xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight leading-none text-white drop-shadow-2xl">
                        {slide.title}
                    </h1>
                    <div className="hero-text-reveal pt-8">
                        <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-electric-blue hover:text-white transition-colors duration-300 rounded-full font-bold uppercase tracking-wide text-sm md:text-base">
                            <span>{slide.cta}</span>
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-between px-6 md:px-12 items-end">
                {/* Pagination Dots */}
                <div className="flex space-x-3">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1 transition-all duration-300 ${currentSlide === idx ? "w-12 bg-electric-blue" : "w-6 bg-white/30 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex space-x-4">
                    <button
                        onClick={prevSlide}
                        className="p-3 md:p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 md:p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
