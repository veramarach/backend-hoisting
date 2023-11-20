"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    Name: {
        type: String
    },
    Image: {
        type: String,
    },
    Desc: {
        type: String
    },
    Quantity: {
        type: Number
    },
    Category: {
        type: String
    },
    Price: {
        type: Number
    },
    CreatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("products", ProductSchema);
