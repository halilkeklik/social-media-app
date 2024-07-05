const express = require("express")
const connectDB =require("./database/db")
const app = express()
const dotenv=require("dotenv")
const authRoute = require("./routes/auth")

dotenv.config()
app.use(express.json())
app.use("/api/auth",authRoute)


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running")
})