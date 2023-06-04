const sql = require("../../seed/queryMysqlDB");

exports.getFoodDescriptionList = async (keyword, page=1, pageSize=10) => {
    let keySearch = ''
    if (keyword) keySearch = `AND food.name like '%${keyword}%'`

    let paging = `LIMIT ${((page - 1) * pageSize)}, ${pageSize}`

    query = `SELECT fooddescription.id, image.Src as img, AVG(rating) AS rating, food.name, price, fooddescription.Description as description, restaurant.name as restaurantName, restaurant.id AS restaurantId, restaurant.OpenTime, restaurant.CloseTime, restaurant.Address
        FROM fooddescription
        JOIN food on food.id = fooddescription.FoodID
        LEFT JOIN FoodReview on fooddescription.id = foodreview.FoodDesId
        JOIN restaurant on fooddescription.RestaurantID = restaurant.ID
        JOIN image on fooddescription.GroupImageId = image.GroupId
        ${keySearch}
        GROUP BY fooddescription.id, img
        ${paging}`
        
    result = await sql.QueryGetData(query)
    for (food of result) {
        food['restaurant'] = {
            'id': food['restaurantId'],
            'name': food['restaurantName'],
            'openTime': food['OpenTime'],
            'closeTime': food['CloseTime'],
            'address': food['Address']
        }
        delete food['restaurantId']
        delete food['restaurantName']
        delete food['OpenTime']
        delete food['CloseTime']
        delete food['Address']
    }
    return result
}
