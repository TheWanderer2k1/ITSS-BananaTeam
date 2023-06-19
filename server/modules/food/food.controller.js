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
        console.log(foodDesId)
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
        console.log(data)
        FoodService.updateFoodInfor(data);
      
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
