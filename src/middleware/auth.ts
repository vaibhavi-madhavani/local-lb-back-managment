import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

const userAuth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // checking if token is present in header
        if (!req.headers.authorization) {
            return res.status(403).send({ status: false, message: 'Token is required' })
        }
        // removing Bearer keyword
        const token: any = req.headers.authorization?.replace('Bearer ', '')
        // verifying token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true })
        // finding user with details decoded fro token
        let UserData: any = await User.findOne({ where: { id: decoded.id }, attributes: ['id', 'email', 'firstName', 'lastName'], raw: true })

        if (!UserData) {
            return res.status(403).send({ status: false, message: 'User Not Found' })
        }

        // setting req.user to user found from token and req.token to token
        req.token = token
        req.user = UserData
        next()
    } catch (e: any) {
        console.log(e)
        if (e.message == 'jwt malformed') {
            return res.status(403).send({ status: false, message: 'Token is required' })
        } else {
            return res.status(403).send({ status: false, message: e.message })
        }
    }
}

export default userAuth