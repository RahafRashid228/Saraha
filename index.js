import express from 'express';
import initApp from './Src/initApp.js';
//import productModel from './DB/models/product.model.js';
import 'dotenv/config';
const app = express();

initApp(app,express);

app.listen(process.env.Port,()=>{
    console.log(`server is runnning on port ${process.env.Port}!`)

})