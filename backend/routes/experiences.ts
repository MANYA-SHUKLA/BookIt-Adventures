import express from 'express';
import Experience from '../models/Experience';

const router = express.Router();

// GET /api/experiences - Get all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error });
  }
});

// GET /api/experiences/:id - Get experience by ID
router.get('/:id', async (req, res): Promise<any> => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience', error });
  }
});

export default router;