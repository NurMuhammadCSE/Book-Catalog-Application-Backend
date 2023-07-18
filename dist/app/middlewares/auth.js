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
const config_1 = __importDefault(require("@/config"));
const ApiError_1 = __importDefault(require("@/errors/ApiError"));
const jwtHelper_1 = require("@/helpers/jwtHelper");
const http_status_1 = __importDefault(require("http-status"));
const auth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get token from headers
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        // if token is not provided
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You not authorized to access this resource");
        }
        // verify token
        const isVerifiedUser = jwtHelper_1.JwtHelper.verifyToken(token, config_1.default.jwt_secret);
        // if not verified
        if (!isVerifiedUser) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid token!");
        }
        // if verified set the token to the request
        req.user = isVerifiedUser;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;