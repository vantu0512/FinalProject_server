import jwt from "jsonwebtoken";
import { RequestHandler } from 'express';

const verifyToken: RequestHandler = (req, res, next) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    let decode = jwt.verify(token, secret as string);
    console.log("Decode: ", decode);
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

let middleWare = {
  verifyToken,
};

export default middleWare;
