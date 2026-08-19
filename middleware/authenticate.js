import {verifyToken} from "../utils/jwt.js"

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided." });
    }
    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token)
    if (payload === null) {
        return res.status(401).json({"error": "Invalid or expired token."})
    }
    req.user = payload
    next()
}

export {authenticate}