import express  from 'express';
import httpStatus from 'http-status';
import {success, error} from '../response/index.js'
export async function login(req:express.Request,res:express.Response):Promise<any> {
    try{
        console.log('Login successful.')
        return success(req,res,{msgCode:'LOGIN_SUCCESSFUL'},httpStatus.OK);

    }catch(err){
        return error(req,res,{msgCode:'SOMETHING_WENT_WRONG'},httpStatus.INTERNAL_SERVER_ERROR);
        
    }
    
}
