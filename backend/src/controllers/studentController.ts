import { Request, Response } from "express";
import Student from "../models/Student";

import { checkEligibility } from "../services/eligibilityService";
import { StudentInput } from "../interfaces/StudentInterface";

export const checkStudentEligibility = async (
    req: Request,
    res: Response
) => {
    try {
        const studentData: StudentInput = req.body as StudentInput;

        const result = checkEligibility(studentData);

        const student = await Student.create({
            ...studentData,
            ...result,
        });

        res.status(201).json({
            success: true,
            message: "Eligibility checked successfully",
            data: {
                student,
                result,
            },
        });
    } catch (error) {
        console.error("Eligibility check error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to check student eligibility",
        });
    }
};

export const getStudentHistory = async (
    req: Request,
    res: Response
) => {
    try {
        const students = await Student.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Student history fetched successfully",
            data: students,
        });
    } catch (error) {
        console.error("Student history error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch student history",
        });
    }
};