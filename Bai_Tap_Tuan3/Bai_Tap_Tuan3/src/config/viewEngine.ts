import { Application } from "express";
import express from "express";

const configViewEngine = (app: Application): void => {
  app.use(express.static("./src/public")); // Thư mục public chứa ảnh, css, js
  app.set("view engine", "ejs");           // Dùng EJS làm view engine
  app.set("views", "./src/views");         // Thư mục chứa file .ejs
};

export default configViewEngine; // export chuẩn ES6
