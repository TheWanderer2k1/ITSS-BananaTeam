const User = require('./user.service');

exports.getUserById = async (req, res) => {
    try {
        let {userId}=req.params
       
        let result = await User.getUserById(userId);

        res.status(200).json({
            success: true,
            messages: 'Get user info success',
            content: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

exports.getUserByPhone = async (req, res) => {
    try {
        let {phone}=req.params
       
        let result = await User.getUserByPhone(phone);

        res.status(200).json({
            success: true,
            messages: 'Get user info success',
            content: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}