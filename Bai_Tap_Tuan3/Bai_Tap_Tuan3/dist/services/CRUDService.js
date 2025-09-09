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
exports.deleteuserById = exports.updateUser = exports.getUserInfoById = exports.getAllUser = exports.createNewUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User")); // import luôn IUser
const salt = bcryptjs_1.default.genSaltSync(10); // thuật toán hash password
// Hash Password
const hashUserPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.hash(password, salt);
});
// Tạo user mới
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield hashUserPassword(data.password);
    const newUser = new User_1.default({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: String(data.gender) === "1" ? true : false, // ✅ xử lý boolean
        roleId: data.roleId,
        positionId: data.positionId,
        image: data.image,
    });
    return yield newUser.save();
});
exports.createNewUser = createNewUser;
// Lấy tất cả user
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.find().lean();
});
exports.getAllUser = getAllUser;
// Lấy 1 user theo ID
const getUserInfoById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(userId).lean();
});
exports.getUserInfoById = getUserInfoById;
// Update user
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield User_1.default.findById(data.id);
    if (user) {
        user.firstName = (_a = data.firstName) !== null && _a !== void 0 ? _a : user.firstName;
        user.lastName = (_b = data.lastName) !== null && _b !== void 0 ? _b : user.lastName;
        user.address = (_c = data.address) !== null && _c !== void 0 ? _c : user.address;
        yield user.save();
        return yield User_1.default.find().lean();
    }
    return null;
});
exports.updateUser = updateUser;
// Xóa user
const deleteuserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndDelete(userId);
    return yield User_1.default.find().lean();
});
exports.deleteuserById = deleteuserById;
exports.default = {
    createNewUser: exports.createNewUser,
    getAllUser: exports.getAllUser,
    getUserInfoById: exports.getUserInfoById,
    updateUser: exports.updateUser,
    deleteuserById: exports.deleteuserById,
};
