import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        subjects: [
            {
                subject: {
                    type: String,
                    required: true,
                },
                marks: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 100,
                },
            },
        ],
        jeeQualified: {
            type: Boolean,
            default: null,
        },
        neetQualified: {
            type: Boolean,
            default: null,
        },
        courseCategory: {
            type: String,
            required: true,
        },
        desiredCourse: {
            type: String,
            required: true,
        },
        isEligible: {
            type: Boolean,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        averageMarks: {
            type: Number,
            default: 0,
        },
        recommendedCourses: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;