import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { getStudentHistory } from "../../services/studentService";
import { utilLog } from "../../utils/utils";
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

type StudentRecord = Awaited<ReturnType<typeof getStudentHistory>>[number];





export const useDashboard = () => {

 const [students, setStudents] = useState<StudentRecord[]>([]);
    const [loading, setLoading] = useState(false);

    const getDashboardData = async () => {
        try {
            setLoading(true);
            const response = await getStudentHistory();
            setStudents(response);
        } catch (error) {
            utilLog({error})
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    const totalStudents = students.length;

    const eligibleStudents = students.filter(
        (item) => item.isEligible
    ).length;

    const notEligibleStudents = students.filter(
        (item) => !item.isEligible
    ).length;

    const courseCounts = students.reduce<Record<string, number>>(
        (acc, item) => {
            acc[item.desiredCourse] = (acc[item.desiredCourse] || 0) + 1;
            return acc;
        },
        {}
    );

    const doughnutData = {
        labels: ["Eligible", "Not Eligible"],
        datasets: [
            {
                data: [eligibleStudents, notEligibleStudents],
                backgroundColor: ["#15966b", "#dc5145"],
                borderWidth: 0,
            },
        ],
    };

    const barData = {
        labels: Object.keys(courseCounts).map((course) =>
            course
                .replace("Computer Science Engineering", "Computer Science")
                .replace("Mechanical Engineering", "Mechanical")
                .replace("Electrical Engineering", "Electrical")
                .replace("Civil Engineering", "Civil")
                .replace("Electronics & Communication", "Electronics")
        ),
        datasets: [
            {
                label: "Applications",
                data: Object.values(courseCounts),
                backgroundColor: "#3157a4",
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
        },
    };


    


    return {
        loading ,  totalStudents , eligibleStudents , notEligibleStudents , doughnutData , chartOptions , barData
    }
}