import type { WeddingContent } from "@/types/wedding";

/**
 * Single source of truth for the wedding's content.
 *
 * This is placeholder content mirroring the reference design. Replace the
 * copy, date, venue and image paths with the real ones — every other
 * component reads from here, so this is the only file most content edits
 * should require.
 */
export const weddingContent: WeddingContent = {
  coupleNames: {
    first: "Valentina",
    second: "Sebastián",
  },
  profiles: {
    first: {
      name: "Valentina",
      photoSrc: "/images/profile-valentina.svg",
      photoAlt: "Valentina sonriendo en una calle empedrada",
    },
    second: {
      name: "Sebastián",
      photoSrc: "/images/profile-sebastian.svg",
      photoAlt: "Sebastián mirando el atardecer desde un balcón",
    },
  },
  weddingDate: "2027-04-10T17:00:00-06:00",
  weddingDateLabel: "10 · Abril · 2027",
  ceremonyTime: "17:00 hrs",
  receptionTime: "19:00 hrs",
  venue: {
    name: "Hacienda Las Encinas",
    addressLine: "Camino Real s/n, Valle de Bravo",
    cityLine: "Estado de México",
    mapsQuery: "Hacienda Las Encinas, Camino Real s/n, Valle de Bravo, Estado de México",
  },
  dressCode: {
    title: "Formal Elegante",
    description: "Esmoquin o traje oscuro para ellos, vestido largo para ellas.",
    paletteNote: "Paleta sugerida: crema, terracota, azul marino. ¡Sin blanco!",
  },
  giftRegistry: {
    intro: "Tu presencia es nuestro mayor regalo. Si deseas contribuir:",
    links: [
      { id: "liverpool", label: "Mesa de regalos Liverpool · 912345" },
      { id: "sobres", label: "Lluvia de sobres" },
    ],
  },
  timeline: [
    {
      id: "primer-match",
      year: "2019",
      icon: "coffee",
      title: "El primer match",
      description:
        "Un café derramado, una sonrisa nerviosa y una conversación que duró tres horas. Ese día supimos que era un sí.",
    },
    {
      id: "primer-destino",
      year: "2021",
      icon: "plane",
      title: "Primer destino",
      description:
        "Lisboa, sus calles de colores y un atardecer en el mirador de Santa Catarina. Ahí nació la costumbre de perdernos juntos.",
    },
    {
      id: "la-propuesta",
      year: "2025",
      icon: "sparkles",
      title: "La propuesta",
      description:
        "Bajo un cielo estrellado en la playa, con los pies en la arena, llegó la pregunta. Y por supuesto, fue un match definitivo.",
    },
  ],
  gallery: [
    {
      id: "primera-cita",
      src: "/images/gallery-1.svg",
      alt: "Valentina y Sebastián bailando en una azotea de noche",
      caption: "La primera cita",
    },
    {
      id: "noches-de-ciudad",
      src: "/images/gallery-2.svg",
      alt: "Valentina y Sebastián abrazados en un bar",
      caption: "Noches de ciudad",
    },
    {
      id: "el-si-eterno",
      src: "/images/gallery-3.svg",
      alt: "Manos entrelazadas mostrando los anillos",
      caption: "El sí eterno",
    },
  ],
};
