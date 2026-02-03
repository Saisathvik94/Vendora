import UserData from "../models/User.js";
import OrderData from "../models/Order.js";

export async function HandleUserProfile(req, res){
    try {
        const userId = req.user.id;
        const user = await UserData.findById(userId);
        if(!user) return res.status(404).json({message: "User Not found"})
        return res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function HandleUpdateProfile(req, res){
    try {
        const userId = req.user.id;
        const updated = req.body;

        const UpdatedUser = await UserData.findByIdAndUpdate(
            userId, 
            { $set: updated },
            { new: true, runValidators: true }
        )

        if(!UpdatedUser) return res.status(404).json({message: "User Not found"})
        return res.status(200).json({ UpdatedUser })
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export async function HandleUserOrders(req, res){
    try{
        const userId = req.user.id;
        const userOrders = await OrderData.find({ userId })
        .populate("items.product", "name price") // populate product name & price
        .populate("items.vendor", "name");;
        if(!userOrders || !userOrders.length) 
            return res.status(404).json({message: "No orders found"})
        return res.status(200).json({ orders: userOrders })
    } catch(error){
        res.status(500).json({message: error.message})
    }
}