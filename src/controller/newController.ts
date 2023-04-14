import New from "../model/new";
import { Request, Response } from "express";

const getAllNew = async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page);
    const size: number = Number(req.query.size);
    const keyword: any = req.query.keyword || "";
    const resultTotal = await New.find({
      $or: [{ name: { $regex: keyword } }],
    });
    const result = await New.find({ $or: [{ name: { $regex: keyword } }] })
      .skip(size * (page - 1))
      .limit(size);
    if (result && resultTotal) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all new success!",
        data: result,
        totalRecord: resultTotal.length,
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
        data: result,
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

const addNew = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await New.create({
      name: data.name,
      description: data.description,
      contentMarkdown: data.contentMarkdown,
      contentHTML: data.contentHTML,
    });

    return res.status(200).json({
      errCode: 0,
      errMessage: "Add new new success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const editNew = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data.id);

    const result = await New.findById({ _id: data.id });
    if (result) {
      result.name = data.name;
      result.description = data.description;
      result.contentMarkdown = data.contentMarkdown;
      result.contentHTML = data.contentHTML;
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
  addNew,
  deleteNew,
  editNew,
};

export default newController;
