"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configViewEngine = (app) => {
    app.use(express_1.default.static("./src/public")); // Thư mục public chứa ảnh, css, js
    app.set("view engine", "ejs"); // Dùng EJS làm view engine
    app.set("views", "./src/views"); // Thư mục chứa file .ejs
};
exports.default = configViewEngine; // export chuẩn ES6
