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

},
{
    timestamps:true
})

const User = mongoose.models.user || mongoose.model('user', userSceama) 

export default User