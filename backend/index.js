const express = require("express")
const connectDB =require("./database/db")
const app = express()
const dotenv=require("dotenv")
const authRoute = require("./routes/auth")
const cookieParser = require("cookie-parser")
const {errorHandler}=require("./middlewares/error")

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/api/auth",authRoute)
app.use("/api/user",verifyToken,userRoute)

app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running")
})