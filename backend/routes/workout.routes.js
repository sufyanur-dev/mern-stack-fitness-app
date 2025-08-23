import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import upload from "../utils/multerConfig.js";
import {
  uploadPlan,
  getMyPlans,
  getPlansByMember,
} from "../controllers/workoutController.js";

const router = Router();

// Admin uploads PDF to a member
router.post(
  "/upload/:memberId",
  protect,
  authorize("admin"),
  upload.single("pdf"),
  uploadPlan
);

// Member views own plans
router.get("/mine", protect, authorize("member"), getMyPlans);

// Admin views a member's plans
router.get("/member/:memberId", protect, authorize("admin"), getPlansByMember);

export default router;
