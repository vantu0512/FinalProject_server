import User from "../model/user";
import { Request, Response } from "express";


const getAllUser = async (req:Request, res:Response) => {
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

const userController = {
  getAllUser,
};

export default userController;
