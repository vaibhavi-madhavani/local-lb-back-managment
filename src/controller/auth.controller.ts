import { Request, Response } from 'express';
import { generateToken, comparePassword, encrypt, generateOtp, otpExpTime } from '../helper/auth.service';
import moment from 'moment'
import { User } from '../models/User';
import { Role } from '../models/Role';
import { EMAILCONSTANT } from '../helper/constant';
import { emailSender } from '../helper/email.helper';
import jwt from 'jsonwebtoken';


/** Register API */
const register = async (req: Request, res: Response) => {
    try {
        let { email, password, firstName, lastName, roleId } = req.body;

        let CheckEmailExist: any = await User.findOne({ where: { email: email }, raw: true });
        if (CheckEmailExist) {
            return res.status(400).send({ status: false, message: "Email Already Exists" });
        }

        let createObject: any = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            roleId: roleId,
            password: await encrypt(password)
        }
        let createData: any = await User.create(createObject);

        if (createData) {
            return res.status(200).send({ status: true, message: 'Registered Successfully' });
        } else {
            return res.status(400).send({ status: false, message: 'Something Went Wrong' });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
}

/** Login API */
const login = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        let CheckEmailExist: any = await User.findOne({ where: { email: email }, raw: true })
        if (!CheckEmailExist) {
            return res.status(400).send({ status: false, message: "Email Not Found" });
        }

        let isMatch = await comparePassword(password, CheckEmailExist.password)
        if (!isMatch) {
            return res.status(200).send({ status: false, message: 'Incorrect Password' })
        }

        const tokenData: any = generateToken({ id: CheckEmailExist.id, email: CheckEmailExist.email })

        /** Get Role Name */
        let getRole = await Role.findOne({ where: { id: CheckEmailExist.roleId }, attributes: ['id', 'name'], raw: true })
        if (!getRole) {
            return res.status(400).send({ status: false, message: 'Invalid Role' })
        }

        let responseObj = {
            user_id: CheckEmailExist.id,
            email: CheckEmailExist.email,
            token: tokenData.accessToken,
            refreshToken: tokenData.refreshToken,
            roleName: getRole.name
        }

        return res.status(200).send({ status: true, message: 'Login Successfully', data: responseObj });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ status: false });
    }
}

/** Forgot Password API */
const forgotPassword = async (req: Request, res: Response) => {
    try {
        let { email } = req.body;
        let OTP: any = await generateOtp(6);

        let CheckEmailExist: any = await User.findOne({ where: { email: email }, raw: true })
        if (!CheckEmailExist) {
            return res.status(400).send({ status: false, message: 'Email Not Found' })
        }

        /** send OTP to Mail */
        await User.update({ otp: OTP, otp_expire_time: await otpExpTime() }, { where: { id: CheckEmailExist.id } })

        /** Email config */
        const templateData = {
            email: email,
            OTP: OTP
        };

        await emailSender(
            email,
            EMAILCONSTANT.FORGOT_PASSWORD.subject,
            templateData,
            EMAILCONSTANT.FORGOT_PASSWORD.template,
        )
        return res.status(200).send({
            status: true,
            message: 'OTP sent successfully in your email',
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
};

/** Resend OTP API */
const resendOTP = async (req: Request, res: Response) => {
    try {
        let { email } = req.body;
        let OTP: any = await generateOtp(6);

        let CheckEmailExist: any = await User.findOne({ where: { email: email }, raw: true })
        if (!CheckEmailExist) {
            return res.status(400).send({ status: false, message: 'Email Not Found' })
        }

        /** send OTP to Mail */
        await User.update({ otp: OTP, otp_expire_time: await otpExpTime() }, { where: { id: CheckEmailExist.id } })

        /** Email config */
        const templateData = {
            email: email,
            OTP: OTP
        };

        await emailSender(
            email,
            EMAILCONSTANT.RESEND_OTP.subject,
            templateData,
            EMAILCONSTANT.RESEND_OTP.template,
        )
        return res.status(200).send({
            status: true,
            message: 'OTP resent successfully in your email',
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
};

/** Verify OTP API */
const verifyOtp = async (req: Request, res: Response) => {
    try {
        let { email, otp } = req.body;

        let CheckEmailExist: any = await User.findOne({ where: { email: email }, attributes: ['id', 'otp_expire_time', 'otp'], raw: true })
        if (!CheckEmailExist) {
            return res.status(400).send({ status: false, message: 'Email Not Found' })
        }

        if (moment(CheckEmailExist.otp_expire_time) < moment(new Date())) {
            return res.status(400).send({ status: false, message: 'OTP Expired' })
        }

        if (otp != CheckEmailExist.otp) {
            return res.status(400).send({ status: false, message: 'Invalid OTP' })
        }
        let updateObj: any = { otp: null, otp_expire_time: null }
        await User.update(updateObj, { where: { id: CheckEmailExist.id } })

        return res.status(200).send({
            status: true,
            message: 'OTP Verified Successfully',
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
};

/** Reset Password API */
const resetPassword = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body

        let CheckEmailExist: any = await User.findOne({ where: { email: email }, attributes: ['id'], raw: true })
        if (!CheckEmailExist) {
            return res.status(400).send({ status: false, message: 'email Not Found' })
        }

        let updatePassObj: any = { password: await encrypt(password) }
        await User.update(updatePassObj, { where: { id: CheckEmailExist.id } })
        return res.status(200).send({ status: true, message: 'Successfully Password Reset' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
};

const getTokenFromRefreshToken = async (req: Request, res: Response) => {
    try {
        let { refreshToken } = req.body;

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION_TIME }
        );

        return res.status(200).send({ status: true, message: 'Successfully token generated', token: accessToken })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

export = { login, register, forgotPassword, verifyOtp, resetPassword, resendOTP, getTokenFromRefreshToken }