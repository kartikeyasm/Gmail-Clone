import express from 'express';
import { login, logout, register } from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.route('/signup').post(upload.single('avatar'),register);
router.route('/login').post(login);
router.route('/logout').get(authMiddleware ,logout);

export default router;