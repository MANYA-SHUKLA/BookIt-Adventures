import express from 'express';
import Promo from '../models/Promo';

const router = express.Router();

// POST /api/promo/validate - Validate promo code
router.post('/validate', async (req, res): Promise<any> => {
  try {
    const { code, totalAmount } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Promo code is required' });
    }

    const promo = await Promo.findOne({ 
      code: code.toUpperCase(),
      isActive: true 
    });

    if (!promo) {
      return res.status(404).json({ message: 'Invalid promo code' });
    }

    // Check validity dates
    const now = new Date();
    if (now < promo.validFrom || now > promo.validUntil) {
      return res.status(400).json({ message: 'Promo code is expired' });
    }

    // Check usage limit
    if (promo.usedCount >= promo.usageLimit) {
      return res.status(400).json({ message: 'Promo code has reached usage limit' });
    }

    // Check minimum amount
    if (promo.minAmount && totalAmount < promo.minAmount) {
      return res.status(400).json({ 
        message: `Minimum amount of $${promo.minAmount} required for this promo` 
      });
    }

    let discountAmount = 0;

    if (promo.discountType === 'percentage') {
      discountAmount = (totalAmount * promo.discountValue) / 100;
      if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount;
      }
    } else {
      discountAmount = promo.discountValue;
    }

    res.json({
      valid: true,
      discountAmount,
      finalAmount: totalAmount - discountAmount,
      promo: {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error validating promo code', error });
  }
});

export default router;