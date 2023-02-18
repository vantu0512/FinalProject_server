import Book from "../model/book.js";

const getAllBook = async (req, res) => {
  try {
    const result = await Book.find({});
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all book success!",
        listBook: result,
      });
    } else {
      throw new Error("There are no book!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const getDetailBook = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Book.findById({ _id: id });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get detail book success!",
        book: result,
      });
    } else {
      throw new Error("There are no book!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Book.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Delete book success!",
      });
    } else {
      throw new Error("This book is already deleted!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const data = req.body;
    const result = await Book.create({
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
      errMessage: "Create new book success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const data = req.body;
    const result = await Book.findById({ _id: data.id });
    if (result) {
      result.title = data.title;
      result.author = data.author;
      result.description = data.description;
      result.datePublish = data.datePublish;
      result.pageNumber = data.pageNumber;
      result.price = data.price;
      result.category = data.category;
      result.imgUrl = data.imgUrl;
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update book success!",
        data: result,
      });
    } else {
      throw new Error("This book does't exist!");
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const bookController = {
  getAllBook,
  getDetailBook,
  createBook,
  deleteBook,
  updateBook,
};

export default bookController;
