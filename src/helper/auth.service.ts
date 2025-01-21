import jwt from 'jsonwebtoken'
import passwordHash from 'pbkdf2-password-hash'
import moment from 'moment'

const generateToken = function (user: any) {
    try {
        let payload = user
        const accessToken: any = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME })
        const refreshToken: any = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME })

        return { accessToken, refreshToken };
    }
    catch (err: any) {
        console.log(err)
    }
}

const comparePassword = async (plainPassword: any, hashedPassword: any) => {
    return await passwordHash.compare(plainPassword, hashedPassword);
}

const encrypt = async (password: any) => {
    return await passwordHash.hash(password, { iterations: 100, digest: 'sha1', keylen: 16, saltlen: 16 })
}

const generateOtp = async (n: any) => {
    const val = Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
    return val;
}

const otpExpTime = async () => {
    const time = moment().add(process.env.OTP_EXPIRE_TIME, 'minutes').toDate(); // Ensure OTP_EXPIRE_TIME is parsed as an integer
    return time;
}

export { generateToken, comparePassword, encrypt, generateOtp, otpExpTime }