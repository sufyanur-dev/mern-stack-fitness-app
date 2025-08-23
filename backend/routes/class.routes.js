import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  listClasses,
  createClass,
  updateClass,
  deleteClass,
  selectClass,
  getClassById,
} from "../controllers/classController.js";

const router = Router();

router.get("/getAllClasses", protect, listClasses);
router.post("/createClass", protect, authorize("admin"), createClass);
router.put("/updateClass/:id", protect, authorize("admin"), updateClass);
router.delete("/deleteClass/:id", protect, authorize("admin"), deleteClass);

// Member action
router.get("/getClassById/:id", protect, authorize("member"), getClassById);
router.post("/select/:id", protect, authorize("member"), selectClass);

export default router;
