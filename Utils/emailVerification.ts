import ejs from "ejs"
import path from "path"
import {google }from "googleapis"
import nodemailer from "nodemailer"




const GOOGLE_SECRET="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"
const GOOGLE_ID="470179463721-om0vp1311c78pvg7pjs0g6eip2k7fbuo.apps.googleusercontent.com"
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground"

const GOOGLE_REFRESHTOKEN = "1//049XKn5uNCTNjCgYIARAAGAQSNwF-L9IrLGXyxSBaV0BYzolWvCjXBNPpn6m14M3W1MOilU_3uukPGODQwcR5WQxzlZaHRlcEFSs"

const oAuth = new google.Auth.OAuth2Client(GOOGLE_ID,GOOGLE_SECRET,GOOGLE_REDIRECT);
oAuth.setCredentials({refresdh_token:GOOGLE_REFRESHTOKEN})

export const verifyUser = async(FullName:any, Email:any)=>{
    try
    {
        const accessToken = await oAuth.getAcesssToken()
        const tranporter = nodemailer.createTransport({
            service:"gmail",
            port:587,
            auth:{
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                type:"oAuth2",
             user: "jagolab01@gmail.com",
              refreshToken: GOOGLE_REFRESHTOKEN,
              clientId : GOOGLE_ID,
              clientSecretId: GOOGLE_SECRET,
              accessToken: accessToken

            }
        })

        

    }catch(error:any)
    {
      console.log("the error message")
      console.log(error)
      
    }
}
