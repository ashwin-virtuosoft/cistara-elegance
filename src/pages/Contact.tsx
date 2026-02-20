import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="pt-28 pb-8 section-padding bg-secondary/30">
        <div className="container mx-auto text-center max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Get in <span className="gradient-gold-text">Touch</span>
          </motion.h1>
          <p className="text-md font-medium leading-relaxed">
            We'd love to hear from you. Reach out to discuss how we can serve your establishment.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <a href="mailto:sales@cistara.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Mail size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">Email</p>
                      <p className="font-medium">sales@cistara.com</p>
                    </div>
                  </a>
                  <a href="tel:+971524955377" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Phone size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">Phone</p>
                      <p className="font-medium">+971 52 495 5377</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">Address</p>
                      <p className="font-medium">SPC Free Zone Business Center,<br />Sharjah Publishing City Free Zone,<br />Sharjah, United Arab Emirates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border h-48 lg:h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.4!2d55.45!3d25.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSharjah+Publishing+City+Free+Zone!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Cistara Location"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-md font-medium mb-2 block">Name</label>
                    <input
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-md font-medium mb-2 block">Email</label>
                    <input
                      required
                      type="email"
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-md font-medium mb-2 block">Subject</label>
                  <input
                    required
                    maxLength={200}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="text-md font-medium mb-2 block">Message</label>
                  <textarea
                    required
                    maxLength={2000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="gradient-gold rounded-full px-8 py-3.5 font-semibold text-primary-foreground hover:scale-105 transition-transform inline-flex items-center gap-2"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
