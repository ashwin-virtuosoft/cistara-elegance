import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award, Headphones, Shield, Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-glassware.jpg";
import wineImg from "@/assets/bordeaux-glass.jpg";
import spiritsImg from "@/assets/whiskey-tumbler.jpg";
import beerImg from "@/assets/pilsner-glass.jpg";
import cafeImg from "@/assets/cappuccino-cup.jpg";
import buffetImg from "@/assets/buffet-riser.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const categories = [
  { title: "Wine & Champagne", image: wineImg, desc: "Elegant stemware for fine dining" },
  { title: "Spirits & Liquor", image: spiritsImg, desc: "Crystal-clear barware collection" },
  { title: "Beer Glassware", image: beerImg, desc: "Premium craft beer glasses" },
  { title: "Café Essentials", image: cafeImg, desc: "Refined coffee & tea service" },
  { title: "Buffet & Kitchen", image: buffetImg, desc: "Professional buffet & kitchen equipment" },
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
          <img src={heroImg} alt="Premium glassware" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} custom={0} className="text-primary font-bold tracking-widest uppercase text-xl mb-4">
              Cistara International FZE
            </motion.p>
            <div className="h-[120px] md:h-[160px] mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-display font-bold leading-tight"
                >
                  {heroHeadlines[headlineIndex].top}{" "}
                  <span className="gradient-gold-text">{heroHeadlines[headlineIndex].highlight}</span>
                </motion.h1>
              </AnimatePresence>
            </div>
            <motion.p variants={fadeUp} custom={2} className="text-2xl font-semibold font-serif  mb-8 italic">
              Excellence Meets Elegance
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="gradient-gold rounded-full px-8 py-3.5 font-semibold text-primary-foreground hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                View Products <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="rounded-full px-8 py-3.5 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
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
          className="text-xl font-medium  font-serif leading-relaxed"
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
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/products" className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center hover-lift p-6 rounded-xl bg-card border border-border"
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
    <section className="section-padding gradient-gold text-center">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4"
        >
          Ready to Elevate Your Hospitality Experience?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-primary-foreground/80 mb-8 text-lg"
        >
          Partner with Cistara for premium quality and exceptional service.
        </motion.p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-card text-foreground rounded-full px-8 py-3.5 font-semibold hover:scale-105 transition-transform"
        >
          Get in Touch <ArrowRight size={18} />
        </Link>
      </div>
    </section>
    </Layout>
  );
};

export default Index;
