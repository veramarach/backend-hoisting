"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const onLineUrl = "mongodb+srv://edemahd:DEkPZi2O8M1xacFi@cluster0.pw3yjp0.mongodb.net/ecommerce";
const Url = "mongodb://0.0.0.0:27017/ClassRef";
mongoose_1.default.connect(onLineUrl).then(() => {
    console.log("database connected successfully");
})
    .catch((error) => {
    console.log("an error occurred");
});
exports.default = mongoose_1.default;
