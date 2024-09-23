const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter product name"],
        trim: true
    },
    description:{
        type:String,
        required: [true, 'Please Enter description']
    },
    price:{
        type: Number,
        require: [true, 'Please Enter product price'],
        maxLength:[8, 'Price Cannot exceed 8 characters']
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category: {
        type:String,
        require:[true, "please Enter Product category"]
    },
    Stock:{
        type: Number,
        required:[true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            name:{
                type:String,
                required: true
            },
            rating:{
                type : Number,
                required: true
            },
            comment:{
                type: String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productSchema)