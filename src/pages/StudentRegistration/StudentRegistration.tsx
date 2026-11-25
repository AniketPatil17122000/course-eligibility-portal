
import { Controller } from "react-hook-form";

import { Row, Col, Form } from "react-bootstrap";


import {
    SUBJECT_OPTIONS,
    COURSE_OPTIONS,
    COURSE_CATEGORIES,
} from "../../interfaces/interfaces";

import { CONSTANTS, Gender_Dropdown } from "../../services/constants";


import { UseStudentRegistrationViewModel } from "./UseStudentRegistrationViewModel";
import { utilLog } from "../../utils/utils";




const StudentRegistration = () => {
    const { form, handleReset, onSubmit, selectedCategory, selectedSubjects, selectedCriteria, loading } = UseStudentRegistrationViewModel()

    return (

        <div id="main" className="main">
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center">
                    <div className="page-header-title">
                        <h5 className="m-b-10">Student Registration</h5>
                    </div>
                </div>
            </div>

            <section className="section">

                <Form onSubmit={form.handleSubmit(onSubmit)} >

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="col-6 p-1">
                                        <h5 className="card-title mb-0">Personal Details</h5>
                                    </div>


                                </div>

                                <div className="card-body">

                                    <div className="row g-3">


                                        <Col md={6}>

                                            <Form.Label className="fw-normal">
                                                Student Name<span className="text-danger ms-1">*</span>
                                            </Form.Label>




                                            <Form.Control
                                                type="text"

                                                maxLength={35}
                                                placeholder={`${CONSTANTS?.PLACEHOLDER} Student Name`}


                                                {...form.register("studentName", {
                                                    required: CONSTANTS.REQUIRED_FIELD_MESSAGE.replace("@", "Student Name"),
                                                    pattern: {
                                                        value: /^[A-Za-z ]+$/,
                                                        message: "Only alphabets and spaces are allowed",
                                                    },
                                                    validate: (value) =>
                                                        value.trim().length > 0 || "Student name cannot be empty",


                                                })}
                                                isInvalid={!!form.errors.studentName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {form.errors.studentName?.message}
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col md={3}>


                                            <Form.Label className="fw-normal">
                                                Age<span className="text-danger ms-1">*</span>
                                            </Form.Label>

                                    
                                            <Form.Control
                                                type="number"

                                                maxLength={35}
                                                placeholder={`${CONSTANTS?.PLACEHOLDER} Age`}


                                                {...form.register("age", {
                                                    required: CONSTANTS.REQUIRED_FIELD_MESSAGE.replace("@", "Age"),
                                                    valueAsNumber: true,
                                                    min: {
                                                        value: 17,
                                                        message: "Minimum age is 17",
                                                    },
                                                    max: {
                                                        value: 25,
                                                        message: "Maximum age is 25",
                                                    },


                                                })}

                                            
                                                isInvalid={!!form.errors.age}
                                            />



                                            <Form.Control.Feedback type="invalid">
                                                {form.errors.age?.message}
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col md={3}>


                                            <Form.Label className="fw-normal">
                                                Gender<span className="text-danger ms-1">*</span>
                                            </Form.Label>

                                        

                                            <Form.Select

                                                {...form.register("gender", {
                                                    required: CONSTANTS.REQUIRED_FIELD_MESSAGE.replace("@", "Gender"),
                                                })}
                                                isInvalid={!!form.errors.gender}
                                            >
                                                <option value="">{CONSTANTS.PLACEHOLDERDROPDOWN}</option>

                                                {Gender_Dropdown?.map((dept: any) => (
                                                    <option key={dept.value} value={dept.value}>
                                                        {dept.label}
                                                    </option>
                                                ))}

                                            </Form.Select>



                                            <Form.Control.Feedback type="invalid">
                                                {form.errors.gender?.message}
                                            </Form.Control.Feedback>
                                        </Col>



                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="col-6 p-1">
                                        <h5 className="card-title mb-0">Desired Course
                                        </h5>
                                    </div>


                                </div>

                                <div className="card-body">
                                    <div className="row g-3">




                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>
                                                    Course Category <span className="required">*</span>
                                                </Form.Label>

                                                <Controller
                                                    name="courseCategory"
                                                    control={form.control}
                                                    rules={{ required: "Select course category" }}
                                                    render={({ field }) => (
                                                        <Form.Select
                                                            name={field.name}
                                                            value={field.value || ""}
                                                            onChange={(e) => {
                                                                field.onChange(e.target.value);

                                                                form.setValue("desiredCourse", "", {
                                                                    shouldValidate: true,
                                                                });
                                                            }}
                                                            onBlur={field.onBlur}
                                                            isInvalid={!!form.errors.courseCategory}
                                                        >
                                                            <option value="">Select category</option>

                                                            {COURSE_CATEGORIES.map((item) => (
                                                                <option key={item} value={item}>
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    )}
                                                />

                                                {form.errors.courseCategory && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {form.errors.courseCategory.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>
                                                    Desired Course <span className="required">*</span>
                                                </Form.Label>

                                                <Controller
                                                    name="desiredCourse"
                                                    control={form.control}
                                                    rules={{ required: "Select desired course" }}
                                                    render={({ field }) => (
                                                        <Form.Select
                                                            name={field.name}
                                                            value={field.value || ""}
                                                            onChange={field.onChange}
                                                            onBlur={field.onBlur}
                                                            disabled={!selectedCategory}
                                                            isInvalid={!!form.errors.desiredCourse}
                                                        >
                                                            <option value="">Select course</option>
                                                            {selectedCategory &&
                                                                COURSE_OPTIONS[selectedCategory].map((item) => (
                                                                    <option key={item} value={item}>
                                                                        {item}
                                                                    </option>
                                                                ))}
                                                        </Form.Select>
                                                    )}
                                                />

                                                {form.errors.desiredCourse && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {form.errors.desiredCourse.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        {selectedCriteria && (
                                            <div className="col-12 mt-3">
                                                <div className="card border shadow-sm">
                                                    <div className="card-header bg-light">
                                                        <h6 className="mb-0 fw-semibold">
                                                            Eligibility Criteria
                                                        </h6>
                                                    </div>

                                                    <div className="card-body">
                                                        <div className="row g-3">

                                                            <div className="col-md-6">
                                                                <label className="form-label fw-semibold">
                                                                    Required Subjects
                                                                </label>

                                                                <div className="d-flex flex-wrap gap-2">
                                                                    {selectedCriteria.requiredSubjects.map((subject) => (
                                                                        <span
                                                                            key={subject}
                                                                            className="badge bg-primary-subtle text-primary border px-3 py-2"
                                                                        >
                                                                            {subject}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <label className="form-label fw-semibold">
                                                                    Minimum Average
                                                                </label>

                                                                <h5 className="text-success mb-0">
                                                                    {selectedCriteria.cutoff !== undefined
                                                                        ? `${selectedCriteria.cutoff}%`
                                                                        : "Not specified"}
                                                                </h5>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <label className="form-label fw-semibold">
                                                                    Entrance Exam
                                                                </label>

                                                                <h5 className="mb-0">
                                                                    {selectedCriteria.exam || "Not required"}
                                                                </h5>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}




                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="col-6 p-1">
                                        <h5 className="card-title mb-0">Academic Details</h5>
                                    </div>


                                </div>

                                <div className="card-body">


                                    {/* <Row className="g-3">
                                        {selectedSubjects.map((subject, index) => {
                                            const subjectError = form.errors.subjects?.[index];

                                            const availableSubjects = SUBJECT_OPTIONS.filter(
                                                (option) =>
                                                    !selectedSubjects.some(
                                                        (item, itemIndex) =>
                                                            item.subject === option && itemIndex !== index
                                                    )
                                            );

                                            return (
                                                <Col md={6} key={index}>
                                                    <Form.Group>
                                                        <Form.Label>
                                                            Subject {index + 1} <span className="text-danger">*</span>
                                                        </Form.Label>

                                                        <Controller
                                                            name={`subjects.${index}.subject`}
                                                            control={form.control}
                                                            rules={{
                                                                required: "Please select a subject",
                                                            }}
                                                            render={({ field }) => (
                                                                <Form.Select
                                                                    name={field.name}
                                                                    value={field.value || ""}
                                                                    onChange={field.onChange}
                                                                    onBlur={field.onBlur}
                                                                    isInvalid={!!subjectError?.subject}
                                                                >
                                                                    <option value="">Select subject</option>

                                                                    {availableSubjects.map((item) => (
                                                                        <option key={item} value={item}>
                                                                            {item}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            )}
                                                        />

                                                        {subjectError?.subject && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {subjectError.subject.message}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>

                                                    <Form.Group className="mt-2">
                                                        <Form.Label>
                                                            Marks <span className="text-danger">*</span>
                                                        </Form.Label>

                                                        <Controller
                                                            name={`subjects.${index}.marks`}
                                                            control={form.control}
                                                            rules={{
                                                                required: "Marks are required",
                                                                min: {
                                                                    value: 0,
                                                                    message: "Minimum marks is 0",
                                                                },
                                                                max: {
                                                                    value: 100,
                                                                    message: "Maximum marks is 100",
                                                                },
                                                            }}
                                                            render={({ field }) => (
                                                                <Form.Control
                                                                    type="number"
                                                                    step="0.01"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder="Enter marks (0-100)"
                                                                    name={field.name}
                                                                    value={field.value ?? ""}
                                                                    onChange={(e) =>
                                                                        field.onChange(
                                                                            e.target.value === ""
                                                                                ? null
                                                                                : Number(e.target.value)
                                                                        )
                                                                    }
                                                                    onBlur={field.onBlur}
                                                                    isInvalid={!!subjectError?.marks}
                                                                />
                                                            )}
                                                        />

                                                        {subjectError?.marks && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {subjectError.marks.message}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>
                                                </Col>
                                            );
                                        })}
                                    </Row> */}

                                    <Row className="g-3">
                                        {selectedSubjects.map((subject, index) => {
                                            utilLog({ subject })
                                            const subjectError = form.errors.subjects?.[index];

                                            const availableSubjects = SUBJECT_OPTIONS.filter(
                                                (option) =>
                                                    !selectedSubjects.some(
                                                        (item, itemIndex) =>
                                                            item.subject === option && itemIndex !== index
                                                    )
                                            );

                                            return (
                                                <Col md={6} key={index}>
                                                    <Form.Group>
                                                        <Form.Label>
                                                            Subject {index + 1} <span className="text-danger">*</span>
                                                        </Form.Label>

                                                        <Row className="g-2 align-items-start">
                                                            <Col xs={7}>
                                                                <Controller
                                                                    name={`subjects.${index}.subject`}
                                                                    control={form.control}
                                                                    rules={{
                                                                        required: "Please select a subject",
                                                                    }}
                                                                    render={({ field }) => (
                                                                        <Form.Select
                                                                            name={field.name}
                                                                            value={field.value || ""}
                                                                            onChange={field.onChange}
                                                                            onBlur={field.onBlur}
                                                                            isInvalid={!!subjectError?.subject}
                                                                        >
                                                                            <option value="">Select subject</option>
                                                                            {availableSubjects.map((item) => (
                                                                                <option key={item} value={item}>
                                                                                    {item}
                                                                                </option>
                                                                            ))}
                                                                        </Form.Select>
                                                                    )}
                                                                />

                                                                {subjectError?.subject && (
                                                                    <Form.Control.Feedback type="invalid" className="d-block">
                                                                        {subjectError.subject.message}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                            </Col>

                                                            <Col xs={5}>
                                                                <Controller
                                                                    name={`subjects.${index}.marks`}
                                                                    control={form.control}
                                                                    rules={{
                                                                        required: "Marks is required",
                                                                        min: {
                                                                            value: 0,
                                                                            message: "Minimum 0",
                                                                        },
                                                                        max: {
                                                                            value: 100,
                                                                            message: "Maximum 100",
                                                                        },
                                                                    }}
                                                                    render={({ field }) => (
                                                                        <Form.Control
                                                                            type="number"
                                                                            step="0.01"
                                                                            min={0}
                                                                            max={100}
                                                                            placeholder="Marks (0-100)"
                                                                            name={field.name}
                                                                            value={field.value ?? ""}
                                                                            onChange={(e) =>
                                                                                field.onChange(
                                                                                    e.target.value === ""
                                                                                        ? null
                                                                                        : Number(e.target.value)
                                                                                )
                                                                            }
                                                                            onBlur={field.onBlur}
                                                                            isInvalid={!!subjectError?.marks}
                                                                        />
                                                                    )}
                                                                />

                                                                {subjectError?.marks && (
                                                                    <Form.Control.Feedback type="invalid" className="d-block">
                                                                        {subjectError.marks.message}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                </Col>
                                            );
                                        })}
                                    </Row>








                                </div>

                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="col-6 p-1">
                                        <h5 className="card-title mb-0">Qualification Exam Status
                                        </h5>
                                    </div>


                                </div>

                                <div className="card-body">
                                    <div className="row g-3">




                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="d-block">
                                                    JEE Qualified?
                                                </Form.Label>

                                                <Controller
                                                    name="jeeQualified"
                                                    control={form.control}
                                                    rules={{
                                                        validate: (value) =>
                                                            value !== null || "Please select JEE qualification",
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <Form.Check
                                                                inline
                                                                type="radio"
                                                                label="Yes"
                                                                name={field.name}
                                                                checked={field.value === true}
                                                                onChange={() => field.onChange(true)}
                                                            />

                                                            <Form.Check
                                                                inline
                                                                type="radio"
                                                                label="No"
                                                                name={field.name}
                                                                checked={field.value === false}
                                                                onChange={() => field.onChange(false)}
                                                            />
                                                        </>
                                                    )}
                                                />

                                                {form.errors.jeeQualified && (
                                                    <Form.Control.Feedback type="invalid" className="d-block">
                                                        {form.errors.jeeQualified.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="d-block">
                                                    NEET Qualified?
                                                </Form.Label>

                                                <Controller
                                                    name="neetQualified"
                                                    control={form.control}
                                                    rules={{
                                                        validate: (value) =>
                                                            value !== null || "Please select NEET qualification",
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <Form.Check
                                                                inline
                                                                type="radio"
                                                                label="Yes"
                                                                name={field.name}
                                                                checked={field.value === true}
                                                                onChange={() => field.onChange(true)}
                                                            />

                                                            <Form.Check
                                                                inline
                                                                type="radio"
                                                                label="No"
                                                                name={field.name}
                                                                checked={field.value === false}
                                                                onChange={() => field.onChange(false)}
                                                            />
                                                        </>
                                                    )}
                                                />

                                                {form.errors.neetQualified && (
                                                    <Form.Control.Feedback type="invalid" className="d-block">
                                                        {form.errors.neetQualified.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="text-end">





                            <button
                                type="button"
                                className="btn btn-secondary me-1 round"
                                onClick={handleReset}
                                disabled={loading}
                                style={{ backgroundColor: "#6c757d", color: "#fff" }}
                            >
                                Reset
                            </button>
                            <button
                                className="btn bg-dark text-white border"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Checking Eligibility...
                                    </>
                                ) : (
                                    "Check Eligibility"
                                )}
                            </button>



                        </div>






                    </div>
                </Form>
            </section>
        </div>
    );
};

export default StudentRegistration;
