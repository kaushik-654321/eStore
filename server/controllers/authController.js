import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';



export const registeredUser = async (req, res) => {
    try {
        const { name: fullName, email, mobile, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'user already exists' });
        const user = await User.create({ fullName, email, mobile, password });
        if (user) {
            return res.status(201).json({ name: user.fullName, email: user.email, userId: user.id, message: 'User registered successfully' });
        }
        else {
            return res.status(400).json({ message: 'Invalid user Data' })
        }
    }
    catch (error) { res.status(500).json({ message: 'Server Error', error }) };
}

export const loginusers = async (req, res) => {
    try {
        const { email, password, } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid login credentials' })
        }
        const token = generateToken(user._id);
        // res.cookie('token', token, {
        //     httpOnly: false,
        //     secure: false,
        //     sameSite: 'None',
        //     domain: '.app.github.dev',
        //     maxAge: 24 * 60 * 60 * 1000 //1day
        // })
        return res.status(200).json({ token, name: user.fullName, email: user.email, userId: user.id, message: 'Login Successfull' })

    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

export const OauthUserLoggedIn = async (req, res) => {
    console.log('Request session:', req.session);
    console.log('Request user:', req.user);
    if (req.isAuthenticated()) {
        return res.status(200).json(req.user);

    } else {
        return res.status(401).json({ message: 'Not logged in' });

    }
}


export const OauthUserLoggedOut = async (req, res) => {
    req.logout(() => {
        res.redirect('https://estore91.netlify.app');
    });
}

