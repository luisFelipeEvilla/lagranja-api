import Supplier from "../models/supplier.js"
import Product from "../models/product.js";
import { ResourceNotFoundError } from "../../Errors/errors.js";

export const createSupplier = async (supplier) => {
    const supplierToSave = new Supplier(supplier);

    await supplierToSave.save();

    return supplierToSave;
}

export const getSuppliers = async (startDate, endDate) => {
    const suppliers = await Supplier.find();

    const length = suppliers.length;

    for (let i = 0; i < length; i++) {
        const supplier = suppliers[i];

        let params = {};
        if (startDate && endDate) {
            params = {
                supplier: supplier._id,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        } else {
            var now = new Date();
            var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            params = {
                supplier: supplier._id,
                createdAt: {
                    $gte: startOfToday
                }
            }
        };
        
        const products = await Product.find(params);

        supplier.products = products;
    }

    return suppliers;
}

export const getSupplier = async (_id) => {
    const supplier = await Supplier.findOne({ _id });

    if (!supplier) throw new Error(`Supplier with _id ${_id} not found`);

    const products = await Product.find({ supplier: _id });

    supplier.products = products;

    return supplier;
}

export const updateSupplier = async (_id, supplier) => {
    const options = {
        new: true
    }

    const updateSupplier = await Supplier.findByIdAndUpdate(_id, supplier, options);

    if (!updateSupplier) throw new ResourceNotFoundError(`Supplier with id ${_id} does not found`);

    return updateSupplier;
}