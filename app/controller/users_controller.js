import bcrypt from 'bcryptjs';
import UserModel from '../model/user_model.js';
import { tokenEncode } from '../utility/token_util.js';

export const register = async (req, res) => {

    try {
        const { firstName, lastName, mobile,  email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            mobile
        });
        if (!user) {
            return res.status(400).json({ message: "User registration failed" });
        }
        if (user) {
        user.password = undefined;
        const token = tokenEncode(user.email, user._id);
        return res.status(200).json({ message: "User registered successfully", 'token': token, user });
        }
        
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "User registration failed" });
    }
};

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email }).select("+password");
        console.log(user);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!user.password) {
            return res.status(400).json({ message: "Password not found for this user" });
        }

        console.log(user.password);

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        console.log(isPasswordMatch);

        const token = await tokenEncode(email, user._id);
        user.password = undefined;
        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
};


export const profile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.headers.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User profile", user });
    }   
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "User profile not found" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.headers.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { firstName, lastName, mobile, password } = req.body;
        if (!firstName && !lastName && !mobile && !password) {
            return res.status(400).json({ message: "At least one field is required to update - firstName, lastName, mobile, password" });
        }
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (mobile) user.mobile = mobile;
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }
        await user.save();
        if (password && !firstName && !lastName && !mobile) {
            user.password = undefined;
            return res.status(200).json({ message: "User profile updated successfully", password: 'pass updated' });
        }  
        if (password && firstName || lastName || mobile) {
            user.password = undefined;
            return res.status(200).json({ message: "User profile updated successfully", user, password: 'pass updated' });
        }  
        return res.status(200).json({ message: "User profile updated successfully", user });
        
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "User profile not found" });
    }

};
