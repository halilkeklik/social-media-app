const mongoose=require("mongoose")

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    caption:{
        type:String,
        trim:true
    },
    images:[{
        type:String,
        required:false
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

module.exports=Post