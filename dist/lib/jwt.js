"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generateAccessToken = (username, user_id) => {
    return jsonwebtoken_1.default.sign({ username, user_id }, process.env.TOKEN_SECRET, {
        expiresIn: '7d',
    });
};
exports.generateAccessToken = generateAccessToken;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res
            .status(401)
            .json({ message: 'No credentials or Ivalid credentials' });
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err)
            return res.status(403).json({ message: 'Unauthorize' });
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=jwt.js.map