const User = require('../models/userModel');
const { generateToken } = require('../authUtils'); // Import JWT generation function

// ✅ Login User
// This function retrieves a user from the database by matching the provided email and password.
// If found, it generates a JWT token using the generateToken utility and returns user details along with the token.
// If no user is found, it responds with a 404 error message.
// If an error occurs during the process, it responds with a 500 status code and the error message.
exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = generateToken({ id: user._id, userName: user.userName, role: user.role });
        res.status(200).json({
            id: user._id,
            userName: user.userName,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Register User
// This function creates a new user in the database using the provided request body.
// It ensures that all required fields (userName, email, mobile, password, role) are passed before creating the user.
// If successful, it responds with a status code of 200 and a success message.
// If an error occurs during the user creation process, it responds with a 500 status code and the error message.
exports.addUser = async (req, res) => {
    try {
        const { userName, email, mobile, password, role } = req.body;
        const newUser = await User.create({ userName, email, mobile, password, role });
        res.status(200).json({ message: "Success", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
