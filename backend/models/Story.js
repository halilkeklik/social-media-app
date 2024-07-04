const mongoose=require("mongoose")

const storySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    text:{
        type:String,
        require:true,
        trim:true
    },
    image:{
        type:String,
        require:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Story = mongoose.model("Story",storySchema)

module.exports=Story