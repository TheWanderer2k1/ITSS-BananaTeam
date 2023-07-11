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
        console.log('req.files', req.files)
        let { foodId } = req.params;
        await FoodService.addReview(foodId, req.body,req.files);
        
        if(req.body.review && req.body.rating && req.files.length >1){
            res.status(200).json({
                success: true,
                message: '100ポイントを獲得します!'
        })}
        else{
            res.status(200).json({
                success: true,
                message: 'review success!',
            })}    
        }
        catch (error) {
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
        await FoodService.editReview(foodId, reviewId, req.body, req.files);

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
        let { userId } = req.body
        await FoodService.deleteReview(foodId, reviewId, userId);

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

exports.getFoodByAddress = async (req, res) => {
    try {
        let {province, district, ward} = req.query
        let foodListByAddress = await FoodService.getFoodByAddress({province:province, district:district, ward:ward});

        res.status(200).json({
            success: true,
            messages: 'Get food list by address success',
            content: foodListByAddress
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

exports.getFoodInforById = async (req, res) => {
    try {
        let {foodDesId} = req.params
        let foodInfor = await FoodService.getFoodInforById(foodDesId);

        res.status(200).json({
            success: true,
            messages: 'Get food info',
            content: foodInfor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

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

exports.updateFoodInfor = async (req, res) => {
    try {
        let data = req.body
        let {foodId} = req.params
        
        data.foodId = foodId
        await FoodService.updateFoodInfor(data,req.files);
      
            res.status(200).json({
                success: true,
                messages: 'edit food info success!',
            })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}

exports.deleteFoodInfor = async (req, res) => {
    try {
        let {foodId} = req.params
        await FoodService.deleteFoodInfor(foodId);
        
        
        res.status(200).json({
            success: true,
            messages: 'delete food success!',
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}
