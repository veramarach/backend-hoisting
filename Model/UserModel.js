"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    verify: {
        type: Boolean,
        default: false
    },
    Password: {
        type: String,
        required: true
    },
    Profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "profiles"
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", UserSchema);
