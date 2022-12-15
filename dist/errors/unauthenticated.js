import CustomAPIError from "./custom_api.js";
export default class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message, 401);
    }
}
//# sourceMappingURL=unauthenticated.js.map