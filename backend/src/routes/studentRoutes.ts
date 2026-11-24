import { Router } from "express";
import {
    checkStudentEligibility,
    getStudentHistory,
} from "../controllers/studentController";
import { validateStudent } from "../middleware/validateStudent";

const router = Router();

router.post(
    "/check-eligibility",
    validateStudent,
    checkStudentEligibility
);

router.get("/history", getStudentHistory);

export default router;