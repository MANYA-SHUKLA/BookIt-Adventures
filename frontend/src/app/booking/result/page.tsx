'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './result.css';

interface BookingDetails {
  _id: string;
  userName: string;
  userEmail: string;
  selectedDate: string;
  numberOfSlots: number;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  bookingReference: string;
  experience: {
    title: string;
    location: string;
    duration: string;
    image: string;
  };
}

// Extracted out of render to satisfy lint rules and remove inline styles
function Confetti({ show = false, count = 80 }: { show?: boolean; count?: number }) {
  if (!show) return null;
  return (
    <div className="confetti-container">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="confetti-piece" />
      ))}
    </div>
  );
}

export default function BookingResult() {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // Read query params from window.location at runtime to avoid prerender-time
  // calls to next/navigation's useSearchParams which can cause build errors.
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  useEffect(() => {
    // parse query params on client runtime
    try {
      const params = new URLSearchParams(window.location.search);
      const successParam = params.get('success');
      const refParam = params.get('ref');
      setIsSuccess(successParam === 'true');
      setBookingRef(refParam);
    } catch (e) {
      // window might be undefined in some edge cases; defaults already set
    }

    if (isSuccess && bookingRef) {
      // In a real app, you'd fetch booking details from the API
      // For now, we'll simulate booking details
      const simulatedBooking: BookingDetails = {
        _id: '1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        selectedDate: new Date(Date.now() + 86400000).toISOString(),
        numberOfSlots: 2,
        totalAmount: 240,
        discountAmount: 24,
        finalAmount: 216,
        bookingReference: bookingRef,
        experience: {
          title: 'Sunset Cruise in Santorini',
          location: 'Santorini, Greece',
          duration: '4 hours',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500'
        }
      };

      setTimeout(() => {
        setBookingDetails(simulatedBooking);
        setLoading(false);
        if (isSuccess) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [isSuccess, bookingRef]);

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

  

  if (loading) {
    return (
      <div className="result-container loading-screen">
        <div className="loading-box">
          <div className="spinner" />
          <p className="loading-text text-shimmer">Finalizing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`result-container ${isSuccess ? 'success-gradient' : 'error-gradient'}`}>
      <Confetti show={showConfetti} count={80} />
      
      <div className="result-shell">
        {/* Result Card */}
        <div className={`result-card text-center ${
          isSuccess ? 'success-border bounce-in' : 'error-border bounce-in'
        }`}>
          
          {isSuccess ? (
            /* Success State */
            <div className="stagger-animation">
              <div className="emoji-hero celebrate-animation">
                🎉
              </div>
              
              <h1 className="result-title">
                Booking <span className="shimmer-text">Confirmed!</span>
              </h1>
              
              <p className="result-lead">
                Your adventure is officially booked! Get ready for an unforgettable experience. 
                We&apos;ve sent all the details to your email.
              </p>

              {/* Booking Reference */}
              <div className="booking-ref pulse-success booking-ref-wrap">
                <p className="booking-ref-label">Booking Reference</p>
                <p className="booking-ref-value">
                  {bookingDetails?.bookingReference}
                </p>
              </div>

              {bookingDetails && (
                <div className="details-group">
                  {/* Experience Summary */}
                  <div className="details-item">
                    <h3 className="section-title">
                      <span className="icon-left text-shimmer">🌟</span>
                      <span>Experience Summary</span>
                    </h3>
                    <div className="summary">
                      <div className="summary-image">
                        <Image
                          src={bookingDetails.experience.image}
                          alt={bookingDetails.experience.title}
                          fill
                          className="img-cover rounded-md"
                        />
                      </div>
                      <div className="summary-text">
                        <h4 className="summary-title">
                          {bookingDetails.experience.title}
                        </h4>
                        <div className="info-list">
                          <p className="info-line">
                            <span>📍</span>
                            <span>{bookingDetails.experience.location}</span>
                          </p>
                          <p className="info-line">
                            <span>⏱️</span>
                            <span>{bookingDetails.experience.duration}</span>
                          </p>
                          <p className="info-line">
                            <span>📅</span>
                            <span>{formatDate(bookingDetails.selectedDate)}</span>
                          </p>
                          <p className="info-line">
                            <span>👥</span>
                            <span>{bookingDetails.numberOfSlots} {bookingDetails.numberOfSlots === 1 ? 'person' : 'people'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="details-item">
                    <h3 className="section-title">
                      <span className="icon-left text-shimmer">💰</span>
                      <span>Payment Summary</span>
                    </h3>
                    <div className="price-list">
                      <div className="price-row">
                        <span className="price-label">Subtotal:</span>
                        <span className="price-value">{formatPrice(bookingDetails.totalAmount)}</span>
                      </div>
                      {bookingDetails.discountAmount > 0 && (
                        <div className="price-row">
                          <span className="price-label">Discount:</span>
                          <span className="price-discount">
                            -{formatPrice(bookingDetails.discountAmount)}
                          </span>
                        </div>
                      )}
                      <div className="divider" />
                      <div className="price-row price-total">
                        <span>Total Paid:</span>
                        <span className="text-shimmer">{formatPrice(bookingDetails.finalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="details-item">
                    <h3 className="section-title">
                      <span className="icon-left text-shimmer">📋</span>
                      <span>What&apos;s Next?</span>
                    </h3>
                    <div className="steps">
                      <div className="step">
                        <span className="step-badge bg-success">1</span>
                          1
                        <span>Check your email for booking confirmation and details</span>
                      </div>
                      <div className="step">
                        <span className="step-badge bg-primary">2</span>
                        <span>Arrive 15 minutes before your scheduled time</span>
                      </div>
                      <div className="step">
                        <span className="step-badge bg-purple">3</span>
                        <span>Bring your booking reference and ID</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="actions">
                <button
                  onClick={() => window.print()}
                  className="btn btn-ghost floating-action"
                >
                  <span>📄</span>
                  <span>Print Confirmation</span>
                </button>
                <Link
                  href="/"
                  className="btn btn-primary"
                >
                  <span>🏠</span>
                  <span>Explore More Experiences</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Error State */
            <div className="stagger-animation">
              <div className="emoji-hero bounce">
                😔
              </div>
              
              <h1 className="result-title">
                Booking <span className="text-error">Failed</span>
              </h1>
              
              <p className="result-lead">
                We encountered an issue while processing your booking. This could be due to 
                unavailable slots, payment issues, or system error.
              </p>

              {/* Error Details */}
              <div className="error-box">
                <div className="error-box-title">
                  <span>⚠️</span>
                  <span>Possible Reasons</span>
                </div>
                <ul className="error-list">
                  <li className="error-item">
                    <span>•</span>
                    <span>Selected slots are no longer available</span>
                  </li>
                  <li className="error-item">
                    <span>•</span>
                    <span>Payment authorization failed</span>
                  </li>
                  <li className="error-item">
                    <span>•</span>
                    <span>Network connectivity issues</span>
                  </li>
                  <li className="error-item">
                    <span>•</span>
                    <span>System maintenance in progress</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="actions actions-spaced">
                <button
                  onClick={() => router.back()}
                  className="btn btn-ghost"
                >
                  <span>↩️</span>
                  <span>Try Again</span>
                </button>
                <Link
                  href="/"
                  className="btn btn-primary"
                >
                  <span>🏠</span>
                  <span>Back to Safety</span>
                </Link>
              </div>

              {/* Support Info */}
              <div className="support-box">
                <p className="support-text">
                  Need help? Contact our support team at{' '}
                  <a href="mailto:support@bookit.com" className="support-link">
                    support@bookit.com
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="additional-info fade-in-up">
          <p>
            {isSuccess 
              ? 'Thank you for choosing BookIt for your adventure! 🌟'
              : 'We apologize for the inconvenience. Please try again or contact support.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}