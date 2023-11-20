import mongoose from "mongoose";

interface Order{
    users:{},
    orderitems:{}[],
    bill:number

}
interface iOrder extends Order,mongoose.Document{}

const CartSchema= new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    orderitems:
    [
        {
            products:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity:
            {
                type:Number,
                default:1,
                min:1
            },
            price:
            {
                type:Number
            }
        }
    ],
    bill:
    {
        type:Number,
        default:0
    }
},
{timestamps:true}
)

export default mongoose.model<iOrder>("orders", CartSchema)
