const router = require('express').Router();
const {
    register,
    login,
    setAvatar,
    getAllUsers,
    resetNotifications
} = require('../controllers/user');
const {
    upload
} = require('../fileUpload');

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', upload.fields([{
    name: 'avatarImage',
    maxCount: 1
}]), setAvatar);
router.get('/getAllUsers/:id', getAllUsers);
router.put('/notifications/reset/:userId/:senderId', resetNotifications)
module.exports = router;