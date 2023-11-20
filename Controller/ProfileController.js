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
exports.EditImage = exports.EditProfile = void 0;
const ProfileModel_1 = __importDefault(require("../Model/ProfileModel"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const EditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FirstName, LastName, DateofBirth, gender } = req.body;
        const { id } = req.params;
        const getUpdate = yield ProfileModel_1.default.findByIdAndUpdate(id, {
            FirstName,
            LastName,
            gender,
            DateofBirth
        }, {
            new: true
        });
        return res.status(201).json({
            message: "updated successfully",
            data: getUpdate
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.EditProfile = EditProfile;
const EditImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Imgid } = req.params;
        console.log(req.file);
        const imageUrl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log("the result", imageUrl);
        const updateImage = yield ProfileModel_1.default.findByIdAndUpdate(Imgid, {
            avatar: imageUrl.secure_url
        }, { new: true });
        return res.status(201).json({
            message: "image successfuly updated",
            result: updateImage
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.messge
        });
    }
});
exports.EditImage = EditImage;
