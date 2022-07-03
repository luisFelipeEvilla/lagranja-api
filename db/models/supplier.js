import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: String,
    products: [{ 
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }]
})


export default mongoose.model("Supplier",supplierSchema);