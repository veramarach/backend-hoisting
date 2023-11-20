import mongoose from "mongoose";

const onLineUrl="mongodb+srv://edemahd:DEkPZi2O8M1xacFi@cluster0.pw3yjp0.mongodb.net/ecommerce"
const Url:string = "mongodb://0.0.0.0:27017/ClassRef"

mongoose.connect(onLineUrl).then(()=>{
    console.log("database connected successfully")
})
.catch((error:any)=>{
    console.log("an error occurred")
})

export  default mongoose