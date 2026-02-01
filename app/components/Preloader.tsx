"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
    onComplete: () => void;
    topColor?: string;
    bottomColor?: string;
    topTextColor?: string;
    bottomTextColor?: string;
    topText?: string[];
    bottomText?: string[];
}

export default function Preloader({
    onComplete,
    topColor = "#ff00cc", // Default Pink
    bottomColor = "#000000", // Default Black
    topTextColor = "#eaff00", // Default Yellow
    bottomTextColor = "#ffffff", // Default White
    topText = ["CHAMPIONING", "ORIGINAL"],
    bottomText = ["ARTISTS"]
}: PreloaderProps) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        console.log("Preloader Animation: TOP-RIGHT Entrance (Updated)");
        const ctx = gsap.context(() => {
            // Initial States
            gsap.set(".pink-panel", { x: "100%", y: "-100%", backgroundColor: topColor });
            gsap.set(".black-panel", { x: "-100%", y: "100%", backgroundColor: bottomColor });

            // Text and Containers start Rotated
            // Positive 15 deg creates a Top-Left to Bottom-Right diagonal (\)
            // This aligns with Pink being Top-Right (Above Right)
            gsap.set(".content-wrapper", { rotation: 15, scale: 1.2 });
            gsap.set(containerRef.current, { opacity: 1 }); // Reveal container after setup

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { display: "none" });
                    onComplete();
                }
            });

            // 1. Diagonal Entrance (Panels slide in to meet)
            tl.to([".pink-panel", ".black-panel"], {
                x: "0%",
                y: "0%",
                duration: 1.2,
                ease: "power4.out",
                stagger: 0
            })
                // 2. Rotate to Horizontal (The "Settling" effect)
                .to(".content-wrapper", {
                    rotation: 0,
                    scale: 1,
                    duration: 1.0,
                    ease: "expo.out"
                })
                // 3. Pause
                .to({}, { duration: 0.5 })
                // 4. Horizontal Split Exit (Top goes Left, Bottom goes Right)
                .to(".pink-panel", {
                    x: "-100%",
                    duration: 1,
                    ease: "power2.inOut"
                }, "exit")
                .to(".black-panel", {
                    x: "100%",
                    duration: 1,
                    ease: "power2.inOut"
                }, "exit");

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete, topColor, bottomColor]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden font-heading font-bold select-none flex items-center justify-center bg-transparent opacity-0">

            {/* Rotating Wrapper to handle the diagonal -> straight transition */}
            {/* Use vmax to ensure it covers tall mobile screens when rotated */}
            <div className="content-wrapper w-[200vmax] h-[200vmax] flex flex-col relative flex-shrink-0 origin-center">

                {/* Top Half */}
                <div className="pink-panel flex-1 bg-[#ff00cc] flex items-end justify-center z-20 relative w-full overflow-hidden">
                    <div className="w-full flex justify-center absolute bottom-0 pb-4 md:pb-6">
                        <div className="text-center">
                            {/* Fluid text size for mobile compatibility */}
                            <div className="text-[8vmin] md:text-8xl lg:text-9xl leading-[0.85] uppercase tracking-tighter whitespace-nowrap" style={{ color: topTextColor }}>
                                {topText.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Half */}
                <div className="black-panel flex-1 bg-void-black flex items-start justify-center z-20 relative w-full overflow-hidden">
                    <div className="w-full flex justify-center absolute top-0 pt-4 md:pt-6">
                        <div className="text-center">
                            <div className="text-[8vmin] md:text-8xl lg:text-9xl leading-[0.85] uppercase tracking-tighter whitespace-nowrap" style={{ color: bottomTextColor }}>
                                {bottomText.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
