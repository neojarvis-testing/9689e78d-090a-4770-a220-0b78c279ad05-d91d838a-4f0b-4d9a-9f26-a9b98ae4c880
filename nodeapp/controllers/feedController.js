
const Feed = require('../models/feedModel');

// Get all Feeds
// This function retrieves all feed items from the database using `Feed.find({})`.
// If feeds are found, it responds with a status code of 200 and sends the data in JSON format.
// If an error occurs, it responds with a 500 status code and the error message.
exports.getAllFeeds = async (req, res) => {
    try {
        const feeds = await Feed.find({});
        res.status(200).json(feeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Feed by ID
// This function retrieves a specific feed by its ID using `Feed.findById(id)`.
// If the feed exists, it responds with a status code of 200 and sends the feed details in JSON format.
// If the feed is not found, it returns a 404 error with a message indicating that no feed was found with the given ID.
// If an error occurs, it responds with a 500 status code and the error message.
exports.getFeedById = async (req, res) => {
    try {
        const { id } = req.params;
        const feed = await Feed.findById(id);

        if (!feed) {
            return res.status(404).json({ message: `Cannot find any feed with ID ${id}` });
        }

        res.status(200).json(feed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a New Feed
// This function adds a new feed entry to the database using `Feed.create(req.body)`.
// If successful, it responds with a status code of 200 and a success message.
// If an error occurs, it responds with a 500 status code and the error message.
exports.addFeed = async (req, res) => {
    try {
        await Feed.create(req.body);
        res.status(200).json({ message: "Feed Added Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Existing Feed
// This function updates an existing feed based on its ID using `Feed.findByIdAndUpdate(id, req.body, { new: true })`.
// If successful, it returns a status code of 200 along with the updated feed details and a success message.
// If the feed does not exist, it responds with a 404 error.
// If an error occurs, it responds with a 500 status code and the error message.
exports.updateFeed = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFeed = await Feed.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedFeed) {
            return res.status(404).json({ message: `Cannot find any feed with ID ${id}` });
        }

        res.status(200).json({ message: "Feed Updated Successfully", feed: updatedFeed });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Feed
// This function deletes a feed entry from the database using `Feed.findByIdAndDelete(id)`.
// If successful, it returns a status code of 200 with a success message.
// If the feed is not found, it responds with a 404 error message.
// If an error occurs, it responds with a 500 status code and the error message.
exports.deleteFeed = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeed = await Feed.findByIdAndDelete(id);

        if (!deletedFeed) {
            return res.status(404).json({ message: `Cannot find any feed with ID ${id}` });
        }

        res.status(200).json({ message: "Feed Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};