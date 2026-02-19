import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import bordeauxImg from "@/assets/bordeaux-glass.jpg";
import champagneImg from "@/assets/champagne-flute.jpg";
import whiskeyImg from "@/assets/whiskey-tumbler.jpg";
import highballImg from "@/assets/highball-glass.jpg";
import pilsnerImg from "@/assets/pilsner-glass.jpg";
import beerGobletImg from "@/assets/beer-goblet.jpg";
import cappuccinoImg from "@/assets/cappuccino-cup.jpg";
import espressoImg from "@/assets/espresso-cup.jpg";
import latteImg from "@/assets/latte-glass.jpg";
import cakeDomeImg from "@/assets/cake-dome.jpg";
import gastronormImg from "@/assets/gastronorm.jpg";
import buffetRiserImg from "@/assets/buffet-riser.jpg";
import fryPanImg from "@/assets/fry-pan.jpg";

// Placeholder images for Glasses section (replace with real assets per glass when available)
const GLASS_EMPTY_PLACEHOLDER = "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80";
const GLASS_FILLED_PLACEHOLDER = "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&q=80";

// Malta glass: real images and modal content (Serie Malta – from PDF)
const MALTA_IMAGES = {
  empty: "/glasses/malta/v0277-malta.png",
  filled: "/glasses/malta/ambiente-malta-2.png",
  gallery: [
    { src: "/glasses/malta/v0273-malta.png", label: "V0273 Malta" },
    { src: "/glasses/malta/v0277-malta.png", label: "V0277 Malta" },
    { src: "/glasses/malta/v0278-malta.png", label: "V0278 Malta" },
    { src: "/glasses/malta/malta-familia.png", label: "Malta Familia" },
    { src: "/glasses/malta/ambiente-malta-2.png", label: "Ambiente Malta" },
  ],
};

const SERIE_MALTA_CONTENT = {
  title: "Serie Malta",
  subtitle: "Stemmed glassware collection",
  description:
    "The Malta series offers elegant, stemmed glassware in clear crystal. Designed for water, beer, and versatile service, these glasses feature a rounded bowl, a short sturdy stem, and a stable base. Ideal for hospitality and everyday use.",
  features: [
    "Clear, transparent crystal glass",
    "Classic stemmed design with rounded bowl",
    "Stable circular base",
    "Suitable for water, beer, and general beverages",
  ],
};

// Malta glass specifications (per variant)
type MaltaVariantSpec = {
  productCode: string;
  capacityUS: string;
  capacityImperial: string;
  height: string;
  diameter: string;
  palletQuantity: string;
  ean: string;
};

const MALTA_SPECS: MaltaVariantSpec[] = [
  {
    productCode: "V1939 AA12 MALTA 56CL",
    capacityUS: "18 3/4 oz.",
    capacityImperial: "19 1/2 oz.",
    height: "173mm",
    diameter: "93mm",
    palletQuantity: "576 p.p.",
    ean: "8435420321633",
  },
  {
    productCode: "V1938 AA12 MALTA 44CL",
    capacityUS: "14 3/4 oz.",
    capacityImperial: "15 1/2 oz.",
    height: "157,5mm",
    diameter: "87mm",
    palletQuantity: "612 p.p.",
    ean: "8435420321626",
  },
  {
    productCode: "V1937 AA12 MALTA 33CL",
    capacityUS: "11 oz.",
    capacityImperial: "11 1/2 oz.",
    height: "147mm",
    diameter: "80mm",
    palletQuantity: "612 p.p.",
    ean: "8435420321619",
  },
];

// Manhattan glass: images and modal content (Serie Manhattan – from PDF)
const MANHATTAN_IMAGES = {
  empty: "/glasses/manhattan/manhattan.png",
  gallery: [
    { src: "/glasses/manhattan/manhattan.png", label: "Manhattan" },
    { src: "/glasses/manhattan/manhattan-familia.png", label: "Manhattan Familia" },
    { src: "/glasses/manhattan/manhattan-gin.png", label: "Manhattan Gin" },
    { src: "/glasses/manhattan/manhattan-cocktail.png", label: "Manhattan Cocktail" },
  ],
};

const SERIE_MANHATTAN_CONTENT = {
  title: "Serie Manhattan",
  subtitle: "Stemmed balloon glassware",
  description:
    "The Manhattan series features elegant stemmed glasses with a wide, rounded bowl—ideal for red wine, gin balloons, and cocktails. Clear crystal with a refined silhouette, slender stem, and stable base, suited for premium hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Wide rounded bowl with subtle textured detail",
    "Slender stem and circular base",
    "Ideal for wine, gin balloons, and cocktails",
  ],
};

const MANHATTAN_SPECS: MaltaVariantSpec[] = [
  {
    productCode: "V0768 AA6 MANHATTAN 72CL",
    capacityUS: "24¼ oz.",
    capacityImperial: "25¼ oz.",
    height: "225mm",
    diameter: "103mm",
    palletQuantity: "288 p.p.",
    ean: "8436536686388",
  },
];

// Margarita glass: images and modal content (Serie Margarita – from PDF)
const MARGARITA_IMAGES = {
  empty: "/glasses/margarita/margarita.png",
  gallery: [
    { src: "/glasses/margarita/margarita.png", label: "Copa Margarita" },
    { src: "/glasses/margarita/margarita-familia.png", label: "Margarita Familia" },
    { src: "/glasses/margarita/margarita-cocktail.png", label: "Margarita Cocktail" },
    { src: "/glasses/margarita/margarita-berry.png", label: "Margarita Berry" },
  ],
};

const SERIE_MARGARITA_CONTENT = {
  title: "Serie Margarita",
  subtitle: "Stemmed cocktail glassware",
  description:
    "The Margarita series features the classic stemmed cocktail glass: wide, shallow bowl with a flared rim, slender stem, and stable base. Perfect for margaritas, daiquiris, and other cocktails. Clear crystal, ideal for hospitality and bar service.",
  features: [
    "Clear, transparent crystal glass",
    "Classic wide shallow bowl and flared rim",
    "Slender stem and circular base",
    "Ideal for margaritas, daiquiris, and cocktails",
  ],
};

const MARGARITA_SPECS: MaltaVariantSpec[] = [
  {
    productCode: "V1099 AA6 MARGARITA 27CL",
    capacityUS: "9 oz.",
    capacityImperial: "9½ oz.",
    height: "164mm",
    diameter: "109mm",
    palletQuantity: "396 p.p.",
    ean: "8435420320322",
  },
];

// Mencia glass: images and modal content (Serie Mencia)
const MENCIA_IMAGES = {
  empty: "/glasses/mencia/mencia-44.png",
  gallery: [
    { src: "/glasses/mencia/mencia-44.png", label: "Mencia 44cl" },
    { src: "/glasses/mencia/mencia-25.png", label: "Mencia 25cl" },
    { src: "/glasses/mencia/mencia-31.png", label: "Mencia 31cl" },
    { src: "/glasses/mencia/mencia-cerveza.png", label: "Mencia Cerveza" },
    { src: "/glasses/mencia/mencia-ambiente.png", label: "Mencia Ambiente" },
    { src: "/glasses/mencia/mencia-copas.png", label: "Mencia Copas" },
    { src: "/glasses/mencia/mencia-wine.png", label: "Mencia Wine" },
    { src: "/glasses/mencia/mencia-b.png", label: "Mencia B" },
  ],
};

const SERIE_MENCIA_CONTENT = {
  title: "Serie Mencia",
  subtitle: "Stemmed wine & beverage glassware",
  description:
    "The Mencia series offers elegant stemmed glasses with a distinctive tulip-shaped bowl that narrows to a V at the base. Wide rim, slender stem, and stable foot. Suited for wine, beer, and sparkling—from large red wine to champagne flutes and smaller tasting sizes. Clear crystal, refined for hospitality and dining.",
  features: [
    "Clear, transparent crystal glass",
    "Tulip-shaped bowl with angular V-base",
    "Slender stem and circular foot",
    "Range from wine and champagne to beer and tasting",
  ],
};

const MENCIA_SPECS: MaltaVariantSpec[] = [
  {
    productCode: "V0265 AA6 MENCIA 58CL",
    capacityUS: "19 1/2 oz.",
    capacityImperial: "20 1/4 oz.",
    height: "240mm",
    diameter: "93mm",
    palletQuantity: "384 p.p.",
    ean: "8436536682328",
  },
  {
    productCode: "V0264 AA6 MENCIA 44CL",
    capacityUS: "14 3/4 oz.",
    capacityImperial: "15 1/2 oz.",
    height: "230mm",
    diameter: "85.5mm",
    palletQuantity: "384 p.p.",
    ean: "8436536682311",
  },
  {
    productCode: "V0263 AA6 MENCIA 31CL",
    capacityUS: "10 1/4 oz.",
    capacityImperial: "10 3/4 oz.",
    height: "208mm",
    diameter: "77.2mm",
    palletQuantity: "630 p.p.",
    ean: "8436536682304",
  },
  {
    productCode: "V0262 AA6 MENCIA 25CL",
    capacityUS: "8 1/4 oz.",
    capacityImperial: "8 3/4 oz.",
    height: "192mm",
    diameter: "71.5mm",
    palletQuantity: "750 p.p.",
    ean: "8436536682298",
  },
  {
    productCode: "V0290 AA6 MENCIA 17CL",
    capacityUS: "5 3/4 oz.",
    capacityImperial: "6 oz.",
    height: "205mm",
    diameter: "60.5mm",
    palletQuantity: "1,080 p.p.",
    ean: "8436536682526",
  },
];

// Merlot glass: images and modal content (Serie Merlot – stemmed wine + tumblers)
const MERLOT_IMAGES = {
  empty: "/glasses/merlot/merlot-19.png",
  gallery: [
    { src: "/glasses/merlot/merlot-42.png", label: "Merlot 42cl" },
    { src: "/glasses/merlot/merlot-31.png", label: "Merlot 31cl" },
    { src: "/glasses/merlot/merlot-23.png", label: "Merlot 23cl" },
    { src: "/glasses/merlot/merlot-19.png", label: "Merlot 19cl" },
    { src: "/glasses/merlot/merlot-vaso.png", label: "Merlot Vaso" },
    { src: "/glasses/merlot/merlot-bajo.png", label: "Merlot Bajo" },
    { src: "/glasses/merlot/merlot-familia.png", label: "Merlot Familia" },
    { src: "/glasses/merlot/merlot-copas.png", label: "Merlot Copas" },
    { src: "/glasses/merlot/merlot-wine.png", label: "Merlot Wine" },
  ],
};

