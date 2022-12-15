import CustomAPIError from "./custom_api.js";
export default class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message, 404);
    }
}
//# sourceMappingURL=not_found.js.map