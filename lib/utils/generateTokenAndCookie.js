import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (userId, response) => {
 const token = jwt.sign({userId}, process.env.SECRET_KEY, {
    expiresIn: '10d'
 })
 
 
 response.cookie("remember_token", token, {
    maxAge: 10*24*60*60*1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== 'development'
 })
}