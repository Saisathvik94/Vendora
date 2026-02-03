import VendorData from "../models/Vendor.js";
import ProductData from "../models/Product.js"
import OrderData from "../models/Order.js";

export async function HandleVendorProfile(req, res){
    try{
        const vendorId = req.user.id;
        const vendor = await VendorData.findById(vendorId);
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        return res.status(200).json({ vendor });
    } catch(error) {
        res.status(500).json({message : error.message})
    }
}

export async function HandleUpdateProfile(req, res){
    try {
        const vendorId = req.user.id
        const updated = req.body

        const updateVendor = await VendorData.findByIdAndUpdate(
            vendorId, 
            { $set: updated },
            { new: true, runValidators: true }
        ) // return the updated document

        if (!updateVendor) {
        return res.status(404).json({ message: "Vendor not found" });
        }

        return res.status(200).json({ vendor: updateVendor });
    } catch(error) {
        res.status(500).json({message : error.message})
    }
}

export async function HandleGetVendorProducts(req, res) {
    try {
        const vendorId = req.user.id;
        const GetVendorProducts = await ProductData.find({ vendorId });
        return res.status(200).json({ products: GetVendorProducts })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export async function HandlePostVendorProducts(req, res){
    try{
        const { name, stock, description, price } = req.body
        const vendorId = req.user.id
        if (!name || !description || price == null || stock == null) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const PostVendorProducts = await ProductData.create({
            vendorId,
            name,
            stock ,
            description,
            price
        })

        if (!PostVendorProducts) return res.status(401).json({message : "Failed to list the product"})

        return res.status(200).json({message: "Sucessfully listed Product"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export async function HandleUpdateVendorProduct(req, res){
    try {
        const vendorId = req.user.id
        const productId = req.params.productId
        const updated = req.body

        const updateProduct = await ProductData.findByIdAndUpdate(
            { vendorId, _id: productId},
            { $set: updated },
            { new: true, runValidators: true }
        ) 

        if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ product: updateProduct });
    } catch (error){
        return res.status(500).json({message: error.message})
    }
}

export async function HandleVendorProductDelete(req, res){
    try {
        const vendorId = req.user.id;
        const productId = req.params.productId
        const DeleteProduct = await ProductData.deleteOne({_id: productId, vendorId})
        if(DeleteProduct.deletedCount === 0) return res.status(400).json({ message: "Failed to delete product" });
        return res.status(200).json({message : "Item Deleted"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}




export async function HandleVendorOrders(req, res) {
  try {
    const vendorId = req.user.id;

    const orders = await OrderData.find({
      "items.vendor": vendorId
    })
    .populate("userId", "name email")
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });

    return res.status(200).json({ orders });

  } catch (error) {
    console.error("Vendor orders error:", error);
    res.status(500).json({ message: error.message });
  }
}
