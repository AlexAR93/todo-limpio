import { Schema,model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const ProductModel=model("products",new Schema({
    productName:{type:String,required:true,max:50},
    productType:{type:String,required:true,max:50},
    brand:{type:String,required:true,max:50},
    price:{type:Number, required:true},
    description:{type:String,required:true,max:200},
    file:{type:Buffer}
}).plugin(mongoosePaginate));