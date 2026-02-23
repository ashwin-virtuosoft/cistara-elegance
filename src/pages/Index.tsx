import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award, Headphones, Shield, Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import champagneImg from "@/assets/champagne-glass.jpg";
import heroImg from "@/assets/hero-glassware.jpg";
import heroBarGlasses from "@/assets/hero-bar-glasses.png";
import spiritsImg from "@/assets/whiskey-tumbler.jpg";
import beerImg from "@/assets/pilsner-glass.jpg";
import cafeImg from "@/assets/cappuccino-cup.jpg";
import buffetImg from "@/assets/buffet-setup.png";
import cakeStandImg from "@/assets/cake-stand.png";
import cakeDomeImg from "@/assets/cake 1.png";
import wineStemwareImg from "@/assets/wine-stemware.png";
import orangeCocktailImg from "@/assets/orange-cocktail-concept-fresh-delicious-summer-citrus-cocktail.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const cardHover = { scale: 1.02, y: -4 };
const cardTap = { scale: 0.98 };
const btnHover = { scale: 1.05 };
const btnTap = { scale: 0.97 };

const categories = [
  { title: "Variants of Glass", image: heroBarGlasses, desc: "Explore our glassware collection", link: "/products#glasses" },
  { title: "Wine & Champagne", image: champagneImg, desc: "Elegant stemware for fine dining", link: "/products" },
  { title: "Spirits & Liquor", image: spiritsImg, desc: "Crystal-clear barware collection", link: "/products" },
  { title: "Beer Glassware", image: beerImg, desc: "Premium craft beer glasses", link: "/products" },
  { title: "Café Essentials", image: cafeImg, desc: "Refined coffee & tea service", link: "/products" },
  { title: "Cake Dome Stands", image: cakeStandImg, desc: "Elegant cake domes and displays", link: "/products" },
  { title: "Buffet & Kitchen", image: buffetImg, desc: "Professional buffet & kitchen equipment", link: "/products" },
];

const features = [
  { icon: Award, title: "Premium Quality", desc: "Curated selection of the finest hospitality products" },
  { icon: Headphones, title: "Dedicated Support", desc: "Professional team with deep industry expertise" },
  { icon: Shield, title: "Trusted Partner", desc: "Reliable supply chain for upscale establishments" },
  { icon: Leaf, title: "Sustainable", desc: "Committed to eco-friendly practices and products" },
];

const heroHeadlines = [
  { top: "Premier Hospitality", highlight: "Supply Partner" },
  { top: "Premium Malta", highlight: "Glassware" },
  { top: "Elegant Cake", highlight: "Dome Stands" },
  { top: "Luxury Buffet", highlight: "Equipment" },
  { top: "Fine Dining", highlight: "Essentials" },
];

const heroBackgrounds = [
  heroImg,           // Premier Hospitality Supply Partner
  orangeCocktailImg, // Premium Malta Glassware
  cakeDomeImg,       // Elegant Cake Dome Stands
  buffetImg,         // Luxury Buffet Equipment
  wineStemwareImg,   // Fine Dining Essentials
];

const Index = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % heroHeadlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={headlineIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.img
                src={heroBackgrounds[headlineIndex]}
                alt=""
                className="w-full h-full object-cover object-center"
                aria-hidden
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 9,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-2xl text-primary-foreground">
            <div className="h-[120px] md:h-[160px] mb-4 flex items-end">
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {heroHeadlines[headlineIndex].top}{" "}
                <span className="text-[#E76439] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{heroHeadlines[headlineIndex].highlight}</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full px-8 py-3.5 font-semibold text-primary-foreground inline-flex items-center gap-2 bg-[#E76439]"
              >
                View Products <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="rounded-full px-8 py-3.5 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    {/* Intro */}
    <section className="section-padding">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold mb-6"
        >
          Elevating Hospitality <span className="gradient-gold-text">Standards</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-semibold  font-serif leading-relaxed"
        >
          We are a trusted supplier of quality-driven, complete solutions for upscale hotels,
          fine dining restaurants, and catering sectors — combining practical excellence with
          luxurious comfort under one roof.
        </motion.p>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
        >
          Our <span className="gradient-gold-text">Collections</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={cardHover}
              whileTap={cardTap}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={cat.link ?? "/products"} className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4">
                  <motion.img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-display font-bold text-card">{cat.title}</h3>
                    <p className="text-sm text-card/80">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ ...cardHover, transition: { duration: 0.25 } }}
              whileTap={cardTap}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-card border border-border"
            >
              <div className="w-14 h-14 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <f.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-base">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding relative overflow-hidden text-center">
      <div className="absolute inset-0">
        <motion.img
          src={heroBarGlasses}
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
        />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4 drop-shadow-lg"
        >
          Ready to Elevate Your Hospitality Experience?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-primary-foreground/90 mb-8 text-lg drop-shadow-md"
        >
          Partner with Cistara for premium quality and exceptional service.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div whileHover={btnHover} whileTap={btnTap} className="inline-block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-card text-foreground rounded-full px-8 py-3.5 font-semibold hover:shadow-xl transition-shadow duration-300"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </Layout>
  );
};

export default Index;
