import express,{Request,Response} from "express"
import CartModel from "../Model/CartModel"
import ProductAuth from "../Model/ProductModel"
import UserAuth from "../Model/UserModel"

// export const AddtoCart = async(req:Request, res:Response):Promise<Response>=>{
//     try
//     {
//         const {quantityvalue} =req.body
//         const userId = req.params.userId
//         console.log(userId)

//         const checkUser = await UserAuth.findOne({_id:userId})
//         if(!checkUser)
//         {
//            return res.status(404).json({
//             message:"user not found"
//            })
//         }

//         const proId = req.params.proId
//         console.log(proId)

//         const checkProduct:any = await ProductAuth.findOne({_id:proId})
//         console.log(checkProduct)

//         const quantity:any = quantityvalue || 1
//         const price = checkProduct?.Price * quantity

//         if(!checkProduct)
//         {
//             return res.status(404).json({
//                 message:"product not found"
//             })
//         }
//         const catData = await CartModel.create({
//             users:userId,
//             cartitem:[{products:proId, quantity,price}],
//             bill:price * quantity
//         }) 

//         return res.status(201).json({
//             success:1,
//             result:catData
//         })
     
//     }catch(error:any)
//     {
//        return res.status(400).json({
//         message:error.message
//        })
//     }
// }

export const addToCart = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
         const {productId}=req.params
         const {userId} =req.params

         const getUser = await UserAuth.findOne({_id:userId})
         console.log("hgsdugsuduser",getUser)

         const getProduct:any = await ProductAuth.findOne({_id:productId})
         console.log(getProduct)

         const checkUserCart:any = await CartModel.findOne({user:userId})
         console.log(checkUserCart)
        if(checkUserCart)
         {
            const findIndexProduct= checkUserCart.cartitem.findIndex((item:any) => item?.products?.equals(productId))
            console.log("the index position is", findIndexProduct)

            if(findIndexProduct > -1)
            {
                const userSelectProd = checkUserCart.cartitem[findIndexProduct]
                console.log("gsadjhgsukdgui",userSelectProd)

                userSelectProd.quantity += 1
                
                checkUserCart.bill = checkUserCart.cartitem.reduce((acc:any, cur:any)=>{
                    console.log(cur)
                    return acc + cur.quantity * cur.price
                }, 0)
                
            checkUserCart.cartitem[findIndexProduct]= userSelectProd
            await checkUserCart.save()

            return res.status(201).json({
                message:"added sucessfully",
                data:checkUserCart
            })
            }else
            {
              checkUserCart.cartitem.push({products:getProduct?._id, quantity:1,price:getProduct?.Price})

              checkUserCart.bill = checkUserCart.cartitem.reduce((acc:any, cur:any)=> {
                console.log(cur)
                return acc + cur.quantity * cur.price
              }, 0)
              await checkUserCart.save()
              console.log("check oo",checkUserCart.bill)

              return res.status(201).json({
                message:"new product added",
                result:checkUserCart
              })
            }

         }else
        { 
            const dataCart = await CartModel.create({
            user:getUser?._id,
            cartitem:[{products: getProduct?._id, quntity:1, price:getProduct?.Price}],
            bill: 1 * getProduct?.Price
         })
         return res.status(201).json({
            message:"successfully added to cart",
            result:dataCart
         })
        }
         
    }catch(error:any)
    {
       return res.status(400).json({
        message:"error in adding to cart",
        error:error.message
       })
    }
}

export const RemoveCart = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
        const{userId} = req.params
        let productId =req.query.productId

        console.log(productId)

        const checkusercart:any= await CartModel.findOne({user:userId})
        console.log("oooooooo",checkusercart)

        const position = checkusercart?.cartitem?.findIndex((item:any)=> item?.products == productId)
        console.log("the position", position)
        if(position > -1)
        { 
            const item = checkusercart.cartitem[position]
            console.log( "these", item)

            if(item.quantity > 1)
            {
                item.quantity -= 1
                checkusercart.bill -= item.price
            }else
            {
                checkusercart.bill -= item.quantity * item.price

                if(checkusercart.bill < 0)
                {
                    checkusercart.bill =  0
                }
    
                checkusercart.cartitem.splice(position, 1)
            }

            console.log("jksnd",checkusercart)
            checkusercart.bill = checkusercart.cartitem.reduce((acc:any, cur:any)=>{
                return acc + cur.quantity * cur.Price
            })
            await checkusercart.save()
           return res.status(201).json({
            message:"item has been removed"
           })
        }else
        {
            return res.status(401).json({
                message:"you have no item "
            })
        }

    }catch(error:any)
    {
        return res.status(400).json({
            message:error.message
        })
    }
}