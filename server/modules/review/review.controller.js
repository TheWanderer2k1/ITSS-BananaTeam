const FoodReview = require('./review.service');

exports.addReactReviewFood = async (req, res) => {
    try {
        let {foodId,reviewId}=req.params
        let data = req.body
        data.foodId = foodId
        data.reviewId = reviewId
        await FoodReview.addReactReviewFood(data);

        res.status(200).json({
            success: true,
            messages: 'react success!'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}