const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: String,
    products: [{ 
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }]
})


module.exports = mongoose.model("Supplier",supplierSchema);