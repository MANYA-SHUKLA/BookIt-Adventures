"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./contact.css";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.5 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ContactPage() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    console.log(Object.fromEntries(data));
    form.reset();
    alert("Thanks! We'll get back to you soon.");
  };

  return (
    <div className="contact-page">
      <section className="contact-hero relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1920&auto=format&fit=crop"
          alt="City at dusk"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/75" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-24 lg:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold gradient-text-animated text-center heading-tight"
          >
            Let's plan your next adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-gray-300 text-lg max-w-2xl mx-auto text-center"
          >
            Have a question about an experience or a custom trip in mind? Send us a message.
          </motion.p>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.form
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              onSubmit={onSubmit}
              className="card-elevated p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={item}>
                  <label className="label" htmlFor="name">Full name</label>
                  <input id="name" name="name" required placeholder="Alex Traveler" className="input" />
                </motion.div>
                <motion.div variants={item}>
                  <label className="label" htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" required placeholder="alex@email.com" className="input" />
                </motion.div>
                <motion.div variants={item} className="sm:col-span-2">
                  <label className="label" htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" placeholder="Booking help or custom request" className="input" />
                </motion.div>
                <motion.div variants={item} className="sm:col-span-2">
                  <label className="label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="Tell us a bit about your plans..." className="textarea" />
                </motion.div>
              </div>
              <motion.div variants={item} className="mt-6 flex items-center justify-between gap-4">
                <button type="submit" className="btn-gradient px-6 py-3 rounded-xl font-semibold shadow-lg">Send message</button>
                <p className="text-sm text-gray-400">We reply within 24 hours on business days.</p>
              </motion.div>
            </motion.form>

            {/* Side panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-elevated relative min-h-[320px] overflow-hidden p-0"
            >
              <Image
                src="https://picsum.photos/seed/contact/1200/900"
                alt="Traveler"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/40" />
              <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                <div className="backdrop-blur-strong max-w-md rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="gradient-text mb-2 text-xl font-semibold">Real people, real support</h3>
                  <p className="text-sm text-gray-300">
                    Our travel concierges are explorers at heart. We'll help you pick and book experiences you'll love.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}