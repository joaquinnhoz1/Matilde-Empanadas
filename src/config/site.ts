/**
 * site.ts — ALL copy + business data for this landing.
 *
 * For a new client: this is the FIRST file you edit.
 * No other file in this project should hardcode copy or business data.
 *
 * Fields marked // TODO: must be confirmed/replaced with real data
 * before production launch.
 */

export type Branch = {
  id: string;
  /** Public display name, e.g. "La Plata" */
  name: string;
  /** Short subtitle shown under the name */
  subtitle: string;
  /** Modality tag — "DELIVERY" | "TAKE AWAY" | custom */
  modality: string;
  address: string;
  hours: string;
  /** Coverage area or extra modality detail */
  coverage: string;
  paymentMethods: string;
  /** WhatsApp number in international format, no symbols. E.g. 5492214000000 */
  whatsapp: string;
  /** Optional default message prefilled in wa.me link */
  whatsappMessage?: string;
  /** Color theme token used by this branch's card. */
  theme: 'primary' | 'secondary';
  /** Google Maps embed URL for mini-map */
  mapEmbedUrl: string;
  /** Google Maps share link for "Ver en Google Maps" button */
  mapsUrl?: string;
};

export type Pillar = { icon: string; title: string; text: string };
export type ProductBlock = {
  tag: string;
  title: string;
  description: string;
  ctaLabel: string;
  photoTone: 'food-bright' | 'wine' | 'dips' | 'cocina';
  highlight?: boolean;
};
export type WhyUsItem = { n: string; title: string; text: string };

