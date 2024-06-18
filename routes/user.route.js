import express from 'express'
import { validateUserAuthorization } from '../middlewares/auth.middleware.js';
import { getUserProfile,getSuggestedUsers,
    followUnfollowUser,
    updateUserProfile } from '../controllers/user.controllers.js';

const router = express();

router.get("/profile/:username", validateUserAuthorization, getUserProfile);
router.get("/suggested", validateUserAuthorization, getSuggestedUsers);
router.post("/follow/:id", validateUserAuthorization, followUnfollowUser);
router.post("/update", validateUserAuthorization, updateUserProfile);

export default router