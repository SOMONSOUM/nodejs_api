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
const express_1 = require("express");
const CreateKnexContext_1 = __importDefault(require("../lib/CreateKnexContext"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../lib/jwt");
const router = (0, express_1.Router)();
const knex = (0, CreateKnexContext_1.default)().default;
router.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, fullname, phone_number, profile_picture, } = req.body;
    const [id] = yield knex.table('users').select('id').where({ email });
    if (!id) {
        const [user] = yield knex.table('users').insert({
            email: email,
            password: password ? bcryptjs_1.default.hashSync(password, 12) : undefined,
            username,
            fullname,
            phone_number,
            profile_picture,
        });
        if (user) {
            const token = (0, jwt_1.generateAccessToken)(username);
            return res.status(201).json({
                user: { email, username, fullname, phone_number, profile_picture },
                token: token,
            });
        }
        else {
            return res.status(424).json('Failed to create user');
        }
    }
    else {
        return res.status(409).json({ message: 'User already existed' });
    }
}));
router.get('/api/v1/users', jwt_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield knex
        .table('users')
        .select('id', 'email', 'username', 'fullname', 'phone_number', 'profile_picture')
        .orderBy('id', 'asc');
    if (users) {
        return res.status(200).json({ data: users });
    }
    else {
        throw new Error('Failed to get users');
    }
}));
router.get('/api/v1/user/:id', jwt_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const [user] = yield knex
        .table('users')
        .select('id', 'email', 'username', 'fullname', 'phone_number', 'profile_picture')
        .where({ id });
    if (user) {
        return res.status(200).json({ user });
    }
    else {
        return res.json({ message: 'Failed to get user' });
    }
}));
router.put('/api/v1/user/:id', jwt_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { email, password, username, fullname, phone_number, profile_picture, } = req.body;
    const user = yield knex
        .table('users')
        .update({
        email: email,
        password: password ? bcryptjs_1.default.hashSync(password, 12) : undefined,
        username,
        fullname,
        phone_number,
        profile_picture,
    })
        .where({ id });
    if (user) {
        return res.status(200).json({ user });
    }
    else {
        return res.json({ message: 'Failed to update user' });
    }
}));
router.delete('/api/v1/user/:id', jwt_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield knex.table('users').delete().where({ id });
    if (user) {
        return res.status(200).json({ message: `User has been deleted` });
    }
    else {
        return res.json({ message: 'Failed to delete user' });
    }
}));
router.post('/api/v1/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const [user] = yield knex.table('users').where({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (bcryptjs_1.default.compareSync(password, user.password)) {
        const token = (0, jwt_1.generateAccessToken)(email);
        return res.status(201).json({ token: token });
    }
    else {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
}));
router.get('/api/v1/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const [me] = yield knex
        .table('users')
        .select('id', 'email', 'username', 'fullname', 'phone_number', 'profile_picture')
        .where({ username });
    if (me) {
        return res.status(200).json({ me });
    }
    else {
        return null;
    }
}));
exports.default = router;
//# sourceMappingURL=router.js.map