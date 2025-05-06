const User = require('../models/User');
const { generateToken } = require('../utils/JwtUtils'); // Import JWT generation function

// ✅ Login User
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
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { userName, email, mobile, password, role } = req.body;
        const newUser = await User.create({ userName, email, mobile, password, role });
        res.status(200).json({ message: "Success", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};