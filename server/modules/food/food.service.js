const sql = require("../../seed/queryMysqlDB");

exports.getFoodDescriptionList = async (keyword) => {
    let keySearch = ''
    if (keyword) keySearch = `AND food.name like '%${keyword}%'`

    query = `SELECT fooddescription.id, image.Src as img, AVG(rating) AS rating, food.name, price, fooddescription.Description as description, restaurant.name as restaurantName, restaurant.id AS restaurantId, restaurant.OpenTime, restaurant.CloseTime, restaurant.Address
        FROM fooddescription
        JOIN food on food.id = fooddescription.FoodID
        LEFT JOIN FoodReview on fooddescription.id = foodreview.FoodDesId
        JOIN restaurant on fooddescription.RestaurantID = restaurant.ID
        JOIN image on fooddescription.GroupImageId = image.GroupId
        ${keySearch}
        GROUP BY fooddescription.id, img`
        
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


exports.getReviewList = async (foodId) => {
    query = `SELECT COUNT(reactreview.React) AS reactNumber, GroupImageID AS img, user.Username AS userName, AvatarLink AS avatar, foodreview.id AS reviewId, foodreview.UserID AS userId, UpdatedAt AS updateAt, Rating AS rating, Review AS review
        FROM foodreview
            LEFT JOIN reactreview ON foodreview.ID = reactreview.ReviewID
            LEFT JOIN user ON foodreview.UserID = user.ID
        WHERE FoodDesID = ${foodId}
        GROUP BY(FoodDesID)`

    result = await sql.QueryGetData(query);

    for (review of result) {
        if (review.img) {
            imgQuery = `SELECT src FROM image
                WHERE GroupID = ${review.img}`
            let imgList = await sql.QueryGetData(imgQuery) 
            review.img = imgList.map((x) => x.src)
        }
    }
    
    return result
}

exports.deleteReview = async (foodId, reviewId) => {
    query = `DELETE FROM foodreview
        WHERE FoodDesID = ${foodId}
        AND ID = ${reviewId}`
    await sql.QueryGetData(query);
}

exports.editReview = async (foodId, reviewId, data) => {
    let rating = data.rating? `"${data.rating}"` : `Rating`
    let review = data.review? `"${data.review}"` : `Review`
    let userId = data.userId
    query = `UPDATE foodreview
        set Rating = ${rating}, Review = ${review}
        WHERE FoodDesID = ${foodId}
            AND UserID = ${userId}
            AND ID = ${reviewId}`
    await sql.QueryGetData(query)
}

exports.addReview = async (foodId, data) => {
    let { userId, review, rating } = data

    //  TODO: Sửa lại file sql
    let query = `INSERT INTO foodreview (UserID, FoodDesID, Review, Rating, Status)
    VALUES (${userId}, ${foodId}, "${review}", ${rating}, 1)`
    let result = await sql.QueryGetData(query)
    return result
}