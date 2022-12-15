import User from "../models/user.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
export const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ user, token });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        throw new UnauthenticatedError("Password is not correct");
    }
    const token = user.createJWT();
    res.status(200).json({ user: { name: user.name }, token });
};
//# sourceMappingURL=auth.js.map