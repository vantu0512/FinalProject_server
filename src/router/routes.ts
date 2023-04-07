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
import paymentController from "../controller/paymentController";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  //sign in & sign up
  app.post("/sign-up", authController.signUp);
  app.post("/sign-in", authController.signIn);
  app.post("/sign-out", authController.signOut);
  app.post("/refresh-token", authController.refreshToken);
  app.post(
    "/change-password",
    middleWare.verifyToken,
    authController.changePassword
  );

  //product api
  app.get("/get-all-product", productController.getAllProduct);
  app.get("/get-detail-product", productController.getDetailProduct);
  app.delete(
    "/delete-product",
    middleWare.verifyToken,
    productController.deleteProduct
  );
  app.post(
    "/add-product",
    middleWare.verifyToken,
    productController.addProduct
  );
  app.put(
    "/update-product",
    middleWare.verifyToken,
    productController.updateProduct
  );

  //user api
  app.get(
    "/get-all-user",
    middleWare.verifyTokenAdmin,
    userController.getAllUser
  );
  app.get(
    "/get-detail-user",
    middleWare.verifyToken,
    userController.getDetailUser
  );
  app.post("/add-user", middleWare.verifyTokenAdmin, userController.addUser);
  app.put("/edit-user", middleWare.verifyToken, userController.editUser);
  app.delete(
    "/delete-user",
    middleWare.verifyTokenAdmin,
    userController.deleteUser
  );
  app.post(
    "/block-user",
    middleWare.verifyTokenAdmin,
    userController.blockUser
  );

  //cart api
  app.get(
    "/get-all-cart",
    middleWare.verifyToken,
    cartController.getAllCartByEmail
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

  app.delete(
    "/delete-all-cart",
    middleWare.verifyToken,
    cartController.deleteAllCartByEmail
  );

  //order api
  app.get(
    "/get-all-order",
    middleWare.verifyToken,
    orderController.getAllOrder
  );
  app.post("/add-order", middleWare.verifyToken, orderController.AddOrder);
  app.post("/edit-order", middleWare.verifyToken, orderController.editOrder);
  app.delete(
    "/delete-order",
    middleWare.verifyToken,
    orderController.deleteOrder
  );
  //payment api
  app.post(
    "/stripe/create-checkout-session",
    middleWare.verifyToken,
    paymentController.checkOut
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
  app.get("/get-all-new", newController.getAllNew);
  app.get("/get-detail-new", newController.getDetailNew);
  app.post("/add-new", middleWare.verifyToken, newController.addNew);
  app.put("/edit-new", middleWare.verifyToken, newController.editNew);
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
