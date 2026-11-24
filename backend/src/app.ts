
import express from "express";
import studentRoutes from "./routes/studentRoutes";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use("/api/students", studentRoutes);
app.use(errorMiddleware);
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Course Eligibility API is running",
    });
});

export default app;
