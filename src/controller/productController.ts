import Product from "../model/product";
import { Request, Response } from "express";

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.find({});
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all product success!",
        listProduct: result,
      });
    } else {
      throw new Error("There are no product!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const getDetailProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const result = await Product.findById({ _id: id });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get detail product success!",
        product: result,
      });
    } else {
      throw new Error("There are no product!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const result = await Product.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Delete product success!",
      });
    } else {
      throw new Error("This product is already deleted!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Product.create({
      title: data.title,
      author: data.author,
      description: data.description,
      datePublish: data.datePublish,
      pageNumber: data.pageNumber,
      price: data.price,
      category: data.category,
      imgUrl: data.imgUrl,
    });

    return res.status(200).json({
      errCode: 0,
      errMessage: "Create new product success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Product.findById({ _id: data.id });
    if (result) {
      result.description = data.description;
      result.datePublish = data.datePublish;
      result.price = data.price;
      result.categoryId = data.category;
      result.imgUrl = data.imgUrl;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update product success!",
        data: result,
      });
    } else {
      throw new Error("This product does't exist!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const productController = {
  getAllProduct,
  getDetailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default productController;
