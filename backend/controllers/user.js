const User = require('../model/User');
const NotificationModel = require('../model/Notification');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const usernameCheck = await User.findOne({
            username
        });

        if (usernameCheck) {
            return res.status(400).json({
                error: `This username already exists`,
                status: false
            });
        }

        const emailCheck = await User.findOne({
            email
        });
        if (emailCheck) {
            return res.status(400).json({
                error: `This email already exists`,
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        delete user.password;
        return res.json({
            msg: 'User created successfully',
            status: true,
            user
        });
    } catch (error) {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
};

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await User.findOne({
            username
        });

        if (!user) {
            throw new Error(`This username does not exists!`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Password is wrong. Try again.");
        }

        delete user.password;
        return res.json({
            msg: 'User signed in successfully',
            status: true,
            user
        });
    } catch (error) {
        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
};

const setAvatar = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const userId = req.params.id;
        const avatarImage = url + '/images/' + req.files['avatarImage'][0].filename;
        const userData = await User.findByIdAndUpdate(userId, {
            username: req.body.username,
            email: req.body.email,
            isAvatarImageSet: true,
            avatarImage
        }, {
            new: true
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
            status: true
        })
    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({
            _id: {
                $ne: req.params.id
            }
        }).select(["email", "username", "avatarImage", "_id"]);
        return res.json(users);
    } catch (err) {
        next(err);
    }
}

const resetNotifications = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const senderId = req.params.senderId;

        await NotificationModel.deleteMany({
            user: userId,
            sender: senderId
        });

        res.status(200).json({
            message: 'Notifications reset successfully'
        });
    } catch (error) {
        console.error('Error resetting notifications:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}
module.exports = { register, login, setAvatar, getAllUsers, resetNotifications }
