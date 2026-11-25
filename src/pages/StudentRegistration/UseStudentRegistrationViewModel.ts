
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAppFormHook from "../../hooks/useAppFormHook";
import type { StudentFormData } from "../../interfaces/interfaces";
import { useWatch } from "react-hook-form";
import { COURSE_RULES } from "../../utils/eligibilityUtils";
import { utilLog } from "../../utils/utils";
import { checkStudentEligibility } from "../../services/studentService";
import { showSwal } from "../../utils/utils";

export const UseStudentRegistrationViewModel = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useAppFormHook<StudentFormData>({
        defaultValues: {
            studentName: "",
            age: null,
            gender: "",
            subjects: Array.from({ length: 6 }, () => ({
                subject: "",
                marks: null,
            })),
            jeeQualified: null,
            neetQualified: null,
            desiredCourse: "",
        },
    });

    const selectedSubjects = useWatch({
        control: form.control,
        name: "subjects",
    }) || [];

    const selectedCategory = useWatch({
        control: form.control,
        name: "courseCategory",
    });

    const selectedCourse = useWatch({
        control: form.control,
        name: "desiredCourse",
    });

    const selectedCriteria = COURSE_RULES.find(
        (course) =>
            course.name === selectedCourse &&
            course.category === selectedCategory
    );

    const onSubmit = async (data: StudentFormData) => {
        try {
            setLoading(true);

            const response = await checkStudentEligibility(data);

            utilLog("Eligibility Result:", response.result);

            navigate("/result", {
                state: {
                    student: response.student,
                    result: response.result,
                },
            });
        } catch (error: any) {
            utilLog("Eligibility API Error:", error);

            showSwal(
                "error",
                "Submission Failed",
                error?.response?.data?.message || "Unable to check eligibility. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        form.reset();
    };

    return {
        form,
        handleReset,
        onSubmit,
        selectedCategory,
        selectedSubjects,
        navigate,
        selectedCriteria,
        selectedCourse,
        loading,
    };
};
