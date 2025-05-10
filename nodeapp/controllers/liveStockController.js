const Livestock = require('../models/liveStockModel');
const fs=require('fs');
const path=require('path');

/**
 * Retrieves all livestock from the database.
 * Responds with a status code of 200 and sends the livestock details in JSON format if successful.
 * if any error respond with 500 status code and a error message
 */
exports.getAllLivestock = async (_req, res) => {
    try {
        const livestock = await Livestock.find({});
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves a specific livestock by its ID.
 * req.params.id contains the ID of the livestock.
 * If found, it returns the livestock details in JSON format.
 */
exports.getLivestockById = async (req, res) => {
    try {
        const livestock = await Livestock.findById(req.params.id);
        if (!livestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${req.params.id}` });
        }
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves livestock related to a specific user.
 * req.params.userId contains the ID of the user.
 * Returns livestock where userId matches.
 */
exports.getLivestockByUserId = async (req, res) => {
    try {
        const livestock = await Livestock.find({ userId: req.params.id });
        res.status(200).json(livestock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Adds a new livestock entry to the database.
 * req.body contains userId, type, breed, age, and other livestock details.
 */
exports.addLivestock = async (req, res) => {
    try {
        const { name, species, age, breed, healthCondition, location, vaccinationStatus, userId } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Attachment file is required" });
        }
        const newLivestock = new Livestock({
            name,
            species,
            age,
            breed,
            healthCondition,
            location,
            vaccinationStatus,
            userId,
            attachment: {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });
        await newLivestock.save();
        
        res.status(200).json({ message: "Livestock Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Updates an existing livestock entry by its ID.
 * req.params.id holds the livestock ID.
 * req.body contains updated values for livestock details.
 */
exports.updateLivestock = async (req, res) => {
    try {
        console.log(req.body);
        let updateData = { ...req.body };

        // If a new file is uploaded, update the attachment field
        if (req.file) {
            updateData.attachment = {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size
            };
        }

        const updatedLivestock = await Livestock.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedLivestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${req.params.id}` });
        }
        res.status(200).json({ message: "Livestock Updated Successfully", livestock: updatedLivestock });
    } catch (error) {
        res.status500.json({ message: error.message });
    }
};

/**
 * Deletes a livestock entry from the database by its ID.
 * req.params.id contains the ID of the livestock to be deleted.
 */
exports.deleteLivestock = async (req, res) => {
    try {
        const deletedLivestock = await Livestock.findByIdAndDelete(req.params.id);
        if (!deletedLivestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${req.params.id}` });
        }
        res.status(200).json({ message: "Livestock Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFileByLivestockId = async (req, res, next) => {
    try {
        const livestock = await Livestock.findById(req.params.id);
        if (!livestock) {
            return res.status(404).json({ message: `Cannot find any livestock with ID ${req.params.id}` });
        }
        const file = livestock.attachment;
        const filepath = path.resolve(__dirname, '..', `${file.path}`);
        if (!fs.existsSync(filepath)) res.status(404).send('No such directory or file found.')
        return res.sendFile(filepath)
    } catch (error) {
        next(error)
    }
}