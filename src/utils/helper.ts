import { Request,Response,NextFunction } from "express";
import { Schema } from "joi";
import * as response from '../response/index.js'
import httpStatus from "http-status";
export function requestValidate(schema:Schema,property:'body' | 'query' = 'body'){
    console.log('joi validation happening')
    return (req:Request,res:Response,next:NextFunction)=>{
        const {error,value} = schema.validate(req?.[property]);
        console.log(error,value);
        if(error){
            const {details} = error;
            const message = details.map(i=>i.message).join(",");
            response.error(req,res,{msgCode:'BAD_REQUREST',data:{message}},httpStatus.BAD_REQUEST);
            return
        }
        next();
    }
}