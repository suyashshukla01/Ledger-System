const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');
const tokenBlackListModel = require('../models/blackList.model');

async function userRegisterController(req, res) {
    const { name, email, password } = req.body;

    const isExists = await userModel.findOne({
        email: email
    });

    if (isExists) {
        return res.status(422).json({
            success: false,
            message: 'Email already exists'
        });
    }

    const user = await userModel.create({
        name,
        email,
        password
    });

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: '3d'
        }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token
    });

    await emailService.sendRegistrationEmail(
        user.email,
        user.name
    );
}

async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel
        .findOne({ email })
        .select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }

    const isValidPassword =
        await user.comparePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: '3d'
        }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token
    });
}

async function userLogoutController(req, res) {

    const token =
        req.cookies.token ||
        req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    }

    await tokenBlackListModel.create({
        token: token
    });

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

    res.status(200).json({
        message: 'User logged out successfully'
    });
}

module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
};