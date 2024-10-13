import express, { Application } from "express";
import {ENV} from './config/env.constant.js';
import router from './routes/index.js'
const app:Application = express();
const port = ENV.PORT;




app.use('/api', router)
app.listen(port,()=>{
    console.log(`Application running on port ${port}`)
})