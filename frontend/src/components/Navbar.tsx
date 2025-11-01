'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Logo - Left Aligned */}
          <Link 
            href="/" 
            className={styles.brandLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="data:image/jpeg;base64,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"
              alt="BookIt logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>BookIt</span>
              <span className={styles.brandSubtitle}>Adventures</span>
            </div>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className={styles.centerMenu}>
            <div className={styles.menu}>
              <Link href="/" className={styles.menuLink}>
                <span className={styles.menuItemContent}>
                  <span className={styles.emoji}>🏔️</span>
                  <span>Experiences</span>
                </span>
                <span className={styles.menuUnderline} />
              </Link>
              <Link href="/about" className={styles.menuLink}>
                <span className={styles.menuItemContent}>
                  <span className={styles.emoji}>👥</span>
                  <span>About</span>
                </span>
                <span className={styles.menuUnderline} />
              </Link>
              <Link href="/contact" className={styles.menuLink}>
                <span className={styles.menuItemContent}>
                  <span className={styles.emoji}>📞</span>
                  <span>Contact</span>
                </span>
                <span className={styles.menuUnderline} />
              </Link>
            </div>
          </div>

          {/* Desktop Right Side Placeholder (keeps center menu visually centered) */}
          <div className={styles.rightPlaceholder} aria-hidden="true"></div>

          {/* Tablet Menu */}
          <div className={styles.tabletMenu}>
            <Link href="/" className={styles.tabletLink}>
              <span className={styles.menuItemContent}>
                <span className={styles.emoji}>🏔️</span>
                <span>Experiences</span>
              </span>
            </Link>
            <Link href="/about" className={styles.tabletLink}>
              <span className={styles.menuItemContent}>
                <span className={styles.emoji}>👥</span>
                <span>About</span>
              </span>
            </Link>
            <Link href="/contact" className={styles.tabletLink}>
              <span className={styles.menuItemContent}>
                <span className={styles.emoji}>📞</span>
                <span>Contact</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileActions}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.menuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className={styles.bars}>
                <span className={`${styles.bar} ${isMenuOpen ? styles.barTopOpen : ''}`} />
                <span className={`${styles.bar} ${isMenuOpen ? styles.barMiddleOpen : ''}`} />
                <span className={`${styles.bar} ${isMenuOpen ? styles.barBottomOpen : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuInner}>
              <Link 
                href="/" 
                className={styles.mobileMenuLink}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles.mobileEmoji}>🏔️</span>
                <span>Experiences</span>
              </Link>
              
              <Link 
                href="/about" 
                className={styles.mobileMenuLink}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles.mobileEmoji}>👥</span>
                <span>About Us</span>
              </Link>
              
              <Link 
                href="/contact" 
                className={styles.mobileMenuLink}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles.mobileEmoji}>📞</span>
                <span>Contact</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;