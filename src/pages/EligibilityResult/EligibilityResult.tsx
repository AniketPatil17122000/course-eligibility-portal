
import { Link } from "react-router-dom";
import { UseEligibilityResultViewModel } from "./UseEligibilityResultViewModel";

const EligibilityResultPage = () => {
        const { state , navigate ,student ,  result , getSubjectMarks , examQualified  , selectedCriteria , } = UseEligibilityResultViewModel()
   

    if (!state?.student || !state?.result) {
        return (
            <div id="main" className="main">
                <div className="page-header">
                    <div className="page-header-left d-flex align-items-center">
                        <div className="page-header-title">
                            <h5 className="m-b-10">Eligibility Result</h5>
                        </div>
                    </div>
                </div>

                <section className="section">
                    <div className="card">
                        <div className="card-body text-center py-5">
                            <h5>No eligibility result found</h5>
                            <p className="text-muted">
                                Please submit the student registration form first.
                            </p>
                            <Link to="/register" className="btn btn-gold">
                                Go to Registration
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }


    

    return (
        <div id="main" className="main">
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center">
                    <div className="page-header-title">
                        <h5 className="m-b-10">Eligibility Result</h5>
                    </div>
                </div>
            </div>

            <section className="section">

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header p-2">
                                <h5 className="card-title mb-0">Student Details</h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">

                                    <div className="col-md-3">
                                        <label className="form-label mb-1">Student Name</label>
                                        <div className="fw-semibold">
                                            {student.studentName}
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label mb-1">Course Category</label>
                                        <div className="fw-semibold">
                                            {student.courseCategory}
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label mb-1">Selected Course</label>
                                        <div className="fw-semibold">
                                            {student.desiredCourse}
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label mb-1">Average Marks</label>
                                        <div className="fw-semibold">
                                            {result.averageMarks}%
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header p-2">
                                <h5 className="card-title mb-0">
                                    Eligibility Criteria & Evaluation
                                </h5>
                            </div>

                            <div className="card-body">

                                {/* Required Subjects */}
                                <h6 className="fw-Normal mb-3 fs-6">
                                    Required Subjects & Marks
                                </h6>

                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Subject</th>
                                                <th className="text-center">Marks Obtained</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {selectedCriteria?.requiredSubjects.map((subject) => {
                                                const marks = getSubjectMarks(subject);

                                                return (
                                                    <tr key={subject}>
                                                        <td>{subject}</td>
                                                        <td className="text-center fw-semibold">
                                                            {marks !== null ? `${marks}%` : "Not entered"}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Cutoff and Entrance Exam */}
                                <div className="row g-3 mt-2">

                                    <div className="col-md-4">
                                        <div className="border rounded p-3 h-100">
                                            <label className="form-label text-muted mb-1">
                                                Required Average Cutoff
                                            </label>
                                            <h5 className="fw-semibold mb-0">
                                                {selectedCriteria?.cutoff !== undefined
                                                    ? `${selectedCriteria.cutoff}%`
                                                    : "Not specified"}
                                            </h5>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="border rounded p-3 h-100">
                                            <label className="form-label text-muted mb-1">
                                                Entrance Examination
                                            </label>
                                            <h5 className="fw-semibold mb-0">
                                                {selectedCriteria?.exam || "Not required"}
                                            </h5>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="border rounded p-3 h-100">
                                            <label className="form-label text-muted mb-1">
                                                Exam Qualification Status
                                            </label>

                                            {selectedCriteria?.exam ? (
                                                <div>
                                                    <span className={`badge ${
                                                        examQualified
                                                            ? "text-bg-success"
                                                            : "text-bg-danger"
                                                    }`}>
                                                        {examQualified
                                                            ? "Qualified"
                                                            : "Not Qualified"}
                                                    </span>
                                                </div>
                                            ) : (
                                                <h5 className="fw-semibold mb-0">
                                                    Not applicable
                                                </h5>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Result */}
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Eligibility Result</h5>
                            </div>

                            <div className="card-body">

                                {/* Eligibility Status */}
                                <div className={`rounded border text-center p-4 mb-4 ${
                                    result.isEligible
                                        ? "bg-success-subtle border-success"
                                        : "bg-danger-subtle border-danger"
                                }`}>

                                    <div className="mb-3">
                                        <span className={`badge rounded-pill fs-6 px-4 py-2 ${
                                            result.isEligible
                                                ? "text-bg-success"
                                                : "text-bg-danger"
                                        }`}>
                                            {result.isEligible ? "ELIGIBLE" : "NOT ELIGIBLE"}
                                        </span>
                                    </div>

                                    <h4 className="fw-semibold mb-2">
                                        {result.isEligible
                                            ? "Congratulations!"
                                            : "Eligibility Requirements Not Met"}
                                    </h4>

                                    <p className="mb-0">
                                        {result.reason}
                                    </p>
                                </div>

                                {/* Recommended Courses */}
                                {!result.isEligible && (
                                    <div className="mt-4">

                                        <div className="mb-3 border-start border-4 border-warning ps-3">
                                            <h5 className="mb-1">
                                                Recommended Alternative Courses
                                            </h5>
                                            <p className="text-muted mb-0 small">
                                                Based on your subjects, marks and entrance exam qualification.
                                            </p>
                                        </div>

                                        {result.recommendedCourses.length > 0 ? (
                                            <div className="row g-3">
                                                {result.recommendedCourses.map((course, index) => (
                                                    <div className="col-md-4" key={course}>
                                                        <div className="card h-100 border shadow-sm">
                                                            <div className="card-body">
                                                                <span className="badge text-bg-secondary mb-2">
                                                                    Option {index + 1}
                                                                </span>

                                                                <h6 className="fw-semibold mb-0">
                                                                    {course}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="alert alert-light border mb-0">
                                                No eligible alternative courses found.
                                            </div>
                                        )}

                                    </div>
                                )}

                            </div>

                            <div className="text-end p-2">
                                <button
                                    type="button"
                                    className="btn bg-dark text-white border"
                                    onClick={() => navigate("/register")}
                                >
                                    New Registration
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default EligibilityResultPage;
