const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    supplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Supplier",
    },
    quantity: {type: Number, required: true},
    name: {type: String, required: true},
    observation: String,
}, {
    timestamps:true
})

module.exports = mongoose.model("Product",ProductSchema);
