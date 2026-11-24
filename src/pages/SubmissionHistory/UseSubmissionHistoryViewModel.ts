
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useWatch } from "react-hook-form";

import useAppFormHook from "../../hooks/useAppFormHook";
import type {
    Submission,
    SubmissionFormInterface
} from "../../interfaces/interfaces";

import { swalMessages } from "../../services/constants";
import { getStudentHistory } from "../../services/studentService";
import { showSwal, utilLog } from "../../utils/utils";

export const UseSubmissionHistoryViewModel = () => {

    const form = useAppFormHook<SubmissionFormInterface>({
        defaultValues: {
            startDate: dayjs().startOf("month").format("DD.MM.YYYY"),
            endDate: dayjs().endOf("month").format("DD.MM.YYYY"),
        },
    });

    const [searchText, setSearchText] = useState("");
    const [apiData, setApiData] = useState<Submission[]>([]);
    const [allApiData, setAllApiData] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(false);

    const startDate = useWatch({
        control: form.control,
        name: "startDate",
    });

    // Fetch history from backend
    const getSalesRegisterReportList = async () => {
        try {
            setLoading(true);

            const response = await getStudentHistory();

            const formattedData: Submission[] = response.map(
                (item, index) => ({
                    id: index + 1,
                    studentName: item.studentName,
                    course: item.desiredCourse,
                    status: item.isEligible ? "Eligible" : "Not Eligible",
                    date: item.createdAt,
                })
            );

            setAllApiData(formattedData);
            setApiData(formattedData);

            return formattedData;

        } catch (err) {
            utilLog(err);

            showSwal(
                "error",
                swalMessages.swalErrorTitle,
                swalMessages.swalErrorMessage
            );

            return [];

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadHistory = async () => {
            const records = await getSalesRegisterReportList();

            const start = dayjs().startOf("month");
            const end = dayjs().endOf("month");

            setApiData(
                records.filter((item) => {
                    const date = dayjs(item.date);

                    return (
                        !date.isBefore(start, "day") &&
                        !date.isAfter(end, "day")
                    );
                })
            );
        };

        loadHistory();
    }, []);

    // Apply date filter
    const onSubmit = (data: SubmissionFormInterface) => {

        const filtered = allApiData.filter((item) => {
            const date = dayjs(item.date);

            const start = data.startDate
                ? dayjs(data.startDate, "DD.MM.YYYY", true).startOf("day")
                : null;

            const end = data.endDate
                ? dayjs(data.endDate, "DD.MM.YYYY", true).endOf("day")
                : null;

            return (
                (!start || !date.isBefore(start)) &&
                (!end || !date.isAfter(end))
            );
        });

        setApiData(filtered);
    };

    const handleClearDates = () => {
        form.reset({
            startDate: "",
            endDate: "",
        });

        setApiData(allApiData);
    };

    return {
        searchText,
        apiData,
        form,
        onSubmit,
        setSearchText,
        handleClearDates,
        startDate,
        loading,
    };
};
