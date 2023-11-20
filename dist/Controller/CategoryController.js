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
exports.DeleteCategory = exports.GetSingle = exports.GetAllCategory = exports.CreateCat = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const CategoryModel_1 = __importDefault(require("../Model/CategoryModel"));
const slugify_1 = __importDefault(require("slugify"));
function generateCategoryId() {
    const characters = "ABCDEFGHIJKLMNOPRSTUabcdefghijklmnop";
    const length = 6;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
const CreateCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, parent } = req.body;
        if (!Name) {
            return res.status(401).json({
                success: 0,
                message: "name cant be empty"
            });
        }
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield UserModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const dataCat = yield CategoryModel_1.default.create({
            Name,
            parent,
            slug: `${(0, slugify_1.default)(Name)}-${generateCategoryId()}`
        });
        dataCat.users = getUser;
        dataCat.save();
        return res.status(201).json({
            message: dataCat
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.CreateCat = CreateCat;
const GetAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield CategoryModel_1.default.find().populate({
            path: "users",
            select: "Email FullName"
        });
        return res.status(200).json({
            message: "all category",
            result: getAll
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.GetAllCategory = GetAllCategory;
const GetSingle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getOne = yield CategoryModel_1.default.findById(id);
        return res.status(200).json({
            success: 1,
            message: "single category gotten",
            result: getOne
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.GetSingle = GetSingle;
const DeleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteOne = yield CategoryModel_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "category deleted successfully"
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.DeleteCategory = DeleteCategory;
