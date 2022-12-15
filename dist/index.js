import "dotenv/config";
import "express-async-errors";
import express from "express";
import connectDB from "./db/connect.js";
import authRoutes from "./routes/auth.js";
//security
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";
// error handler
import notFoundMiddleware from "./middleware/not_found.js";
import errorHandlerMiddleware from "./middleware/error_handler.js";
const app = express();
app.set("trust proxy", 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100, //limit each ip to 100 requests per window
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages
//routes
app.use("/api/v1/users", authRoutes);
// app.use("/api/v1/jobs", authenticateUser, jobsRoutes);
//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map