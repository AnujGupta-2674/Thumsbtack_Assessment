import { Router } from 'express';
import * as authControllers from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
// import { signupValidator, loginValidator } from '../validators/auth.validators.js';

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/me", protectRoute, authControllers.userDetails);
router.post("/logout", authControllers.logout);

export default router;
