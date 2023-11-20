"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../Controller/CategoryController");
const router = express_1.default.Router();
router.route("/create-cat/:userId").post(CategoryController_1.CreateCat);
router.route("/get-all").get(CategoryController_1.GetAllCategory);
router.route("/delete/:id").delete(CategoryController_1.DeleteCategory);
router.route("/single/:id").get(CategoryController_1.GetSingle);
exports.default = router;
