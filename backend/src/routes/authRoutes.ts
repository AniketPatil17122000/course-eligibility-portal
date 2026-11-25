
import { Router } from "express";
import {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

//for testing JWT

router.get("/profile", verifyToken, getAdminProfile);


export default router;
