import type { EligibilityResult } from "../utils/eligibilityUtils";

export type CourseCategory =
    | "Engineering"
    | "Medicine"
    | "Commerce"
    | "Humanities";

export interface SubjectMark {
    subject: string;
    marks: number | null;
}

export interface StudentFormData {
    studentName: string;
    age: number | null;
    gender: "Male" | "Female" | "Other" | "";
    subjects: SubjectMark[];
    jeeQualified: boolean | null;
    neetQualified: boolean | null;
    courseCategory: CourseCategory | "";
    desiredCourse: string;
}

export const SUBJECT_OPTIONS = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Accountancy",
    "Business Studies",
    "Economics",
    "History",
    "Political Science",
    "Geography",
    "Psychology",
    "Sociology",
    "English",
];

export const COURSE_CATEGORIES: CourseCategory[] = [
    "Engineering",
    "Medicine",
    "Commerce",
    "Humanities",
];

export const COURSE_OPTIONS: Record<CourseCategory, string[]> = {
    Engineering: [
        "Computer Science Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Electronics & Communication",
    ],
    Medicine: [
        "MBBS",
        "BDS",
        "BAMS",
        "BHMS",
        "BPT",
    ],
    Commerce: [
        "B.Com",
        "BBA",
        "BBM",
        "CA",
    ],
    Humanities: [
        "BA History",
        "BA Psychology",
        "BA Sociology",
        "BA Political Science",
        "BA English",
    ],
};

export interface ResultPageState {
    student: {
        studentName: string;
        age: number | null;
        gender: string;
        courseCategory: string;
        desiredCourse: string;
        subjects: {
            subject: string;
            marks: number | null;
        }[];
        jeeQualified: boolean | null;
        neetQualified: boolean | null;
    };
    result: EligibilityResult;
}


export interface HeaderProps {
    toggleSidebar: () => void;
    sidebarOpen: boolean
    isDarkMode: boolean;
toggleTheme: () => void;
}
export interface ChildRouteInterface {
    path?: string;
    element: React.ReactElement;
    // children?: CommonRouteInterface[];
}


export interface RouteInterface {
    path?: string;
    element: React.ReactElement;
    children?: ChildRouteInterface[];
}

export interface Submission {
    id: number;
    studentName: string;
    course: string;
    status: "Eligible" | "Not Eligible";
    date: string;
}


export interface SubmissionFormInterface {
    
    startDate?: string;
    endDate?: string
 

}

export type Tableprops = {
    className?: string;
    title?: string;
    dataSource: any[] | undefined;
    columns: any[];
    key?: any
    rowKey?: any
    pagination?: boolean
    locale?: any;
    showHeader?: boolean;
    scroll?: any
    loading?: boolean
    size?: "small" | "large" | "middle"
    bordered?: boolean
    pageSize?: number


}





