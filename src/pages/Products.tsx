import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
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

const glassTypes = [
  "Malta", "Manhattan", "Margarita", "Mencia", "Merlot", "Meslier", "Millot", "Mirage", "Mokka",
  "Monastrell", "Nervion", "Ouro", "Piamonte", "Pinot", "Rioja", "Rocky Stack", "Rome", "Roncal",
  "Samara", "Sauvignon", "Seira", "SETS – Bodegon", "Stack", "Subirats", "Syrah", "T-Nonic", "T-Pinta",
  "Toscana", "Txikitero", "Valencia", "Valon", "Vermut", "Vintage", "Viura", "Xarel",
].map((name) => ({
  name,
  emptyImage: GLASS_EMPTY_PLACEHOLDER,
  filledImage: GLASS_FILLED_PLACEHOLDER,
}));

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
            {glassTypes.map((glass, index) => (
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
                className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
              >
                {/* Hover shine overlay */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30 flex">
                  <div className="flex-1 relative min-w-0 overflow-hidden">
                    <motion.img
                      src={glass.emptyImage}
                      alt={`${glass.name} empty`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.span
                      initial={false}
                      className="absolute bottom-2 left-2 bg-card/95 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full border border-border/50 text-primary shadow-sm"
                    >
                      Empty
                    </motion.span>
                  </div>
                  <div className="w-px flex-shrink-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent" aria-hidden />
                  <div className="flex-1 relative min-w-0 overflow-hidden">
                    <motion.img
                      src={glass.filledImage}
                      alt={`${glass.name} filled`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.span
                      initial={false}
                      className="absolute bottom-2 left-2 bg-card/95 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full border border-border/50 text-primary shadow-sm"
                    >
                      Filled
                    </motion.span>
                  </div>
                </div>
                <div className="p-4 text-center relative">
                  <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                    {glass.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
