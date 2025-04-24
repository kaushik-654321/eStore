import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserActivation.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Not authorized, invalid token" })
    }
}

