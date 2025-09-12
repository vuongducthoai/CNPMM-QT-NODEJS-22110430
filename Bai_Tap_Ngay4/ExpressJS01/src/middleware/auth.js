// middleware/auth.js
require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const whiteLists = ["/", "/register", "/login"];

  // Nếu url nằm trong whitelist thì bỏ qua auth
  if (whiteLists.find(item => "/v1/api" + item === req.originalUrl)) {
    return next();
  }

  // Kiểm tra token
  const token = req?.headers?.authorization?.split(" ")?.[1];
  if (!token) {
    return res.status(401).json({
      message: "Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      email: decoded.email,
      name: decoded.name,
      createdBy: "hoidanit",
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token bị hết hạn / hoặc không hợp lệ",
    });
  }
};

module.exports = auth;
