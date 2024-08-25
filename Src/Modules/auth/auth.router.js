import { Router } from "express";
const router =Router();
import * as AuthController from './auth.controller.js';
import { registerSchema } from "./auth.validation.js";
import { loginSchema} from "./auth.validation.js";
import validation from "../../Middleware/validation.js";
import {auth} from '../../Middleware/auth.middleware.js'
import { asyncHandler } from "../../utils/catcherror.js";



router.post('/register',validation(registerSchema),asyncHandler(AuthController.register));
router.post('/login',validation(loginSchema),asyncHandler(AuthController.login));
router.get('/allusers',AuthController.allusers);

export default router;