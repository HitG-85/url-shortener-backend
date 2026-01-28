//entry point 
const express= require('express');
const {connectMongo} =require('./connect');
const PORT=6700;
const urlRoute= require('./routes/url');
const userRoute=require('./routes/user');

const app=express();

//connect to MongoDB
connectMongo("mongodb://127.0.0.1:27017/url-shortener").then(()=>console.log('mongodb connected')).catch(err => console.error(err));

//parse incoming request
app.use(express.json());   

//test route
app.get("/test",(req,res)=>{
return res.end("<h1>Hello<h1>");
});

app.use("/url", urlRoute); 
app.use("/user",userRoute);

//server starts here
app.listen(PORT, ()=>console.log('server started successfully'));





