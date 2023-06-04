const sql = require("../../seed/queryMysqlDB");

exports.getFoodDescriptionList = async (keyword, page=1, pageSize=10) => {
    const keySearch = ''
    if (keyword) keySearch = ``

    const paging = `LIMIT ${((page - 1) * pageSize) + 1}, ${page * pageSize}`

    query = `SELECT image.Src as img, AVG(rating) AS rating, food.name, price, fooddesciption.Desciption as description, restaurant.name as restaurantName, restaurant.OpenTime, restaurant.CloseTime, restaurant.Address
        FROM food, fooddesciption, restaurant, image, FoodReview
        WHERE food.id = fooddesciption.FoodID
        AND fooddesciption.id = foodreview.FoodDesId
        AND fooddesciption.GroupImageId = image.GroupId
        AND fooddesciption.RestaurantID = restaurant.ID
        ${keySearch}
        GROUP BY description, img, food.name, price, restaurantName, restaurant.OpenTime, restaurant.CloseTime, restaurant.Address
        ${paging}`
    result = await sql.QueryGetData(query)
    for (food of result) {
        food['restaurant'] = {
            'name': food['restaurantName'],
            'openTime': food['OpenTime'],
            'closeTime': food['CloseTime'],
            'address': food['Address']
        }
        delete food['restaurantName']
        delete food['OpenTime']
        delete food['CloseTime']
        delete food['Address']
    }
    return result
}
