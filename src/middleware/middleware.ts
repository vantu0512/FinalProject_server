import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import AccessRight from "../model/accessRight";

const verifyToken: RequestHandler = async (req, res, next) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    let decode = jwt.verify(token, secret as string);
    console.log("Decode: ", decode);
    const check = await AccessRight.findOne({ accessToken: token });
    if (check) return next();
    else
      return res
        .status(403)
        .json({ message: "Session expired, please sign in again!" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

let middleWare = {
  verifyToken,
};

export default middleWare;
