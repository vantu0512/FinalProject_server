import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { Request, Response } from "express";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await User.find({});
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all user success!",
        data: result,
      });
    } else {
      throw new Error("There are no user!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    let userData = req.body;
    const checkExist = await User.findOne({ email: userData.email });
    if (checkExist) {
      throw new Error("This email is already exists!");
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(userData.password, salt);
      const result = await User.create({
        email: userData.email,
        password: hashPassword,
        role: userData.role,
        address: userData.address,
        fullName: userData.fullName,
      });
      if (result) {
        return res.status(200).json({
          errCode: 0,
          errMessage: "Add new user success",
          userInfor: result,
        });
      }
    }
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    let userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(userData.password, salt);
      user.password = hashPassword;
      user.role = userData.role;
      user.address = userData.address;
      user.fullName = userData.fullName;
      return res.status(200).json({
        errCode: 0,
        errMessage: "Edit user success",
        data: user,
      });
    } else {
      throw new Error("This user is not exists!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    let userId = req.query;
    const result = User.findByIdAndDelete({ _id: userId });
    if (result)
      return res.status(200).json({ message: "Delete user success!" });
    else throw new Error("This user is not exists!");
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const userController = {
  getAllUser,
  addUser,
  editUser,
  deleteUser,
};

export default userController;