export const site = {
  brand: {
    name: 'Matilde Empanadas',
    short: 'Matilde',
    tagline: 'Empanadas · al disco · vinito',
    foundedYear: 2021,
    instagram: '@matilde.empanadas',
    instagramUrl: 'https://instagram.com/matilde.empanadas',
    // TODO: confirmar email real
    email: 'hola@matildeempanadas.com',
  },

  nav: {
    links: [
      { label: 'Historia', href: '#historia' },
      { label: 'Productos', href: '#productos' },
      { label: 'Sucursales', href: '#sucursales' },
    ],
  },

  marquee: ['✦ AL DISCO', 'VINITO', '+DIPS'],

  hero: {
    kicker: 'DESDE 2021 · LA PLATA + CITYBELL',
    titleLines: ['EMPANADAS,'],
    titleScript: 'al disco,',
    titleHighlight: 'Y VINITO.',
    lead: 'Te recibimos a la mesa, no a un trámite. Hechas a mano, comidas con tiempo y con vino al lado.',
    ctaLabel: 'HACÉ TU PEDIDO. ELEGÍ SUCURSAL.',
    photoCaption: 'Empanada al disco, primer plano',
    stickerTop: 'RECETA',
    stickerBig: 'DE LA CASA',
    stickerYear: '·2021·',
    miniPhotoCaption: 'Vinito',
  },

  pillars: [
    { icon: '◉', title: 'AL DISCO', text: 'Cocción lenta' },
    { icon: '◆', title: 'VINOS & DIPS', text: 'Maridaje sugerido' },
    { icon: '✦', title: 'DE LA CASA', text: 'Receta propia' },
  ] as Pillar[],

  about: {
    kicker: 'QUIÉNES SOMOS',
    titleLines: ['Una idea simple,'],
    titleScript: 'una receta terca,',
    titleClose: 'y un disco prestado.',
    paragraphs: [
      'Matilde nació en 2021, en una cocina chica de La Plata. Empezamos con un disco prestado y una receta de masa hojaldrada que tardamos meses en afinar.',
      'Probamos. Tiramos. Volvimos a probar. Hasta que el repulgue salió fino, la masa dorada, y el relleno a cuchillo en serio.',
      'Hoy estamos en dos casas —La Plata casco y Citybell— y seguimos haciendo todo igual: a mano, sin atajos, y con vino al lado.',
    ],
    quote: '#NoTeLaCompliques',
    photoCaption: 'Manos amasando',
    stampPrimary: 'EST. 2021',
    stampSecondary: 'HECHO A MANO',
  },

  products: {
    kicker: 'NUESTRA CARTA',
    titleLines: ['Lo que sale'],
    titleScript: 'del disco.',
    feature: {
      tag: '01 / EMPANADAS',
      title: 'Diez sabores,\nuna sola masa.',
      description: 'Malbec, bondiola, teriyaki, cheeseburga, veggie y más. Dieciséis sabores, todos al disco.',
      ctaLabel: 'Ver carta completa →',
      photoTone: 'food-bright' as const,
    },
    secondary: [
      {
        tag: '02 / VINOS',
        title: 'Selección honesta.',
        description: 'Tintos, blancos, rosados. Probados antes.',
        ctaLabel: 'Pedí carta →',
        photoTone: 'wine' as const,
        accent: 'pink' as const,
      },
      {
        tag: '03 / DIPS',
        title: 'Salsas que avisan.',
        description: 'Criolla, chimi, mayo ahumada, picante.',
        ctaLabel: 'Sumá dips →',
        photoTone: 'dips' as const,
        accent: 'yellow' as const,
      },
    ],
    extras: {
      tag: 'BUENO SABER',
      items: [
        'Combos **docena + vino** con descuento',
        'Opciones **veggie** todos los días',
        'Consultá por **sin TACC**',
      ],
      ctaLabel: 'Consultar combos →',
    },
  },

  whyUs: {
    kicker: '— POR QUÉ MATILDE',
    titleLines: ['No somos una', 'casa de empanadas más.'],
    items: [
      { n: '01', title: 'AL DISCO, DE VERDAD', text: 'Cocción lenta sobre disco de arado. No es estética: es sabor.' },
      { n: '02', title: 'MARIDAJE INCLUIDO',   text: 'Te decimos qué vino y qué dip le va a cada una.' },
      { n: '03', title: 'MASA PROPIA',         text: 'Hojaldrada, fina, dorada. Probada, ajustada y vuelta a probar.' },
      { n: '04', title: 'PACKAGING QUE ABRAZA',text: 'Llega como si estuvieras sentado en lo de Matilde.' },
    ] as WhyUsItem[],
  },

  branches: {
    kicker: 'NUESTRAS CASAS',
    titleLines: ['Dos sucursales,'],
    titleScript: 'una misma mesa.',
    list: [
      {
        id: 'la-plata',
        name: 'La Plata',
        subtitle: 'Casco y alrededores',
        modality: 'DELIVERY',
        // TODO: confirmar dirección real
        address: 'La Plata, Buenos Aires',
        // TODO: confirmar horarios reales
        hours: 'Mar a Dom · 19:30 – 23:30',
        coverage: 'Casco urbano, Tolosa, City Bell centro',
        paymentMethods: 'Efectivo, transferencia, MP, débito',
        // TODO: número real con prefijo +549221XXXXXXX
        whatsapp: '5492214000000',
        whatsappMessage: '¡Hola Matilde! Quiero hacer un pedido en La Plata.',
        theme: 'primary',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.5882010452924!2d-57.9495903!3d-34.916782399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e70052ab03d9%3A0xa404a47c7da91b53!2sMatilde%2C%20Empanadas%20al%20Disco%20y%20Vinito!5e0!3m2!1ses!2sar!4v1779819448513!5m2!1ses!2sar',
        mapsUrl: 'https://maps.app.goo.gl/MnDiX1vDfccQyd81A?g_st=ic',
      },
      {
        id: 'citybell',
        name: 'Citybell',
        subtitle: 'Pasá a retirar',
        modality: 'TAKE AWAY',
        address: '467 1149 entre 17 y 19, City Bell, La Plata',
        // TODO: confirmar horarios reales
        hours: 'Mar a Dom · 19:00 – 23:00',
        coverage: 'Solo take away · hacés el pedido y pasás',
        paymentMethods: 'Efectivo, transferencia, MP, débito',
        // TODO: número real con prefijo +549221XXXXXXX
        whatsapp: '5492214000001',
        whatsappMessage: '¡Hola Matilde! Quiero hacer un pedido para retirar en Citybell.',
        theme: 'secondary',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Calle+1149+467+entre+17+y+19+City+Bell+La+Plata+Argentina&output=embed',
      },
    ] as Branch[],
  },

  ctaFinal: {
    titleLines: ['¿Qué hacés', 'que no pediste'],
    titleScript: 'todavía?',
  },

  footer: {
    tagline: 'EMPANADAS · AL DISCO · VINITO',
    line: 'Hecho con manteca, repulgue y poca vergüenza.',
    columns: [
      {
        title: 'Sucursales',
        items: ['La Plata · Delivery', 'Citybell · Take away'],
      },
      {
        title: 'Atención',
        items: ['Mar a Dom', '19:30 – 23:30 hs'],
        small: 'Solo por WhatsApp',
      },
      // The "Seguinos" column is composed from brand info in the Footer section.
    ],
    legal: '© 2026 Matilde Empanadas · La Plata + Citybell',
  },
};

export type Site = typeof site;
