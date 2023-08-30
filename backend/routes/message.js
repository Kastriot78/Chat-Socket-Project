const router = require('express').Router();
const {
    upload
} = require('../fileUpload');

const {
    addMessage,
    getAllMessages
} = require('../controllers/message');

router.post('/addmsg', upload.array('files', 26), addMessage);
router.post('/getmsg', getAllMessages);
module.exports = router;