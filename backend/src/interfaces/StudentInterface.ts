export interface SubjectMarks {
    subject: string;
    marks: number;
}

export type CourseCategory =
    | "Engineering"
    | "Medicine"
    | "Commerce"
    | "Humanities";

export interface StudentInput {
    studentName: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    subjects: SubjectMarks[];
    jeeQualified: boolean | null;
    neetQualified: boolean | null;
    courseCategory: CourseCategory;
    desiredCourse: string;
}

export interface EligibilityResult {
    isEligible: boolean;
    reason: string;
    averageMarks: number;
    recommendedCourses: string[];
}