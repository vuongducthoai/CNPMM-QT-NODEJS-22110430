import db from '../models/index.js'; // import database 
import users from '../models/users.js';
import CRUDService from '../services/CRUDService.js';


//ham getHomePage
let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll(); // lay du lieu tu models/index
        console.log('.........................')
        console.log(data);
        console.log('.........................')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // tra du lieu data ve view
        });
    } catch(e){
        console.log(e);
    }
}

//ham getAbout 
let getAboutPage = (req, res) => {
    return res.render('test/about/ejs');
}

let getCreateUserForm = (req, res) => {
    return res.render('users/post-crud-form.ejs');
}

//Ham CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

//ham findAll CRUD
let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data
    })
}

//ham post CRUD 
let postCRUD = async(req, res) => { // dung async de xy lu bat dong bo 
   try {
        await CRUDService.createNewUser(req.body);
        let data = await CRUDService.getAllUser(); 
        return res.render('users/findAllUser.ejs', {
            datalist: data
        })
   }catch(e){
     console.log(e);
    return res.status(500).send('Error creating user');
   }
}

//Ham lay du lieu de edit 
let getEditCRUD = async(req, res) => {
    let userId = req.query.id;
    if(userId){ // checkId 
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('users/updateUser.ejs', {
            data: userData
        });
    } else {
        res.send('khong lay duoc id')
    }
}

let putCRUD = async(req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data); // update roi hien thi lai danh sach User
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id; // Vi tren view ?id = 1
    if(id){
       let data =  await CRUDService.deleteuserById(id);
       return res.render('users/findAllUser.ejs', {
        datalist: data
    });
    } else {
        return res.send('Not find user')
    }
}


export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD, getCRUD,
    postCRUD, postCRUD,
    getFindAllCrud, getFindAllCrud,
    getEditCRUD, getEditCRUD,
    putCRUD, putCRUD,
    deleteCRUD, deleteCRUD,
    getCreateUserForm, getCreateUserForm
}