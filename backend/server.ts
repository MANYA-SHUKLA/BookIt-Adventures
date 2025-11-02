import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Route imports
import experienceRoutes from './routes/experiences';
import bookingRoutes from './routes/bookings';
import promoRoutes from './routes/promo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware

app.use(cors({
  origin: ['http://localhost:3000', 'https://book-it-adventures.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'BookIt API is running!' });
});
app.get('/', (req, res) => {
  res.send('Welcome to BookIt Adventures API 🚀 built by MANYA SHUKLA');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});