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
    first: "Gustavo",
    second: "Quintin",
  },
  profiles: {
    first: {
      name: "Gustavo",
      photoSrc: "/images/profile_Gustavo.png",
      photoAlt: "Gustavo sonriendo en Puerto Madero",
    },
    second: {
      name: "Quintin",
      photoSrc: "/images/profile_Quintin.png",
      photoAlt: "Quintin leyendo un libro",
    },
  },
  weddingDate: "2026-11-28T19:30:00-03:00",
  weddingDateLabel: "28 · Noviembre · 2026",
  ceremonyTime: "17:00 hrs",
  receptionTime: "19:30 hrs",
  notFoundCards: {
    icon: "brindis2",
    title: "¡Alguien se perdió de camino al altar! ",
    paragraph: 'No te preocupes, esto no es un "No, acepto".\n\n',
    paragraphSpan: " Te invitamos a abrir el enlace en tu celular para disfrutar de la experiencia completa.\n\n ¡Te esperamos!",
    qrUrl: process.env.NEXT_PUBLIC_EVENT_QR_URL ?? "",
  },
  venue: {
    name: "Casa Meraki - Eventos",
    addressLine: "Thames 1951, Ciudad Autónoma de Buenos Aires",
    cityLine: "Buenos Aires",
    mapsQuery: "Casa Meraki - Eventos, Thames 1951, Ciudad Autónoma de Buenos Aires",
  },
  dressCode: {
    title: "Elegante Sport",
    description: "Lucí tu mejor look.",
    paletteNote: "Paleta sugerida: lo que gustes. ¡Sin blanco preferiblemente!",
  },
  giftRegistry: {
    intro:
      "Tu presencia es muy importante para nosotros y nos alegra que nos acompañes en este momento. Si deseás hacernos un regalo, aquí te dejamos nuestros datos.",
    banking: {
      alias: "quinygus2026",
      cvu: "0070006130004107046074",
    },
  },
  timeline: [
    {
      id: "primer-match",
      year: "2016",
      icon: "coffee",
      title: "El primer match",
      description:
        "5 mil km de distancia desaparecieron con un café y una charla sobre una vida que aún no sabían que compartirían.",
    },
    {
      id: "match-venezolano",
      year: "2017",
      icon: "plane",
      title: "Match venezolano",
      description:
        "En Chile, la familia venezolana, con un buen pabellón criollo, se juntaron por primera vez con el novio argentino.",
    },
    {
      id: "match-argentino",
      year: "2018",
      icon: "userGroup",
      title: "Match argentino",
      description:
        "En Rosh Ashana, la familia argentina compartió niños envueltos por primera vez con el novio venezolano.",
    },
    {
      id: "match-oficial",
      year: "2019",
      icon: "scale",
      title: "Match oficial",
      description:
        "El primer sí en la Sede Comunal 5, con una sala tan llena de amigos que sorprendió hasta a la misma jueza.",
    },
    {
      id: "match-definitivo",
      year: "2024",
      icon: "parasol",
      title: "Match definitivo",
      description:
        "Frente al mar de Miramar, no hubo propuesta de matrimonio, hubo una decisión, un sí a un hermoso futuro que inició con un simple café 10 años atrás.",
    },
  ],
  gallery: [
    {
      id: "foto-1",
      src: "/images/gallery-1.jpg",
      alt: "Gustavo y Quintin en su viaje a Chile",
      caption: "",
    },
    {
      id: "foto-2",
      src: "/images/gallery-2.jpg",
      alt: "Gustavo y Quintin en su viaje a Iguazu",
      caption: "",
    },
    {
      id: "foto-3",
      src: "/images/gallery-3.jpg",
      alt: "Gustavo, Quintin y Nasio en el mueble de su casa",
      caption: "",
    },
    {
      id: "foto-4",
      src: "/images/gallery-4.jpg",
      alt: "Gustavo y Quintin comiendo mejicano",
      caption: "",
    },
    {
      id: "foto-5",
      src: "/images/gallery-5.jpg",
      alt: "Gustavo y Quintin en el parque",
      caption: "",
    },
    {
      id: "foto-6",
      src: "/images/gallery-6.jpeg",
      alt: "Gustavo, Quintin y Nasio en Miramar",
      caption: "",
    },
    {
      id: "foto-7",
      src: "/images/gallery-7.jpg",
      alt: "Gustavo y Quintin en su despedida de solteros",
      caption: "",
    },
    {
      id: "foto-8",
      src: "/images/gallery-8.jpg",
      alt: "Gustavo, Quintin y Nasio",
      caption: "",
    },
    {
      id: "foto-9",
      src: "/images/gallery-9.jpg",
      alt: "Gustavo y Quintin en traje",
      caption: "",
    },
    {
      id: "foto-10",
      src: "/images/gallery-10.jpg",
      alt: "Gustavo y Quintin en su unión civil",
      caption: "",
    },
  ],
};
