import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  listMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = Router();

router.use(protect, authorize("admin"));
router.get("/getAllMembers", listMembers);
router.post("/createMember", createMember);
router.put("/updateMember/:id", updateMember);
router.delete("/deleteMember/:id", deleteMember);

export default router;
