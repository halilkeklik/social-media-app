const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const registerController=async (req,res,next)=>{
    try{
       const {password,username,email}=req.body
       const existingUser=await User.findOne({ $or: [{username},{email}] })
       if(existingUser){
         res.status(400).json("UserName or email already used")
       }

       const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hashSync(password,salt)
       const newUser=new User({...req.body,password:hashedPassword})
       const savedUser=await newUser.save()
       res.status(201).json(savedUser)
       
    }
    catch(error){
        res.status(500).json(error)
    }
}

const loginController=async (req,res,next)=>{
    try{
        let user;
        if(req.body.email){
            user=await User.findOne({email:req.body.email})
        }
        else{
            user=await User.findOne({userName:req.body.userName})
        }

        if(!user){
            throw new CustomError("User not found!",404)
        }

        const match=await bcrypt.compare(req.body.password,user.password)

        if(!match){
            return res.status(401).json("UserName or password wrong")
        }

        const {password,...data}=user._doc
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
        res.cookie("token",token).status(200).json(data)

    }
    catch(error){
        res.status(500).json(error)
    }
}

const logoutController=async(req,res,next)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).json("user logged out successfully!")

    }
    catch(error){
        res.status(500).json(error)
    }
}

const refetchUserController=async(req,res,next)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.JWT_SECRET,{},async(err,data)=>{
        if(err){
            res.status(404).json(err)
        }
        try{
          const id=data._id
          const user=await User.findOne({_id:id})
          res.status(200).json(user)
        }
        catch(error){
            res.status(500).json(error)
        }
    })
}

module.exports={registerController,loginController,
                logoutController,refetchUserController}