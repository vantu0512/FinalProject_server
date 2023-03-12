import { Express, Request, Response } from "express";
import middleWare from "../middleware/middleware";
import productController from "../controller/productController";
import userController from "../controller/userController";
import authController from "../controller/authController";
import cartController from "../controller/cartController";
import commentController from "../controller/commentController";
import assessmentController from "../controller/assessmentController";
import categoryController from "../controller/categoryController";
import accessRightController from "../controller/accessRightController";
import newController from "../controller/newController";
import pageController from "../controller/pageController";
import orderController from "../controller/orderController";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  //sign in & sign up
  app.post("/sign-up", authController.signUp);
  app.post("/sign-in", authController.signIn);
  app.post("/sign-out", authController.signOut);
  app.post("/refresh-token", authController.refreshToken);

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

  //order api
  app.get(
    "/get-all-order",
    middleWare.verifyToken,
    orderController.getAllOrderByUserName
  );
  app.post(
    "/add-to-order",
    middleWare.verifyToken,
    orderController.AddOrUpdateOrder
  );
  app.delete(
    "/remove-from-order",
    middleWare.verifyToken,
    orderController.removeFromOrder
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

  //category api
  app.get(
    "/get-all-category",
    middleWare.verifyToken,
    categoryController.getAllCategory
  );
  app.get(
    "/get-detail-category",
    middleWare.verifyToken,
    categoryController.getDetailCategory
  );
  app.post(
    "/add-category",
    middleWare.verifyToken,
    categoryController.createCategory
  );
  app.put(
    "/update-category",
    middleWare.verifyToken,
    categoryController.updateCategory
  );
  app.delete(
    "/delete-category",
    middleWare.verifyToken,
    categoryController.deleteCategory
  );

  // access right api
  app.get(
    "/get-all-access-right",
    middleWare.verifyToken,
    accessRightController.getAllAccessRight
  );
  app.get(
    "/get-detail-access-right",
    middleWare.verifyToken,
    accessRightController.getDetailAccessRight
  );
  app.post(
    "/add-access-right",
    middleWare.verifyToken,
    accessRightController.createAccessRight
  );
  app.put(
    "/update-access-right",
    middleWare.verifyToken,
    accessRightController.updateAccessRight
  );
  app.delete(
    "/delete-access-right",
    middleWare.verifyToken,
    accessRightController.deleteAccessRight
  );

  // news api
  app.get("/get-all-new", middleWare.verifyToken, newController.getAllNew);
  app.get(
    "/get-detail-new",
    middleWare.verifyToken,
    newController.getDetailNew
  );
  app.post("/add-new", middleWare.verifyToken, newController.createNew);
  app.put("/update-new", middleWare.verifyToken, newController.updateNew);
  app.delete("/delete-new", middleWare.verifyToken, newController.deleteNew);

  // page api
  app.get("/get-all-page", middleWare.verifyToken, pageController.getAllPage);
  app.get(
    "/get-detail-page",
    middleWare.verifyToken,
    pageController.getDetailPage
  );
  app.post("/add-page", middleWare.verifyToken, pageController.createPage);
  app.put("/update-page", middleWare.verifyToken, pageController.updatePage);
  app.delete("/delete-page", middleWare.verifyToken, pageController.deletePage);
};

export default routes;
