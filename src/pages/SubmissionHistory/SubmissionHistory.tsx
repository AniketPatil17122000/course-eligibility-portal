import { useMemo } from "react";
import type { ColumnsType } from "antd/es/table";


import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import { DatePicker, Input } from "antd";
import { formatDate, utilLog } from "../../utils/utils";
import type { Submission } from "../../interfaces/interfaces";
import { CSVLink } from "react-csv";

import dayjs from "dayjs";


import { CONSTANTS } from "../../services/constants";
import TableWrapper from "../../components/common/TableWrapper";
import { UseSubmissionHistoryViewModel } from "./UseSubmissionHistoryViewModel";

const SalesRegisterReports = () => {
    const { searchText, apiData, form, onSubmit, setSearchText, handleClearDates, startDate, loading } = UseSubmissionHistoryViewModel()




    const filteredData = useMemo(() => {
        if (!apiData) return [];

        const lowerSearch = searchText?.toLowerCase();

        const filtered = searchText
            ? apiData.filter((record: any) =>
                Object.values(record).some((value) =>
                    value
                        ? String(value).toLowerCase().includes(lowerSearch)
                        : false
                )
            )
            : [...apiData];

        return filtered.sort((a, b) =>
            dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
        );
    }, [searchText, apiData]);

    utilLog({ filteredData })






    const custListColumn: ColumnsType<Submission> = [
        {
            title: "Student Name",
            dataIndex: "studentName",
            key: "studentName",

        },
        {
            title: "Course Applied",
            dataIndex: "course",
            key: "course",



        },
        {
            title: "Eligibility Status",
            dataIndex: "status",
            key: "status",
            // align : "center"
        },

        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            // align: "center",
            render: (value: string) => (formatDate(value)),

        },


    ];

    const dataForExcel = filteredData.map((item) => ({
        "Student Name": item.studentName,
        "Course Applied": item.course,
        "Eligibility Status": item.status,
        "Date": formatDate(item.date),
    }));



    return (
        <div id="main" className="main">


            <div className="page-header">
                <div className="page-header-left d-flex align-items-center">
                    <div className="page-header-title">
                        <h5 className="m-b-10">Submission History</h5>
                    </div>
                </div>
            </div>

            <Form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="section">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                    
                                <div className="card-body">
                                    <div className="row g-3">

                                        <div className="col-md-3">
                                            <label className="form-label">Start Date <span className="text-danger">*</span></label>
                                            <Controller
                                                name="startDate"
                                                control={form.control}
                                                rules={{ required: "Start date is required" }}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        className={`w-100 ${form.errors.startDate ? "is-invalid" : ""}`}
                                                        format="DD.MM.YYYY"
                                                        value={
                                                            field.value
                                                                ? dayjs(field.value, "DD.MM.YYYY", true)
                                                                : null
                                                        }
                                                        onChange={(date) =>
                                                            field.onChange(
                                                                date ? dayjs(date).format("DD.MM.YYYY") : null
                                                            )
                                                        }
                                                    />
                                                )}
                                            />

                                            {form.errors.startDate && (
                                                <div className="invalid-feedback d-block">
                                                    {form.errors.startDate.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">End Date <span className="text-danger">*</span></label>
                                            <Controller
                                                name="endDate"
                                                control={form.control}
                                                rules={{
                                                    required: "End date is required",
                                                    validate: (value) => {
                                                        if (!startDate) return true;

                                                        const start = dayjs(startDate, "DD.MM.YYYY");
                                                        const end = dayjs(value, "DD.MM.YYYY");

                                                        if (end.diff(start, "day") < 0) {
                                                            return CONSTANTS.END_DATE_ERRROR_MESSAGE;
                                                        }

                                                      
                                                        return true;
                                                    }

                                                }}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        allowClear
                                                        className={`w-100 ${form.errors.endDate ? "is-invalid" : ""}`}
                                                        format="DD.MM.YYYY"
                                                        value={
                                                            field.value
                                                                ? dayjs(field.value, "DD.MM.YYYY", true)
                                                                : null
                                                        }
                                                        disabledDate={(current) => {
                                                            if (!startDate) return false;

                                                            const start = dayjs(startDate, "DD.MM.YYYY");

                                                            return (
                                                                current?.isBefore(start, "day")
                                                                // || current?.isAfter(start.add(30, "day"), "day")
                                                            );
                                                        }}
                                                        onChange={(date) =>
                                                            field.onChange(
                                                                date ? dayjs(date).format("DD.MM.YYYY") : null
                                                            )
                                                        }
                                                    />
                                                )}
                                            />

                                            {form.errors.endDate && (
                                                <div className="invalid-feedback d-block">
                                                    {form.errors.endDate.message}
                                                </div>
                                            )}
                                        </div>



                                        <div className={`col-md-3  ${form.errors?.startDate || form.errors?.endDate ? "align-self-center" : "align-self-end"} `}>
                                            <button
                                                type="submit"
                                                className="btn btn-primary me-1"
                                                disabled={loading}
                                            >
                                                Filter
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-secondary me-1"
                                                onClick={() => {
                                                    handleClearDates();
                                                    setSearchText("");
                                                }}
                                                disabled={loading}
                                            >
                                                Reset
                                            </button>





                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card mb-0">
                                <div className="card-header py-1 row">
                                    {/* <div> */}
                                    <div className="col-6 p-0">
                                        <h5 className="card-title mb-0">History</h5>
                                    </div>
                                    <div className="col-6 p-0 text-end">
                                        {filteredData.length > 0 && (
                                            <CSVLink
                                                title="Export to Excel"
                                                data={dataForExcel}
                                                filename={`course_eligibility_${dayjs().format("YYYY-MM-DD")}.csv`}
                                                className="btn btn-outline-secondary me-2"
                                            >
                                                <i className="bi bi-file-earmark-excel"></i> Download Excel
                                            </CSVLink>
                                        )}



                                        <Input.Search
                                            placeholder="Search ..."
                                            allowClear
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            style={{ maxWidth: 300 }}
                                        />

                                    </div>
                                    {/* </div> */}
                                </div>
                                <div className="card-body p-0">
                                    {/* <div className="table-responsive"> */}
                                    <TableWrapper
                                        dataSource={filteredData}
                                        columns={custListColumn}
                                        pagination={true}
                                        pageSize={10}
                                        className="custom-small-table text-nowrap"
                                        // size="small"
                                        loading={loading}


                                        //   className="text-nowrap"
                                        scroll={{ x: "max-content" }}
                                        locale={{ emptyText: CONSTANTS.NO_DATA_TEXT }}
                                    />
                                </div>

                            </div>
                        </div>



                    </div>
                </section>
            </Form>
        </div>
    );
};

export default SalesRegisterReports;















