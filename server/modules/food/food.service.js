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
        GROUP BY(foodreview.ID)`

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

exports.reactReview = async (foodId, reviewId, userId, reactType) => {
    let query = `INSERT INTO reactreview (UserID, ReviewID, React)
        VALUES (${userId}, ${reviewId}, ${reactType});`
    await sql.QueryGetData(query)
}

exports.unreactReview = async (foodId, reviewId, userId) => {
    let query = `DELETE FROM reactreview
        WHERE UserID = ${userId}
            AND ReviewID = ${reviewId}`
    await sql.QueryGetData(query)
}


exports.getFoodByAddress = async (data) => {
    let result=[];
   
    queryFindRestaurantByAddress = `Select ID as id, Name as name, OpenTime as openTime, CloseTime as closeTime, Province as province, District as district, Ward as ward, DetailedAddress as detailedAddress From Restaurant`
    condition1=`Province like  '%${data.province}%'`
    condition2= `District like '%${data.district}%'`
    condition3= `Ward like '%${data.ward}%'`
    whereCondition=(data.province?condition1:'1=1')+' AND '+(data.district?condition2:'1=1')+' AND '+(data.ward?condition3:'1=1')
    if(whereCondition!='')
    queryFindRestaurantByAddress=queryFindRestaurantByAddress+' Where '+ whereCondition
    arrayRestaurant = await sql.QueryGetData(queryFindRestaurantByAddress)
    
    for(restaurant of arrayRestaurant){
        queryFindFoodByRestaurant =  `SELECT food.ID as id, food.Name as name, image.Src as img, price, AVG(rating) AS rating, fooddescription.Description as description, Category.Id as categoryId , Category.Name as categoryName, Category.Description as categoryDescription
        FROM fooddescription
        JOIN food on food.ID = fooddescription.FoodID
        LEFT JOIN FoodReview on fooddescription.id = foodreview.FoodDesId
        JOIN image on fooddescription.GroupImageId = image.GroupId
        JOIN Category on food.CategoryId = Category.ID
        WHERE fooddescription.RestaurantID = ${restaurant.id}
        GROUP BY fooddescription.ID, img`                
        food=await sql.QueryGetData(queryFindFoodByRestaurant);
        foodTrans=food.map((foodItem)=>{
            category={
                id:foodItem.categoryId,
                name:foodItem.categoryName,
                description:foodItem.categoryDescription
            }
            delete foodItem.categoryId
            delete foodItem.categoryName
            delete foodItem.categoryDescription
            foodItem.category = category;
            return foodItem;

        })
        result.push({
            food:foodTrans,
            restaurant:restaurant
        })
    }

    return result;

}
exports.getFoodInforById = async (foodDesId) => {
    queryGetFoodInforById = `SELECT fooddescription.ID as id , food.Name as name, price,  AVG(rating) AS rating, fooddescription.Description as description, Category.ID as categoryId, Category.Name as name, Category.Description as categoryDescription, restaurant.Id as restaurantId, restaurant.Avatar AS avatarImg
    FROM fooddescription
    JOIN food on food.id = fooddescription.FoodID
    LEFT JOIN FoodReview on fooddescription.id = foodreview.FoodDesId
    JOIN restaurant on fooddescription.RestaurantID = restaurant.ID
    JOIN Category ON Category.ID = food.CategoryId
    WHERE fooddescription.id = ${foodDesId}
    GROUP BY fooddescription.id`

    listFood = await sql.QueryGetData(queryGetFoodInforById)
    console.log(listFood)
    for(foodItem of listFood) {
        foodItem['category'] = {
            id:foodItem.categoryId,
            name:foodItem.categoryName,
            description:foodItem.categoryDescription
        }

        foodItem['restaurant'] = {
            id:foodItem.restaurantId,
            avatarImg:foodItem.avatarImg
        }
        
        queryGetImg = `SELECT src 
                       FROM image
                       JOIN fooddescription ON image.GroupID = fooddescription.GroupImageId 
                       WHERE fooddescription.ID = ${foodItem.id}`

        listImg = await sql.QueryGetData(queryGetImg)
        arrImg = []
        listImg.map((item)=>{
            arrImg.push(item.src)
        })
        foodItem['img'] = arrImg
        delete foodItem.categoryId
        delete foodItem.categoryName
        delete foodItem.categoryDescription
        delete foodItem.restaurantId
        delete foodItem.avatarImg
        delete foodItem.id
    }

    return listFood
    
}

exports.updateFoodInfor = async (data) => {
    updateFoodInforQuery = `UPDATE fooddescription
                            JOIN food on  fooddescription.foodId = food.ID
                           `

    setCondition = (data.name?` food.Name = '${data.name}', `:'')
                  +(data.categoryId?` food.CategoryId = ${data.categoryId}, `:'')
                  +(data.description?` fooddescription.Description = '${data.description}', `:'')
                  +(data.price?` fooddescription.Price = ${data.price}`:'')
    rowEfect = 0;
    whereCondition = ` WHERE food.ID = ${data.foodId} `
    if(setCondition!=''){
        updateFoodInforQuery+=' SET ' + setCondition + whereCondition
        rowEfect = await sql.QueryUpdateData(updateFoodInforQuery);
    }
    
    return rowEfect;
}

exports.deleteFoodInfor = async (foodId) => {
    console.log(foodId)
    queryDelteFoodInfor = `DELETE FROM food WHERE ID = ${foodId}`

    await sql.QueryUpdateData(queryDelteFoodInfor);
   
    return;
    
}
