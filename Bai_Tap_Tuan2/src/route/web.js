import express from "express"; //Goi express
import homeController from "../controller/homeController.js"; // goi controller 
import { Model } from "sequelize";

let router = express.Router(); // khoi tao Route

//Dinh nghia cac route 
let initWebRoutes = (app) => {
    //Cach 1: Dinh nghia truc tiep trong file 
    router.get('/', (req, res)=> {
        return res.send('Vương Đức Thoại');
    });

    //Cach 2: Goi ham xu ly tu homeController de tach biet phan xu ly logic ra file kha
    router.get('/home', homeController.getHomePage); // URL /home → hàm getHomePage trong controller
    router.get('/about', homeController.getAboutPage); // URL /about → hàm getAboutPage
    router.get('/crud', homeController.getCRUD); // URL /crud → hàm getCRUD
    router.post('/post-crud', homeController.postCRUD); // URL /post-crud → hàm postCRUD
    router.get('/get-crud', homeController.getFindAllCrud); // URL /get-crud → lấy toàn bộ dữ liệu
    router.get('/edit-crud', homeController.getEditCRUD); // URL /edit-crud → hàm getEditCRUD
    router.post('/put-crud', homeController.putCRUD); // URL /put-crud → cập nhật dữ liệu
    router.get('/delete-crud', homeController.deleteCRUD); // URL /delete-crud → xóa dữ liệu

    return app.use("/", router); // url mac dinh
}

export default initWebRoutes;