const SERIE_MERLOT_CONTENT = {
  title: "Serie Merlot",
  subtitle: "Stemmed wine glasses & tumblers",
  description:
    "The Merlot series includes stemmed wine glasses in several sizes and cylindrical tumblers (highball and rocks). Broad rounded bowls for red wine, slender stems and flutes, plus straight-sided tumblers for water, soft drinks, and cocktails. Fully tempered, extra resistant glass.",
  features: [
    "Clear, fully tempered crystal glass",
    "Stemmed wine glasses and tumblers",
    "Broad bowl for red wine; flute option for white/champagne",
    "Cylindrical tumblers for water, highball, and rocks",
  ],
};

const MERLOT_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0097 AA12 MERLOT 42CL", capacityUS: "14 oz.", capacityImperial: "14¾ oz.", height: "209mm", diameter: "88.5mm", palletQuantity: "480 p.p.", ean: "8436536680546" },
  { productCode: "V0098 AA12 MERLOT 31CL", capacityUS: "10¼ oz.", capacityImperial: "10¾ oz.", height: "196mm", diameter: "80mm", palletQuantity: "600 p.p.", ean: "8436536680591" },
  { productCode: "V0099 AA12 MERLOT 23CL", capacityUS: "7¾ oz.", capacityImperial: "8 oz.", height: "174mm", diameter: "75mm", palletQuantity: "720 p.p.", ean: "8436536680607" },
  { productCode: "V0100 AA12 MERLOT 19CL", capacityUS: "6¼ oz.", capacityImperial: "6½ oz.", height: "168mm", diameter: "69.5mm", palletQuantity: "840 p.p.", ean: "8436536680614" },
  { productCode: "V0105 AA12 MERLOT 15CL", capacityUS: "5 oz.", capacityImperial: "5¼ oz.", height: "196.5mm", diameter: "60.5mm", palletQuantity: "1,140 p.p.", ean: "8436536680652" },
  { productCode: "V0766 A12 MERLOT 50CL", capacityUS: "17 oz.", capacityImperial: "17½ oz.", height: "163mm", diameter: "73.6mm", palletQuantity: "864 p.p.", ean: "8436536686364" },
  { productCode: "V0306 A12 MERLOT 35CL", capacityUS: "12 oz.", capacityImperial: "12 oz.", height: "147.5mm", diameter: "66.5mm", palletQuantity: "1,080 p.p.", ean: "8436536682687" },
  { productCode: "V0305 A12 MERLOT 28CL", capacityUS: "10 oz.", capacityImperial: "10 oz.", height: "126.5mm", diameter: "65.5mm", palletQuantity: "1,260 p.p.", ean: "8436536682670" },
  { productCode: "V0304 A12 MERLOT HB* 24CL", capacityUS: "8 oz.", capacityImperial: "8¾ oz.", height: "110mm", diameter: "64.5mm", palletQuantity: "1,440 p.p.", ean: "8436536682663" },
];

// Meslier glass: images and modal content (Serie Meslier – champagne flutes)
const MESLIER_IMAGES = {
  empty: "/glasses/meslier/meslier-17.png",
  gallery: [
    { src: "/glasses/meslier/meslier-17.png", label: "Meslier 17cl" },
    { src: "/glasses/meslier/meslier-ambiente.png", label: "Ambiente Meslier" },
    { src: "/glasses/meslier/meslier-ambiente-2.png", label: "Ambiente Meslier 2" },
  ],
};

const SERIE_MESLIER_CONTENT = {
  title: "Serie Meslier",
  subtitle: "Champagne flute glassware",
  description:
    "The Meslier series offers elegant champagne flutes: tall, slender bowls that taper gently from rim to stem, long delicate stems, and a stable circular base. Designed to showcase effervescence and preserve bubbles. Clear crystal, ideal for champagne, sparkling wine, and cocktails.",
  features: [
    "Clear, transparent crystal glass",
    "Classic champagne flute silhouette",
    "Elongated bowl and long slender stem",
    "Ideal for champagne and sparkling wine",
  ],
};

const MESLIER_SPECS: MaltaVariantSpec[] = [];

// Millot glass: images and modal content (Serie Millot – wine goblets)
const MILLOT_IMAGES = {
  empty: "/glasses/millot/millot-47.png",
  gallery: [
    { src: "/glasses/millot/millot-47.png", label: "Millot 47cl" },
    { src: "/glasses/millot/millot-40.png", label: "Millot 40cl" },
    { src: "/glasses/millot/millot-ambiente.png", label: "Millot Ambiente" },
    { src: "/glasses/millot/millot-familia.png", label: "Millot Familia" },
  ],
};

const SERIE_MILLOT_CONTENT = {
  title: "Serie Millot",
  subtitle: "Stemmed wine goblets",
  description:
    "The Millot series features elegant stemmed wine glasses with a tulip or U-shaped bowl that tapers toward the rim, and a distinct angular V where the bowl meets the stem. Slender stem and circular base. Versatile for red and white wine, with a clean, modern silhouette. Clear crystal for hospitality and dining.",
  features: [
    "Clear, transparent crystal glass",
    "Tulip or U-shaped bowl with angular V-base",
    "Slender stem and circular foot",
    "Suitable for red and white wine",
  ],
};

const MILLOT_SPECS: MaltaVariantSpec[] = [];

// Mirage glass: images and modal content (Serie Mirage – tumblers)
const MIRAGE_IMAGES = {
  empty: "/glasses/mirage/mirage-30.png",
  gallery: [
    { src: "/glasses/mirage/mirage-30.png", label: "Mirage 30cl" },
    { src: "/glasses/mirage/mirage-27.png", label: "Mirage 27cl" },
    { src: "/glasses/mirage/mirage-20.png", label: "Mirage 20cl" },
    { src: "/glasses/mirage/mirage-16.png", label: "Mirage 16cl" },
    { src: "/glasses/mirage/mirage-agua.png", label: "Mirage Agua" },
    { src: "/glasses/mirage/mirage-zumo.png", label: "Mirage Zumo" },
    { src: "/glasses/mirage/mirage-postre.png", label: "Mirage Postre" },
    { src: "/glasses/mirage/mirage-bodegon.png", label: "Mirage Bodegon" },
    { src: "/glasses/mirage/mirage-2.png", label: "Mirage" },
    { src: "/glasses/mirage/mirage-tumbler.png", label: "Mirage Tumbler" },
  ],
};

const SERIE_MIRAGE_CONTENT = {
  title: "Serie Mirage",
  subtitle: "Tumbler glassware",
  description:
    "The Mirage series offers clear tumblers in a range of sizes—from tall, slightly tapered highball-style glasses to shorter, rounded cups. Versatile for water, juice, desserts, and appetizers. Simple cylindrical or gently curved shapes with a solid base. Ideal for hospitality, catering, and casual dining.",
  features: [
    "Clear, transparent glass",
    "Tumbler and highball styles",
    "Slightly curved or cylindrical body, solid base",
    "Suitable for water, juice, desserts, and appetizers",
  ],
};

const MIRAGE_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0713 A12 MIRAGE HB* 30CL", capacityUS: "10 oz.", capacityImperial: "10½ oz.", height: "111.5mm", diameter: "69mm", palletQuantity: "1,248 p.p.", ean: "8435420320117" },
  { productCode: "V0711 BFA12 MIRAGE 27CL", capacityUS: "18¾ oz.", capacityImperial: "19½ oz.", height: "82mm", diameter: "75.7mm", palletQuantity: "1,728 p.p.", ean: "8435420320094" },
  { productCode: "V0712 A12 MIRAGE HB* 20CL", capacityUS: "6¾ oz.", capacityImperial: "7 oz.", height: "98mm", diameter: "60.7mm", palletQuantity: "1,944 p.p.", ean: "8435420320100" },
  { productCode: "V0710 BFA12 MIRAGE 16CL", capacityUS: "5½ oz.", capacityImperial: "5 2/3 oz.", height: "70mm", diameter: "64.5mm", palletQuantity: "3,024 p.p.", ean: "8435420320087" },
];

// Mokka glass: images and modal content (Serie Mokka – coffee & beverage tumblers)
const MOKKA_IMAGES = {
  empty: "/glasses/mokka/mokka-11.png",
  gallery: [
    { src: "/glasses/mokka/mokka-11.png", label: "Mokka 11cl" },
    { src: "/glasses/mokka/mokka-12-9.png", label: "Mokka 12.9cl" },
    { src: "/glasses/mokka/mokka-postre.png", label: "Mokka Postre" },
    { src: "/glasses/mokka/mokka-infusion.png", label: "Mokka Infusion" },
    { src: "/glasses/mokka/mokka-bodegon.png", label: "Mokka Bodegon" },
  ],
};

const SERIE_MOKKA_CONTENT = {
  title: "Serie Mokka",
  subtitle: "Coffee & beverage tumblers",
  description:
    "The Mokka series offers clear tumblers for coffee, infusions, desserts, and beverages. Slightly tapered or cylindrical shapes with a solid base; some models feature a metallic band accent. Ideal for mokka, café, yogurt, and infused drinks in hospitality and café settings.",
  features: [
    "Clear, transparent glass",
    "Tumbler design with solid base",
    "Optional metallic band accent on base",
    "Suitable for coffee, infusions, desserts, and beverages",
  ],
};

const MOKKA_SPECS: MaltaVariantSpec[] = [];

// Monastrell glass: images and modal content (Serie Monastrell – champagne coupe/saucer)
const MONASTRELL_IMAGES = {
  empty: "/glasses/monastrell/monastrell.png",
  gallery: [
    { src: "/glasses/monastrell/monastrell.png", label: "Monastrell" },
    { src: "/glasses/monastrell/monastrell-ambiente.png", label: "Monastrell Ambiente" },
    { src: "/glasses/monastrell/monastrell-ambiente-vacio.png", label: "Monastrell Ambiente Vacio" },
  ],
};

const SERIE_MONASTRELL_CONTENT = {
  title: "Serie Monastrell",
  subtitle: "Champagne coupe & saucer glassware",
  description:
    "The Monastrell series features the classic champagne coupe (or saucer): a broad, shallow bowl that curves gracefully from a slender stem to a flat circular base. Elegant silhouette for sparkling wine and cocktails. Clear crystal, ideal for celebrations and hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Classic coupe / champagne saucer shape",
    "Broad shallow bowl, slender stem, circular base",
    "Ideal for champagne and sparkling wine",
  ],
};

const MONASTRELL_SPECS: MaltaVariantSpec[] = [];

