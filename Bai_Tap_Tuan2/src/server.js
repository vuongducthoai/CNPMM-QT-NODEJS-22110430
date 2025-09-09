import express from "express"; // nạp express
import bodyParser from "body-parser"; // nạp body-parser để lấy tham số từ client /user?id=7
import configViewEngine from "./config/viewEngine.js"; // nạp viewEngine
import initWebRoutes from "./route/web.js"; // nạp file web từ Route
import connectDB from "./config/configdb.js";
import dotenv from "dotenv"; // thay require = import

dotenv.config(); // gọi config của dotenv để dùng process.env.PORT

const app = express();

// config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 6969; // PORT lấy từ .env hoặc mặc định 6969

// chạy server 
app.listen(port, () => {
  console.log("Backend NodeJS is running on the port: " + port);
});
