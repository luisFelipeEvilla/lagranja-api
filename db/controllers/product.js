import Product from "../models/product.js";

export const createProduct = async (product) => {
    const productToSave = new Product(product);

    await productToSave.save();

    return productToSave;
}