// Nervion glass: images and modal content (Serie Nervion – faceted tumblers)
const NERVION_IMAGES = {
  empty: "/glasses/nervion/nervion-29.png",
  gallery: [
    { src: "/glasses/nervion/nervion-29.png", label: "Nervion 29cl" },
    { src: "/glasses/nervion/nervion-20.png", label: "Nervion 20cl" },
    { src: "/glasses/nervion/nervion-bodegon.png", label: "Nervion Bodegon" },
    { src: "/glasses/nervion/nervion-ambiente.png", label: "Nervion Ambiente" },
  ],
};

const SERIE_NERVION_CONTENT = {
  title: "Serie Nervion",
  subtitle: "Faceted tumbler glassware",
  description:
    "The Nervion series offers clear tumblers with a distinctive faceted or fluted lower section and a smooth upper half. Thick base, sturdy build; some models have a subtle scalloped band below the rim. Suited for coffee, spirits, water, and beverages in hospitality and bar settings.",
  features: [
    "Clear, transparent glass",
    "Vertical fluting or facets on lower section",
    "Thick base, smooth rim",
    "Suitable for coffee, spirits, and beverages",
  ],
};

const NERVION_SPECS: MaltaVariantSpec[] = [];

// Ouro glass: images and modal content (Serie Ouro – shot glasses)
const OURO_IMAGES = {
  empty: "/glasses/ouro/ouro-vertical.png",
  gallery: [
    { src: "/glasses/ouro/ouro-vertical.png", label: "Ouro Ambiente Vertical" },
    { src: "/glasses/ouro/ouro-horizontal.png", label: "Ouro Ambiente Horizontal" },
  ],
};

const SERIE_OURO_CONTENT = {
  title: "Serie Ouro",
  subtitle: "Shot glass glassware",
  description:
    "The Ouro series offers clear shot glasses in a range of heights and proportions—from taller, straight-sided to shorter, flared designs. Thick solid base, smooth rims. Ideal for spirits, liqueurs, and cocktails. Clean, minimalist style for bar and hospitality.",
  features: [
    "Clear, transparent glass",
    "Shot glass range: varying heights and shapes",
    "Thick solid base, smooth rim",
    "Suitable for spirits, liqueurs, and cocktails",
  ],
};

const OURO_SPECS: MaltaVariantSpec[] = [];

// Piamonte glass: images and modal content (Serie Piamonte – wavy tumblers)
const PIAMONTE_IMAGES = {
  empty: "/glasses/piamonte/piamonte-50.png",
  gallery: [
    { src: "/glasses/piamonte/piamonte-50.png", label: "Piamonte 50cl" },
    { src: "/glasses/piamonte/piamonte-marianito.png", label: "Piamonte Marianito" },
    { src: "/glasses/piamonte/piamonte-bodegon.png", label: "Piamonte Bodegon" },
    { src: "/glasses/piamonte/piamonte-cerveza.png", label: "Piamonte Cerveza" },
    { src: "/glasses/piamonte/piamonte-familia.png", label: "Piamonte Familia" },
    { src: "/glasses/piamonte/piamonte-vermut.png", label: "Piamonte Vermut" },
    { src: "/glasses/piamonte/piamonte-4.png", label: "Piamonte" },
    { src: "/glasses/piamonte/piamonte-tumbler.png", label: "Piamonte Tumbler" },
  ],
};

const SERIE_PIAMONTE_CONTENT = {
  title: "Serie Piamonte",
  subtitle: "Wavy tumbler glassware",
  description:
    "The Piamonte series features clear tumblers with a distinctive, subtly undulating or wavy profile—organic, hand-blown aesthetic. Thick base, smooth flared rim. Ideal for beer, vermouth, marianito, juices, and long drinks. Versatile for aperitifs and hospitality.",
  features: [
    "Clear, transparent glass",
    "Undulating / wavy side profile",
    "Thick base, smooth rim",
    "Suitable for beer, vermouth, marianito, and long drinks",
  ],
};

const PIAMONTE_SPECS: MaltaVariantSpec[] = [
  { productCode: "V1358 A12 PIAMONTE 50CL", capacityUS: "16¾ oz.", capacityImperial: "17½ oz.", height: "156mm", diameter: "78mm", palletQuantity: "720 p.p.", ean: "8436536688832" },
  { productCode: "V1357 A12 PIAMONTE 38CL", capacityUS: "12¾ oz.", capacityImperial: "13¼ oz.", height: "131,5mm", diameter: "72mm", palletQuantity: "1,008 p.p.", ean: "8436536688825" },
  { productCode: "V1356 A12 PIAMONTE 24CL", capacityUS: "8 oz.", capacityImperial: "8¼ oz.", height: "110mm", diameter: "63mm", palletQuantity: "1,728 p.p.", ean: "8436536688818" },
];

// Pinot glass: images and modal content (Serie Pinot – wine glasses & flute)
const PINOT_IMAGES = {
  empty: "/glasses/pinot/pinot-25.png",
  gallery: [
    { src: "/glasses/pinot/pinot-25.png", label: "Pinot 25cl" },
    { src: "/glasses/pinot/pinot-copas.png", label: "Copas Pinot" },
    { src: "/glasses/pinot/pinot-ambiente.png", label: "Pinot Ambiente" },
    { src: "/glasses/pinot/pinot-wine.png", label: "Pinot Wine" },
    { src: "/glasses/pinot/pinot-1.png", label: "Pinot" },
    { src: "/glasses/pinot/pinot-2.png", label: "Pinot 2" },
    { src: "/glasses/pinot/pinot-3.png", label: "Pinot 3" },
    { src: "/glasses/pinot/pinot-5.png", label: "Pinot 5" },
    { src: "/glasses/pinot/pinot-6.png", label: "Pinot 6" },
    { src: "/glasses/pinot/pinot-7.png", label: "Pinot 7" },
    { src: "/glasses/pinot/pinot-9.png", label: "Pinot 9" },
    { src: "/glasses/pinot/pinot-11.png", label: "Pinot 11" },
  ],
};

const SERIE_PINOT_CONTENT = {
  title: "Serie Pinot",
  subtitle: "Wine glasses & champagne flute",
  description:
    "The Pinot series includes stemmed wine glasses in several sizes—from large, wide-bowled red wine glasses to a slender champagne flute. Rounded bowls, slender stems, circular bases. Suited for red wine, white wine, and sparkling. Clear crystal for hospitality and dining.",
  features: [
    "Clear, transparent crystal glass",
    "Stemmed wine glasses and flute",
    "Wide bowl for red; compact or flute for white/sparkling",
    "Suitable for red wine, white wine, and champagne",
  ],
};

const PINOT_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0217 AA6 PINOT 58CL", capacityUS: "19½ oz.", capacityImperial: "20¼ oz.", height: "230mm", diameter: "93mm", palletQuantity: "384 p.p.", ean: "8436536681697" },
  { productCode: "V0216 AA12 PINOT 47CL", capacityUS: "15¾ oz.", capacityImperial: "16½ oz.", height: "220.5mm", diameter: "87mm", palletQuantity: "384 p.p.", ean: "8436536681680" },
  { productCode: "V0215 AA12 PINOT 35CL", capacityUS: "11¾ oz.", capacityImperial: "12¼ oz.", height: "202mm", diameter: "80mm", palletQuantity: "600 p.p.", ean: "8436536681673" },
  { productCode: "V0214 AA12 PINOT 25CL", capacityUS: "8¼ oz.", capacityImperial: "8¾ oz.", height: "182mm", diameter: "71mm", palletQuantity: "780 p.p.", ean: "8436536681666" },
  { productCode: "V0213 AA12 PINOT 17CL", capacityUS: "5¾ oz.", capacityImperial: "6 oz.", height: "197mm", diameter: "52.8mm", palletQuantity: "1,080 p.p.", ean: "8436536681659" },
];

// Rioja glass: images and modal content (Serie Rioja – stemmed wine glasses)
const RIOJA_IMAGES = {
  empty: "/glasses/rioja/rioja-56.png",
  gallery: [
    { src: "/glasses/rioja/rioja-56.png", label: "Rioja 56cl" },
    { src: "/glasses/rioja/rioja-56-bodegon.png", label: "Rioja 56cl Bodegón" },
    { src: "/glasses/rioja/rioja-42.png", label: "Rioja 42cl" },
    { src: "/glasses/rioja/rioja-42-bodegon.png", label: "Rioja 42cl Bodegón" },
  ],
};

const SERIE_RIOJA_CONTENT = {
  title: "Serie Rioja",
  subtitle: "Stemmed wine glasses",
  description:
    "The Rioja series offers elegant stemmed wine glasses in clear crystal, with a tulip-shaped bowl that tapers toward the rim—ideal for concentrating aromas. Available in 56cl and 42cl sizes. Slender stem and circular base, suited for red and white wine in hospitality and dining.",
  features: [
    "Clear, transparent crystal glass",
    "Tulip-shaped bowl for aroma concentration",
    "Slender stem and stable circular base",
    "Available in 56cl and 42cl variants",
  ],
};

const RIOJA_SPECS: MaltaVariantSpec[] = [];

// Rocky Stack glass: images and modal content (stackable tumblers)
const ROCKY_STACK_IMAGES = {
  empty: "/glasses/rocky-stack/rocky-stack-30.png",
  gallery: [
    { src: "/glasses/rocky-stack/rocky-stack-30.png", label: "Rocky Stack 30cl" },
    { src: "/glasses/rocky-stack/rocky-stack-28.png", label: "Rocky Stack 28cl" },
    { src: "/glasses/rocky-stack/rocky-stack-single.png", label: "Rocky Stack" },
    { src: "/glasses/rocky-stack/rocky-stack-ambiente-3.png", label: "Rocky Stack Ambiente" },
    { src: "/glasses/rocky-stack/rocky-stack-ambiente-4.png", label: "Rocky Stack Ambiente 4" },
  ],
};

const SERIE_ROCKY_STACK_CONTENT = {
  title: "Serie Rocky Stack",
  subtitle: "Stackable tumblers",
  description:
    "The Rocky Stack series features clear, stackable tumblers with a distinct horizontal ridge for secure nesting. Robust base and cylindrical shape. Available in 30cl (taller) and 28cl (shorter, wider) variants. Ideal for juice, cocktails, and cold drinks in bars and hospitality.",
  features: [
    "Clear, transparent glass",
    "Stackable design with horizontal ridge",
    "Robust base and stable construction",
    "30cl and 28cl variants",
  ],
};

