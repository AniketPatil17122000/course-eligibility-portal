
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import Admin from "../models/Admin";

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password, setupKey } = req.body;

        if (setupKey !== process.env.ADMIN_SETUP_KEY) {
            return res.status(403).json({
                success: false,
                message: "Invalid setup key",
            });
        }

        if (!email || !password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Valid email and password (minimum 8 characters) are required",
            });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "Admin already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
        });
    } catch (error) {
        console.error("Admin registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to register admin",
        });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { adminId: admin._id.toString() },
            process.env.JWT_SECRET as string,
            {
                expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"],
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                admin: {
                    id: admin._id,
                    email: admin.email,
                },
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to login",
        });
    }
};


export const getAdminProfile = async (
    req: Request,
    res: Response
) => {
    try {
        const admin = await Admin.findById(req.adminId).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin profile fetched successfully",
            data: admin,
        });

    } catch (error) {
        console.error("Admin profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch admin profile",
        });
    }
};
