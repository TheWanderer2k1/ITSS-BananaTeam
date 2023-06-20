const FoodService = require('./food.service');

exports.getFoodDescriptionList = async (req, res) => {
    try {
        let {keyword, page, pageSize} = req.query
        let foodDescriptionList = await FoodService.getFoodDescriptionList(keyword, page, pageSize);

        res.status(200).json({
            success: true,
            messages: 'Get food list success',
            content: foodDescriptionList
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

exports.getReviewList = async (req, res) => {
    try {
        let { foodId } = req.params;
        let foodReviewList = await FoodService.getReviewList(foodId);

        res.status(200).json({
            success: true,
            message: 'Get list review success',
            content: foodReviewList
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            content: error
        })
    }
}

exports.addReview = async (req, res) => {
    try {
        let { foodId } = req.params;
        await FoodService.addReview(foodId, req.body);

        res.status(200).json({
            success: true,
            message: 'review success!',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            content: error
        })
    }
}

exports.editReview = async (req, res) => {
    try {
        let { foodId, reviewId } = req.params;
        await FoodService.editReview(foodId, reviewId, req.body);

        res.status(200).json({
            success: true,
            message: 'edit success!',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            content: error
        })
    }
}

exports.deleteReview = async (req, res) => {
    try {
        let { foodId, reviewId } = req.params;
        await FoodService.deleteReview(foodId, reviewId);

        res.status(204).json({
            success: true,
            message: 'delete success!',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            content: error
        })
    }
}

exports.reactReview = async (req, res) => {
    try {
        let { foodId, reviewId } = req.params;
        let {userId, reactType } = req.body;
        await FoodService.reactReview(foodId, reviewId, userId, reactType);

        res.status(200).json({
            success: true,
            message: 'react success!',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            content: error
        })
    }
}

exports.unreactReview = async (req, res) => {
    try {
        let { foodId, reviewId } = req.params;
        let { userId } = req.body;
        await FoodService.unreactReview(foodId, reviewId, userId);

        res.status(200).json({
            success: true,
            message: 'delete success!',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            content: error
        })
    }
}