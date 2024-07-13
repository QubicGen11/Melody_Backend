const mongoose=require('mongoose')
const User=require('./userModel')
const houseSchema=new mongoose.Schema({
    houseType:{
        type:String,
        required:true
    },
    address:{
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            require:true
        },
        latitude:{
            type:String,
            required:true
        },
        longitude:{
            type:String,
            require:true
        }
    },
    amenities:[String],
    ownerName:{
        type:String,
        required:true
    },
    ownerPhone:{
        type:String,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true})
const House=mongoose.model('House',houseSchema)
module.exports=House