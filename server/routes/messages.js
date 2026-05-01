import { Router } from 'express';
import Message from '../models/Message.js';

const router = Router();

// envoie un message du formulaire de contact
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// liste les messages reçus
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
