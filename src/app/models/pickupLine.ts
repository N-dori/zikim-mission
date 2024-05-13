import mongoose, { Schema } from "mongoose";

const pickupLineSceama = new Schema ({
    line : String ,

},
{
    timestamps:true
})

const PickupLine = mongoose.models.pickupLine || mongoose.model('pickupLine', pickupLineSceama) 

export default PickupLine