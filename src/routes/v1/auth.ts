import express, { Router } from "express";
import {login} from '../../controllers/auth.js'

const authRouter:Router = express.Router();

authRouter.get('/login',login)


export default authRouter