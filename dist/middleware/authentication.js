import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.userId).select("-password");
        if (!user) {
            throw new UnauthenticatedError("unauthorized");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new UnauthenticatedError("unauthorized");
    }
};
export default auth;
//# sourceMappingURL=authentication.js.map