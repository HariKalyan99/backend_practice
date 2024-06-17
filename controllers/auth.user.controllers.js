import { generateTokenAndCookie } from "../lib/utils/generateTokenAndCookie.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const authSignUp = async(request, response) => {
    try {
        const {fullName, username, password, email} = request.body;

        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return response.status(400).json({error: "Invalid email"});
        }

        const existUser = await User.findOne({username});
        
        if(existUser){
            return response.status(400).json({error: "Username is already taken"})
        }

        const existEmail = await User.findOne({email});
        if(existEmail){
            return response.status(400).json({error: "Email already exists"})
        }

        if(password.length < 6){
            return response.status(400).json({error: "Password must have atleast 6 charecters"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            fullName,
            password: hashedPassword,
            email
        })

        if(newUser){
            // generateTokenAndCookie(newUser._id, response);
            await newUser.save();

            return response.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })

        }else{
            return response.status(400).json({error: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in authSignUp controller", error);
        return response.status(500).json({error: "Internal server error"})
    }
}


export const authLogin = async(request, response) => {
    try {
        const {username, password} = request.body;

        const user = await User.findOne({username});
        const passwordVerify = await bcrypt.compare(password, user?.password || "");

        if(!user || !passwordVerify){
            return response.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndCookie(user._id, response);

        return response.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })
    } catch (error) {
        console.log("Error in authLogin controller", error);
        return response.status(500).json({error: "Internal server error"})
    }
}


export const authLogout = (request, response) => {
    try {
        response.cookie("remember_token", "", {maxAge: 0});
        return response.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in authLogout controller", error);
        return response.status(500).json({error: "Internal server error"})
    }
}


export const getMe = async(request, response) => {
    try {
        const user = await User.findById(request.user._id).select("-password");
        return response.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error);
        return response.status(500).json({error: "Internal server error"})
    }
}