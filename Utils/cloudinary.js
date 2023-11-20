"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "ddx3du70j",
    api_key: "586231672886349",
    api_secret: "cHVpP223D9ODuu3739nna4hSxRQ"
});
exports.default = cloudinary;