const ROCKY_STACK_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0233 A12 R. STACK 30CL", capacityUS: "10 oz.", capacityImperial: "10½ oz.", height: "121mm", diameter: "76,6mm", palletQuantity: "1,056 p.p.", ean: "8436536681970" },
  { productCode: "V0234 A12 R. STACK 28CL", capacityUS: "9¼ oz.", capacityImperial: "9¾ oz.", height: "86mm", diameter: "82,4mm", palletQuantity: "1,080 p.p.", ean: "8436536681987" },
];

// Rome glass: images and modal content (Serie Rome – stemmed goblet)
const ROME_IMAGES = {
  empty: "/glasses/rome/rome-65.png",
  gallery: [
    { src: "/glasses/rome/rome-65.png", label: "Rome 65cl" },
    { src: "/glasses/rome/rome-bodegon.png", label: "Rome Bodegón" },
    { src: "/glasses/rome/rome-65-smoothie.png", label: "Rome 65cl Smoothie" },
  ],
};

const SERIE_ROME_CONTENT = {
  title: "Serie Rome",
  subtitle: "Stemmed goblet",
  description:
    "The Rome series features an elegant stemmed glass with a broad, rounded bowl that tapers toward the rim—characteristic of a Burgundy or goblet style. Short, sturdy stem and circular base. Suited for red wine, cocktails with ice and garnishes, smoothies, and versatile beverage service in hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Broad rounded bowl, Burgundy-style",
    "Short sturdy stem and stable base",
    "Versatile for wine, cocktails, and smoothies",
  ],
};

const ROME_SPECS: MaltaVariantSpec[] = [];

// Roncal glass: images and modal content (tumblers / old-fashioned style)
const RONCAL_IMAGES = {
  empty: "/glasses/roncal/roncal-single.png",
  gallery: [
    { src: "/glasses/roncal/roncal-single.png", label: "Roncal" },
    { src: "/glasses/roncal/roncal-familia.png", label: "Roncal Familia" },
    { src: "/glasses/roncal/roncal-familia-2.png", label: "Roncal Familia 2" },
    { src: "/glasses/roncal/roncal-bajo.png", label: "Roncal Bajo" },
    { src: "/glasses/roncal/roncal-35fa.png", label: "Roncal 35FA" },
  ],
};

const SERIE_RONCAL_CONTENT = {
  title: "Serie Roncal",
  subtitle: "Tumblers & lowball glasses",
  description:
    "The Roncal series offers clear, sturdy tumblers with a thick base and slightly tapered body—classic old-fashioned or rocks style. Suitable for spirits, cocktails, water, juice, and smoothies. Multiple sizes available in the family. Clean lines and everyday elegance for hospitality.",
  features: [
    "Clear, transparent glass",
    "Thick base, sturdy construction",
    "Slightly tapered conical shape",
    "Versatile for spirits, cocktails, juice, and water",
  ],
};

const RONCAL_SPECS: MaltaVariantSpec[] = [];

// Samara glass: images and modal content (Serie Samara – stemmed wine goblet)
const SAMARA_IMAGES = {
  empty: "/glasses/samara/samara-58.png",
  gallery: [
    { src: "/glasses/samara/samara-58.png", label: "Samara 58cl" },
  ],
};

const SERIE_SAMARA_CONTENT = {
  title: "Serie Samara",
  subtitle: "Stemmed wine goblet",
  description:
    "The Samara series features an elegant stemmed wine goblet in clear crystal. Classic U-shaped bowl, slender stem, and flat circular base. Suited for red and white wine in hospitality and dining.",
  features: [
    "Clear, transparent crystal glass",
    "Classic goblet shape with U-shaped bowl",
    "Slender stem and stable base",
    "Ideal for wine service",
  ],
};

const SAMARA_SPECS: MaltaVariantSpec[] = [];

// Seira glass: images and modal content (from uploaded folder Seira)
const SEIRA_IMAGES = {
  empty: "/glasses/Seira/seira%20family.jpg",
  gallery: [
    { src: "/glasses/Seira/seira%20family.jpg", label: "Seira Family" },
    { src: "/glasses/Seira/Seira%20ambiente.jpg", label: "Seira Ambiente" },
  ],
};

const SERIE_SEIRA_CONTENT = {
  title: "Serie Seira",
  subtitle: "Glassware collection",
  description:
    "The Seira series offers clear glassware for versatile beverage service. Elegant design suited for hospitality and dining.",
  features: [
    "Clear, transparent glass",
    "Elegant design",
    "Versatile for beverages",
    "Suitable for hospitality",
  ],
};

const SEIRA_SPECS: MaltaVariantSpec[] = [];

// SETS – Bodegon: images and modal content (from uploaded folder SETS - Bodegon)
const SETS_BODEGON_IMAGES = {
  empty: "/glasses/SETS%20-%20Bodegon/uso%20licores%203.jpg",
  gallery: [
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_048.jpg", label: "Bodegón 048" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_054.jpg", label: "Bodegón 054" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_074.jpg", label: "Bodegón 074" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_077.jpg", label: "Bodegón 077" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_117.jpg", label: "Bodegón 117" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_145.jpg", label: "Bodegón 145" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_148.jpg", label: "Bodegón 148" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_242.jpg", label: "Bodegón 242" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_276.jpg", label: "Bodegón 276" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_303.jpg", label: "Bodegón 303" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_331.jpg", label: "Bodegón 331" },
    { src: "/glasses/SETS%20-%20Bodegon/Bodegon_336.jpg", label: "Bodegón 336" },
    { src: "/glasses/SETS%20-%20Bodegon/uso%20whisky.jpg", label: "Uso Whisky" },
    { src: "/glasses/SETS%20-%20Bodegon/uso%20zumo.jpg", label: "Uso Zumo" },
    { src: "/glasses/SETS%20-%20Bodegon/uso%20licores%203.jpg", label: "Uso Licores" },
    { src: "/glasses/SETS%20-%20Bodegon/uso%20helado3.jpg", label: "Uso Helado" },
  ],
};

const SERIE_SETS_BODEGON_CONTENT = {
  title: "SETS – Bodegón",
  subtitle: "Catalog sets & still-life",
  description:
    "Curated sets and bodegón-style imagery for catalog and display: wine, beer, champagne, cocktails, coffee, spirits, and refreshments. Multiple glass types and ambient shots for hospitality and retail.",
  features: [
    "Catalog and still-life imagery",
    "Wine, beer, champagne, cocktails",
    "Coffee, spirits, and refreshments",
    "Ideal for catalogs and display",
  ],
};

const SETS_BODEGON_SPECS: MaltaVariantSpec[] = [];

// Subirats glass: images and modal content (from uploaded folder Subirats)
const SUBIRATS_IMAGES = {
  empty: "/glasses/Subirats/subirats%2017.jpg",
  gallery: [
    { src: "/glasses/Subirats/subirats%2017.jpg", label: "Subirats 17cl" },
    { src: "/glasses/Subirats/subirats%20bodegon.jpg", label: "Subirats Bodegón" },
    { src: "/glasses/Subirats/Ambiente-Subirats.jpg", label: "Ambiente Subirats" },
  ],
};

const SERIE_SUBIRATS_CONTENT = {
  title: "Serie Subirats",
  subtitle: "Glassware collection",
  description:
    "The Subirats series offers clear glassware for versatile beverage service. Elegant design suited for hospitality and dining.",
  features: [
    "Clear, transparent glass",
    "Elegant design",
    "Versatile for beverages",
    "Suitable for hospitality",
  ],
};

const SUBIRATS_SPECS: MaltaVariantSpec[] = [];

// Syrah glass: images and modal content (from uploaded folder Syrah). Gallery kept to smaller images to avoid modal slowdown; syrah(conjunto).jpg (~7.8MB) excluded.
const SYRAH_IMAGES = {
  empty: "/glasses/Syrah/syrah%2058.jpg",
  gallery: [
    { src: "/glasses/Syrah/syrah%2058.jpg", label: "Syrah 58cl" },
    { src: "/glasses/Syrah/syrah%2047.jpg", label: "Syrah 47cl" },
    { src: "/glasses/Syrah/syrah%2035.jpg", label: "Syrah 35cl" },
    { src: "/glasses/Syrah/syrah%2025.jpg", label: "Syrah 25cl" },
    { src: "/glasses/Syrah/syrah%2017.jpg", label: "Syrah 17cl" },
    { src: "/glasses/Syrah/V0244-V0245-Syrah.jpg", label: "V0244 V0245 Syrah" },
    { src: "/glasses/Syrah/Ambiente-Syrah.jpg", label: "Ambiente Syrah" },
    { src: "/glasses/Syrah/pinot%20vaso%2035.jpg", label: "Pinot Vaso 35" },
    { src: "/glasses/Syrah/pinot%20vaso%2047.jpg", label: "Pinot Vaso 47" },
    { src: "/glasses/Syrah/syrah%20familia.jpg", label: "Syrah Familia" },
  ],
};

const SERIE_SYRAH_CONTENT = {
  title: "Serie Syrah",
  subtitle: "Stemmed wine glasses",
  description:
    "The Syrah series features stemmed wine glasses in multiple sizes (17cl to 58cl). Clear crystal, elegant bowl and stem, suited for red and white wine in hospitality and dining.",
  features: [
    "Clear, transparent crystal glass",
    "Multiple sizes from 17cl to 58cl",
    "Stemmed design",
    "Ideal for wine service",
  ],
};

const SYRAH_SPECS: MaltaVariantSpec[] = [];

// Sauvignon glass: images and modal content (Serie Sauvignon – stemmed wine glasses)
const SAUVIGNON_IMAGES = {
  empty: "/glasses/sauvignon/sauvignon-58.png",
  gallery: [
    { src: "/glasses/sauvignon/sauvignon-58.png", label: "Sauvignon 58cl" },
    { src: "/glasses/sauvignon/sauvignon-44.png", label: "Sauvignon 44cl" },
    { src: "/glasses/sauvignon/sauvignon-35.png", label: "Sauvignon 35cl" },
    { src: "/glasses/sauvignon/sauvignon-wine.png", label: "Sauvignon" },
    { src: "/glasses/sauvignon/sauvignon-familia.png", label: "Sauvignon Familia" },
    { src: "/glasses/sauvignon/sauvignon-ambiente.png", label: "Sauvignon Ambiente" },
    { src: "/glasses/sauvignon/sauvignon-agua.png", label: "Sauvignon Agua" },
    { src: "/glasses/sauvignon/sauvignon-champagne.png", label: "Sauvignon Champagne" },
  ],
};

const SERIE_SAUVIGNON_CONTENT = {
  title: "Serie Sauvignon",
  subtitle: "Stemmed wine glasses",
  description:
    "The Sauvignon series offers stemmed wine glasses in clear crystal with a tulip-shaped bowl—ideal for white wine and aromas. Available in 58cl, 44cl, and 35cl. Slender stem and circular base, suited for wine, water, and champagne in hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Tulip-shaped bowl for white wine",
    "58cl, 44cl, and 35cl variants",
    "Suitable for wine, water, and champagne",
  ],
};

