import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('Test');
});

router.post('/register', createUser);

export default router;
