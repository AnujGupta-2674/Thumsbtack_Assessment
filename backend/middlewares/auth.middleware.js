import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Middleware to authenticate requests using JWT
 * Supports both Authorization header and cookies
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const protectRoute = async (req, res, next) => {
    try {
        let token;

        // 1️⃣ Check Authorization header
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // 2️⃣ Check cookies if header token not found
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        // If token is still not present
        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user without password
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach authenticated user to request object
        req.user = user;

        next();

    } catch (error) {
        console.error("Auth middleware error:", error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};