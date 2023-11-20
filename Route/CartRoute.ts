import express,{Router} from "express"
import { addToCart, RemoveCart } from "../Controller/CartController"


const router = express.Router()
router.route("/add-cart/:userId/:productId").post(addToCart)
router.route("/remove-item/:userId").delete(RemoveCart)


export default router