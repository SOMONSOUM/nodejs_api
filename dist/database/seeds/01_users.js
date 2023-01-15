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
exports.seed = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('users').del();
        // Inserts seed entries
        yield knex('users').insert([
            {
                email: 'superadmin@admin.com',
                username: 'admin',
                password: bcryptjs_1.default.hashSync('123', 12),
                fullname: 'Super Admin',
                phone_number: '099999444',
                profile_picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            },
            {
                email: 'user@user.com',
                username: 'user',
                password: bcryptjs_1.default.hashSync('123', 12),
                fullname: 'User',
                phone_number: '099999333',
                profile_picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            },
        ]);
    });
}
exports.seed = seed;
//# sourceMappingURL=01_users.js.map