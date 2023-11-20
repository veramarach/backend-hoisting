"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        const token = yield req.headers.authorization.split(" ")[1];
        console.log(token);
        jsonwebtoken_1.default.verify(token, "wertyuiopkjhgfdsa", (err, payload) => {
            if (err) {
                return res.status(404).json({
                    message: "token expired"
                });
            }
            req.user = payload;
            next();
        });
    }
    else {
        return res.status(400).json({
            message: "pls provide a valid token",
        });
    }
});
exports.verifyToken = verifyToken;
