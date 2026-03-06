import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

/**
 * Register a new user
 *
 * @route   POST /auth/signup
 * @access  Public
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 *
 * @body {string} name - User's full name
 * @body {string} email - User's unique email address
 * @body {string} password - User password (min 6 characters)
 *
 * @returns {Object} 201 - Created user object (without password)
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 409 - User already exists
 * @returns {Object} 500 - Internal server error
 */
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email }).lean();

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Convert mongoose document to object
        const userObject = user.toObject();

        // Remove password before sending response
        delete userObject.password;

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: userObject,
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/**
 * Authenticate user and return JWT token
 *
 * @route   POST /auth/login
 * @access  Public
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Convert mongoose document to object and remove password
        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).json({
            message: "Login successful",
            token,
            user: userObject
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/**
 * Get authenticated user details
 *
 * @route GET /auth/me
 * @access Private
 */
export const userDetails = async (req, res) => {
    try {
        // req.user is attached by auth middleware
        const user = req.user;

        return res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        console.error("User details error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/**
 * Logout user by clearing auth cookie
 *
 * @route POST /auth/logout
 * @access Public
 */
export const logout = async (req, res) => {
    try {

        // Clear JWT cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};