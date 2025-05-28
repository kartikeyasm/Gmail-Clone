import express from 'express';
import { login, logout, register } from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/signup').post(register);
router.route('/login').post(login);
router.route('/logout').get(authMiddleware ,logout);

export default router;