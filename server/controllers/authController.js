const user = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.registeredUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        const userExists = await user.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'user already exists' });
        const user = await user.create({ name, email, mobile, password });
        if (user) {
            return res.status(201).json({ message: 'User registered successfully' });
        }
        else {
            return res.status(400).json({ message: 'Invalid user Data' })
        }
    }
    catch (error) { res.status(500).json({ message: 'Server Error', error }) };
}

exports.loginusers = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        return res.status(200).json({ token: generateToken(user._id), userId: user.id, message: 'Login Successfull' })

    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}