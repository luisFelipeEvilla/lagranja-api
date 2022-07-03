const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: String
})


module.exports = mongoose.model("Supplier",supplierSchema);