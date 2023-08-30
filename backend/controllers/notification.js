const Notification = require('../model/Notification');

const getNotificationForSpecificUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Fetch notifications for the specified user
        const notifications = await Notification.find({
                user: userId,
            })
            .select('sender')
            .exec();

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = { getNotificationForSpecificUser }
