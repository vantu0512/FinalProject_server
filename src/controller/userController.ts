import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { Request, Response } from "express";
import escapeStringRegexp from "escape-string-regexp";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page);
    const size: number = Number(req.query.size);
    const keyword: any = req.query.keyword || "";
    // const $regex = escapeStringRegexp(keyword);
    const result = await User.find({
      $or: [{ email: { $regex: keyword } }],
    })
      .skip(size * (page - 1))
      .limit(size);
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
      user.role = userData.role;
      user.address = userData.address;
      user.fullName = userData.fullName;
      await user.save();
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
    let id = req.query.id;
    const user = await User.deleteOne({ _id: id });
    if (user) return res.status(200).json({ message: `Delete user success!` });
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
