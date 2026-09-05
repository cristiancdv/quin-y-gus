"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface FilmItem {
    id: string;
    src: string;
    alt: string;
}

interface VerticalCarrouselProps {
    items: FilmItem[];
    invertDirection?: boolean;
    onProgress?: (progress: number) => void;
}



export function VerticalCarrousel({
    items,
    invertDirection = false,
    onProgress,
}: VerticalCarrouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Monitorear el scroll dentro de este contenedor específico
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Definir el rango de movimiento según la propiedad invertDirection
    // Si invertDirection es true, va de negativo a positivo (baja). Si es false, de positivo a negativo (sube).
    const trackHeight = `${items.length * 100}%`;
    const travel = `${((items.length - 1) / items.length) * 100}%`;
    const yRange = invertDirection ? [`-${travel}`, "0%"] : ["0%", `-${travel}`];

    const yTransform = useTransform(scrollYProgress, [0, 1], yRange);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        onProgress?.(latest);
    });

    return (
        <div
            ref={containerRef}
            className="relative h-[135vh] w-full sm:h-[150vh]"
        >
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
                <div className="relative h-[min(72vh,360px)] w-full overflow-hidden rounded-[1.75rem] shadow-xl shadow-black/10">
                    <motion.div
                        style={{ height: trackHeight, y: yTransform }}
                        className="flex w-full flex-col"
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                style={{ height: `${100 / items.length}%` }}
                                className="relative w-full shrink-0 overflow-hidden"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 45vw, 220px"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
