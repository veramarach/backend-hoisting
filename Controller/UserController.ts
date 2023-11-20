import express,{Request,Response} from "express"
import UserAuth from "../Model/UserModel"
import ProfileModel from "../Model/ProfileModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const tranporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service:"gmail",
    port: 587,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "jagolab01@gmail.com",
      pass: "bpxl wvee iitw dqcl",
    },
  
})

export const UserReg = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
        const{FullName,Email,Password, role} = req.body
        if(!FullName || !Email || !Password)
        {
          return res.status(401).json({
            success:0,
            message:"all field required"
          })
        }
        const CheckEmail = await UserAuth.findOne({Email:Email})
        if(CheckEmail)
        {
           return res.status(401).json({
            message:"email already exist"
           })
        }
        const Salt = await bcrypt.genSalt(10)
        const HashPassword = await bcrypt.hash(Password,Salt)

        const CreateUser = await UserAuth.create({
            FullName,
            Email,
            Password:HashPassword,
            role
        })
        const createProfile = await ProfileModel.create({
            _id:CreateUser._id,
            FirstName:"",
            LastName:"",
            gender:"",
            avatar:"",
            DateofBirth:""

        })
        CreateUser.Profile = createProfile._id
        CreateUser.save()

        createProfile.user= CreateUser._id
        createProfile.save()

        let mailOption = {
            from: '"MEDIQUEST 👻😎" <noreply@unitstore.com>', // sender address
            to: Email, // list of receivers
            subject: "Test Result", // Subject line
            html: `<b>PLEASE CLICK THE LINK <a href='http://localhost:3800/api/v1/verify-account/${CreateUser._id}'>Link</a> to verify account</b>`, // html body
        }

        await tranporter.sendMail(mailOption, (error:any, info:any)=>{
            if(error)
            {
               console.log("error in sending email,error")
            }else{
                console.log("email sent", info.response)
            }
        })

        return res.status(201).json({
            success:1,
            message:"registration successful",
            result:CreateUser
        })
    }catch(error:any)
    {
      return res.status(400).json({
        message:error.message
      })
    }
}

export const getSingleuser = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
        const getOneuser = await UserAuth.findById(req.params.id).populate(
            {
                path:"Profile",
                 select:"FirstName LastName gender"
            }
        )

        return res.status(201).json({
            message:"successfully gotten",
            data:getOneuser
        })

    }catch(error:any)
    {
       return res.status(400).json({
        message:"failed to get user",
        error:error.message
       })
    }

}

export const verifyUser = async(req:Request, res:Response):Promise<Response>=>{
    try{
        const user = await UserAuth.findById(req.params.id)
        console.log(user)

        const verifyData = await UserAuth.findByIdAndUpdate(req.params.id,
            {
                verify:true
            },
            {
                new:true
            }

            )
            return res.status(201).json({
                message:"account has been verified proceed to login"
            })


    }catch(error:any)
    {
        return res.status(400).json({
            message:error.message
        })
    }
}

export const LogInUser = async(req:Request, res:Response):Promise<Response>=>{

    try{

        const {Email, Password} = req.body
        if(!Email || !Password)
        {
            return res.status(400).json({
                message:"pls enter all field"
            })
        }
        const Checkemail = await UserAuth.findOne({Email:Email})
        if(Checkemail)
        {
          const checkPass = await bcrypt.compare(Password, Checkemail.Password)
          if(checkPass)
          
          {
            if(Checkemail.verify)
            {
                const token = jwt.sign(
                    {
                        _id:Checkemail._id, Email:Checkemail.Email, FullName:Checkemail.FullName,role:Checkemail.role,
                    },
                    "wertyuiopkjhgfdsa",
                    {
                        expiresIn:"1d"
                    },
                
                 ) 
                 const{Password,...info}= Checkemail._doc
                 const option:any= {expiresIn:"3d"}
                 res.cookie("sessionId", token,option)
                 return res.status(201).json({
                    success:1,
                    message:"login successful",
                    result:{info,token}
                 })



            }else
            {
                let mailOption = {
                    from: '"MEDIQUEST 👻😎" <noreply@unitstore.com>', // sender address
                    to: Email, // list of receivers
                    subject: "Test Result", // Subject line
                    html: `<b>PLEASE CLICK THE LINK <a href='http://localhost:3800/api/v1/verify-account/${Checkemail._id}'>Link</a> to verify account</b>`, // html body
                }
                await tranporter.sendMail(mailOption, (error:any, info:any)=>{
                    if(error)
                    {
                       console.log("error in sending email,error")
                    }else{
                        console.log("email sent", info.response)
                    }
                })
                return res.status(200).json({
                    message:"please check your email to verify account"
                })
            }
           
          }else
          {
            return res.status(400).json({
                message:"incorrect password"
            })
          }
        }else
        {
            return res.status(400).json({
                message:"user not found"
            })
        }
        
    }catch(error:any)
    {
       return res.status(400).json({
        message:error.message
       })
    }
}

export const GetAllUser = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
        const AllUsers = await UserAuth.find()
        return res.status(200).json({
            message:"all users found",
            result:AllUsers
        })

    }catch(error:any)
    {
        return res.status(400).json({
            massage:"users not found",
            error:error.message
        })
    }
}

export const LogOutUser = async(req:Request, res:Response):Promise<Response>=>{
    try
    {
        res.clearCookie("sessionId")
        return res.status(201).json({
            message:"signout successfull"
        })

    }catch(error:any)
    {
        return res.status(400).json({
            message:error.message
        })
    }
}