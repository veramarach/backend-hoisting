import jwt from "jsonwebtoken"

// export const verifyToken = async(req:any, res:any, next:any)=> {
//     const getsession = req.headers["cookie"]
//     if(!getsession)
//     {
//         return res.status(404).json({
//             message:"please login to get token"
//         })
//     }
//     const tokenCookies = getsession.split("=")[1]
//     console.log("yghhbe", tokenCookies)
//     if(tokenCookies)
//     {
//       const token = await tokenCookies
//       jwt.verify(token, "wertyuiopkjhgfdsa", (err:any, payload:any)=>{
//         if(err)
//         {
//             return res.status(404).json({
//                 message:"token expired"
//             })
//         }
//         req.user = payload
//         next()
//       } )
      
//     }else
//     {
//          return res.status(404).json({
//             message:"please provide a valid token"
//          })
//     }
// }

export const verifyToken= async(req:any, res:any, next:any)=>{
    if(req.headers.authorization)
    {
        const token = await req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token,"wertyuiopkjhgfdsa", (err:any, payload:any)=>{
            if(err)
            {
                return res.status(404).json({
                    message:"token expired"
                })
            }
            req.user = payload
            next()
        } )
    }else
    {
      return res.status(400).json({
        message:"pls provide a valid token",
        
      })
    }

}