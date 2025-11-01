'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import './experience.css';

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

interface SelectedSlot {
  date: string;
  available: number;
  maxCapacity: number;
  numberOfSlots: number;
}

export default function ExperienceDetail() {
  const params = useParams();
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [numberOfSlots, setNumberOfSlots] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/experiences/${params.id}`);
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

    if (params.id) {
      fetchExperience();
    }
  }, [params.id]);

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

  const getAvailabilityClass = (available: number, maxCapacity: number) => {
    const percentage = (available / maxCapacity) * 100;
    if (percentage > 50) return 'availability-high';
    if (percentage > 20) return 'availability-medium';
    return 'availability-low';
  };

  const getAvailabilityText = (available: number) => {
    if (available > 10) return 'Plenty available';
    if (available > 5) return 'Limited spots';
    if (available > 0) return 'Almost gone';
    return 'Sold out';
  };

  const handleSlotSelect = (slot: SelectedSlot) => {
    setSelectedSlot(slot);
    setNumberOfSlots(1);
  };

  const handleBookNow = () => {
    if (!selectedSlot) return;
    router.push(`/checkout?experience=${experience?._id}&date=${selectedSlot.date}&slots=${numberOfSlots}`);
  };

  const totalPrice = experience ? experience.price * numberOfSlots : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center experience-hero">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-300 text-shimmer">Loading experience details...</p>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex items-center justify-center experience-hero">
        <div className="text-center glass-effect p-8 rounded-2xl max-w-md mx-4">
          <div className="text-6xl mb-4 bounce-gentle">😔</div>
          <h2 className="text-2xl font-bold text-white mb-4">Experience Not Found</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Back to Experiences
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="experience-hero py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-6 sm:mb-8 lg:mb-10 group px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="text-sm sm:text-base">Back to Experiences</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start px-4 sm:px-0">
            {/* Image Gallery */}
            <div className="image-gallery rounded-2xl">
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] xl:h-[550px]">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass-effect backdrop-blur-sm rounded-full text-sm sm:text-base text-white font-semibold border border-white/20">
                    {experience.category}
                  </span>
                </div>
                {experience.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-sm sm:text-base text-white font-semibold shadow-lg">
                      Save {formatPrice(experience.originalPrice - experience.price)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="details-card rounded-2xl p-6 sm:p-8 lg:p-10 slide-in-from-right">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight flex-1">
                  {experience.title}
                </h1>
                <div className="text-left sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {formatPrice(experience.price)}
                  </div>
                  {experience.originalPrice && (
                    <div className="text-base sm:text-lg text-gray-400 line-through">
                      {formatPrice(experience.originalPrice)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-lg">⭐</span>
                  <span className="font-semibold text-white">{experience.rating}</span>
                  <span>({experience.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 text-lg">📍</span>
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-lg">⏱️</span>
                  <span>{experience.duration}</span>
                </div>
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {experience.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { icon: '🚀', text: 'Expert Guides' },
                  { icon: '🍽️', text: 'Meals Included' },
                  { icon: '📸', text: 'Photo Opportunities' },
                  { icon: '🎯', text: 'All Skill Levels' }
                ].map((feature, index) => (
                  <div key={index} className="feature-item rounded-lg p-3 sm:p-4 flex items-center space-x-3">
                    <span className="text-xl sm:text-2xl">{feature.icon}</span>
                    <span className="text-gray-300 font-medium text-sm sm:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-800/0 to-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Available Slots */}
            <div className="lg:col-span-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                <span className="text-shimmer mr-3">📅</span>
                Available Dates & Slots
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {experience.slots.map((slot, index) => {
                  const slotData: SelectedSlot = {
                    ...slot,
                    numberOfSlots: 1
                  };
                  const isSelected = selectedSlot?.date === slot.date;
                  const availabilityClass = getAvailabilityClass(slot.available, slot.maxCapacity);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => slot.available > 0 && handleSlotSelect(slotData)}
                      className={`slot-card rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
                        availabilityClass
                      } ${isSelected ? 'selected pulse-soft' : ''} ${
                        slot.available === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3">
                        <h3 className="text-base sm:text-lg font-semibold text-white">
                          {formatDate(slot.date)}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          slot.available > 10 
                            ? 'bg-green-500/20 text-green-300'
                            : slot.available > 5
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : slot.available > 0
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {slot.available > 0 ? `${slot.available} available` : 'Sold out'}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {getAvailabilityText(slot.available)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Max capacity: {slot.maxCapacity} people
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="booking-sticky rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-6 text-center">
                Book Your Experience
              </h3>

              {selectedSlot ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* Slot Selection */}
                  <div>
                    <label className="block text-gray-300 text-sm sm:text-base font-medium mb-3">
                      Number of Slots
                    </label>
                    <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setNumberOfSlots(Math.max(1, numberOfSlots - 1))}
                          disabled={numberOfSlots <= 1}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center quantity-button"
                        >
                          <span className="text-white text-lg font-bold">-</span>
                        </button>
                        <span className="text-white font-bold text-lg sm:text-xl min-w-8 text-center">
                          {numberOfSlots}
                        </span>
                        <button
                          onClick={() => setNumberOfSlots(Math.min(selectedSlot.available, numberOfSlots + 1))}
                          disabled={numberOfSlots >= selectedSlot.available}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center quantity-button"
                        >
                          <span className="text-white text-lg font-bold">+</span>
                        </button>
                      </div>
                      <span className="text-gray-400 text-sm ml-2">
                        Max: {selectedSlot.available}
                      </span>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="price-breakdown rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-gray-300 text-sm sm:text-base">
                      <span>{numberOfSlots} × {formatPrice(experience.price)}</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    {experience.originalPrice && (
                      <div className="flex justify-between text-green-400 font-semibold text-sm sm:text-base">
                        <span>You save</span>
                        <span>
                          {formatPrice((experience.originalPrice - experience.price) * numberOfSlots)}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between text-white font-bold text-base sm:text-lg">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookNow}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg"
                  >
                    Book Now
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-5xl mb-4 text-gray-500">📅</div>
                  <p className="text-gray-400 text-base sm:text-lg">
                    Select a date to continue with booking
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}