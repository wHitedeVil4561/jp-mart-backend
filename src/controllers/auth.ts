import {Request, Response}  from 'express';
import httpStatus from 'http-status';
import {success, error} from '../response/index.js';
import { Admin } from '../interfaces/index.js';
import { queryAdmin } from '../services/auth.js';
export async function addAdmin(req:Request,res:Response):Promise<any> {
    try{
        const payload:Admin = req.body;
        const {email, phone} = payload;
        const exitingAdmin = await queryAdmin({email,phone});
        if(exitingAdmin){
            return error(req,res,{msgCode:'ADMIN_ALREADY_EXISTS'},httpStatus.CONFLICT)
        }
        return success(req,res,{msgCode:'LOGIN_SUCCESSFUL'},httpStatus.OK);
    }catch(err){
        return error(req,res,{msgCode:'SOMETHING_WENT_WRONG'},httpStatus.INTERNAL_SERVER_ERROR);
        
    }
}
