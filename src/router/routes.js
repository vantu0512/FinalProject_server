import middleWare from "../middleware/middleware.js";
import bookController from "../controller/bookController.js";
import userController from "../controller/userController.js";
import authController from "../controller/authController.js";
import cartController from "../controller/cartController.js";
import commentController from "../controller/commentController.js";
import assessmentController from "../controller/assessmentController.js";

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  //sign in & sign up
  app.post("/sign-up", authController.signUp);
  app.post("/sign-in", authController.signIn);

  //book api
  app.get("/get-all-book", middleWare.verifyToken, bookController.getAllBook);
  app.get(
    "/get-detail-book",
    middleWare.verifyToken,
    bookController.getDetailBook
  );
  app.delete("/delete-book", middleWare.verifyToken, bookController.deleteBook);
  app.post("/create-book", middleWare.verifyToken, bookController.createBook);
  app.put("/update-book", middleWare.verifyToken, bookController.updateBook);

  //user api
  app.get("/get-all-user", middleWare.verifyToken, userController.getAllUser);

  //cart api
  app.get(
    "/get-all-cart",
    middleWare.verifyToken,
    cartController.getAllCartByUserName
  );
  app.post(
    "/add-to-cart",
    middleWare.verifyToken,
    cartController.AddOrUpdateCart
  );
  app.delete(
    "/remove-from-cart",
    middleWare.verifyToken,
    cartController.removeFromCart
  );

  //comment api
  app.get(
    "/get-all-comment",
    middleWare.verifyToken,
    commentController.getAllCommentByBookId
  );
  app.post(
    "/add-comment",
    middleWare.verifyToken,
    commentController.addComment
  );
  app.put(
    "/update-comment",
    middleWare.verifyToken,
    commentController.updateComment
  );
  app.delete(
    "/delete-comment",
    middleWare.verifyToken,
    commentController.deleteComment
  );

  //assessment api
  app.get(
    "/get-all-assessment",
    middleWare.verifyToken,
    assessmentController.getAllAssessmentByBookId
  );
  app.post(
    "/add-assessment",
    middleWare.verifyToken,
    assessmentController.addAssessment
  );
  app.put(
    "/update-assessment",
    middleWare.verifyToken,
    assessmentController.updateAssessment
  );
  app.delete(
    "/delete-assessment",
    middleWare.verifyToken,
    assessmentController.deleteAssessment
  );
};

export default routes;
