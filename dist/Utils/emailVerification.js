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
exports.verifyUser = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "470179463721-om0vp1311c78pvg7pjs0g6eip2k7fbuo.apps.googleusercontent.com";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESHTOKEN = "1//049XKn5uNCTNjCgYIARAAGAQSNwF-L9IrLGXyxSBaV0BYzolWvCjXBNPpn6m14M3W1MOilU_3uukPGODQwcR5WQxzlZaHRlcEFSs";
const oAuth = new googleapis_1.google.Auth.OAuth2Client(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresdh_token: GOOGLE_REFRESHTOKEN });
const verifyUser = (FullName, Email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAcesssToken();
        const tranporter = nodemailer_1.default.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                type: "oAuth2",
                user: "jagolab01@gmail.com",
                refreshToken: GOOGLE_REFRESHTOKEN,
                clientId: GOOGLE_ID,
                clientSecretId: GOOGLE_SECRET,
                accessToken: accessToken
            }
        });
    }
    catch (error) {
        console.log("the error message");
        console.log(error);
    }
});
exports.verifyUser = verifyUser;
