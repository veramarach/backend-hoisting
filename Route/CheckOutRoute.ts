import express,{Router} from "express"
import { checkOut } from "../Controller/OrderController"

const router = express.Router()

router.route("/check-out/:userId").post(checkOut)

export default router