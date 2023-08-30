const Message = require('../model/Message');

const addMessage = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const files = req.files;

    try {
        const {
            from,
            to,
            message,
            type
        } = req.body;

        const data = await Message.create({
            message: {
                text: message
            },
            files: files.map((file) => url + '/images/' + file.filename),
            users: [from, to],
            type: type,
            sender: from
        });
        if (data) {
            return res.json({
                msg: 'Message added successfully',
                data: data
            });
        } else {
            return res.json({
                msg: 'Failed to add message to the database'
            });
        }
    } catch (ex) {
        next(ex);
    }
};

const getAllMessages = async (req, res, next) => {
    try {
        const {
            from,
            to
        } = req.body;

        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({
            updatedAt: 1
        });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                files: msg.files,
                type: msg.type
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports = { addMessage, getAllMessages }
