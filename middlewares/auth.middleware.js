import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const validateUserAuthorization = async(request, response, next) => {
    try {
        const token = request.cookies.remember_token;

        if(!token){
            return response.status(400).json({error: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded){
            return response.status(401).json({message: "Unauthorized: Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password");
        
        if(!user){
            return response.status(404).json({error: "User not found"})
        }

        request.user = user;

        next();
    } catch (error) {
        console.log("Error in validateUserAauthorization middleware", error);
        return response.status(500).json({error: "Internal server error"})
    }
}