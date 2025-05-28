import express from "express";
import { createEmail, deleteEmail, getAllEmailById } from "../controller/email.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/create").post(authMiddleware ,createEmail);
router.route("/delete/:id").delete(authMiddleware ,deleteEmail);
router.route("/getAll").get(authMiddleware ,getAllEmailById);

export default router;