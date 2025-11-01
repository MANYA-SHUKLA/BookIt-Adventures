import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';
import Promo from './models/Promo';
import connectDB from './config/database';

dotenv.config();

const sampleExperiences = [
  {
    title: "Sunset Cruise in Santorini",
    description: "Experience the breathtaking sunset views of Santorini from a luxury catamaran. Includes dinner and drinks.",
    price: 120,
    originalPrice: 150,
    image: "https://www.greece-is.com/wp-content/uploads/2017/06/DJI_0258-neo.jpg",
    location: "Santorini, Greece",
    duration: "4 hours",
    category: "Cruise",
    rating: 4.8,
    reviewCount: 142,
    slots: [
      { date: new Date(Date.now() + 86400000), available: 8, maxCapacity: 20 },
      { date: new Date(Date.now() + 172800000), available: 15, maxCapacity: 20 },
      { date: new Date(Date.now() + 259200000), available: 12, maxCapacity: 20 }
    ]
  },
  {
    title: "Northern Lights Adventure",
    description: "Chase the magical Northern Lights in the Arctic wilderness with expert guides and professional photography.",
    price: 200,
    originalPrice: 250,
    image: "https://cdn.tourradar.com/s3/content-pages/452/680x496/89SqbA.jpg",
    location: "Tromsø, Norway",
    duration: "6 hours",
    category: "Adventure",
    rating: 4.9,
    reviewCount: 89,
    slots: [
      { date: new Date(Date.now() + 86400000), available: 5, maxCapacity: 12 },
      { date: new Date(Date.now() + 172800000), available: 8, maxCapacity: 12 },
      { date: new Date(Date.now() + 345600000), available: 3, maxCapacity: 12 }
    ]
  },
  {
    title: "Tokyo Food Tour",
    description: "Explore Tokyo's hidden culinary gems with a local guide. Taste authentic sushi, ramen, and street food.",
    price: 85,
    originalPrice: 100,
    image: "https://images.arigatotravel.com/wp-content/uploads/2014/10/06004435/allstar-top-foodtour.jpg",
    location: "Tokyo, Japan",
    duration: "3 hours",
    category: "Food",
    rating: 4.7,
    reviewCount: 203,
    slots: [
      { date: new Date(Date.now() + 86400000), available: 10, maxCapacity: 15 },
      { date: new Date(Date.now() + 172800000), available: 7, maxCapacity: 15 },
      { date: new Date(Date.now() + 259200000), available: 12, maxCapacity: 15 }
    ]
  },
  {
    title: "Bali Waterfall Trekking",
    description: "Discover hidden waterfalls in the jungles of Bali. Includes swimming, photography, and traditional lunch.",
    price: 65,
    originalPrice: 80,
    image: "https://www.justgotravelling.com/wp-content/uploads/2019/02/sekumpul-waterfall-bali-best-waterfall-munduk.jpg",
    location: "Ubud, Bali",
    duration: "5 hours",
    category: "Adventure",
    rating: 4.6,
    reviewCount: 167,
    slots: [
      { date: new Date(Date.now() + 86400000), available: 6, maxCapacity: 10 },
      { date: new Date(Date.now() + 172800000), available: 4, maxCapacity: 10 },
      { date: new Date(Date.now() + 259200000), available: 8, maxCapacity: 10 }
    ]
  },
  {
    title: "Paris Night Bike Tour",
    description: "Cycle through illuminated Paris landmarks including Eiffel Tower, Louvre, and Notre-Dame with a local guide.",
    price: 45,
    originalPrice: 55,
    image: "https://i.ytimg.com/vi/4po3K896X1U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAS_FdAAd9Wh0J26sU9RPFh9LCxsg",
    location: "Paris, France",
    duration: "2.5 hours",
    category: "City Tour",
    rating: 4.5,
    reviewCount: 298,
    slots: [
      { date: new Date(Date.now() + 86400000), available: 20, maxCapacity: 25 },
      { date: new Date(Date.now() + 172800000), available: 15, maxCapacity: 25 },
      { date: new Date(Date.now() + 259200000), available: 18, maxCapacity: 25 }
    ]
  },
  {
    title: "Great Barrier Reef Snorkeling",
    description: "Explore the world's largest coral reef system. Includes equipment, guide, and lunch on the boat.",
    price: 150,
    originalPrice: 180,
    image: "https://i.ytimg.com/vi/AR1cSKxxSmU/maxresdefault.jpg",
    location: "Cairns, Australia",
    duration: "7 hours",
    category: "Water Sports",
    rating: 4.9,
    reviewCount: 124,
    slots: [
      { date: new Date(Date.now() + 86400000), available: 12, maxCapacity: 20 },
      { date: new Date(Date.now() + 172800000), available: 8, maxCapacity: 20 },
      { date: new Date(Date.now() + 259200000), available: 15, maxCapacity: 20 }
    ]
  }
];

const samplePromos = [
  {
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
    minAmount: 50,
    maxDiscount: 50,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    usageLimit: 100,
    usedCount: 0,
    isActive: true
  },
  {
    code: "FLAT100",
    discountType: "fixed",
    discountValue: 100,
    minAmount: 200,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    usageLimit: 50,
    usedCount: 0,
    isActive: true
  },
  {
    code: "WELCOME20",
    discountType: "percentage",
    discountValue: 20,
    minAmount: 100,
    maxDiscount: 80,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    usageLimit: 200,
    usedCount: 0,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Experience.deleteMany({});
    await Promo.deleteMany({});
    
    // Insert sample data
    await Experience.insertMany(sampleExperiences);
    await Promo.insertMany(samplePromos);
    
    console.log('Database seeded successfully!');
    console.log(`Added ${sampleExperiences.length} experiences and ${samplePromos.length} promo codes`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();