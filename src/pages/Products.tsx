import { useState } from "react";
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

const otherGlassNames = [
  "Mencia", "Merlot", "Meslier", "Millot", "Mirage", "Mokka",
  "Monastrell", "Nervion", "Ouro", "Piamonte", "Pinot", "Rioja", "Rocky Stack", "Rome", "Roncal",
  "Samara", "Sauvignon", "Seira", "SETS – Bodegon", "Stack", "Subirats", "Syrah", "T-Nonic", "T-Pinta",
  "Toscana", "Txikitero", "Valencia", "Valon", "Vermut", "Vintage", "Viura", "Xarel",
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
  const [active, setActive] = useState("All");
  const [glassModal, setGlassModal] = useState<GlassModalContent | null>(null);
  const filtered = active === "All" ? allProducts : allProducts.filter((p) => p.category === active);

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
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
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
