import bcrypt from "bcryptjs"; // import thu vien bycryptjs
import db from '../models/index.js'; // import database
import {where} from 'sequelize';
const salt = bcrypt.genSaltSync(10); // thuat toan hash password 
let createNewUser = async (data) => { // ham tao user voi tham so data
    return new Promise(async (resolve, reject) => {  // Dung Promist dam bao luon tra ket qua, trong xu ly bat dong bo
        try {
            let hashPasswordBycrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordBycrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('OK create a new user sucessfully');
        }catch(e){
            reject(e)
        }
    })
}


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { // Dung Promist dam bao luon tra ket qua, trong xu ly bat dong bo
        try {
            let hashPaword = await bcrypt.hashSync("B4c0\/", salt);
             resolve(hashPaword);
        } catch (error) {
            reject(e);
        }   
    }) 
}

//lay tat ca findAll CRUD
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { // Dung Promist dam bao luon tra ket qua, trong xu ly bat dong bo
        try {
            let users = db.User.findAll({
                raw: true, // hien thi lieu goc
            })
            resolve(users); // ham tra ve ket qua
        } catch (error) {
            reject(e)
        }
    })
}

//lay findOne CRUD 
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => { // Dung Promist dam bao luon tra ket qua, trong xu ly bat dong bo
        try {
            let user = await db.User.findOne({
                where: {id:userId}, // query dieu kien cho tham so
                raw: true
            });
            if(user) {
                resolve(user); // ham tra ve ket qua
            } else {
                resolve([]);// ham tra ve ket qua rong
            }
        } catch(e){
            reject(e)
        }
    })
}


//ham put CRUD 
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => { // Dung Promist dam bao luon tra ket qua, trong xu ly bat dong bo
        try {
            let user = await db.User.findOne({
                whare: {id: data.id} // query dieu kien cho tham so
            });
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address;
                await user.save();
                //lay danh sach user
                let allusers = await db.User.findAll();
                resolve(allusers);
            } else {
                resolve(); // ham tra ve ket qua rong
            }
        } catch (e) {
            reject(e)
        }
    })
}

//Ham xoa user
let deleteuserById = (userId) => {
    return new Promise(async (resolve, reject) => { // Dung Promist dam bao luon tra ket qua, trong xu ly bat dong bo
        try {
            let user = await db.User.findOne({
                where: {id : userId}
            })
            if(user){
                user.destroy();
            }
            //lay danh sach user
            let allusers = await db.User.findAll();
            resolve(allusers);
        }catch(e){
            reject(e);
        }
    })
}

export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteuserById
}