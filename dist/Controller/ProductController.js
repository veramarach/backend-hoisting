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
exports.GetSingleProduct = exports.GetAllProduct = exports.CreateProduct = void 0;
const ProductModel_1 = __importDefault(require("../Model/ProductModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const CategoryModel_1 = __importDefault(require("../Model/CategoryModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Desc, Quantity, Price, Category } = req.body;
        // if(!Name || !Desc || !Quantity || !Price || !Category)
        // {
        //     return res.status(401).json({
        //         message:"all field required"
        //     })
        // }
        const { catId } = req.params;
        console.log(catId);
        const getCat = yield CategoryModel_1.default.findOne({ _id: catId });
        console.log(getCat);
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield UserModel_1.default.findOne({ _id: req.userId });
        console.log(getUser);
        console.log("aho", req.user);
        if (req.user.role === "admin") {
            const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
            console.log(imageUrl);
            const dataProduct = yield ProductModel_1.default.create({
                Name,
                Desc,
                Quantity,
                Price,
                Category,
                Image: imageUrl.secure_url
            });
            getCat === null || getCat === void 0 ? void 0 : getCat.products.push(new mongoose_1.default.Types.ObjectId(dataProduct._id));
            getCat === null || getCat === void 0 ? void 0 : getCat.save();
            dataProduct.CreatedBy = getUser;
            dataProduct.save();
            return res.status(201).json({
                message: "created sucessfuly",
                result: dataProduct
            });
        }
        else {
            return res.status(401).json({
                message: "only admin can post"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to create product",
            error: error.message
        });
    }
});
exports.CreateProduct = CreateProduct;
const GetAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllProduct = yield ProductModel_1.default.find();
        return res.status(200).json({
            message: "all products",
            result: AllProduct
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.GetAllProduct = GetAllProduct;
const GetSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const GetProduct = yield ProductModel_1.default.findById(id);
        return res.status(201).json({
            message: "all product found",
            result: GetProduct
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.GetSingleProduct = GetSingleProduct;
// export const ProductImage = async(req:any, res:Response):Promise<Response>=>{
//     try
//     {
//       const {id} = req.params
//       console.log(req.file)
//       const imageUrl = await cloudinary.uploader.upload(req.file.path)
//       console.log("the result",imageUrl)
//       const updateImage = await ProductAuth.findByIdAndUpdate(id,
//         {
//             Image:imageUrl.secure_url
//         },
//         {new:true}
//         )
//         return res.status(201).json({
//             message:"image successfuly updated",
//             result:updateImage
//         })
//     }catch(error:any)
//     {
//         return res.status(400).json({
//             message:error.messge
//         })
//     }
// }
