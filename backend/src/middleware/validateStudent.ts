import { Request, Response, NextFunction } from "express";
import { COURSE_RULES } from "../services/eligibilityService";

export const validateStudent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        studentName,
        age,
        gender,
        subjects,
        jeeQualified,
        neetQualified,
        courseCategory,
        desiredCourse,
    } = req.body;

    const errors: string[] = [];

    if (!studentName || !/^[a-zA-Z ]+$/.test(studentName.trim())) {
        errors.push("Student name must contain only alphabets and spaces.");
    }

    if (!Number.isInteger(age) || age < 17 || age > 25) {
        errors.push("Age must be between 17 and 25.");
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
        errors.push("Invalid gender selected.");
    }

    if (!Array.isArray(subjects) || subjects.length !== 6) {
        errors.push("Exactly 6 subjects are required.");
    } else {
        subjects.forEach((item, index) => {
            if (!item.subject || typeof item.subject !== "string") {
                errors.push(`Subject name is required at position ${index + 1}.`);
            }

            if (
                typeof item.marks !== "number" ||
                item.marks < 0 ||
                item.marks > 100
            ) {
                errors.push(`Marks must be between 0 and 100 at position ${index + 1}.`);
            }
        });
    }

    if (jeeQualified !== null && typeof jeeQualified !== "boolean") {
        errors.push("Invalid JEE qualification status.");
    }

    if (neetQualified !== null && typeof neetQualified !== "boolean") {
        errors.push("Invalid NEET qualification status.");
    }

   const validCourse = COURSE_RULES.find(
    (course) =>
        course.category === courseCategory &&
        course.name === desiredCourse
);

if (!validCourse) {
    errors.push("Invalid course selected.");
}

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors,
        });
    }

    next();
};