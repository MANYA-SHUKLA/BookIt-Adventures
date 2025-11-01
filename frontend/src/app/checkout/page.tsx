"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import './checkout.css';

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  location: string;
  duration: string;
}

interface FormData {
  userName: string;
  userEmail: string;
  userPhone: string;
  specialRequests: string;
}

interface PromoValidation {
  valid: boolean;
  discountAmount: number;
  finalAmount: number;
  promo?: {
    code: string;
    discountType: string;
    discountValue: number;
  };
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoValidation, setPromoValidation] = useState<PromoValidation | null>(null);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    userEmail: '',
    userPhone: '',
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const experienceId = searchParams.get('experience');
  const selectedDate = searchParams.get('date');
  const numberOfSlots = parseInt(searchParams.get('slots') || '1');

  useEffect(() => {
    const fetchExperience = async () => {
      if (!experienceId) {
        setError('No experience selected');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/experiences/${experienceId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch experience');
        }
        const data = await response.json();
        setExperience(data);
      } catch (err) {
        setError('Experience not found. Please try again.');
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [experienceId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.userName.trim()) {
      errors.userName = 'Name is required';
    }
    
    if (!formData.userEmail.trim()) {
      errors.userEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      errors.userEmail = 'Email is invalid';
    }
    
    if (!formData.userPhone.trim()) {
      errors.userPhone = 'Phone number is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validatePromoCode = async () => {
    if (!promoCode.trim() || !experience) return;

    setValidatingPromo(true);
    try {
      const response = await fetch(`${API_BASE}/api/promo/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: promoCode,
          totalAmount: experience.price * numberOfSlots
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPromoValidation(data);
      } else {
        setPromoValidation(null);
        setError(data.message || 'Invalid promo code');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Error validating promo code');
      setTimeout(() => setError(''), 3000);
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !experience || !selectedDate) {
      return;
    }

    setSubmitting(true);
    try {
      const bookingData = {
        experienceId: experience._id,
        ...formData,
        selectedDate,
        numberOfSlots,
        promoCode: promoValidation?.valid ? promoCode : undefined
      };

      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        router.push(`/booking/result?success=true&ref=${booking.bookingReference}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const basePrice = experience ? experience.price * numberOfSlots : 0;
  const discount = promoValidation?.discountAmount || 0;
  const finalPrice = basePrice - discount;

  if (loading) {
    return (
      <div className="checkout-loading-container">
        <div className="checkout-loading-content">
          <LoadingSpinner size="large" />
          <p className="checkout-loading-text">Preparing your booking...</p>
        </div>
      </div>
    );
  }

  if (error && !experience) {
    return (
      <div className="checkout-error-container">
        <div className="checkout-error-content">
          <div className="checkout-error-icon">😔</div>
          <h2 className="checkout-error-title">Booking Error</h2>
          <p className="checkout-error-message">{error}</p>
          <Link 
            href="/"
            className="checkout-error-button"
          >
            Back to Experiences
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-main-container">
      <div className="checkout-content-wrapper">
        {/* Header */}
        <div className="checkout-header">
          <Link 
            href={`/experience/${experience?._id}`}
            className="checkout-back-link"
          >
            <span className="checkout-back-arrow">←</span>
            <span className="checkout-back-text">Back to Experience</span>
          </Link>
          <h1 className="checkout-main-title">
            Complete Your <span className="checkout-title-highlight">Booking</span>
          </h1>
          <p className="checkout-subtitle">
            Almost there! Just a few details to finalize your adventure
          </p>
        </div>

        <div className="checkout-grid-layout">
          {/* Booking Form */}
          <div className="checkout-form-section">
            <h2 className="checkout-section-title">
              <span className="checkout-section-icon">👤</span>
              Your Information
            </h2>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="checkout-form-group">
                <div className="checkout-input-container">
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder=" "
                    className={`checkout-form-input ${
                      formErrors.userName ? 'checkout-input-error' : ''
                    }`}
                  />
                  <label className="checkout-form-label">Full Name *</label>
                </div>
                {formErrors.userName && (
                  <p className="checkout-error-message">
                    <span className="checkout-error-icon">⚠️</span> {formErrors.userName}
                  </p>
                )}
              </div>

              <div className="checkout-form-group">
                <div className="checkout-input-container">
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    placeholder=" "
                    className={`checkout-form-input ${
                      formErrors.userEmail ? 'checkout-input-error' : ''
                    }`}
                  />
                  <label className="checkout-form-label">Email Address *</label>
                </div>
                {formErrors.userEmail && (
                  <p className="checkout-error-message">
                    <span className="checkout-error-icon">⚠️</span> {formErrors.userEmail}
                  </p>
                )}
              </div>

              <div className="checkout-form-group">
                <div className="checkout-input-container">
                  <input
                    type="tel"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleInputChange}
                    placeholder=" "
                    className={`checkout-form-input ${
                      formErrors.userPhone ? 'checkout-input-error' : ''
                    }`}
                  />
                  <label className="checkout-form-label">Phone Number *</label>
                </div>
                {formErrors.userPhone && (
                  <p className="checkout-error-message">
                    <span className="checkout-error-icon">⚠️</span> {formErrors.userPhone}
                  </p>
                )}
              </div>

              <div className="checkout-form-group">
                <div className="checkout-input-container">
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requests or requirements?"
                    rows={5}
                    className="checkout-form-input checkout-textarea"
                  />
                </div>
              </div>

              {/* Promo Code */}
              <div className="checkout-promo-section">
                <h3 className="checkout-promo-title">
                  <span className="checkout-promo-icon">🎁</span>
                  Promo Code
                </h3>
                <div className="checkout-promo-input-group">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="checkout-promo-input"
                  />
                  <button
                    type="button"
                    onClick={validatePromoCode}
                    disabled={validatingPromo || !promoCode.trim()}
                    className="checkout-promo-button"
                  >
                    {validatingPromo ? (
                      <span className="checkout-promo-loading">
                        <LoadingSpinner size="small" />
                        <span className="checkout-promo-loading-text">Validating...</span>
                      </span>
                    ) : (
                      'Apply Code'
                    )}
                  </button>
                </div>
                {promoValidation?.valid && (
                  <div className="checkout-promo-success">
                    <p className="checkout-promo-success-text">
                      <span className="checkout-promo-success-icon">✅</span>
                      Promo code applied! Saved {formatPrice(promoValidation.discountAmount)}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="checkout-submit-button"
              >
                {submitting ? (
                  <div className="checkout-submit-loading">
                    <LoadingSpinner size="small" />
                    <span className="checkout-submit-loading-text">Processing Your Booking...</span>
                  </div>
                ) : (
                  `Confirm Booking - ${formatPrice(finalPrice)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          {experience && (
            <div className="checkout-summary-section">
              <h2 className="checkout-section-title">
                <span className="checkout-section-icon">📋</span>
                Order Summary
              </h2>

              {/* Experience Info */}
              <div className="checkout-experience-info">
                <div className="checkout-experience-image">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="checkout-image"
                    sizes="96px"
                  />
                </div>
                <div className="checkout-experience-details">
                  <h3 className="checkout-experience-title">{experience.title}</h3>
                  <p className="checkout-experience-location">
                    <span className="checkout-detail-icon">📍</span>
                    {experience.location}
                  </p>
                  <p className="checkout-experience-duration">
                    <span className="checkout-detail-icon">⏱️</span>
                    {experience.duration}
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="checkout-details-section">
                <div className="checkout-details-card">
                  <h4 className="checkout-details-title">Booking Details</h4>
                  <div className="checkout-details-list">
                    <div className="checkout-detail-item">
                      <span className="checkout-detail-label">Date:</span>
                      <span className="checkout-detail-value">
                        {selectedDate ? formatDate(selectedDate) : 'N/A'}
                      </span>
                    </div>
                    <div className="checkout-detail-item">
                      <span className="checkout-detail-label">Number of Slots:</span>
                      <span className="checkout-detail-value">{numberOfSlots}</span>
                    </div>
                    <div className="checkout-detail-item">
                      <span className="checkout-detail-label">Price per slot:</span>
                      <span className="checkout-detail-value">{formatPrice(experience.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="checkout-price-card">
                  <h4 className="checkout-price-title">Price Breakdown</h4>
                  <div className="checkout-price-list">
                    <div className="checkout-price-item">
                      <span className="checkout-price-label">Base Price:</span>
                      <span className="checkout-price-value">{formatPrice(basePrice)}</span>
                    </div>
                    
                    {experience.originalPrice && (
                      <div className="checkout-price-item">
                        <span className="checkout-price-label">Original Price:</span>
                        <span className="checkout-original-price">
                          {formatPrice(experience.originalPrice * numberOfSlots)}
                        </span>
                      </div>
                    )}

                    {promoValidation?.valid && (
                      <div className="checkout-price-item">
                        <span className="checkout-price-label">Promo Discount:</span>
                        <span className="checkout-discount-value">
                          -{formatPrice(discount)}
                        </span>
                      </div>
                    )}

                    <div className="checkout-total-section">
                      <div className="checkout-total-item">
                        <span className="checkout-total-label">Total Amount:</span>
                        <span className="checkout-total-value">{formatPrice(finalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="checkout-security-badge">
                <div className="checkout-security-header">
                  <span className="checkout-security-icon">🔒</span>
                  <span className="checkout-security-title">Secure Booking</span>
                </div>
                <p className="checkout-security-text">
                  Your personal and payment information is encrypted and secure
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="checkout-error-toast">
            <p className="checkout-error-toast-text">
              <span className="checkout-error-toast-icon">⚠️</span>
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense
      fallback={
        <div className="checkout-loading-container">
          <div className="checkout-loading-content">
            <LoadingSpinner size="large" />
            <p className="checkout-loading-text">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}