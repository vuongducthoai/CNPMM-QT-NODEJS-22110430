"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    gender: { type: Boolean }, // giữ Boolean
    image: { type: String },
    roleId: { type: String },
    positionId: { type: String },
}, {
    timestamps: true,
    collection: "users",
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
