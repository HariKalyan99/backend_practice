import express from "express";
import { authSignUp, authLogin, authLogout, getMe } from "../controllers/auth.user.controllers.js";
import { validateUserAuthorization } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", validateUserAuthorization, getMe)
router.post("/signup", authSignUp);
router.post("/login", authLogin);
router.get("/logout", authLogout)

export default router;