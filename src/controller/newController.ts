import New from "../model/new";
import { Request, Response } from "express";

const getAllNew = async (req: Request, res: Response) => {
  try {
    const result = await New.find({});
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all new success!",
        listNew: result,
      });
    } else {
      throw new Error("There are no new!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const getDetailNew = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const result = await New.findById({ _id: id });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get detail new success!",
        new: result,
      });
    } else {
      throw new Error("There are no new!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const deleteNew = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const result = await New.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Delete new success!",
      });
    } else {
      throw new Error("This new is already deleted!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const createNew = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await New.create({
      name: data.name,
      description: data.description,
      content: data.content,
      datePublish: data.datePublish,
    });

    return res.status(200).json({
      errCode: 0,
      errMessage: "Create new new success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const updateNew = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await New.findById({ _id: data.id });
    if (result) {
      result.name = data.name;
      result.description = data.description;
      result.content = data.content;
      result.datePublish = data.datePublish;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update new success!",
        data: result,
      });
    } else {
      throw new Error("This new does't exist!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const newController = {
  getAllNew,
  getDetailNew,
  createNew,
  deleteNew,
  updateNew,
};

export default newController;
