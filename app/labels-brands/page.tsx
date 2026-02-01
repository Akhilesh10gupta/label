"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

const brandList = [
  {
    name: "Nebula Sound",
    year: "EST. 2021",
    image: "/images/brand-nebula.png",
    desc: "Atmospheric Ambient",
    id: "01"
  },
  {
    name: "Void Walker",
    year: "EST. 2019",
    image: "/images/brand-void.png",
    desc: "Industrial Techno",
    id: "02"
  },
  {
    name: "Chromatic",
    year: "EST. 2023",
    image: "/images/brand-chromatic.png",
    desc: "Experimental Pop",
    id: "03"
  },
  {
    name: "Echo Chamber",
    year: "EST. 2020",
    image: "/images/brand-nebula.png",
    desc: "Lo-Fi Beats",
    id: "04"
  },
  {
    name: "Vortex Records",
    year: "EST. 2018",
    image: "/images/brand-void.png",
    desc: "Neurofunk D&B",
    id: "05"
  },
  {
    name: "Astral Plane",
    year: "EST. 2022",
    image: "/images/brand-chromatic.png",
    desc: "Psychedelic Rock",
    id: "06"
  },
];

export default function LabelsAndBrands() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for ScrollTrigger sections
  const manifestRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // 1. Hero Animation (Simple Fade In)
      gsap.from(".hero-char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
      });

      // 2. Manifesto Section - Pinned Reveal
      // Words fade in one by one as user scrolls
      const manifestoTl = gsap.timeline({
        scrollTrigger: {
          trigger: manifestRef.current,
          start: "top top",
          end: "+=200%", // 200% viewport height duration
          pin: true,
          scrub: 1,
        }
      });

      manifestoTl
        .fromTo(".manif-word-1", { opacity: 0.1, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(".manif-word-2", { opacity: 0.1, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(".manif-word-3", { opacity: 0.1, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 });


      // 3. Horizontal Scroll Section - The Roster
      const mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll
      mm.add("(min-width: 768px)", () => {

        const scrollContainer = horizontalRef.current;
        if (!scrollContainer) return;

        // Calculate the total scrollable width (total width - viewport width)
        const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

        gsap.to(scrollContainer, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: rosterRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (scrollContainer.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          }
        });
      });

      // Mobile: Vertical Fade Up
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray(".roster-card");

        cards.forEach((card: any) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // Start animation when card top hits 80% viewport height
              toggleActions: "play none none reverse"
            }
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={containerRef} className="bg-void-black text-white selection:bg-neon-purple selection:text-white overflow-x-hidden">

        {/* 1. Hero Section */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-electric-blue/20 rounded-full blur-[100px] animate-pulse" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-[10vw] leading-[0.8] font-black font-heading tracking-tighter mix-blend-difference mb-8">
              <span className="hero-char inline-block">THE</span> <span className="hero-char inline-block text-transparent stroke-text">ROSTER</span>
            </h1>
            <p className="max-w-lg mx-auto text-neutral-400 text-lg hero-char">
              Navigating the frequency spectrum. Discover the sounds that define our universe.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
          </div>
        </section>

        {/* 2. Manifesto Section - Pinned Text Reveal */}
        <section ref={manifestRef} className="h-screen flex items-center justify-center bg-void-black relative z-10">
          <div className="container mx-auto px-6 text-center">
            <div className="text-6xl md:text-9xl font-black font-heading uppercase tracking-tighter leading-none flex flex-col items-center gap-4">
              <span className="manif-word-1 text-white">We</span>
              <span className="manif-word-2 text-transparent stroke-text">Amplify</span>
              <span className="manif-word-3 text-electric-blue">Culture</span>
            </div>
          </div>
          {/* Background Texture */}
          <div className="absolute inset-0 z-[1] opacity-10 bg-[url('/images/noise.png')] pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-white/10 hidden md:block" />
          <div className="absolute top-0 bottom-0 right-10 w-[1px] bg-white/10 hidden md:block" />
        </section>

        {/* 3. Horizontal Scroll Roster */}
        <section ref={rosterRef} className="h-auto md:h-screen bg-neutral-900 overflow-hidden relative flex flex-col justify-center">

          <div className="md:hidden pt-24 pb-12 px-6">
            <h2 className="text-4xl font-bold mb-8">All Labels</h2>
            <p className="text-neutral-500 text-sm mb-12">Scroll down to view</p>
          </div>

          {/* Horizontal Container (Flex Row) */}
          {/* Using w-max to let content define width instead of hardcoded percentage */}
          <div ref={horizontalRef} className="flex flex-col md:flex-row md:items-center h-full w-full md:w-max px-6 md:px-0">

            {/* Intro Card for Horizontal Scroll (Desktop) */}
            <div className="hidden md:flex h-screen w-screen items-center justify-center shrink-0 border-r border-white/5 bg-void-black z-10 relative">
              <div className="text-center">
                <span className="block text-electric-blue text-sm font-bold tracking-[0.5em] mb-4">DRAG &gt;&gt;&gt;</span>
                <h2 className="text-8xl font-black font-heading uppercase">The<br />Collection</h2>
              </div>
            </div>

            {/* Brand Cards */}
            {brandList.map((brand, index) => (
              <div key={index} className="roster-card w-full md:w-screen h-[80vh] md:h-screen flex items-center justify-center shrink-0 relative p-6 md:p-24 border-r border-white/5 bg-void-black">

                <div className="relative w-full max-w-5xl h-full flex flex-col md:flex-row gap-12 items-center justify-center">

                  {/* Interactive Image Region */}
                  <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/5] group cursor-none overflow-hidden rounded-2xl">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    {/* Custom Cursor Text (Visual Only) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-difference">
                      <span className="text-white font-bold tracking-widest uppercase border border-white px-6 py-2 rounded-full">Open Label</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/2 flex flex-col md:items-start text-center md:text-left">
                    <span className="text-electric-blue font-mono text-sm mb-4">{brand.id} — {brand.year}</span>
                    <h3 className="text-5xl md:text-8xl font-black font-heading uppercase tracking-tighter mb-6 leading-[0.9]">
                      {brand.name}
                    </h3>
                    <p className="text-xl text-neutral-400 max-w-md mb-8">
                      {brand.desc}
                    </p>
                    <Link href="#" className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-electric-blue hover:border-electric-blue transition-colors">
                      <span className="uppercase tracking-widest text-sm font-bold">View Releases</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Background Number */}
                <div className="absolute bottom-0 right-0 text-[20vw] font-black text-white/5 leading-none select-none pointer-events-none">
                  {brand.id}
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* Footer Callout */}
        <section className="py-32 flex flex-col items-center justify-center text-center bg-gradient-to-t from-electric-blue/10 to-transparent">
          <p className="text-neutral-500 mb-6 uppercase tracking-widest text-sm">Think you have what it takes?</p>
          <h3 className="text-4xl md:text-6xl font-bold font-heading mb-10 max-w-3xl leading-tight">
            Join the <span className="text-electric-blue">next generation</span> of sound.
          </h3>
          <Link
            href="/contact"
            className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-electric-blue hover:text-white hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Now
          </Link>
        </section>
      </div>
    </>
  );
}
