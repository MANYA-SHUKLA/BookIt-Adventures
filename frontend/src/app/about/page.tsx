"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop"
          alt="Ocean waves"
          fill
          priority
          className="about-hero-image"
        />
        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-hero-title"
          >
            We craft unforgettable journeys
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="about-hero-description"
          >
            BookIt connects curious travelers with curated experiences around the globe. Our mission is to make discovery effortless and delightful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="about-hero-buttons"
          >
            <Link href="/contact" className="about-btn-primary">
              Contact us
            </Link>
            <a
              href="#values"
              className="about-btn-secondary"
            >
              Our values
            </a>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section id="values" className="about-content">
        <div className="about-content-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-content-text"
          >
            <h2 className="about-section-title">Why BookIt</h2>
            <p className="about-section-description">
              We believe travel is more than ticking boxes. It's about stories, flavors, and people. Our team vets each experience for quality, safety, and local impact, so you can focus on the moment.
            </p>
            <ul className="about-features-list">
              <li className="about-feature-item"><span className="badge"/> Handpicked hosts and guides</li>
              <li className="about-feature-item"><span className="badge"/> Seamless booking and support</li>
              <li className="about-feature-item"><span className="badge"/> Fair pay for local communities</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="about-content-media"
          >
            <div className="about-media-container">
              <Image
                src="https://picsum.photos/seed/experiences/1200/900"
                alt="Travel collage"
                width={1200}
                height={900}
                className="about-media-image"
              />
              <div className="about-media-overlay" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="about-stats-grid"
        >
          {[
            { label: "Experiences", value: "1,200+" },
            { label: "Cities", value: "150+" },
            { label: "Avg. rating", value: "4.8/5" },
            { label: "Happy travelers", value: "250k+" },
          ].map((s) => (
            <div key={s.label} className="about-stat-card">
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}