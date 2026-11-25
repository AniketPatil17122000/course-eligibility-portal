
import { useLocation, useNavigate } from "react-router-dom";
import type { ResultPageState } from "../../interfaces/interfaces";
import { COURSE_RULES } from "../../utils/eligibilityUtils";






export const UseEligibilityResultViewModel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ResultPageState

     const { student, result } = state;
        const selectedCriteria = COURSE_RULES.find(
            (course) =>
                course.name === student.desiredCourse &&
                course.category === student.courseCategory
        );

          const getSubjectMarks = (subject: string) => {
        return student.subjects.find(
            (item) => item.subject === subject
        )?.marks ?? null;
    };

    const examQualified =
        selectedCriteria?.exam === "JEE"
            ? student.jeeQualified
            : selectedCriteria?.exam === "NEET"
                ? student.neetQualified
                : null;

    

    







    return {
        state, navigate, location , result , getSubjectMarks , examQualified , student , selectedCriteria
    }
}