import "dotenv/config";
import "express-async-errors";
import express from "express";
import connectDB from "./db/connect.js";
import router from "./routes/index.js"

//security
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";

// error handler
import notFoundMiddleware from "./middleware/not_found.js";
import errorHandlerMiddleware from "./middleware/error_handler.js";

const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each ip to 100 requests per window
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

//routes
app.use( "/api/v1/", router);

//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