const SAUVIGNON_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0765 AA6 SAUVIGNON 58CL", capacityUS: "19½ oz.", capacityImperial: "20¼ oz.", height: "232mm", diameter: "96,5mm", palletQuantity: "288 p.p.", ean: "8436536686357" },
  { productCode: "V0764 AA6 SAUVIGNON 44CL", capacityUS: "14¾ oz.", capacityImperial: "15½ oz.", height: "224mm", diameter: "88mm", palletQuantity: "408 p.p.", ean: "8436536686340" },
  { productCode: "V0763 AA6 SAUVIGNON 35CL", capacityUS: "11¾ oz.", capacityImperial: "12¼ oz.", height: "212mm", diameter: "80,5mm", palletQuantity: "630 p.p.", ean: "8436536686333" },
];

// Copa Stack (stemmed goblet): images and modal content
const COPA_STACK_IMAGES = {
  empty: "/glasses/stack-copa/copa-stack-25.png",
  gallery: [
    { src: "/glasses/stack-copa/copa-stack-25.png", label: "Copa Stack 25cl" },
    { src: "/glasses/stack-copa/copa-stack-19.png", label: "Copa Stack 19cl" },
    { src: "/glasses/stack-copa/copa-stack-single.png", label: "Copa Stack" },
    { src: "/glasses/stack-copa/copa-stack-familia.png", label: "Copa Stack Familia" },
    { src: "/glasses/stack-copa/copa-stack-ambiente.png", label: "Copa Stack Ambiente" },
  ],
};

const SERIE_COPA_STACK_CONTENT = {
  title: "Serie Stack – Copa",
  subtitle: "Stemmed stackable goblets",
  description:
    "The Copa Stack series features stemmed goblets with a wide bowl, short stem, and round base, designed for stacking. Clear crystal, 25cl and 19cl. Ideal for wine, water, and cocktails in hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Stemmed goblet, stackable design",
    "25cl and 19cl variants",
    "Suitable for wine, water, and cocktails",
  ],
};

const COPA_STACK_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0240 AA12 STACK 25CL", capacityUS: "8¼ oz.", capacityImperial: "8¾ oz.", height: "117mm", diameter: "75,5mm", palletQuantity: "1,152 p.p.", ean: "8436536682045" },
  { productCode: "V0241 AA12 STACK 19CL", capacityUS: "6¼ oz.", capacityImperial: "6½ oz.", height: "110mm", diameter: "70mm", palletQuantity: "1,404 p.p.", ean: "8436536682052" },
];

// Vaso Stack (tumbler): images and modal content
const VASO_STACK_IMAGES = {
  empty: "/glasses/stack-vaso/vaso-stack-25.png",
  gallery: [
    { src: "/glasses/stack-vaso/vaso-stack-25.png", label: "Vaso Stack 25cl" },
    { src: "/glasses/stack-vaso/vaso-stack-18.png", label: "Vaso Stack 18cl" },
    { src: "/glasses/stack-vaso/vaso-stack-12.png", label: "Vaso Stack 12cl" },
    { src: "/glasses/stack-vaso/vaso-stack-single.png", label: "Vaso Stack" },
    { src: "/glasses/stack-vaso/vaso-stack-ambiente.png", label: "Vaso Stack Ambiente" },
  ],
};

const SERIE_VASO_STACK_CONTENT = {
  title: "Serie Stack – Vaso",
  subtitle: "Stackable tumblers",
  description:
    "The Vaso Stack series features clear stackable tumblers with a flared shape and ridge for nesting. Stemless, sturdy base. Available in 25cl, 18cl, and 12cl. Ideal for juice, water, and soft drinks in bars and hospitality.",
  features: [
    "Clear, transparent glass",
    "Stackable tumbler design",
    "25cl, 18cl, and 12cl variants",
    "Suitable for juice, water, and soft drinks",
  ],
};

const VASO_STACK_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0281 A12 STACK 25CL", capacityUS: "8¼ oz.", capacityImperial: "8¾ oz.", height: "86mm", diameter: "80mm", palletQuantity: "1,080 p.p.", ean: "8436536682441" },
  { productCode: "V0274 YP12 STACK 18CL", capacityUS: "6 oz.", capacityImperial: "6¼ oz.", height: "79mm", diameter: "71mm", palletQuantity: "1,872 p.p.", ean: "8436536682380" },
  { productCode: "V0288 YP12 STACK 12CL", capacityUS: "4 oz.", capacityImperial: "4¼ oz.", height: "75mm", diameter: "62mm", palletQuantity: "1,872 p.p.", ean: "8436536682502" },
];

// T-Nonic glass: images and modal content (nonic pint glass)
const T_NONIC_IMAGES = {
  empty: "/glasses/t-nonic/t-nonic-56.png",
  gallery: [
    { src: "/glasses/t-nonic/t-nonic-56.png", label: "T-Nonic 56cl" },
    { src: "/glasses/t-nonic/t-nonic-47.png", label: "T-Nonic 47cl" },
    { src: "/glasses/t-nonic/t-nonic-28.png", label: "T-Nonic 28cl" },
    { src: "/glasses/t-nonic/t-nonic-bodegon.png", label: "T-Nonic Bodegón" },
    { src: "/glasses/t-nonic/t-nonic-refresco.png", label: "T-Nonic Refresco" },
  ],
};

const SERIE_T_NONIC_CONTENT = {
  title: "Serie T-Nonic",
  subtitle: "Nonic pint glass",
  description:
    "The T-Nonic series features clear nonic pint glasses with the distinctive bulge below the rim for grip and stacking. Available in 56cl, 47cl, and 28cl. Ideal for beer, cider, and refreshing drinks in bars and hospitality.",
  features: [
    "Clear, transparent glass",
    "Nonic bulge below rim for grip",
    "56cl, 47cl, and 28cl variants",
    "Ideal for beer, cider, and soft drinks",
  ],
};

const T_NONIC_SPECS: MaltaVariantSpec[] = [];

// T-Pinta glass: images and modal content (tumbler / pint style)
const T_PINTA_IMAGES = {
  empty: "/glasses/t-pinta/t-pinta-33.png",
  gallery: [
    { src: "/glasses/t-pinta/t-pinta-33.png", label: "T-Pinta 33cl" },
    { src: "/glasses/t-pinta/t-pinta-ambiente.png", label: "T-Pinta Ambiente" },
  ],
};

const SERIE_T_PINTA_CONTENT = {
  title: "Serie T-Pinta",
  subtitle: "Tumbler / pint glass",
  description:
    "The T-Pinta series offers clear tumblers with a sturdy base and slightly tapered shape—classic pint style. Suited for spirits, whiskey, and long drinks in bars and hospitality.",
  features: [
    "Clear, transparent glass",
    "Sturdy base, tumbler shape",
    "Classic pint style",
    "Ideal for spirits and long drinks",
  ],
};

const T_PINTA_SPECS: MaltaVariantSpec[] = [];

// Txikitero glass: images and modal content (small faceted tumbler / shot style)
const TXIKITERO_IMAGES = {
  empty: "/glasses/txikitero/txikitero-individual.png",
  gallery: [
    { src: "/glasses/txikitero/txikitero-individual.png", label: "Txikitero" },
    { src: "/glasses/txikitero/txikitero-vaso.png", label: "Txikitero Vaso" },
    { src: "/glasses/txikitero/txikitero-bodegon.png", label: "Txikitero Bodegón" },
    { src: "/glasses/txikitero/txikitero-catalog.png", label: "Txikitero 12cl" },
  ],
};

const SERIE_TXIKITERO_CONTENT = {
  title: "Serie Txikitero",
  subtitle: "Small faceted tumbler",
  description:
    "The Txikitero series features small clear tumblers with vertical fluting on the lower section and a smooth rim. 12cl capacity. Versatile for wine, spirits, and tapas. Ideal for Basque-style txikiteo and hospitality.",
  features: [
    "Clear, transparent glass",
    "Faceted lower section, smooth rim",
    "12cl capacity",
    "Ideal for wine, spirits, and tapas",
  ],
};

const TXIKITERO_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0898 FA6 TXIKITERO 12CL", capacityUS: "4 oz.", capacityImperial: "4½ oz.", height: "95mm", diameter: "80mm", palletQuantity: "840 p.p.", ean: "8436536687415" },
];

// Valencia glass: images and modal content (stemmed goblets – multiple shapes)
const VALENCIA_IMAGES = {
  empty: "/glasses/valencia/valencia-23.png",
  gallery: [
    { src: "/glasses/valencia/valencia-23.png", label: "Valencia 23cl" },
    { src: "/glasses/valencia/valencia-20.png", label: "Valencia 20cl" },
    { src: "/glasses/valencia/valencia-19.png", label: "Valencia 19cl" },
    { src: "/glasses/valencia/valencia-15.png", label: "Valencia 15cl" },
    { src: "/glasses/valencia/valencia-familia.png", label: "Valencia Familia" },
    { src: "/glasses/valencia/valencia-ambiente.png", label: "Valencia Ambiente" },
    { src: "/glasses/valencia/valencia-catalog.png", label: "Valencia Catálogo" },
  ],
};

const SERIE_VALENCIA_CONTENT = {
  title: "Serie Valencia",
  subtitle: "Stemmed goblets",
  description:
    "The Valencia series offers stemmed goblets in several shapes and sizes—from wide rounded bowls to tall slender pilsner-style and flute-style. 23cl, 20cl, 19cl, and 15cl. Clear crystal for wine, water, and beer in hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Multiple shapes: wide bowl, slender, flute-style",
    "23cl, 20cl, 19cl, and 15cl variants",
    "Suitable for wine, water, and beer",
  ],
};

const VALENCIA_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0113 AA12 VALENCIA 23CL", capacityUS: "7¾ oz.", capacityImperial: "8 oz.", height: "121mm", diameter: "73,5mm", palletQuantity: "1,152 p.p.", ean: "8436536680744" },
  { productCode: "V0261 AA12 VALENCIA 19CL", capacityUS: "6¼ oz.", capacityImperial: "6½ oz.", height: "118mm", diameter: "69,5mm", palletQuantity: "1,248 p.p.", ean: "8436536682281" },
  { productCode: "V0112 AA12 VALENCIA 20CL", capacityUS: "6¾ oz.", capacityImperial: "7 oz.", height: "150mm", diameter: "63mm", palletQuantity: "1,296 p.p.", ean: "8436536680737" },
  { productCode: "V0111 AA12 VALENCIA 15CL", capacityUS: "5 oz.", capacityImperial: "5¼ oz.", height: "151mm", diameter: "54,3mm", palletQuantity: "1,512 p.p.", ean: "8436536680720" },
];

