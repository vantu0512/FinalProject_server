import Cart from "../model/cart.js";

const getAllCartByUserName = async (req, res) => {
  try {
    const userName = req.query.userName;
    const result = await Cart.find(
      { userName: userName },
      { createdAt: 0, updatedAt: 0, userName: 0, _id: 0 }
    ).populate("bookId", { createdAt: 0, updatedAt: 0 });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Get all cart success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const AddOrUpdateCart = async (req, res) => {
  try {
    const cartData = req.body;
    const result = await Cart.findOne({
      userName: cartData.userName,
      bookId: cartData.bookId,
    });
    if (result) {
      result.quantity = Number(result.quantity) + Number(cartData.quantity);
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Add to cart success!",
        data: result,
      });
    } else {
      const rs = await Cart.create({
        userName: cartData.userName,
        bookId: cartData.bookId,
        quantity: cartData.quantity,
      });
      return res.status(200).json({
        errCode: 0,
        errMessage: "Add to cart success!",
        data: rs,
      });
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cartData = req.body;
    const result = await Cart.findOneAndDelete({
      userName: cartData.userName,
      bookId: cartData.bookId,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Delete from cart success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const cartController = {
  getAllCartByUserName,
  AddOrUpdateCart,
  removeFromCart,
};
export default cartController;
