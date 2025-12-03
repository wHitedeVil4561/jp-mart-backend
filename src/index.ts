import express, { Application } from "express";
import {ENV} from './config/env.constant.js';
import router from './routes/index.js';
import bodyparser from 'body-parser';

const app:Application = express();
const port = ENV.PORT;


app.use(bodyparser.json())
app.use('/api', router)
app.listen(port,()=>{
    console.log(`Application running on port ${port}`)
})