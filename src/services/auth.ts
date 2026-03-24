import {prisma} from "./db.js";
import { Admin } from "../interfaces/index.js";
type AdminParams = Pick<Admin, 'email' | 'phone'> & {id:string};
type CreateAdminParams = Pick<Admin, 'name' | 'email' | 'country_code' | 'phone' | 'password'>;
export async function queryAdmin(params:Partial<AdminParams>) {
    try{
        const admin = await prisma.admin.findFirst({
            where:{
                OR:[
                    {email:params.email},
                    {phone:params.phone}
                ]
            }
        });
        return admin
    }catch(err){
        return false
    }
}

export async function createAdmin(params:CreateAdminParams) {
    try{
        const newAdmin = await prisma.admin.create({data:params});
        return newAdmin
    }catch(err){
        return false
    }
}