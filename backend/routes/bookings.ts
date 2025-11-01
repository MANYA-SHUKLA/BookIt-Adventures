import express from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/', async (req, res): Promise<any> => {
  try {
    const {
      experienceId,
      userName,
      userEmail,
      userPhone,
      selectedDate,
      numberOfSlots,
      promoCode
    } = req.body;

    // Validate required fields
    if (!experienceId || !userName || !userEmail || !userPhone || !selectedDate || !numberOfSlots) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Find the specific slot
    const slot = experience.slots.find(s => 
      new Date(s.date).toDateString() === new Date(selectedDate).toDateString()
    );

    if (!slot) {
      return res.status(400).json({ message: 'Selected date not available' });
    }

    if (slot.available < numberOfSlots) {
      return res.status(400).json({ message: 'Not enough slots available' });
    }

    // Calculate total amount
    const totalAmount = experience.price * numberOfSlots;
    let discountAmount = 0;
    let finalAmount = totalAmount;

    // Generate booking reference
    const bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

    // Create booking
    const booking = new Booking({
      experienceId,
      userName,
      userEmail,
      userPhone,
      selectedDate,
      numberOfSlots,
      totalAmount,
      discountAmount,
      finalAmount,
      promoCode,
      bookingReference
    });

    const savedBooking = await booking.save();

    // Update available slots
    slot.available -= numberOfSlots;
    await experience.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Error creating booking', error });
  }
});

export default router;