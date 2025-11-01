'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import './home.css';

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  location: string;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
  slots: Array<{
    date: string;
    available: number;
    maxCapacity: number;
  }>;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/experiences`);
        if (!response.ok) {
          throw new Error('Failed to fetch experiences');
        }
        const data = await response.json();
        setExperiences(data);
      } catch (err) {
        setError('Error loading experiences. Please try again later.');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [API_BASE]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="home-loading-container">
        <div className="home-loading-content">
          <LoadingSpinner size="large" />
          <p className="home-loading-text">Loading amazing experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error-container">
        <div className="home-error-content">
          <div className="home-error-icon">⚠️</div>
          <p className="home-error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="home-retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-background">
          <div className="home-hero-image" />
          <div className="home-hero-overlay" />
          <div className="home-hero-animation" />
        </div>

        <div className="home-hero-content">
          <div className="home-hero-badge">
            <span className="home-badge-text">✨ Your Adventure Awaits</span>
          </div>

          <h1 className="home-hero-title">
            <span className="home-hero-title-line">Discover</span>
            <span className="home-hero-title-highlight">Extraordinary</span>
            <span className="home-hero-title-line">Travel Experiences</span>
          </h1>

          <p className="home-hero-description">
            Embark on <span className="home-hero-accent">unforgettable adventures</span> with curated experiences from around the world.
            <br className="home-hero-break" />
            Your next great story starts <span className="home-hero-accent-secondary">here</span>.
          </p>

          <div className="home-hero-buttons">
            <Link 
              href="#experiences"
              className="home-primary-button"
            >
              <span className="home-button-content">
                <span>🚀</span>
                Explore Experiences
                <span className="home-button-arrow">→</span>
              </span>
              <div className="home-button-hover" />
            </Link>
            
            <Link href="/about" className="home-secondary-button">
              <span className="home-button-content">
                <span>📚</span>
                Learn More
                <span className="home-button-arrow">→</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="home-hero-background-elements">
          <div className="home-hero-element home-hero-element-1" />
          <div className="home-hero-element home-hero-element-2" />
          <div className="home-hero-element home-hero-element-3" />
          <div className="home-hero-element home-hero-element-4" />
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="home-experiences-section">
        <div className="home-section-background" />

        <div className="home-section-content">
          <div className="home-section-header">
            <div className="home-section-badge">
              <span className="home-badge-text">✨ Curated Just For You</span>
            </div>
            <h2 className="home-section-title">
              Featured <span className="home-section-title-highlight">Experiences</span>
            </h2>
            <p className="home-section-description">
              Handpicked adventures that will create <span className="home-description-accent">memories</span> to last a lifetime
            </p>
          </div>

          <div className="home-experiences-grid">
            {experiences.map((experience, index) => (
              <div
                key={experience._id}
                className="home-experience-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="home-card-glow" />
                
                <div className="home-card-content">
                  <div className="home-card-image">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="home-image"
                    />
                    
                    <div className="home-image-overlay" />
                    <div className="home-image-hover-overlay" />
                    
                    <div className="home-image-border" />
                    
                    <div className="home-card-badges">
                      <span className="home-category-badge">
                        ✨ {experience.category}
                      </span>
                      {experience.originalPrice && (
                        <span className="home-discount-badge">
                          💰 Save {formatPrice(experience.originalPrice - experience.price)}
                        </span>
                      )}
                    </div>
                    
                    <div className="home-view-overlay">
                      <span className="home-view-text">
                        👁️ View Details
                      </span>
                    </div>
                  </div>

                  <div className="home-card-details">
                    <div className="home-card-header">
                      <h3 className="home-experience-title">{experience.title}</h3>
                      <div className="home-price-section">
                        <div className="home-current-price">
                          {formatPrice(experience.price)}
                        </div>
                        {experience.originalPrice && (
                          <div className="home-original-price">
                            {formatPrice(experience.originalPrice)}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="home-experience-description">
                      {experience.description}
                    </p>

                    <div className="home-experience-meta">
                      <div className="home-rating-badge">
                        <span className="home-rating-icon">⭐</span>
                        <span className="home-rating-value">{experience.rating}</span>
                        <span className="home-review-count">({experience.reviewCount})</span>
                      </div>
                      <div className="home-details-badges">
                        <span className="home-location-badge">
                          <span className="home-detail-icon">📍</span>
                          <span className="home-detail-text">{experience.location}</span>
                        </span>
                        <span className="home-duration-badge">
                          <span className="home-detail-icon">⏱️</span>
                          <span className="home-detail-text">{experience.duration}</span>
                        </span>
                      </div>
                    </div>

                    <div className="home-slots-section">
                      {experience.slots.slice(0, 2).map((slot, idx) => (
                        <div key={idx} className="home-slot-item">
                          <span className="home-slot-date">📅 {formatDate(slot.date)}</span>
                          <span className={`home-slot-availability ${
                            slot.available > 5 
                              ? 'home-slot-available'
                              : slot.available > 0
                              ? 'home-slot-limited'
                              : 'home-slot-soldout'
                          }`}>
                            {slot.available > 0 ? `✅ ${slot.available} slots` : '❌ Sold out'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/experience/${experience._id}`}
                      className="home-details-button"
                    >
                      <span className="home-button-content">
                        <span>View Details</span>
                        <span className="home-button-arrow">→</span>
                      </span>
                      <div className="home-button-hover" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features-section">
        <div className="home-features-background">
          <div className="home-features-image" />
          <div className="home-features-overlay" />
        </div>

        <div className="home-section-content">
          <div className="home-section-header">
            <div className="home-section-badge">
              <span className="home-badge-text">🌟 Premium Benefits</span>
            </div>
            <h2 className="home-section-title">
              Why Choose <span className="home-section-title-highlight">BookIt</span>
            </h2>
            <p className="home-section-description">
              We're committed to making your travel experiences <span className="home-description-accent">extraordinary</span>
            </p>
          </div>

          <div className="home-features-grid">
            {[
              {
                icon: '🔒',
                title: 'Secure Booking',
                description: 'Your bookings are safe with our secure payment system and customer protection.',
                colorClass: 'home-feature-blue'
              },
              {
                icon: '⭐',
                title: 'Curated Experiences',
                description: 'Every experience is carefully selected to ensure quality and unforgettable memories.',
                colorClass: 'home-feature-purple'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Our travel experts are available around the clock to assist you.',
                colorClass: 'home-feature-orange'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="home-feature-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`home-feature-glow ${feature.colorClass}`} />
                
                <div className={`home-feature-content ${feature.colorClass}`}>
                  <div className="home-feature-icon">
                    <div className="home-icon-background" />
                    <div className="home-icon-content">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="home-feature-title">
                    {feature.title}
                  </h3>
                  
                  <p className="home-feature-description">
                    {feature.description}
                  </p>

                  <div className="home-feature-decoration home-feature-corner-1" />
                  <div className="home-feature-decoration home-feature-corner-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-features-particles">
          <div className="home-particle home-particle-1" />
          <div className="home-particle home-particle-2" />
          <div className="home-particle home-particle-3" />
        </div>
      </section>
    </div>
  );
}