// Valon glass: images and modal content (stemmed goblets – wide rounded bowl)
const VALON_IMAGES = {
  empty: "/glasses/valon/valon-25.png",
  gallery: [
    { src: "/glasses/valon/valon-25.png", label: "Valon 25cl" },
    { src: "/glasses/valon/valon-19.png", label: "Valon 19cl" },
    { src: "/glasses/valon/valon-15.png", label: "Valon 15cl" },
    { src: "/glasses/valon/valon-catalog.png", label: "Valon Catálogo" },
    { src: "/glasses/valon/valon-ambiente.png", label: "Valon Ambiente" },
    { src: "/glasses/valon/valon-ambiente-2.png", label: "Valon Ambiente 2" },
  ],
};

const SERIE_VALON_CONTENT = {
  title: "Serie Valon",
  subtitle: "Stemmed goblets",
  description:
    "The Valon series features stemmed goblets with a wide, rounded bowl that tapers slightly toward the rim. Clear crystal in 25cl, 19cl, and 15cl. Suited for wine and spirits that benefit from aeration. Short sturdy stem and circular base.",
  features: [
    "Clear, transparent crystal glass",
    "Wide rounded bowl for aeration",
    "25cl, 19cl, and 15cl variants",
    "Suitable for wine and spirits",
  ],
};

const VALON_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0067 AA12 VALON 25CL", capacityUS: "8¼ oz.", capacityImperial: "8¾ oz.", height: "138mm", diameter: "83mm", palletQuantity: "756 p.p.", ean: "8436536680355" },
  { productCode: "V0077 AA12 VALON 19CL", capacityUS: "6¼ oz.", capacityImperial: "6½ oz.", height: "129mm", diameter: "76mm", palletQuantity: "1,008 p.p.", ean: "8436536680348" },
  { productCode: "V0089 AA12 VALON 15CL", capacityUS: "5 oz.", capacityImperial: "5¼ oz.", height: "118mm", diameter: "71mm", palletQuantity: "1,248 p.p.", ean: "8436536680331" },
];

// Vermut glass: images and modal content (vermouth glass – footed tumbler)
const VERMUT_IMAGES = {
  empty: "/glasses/vermut/vermut-24.png",
  gallery: [
    { src: "/glasses/vermut/vermut-24.png", label: "Vermut 24cl" },
    { src: "/glasses/vermut/vermut-catalog.png", label: "Vermut Catálogo" },
    { src: "/glasses/vermut/vermut-bodegon.png", label: "Vermut Bodegón" },
    { src: "/glasses/vermut/vermut-familia.png", label: "Vermut Familia" },
  ],
};

const SERIE_VERMUT_CONTENT = {
  title: "Serie Vermut",
  subtitle: "Vermouth glass",
  description:
    "The Vermut series features a classic vermouth glass with a flared rim, gently tapered bowl with subtle vertical fluting, and a short foot. 24cl capacity. Clear crystal, ideal for vermouth, aperitifs, and tapas in hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Classic vermouth shape, flared rim",
    "24cl capacity",
    "Ideal for vermouth and aperitifs",
  ],
};

const VERMUT_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0538 YP12 VERMUT 24CL", capacityUS: "8 oz.", capacityImperial: "8¼ oz.", height: "111mm", diameter: "75mm", palletQuantity: "1,296 p.p.", ean: "8436536689808" },
];

// Vintage glass: images and modal content (stemmed wine glasses & flute)
const VINTAGE_IMAGES = {
  empty: "/glasses/vintage/vintage-56.png",
  gallery: [
    { src: "/glasses/vintage/vintage-56.png", label: "Vintage 56cl" },
    { src: "/glasses/vintage/vintage-25.png", label: "Vintage 25cl" },
    { src: "/glasses/vintage/vintage-20.png", label: "Vintage 20cl" },
    { src: "/glasses/vintage/vintage-19.png", label: "Vintage 19cl Flute" },
    { src: "/glasses/vintage/vintage-56-uso.png", label: "Vintage 56cl Uso" },
    { src: "/glasses/vintage/vintage-familia.png", label: "Vintage Familia" },
    { src: "/glasses/vintage/vintage-ambiente.png", label: "Vintage Ambiente" },
    { src: "/glasses/vintage/vintage-catalog.png", label: "Vintage Catálogo" },
  ],
};

const SERIE_VINTAGE_CONTENT = {
  title: "Serie Vintage",
  subtitle: "Stemmed wine glasses & flute",
  description:
    "The Vintage series offers stemmed glassware in six sizes: wide-bowled wine glasses (56cl to 20cl) and a tall champagne flute (19cl). Clear crystal for red wine, white wine, and sparkling. Classic, timeless design for hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Wine glasses 56cl to 20cl, plus 19cl flute",
    "Wide bowl for red, slender for white and sparkling",
    "Suitable for wine and champagne",
  ],
};

const VINTAGE_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0759 AA6 VINTAGE 56CL", capacityUS: "18¾ oz.", capacityImperial: "19½ oz.", height: "217mm", diameter: "96,5mm", palletQuantity: "288 p.p.", ean: "8436536686296" },
  { productCode: "V0758 AA6 VINTAGE 42CL", capacityUS: "14 oz.", capacityImperial: "14¾ oz.", height: "205mm", diameter: "88mm", palletQuantity: "510 p.p.", ean: "8436536686289" },
  { productCode: "V0757 AA6 VINTAGE 32CL", capacityUS: "10¾ oz.", capacityImperial: "11¼ oz.", height: "197mm", diameter: "80,5mm", palletQuantity: "630 p.p.", ean: "8436536686272" },
  { productCode: "V0756 AA6 VINTAGE 25CL", capacityUS: "8¼ oz.", capacityImperial: "8¾ oz.", height: "187mm", diameter: "74,5mm", palletQuantity: "750 p.p.", ean: "8436536686265" },
  { productCode: "V0755 AA6 VINTAGE 20CL", capacityUS: "6¾ oz.", capacityImperial: "7 oz.", height: "180mm", diameter: "69,5mm", palletQuantity: "780 p.p.", ean: "8436536686258" },
  { productCode: "V0754 AA6 VINTAGE 19CL", capacityUS: "6¼ oz.", capacityImperial: "6½ oz.", height: "210mm", diameter: "60,5mm", palletQuantity: "1,080 p.p.", ean: "8436536686241" },
];

// Viura glass: images and modal content (stemmed wine glasses & flute)
const VIURA_IMAGES = {
  empty: "/glasses/viura/viura-42.png",
  gallery: [
    { src: "/glasses/viura/viura-42.png", label: "Viura 42cl" },
    { src: "/glasses/viura/viura-30.png", label: "Viura 30cl" },
    { src: "/glasses/viura/viura-23.png", label: "Viura 23cl" },
    { src: "/glasses/viura/viura-catalog.png", label: "Viura Catálogo" },
    { src: "/glasses/viura/viura-ambiente.png", label: "Viura Ambiente" },
    { src: "/glasses/viura/viura-ambiente-2.png", label: "Viura Ambiente 2" },
    { src: "/glasses/viura/viura-ambiente-3.png", label: "Viura Ambiente 3" },
  ],
};

const SERIE_VIURA_CONTENT = {
  title: "Serie Viura",
  subtitle: "Stemmed wine glasses & flute",
  description:
    "The Viura series offers stemmed wine glasses in five sizes—from wide-bowled 53cl to compact 23cl and a tall 17cl flute. Clear crystal for red wine, white wine, and sparkling. Classic rounded bowls and slender stems for hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Wine glasses 53cl to 23cl, plus 17cl flute",
    "Rounded bowl and slender stem",
    "Suitable for wine and sparkling",
  ],
};

const VIURA_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0182 AA6 VIURA 53CL", capacityUS: "17¾ oz.", capacityImperial: "18½ oz.", height: "220mm", diameter: "91,4mm", palletQuantity: "384 p.p.", ean: "8436536681314" },
  { productCode: "V0110 AA12 VIURA 42CL", capacityUS: "14 oz.", capacityImperial: "14¾ oz.", height: "212mm", diameter: "85mm", palletQuantity: "384 p.p.", ean: "8436536680676" },
  { productCode: "V0109 AA12 VIURA 30CL", capacityUS: "10 oz.", capacityImperial: "10½ oz.", height: "195,5mm", diameter: "76,5mm", palletQuantity: "720 p.p.", ean: "8436536680713" },
  { productCode: "V0108 AA12 VIURA 23CL", capacityUS: "7¾ oz.", capacityImperial: "8 oz.", height: "177mm", diameter: "69,5mm", palletQuantity: "780 p.p.", ean: "8436536680706" },
  { productCode: "V0107 AA12 VIURA 17CL", capacityUS: "5¾ oz.", capacityImperial: "6 oz.", height: "192mm", diameter: "60,5mm", palletQuantity: "1,080 p.p.", ean: "8436536680690" },
];

// Xarel glass: images and modal content (champagne flute)
const XAREL_IMAGES = {
  empty: "/glasses/xarel/xarel-17.png",
  gallery: [
    { src: "/glasses/xarel/xarel-17.png", label: "Xarel 17cl" },
    { src: "/glasses/xarel/xarel-catalog.png", label: "Xarel Catálogo" },
    { src: "/glasses/xarel/xarel-ambiente-2.png", label: "Xarel Ambiente 2" },
    { src: "/glasses/xarel/xarel-ambiente-cat.png", label: "Xarel Ambiente Cat" },
  ],
};

const SERIE_XAREL_CONTENT = {
  title: "Serie Xarel",
  subtitle: "Champagne flute",
  description:
    "The Xarel series features a tall, slender champagne flute in clear crystal. 17cl capacity. Elongated bowl to preserve effervescence, slender stem, and circular base. Ideal for champagne and sparkling wine in hospitality.",
  features: [
    "Clear, transparent crystal glass",
    "Champagne flute design",
    "17cl capacity",
    "Ideal for champagne and sparkling wine",
  ],
};

const XAREL_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0201 AA12 XAREL 17CL", capacityUS: "5¾ oz.", capacityImperial: "6 oz.", height: "221mm", diameter: "70,5mm", palletQuantity: "624 p.p.", ean: "8436536681512" },
];

