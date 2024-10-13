import {PrismaClient} from "@prisma/client";
import { Admin } from "../interfaces/index.js";
const prisma = new PrismaClient();
type AdminParams = Pick<Admin, 'email' | 'phone'> & {id:string};
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
        console.log(admin);
        return admin
    }catch(err){
        console.log(err);
        return false
    }
}