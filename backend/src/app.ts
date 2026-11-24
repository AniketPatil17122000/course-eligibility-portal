
import express from "express";
import studentRoutes from "./routes/studentRoutes";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://course-eligibility-portal.vercel.app",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use(errorMiddleware);
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Course Eligibility API is running",
    });
});

export default app;
