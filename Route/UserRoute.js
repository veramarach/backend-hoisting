"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../Controller/UserController");
const router = express_1.default.Router();
router.route("/create-user").post(UserController_1.UserReg);
router.route("/single-user/:id").get(UserController_1.getSingleuser);
router.route("/all-user").get(UserController_1.GetAllUser);
router.route("/login-user").post(UserController_1.LogInUser);
router.route("/logout-user").post(UserController_1.LogOutUser);
router.route("/verify-account/:id").get(UserController_1.verifyUser);
exports.default = router;
