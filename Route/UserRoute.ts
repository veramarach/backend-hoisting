import express, {Router} from "express"
import { UserReg,getSingleuser,GetAllUser,LogInUser,LogOutUser,verifyUser} from "../Controller/UserController"
import { verifyToken } from "../Utils/VerifyToken"



const router = express.Router()

router.route("/create-user").post(UserReg)
router.route("/single-user/:id").get(getSingleuser)
router.route("/all-user").get(GetAllUser)
router.route("/login-user").post( LogInUser)
router.route("/logout-user").post(LogOutUser)
router.route("/verify-account/:id").get(verifyUser)


export default router