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
const User_1 = __importDefault(require("../models/User")); // mongoose user model
const CRUDService_1 = __importDefault(require("../services/CRUDService"));
// Hàm getHomePage
const getHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield User_1.default.find(); // ✅ MongoDB dùng User.find()
        console.log(".........................");
        console.log(data);
        console.log(".........................");
        res.render("homepage.ejs", {
            data: JSON.stringify(data), // trả dữ liệu về view
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Error loading homepage");
    }
});
// Hàm getAbout
const getAboutPage = (req, res) => {
    res.render("test/about.ejs"); // ✅ fix path
};
const getCreateUserForm = (req, res) => {
    res.render("users/post-crud-form.ejs");
};
// Hàm CRUD view
const getCRUD = (req, res) => {
    res.render("crud.ejs");
};
// Hàm findAll CRUD
const getFindAllCrud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield CRUDService_1.default.getAllUser();
    res.render("users/findAllUser.ejs", {
        datalist: data,
    });
});
// Hàm post CRUD
const postCRUD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CRUDService_1.default.createNewUser(req.body);
        const data = yield CRUDService_1.default.getAllUser();
        res.render("users/findAllUser.ejs", {
            datalist: data,
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Error creating user");
    }
});
// Hàm lấy dữ liệu để edit
const getEditCRUD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.id;
    if (userId) {
        const userData = yield CRUDService_1.default.getUserInfoById(userId);
        res.render("users/updateUser.ejs", {
            data: userData,
        });
    }
    else {
        res.send("Không lấy được id");
    }
});
// Hàm update
const putCRUD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const updatedUsers = yield CRUDService_1.default.updateUser(data);
    res.render("users/findAllUser.ejs", {
        datalist: updatedUsers,
    });
});
// Hàm delete
const deleteCRUD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (id) {
        const data = yield CRUDService_1.default.deleteuserById(id);
        res.render("users/findAllUser.ejs", {
            datalist: data,
        });
    }
    else {
        res.send("Not find user");
    }
});
exports.default = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
    getCreateUserForm,
};
