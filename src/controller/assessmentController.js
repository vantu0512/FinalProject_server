import Book from "../model/book.js";
import Assessment from "../model/assessment.js"
import User from "../model/user.js";

const getAllAssessmentByBookId = async(req, res)=>{
    try {
        const data = req.query;
        const result = await Assessment.find({
            bookId: data.bookId,
          });
          return res.status(200).json({
            errCode: 0,
            errMessage: "Get all assessment success!",
            data: result,
          });
    } 
    catch (e) {
        return res.status(500).json({
            errCode: 1,
            errMessage: e.message,
        });
    }
}

const addAssessment = async (req, res)=>{
    try {
        const data = req.body;
        const user = await User.findOne({userName: data.userName});
        const book = await Book.findOne({bookId: data.bookId});
        if(user && book){
          const result = await Assessment.create({
            userName: data.userName,
            bookId: data.bookId,
            star: data.star,
          });
          return res.status(200).json({
            errCode: 0,
            errMessage: "Add assessment success!",
            data: result,
          });
        }
        else{
          return res.status(200).json({
            errCode: 1,
            errMessage: "User or book not found!",
        });
        }  
    } 
    catch (e) {
        return res.status(500).json({
            errCode: 1,
            errMessage: e.message,
        });
    }
}

const updateAssessment = async (req, res) => {
  try {
    const data = req.body;
    const result = await Assessment.findOne({
      userName: data.userName,
      bookId: data.bookId,
      _id: data.assessmentId
    });
    if (result) {
      result.star = data.newStar
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update assessment success!",
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

const deleteAssessment = async (req, res) => {
  try {
    const data = req.body;
    const result = await Assessment.findOneAndDelete({
      userName: data.userName,
      bookId: data.bookId,
      _id: data.assessmentId
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Delete assessment success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const assessmentController = {
  getAllAssessmentByBookId,
  addAssessment,
  updateAssessment,
  deleteAssessment,
};
export default assessmentController;
