import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { userId, items, amount, address , deliveryDate ,deliveryTime } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      deliveryDate,
      deliveryTime,
    });

    // Using a transaction to ensure consistency if multiple operations fail
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Service Charges",
        },
        unit_amount: 160 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  if (!orderId || success === undefined) {
    return res.status(400).json({ success: false, message: "Missing orderId or success parameter" });
  }

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log("Error in verifyOrder:", error);
    res.json({ success: false, message: "Error processing the order verification" });
  }
};

const userOrder = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "UserId is required" });
  }

  try {
    const orders = await orderModel.find({ userId });
    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }
    res.json({ success: true, orders });
  } catch (error) {
    console.log("Error in userOrder:", error);
    res.json({ success: false, message: "Error retrieving orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data:orders });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: "Error" });
  }
}

const updateStatus = async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status:req.body.status });
    const status = req.body.state;
    res.json({ success: true, message: "Order status updated successfully", status });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: "Error updating order status" });
  }
}

export { placeOrder, verifyOrder, userOrder , listOrders , updateStatus};
