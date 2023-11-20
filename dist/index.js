"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./Database/database");
const MainApp_1 = require("./MainApp");
const port = 3800;
const app = (0, express_1.default)();
(0, MainApp_1.mainApp)(app);
app.set("view engine", "ejs");
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
process.on("uncaughtException", (error) => {
    console.log("stop here:uncaughtexception error");
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("an unhandled rejection error", reason);
    server.close(() => {
        process.exit(1);
    });
});
