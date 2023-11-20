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
exports.RemoveCart = exports.addToCart = void 0;
const CartModel_1 = __importDefault(require("../Model/CartModel"));
const ProductModel_1 = __importDefault(require("../Model/ProductModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
// export const AddtoCart = async(req:Request, res:Response):Promise<Response>=>{
//     try
//     {
//         const {quantityvalue} =req.body
//         const userId = req.params.userId
//         console.log(userId)
//         const checkUser = await UserAuth.findOne({_id:userId})
//         if(!checkUser)
//         {
//            return res.status(404).json({
//             message:"user not found"
//            })
//         }
//         const proId = req.params.proId
//         console.log(proId)
//         const checkProduct:any = await ProductAuth.findOne({_id:proId})
//         console.log(checkProduct)
//         const quantity:any = quantityvalue || 1
//         const price = checkProduct?.Price * quantity
//         if(!checkProduct)
//         {
//             return res.status(404).json({
//                 message:"product not found"
//             })
//         }
//         const catData = await CartModel.create({
//             users:userId,
//             cartitem:[{products:proId, quantity,price}],
//             bill:price * quantity
//         }) 
//         return res.status(201).json({
//             success:1,
//             result:catData
//         })
//     }catch(error:any)
//     {
//        return res.status(400).json({
//         message:error.message
//        })
//     }
// }
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { userId } = req.params;
        const getUser = yield UserModel_1.default.findOne({ _id: userId });
        console.log("hgsdugsuduser", getUser);
        const getProduct = yield ProductModel_1.default.findOne({ _id: productId });
        console.log(getProduct);
        const checkUserCart = yield CartModel_1.default.findOne({ user: userId });
        console.log(checkUserCart);
        if (checkUserCart) {
            const findIndexProduct = checkUserCart.cartitem.findIndex((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.products) === null || _a === void 0 ? void 0 : _a.equals(productId); });
            console.log("the index position is", findIndexProduct);
            if (findIndexProduct > -1) {
                const userSelectProd = checkUserCart.cartitem[findIndexProduct];
                console.log("gsadjhgsukdgui", userSelectProd);
                userSelectProd.quantity += 1;
                checkUserCart.bill = checkUserCart.cartitem.reduce((acc, cur) => {
                    console.log(cur);
                    return acc + cur.quantity * cur.price;
                }, 0);
                checkUserCart.cartitem[findIndexProduct] = userSelectProd;
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "added sucessfully",
                    data: checkUserCart
                });
            }
            else {
                checkUserCart.cartitem.push({ products: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.Price });
                checkUserCart.bill = checkUserCart.cartitem.reduce((acc, cur) => {
                    console.log(cur);
                    return acc + cur.quantity * cur.price;
                }, 0);
                yield checkUserCart.save();
                console.log("check oo", checkUserCart.bill);
                return res.status(201).json({
                    message: "new product added",
                    result: checkUserCart
                });
            }
        }
        else {
            const dataCart = yield CartModel_1.default.create({
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                cartitem: [{ products: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quntity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.Price }],
                bill: 1 * (getProduct === null || getProduct === void 0 ? void 0 : getProduct.Price)
            });
            return res.status(201).json({
                message: "successfully added to cart",
                result: dataCart
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in adding to cart",
            error: error.message
        });
    }
});
exports.addToCart = addToCart;
const RemoveCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        let productId = req.query.productId;
        console.log(productId);
        const checkusercart = yield CartModel_1.default.findOne({ user: userId });
        console.log("oooooooo", checkusercart);
        const position = (_a = checkusercart === null || checkusercart === void 0 ? void 0 : checkusercart.cartitem) === null || _a === void 0 ? void 0 : _a.findIndex((item) => (item === null || item === void 0 ? void 0 : item.products) == productId);
        console.log("the position", position);
        if (position > -1) {
            const item = checkusercart.cartitem[position];
            console.log("these", item);
            if (item.quantity > 1) {
                item.quantity -= 1;
                checkusercart.bill -= item.price;
            }
            else {
                checkusercart.bill -= item.quantity * item.price;
                if (checkusercart.bill < 0) {
                    checkusercart.bill = 0;
                }
                checkusercart.cartitem.splice(position, 1);
            }
            console.log("jksnd", checkusercart);
            checkusercart.bill = checkusercart.cartitem.reduce((acc, cur) => {
                return acc + cur.quantity * cur.Price;
            });
            yield checkusercart.save();
            return res.status(201).json({
                message: "item has been removed"
            });
        }
        else {
            return res.status(401).json({
                message: "you have no item "
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.RemoveCart = RemoveCart;
