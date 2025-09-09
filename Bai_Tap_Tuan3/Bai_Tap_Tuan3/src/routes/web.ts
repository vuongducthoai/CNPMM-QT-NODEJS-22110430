import express, {Application, Request, Response} from "express"; //Goi express
import homeController from "../controller/homeController"; // goi controller 
import { ApplySchemaOptions } from "mongoose";

const router = express.Router(); // khoi tao Route

//Dinh nghia cac route 
const initWebRoutes = (app: Application): Application => {
    //Cach 1: Dinh nghia truc tiep trong file 
    router.get('/', (req: Request, res: Response)=> {
        return res.send('Vương Đức Thoại');
    });

    //Cach 2: Goi ham xu ly tu homeController de tach biet phan xu ly logic ra file khac
    router.get('/home', homeController.getHomePage); // URL /home → hàm getHomePage trong controller
    router.get('/about', homeController.getAboutPage); // URL /about → hàm getAboutPage
    router.get('/crud', homeController.getCRUD); // URL /crud → hàm getCRUD
    router.get('/post-crud-form', homeController.getCreateUserForm); // URL -> hien thi form tao user moi
    router.post('/post-crud', homeController.postCRUD); // URL /post-crud → hàm postCRUD
    router.get('/get-crud', homeController.getFindAllCrud); // URL /get-crud → lấy toàn bộ dữ liệu
    router.get('/edit-crud', homeController.getEditCRUD); // URL /edit-crud → hàm getEditCRUD
    router.post('/put-crud', homeController.putCRUD); // URL /put-crud → cập nhật dữ liệu
    router.get('/delete-crud', homeController.deleteCRUD); // URL /delete-crud → xóa dữ liệu

    return app.use("/", router); // url mac dinh
}

export default initWebRoutes;


