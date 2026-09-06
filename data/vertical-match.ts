import type { VerticalCarouselItem } from "@/types/wedding";

export const VERTICAL_CAROUSEL_REVEAL_START = 0.68;
export const VERTICAL_CAROUSEL_REVEAL_RANGE = 1 - VERTICAL_CAROUSEL_REVEAL_START;

export const leftProfileImages: VerticalCarouselItem[] = [
    { id: "left-1", src: "/images/profiles/img-carrousel-profile-left-1.webp", alt: "Perfil de la novia" },
    { id: "left-2", src: "/images/profiles/img-carrousel-profile-left-2.webp", alt: "Perfil de la novia" },
    { id: "left-3", src: "/images/profiles/img-carrousel-profile-left-3.webp", alt: "Perfil de la novia" },
];

export const rightProfileImages: VerticalCarouselItem[] = [
    { id: "right-1", src: "/images/profiles/img-carrousel-profile-rigth-1.webp", alt: "Perfil del novio" },
    { id: "right-2", src: "/images/profiles/img-carrousel-profile-rigth-2.webp", alt: "Perfil del novio" },
    { id: "right-3", src: "/images/profiles/img-carrousel-profile-rigth-3.webp", alt: "Perfil del novio" },
];
