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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield knex.schema.hasTable('user_tokens'))) {
            return yield knex.schema.createTable('user_tokens', function (table) {
                table.increments();
                table.text('token', 'longtext');
                table
                    .integer('user_id')
                    .unsigned()
                    .references('users.id')
                    .onUpdate('CASCADE')
                    .onDelete('CASCADE');
                table.timestamps(true, true);
            });
        }
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.down = down;
//# sourceMappingURL=20221223220345_add_user_token.js.map