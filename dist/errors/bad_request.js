import CustomAPIError from "./custom_api.js";
export default class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message, 400);
    }
}
//# sourceMappingURL=bad_request.js.map