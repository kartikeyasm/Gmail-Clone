import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized access, token missing", success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized access, invalid token", success: false });
        }
        next();
    }catch (error) {
        console.error("Error in authMiddleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default authMiddleware;