import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User"; // import luôn IUser

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

// Hash Password
const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
};

// Tạo user mới
export const createNewUser = async (data: Partial<IUser>): Promise<IUser> => {
  const hashPassword = await hashUserPassword(data.password as string);

  const newUser = new User({
    email: data.email,
    password: hashPassword,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phoneNumber: data.phoneNumber,
    gender: String(data.gender) === "1" ? true : false, // ✅ xử lý boolean
    roleId: data.roleId,
    positionId: data.positionId,
    image: data.image,
  });

  return await newUser.save();
};

// Lấy tất cả user
export const getAllUser = async (): Promise<IUser[]> => {
  return await User.find().lean<IUser[]>();
};

// Lấy 1 user theo ID
export const getUserInfoById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).lean<IUser | null>();
};

// Update user
export const updateUser = async (
  data: Partial<IUser> & { id: string }
): Promise<IUser[] | null> => {
  const user = await User.findById(data.id);
  if (user) {
    user.firstName = data.firstName ?? user.firstName;
    user.lastName = data.lastName ?? user.lastName;
    user.address = data.address ?? user.address;

    await user.save();
    return await User.find().lean<IUser[]>();
  }
  return null;
};

// Xóa user
export const deleteuserById = async (userId: string): Promise<IUser[]> => {
  await User.findByIdAndDelete(userId);
  return await User.find().lean<IUser[]>();
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteuserById,
};
