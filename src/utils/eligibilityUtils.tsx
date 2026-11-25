import type { CourseRule, EligibilityInput, EligibilityResult } from "../interfaces/interfaces";

export type CourseCategory = string;



export const COURSE_RULES: CourseRule[] = [
    // Engineering
    {
        name: "Computer Science Engineering",
        category: "Engineering",
        requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
        exam: "JEE",
        cutoff: 75,
    },
    {
        name: "Mechanical Engineering",
        category: "Engineering",
        requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
        exam: "JEE",
        cutoff: 70,
    },
    {
        name: "Electrical Engineering",
        category: "Engineering",
        requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
        exam: "JEE",
        cutoff: 70,
    },
    {
        name: "Civil Engineering",
        category: "Engineering",
        requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
        exam: "JEE",
        cutoff: 65,
    },
    {
        name: "Electronics & Communication",
        category: "Engineering",
        requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
        exam: "JEE",
        cutoff: 70,
    },

    // Medicine
    {
        name: "MBBS",
        category: "Medicine",
        requiredSubjects: ["Physics", "Chemistry", "Biology"],
        exam: "NEET",
        cutoff: 85,
    },
    {
        name: "BDS",
        category: "Medicine",
        requiredSubjects: ["Physics", "Chemistry", "Biology"],
        exam: "NEET",
        cutoff: 80,
    },
    {
        name: "BAMS",
        category: "Medicine",
        requiredSubjects: ["Physics", "Chemistry", "Biology"],
        exam: "NEET",
        cutoff: 75,
    },
    {
        name: "BHMS",
        category: "Medicine",
        requiredSubjects: ["Physics", "Chemistry", "Biology"],
        exam: "NEET",
        cutoff: 75,
    },
    {
        name: "BPT",
        category: "Medicine",
        requiredSubjects: ["Physics", "Chemistry", "Biology"],
        exam: "NEET",
        cutoff: 70,
    },

    // Commerce
    {
        name: "B.Com",
        category: "Commerce",
        requiredSubjects: ["Accountancy", "Business Studies", "Economics"],
    },
    {
        name: "BBA",
        category: "Commerce",
        requiredSubjects: ["Accountancy", "Business Studies", "Economics"],
    },
    {
        name: "BBM",
        category: "Commerce",
        requiredSubjects: ["Accountancy", "Business Studies", "Economics"],
    },
    {
        name: "CA",
        category: "Commerce",
        requiredSubjects: ["Accountancy", "Business Studies", "Economics"],
    },

    // Humanities
    {
        name: "BA History",
        category: "Humanities",
        requiredSubjects: ["History", "Political Science", "Geography"],
    },
    {
        name: "BA Psychology",
        category: "Humanities",
        requiredSubjects: ["Psychology", "Sociology", "English"],
    },
    {
        name: "BA Sociology",
        category: "Humanities",
        requiredSubjects: ["Sociology", "Political Science", "History"],
    },
    {
        name: "BA Political Science",
        category: "Humanities",
        requiredSubjects: ["Political Science", "History", "Geography"],
    },
    {
        name: "BA English",
        category: "Humanities",
        requiredSubjects: ["English", "History", "Political Science"],
    },
];

const evaluateCourse = (
    course: CourseRule,
    data: EligibilityInput
) => {
    const marksMap = new Map(
        data.subjects.map((item) => [item.subject, item.marks])
    );

    const missingSubjects = course.requiredSubjects.filter(
        (subject) =>
            !marksMap.has(subject) || marksMap.get(subject) === null
    );

    // Calculate average only when all required marks are available
    const marks = course.requiredSubjects.map(
        (subject) => marksMap.get(subject)
    );

    const hasAllMarks = missingSubjects.length === 0;

  const averageMarks = hasAllMarks
    ? marks.reduce<number>((total, mark) => total + (mark ?? 0), 0) / marks.length
    : 0;
    const reasons: string[] = [];

    if (missingSubjects.length > 0) {
        reasons.push(
            `Required subjects missing: ${missingSubjects.join(", ")}`
        );
    }

    if (course.exam === "JEE" && data.jeeQualified !== true) {
        reasons.push("JEE qualification is required");
    }

    if (course.exam === "NEET" && data.neetQualified !== true) {
        reasons.push("NEET qualification is required");
    }

    if (
        hasAllMarks &&
        course.cutoff !== undefined &&
        averageMarks < course.cutoff
    ) {
        reasons.push(
            `Required average is ${course.cutoff}%, but your average is ${averageMarks.toFixed(2)}%`
        );
    }

    return {
        isEligible: reasons.length === 0,
        reason: reasons.join(". "),
        averageMarks: hasAllMarks
            ? Number(averageMarks.toFixed(2))
            : 0,
    };
};

export const checkEligibility = (
    data: EligibilityInput
): EligibilityResult => {
    const selectedCourse = COURSE_RULES.find(
        (course) =>
            course.name === data.desiredCourse &&
            course.category === data.courseCategory
    );

    if (!selectedCourse) {
        return {
            isEligible: false,
            reason: "Invalid course selection",
            averageMarks: 0,
            recommendedCourses: [],
        };
    }

    const result = evaluateCourse(selectedCourse, data);

    const recommendedCourses = result.isEligible
        ? []
        : COURSE_RULES.filter(
            (course) =>
                course.name !== selectedCourse.name &&
                evaluateCourse(course, data).isEligible
        )
            .slice(0, 3)
            .map((course) => course.name);

    return {
        isEligible: result.isEligible,
        reason: result.isEligible
            ? "Congratulations! You are eligible for the selected course."
            : result.reason,
        averageMarks: result.averageMarks,
        recommendedCourses,
    };
};
