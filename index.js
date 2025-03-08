import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/Database.js";
dotenv.config();
const app  = express()

//connect db
connectDatabase()

//middlewares utils
app.use(express.json())
app.use(cookieParser());

//import routes
import BaseAuthRoutes from "./Routes/BaseUserAuthRoutes/userAuthRoutes.js"
import OrgDetailRoutes from "./Routes/BaseUserAuthRoutes/userDetailRoutes.js"


//use routes
app.use(BaseAuthRoutes)
app.use(OrgDetailRoutes)

app.get("/",(req,res)=>{
  res.json({"msg":"working"})
})



const PORT = process.env.PORT||4000

app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})