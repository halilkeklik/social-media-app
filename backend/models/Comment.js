const mongoose=require("mongoose")

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        require:true
    },
    text:{
        type:String,
        require:true,
        trim:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    replies:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        },
        likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        text:{
            type:String,
            require:true,
            trim:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Comment = mongoose.model("Comment",commentSchema)

module.exports=Comment