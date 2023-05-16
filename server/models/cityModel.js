const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "City is required"],
    }
});

const City = mongoose.model('City', citySchema);
module.exports = City;