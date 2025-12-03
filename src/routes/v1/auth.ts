import express, { Router } from "express";
import {addAdmin} from '../../controllers/auth.js'
import { requestValidate } from "../../utils/helper.js";
import { createAdminSchema } from "../../joi-schemas/auth.js";

const authRouter:Router = express.Router();

authRouter.post('/add-admin',requestValidate(createAdminSchema),addAdmin)
authRouter.post("/login",)

export default authRouter