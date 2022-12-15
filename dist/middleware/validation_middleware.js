function validationMiddleware(schema) {
    return async (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };
        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body = value;
            next();
        }
        catch (e) {
            const errors = [];
            e.details.forEach((element) => {
                errors.push(element.message);
            });
            res.status(400).send({ errors });
        }
    };
}
export default validationMiddleware;
//# sourceMappingURL=validation_middleware.js.map