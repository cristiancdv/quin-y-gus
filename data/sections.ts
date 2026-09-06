export const heroSectionContent = {
    ariaLabel: "Portada",
    eyebrow: "El Match Definitivo",
    instruction: "Desliza para unir a los novios",
    compatibility: "99% compatibilidad",
} as const;

export const countdownSectionContent = {
    ariaLabel: "Cuenta regresiva",
    eyebrow: "Cuenta regresiva",
    titleLine1: "La cuenta regresiva",
    titleLine2: "para el match",
    description: 'El algoritmo está calculando el tiempo exacto hasta que digamos "sí". Faltan:',
    units: {
        days: "Días",
        hours: "Horas",
        minutes: "Min",
        seconds: "Seg",
    },
    completed: "¡Hoy es el gran día!",
} as const;

export const storySectionContent = {
    ariaLabel: "Nuestra historia",
    eyebrow: "Nuestra historia",
    titleLine1: "El algoritmo del",
    titleLine2: "amor verdadero",
} as const;

export const gallerySectionContent = {
    ariaLabel: "Galería",
    eyebrow: "Galería",
    titleLine1: "Desliza nuestros",
    titleLine2: "mejores momentos",
    instruction: "← Desliza horizontalmente →",
    liveLabel: "Mostrando foto",
    totalPhotos: "fotos en la galería",
    previous: "Foto anterior",
    next: "Siguiente foto",
} as const;

export const accessibilityContent = {
    desktopAvailability: "Disponibilidad de la aplicación",
    eventQr: "Código QR del evento",
} as const;

export const photoWallSectionContent = {
    ariaLabel: "Muro de fotos",
    eyebrow: "Tu foto con los novios",
    description: "Sube la foto que te tomaste con {first} & {second} y forma parte de nuestro muro de recuerdos.",
    icon: "camera",
    upload: "Subir fotos",
    uploading: "Subiendo...",
    success: "¡Gracias por compartir tu foto!",
    selectPhoto: "Seleccionar foto",
} as const;

export const eventDetailsSectionContent = {
    ariaLabel: "Detalles del evento",
    eyebrow: "Detalles del evento",
    titleLine1: "Información del",
    titleLine2: "encuentro",
    celebrationLabel: "Celebración",
    dressCodeLabel: "Dress code",
    giftsLabel: "Regalos",
    reception: "Recepción",
    punctuality: "Puntualidad = match garantizado",
    datePrefix: "Sábado",
    directions: "Cómo llegar",
    banking: "Ver datos bancarios",
    alias: "Alias",
    cvu: "CVU",
    copy: "Copiar",
    copied: "Copiado",
    icons: {
        celebration: "glasses",
        dressCode: "dress-code",
        gifts: "gifts",
        directions: "navigation",
    },
} as const;

export const rsvpSectionContent = {
    ariaLabel: "Confirmación de asistencia",
    eyebrow: "Confirma tu match",
    titleLine1: "Desliza para",
    titleLine2: "confirmar",
    cardAriaLabel: "Tarjeta de confirmación de asistencia",
    cardTitle: "¿Confirmas tu asistencia?",
    cardInstruction: "Desliza el corazón hacia la derecha",
    noLabel: "No podré asistir",
    yesLabel: "Sí, voy a asistir",
    attendingPrompt: "¡Es un match! Contanos más",
    decliningPrompt: "Antes de irte, contanos quién sos",
    fullName: "Nombre completo",
    guestCount: "Cantidad de personas (incluite vos)",
    dietaryNotes: "Restricciones alimenticias (opcional)",
    message: "Mensaje para los novios (opcional)",
    confirm: "Confirmar mi match",
    send: "Enviar respuesta",
    sending: "Enviando...",
    back: "Volver",
    attendingSuccess: "¡Es un match!",
    decliningSuccess: "Gracias por avisarnos",
    attendingDescription: "Confirmamos tu asistencia. Nos vemos en la pista de baile.",
    decliningDescription: "Lamentamos que no puedas acompañarnos, ¡gracias por contarnos!",
    icons: {
        heart: "heart",
        no: "x",
        attendingSuccess: "party-popper",
    },
} as const;

export const musicSectionContent = {
    ariaLabel: "Música",
    icon: "mirrorball",
    eyebrow: "Música",
    titleLine1: "Ayudanos a armar",
    titleLine2: "la playlist perfecta",
    description: "Ayudanos a armar la playlist perfecta para la fiesta.",
    invitation: "¡Agregá tus canciones favoritas!",
    addSongs: "Agregar canciones",
    playlistTitle: "Playlist de música para la fiesta",
} as const;

export const footerContent = {
    image: "/images/Brindis2.png",
    imageAlt: "Brindis de Valentina y Sebastián",
    description: "El match que cambió todo. ¡Nos vemos ahí!",
    closing: "El match que cambió todo. Gracias por ser parte de nuestra historia.",
    saveDate: "Guardar fecha en Google Calendar",
    calendarIcon: "calendar-plus",
    heartIcon: "heart",
    seeYou: "¡TE ESPERAMOS!",
} as const;

export const musicToggleContent = {
    audioSrc: "/audio/song.mp3",
    playLabel: "Reproducir música de fondo",
    pauseLabel: "Pausar música de fondo",
    playIcon: "volume-2",
    pauseIcon: "volume-x",
} as const;

export const scrollProgressContent = {
    ariaLabel: "Progreso de lectura de la invitación",
} as const;
