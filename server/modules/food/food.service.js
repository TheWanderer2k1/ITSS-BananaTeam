const sql = require("../../seed/queryMysqlDB");

exports.getFoodDescriptionList = async (keyword, page=null, pageSize=null) => {
    keySearch = ''
    if (keyword) keySearch = `AND food.name like '%${keyword}%'`
    query = `SELECT food.name, price, fooddesciption.Desciption, restaurant.name as restaurantName, restaurant.OpenTime, restaurant.CloseTime, restaurant.Address
        FROM food, fooddesciption, restaurant
        WHERE food.id = fooddesciption.FoodID
        ${keySearch}
        AND fooddesciption.RestaurantID = restaurant.ID`
    result = sql.QueryGetData(query)
    result['attr'] = 'test'
    return result
}
