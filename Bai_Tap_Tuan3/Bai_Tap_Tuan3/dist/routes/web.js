"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Goi express
const homeController_1 = __importDefault(require("../controller/homeController")); // goi controller 
const router = express_1.default.Router(); // khoi tao Route
//Dinh nghia cac route 
const initWebRoutes = (app) => {
    //Cach 1: Dinh nghia truc tiep trong file 
    router.get('/', (req, res) => {
        return res.send('Vương Đức Thoại');
    });
    //Cach 2: Goi ham xu ly tu homeController de tach biet phan xu ly logic ra file khac
    router.get('/home', homeController_1.default.getHomePage); // URL /home → hàm getHomePage trong controller
    router.get('/about', homeController_1.default.getAboutPage); // URL /about → hàm getAboutPage
    router.get('/crud', homeController_1.default.getCRUD); // URL /crud → hàm getCRUD
    router.get('/post-crud-form', homeController_1.default.getCreateUserForm); // URL -> hien thi form tao user moi
    router.post('/post-crud', homeController_1.default.postCRUD); // URL /post-crud → hàm postCRUD
    router.get('/get-crud', homeController_1.default.getFindAllCrud); // URL /get-crud → lấy toàn bộ dữ liệu
    router.get('/edit-crud', homeController_1.default.getEditCRUD); // URL /edit-crud → hàm getEditCRUD
    router.post('/put-crud', homeController_1.default.putCRUD); // URL /put-crud → cập nhật dữ liệu
    router.get('/delete-crud', homeController_1.default.deleteCRUD); // URL /delete-crud → xóa dữ liệu
    return app.use("/", router); // url mac dinh
};
exports.default = initWebRoutes;
