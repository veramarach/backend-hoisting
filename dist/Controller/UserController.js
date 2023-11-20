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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogOutUser = exports.GetAllUser = exports.LogInUser = exports.verifyUser = exports.getSingleuser = exports.UserReg = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const ProfileModel_1 = __importDefault(require("../Model/ProfileModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const tranporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "jagolab01@gmail.com",
        pass: "bpxl wvee iitw dqcl",
    },
});
const UserReg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FullName, Email, Password, role } = req.body;
        if (!FullName || !Email || !Password) {
            return res.status(401).json({
                success: 0,
                message: "all field required"
            });
        }
        const CheckEmail = yield UserModel_1.default.findOne({ Email: Email });
        if (CheckEmail) {
            return res.status(401).json({
                message: "email already exist"
            });
        }
        const Salt = yield bcrypt_1.default.genSalt(10);
        const HashPassword = yield bcrypt_1.default.hash(Password, Salt);
        const CreateUser = yield UserModel_1.default.create({
            FullName,
            Email,
            Password: HashPassword,
            role
        });
        const createProfile = yield ProfileModel_1.default.create({
            _id: CreateUser._id,
            FirstName: "",
            LastName: "",
            gender: "",
            avatar: "",
            DateofBirth: ""
        });
        CreateUser.Profile = createProfile._id;
        CreateUser.save();
        createProfile.user = CreateUser._id;
        createProfile.save();
        let mailOption = {
            from: '"MEDIQUEST 👻😎" <noreply@unitstore.com>',
            to: Email,
            subject: "Test Result",
            html: `<b>PLEASE CLICK THE LINK <a href='http://localhost:3800/api/v1/verify-account/${CreateUser._id}'>Link</a> to verify account</b>`, // html body
        };
        yield tranporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log("error in sending email,error");
            }
            else {
                console.log("email sent", info.response);
            }
        });
        return res.status(201).json({
            success: 1,
            message: "registration successful",
            result: CreateUser
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.UserReg = UserReg;
const getSingleuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOneuser = yield UserModel_1.default.findById(req.params.id).populate({
            path: "Profile",
            select: "FirstName LastName gender"
        });
        return res.status(201).json({
            message: "successfully gotten",
            data: getOneuser
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get user",
            error: error.message
        });
    }
});
exports.getSingleuser = getSingleuser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(req.params.id);
        console.log(user);
        const verifyData = yield UserModel_1.default.findByIdAndUpdate(req.params.id, {
            verify: true
        }, {
            new: true
        });
        return res.status(201).json({
            message: "account has been verified proceed to login"
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.verifyUser = verifyUser;
const LogInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                message: "pls enter all field"
            });
        }
        const Checkemail = yield UserModel_1.default.findOne({ Email: Email });
        if (Checkemail) {
            const checkPass = yield bcrypt_1.default.compare(Password, Checkemail.Password);
            if (checkPass) {
                if (Checkemail.verify) {
                    const token = jsonwebtoken_1.default.sign({
                        _id: Checkemail._id, Email: Checkemail.Email, FullName: Checkemail.FullName, role: Checkemail.role,
                    }, "wertyuiopkjhgfdsa", {
                        expiresIn: "1d"
                    });
                    const _a = Checkemail._doc, { Password } = _a, info = __rest(_a, ["Password"]);
                    const option = { expiresIn: "3d" };
                    res.cookie("sessionId", token, option);
                    return res.status(201).json({
                        success: 1,
                        message: "login successful",
                        result: { info, token }
                    });
                }
                else {
                    let mailOption = {
                        from: '"MEDIQUEST 👻😎" <noreply@unitstore.com>',
                        to: Email,
                        subject: "Test Result",
                        html: `<b>PLEASE CLICK THE LINK <a href='http://localhost:3800/api/v1/verify-account/${Checkemail._id}'>Link</a> to verify account</b>`, // html body
                    };
                    yield tranporter.sendMail(mailOption, (error, info) => {
                        if (error) {
                            console.log("error in sending email,error");
                        }
                        else {
                            console.log("email sent", info.response);
                        }
                    });
                    return res.status(200).json({
                        message: "please check your email to verify account"
                    });
                }
            }
            else {
                return res.status(400).json({
                    message: "incorrect password"
                });
            }
        }
        else {
            return res.status(400).json({
                message: "user not found"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.LogInUser = LogInUser;
const GetAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllUsers = yield UserModel_1.default.find();
        return res.status(200).json({
            message: "all users found",
            result: AllUsers
        });
    }
    catch (error) {
        return res.status(400).json({
            massage: "users not found",
            error: error.message
        });
    }
});
exports.GetAllUser = GetAllUser;
const LogOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("sessionId");
        return res.status(201).json({
            message: "signout successfull"
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.LogOutUser = LogOutUser;
