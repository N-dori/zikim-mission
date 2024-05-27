import mongoose, { Schema } from "mongoose";

const userSceama = new Schema ({
    name : {
        type: String,
        required:[true , " please write your full name"]
    } ,
    email : {
        type: String,
        required:[true , " please write your full name"],
        unique:true,
    } ,
    battalion :  {
        type: String,
        required:[true , " please provide valid battalion"],
    }  ,
    password: {
        type: String,
        required:[true , " please provide password"]
    } ,
    readingProgress:{
          isEarlyHistoryCompleted:{
            type: Number,
            required:[false]
                } ,
          isOtefAzaCompleted:{
            type: Number,
            required:[false]
                } ,
                 
        }
    }

,
{
    timestamps:true
})

const User = mongoose.models.user || mongoose.model('user', userSceama) 

export default User