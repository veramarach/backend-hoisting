import mongoose from "mongoose";

interface Cart{
    users:{},
    cartitem:{}[],
    bill:number

}
interface iCart extends Cart,mongoose.Document{}

const CartSchema= new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    cartitem:
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

export default mongoose.model<iCart>("carts", CartSchema)
