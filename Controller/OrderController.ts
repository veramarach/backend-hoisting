import express,{Request,Response} from "express"
import Flutterwave from "flutterwave-node-v3"
import CartModel from "../Model/CartModel"
import ProductAuth from "../Model/ProductModel"
import UserAuth from "../Model/UserModel"
import OrdersModel from "../Model/OrdersModel"
import { v4 as uuidv4 } from 'uuid'

const flw = new Flutterwave("FLWPUBK_TEST-72daa9b73a9cb0d48265964777ae5192-X", "FLWSECK_TEST-564562760325ad827c86f53ae9a0f8b7-X")



export const checkOut = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
       
        
        const {userId} = req.params
        const findUserCart = await CartModel.findOne({user:userId})
        console.log(findUserCart)
        const {card_number, cvv, expiry_month, expiry_year, fullname} = req.body
        const payload = {
            "card_number": card_number,
            "cvv": cvv,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year,
            "currency": "NGN",
            "amount": findUserCart?.bill,
            "redirect_url": "https://www.google.com",
            "fullname": fullname,
            "email": "developers@flutterwavego.com",
            "phone_number": "09000000000",
            "enckey": "FLWSECK_TESTdfe30386eb01",
            "tx_ref": uuidv4()
        
        }
        const response = await flw.Charge.card(payload)
        console.log(response)

        if (response.meta.authorization.mode === 'pin') {
            let payload2:any = payload
            payload2.authorization = {
                "mode": "pin",
                // "fields": [
                //     "pin"
                // ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })
            console.log(callValidate)
            if(callValidate.status === 'success')
            {
              const createOrder =await OrdersModel.create({
                user:findUserCart?.users,
                orderitems:findUserCart?.cartitem,
                bill:findUserCart?.bill
              })

              await CartModel.findByIdAndDelete({_id:findUserCart?._id})
              return res.status(201).json({
                message:"payment successfull",
                data:"check your order"
              })
            }else
            {
                return res.status(201).json({
                    message:"error in making payment"
                })
            }
        }

        if (response.meta.authorization.mode === 'redirect') {

            var url = response.meta.authorization.redirect
            open(url)
        }

        console.log(response)

        return res.status(201).json({
            message:"working now"
        })

    }catch(error:any)
    {
        return res.status(400).json({
            message:error.message
        })
    }
}