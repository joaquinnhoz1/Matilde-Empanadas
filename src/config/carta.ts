export type CartaItem = {
  name: string;
  desc: string;
  price: number;
  photo: string;
  popular?: boolean;
  veggie?: boolean;
};

export type CartaSection = {
  id: string;
  label: string;
  folder: string;
  items: CartaItem[];
};

export const carta: CartaSection[] = [
  {
    id: 'empanadas',
    label: 'Empanadas',
    folder: 'empanadas',
    items: [
      { name: 'Carne al Malbec', desc: 'Carne de ternera braseada, cebolla salteada y reducción de vino malbec.', price: 3600, photo: 'Carne al Malbec.jpg', popular: true },
      { name: 'Carne con Morrones Asados', desc: 'Carne de ternera braseada cortada en cubos con cebolla embebida en fondo de cocción y morrones asados.', price: 3600, photo: 'Carne Con Morrones Asados.jpg', popular: true },
      { name: 'Bondiola a la Cerveza Negra', desc: 'Bondiola de cerdo braseada, panceta y cebolla integradas en una reducción de cerveza negra y fondo de cocción.', price: 3600, photo: 'Bondiola a la Cerveza Negra.jpg', popular: true },
      { name: 'Pollo Verdeo y Roquefort', desc: 'Pollo deshebrado, salsa bechamel, queso azul y cebolla de verdeo.', price: 3600, photo: 'Pollo Verdeo y Roquefort.jpg', popular: true },
      { name: 'Jamón y Queso', desc: 'Mozzarella envuelta en jamón cocido y corazón de parmesano crocante.', price: 3600, photo: 'Jamon y Queso.jpg', popular: true },
      { name: 'Pollo Clásico', desc: 'Hebras de pollo, cubos de morrón, cebolla, zanahoria caramelizada y salsa bechamel.', price: 3600, photo: 'Pollo Clasico.jpg' },
      { name: 'Pollo Teriyaki', desc: 'Pollo deshebrado, salteado de zanahorias y zucchinis integrados con salsa teriyaki de la casa.', price: 3600, photo: 'Pollo Teriyaki.jpg' },
      { name: 'Mexicana', desc: 'Tiras de carne cortada a cuchillo con vegetales de fajitas mexicanas y un toque picante de la abuela Matilde.', price: 3600, photo: 'Mexicana.jpg' },
      { name: 'Brisketa', desc: 'Carne vacuna ahumada marinada con especias, zanahoria y cebolla caramelizada en salsa BBQ.', price: 3600, photo: 'Brisketa.jpg' },
      { name: 'Cheeseburga', desc: 'Carne smasheada, cheddar melt, cebolla caramelizada y panceta crocante.', price: 3600, photo: 'Cheeseburga.jpg' },
      { name: 'Berenjena Parmesana', desc: 'Tempura de berenjenas, mozzarella, ricota, parmesano, albahaca, tomate y ajo.', price: 3600, photo: 'Berenjena Parmesana.jpg', veggie: true },
      { name: 'Calabaza', desc: 'Cubos salteados de calabaza caramelizada, mozzarella y sofrito de vegetales.', price: 3600, photo: 'Calabaza.jpg', veggie: true },
      { name: 'Roquefort y Cebolla Caramelizada', desc: 'Cuna de muzzarella con corazón de queso azul y cebolla en juliana caramelizada.', price: 3600, photo: 'Roquefort y Cebolla Caramelizada.jpg', veggie: true },
      { name: 'Caprese', desc: 'Colchón de mozzarella, tomates secos hidratados y pesto de albahaca.', price: 3600, photo: 'Caprese.jpg', veggie: true },
      { name: 'Bomba Humita', desc: 'Muzzarella, choclo en grano, cebolla y morrones salteados, salsa bechamel.', price: 3600, photo: 'Bomba Humita.jpg', veggie: true },
      { name: 'Lasagna', desc: 'Espinaca, cebolla, salsa fileto, ricota y muzzarella. La lasagna italiana de Matilde para sus nietos vegetarianos.', price: 3600, photo: 'Lasagna.jpg', veggie: true },
    ],
  },
  {
    id: 'dips',
    label: 'Dips',
    folder: 'dips',
    items: [
      { name: 'BBX', desc: 'Salsa a base de barbacoa con sus clásicas notas dulces y un perfil ahumado intenso.', price: 1000, photo: 'BBX.jpg' },
      { name: 'FanTASTYca', desc: 'Salsa cremosa a base de mayonesa con un sutil ahumado, inspirada en un clásico de la cocina americana.', price: 1000, photo: 'FanTASTYca.jpg' },
      { name: 'Tomatuki', desc: 'Salsa a base de tomate, cebolla, ajo, un toque dulce y una leve nota picante.', price: 1000, photo: 'Tomatuki.jpg' },
      { name: 'Limoncito', desc: 'Gajitos de limón natural.', price: 1000, photo: 'Limoncito.jpg' },
      { name: 'Big Mat', desc: 'Salsa cremosa a base de mayonesa especiada con un toque ácido característico.', price: 1000, photo: 'Big Mat.jpg' },
    ],
  },
  {
    id: 'pizzas',
    label: 'Pizzas',
    folder: 'pizzas',
    items: [
      { name: 'Muzzarella', desc: 'Masa estilo pala napolitana, marinara de la casa, muzzarella y un toque de orégano.', price: 13900, photo: 'Pizza Muzzarella.jpg' },
      { name: 'Especial', desc: 'Masa pala napolitana, marinara de la casa, jamón en tiras, morrones asados, muzzarella y orégano.', price: 16500, photo: 'Pizza Especial.jpg' },
      { name: 'Capresse', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, ajo, tomate fresco y albahaca.', price: 16200, photo: 'Pizza Capresse.jpg' },
      { name: 'Fugazzeta con Roquefort', desc: 'Masa pala napolitana, cebolla pluma, muzzarella, queso roquefort y orégano.', price: 15800, photo: 'Pizza Fugazzeta con Roquefort.jpg' },
      { name: 'Pesto Parmesano', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, el pesto de la abuela Matilde con parmesano y nuez.', price: 16900, photo: 'Pizza Pesto Parmesano.jpg' },
      { name: 'Fungi', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, láminas de champiñones salteados al vino blanco y salsa bechamel.', price: 18200, photo: 'Pizza Fungi.jpg' },
      { name: 'Rúcula y Jamón Crudo', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, láminas de jamón crudo, albahaca fresca y un toque de oliva.', price: 17800, photo: 'Pizza Rucula y Jamon Crudo.jpg' },
      { name: 'Salchiprovo', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, salchicha parrillera a la chapa y provolone gratinado.', price: 18400, photo: 'Pizza Salchiprovo.jpg' },
      { name: 'Panceta y Verdeo', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, panceta en cubos y verdeo salteado.', price: 16900, photo: 'Pizza Panceta y Verdeo.jpg' },
      { name: 'Cuatro Quesos', desc: 'Masa pala napolitana, marinara de la casa, muzzarella, provolone, fontina y roquefort.', price: 17600, photo: 'Pizza Cuatro Quesos.jpg' },
    ],
  },
  {
    id: 'vinos',
    label: 'Vinitos',
    folder: 'vinos',
    items: [
      { name: 'Hormiga Negra', desc: '', price: 4900, photo: 'Hormiga Negra.jpg' },
      { name: 'Cuatro Monos Locos', desc: '', price: 5800, photo: 'Cuatro Monos Locos.jpg' },
      { name: 'Vincent', desc: 'Malbec', price: 6400, photo: 'Vincent.jpg' },
      { name: 'Cordero con Piel de Lobo', desc: 'Malbec', price: 7200, photo: 'Cordero con Piel de Lobo.jpg' },
      { name: 'Portillo Malbec', desc: '', price: 8800, photo: 'Portillo Malbec.jpg' },
      { name: 'Nicasia', desc: 'Red blend malbec', price: 12400, photo: 'Nicasia.jpg' },
      { name: 'Wapisa', desc: 'Pinot Noir', price: 13400, photo: 'Wapisa.jpg' },
    ],
  },
];
