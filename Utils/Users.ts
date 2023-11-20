import joi from "joi"



  export const JoiSchema = joi.object({
        FullName:joi.string().required(),
    Email:joi.string().email().lowercase().required(),
    Password:joi.string().min(6).max(15).required(),
    Confirm_Password:joi.ref("Password")
    })


    
    

    
