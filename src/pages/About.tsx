import { motion } from "framer-motion";
import { Heart, Users, Leaf, Target, Eye, Handshake } from "lucide-react";
import Layout from "@/components/Layout";

const values = [
  { icon: Heart, title: "Customer First", desc: "Our customers are always at the forefront of our minds. We deliver true value for money." },
  { icon: Handshake, title: "Can-Do Attitude", desc: "We approach all interactions with a professional and friendly attitude, acting responsibly." },
  { icon: Target, title: "Proactive Thinking", desc: "We think proactively, communicate honestly, and understand the needs of your guests." },
];

const pillars = [
  { icon: Eye, title: "Why Cistara", items: ["Unmatched value for money", "Industry-leading service benchmarks", "Dedicated customer support"] },
  { icon: Users, title: "Our Team", items: ["Seasoned hospitality experts", "Knowledgeable supply partners", "Professional & responsive"] },
  { icon: Leaf, title: "Sustainability", items: ["Waste reduction initiatives", "Eco-friendly product lines", "Environmental responsibility"] },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-28 pb-16 section-padding bg-secondary/30">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-medium tracking-widest uppercase text-sm mb-4"
        >
          About Cistara
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold mb-6"
        >
          Excellence Meets <span className="gradient-gold-text">Elegance</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base font-serif leading-relaxed"
        >
          At Cistara, our customers are always at the forefront of our minds. We've taken our years
          of experience in the hospitality industry and shaped it into an enterprise that actively
          listens to our clients and understands the needs and desires of your guests.
        </motion.p>
      </div>
    </section>

    {/* Vision */}
    <section className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Our Vision</h2>
          <p className="text-base font-serif leading-relaxed italic">
            "To become a trusted supplier of quality-driven, complete solutions for upscale hotels,
            fine dining restaurants, and catering sectors — combining practical excellence with
            luxurious comfort under one roof."
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-display font-bold text-center mb-12">
          Our <span className="gradient-gold-text">Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 text-center hover-lift"
            >
              <div className="w-14 h-14 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <v.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{v.title}</h3>
              <p className="text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Pillars */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-xl border border-border"
            >
              <p.icon size={32} className="text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-4">{p.title}</h3>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
