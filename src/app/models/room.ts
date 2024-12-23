import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
    score: {
      type: Number,
   
    },
    time: {
      type: Number,

    },
    isVinner:{
      type:Boolean
    }
  });

  const participantSchema = new Schema({
    
    name: {
      type: String,
      required: true
   
    },

    nickName: {
      type: String,
      required: true
   
    },
    img: {
      type: String,
      required: true

    },
    isAdmin: {
      type: Boolean,
      required: true
   
    },
    answers: [answerSchema] 
  });

  const roomSchema = new Schema({

    name: {
      type: String,
      required: true
    },
  
    participants: [participantSchema] 
  });

const Room = mongoose.models.room || mongoose.model('room', roomSchema)

export default Room