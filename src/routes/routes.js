import express from 'express';
import { createUser, userLogin } from '../controllers/userController.js';
import { createBook } from '../controllers/bookController.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/loginUser', userLogin);
router.post('/createBooks', createBook);

export default router;
