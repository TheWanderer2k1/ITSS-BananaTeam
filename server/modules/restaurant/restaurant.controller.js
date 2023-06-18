const RestaurantService = require('./restaurant.service');

exports.getRestaurantInforById = async (req, res) => {
    try {
        let {restaurantId}=req.query
        let restaurantInfor = await RestaurantService.getRestaurantInforById(restaurantId);

        res.status(200).json({
            success: true,
            messages: 'Get restaurant info',
            content: restaurantInfor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}