// Toscana glass: images and modal content (stemmed goblet, wine/beer)
const TOSCANA_IMAGES = {
  empty: "/glasses/toscana/toscana-62.png",
  gallery: [
    { src: "/glasses/toscana/toscana-62.png", label: "Toscana 62cl" },
    { src: "/glasses/toscana/toscana-41.png", label: "Toscana 41cl" },
    { src: "/glasses/toscana/toscana-single.png", label: "Toscana" },
    { src: "/glasses/toscana/toscana-ambiente.png", label: "Toscana Ambiente" },
    { src: "/glasses/toscana/toscana-ambiente-2.png", label: "Toscana Ambiente 2" },
  ],
};

const SERIE_TOSCANA_CONTENT = {
  title: "Serie Toscana",
  subtitle: "Stemmed goblet",
  description:
    "The Toscana series offers a stemmed goblet with a wide, rounded bowl, short sturdy stem, and circular base. Clear crystal, ideal for wine, water, or beer in hospitality. Available in 62cl and 41cl capacities.",
  features: [
    "Clear, transparent crystal glass",
    "Wide rounded bowl, short stem",
    "62cl and 41cl variants",
    "Suitable for wine, water, and beer",
  ],
};

const TOSCANA_SPECS: MaltaVariantSpec[] = [
  { productCode: "V0294 AA6 TOSCANA 62CL", capacityUS: "20¾ oz.", capacityImperial: "21¾ oz.", height: "167mm", diameter: "108,5mm", palletQuantity: "396 p.p.", ean: "8436536682564" },
  { productCode: "V0293 AA6 TOSCANA 41CL", capacityUS: "13¾ oz.", capacityImperial: "14 oz.", height: "148mm", diameter: "95,7mm", palletQuantity: "672 p.p.", ean: "8436536682557" },
];

type GlassModalContent = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  gallery: { src: string; label: string }[];
  specs?: MaltaVariantSpec[];
};

type GlassType = {
  name: string;
  emptyImage: string;
  filledImage: string;
  modalContent?: GlassModalContent;
};

const otherGlassNames: string[] = [
];

const glassTypes: GlassType[] = [
  {
    name: "Malta",
    emptyImage: MALTA_IMAGES.empty,
    filledImage: MALTA_IMAGES.filled,
    modalContent: {
      ...SERIE_MALTA_CONTENT,
      gallery: MALTA_IMAGES.gallery,
      specs: MALTA_SPECS,
    },
  },
  {
    name: "Manhattan",
    emptyImage: MANHATTAN_IMAGES.empty,
    filledImage: MANHATTAN_IMAGES.empty,
    modalContent: {
      ...SERIE_MANHATTAN_CONTENT,
      gallery: MANHATTAN_IMAGES.gallery,
      specs: MANHATTAN_SPECS,
    },
  },
  {
    name: "Margarita",
    emptyImage: MARGARITA_IMAGES.empty,
    filledImage: MARGARITA_IMAGES.empty,
    modalContent: {
      ...SERIE_MARGARITA_CONTENT,
      gallery: MARGARITA_IMAGES.gallery,
      specs: MARGARITA_SPECS,
    },
  },
  {
    name: "Mencia",
    emptyImage: MENCIA_IMAGES.empty,
    filledImage: MENCIA_IMAGES.empty,
    modalContent: {
      ...SERIE_MENCIA_CONTENT,
      gallery: MENCIA_IMAGES.gallery,
      specs: MENCIA_SPECS,
    },
  },
  {
    name: "Merlot",
    emptyImage: MERLOT_IMAGES.empty,
    filledImage: MERLOT_IMAGES.empty,
    modalContent: {
      ...SERIE_MERLOT_CONTENT,
      gallery: MERLOT_IMAGES.gallery,
      specs: MERLOT_SPECS,
    },
  },
  {
    name: "Meslier",
    emptyImage: MESLIER_IMAGES.empty,
    filledImage: MESLIER_IMAGES.empty,
    modalContent: {
      ...SERIE_MESLIER_CONTENT,
      gallery: MESLIER_IMAGES.gallery,
      specs: MESLIER_SPECS,
    },
  },
  {
    name: "Millot",
    emptyImage: MILLOT_IMAGES.empty,
    filledImage: MILLOT_IMAGES.empty,
    modalContent: {
      ...SERIE_MILLOT_CONTENT,
      gallery: MILLOT_IMAGES.gallery,
      specs: MILLOT_SPECS,
    },
  },
  {
    name: "Mirage",
    emptyImage: MIRAGE_IMAGES.empty,
    filledImage: MIRAGE_IMAGES.empty,
    modalContent: {
      ...SERIE_MIRAGE_CONTENT,
      gallery: MIRAGE_IMAGES.gallery,
      specs: MIRAGE_SPECS,
    },
  },
  {
    name: "Mokka",
    emptyImage: MOKKA_IMAGES.empty,
    filledImage: MOKKA_IMAGES.empty,
    modalContent: {
      ...SERIE_MOKKA_CONTENT,
      gallery: MOKKA_IMAGES.gallery,
      specs: MOKKA_SPECS,
    },
  },
  {
    name: "Monastrell",
    emptyImage: MONASTRELL_IMAGES.empty,
    filledImage: MONASTRELL_IMAGES.empty,
    modalContent: {
      ...SERIE_MONASTRELL_CONTENT,
      gallery: MONASTRELL_IMAGES.gallery,
      specs: MONASTRELL_SPECS,
    },
  },
  {
    name: "Nervion",
    emptyImage: NERVION_IMAGES.empty,
    filledImage: NERVION_IMAGES.empty,
    modalContent: {
      ...SERIE_NERVION_CONTENT,
      gallery: NERVION_IMAGES.gallery,
      specs: NERVION_SPECS,
    },
  },
  {
    name: "Ouro",
    emptyImage: OURO_IMAGES.empty,
    filledImage: OURO_IMAGES.empty,
    modalContent: {
      ...SERIE_OURO_CONTENT,
      gallery: OURO_IMAGES.gallery,
      specs: OURO_SPECS,
    },
  },
  {
    name: "Piamonte",
    emptyImage: PIAMONTE_IMAGES.empty,
    filledImage: PIAMONTE_IMAGES.empty,
    modalContent: {
      ...SERIE_PIAMONTE_CONTENT,
      gallery: PIAMONTE_IMAGES.gallery,
      specs: PIAMONTE_SPECS,
    },
  },
  {
    name: "Pinot",
    emptyImage: PINOT_IMAGES.empty,
    filledImage: PINOT_IMAGES.empty,
    modalContent: {
      ...SERIE_PINOT_CONTENT,
      gallery: PINOT_IMAGES.gallery,
      specs: PINOT_SPECS,
    },
  },
  {
    name: "Rioja",
    emptyImage: RIOJA_IMAGES.empty,
    filledImage: RIOJA_IMAGES.empty,
    modalContent: {
      ...SERIE_RIOJA_CONTENT,
      gallery: RIOJA_IMAGES.gallery,
      specs: RIOJA_SPECS,
    },
  },
  {
    name: "Rocky Stack",
    emptyImage: ROCKY_STACK_IMAGES.empty,
    filledImage: ROCKY_STACK_IMAGES.empty,
    modalContent: {
      ...SERIE_ROCKY_STACK_CONTENT,
      gallery: ROCKY_STACK_IMAGES.gallery,
      specs: ROCKY_STACK_SPECS,
    },
  },
  {
    name: "Rome",
    emptyImage: ROME_IMAGES.empty,
    filledImage: ROME_IMAGES.empty,
    modalContent: {
      ...SERIE_ROME_CONTENT,
      gallery: ROME_IMAGES.gallery,
      specs: ROME_SPECS,
    },
  },
  {
    name: "Roncal",
    emptyImage: RONCAL_IMAGES.empty,
    filledImage: RONCAL_IMAGES.empty,
    modalContent: {
      ...SERIE_RONCAL_CONTENT,
      gallery: RONCAL_IMAGES.gallery,
      specs: RONCAL_SPECS,
    },
  },
  {
    name: "Samara",
    emptyImage: SAMARA_IMAGES.empty,
    filledImage: SAMARA_IMAGES.empty,
    modalContent: {
      ...SERIE_SAMARA_CONTENT,
      gallery: SAMARA_IMAGES.gallery,
      specs: SAMARA_SPECS,
    },
  },
  {
    name: "Seira",
    emptyImage: SEIRA_IMAGES.empty,
    filledImage: SEIRA_IMAGES.empty,
    modalContent: {
      ...SERIE_SEIRA_CONTENT,
      gallery: SEIRA_IMAGES.gallery,
      specs: SEIRA_SPECS,
    },
  },
  {
    name: "SETS – Bodegon",
    emptyImage: SETS_BODEGON_IMAGES.empty,
    filledImage: SETS_BODEGON_IMAGES.empty,
    modalContent: {
      ...SERIE_SETS_BODEGON_CONTENT,
      gallery: SETS_BODEGON_IMAGES.gallery,
      specs: SETS_BODEGON_SPECS,
    },
  },
  {
    name: "Subirats",
    emptyImage: SUBIRATS_IMAGES.empty,
    filledImage: SUBIRATS_IMAGES.empty,
    modalContent: {
      ...SERIE_SUBIRATS_CONTENT,
      gallery: SUBIRATS_IMAGES.gallery,
      specs: SUBIRATS_SPECS,
    },
  },
  {
    name: "Syrah",
    emptyImage: SYRAH_IMAGES.empty,
    filledImage: SYRAH_IMAGES.empty,
    modalContent: {
      ...SERIE_SYRAH_CONTENT,
      gallery: SYRAH_IMAGES.gallery,
      specs: SYRAH_SPECS,
    },
  },
  {
    name: "Sauvignon",
    emptyImage: SAUVIGNON_IMAGES.empty,
    filledImage: SAUVIGNON_IMAGES.empty,
    modalContent: {
      ...SERIE_SAUVIGNON_CONTENT,
      gallery: SAUVIGNON_IMAGES.gallery,
      specs: SAUVIGNON_SPECS,
    },
  },
  {
    name: "Copa Stack",
    emptyImage: COPA_STACK_IMAGES.empty,
    filledImage: COPA_STACK_IMAGES.empty,
    modalContent: {
      ...SERIE_COPA_STACK_CONTENT,
      gallery: COPA_STACK_IMAGES.gallery,
      specs: COPA_STACK_SPECS,
    },
  },
  {
    name: "Vaso Stack",
    emptyImage: VASO_STACK_IMAGES.empty,
    filledImage: VASO_STACK_IMAGES.empty,
    modalContent: {
      ...SERIE_VASO_STACK_CONTENT,
      gallery: VASO_STACK_IMAGES.gallery,
      specs: VASO_STACK_SPECS,
    },
  },
  {
    name: "T-Nonic",
    emptyImage: T_NONIC_IMAGES.empty,
    filledImage: T_NONIC_IMAGES.empty,
    modalContent: {
      ...SERIE_T_NONIC_CONTENT,
      gallery: T_NONIC_IMAGES.gallery,
      specs: T_NONIC_SPECS,
    },
  },
  {
    name: "T-Pinta",
    emptyImage: T_PINTA_IMAGES.empty,
    filledImage: T_PINTA_IMAGES.empty,
    modalContent: {
      ...SERIE_T_PINTA_CONTENT,
      gallery: T_PINTA_IMAGES.gallery,
      specs: T_PINTA_SPECS,
    },
  },
  {
    name: "Txikitero",
    emptyImage: TXIKITERO_IMAGES.empty,
    filledImage: TXIKITERO_IMAGES.empty,
    modalContent: {
      ...SERIE_TXIKITERO_CONTENT,
      gallery: TXIKITERO_IMAGES.gallery,
      specs: TXIKITERO_SPECS,
    },
  },
  {
    name: "Valencia",
    emptyImage: VALENCIA_IMAGES.empty,
    filledImage: VALENCIA_IMAGES.empty,
    modalContent: {
      ...SERIE_VALENCIA_CONTENT,
      gallery: VALENCIA_IMAGES.gallery,
      specs: VALENCIA_SPECS,
    },
  },
  {
    name: "Valon",
    emptyImage: VALON_IMAGES.empty,
    filledImage: VALON_IMAGES.empty,
    modalContent: {
      ...SERIE_VALON_CONTENT,
      gallery: VALON_IMAGES.gallery,
      specs: VALON_SPECS,
    },
  },
  {
    name: "Vermut",
    emptyImage: VERMUT_IMAGES.empty,
    filledImage: VERMUT_IMAGES.empty,
    modalContent: {
      ...SERIE_VERMUT_CONTENT,
      gallery: VERMUT_IMAGES.gallery,
      specs: VERMUT_SPECS,
    },
  },
  {
    name: "Vintage",
    emptyImage: VINTAGE_IMAGES.empty,
    filledImage: VINTAGE_IMAGES.empty,
    modalContent: {
      ...SERIE_VINTAGE_CONTENT,
      gallery: VINTAGE_IMAGES.gallery,
      specs: VINTAGE_SPECS,
    },
  },
  {
    name: "Viura",
    emptyImage: VIURA_IMAGES.empty,
    filledImage: VIURA_IMAGES.empty,
    modalContent: {
      ...SERIE_VIURA_CONTENT,
      gallery: VIURA_IMAGES.gallery,
      specs: VIURA_SPECS,
    },
  },
  {
    name: "Xarel",
    emptyImage: XAREL_IMAGES.empty,
    filledImage: XAREL_IMAGES.empty,
    modalContent: {
      ...SERIE_XAREL_CONTENT,
      gallery: XAREL_IMAGES.gallery,
      specs: XAREL_SPECS,
    },
  },
  {
    name: "Toscana",
    emptyImage: TOSCANA_IMAGES.empty,
    filledImage: TOSCANA_IMAGES.empty,
    modalContent: {
      ...SERIE_TOSCANA_CONTENT,
      gallery: TOSCANA_IMAGES.gallery,
      specs: TOSCANA_SPECS,
    },
  },
  ...otherGlassNames.map((name) => ({
    name,
    emptyImage: GLASS_EMPTY_PLACEHOLDER,
    filledImage: GLASS_FILLED_PLACEHOLDER,
  })) as GlassType[],
];

