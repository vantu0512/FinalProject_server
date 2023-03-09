import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/user";
import AccessRight from "../model/accessRight";
import { Request, Response } from "express";

const generateToken = (payload: any) => {
  const secretAccessToken = process.env.ACCESS_TOKEN_SECRET;
  const secretRefreshToken = process.env.REFRESH_TOKEN_SECRET;
  const accessToken = jwt.sign(payload, secretAccessToken, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, secretRefreshToken, {
    expiresIn: "30m",
  });
  return { accessToken, refreshToken };
};

const comparePassword = async (
  clientPassword: string,
  serverPassword: string
) => {
  try {
    let validPassword = await bcrypt.compare(clientPassword, serverPassword);
    return validPassword;
  } catch (e) {
    console.log(e);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    let userData = req.body;
    const checkExist = await User.findOne({ email: userData.email });
    if (checkExist) {
      throw new Error("This user name is already exists!");
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(userData.password, salt);
      const result = await User.create({
        email: userData.email,
        password: hashPassword,
        role: "user",
      });
      const { accessToken, refreshToken } = generateToken(userData);
      return res.status(200).json({
        errCode: 0,
        errMessage: "Create new account success",
        userInfor: result,
        accessToken,
        refreshToken,
      });
    }
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const checkExist = await User.findOne({
      email: userData.email,
    });
    if (checkExist) {
      const compare = await comparePassword(
        userData.password,
        checkExist.password
      );
      if (compare) {
        let { accessToken, refreshToken } = generateToken({
          ...userData,
          role: checkExist.role,
        });
        await AccessRight.create({
          userId: checkExist._id,
          loginTime: new Date(),
          expireTime: new Date(),
          accessToken: accessToken,
          isBlocked: false,
        });
        return res.status(200).json({
          errCode: 0,
          errMessage: "Sign in success",
          email: userData.email,
          role: checkExist.role,
          accessToken,
          refreshToken,
        });
      } else {
        throw new Error("Password incorrect!");
      }
    } else {
      throw new Error("Email incorrect!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const checkExist = await User.findOne({
      email: userData.email,
    });
    if (checkExist) {
      const compare = await comparePassword(
        userData.password,
        checkExist.password
      );
      if (compare) {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        let accessToken = jwt.sign(userData, secret);
        return res.status(200).json({
          errCode: 0,
          errMessage: "Login success",
          email: userData.email,
          accessToken,
        });
      } else {
        throw new Error("Password incorrect!");
      }
    } else {
      throw new Error("Email incorrect!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const authController = {
  signUp,
  signIn,
  logout,
};

export default authController;
