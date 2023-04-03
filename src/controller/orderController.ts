import Order from "../model/order";
import { Request, Response } from "express";

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await Order.find({}).populate({
      path: "cartId",
      populate: {
        path: "productId",
      },
    });

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

const AddOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const check = await Order.findOne({
      cartId: orderData.cartId,
    });
    if (check)
      return res.status(500).json({
        errCode: 1,
        errorMessage: "This order already exists!",
      });
    const result = await Order.create({
      cartId: orderData.cartId,
      receiveAddress: orderData.receiveAddress,
      isPurchase: false,
    });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Add to order success!",
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

const removeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await Order.findOneAndDelete({
      cartId: orderData.cartId,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Delete order success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const checkout = async (req: Request, res: Response) => {
  try {
    console.log("here");
    const orderData = req.body;
    const result = await Order.findOne({
      cartId: orderData.cartId,
    });
    if (result) {
      result.isPurchase = true;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Order success!",
        data: orderData,
      });
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const orderController = {
  getAllOrder,
  AddOrder,
  removeOrder,
  checkout,
};
export default orderController;
