import { Router } from 'express';
import authController from '../controller/auth.controller';
import authValidator from '../validator/auth.validator';

const router: Router = Router();

/** Register API */
router.post('/register', authController.register);

/** Login API */
router.post('/login', authValidator.login(), authController.login);

/** Forgot Password API */
router.put('/forgot-password', authValidator.forgotPassword(), authController.forgotPassword);

/** Verify OTP API */
router.post('/verify-otp', authValidator.verifyOtp(), authController.verifyOtp);

/**Reset Password API */
router.put('/reset-password', authValidator.resetPassword(), authController.resetPassword);

/**Resend OTP API */
router.put('/resend-otp', authValidator.resendOTP(), authController.resendOTP);

/** Get Token from refresh token */
router.post('/get-token', authController.getTokenFromRefreshToken);

export default router;