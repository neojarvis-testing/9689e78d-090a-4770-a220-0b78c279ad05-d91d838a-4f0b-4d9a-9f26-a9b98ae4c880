const User = require('../models/userModel');
const { generateToken } = require('../authUtils'); // Import JWT generation function
const bcrypt = require('bcryptjs');
const validator=require('validator');
const sanitizeHtml = require('sanitize-html');
const createError=require('http-errors');

// ✅ Login User
// This function retrieves a user from the database by matching the provided email and password.
// If found, it generates a JWT token using the generateToken utility and returns user details along with the token.
// If no user is found, it responds with a 404 error message.
// If an error occurs during the process, it responds with a 500 status code and the error message.
exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        email = email.toString();
        if(!validator.isEmail(email)) throw createError(400, `Invalid EMAIL ID: ${email}`)
        const user = await User.findOne({ email: sanitizeHtml(email)});
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = generateToken({ id: user._id, userName: user.userName, role: user.role });
        res.status(200).json({
            id: user._id,
            username: user.userName,
            role: user.role,
            token: token
           
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// ✅ Register User
// This function creates a new user in the database using the provided request body.
// It ensures that all required fields (userName, email, mobile, password, role) are passed before creating the user.
// If successful, it responds with a status code of 200 and a success message.
// If an error occurs during the user creation process, it responds with a 500 status code and the error message.

exports.addUser = async (req, res) => {
    try {
        const { userName, email, mobile, password, role } = req.body;

        // Ensure user inputs are properly converted to strings
        userName = userName.toString();
        email = email.toString();
        password = password.toString();
        role=role.toString();
        mobile = mobile.toString();
        
        const hashedPassword = await bcrypt.hash(password.toString(), 10);
    if(!validator.isEmail(email)) throw createError(400, `Invalid EMAIL ID: ${email}`)
        const newUser = await User.create({ 
            userName: sanitizeHtml(userName), 
            email: sanitizeHtml(email), 
            mobile: sanitizeHtml(mobile), 
            password: sanitizeHtml(hashedPassword), 
            role: sanitizeHtml(role) 
        });

        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.verifyEmail = async (req, res) => {
  const { email } = req.body;
  email = email.toString();
  if(!validator.isEmail(email)) throw createError(400, `Invalid EMAIL ID: ${email}`)
  const user = await User.findOne({ email: sanitizeHtml(email)});

  if (user) {
    res.json({ success: true });
  } else {
    res.status(200).json({success: false });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  email = email.toString();
  if(!validator.isEmail(email)) throw createError(400, `Invalid EMAIL ID: ${email}`)
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(newPassword.toString(), salt); // Hash password
  await User.updateOne({ email: sanitizeHtml(email)}, { $set: { password: hashedPassword } });

  res.json({ success: true, message: 'Password reset successfully' });
};