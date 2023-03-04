import { Express, Request, Response } from "express";
import middleWare from "../middleware/middleware";
import productController from "../controller/productController";
import userController from "../controller/userController";
import authController from "../controller/authController";
import cartController from "../controller/cartController";
import commentController from "../controller/commentController";
import assessmentController from "../controller/assessmentController";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  //sign in & sign up
  app.post("/sign-up", authController.signUp);
  app.post("/sign-in", authController.signIn);

  //product api
  app.get(
    "/get-all-product",
    middleWare.verifyToken,
    productController.getAllProduct
  );
  app.get(
    "/get-detail-product",
    middleWare.verifyToken,
    productController.getDetailProduct
  );
  app.delete(
    "/delete-product",
    middleWare.verifyToken,
    productController.deleteProduct
  );
  app.post(
    "/create-product",
    middleWare.verifyToken,
    productController.createProduct
  );
  app.put(
    "/update-product",
    middleWare.verifyToken,
    productController.updateProduct
  );

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
    commentController.getAllCommentByProductId
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
    assessmentController.getAllAssessmentByProductId
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
