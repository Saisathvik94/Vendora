import ProductData from "../models/Product.js";


export async function HandleProducts(req, res){
    try{
        const products = await ProductData.find()

        if(products.length===0) return res.json({message: "products not found"})
        
        return res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export async function HandleProductById(req, res) {
    const productId = req.params.productId;

    try {
        const product = await ProductData.findById(productId);
        if(!product) return res.status(404).json({message: "product not found"})
        
        return res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}
 