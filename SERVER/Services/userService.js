import userModel from "../Models/user.js";
import bcrypt from "bcrypt";

const createUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("Please fill all the credentials");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

export { createUser };
