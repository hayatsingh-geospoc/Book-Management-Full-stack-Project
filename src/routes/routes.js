import express from 'express';
import { createUser, userLogin } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('Test');
});

router.post('/register', createUser);
router.post('/loginUser', userLogin);

export default router;
