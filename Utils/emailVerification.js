"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = __importDefault(require("googleapis"));
const oAuth = new googleapis_1.default.Auth.OAuth2Client();
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "470179463721-om0vp1311c78pvg7pjs0g6eip2k7fbuo.apps.googleusercontent.com";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
