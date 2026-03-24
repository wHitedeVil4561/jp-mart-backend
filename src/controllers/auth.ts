import {Request, Response}  from 'express';
import httpStatus from 'http-status';
import {success, error} from '../response/index.js';
import { Admin } from '../interfaces/index.js';
import { createAdmin, queryAdmin } from '../services/auth.js';
export async function addAdmin(req:Request,res:Response):Promise<any> {
    try{
        const payload:Admin = req.body;
        const {email, phone} = payload;
        const existingAdmin = await queryAdmin({email,phone});
        if(existingAdmin){
            return error(req,res,{msgCode:'ADMIN_ALREADY_EXISTS'},httpStatus.CONFLICT)
        }
        const newAdmin = await createAdmin(payload);
        return success(req,res,{msgCode:'NEW_ADMIN_CREATED',details:newAdmin},httpStatus.OK);
    }catch(err){
        return error(req,res,{msgCode:'SOMETHING_WENT_WRONG'},httpStatus.INTERNAL_SERVER_ERROR);
    }
}
