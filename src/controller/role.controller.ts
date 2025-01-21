import { Request, Response } from 'express';
import { Role } from '../models/Role';

let getAll = async (req: Request, res: Response) => {
    try {
        let GetAllRole: any = await Role.findAll({ attributes: ['id', 'name'], raw: true })
        return res.status(200).send({ status: true, message: 'Get all Roles', data: GetAllRole });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: 'Server Error' })
    }
}

export = { getAll }