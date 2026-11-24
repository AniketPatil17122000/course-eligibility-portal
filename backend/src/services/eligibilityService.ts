import {
    StudentInput,
    EligibilityResult,
} from "../interfaces/StudentInterface";


interface CourseRule {
    name: string;
    category: string;
    requiredSubjects: string[];
    exam?: "JEE" | "NEET";
    cutoff?: number;
}

export const COURSE_RULES: CourseRule[] = [
    // Engineering
    { name: "Computer Science Engineering", category: "Engineering", requiredSubjects: ["Physics", "Chemistry", "Mathematics"], exam: "JEE", cutoff: 75 },
    { name: "Mechanical Engineering", category: "Engineering", requiredSubjects: ["Physics", "Chemistry", "Mathematics"], exam: "JEE", cutoff: 70 },
    { name: "Electrical Engineering", category: "Engineering", requiredSubjects: ["Physics", "Chemistry", "Mathematics"], exam: "JEE", cutoff: 70 },
    { name: "Civil Engineering", category: "Engineering", requiredSubjects: ["Physics", "Chemistry", "Mathematics"], exam: "JEE", cutoff: 65 },
    { name: "Electronics & Communication", category: "Engineering", requiredSubjects: ["Physics", "Chemistry", "Mathematics"], exam: "JEE", cutoff: 70 },

    // Medicine
    { name: "MBBS", category: "Medicine", requiredSubjects: ["Physics", "Chemistry", "Biology"], exam: "NEET", cutoff: 85 },
    { name: "BDS", category: "Medicine", requiredSubjects: ["Physics", "Chemistry", "Biology"], exam: "NEET", cutoff: 80 },
    { name: "BAMS", category: "Medicine", requiredSubjects: ["Physics", "Chemistry", "Biology"], exam: "NEET", cutoff: 75 },
    { name: "BHMS", category: "Medicine", requiredSubjects: ["Physics", "Chemistry", "Biology"], exam: "NEET", cutoff: 75 },
    { name: "BPT", category: "Medicine", requiredSubjects: ["Physics", "Chemistry", "Biology"], exam: "NEET", cutoff: 70 },

    // Commerce
    { name: "B.Com", category: "Commerce", requiredSubjects: ["Accountancy", "Business Studies", "Economics"] },
    { name: "BBA", category: "Commerce", requiredSubjects: ["Accountancy", "Business Studies", "Economics"] },
    { name: "BBM", category: "Commerce", requiredSubjects: ["Accountancy", "Business Studies", "Economics"] },
    { name: "CA", category: "Commerce", requiredSubjects: ["Accountancy", "Business Studies", "Economics"] },

    // Humanities
    { name: "BA in History", category: "Humanities", requiredSubjects: ["History", "Political Science", "Geography"] },
    { name: "BA in Psychology", category: "Humanities", requiredSubjects: ["Psychology", "Sociology", "English"] },
    { name: "BA in Sociology", category: "Humanities", requiredSubjects: ["Sociology", "Political Science", "History"] },
    { name: "BA in Political Science", category: "Humanities", requiredSubjects: ["Political Science", "History", "Geography"] },
    { name: "BA in English", category: "Humanities", requiredSubjects: ["English", "History", "Political Science"] },
];

const evaluateCourse = (
    student: StudentInput,
    course: CourseRule
): EligibilityResult => {
    const marksMap = new Map(
        student.subjects.map((item) => [item.subject, item.marks])
    );

    const missingSubjects = course.requiredSubjects.filter(
        (subject) => !marksMap.has(subject)
    );

    const averageMarks = missingSubjects.length === 0
        ? course.requiredSubjects.reduce(
            (total, subject) => total + (marksMap.get(subject) ?? 0),
            0
        ) / course.requiredSubjects.length
        : 0;

    const examQualified = course.exam === "JEE"
        ? student.jeeQualified
        : course.exam === "NEET"
            ? student.neetQualified
            : true;

    const reasons: string[] = [];

    if (missingSubjects.length > 0) {
        reasons.push(`Missing required subjects: ${missingSubjects.join(", ")}`);
    }

    if (!examQualified) {
        reasons.push(`${course.exam} qualification is required`);
    }

    if (course.cutoff !== undefined && averageMarks < course.cutoff) {
        reasons.push(`Required average is ${course.cutoff}%, but student scored ${averageMarks.toFixed(2)}%`);
    }

    return {
        isEligible: reasons.length === 0,
        reason: reasons.length === 0
            ? "Congratulations! You are eligible for this course."
            : reasons.join(". "),
        averageMarks: Number(averageMarks.toFixed(2)),
        recommendedCourses: [],
    };
};

export const checkEligibility = (
    student: StudentInput
): EligibilityResult => {
    const selectedCourse = COURSE_RULES.find(
        (course) =>
            course.name === student.desiredCourse &&
            course.category === student.courseCategory
    );

    if (!selectedCourse) {
        return {
            isEligible: false,
            reason: "Invalid course selected.",
            averageMarks: 0,
            recommendedCourses: [],
        };
    }

    const result = evaluateCourse(student, selectedCourse);

    if (!result.isEligible) {
        result.recommendedCourses = COURSE_RULES
            .filter((course) =>
                course.name !== selectedCourse.name &&
                evaluateCourse(student, course).isEligible
            )
            .slice(0, 3)
            .map((course) => course.name);
    }

    return result;
};