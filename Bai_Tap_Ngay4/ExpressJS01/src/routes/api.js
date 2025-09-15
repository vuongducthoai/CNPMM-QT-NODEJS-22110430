const express = require('express');
const {
  createUser,
  handleLogin,
  getUser,
  getAccount
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');


const routerAPI = express.Router();

// Route public
routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

// Public: đăng ký, đăng nhập
routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

//Private: cần token
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI; 


