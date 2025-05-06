const Request = require('../models/requestModel');

/**
 * Retrieves all requests from the database.
 * Each request includes related feed, livestock, and user information.
 */
exports.getAllRequests = async (_req, res) => {
    try {
        const requests = await Request.find({})
            .populate('feedId')
            .populate('livestockId')
            .populate('userId');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Retrieves a specific request by its ID.
 * req.params.id contains the ID of the request.
 * If found, it returns feed, livestock, and request details.
 */
exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('feedId')
            .populate('livestockId');
        if (!request) {
            return res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Retrieves all requests related to a specific user.
 * req.params.userId contains the ID of the user.
 * Returns requests where userId matches.
 */
exports.getRequestsByUserId = async (req, res) => {
    try {
        const requests = await Request.find({ userId: req.params.userId })
           .populate([{path: 'feedId'}, {path: 'livestockId'}])
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Adds a new request to the database.
 * req.body contains feedId, userId, livestockId, quantity, status, and requestDate.
 */
exports.addRequest = async (req, res) => {
    try {
        const newRequest = await Request.create(req.body);
        res.status(200).json({ message: "Request Added Successfully", request: newRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Updates an existing request by its ID.
 * req.params.id holds the request's ID.
 * req.body contains updated values for fields like quantity and status.
 */
exports.updateRequest = async (req, res) => {
    try {
        const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }

        res.status(200).json({ message: "Request Updated Successfully", request: updatedRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Deletes a request from the database by its ID.
 * req.params.id contains the ID of the request to be deleted.
 */
exports.deleteRequest = async (req, res) => {
    try {
        const deletedRequest = await Request.findByIdAndDelete(req.params.id);

        if (!deletedRequest) {
            return res.status(404).json({ message: `Cannot find any request with ID ${req.params.id}` });
        }

        res.status(200).json({ message: "Request Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
