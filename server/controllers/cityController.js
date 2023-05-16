const City = require('../models/cityModel');

exports.getAllCities = async (req, res, next) => {
    try {
        const cities = await City.find();
        res.status(200).json({
            status: "success",
            results: cities.length,
            data: {
                cities,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.getCity = async (req, res, next) => {
    try {
        const city = await City.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                city,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.createCity = async (req, res, next) => {
    try {
        const newCity = await City.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                city: newCity,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.updateCity = async (req, res, next) => {
    try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                updatedCity,
            }
        });
        
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.deleteCity = async (req, res, next) => {
    try {
        await City.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}