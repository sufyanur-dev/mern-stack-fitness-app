import { Router } from "express";
import {
  registerMember,
  login,
  registerAdmin,
} from "../controllers/authController.js";

const router = Router();

// Public
router.post("/registerMember", registerMember); // member self-register
router.post("/login", login); // admin or member

router.post("/registerAdmin", registerAdmin);

export default router;
