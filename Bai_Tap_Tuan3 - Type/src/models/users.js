'use strict'
const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
    class User extends Model{
        /**
         * Helper method for defining associations
         * This method is not a part of Sequelize lifecycls.
         * The 'models/index' file will call this method automatically
       */
    
       // Hàm associate dùng để khai báo quan hệ với các model khác (ví dụ: User có nhiều Orders).
        static associate(models) {
            //dinh nghia moi quan he (quan hệ 1-n, n-n, 1-1)
        }
    }
    //Định nghĩa các cột trong bảng
        User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        image: DataTypes.STRING,
        roleId: DataTypes.STRING,
        positionId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;

}