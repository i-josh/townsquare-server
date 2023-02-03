import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let customError = {
    status: err.status || 500,
    msg: err.message || "something went wrong",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.status = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.status = 404;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} already exists`;
    customError.status = 400;
  }
  return res
    .status(customError.status)
    .json({ status: "error", message: customError.msg });
};

export default errorHandlerMiddleware;
