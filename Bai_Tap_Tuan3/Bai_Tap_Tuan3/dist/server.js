"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const viewEngine_1 = __importDefault(require("./config/viewEngine"));
const web_1 = __importDefault(require("./routes/web"));
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, viewEngine_1.default)(app);
(0, web_1.default)(app);
(0, database_1.default)();
const port = parseInt(process.env.PORT || "6969", 10);
app.listen(port, () => {
    console.log(` Backend NodeJS is running on the port: ${port}`);
});
