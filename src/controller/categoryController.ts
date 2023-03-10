import Category from "../model/category";
import { Request, Response } from "express";

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await Category.find({});
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all category success!",
        listCategory: result,
      });
    } else {
      throw new Error("There are no category!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const getDetailCategory = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const result = await Category.findById({ _id: id });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get detail category success!",
        category: result,
      });
    } else {
      throw new Error("There are no category!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const result = await Category.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Delete category success!",
      });
    } else {
      throw new Error("This category is already deleted!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Category.create({
      name: data.name,
    });

    return res.status(200).json({
      errCode: 0,
      errMessage: "Create new category success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Category.findById({ _id: data.id });
    if (result) {
      result.name = data.name;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update category success!",
        data: result,
      });
    } else {
      throw new Error("This category does't exist!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const categoryController = {
  getAllCategory,
  getDetailCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};

export default categoryController;
