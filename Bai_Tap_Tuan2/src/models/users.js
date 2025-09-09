'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations
     * This method is not a part of Sequelize lifecycle.
     * The 'models/index' file will call this method automatically
     */
    static associate(models) {
      // định nghĩa quan hệ ở đây (1-n, n-n, 1-1)
      // ví dụ: User.hasMany(models.Order);
    }
  }

  // Định nghĩa các cột trong bảng
  User.init(
    {
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
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // optional: nếu bảng trong DB có chữ `Users`
      timestamps: true,   // Sequelize sẽ tự động tạo `createdAt`, `updatedAt`
    }
  );

  return User;
};
