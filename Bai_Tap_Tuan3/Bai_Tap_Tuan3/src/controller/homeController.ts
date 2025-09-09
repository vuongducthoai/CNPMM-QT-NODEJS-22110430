import { Request, Response } from "express";
import User from "../models/User"; // mongoose user model
import CRUDService from "../services/CRUDService";

// Hàm getHomePage
const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await User.find(); // ✅ MongoDB dùng User.find()
    console.log(".........................");
    console.log(data);
    console.log(".........................");

    res.render("homepage.ejs", {
      data: JSON.stringify(data), // trả dữ liệu về view
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error loading homepage");
  }
};

// Hàm getAbout
const getAboutPage = (req: Request, res: Response): void => {
  res.render("test/about.ejs"); // ✅ fix path
};

const getCreateUserForm = (req: Request, res: Response): void => {
  res.render("users/post-crud-form.ejs");
};

// Hàm CRUD view
const getCRUD = (req: Request, res: Response): void => {
  res.render("crud.ejs");
};

// Hàm findAll CRUD
const getFindAllCrud = async (req: Request, res: Response): Promise<void> => {
  const data = await CRUDService.getAllUser();
  res.render("users/findAllUser.ejs", {
    datalist: data,
  });
};

// Hàm post CRUD
const postCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    await CRUDService.createNewUser(req.body);
    const data = await CRUDService.getAllUser();
    res.render("users/findAllUser.ejs", {
      datalist: data,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating user");
  }
};

// Hàm lấy dữ liệu để edit
const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    res.render("users/updateUser.ejs", {
      data: userData,
    });
  } else {
    res.send("Không lấy được id");
  }
};

// Hàm update
const putCRUD = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;
  const updatedUsers = await CRUDService.updateUser(data);
  res.render("users/findAllUser.ejs", {
    datalist: updatedUsers,
  });
};

// Hàm delete
const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  const id = req.query.id as string;
  if (id) {
    const data = await CRUDService.deleteuserById(id);
    res.render("users/findAllUser.ejs", {
      datalist: data,
    });
  } else {
    res.send("Not find user");
  }
};

export default {
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
