import Product from "../model/product";
import Comment from "../model/comment";
import User from "../model/user";
import { Request, Response } from "express";

// const getAllCartByUserName = async (req:Request, res:Response) => {
//   try {
//     const userName = req.query.userName;
//     const result = await Cart.find(
//       { userName: userName },
//       { createdAt: 0, updatedAt: 0, userName: 0, _id: 0 }
//     ).populate("productId", { createdAt: 0, updatedAt: 0 });
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Get all cart success!",
//       data: result,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       errCode: 1,
//       errMessage: e.message,
//     });
//   }
// };
const getAllCommentByProductId = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    const result = await Comment.find({
      productId: data.productId,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Get all comment success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const addComment = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findOne({ userName: data.userName });
    const product = await Product.findOne({ productId: data.productId });
    if (user && product) {
      const result = await Comment.create({
        userName: data.userName,
        productId: data.productId,
        comment: data.comment,
      });
      return res.status(200).json({
        errCode: 0,
        errMessage: "Add comment success!",
        data: result,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "User or product not found!",
      });
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Comment.findOne({
      userName: data.userName,
      productId: data.productId,
      _id: data.commentId,
    });
    if (result) {
      result.comment = data.newComment;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update comment success!",
        data: result,
      });
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Comment.findOneAndDelete({
      userName: data.userName,
      productId: data.productId,
      _id: data.commentId,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Delete comment success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const commentController = {
  getAllCommentByProductId,
  addComment,
  updateComment,
  deleteComment,
};
export default commentController;
