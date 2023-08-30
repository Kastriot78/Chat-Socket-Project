const router = require('express').Router();


const {
    getNotificationForSpecificUser
} = require('../controllers/notification');

router.get('/:userId', getNotificationForSpecificUser);
module.exports = router;