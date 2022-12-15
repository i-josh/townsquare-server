const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || "something went wrong",
    };
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = 400;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = 404;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `${Object.keys(err.keyValue)} already exists`;
        customError.statusCode = 400;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
export default errorHandlerMiddleware;
//# sourceMappingURL=error_handler.js.map