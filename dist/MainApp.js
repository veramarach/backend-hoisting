"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./Route/UserRoute"));
const ProfileRoute_1 = __importDefault(require("./Route/ProfileRoute"));
const CategoryRoute_1 = __importDefault(require("./Route/CategoryRoute"));
const ProductRoute_1 = __importDefault(require("./Route/ProductRoute"));
const CartRoute_1 = __importDefault(require("./Route/CartRoute"));
const CheckOutRoute_1 = __importDefault(require("./Route/CheckOutRoute"));
const mainApp = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)())
        .use("/api/v1", UserRoute_1.default)
        .use("/api/v1", ProfileRoute_1.default)
        .use("/api/v1", CategoryRoute_1.default)
        .use("/api/v1", ProductRoute_1.default)
        .use("/api/v1", CartRoute_1.default)
        .use("/api/v1", CheckOutRoute_1.default)
        .get("/page/data/", (req, res) => {
        const id = req.params.id;
        const userName = "vera";
        res.render("verifyAccount", { userName, id });
    })
        .get("/api", (req, res) => {
        res.status(200).json({
            message: "api is running"
        });
    });
};
exports.mainApp = mainApp;