const allProducts = [
  { name: "Bordeaux Wine Glass", category: "Wine & Champagne", image: bordeauxImg, capacity: "650ml", height: "235mm" },
  { name: "Champagne Flute", category: "Wine & Champagne", image: champagneImg, capacity: "210ml", height: "225mm" },
  { name: "Burgundy Wine Glass", category: "Wine & Champagne", image: bordeauxImg, capacity: "730ml", height: "240mm" },
  { name: "Crystal Whiskey Tumbler", category: "Spirits & Liquor", image: whiskeyImg, capacity: "300ml", height: "100mm" },
  { name: "Old Fashioned Glass", category: "Spirits & Liquor", image: whiskeyImg, capacity: "350ml", height: "95mm" },
  { name: "Highball Glass", category: "Spirits & Liquor", image: highballImg, capacity: "400ml", height: "150mm" },
  { name: "Pilsner Glass", category: "Beer", image: pilsnerImg, capacity: "500ml", height: "200mm" },
  { name: "Craft Beer Goblet", category: "Beer", image: beerGobletImg, capacity: "400ml", height: "180mm" },
  { name: "Cappuccino Cup & Saucer", category: "Café Essentials", image: cappuccinoImg, capacity: "200ml", height: "80mm" },
  { name: "Espresso Cup Set", category: "Café Essentials", image: espressoImg, capacity: "90ml", height: "60mm" },
  { name: "Latte Glass", category: "Café Essentials", image: latteImg, capacity: "350ml", height: "140mm" },
  { name: "Dust Proof Cake Dome", category: "Buffet & Kitchen", image: cakeDomeImg, capacity: "—", height: "280mm" },
  { name: "Gastronorm GN 1/1", category: "Buffet & Kitchen", image: gastronormImg, capacity: "9L", height: "100mm" },
  { name: "Gastronorm GN 1/2", category: "Buffet & Kitchen", image: gastronormImg, capacity: "4L", height: "100mm" },
  { name: "Gastronorm GN 1/3", category: "Buffet & Kitchen", image: gastronormImg, capacity: "2.5L", height: "100mm" },
  { name: "Luxury Square Buffet Riser", category: "Buffet & Kitchen", image: buffetRiserImg, capacity: "—", height: "150mm" },
  { name: "SS PFOA-Free Shallow Fry Pan", category: "Buffet & Kitchen", image: fryPanImg, capacity: "—", height: "Ø280mm" },
];

const categories = ["All", "Wine & Champagne", "Spirits & Liquor", "Beer", "Café Essentials", "Buffet & Kitchen"];

const Products = () => {
  const location = useLocation();
  const [active, setActive] = useState("All");
  const [glassModal, setGlassModal] = useState<GlassModalContent | null>(null);
  const filtered = active === "All" ? allProducts : allProducts.filter((p) => p.category === active);

  useEffect(() => {
    if (location.hash === "#glasses") {
      const el = document.getElementById("glasses");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, location.hash]);

  return (
    <Layout>
      <section className="pt-28 pb-8 section-padding bg-secondary/30">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Our <span className="gradient-gold-text">Products</span>
          </motion.h1>
          <p className="text-md font-medium leading-relaxed mb-8">
            Premium glassware, buffet equipment, and hospitality essentials for discerning establishments
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "gradient-gold text-primary-foreground"
                    : "bg-card border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover-lift"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full text-primary">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold mb-2">{product.name}</h3>
                    <div className="flex gap-4 text-xs">
                      <span>Capacity: {product.capacity}</span>
                      <span>Height: {product.height}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Glasses section */}
      <section id="glasses" className="section-padding bg-secondary/30 relative overflow-hidden scroll-mt-24">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary blur-3xl" />
        </div>
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
            >
              Glassware Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              <span className="gradient-gold-text">Glasses</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-center text-md font-medium text-muted-foreground max-w-2xl mx-auto mb-6"
            >
              Explore our range of glassware — each shown empty and filled for your reference.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
              hidden: {},
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {glassTypes.map((glass) => (
              <motion.div
                key={glass.name}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                role={glass.modalContent ? "button" : undefined}
                tabIndex={glass.modalContent ? 0 : undefined}
                onClick={() => glass.modalContent && setGlassModal(glass.modalContent)}
                onKeyDown={(e) =>
                  glass.modalContent && (e.key === "Enter" || e.key === " ") && setGlassModal(glass.modalContent)
                }
                className={`group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 ${glass.modalContent ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" : ""}`}
              >
                {/* Hover shine overlay */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                </div>
                {glass.modalContent && (
                  <div className="absolute top-2 right-2 z-10 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                    View details
                  </div>
                )}

                <div className="relative aspect-square overflow-hidden bg-secondary/30 flex items-center justify-center p-6">
                  <motion.img
                    src={glass.emptyImage}
                    alt={glass.name}
                    loading="lazy"
                    className="w-full h-full object-contain object-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-5 text-center relative">
                  <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                    {glass.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Glass detail modal (e.g. Serie Malta) */}
      <Dialog open={!!glassModal} onOpenChange={(open) => !open && setGlassModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden border-border bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 duration-300">
          <ScrollArea className="max-h-[90vh]">
            <AnimatePresence mode="wait">
              {glassModal && (
                <motion.div
                  key="modal-content"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                  className="p-6 md:p-8"
                >
                <DialogHeader className="text-left space-y-1 pb-6 border-b border-border">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Glassware Series
                  </span>
                  <DialogTitle className="text-2xl md:text-3xl font-display font-bold gradient-gold-text">
                    {glassModal.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground font-medium">{glassModal.subtitle}</p>
                </DialogHeader>

                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {glassModal.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">
                    Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {glassModal.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {glassModal.specs && glassModal.specs.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                      Specifications by variant
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {glassModal.specs.map((spec, i) => (
                        <div
                          key={spec.productCode}
                          className="rounded-xl border border-border bg-secondary/20 p-4 space-y-3"
                        >
                          <p className="font-semibold text-foreground text-sm leading-tight border-b border-border pb-2">
                            {spec.productCode}
                          </p>
                          <dl className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex justify-between gap-2">
                              <dt>Capacity (US)</dt>
                              <dd className="text-foreground font-medium">{spec.capacityUS}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt>Capacity (Imperial)</dt>
                              <dd className="text-foreground font-medium">{spec.capacityImperial}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt>Height (H)</dt>
                              <dd className="text-foreground font-medium">{spec.height}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt>Diameter</dt>
                              <dd className="text-foreground font-medium">{spec.diameter}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt>Pallet (EU)</dt>
                              <dd className="text-foreground font-medium">{spec.palletQuantity}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt>EAN</dt>
                              <dd className="text-foreground font-mono text-[11px]">{spec.ean}</dd>
                            </div>
                          </dl>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                    Variants
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {glassModal.gallery.map((item) => (
                      <div
                        key={item.src}
                        className="group rounded-xl overflow-hidden border border-border bg-secondary/30 hover:border-primary/40 transition-colors"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-muted/30">
                          <img
                            src={item.src}
                            alt={item.label}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <p className="p-2.5 text-center text-xs font-medium text-foreground">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Products;
