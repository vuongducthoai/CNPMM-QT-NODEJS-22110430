require("dotenv").config();
const User  = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password)=>{
    try{
        //check user exist
        const user = await User.findOne({email});
        if(user){
            console.log(`>>> user exist, chon 1 email khac: ${email}`);
            return null;
        }

        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "User"
        })
        return result;
    } catch(error){
        console.log(error);
        return null;
    }
}


const loginService = async (email, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({email: email});
        if(user){
            //conpare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if(!isMatchPassword){
                return {
                    EC : 2,
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                //create an access token
                const payload = {
                    email: user.email,
                    name: user.name
                }
                
                const access_token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE
                })
                return {
                    EX: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        }else {
            return {
                EC: 1,
                EM: "Email/Password khong hop le"
            }
        }
    }catch(error){
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;

    } catch(error){
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService, getUserService
}