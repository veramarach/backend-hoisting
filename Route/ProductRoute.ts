import express,{Router} from "express"
import { CreateProduct, GetAllProduct, GetSingleProduct} from "../Controller/ProductController"
import {uploaded} from "../Utils/multer"
import { verifyToken } from "../Utils/VerifyToken"

const router = express.Router()

router.route("/create-product/:catId").post(verifyToken, uploaded,CreateProduct)
router.route("/all-product").get(GetAllProduct)
router.route("/single-product/:id").get(GetAllProduct)



export default router