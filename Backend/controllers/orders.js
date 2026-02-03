import OrderData from "../models/Order.js";
import ProductData from "../models/Product.js";

export async function HandleCheckout(req, res){
  try {
    const { items } = req.body; // [{ productId, quantity }]

    if (!items || !items.length) {
      return res.status(400).json({ message: "No items to checkout" });
    }

    // Fetch all products from DB
    const productIds = items.map(i => i.productId);
    const products = await ProductData.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({ message: "Some products are invalid" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Build order items and calculate total
    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.productId);

      if (!product) continue;

      if (item.quantity < 1 || item.quantity > product.stock) {
        return res.status(400).json({
          message: `Product ${product.name} does not have enough stock`
        });
      }

      orderItems.push({
        product: product._id,
        vendor: product.vendorId,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });

      totalAmount += product.price * item.quantity;

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await OrderData.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      status: "Pending"
    });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export async function HandleOrderById(req, res){
    try {
        const orderId = req.params.orderId;
        const order = await OrderData.findById(orderId).populate("items.product");

        if (!order) return res.status(404).json({ message: "Order not found" });

        const isOwner = order.userId.toString() === req.user._id.toString();
        const isVendor = order.items.some(
        i => i.vendor.toString() === req.user._id.toString()
        );

        if (req.user.role === "user" && !isOwner) return res.status(404).json({ message: "Order not found" });
        if (req.user.role === "vendor" && !isVendor) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


export async function HandleOrderStatus(req, res){
    try {
        const orderId = req.params.orderId;
        const order = await OrderData.findById(orderId);

        if (!order) return res.status(404).json({ message: "Order not found" });

        const isOwner = order.userId.toString() === req.user._id.toString();
        const isVendor = order.items.some(
        i => i.vendor.toString() === req.user._id.toString()
        );

        if (req.user.role === "user" && !isOwner) return res.status(404).json({ message: "Order not found" });
        if (req.user.role === "vendor" && !isVendor) return res.status(404).json({ message: "Order not found" });

        res.json({ status: order.status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}