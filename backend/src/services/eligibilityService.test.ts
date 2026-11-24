
import { describe, it, expect } from "vitest";
import { checkEligibility } from "./eligibilityService";
import type { StudentInput } from "../interfaces/StudentInterface";

const createStudent = (
    overrides: Partial<StudentInput> = {}
): StudentInput => ({
    studentName: "Rahul Sharma",
    age: 20,
    gender: "Male",
    subjects: [
        { subject: "Physics", marks: 80 },
        { subject: "Chemistry", marks: 80 },
        { subject: "Mathematics", marks: 80 },
        { subject: "Biology", marks: 80 },
        { subject: "English", marks: 80 },
        { subject: "Accountancy", marks: 80 },
    ],
    jeeQualified: true,
    neetQualified: true,
    courseCategory: "Engineering",
    desiredCourse: "Computer Science Engineering",
    ...overrides,
});

describe("Eligibility Service Tests", () => {

    it("should approve an eligible Engineering student", () => {
        const result = checkEligibility(createStudent());

        expect(result.isEligible).toBe(true);
        expect(result.averageMarks).toBe(80);
    });

    it("should reject Engineering student below cutoff", () => {
        const result = checkEligibility(
            createStudent({
                subjects: [
                    { subject: "Physics", marks: 70 },
                    { subject: "Chemistry", marks: 70 },
                    { subject: "Mathematics", marks: 70 },
                ],
            })
        );

        expect(result.isEligible).toBe(false);
        expect(result.reason).toContain("Required average is 75%");
    });

    it("should reject student who has not qualified JEE", () => {
        const result = checkEligibility(
            createStudent({ jeeQualified: false })
        );

        expect(result.isEligible).toBe(false);
        expect(result.reason).toContain("JEE qualification is required");
    });

it("should approve an eligible Medicine student", () => {
    const result = checkEligibility(
        createStudent({
            courseCategory: "Medicine",
            desiredCourse: "MBBS",
            subjects: [
                { subject: "Physics", marks: 90 },
                { subject: "Chemistry", marks: 90 },
                { subject: "Biology", marks: 90 },
            ],
        })
    );

    expect(result.isEligible).toBe(true);
    expect(result.averageMarks).toBe(90);
});

    it("should reject student who has not qualified NEET", () => {
        const result = checkEligibility(
            createStudent({
                courseCategory: "Medicine",
                desiredCourse: "MBBS",
                neetQualified: false,
            })
        );

        expect(result.isEligible).toBe(false);
        expect(result.reason).toContain("NEET qualification is required");
    });

    it("should approve an eligible Commerce student", () => {
        const result = checkEligibility(
            createStudent({
                courseCategory: "Commerce",
                desiredCourse: "B.Com",
                subjects: [
                    { subject: "Accountancy", marks: 80 },
                    { subject: "Business Studies", marks: 75 },
                    { subject: "Economics", marks: 85 },
                ],
            })
        );

        expect(result.isEligible).toBe(true);
        expect(result.averageMarks).toBe(80);
    });

    it("should approve an eligible Humanities student", () => {
        const result = checkEligibility(
            createStudent({
                courseCategory: "Humanities",
                desiredCourse: "BA in History",
                subjects: [
                    { subject: "History", marks: 80 },
                    { subject: "Political Science", marks: 75 },
                    { subject: "Geography", marks: 85 },
                ],
            })
        );

        expect(result.isEligible).toBe(true);
        expect(result.averageMarks).toBe(80);
    });

    it("should reject when a required subject is missing", () => {
        const result = checkEligibility(
            createStudent({
                subjects: [
                    { subject: "Physics", marks: 80 },
                    { subject: "Chemistry", marks: 80 },
                    { subject: "Biology", marks: 80 },
                ],
            })
        );

        expect(result.isEligible).toBe(false);
        expect(result.reason).toContain("Missing required subjects: Mathematics");
    });

    it("should recommend eligible alternative courses", () => {
        const result = checkEligibility(
            createStudent({
                subjects: [
                    { subject: "Physics", marks: 70 },
                    { subject: "Chemistry", marks: 70 },
                    { subject: "Mathematics", marks: 70 },
                ],
            })
        );

        expect(result.isEligible).toBe(false);
        expect(result.recommendedCourses.length).toBe(3);
        expect(result.recommendedCourses).toContain("Mechanical Engineering");
    });

    it("should reject an invalid course", () => {
        const result = checkEligibility(
            createStudent({
                desiredCourse: "Invalid Course",
            })
        );

        expect(result.isEligible).toBe(false);
        expect(result.reason).toBe("Invalid course selected.");
    });

});
