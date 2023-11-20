"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../Controller/ProductController");
const multer_1 = require("../Utils/multer");
const VerifyToken_1 = require("../Utils/VerifyToken");
const router = express_1.default.Router();
router.route("/create-product/:catId").post(VerifyToken_1.verifyToken, multer_1.uploaded, ProductController_1.CreateProduct);
router.route("/all-product").get(ProductController_1.GetAllProduct);
router.route("/single-product/:id").get(ProductController_1.GetAllProduct);
exports.default = router;
