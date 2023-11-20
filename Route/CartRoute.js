"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartController_1 = require("../Controller/CartController");
const router = express_1.default.Router();
router.route("/add-cart/:userId/:productId").post(CartController_1.addToCart);
router.route("/remove-item/:userId").delete(CartController_1.RemoveCart);
exports.default = router;
