import Order from "../model/order";
import { Request, Response } from "express";

const getAllOrderByUserName = async (req: Request, res: Response) => {
  try {
    const userName = req.query.userName;
    const result = await Order.find(
      { userName: userName },
      { createdAt: 0, updatedAt: 0, userName: 0, _id: 0 }
    ).populate("productId", { createdAt: 0, updatedAt: 0 });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Get all order success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const AddOrUpdateOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await Order.findOne({
      userName: orderData.userName,
      cartId: orderData.cartId,
      receiveAddress: orderData.receiveAddress,
    });
    if (result) {
      result.receiveAddress = orderData.receiveAddress;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update order success!",
        data: result,
      });
    } else {
      const rs = await Order.create({
        userName: orderData.userName,
        cartId: orderData.cartId,
        receiveAddress: orderData.receiveAddress,
      });
      return res.status(200).json({
        errCode: 0,
        errMessage: "Add to order success!",
        data: rs,
      });
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const removeFromOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await Order.findOneAndDelete({
      userName: orderData.userName,
      cartId: orderData.cartId,
      receiveAddress: orderData.receiveAddress,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Delete from order success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const orderController = {
  getAllOrderByUserName,
  AddOrUpdateOrder,
  removeFromOrder,
};
export default orderController;
