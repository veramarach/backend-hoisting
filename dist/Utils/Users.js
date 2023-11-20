"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.JoiSchema = joi_1.default.object({
    FullName: joi_1.default.string().required(),
    Email: joi_1.default.string().email().lowercase().required(),
    Password: joi_1.default.string().min(6).max(15).required(),
    Confirm_Password: joi_1.default.ref("Password")
});
