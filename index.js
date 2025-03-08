import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/Database.js";
import cors from "cors"
dotenv.config();
const app  = express()

app.use(cors({
  origin: ['http://localhost:3000', 'https://l4-tct-deployment.vercel.app','http://127.0.0.1:5500','https://backend.thecatalysttree.com','https://frontend.thecatalysttree.com',"https://www.thecatalysttree.com","https://thecatalysttree.com"], 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,  
}))
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