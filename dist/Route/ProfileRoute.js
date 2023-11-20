"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfileController_1 = require("../Controller/ProfileController");
const multer_1 = require("../Utils/multer");
const router = express_1.default.Router();
router.route("/profile-edit/:id").put(ProfileController_1.EditProfile);
router.route("/image-edit/:Imgid").put(multer_1.upload, ProfileController_1.EditImage);
exports.default = router;
