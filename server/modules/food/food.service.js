const sql = require("../../seed/queryMysqlDB");
const { convertFilePath } = require("../../helpers/readFile")

exports.getFoodDescriptionList = async (keyword) => {
    let keySearch = ''
    if (keyword) keySearch = `WHERE food.name like '%${keyword}%'`

    query = `SELECT CategoryId, c.Name AS categoryName, c.Description AS categoryDes, fooddescription.id, image.Src as img, AVG(rating) AS rating, food.name, price, fooddescription.Description as description, restaurant.name as restaurantName, restaurant.id AS restaurantId, restaurant.OpenTime, restaurant.CloseTime, restaurant.Province, District, Ward, DetailedAddress
        FROM fooddescription
            JOIN food on food.id = fooddescription.FoodID
            LEFT JOIN foodreview on fooddescription.id = foodreview.FoodDesId
            JOIN restaurant on fooddescription.RestaurantID = restaurant.ID
            JOIN image on fooddescription.GroupImageId = image.GroupId
            LEFT JOIN category c ON food.CategoryId = c.ID
        ${keySearch}
        GROUP BY fooddescription.id, img;`
        
    result = await sql.QueryGetData(query)
    for (food of result) {
        food['restaurant'] = {
            'id': food['restaurantId'],
            'name': food['restaurantName'],
            'openTime': food['OpenTime'],
            'closeTime': food['CloseTime'],
            'province': food['Province'],
            'district': food['District'],
            'ward': food['Ward'],
            'detailedAdress': food['DetailedAddress']
        }
        food.img = convertFilePath(food.img)
        food['category'] = {
            'id': food['CategoryId'],
            'name': food['categoryName'],
            'description': food['categoryDes']
        }
        delete food['restaurantId']
        delete food['restaurantName']
        delete food['OpenTime']
        delete food['CloseTime']
        delete food['Province']
        delete food['District']
        delete food['Ward']
        delete food['DetailedAddress']
        delete food['CategoryId']
        delete food['categoryName']
        delete food['categoryDes']
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
            review.img = imgList.map((x) => convertFilePath(x.src))
              
        }
        likedQuery = `SELECT UserID FROM reactreview
                        WHERE ReviewID = ${review['reviewId']}`
        let likedList = await sql.QueryGetData(likedQuery)
        review.liked = likedList.map((x) => x.UserID)
    }
    
    return result
}

exports.deleteReview = async (foodId, reviewId, userId) => {
    deleteReact = `DELETE FROM reactreview
                   WHERE ReviewId =${reviewId}
                   AND UserId =${userId}`
    await sql.QueryGetData(deleteReact)
    query = `DELETE FROM foodreview
        WHERE FoodDesID = ${foodId}
        AND ID = ${reviewId}
        AND UserID = ${userId}`
    await sql.QueryGetData(query);
}

exports.editReview = async (foodId, reviewId, data,files) => {
    let rating = data.rating? `"${data.rating}"` : `Rating`
    let review = data.review? `"${data.review}"` : `Review`
    let userId = data.userId
    let group_image_query = ``

    if (files) {
        let groupImageId
        do {
            
            let randNum = Math.floor(Math.random() * 10000000)
            let queryGroupImg = `SELECT src FROM image
                WHERE GroupID = ${randNum}`
            let result = await sql.QueryGetData(queryGroupImg)
            if (result.length == 0) {
                groupImageId = randNum
                break;
            }
        } while (true)
        
        group_image_query = `, GroupImageId = ${groupImageId}`

        for (let image of files) {
            let filePath = `${image.destination}/${image.filename}`.substring(1)
            let imageInsertQuery = `INSERT INTO image (GroupID, Src)
            VALUES (${groupImageId}, '${filePath}')`
            await sql.QueryGetData(imageInsertQuery)
        }
    }

    query = `UPDATE foodreview
        set Rating = ${rating}, Review = '${review}' ${group_image_query}
        WHERE FoodDesID = ${foodId}
            AND UserID = ${userId}
            AND ID = ${reviewId}`

    await sql.QueryGetData(query)
}

exports.addReview = async (foodId,data,files) => {
    let { userId , review , rating } = data

    let groupImageId
    do {
        
        let randNum = Math.floor(Math.random() * 10000000)
        let queryGroupImg = `SELECT src FROM image
            WHERE GroupID = ${randNum}`
        let result = await sql.QueryGetData(queryGroupImg)
        if (result.length == 0) {
            groupImageId = randNum
            break;
        }
    }while (true)
    

    let query = `INSERT INTO foodreview (UserID, FoodDesID, Review, Rating, Status,GroupImageId)
    VALUES (${userId}, ${foodId}, "${review}", ${rating}, 1,${groupImageId})`
    let result = await sql.QueryUpdateData(query)
  
    
    if (files) {
        if(files.length>1){
            let queryUpdatePoint = `UPDATE user set Point = Point+100 WHERE ID = ${userId}`
            await sql.QueryUpdateData(queryUpdatePoint)
        }
        for (let image of files) {
            let filePath = `${image.destination}/${image.filename}`.substring(1)
            let imageInsertQuery = `INSERT INTO image (GroupID, Src)
            VALUES (${groupImageId}, '${filePath}')`
            await sql.QueryGetData(imageInsertQuery)
        }
    }
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
    queryFindRestaurantByAddress = `Select ID as id, Name as name, OpenTime as openTime, CloseTime as closeTime, Province as province, District as district, Ward as ward, DetailedAddress as detailedAddress From restaurant`
    condition1=`Province like  '%${data.province}%'`
    condition2= `District like '%${data.district}%'`
    condition3= `Ward like '%${data.ward}%'`
    whereCondition=(data.province?condition1:'1=1')+' AND '+(data.district?condition2:'1=1')+' AND '+(data.ward?condition3:'1=1')
    if(whereCondition!='')
    queryFindRestaurantByAddress=queryFindRestaurantByAddress+' Where '+ whereCondition
    arrayRestaurant = await sql.QueryGetData(queryFindRestaurantByAddress)
    
    for(restaurant of arrayRestaurant){
        queryFindFoodByRestaurant =  `SELECT fooddescription.ID as id, food.Name as name, image.Src as img, price, AVG(rating) AS rating, fooddescription.Description as description, category.Id as categoryId , category.Name as categoryName, category.Description as categoryDescription
        FROM fooddescription
        JOIN food on food.ID = fooddescription.FoodID
        LEFT JOIN foodreview on fooddescription.id = foodreview.FoodDesId
        JOIN image on fooddescription.GroupImageId = image.GroupId
        JOIN category on food.CategoryId = category.ID
        WHERE fooddescription.RestaurantID = ${restaurant.id}
        GROUP BY fooddescription.ID, img`                
        food=await sql.QueryGetData(queryFindFoodByRestaurant);
        food.map((foodItem)=>{
            category = {
                id:foodItem.categoryId,
                name:foodItem.categoryName,
                description:foodItem.categoryDescription
            }
            foodItem.img = convertFilePath(foodItem.img)
            delete foodItem.categoryId
            delete foodItem.categoryName
            delete foodItem.categoryDescription
            foodItem.category = category
            foodItem.restaurant = restaurant
            return foodItem

        })
    }

    return food;

}
exports.getFoodInforById = async (foodDesId) => {
    queryGetFoodInforById = `SELECT fooddescription.ID as id , food.Name as name, price,  AVG(rating) AS rating, fooddescription.Description as description, category.ID as categoryId, category.Name as categoryName, category.Description as categoryDescription, restaurant.Id as restaurantId, restaurant.Avatar AS avatarImg
    FROM fooddescription
    JOIN food on food.id = fooddescription.FoodID
    LEFT JOIN foodreview on fooddescription.id = foodreview.FoodDesId
    JOIN restaurant on fooddescription.RestaurantID = restaurant.ID
    JOIN category ON category.ID = food.CategoryId
    WHERE fooddescription.id = ${foodDesId}
    GROUP BY fooddescription.id`

    listFood = await sql.QueryGetData(queryGetFoodInforById)
    for(foodItem of listFood) {
        foodItem['category'] = {
            id:foodItem.categoryId,
            name:foodItem.categoryName,
            description:foodItem.categoryDescription
        }

        foodItem['restaurant'] = {
            id:foodItem.restaurantId,
            avatarImg:convertFilePath(foodItem.avatarImg)
        }
        
        queryGetImg = `SELECT src 
                       FROM image
                       JOIN fooddescription ON image.GroupID = fooddescription.GroupImageId 
                       WHERE fooddescription.ID = ${foodItem.id}`

        listImg = await sql.QueryGetData(queryGetImg)
        arrImg = []
        listImg.map((item)=>{
            item.src = convertFilePath(item.src)
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

    return listFood[0]
    
}

exports.updateFoodInfor = async (data,files) => {
    updateFoodInforQuery = `UPDATE fooddescription
                            JOIN food on  fooddescription.foodId = food.ID
                           `
    
    setCondition = (data.name?` food.Name = '${data.name}', `:'')
                  +(data.categoryId?`food.CategoryId = ${data.categoryId}, `:'')
                  +(data.description?` fooddescription.Description = '${data.description}', `:'')
                  +(data.price?` fooddescription.Price = ${data.price}`:'')
    rowEfect = 0;
    whereCondition = ` WHERE fooddescription.ID = ${data.foodId} `
    if(setCondition!=''){
        updateFoodInforQuery+=' SET ' + setCondition + whereCondition
        rowEfect = await sql.QueryUpdateData(updateFoodInforQuery);
    }
    if(files.length>0){
        getGroupImageId = `SELECT GroupImageID from fooddescription WHERE fooddescription.ID = ${data.foodId}`
        groupImageId = await sql.QueryGetData(getGroupImageId)
       
        deleteQuery = `DELETE from image WHERE GroupID = ${groupImageId[0].GroupImageID}`

        await sql.QueryUpdateData(deleteQuery)

        for (let image of files) {
            let filePath = `${image.destination}/${image.filename}`.substring(1)
            let imageInsertQuery = `INSERT INTO image (GroupID, Src)
            VALUES (${groupImageId[0].GroupImageID}, '${filePath}')`
            await sql.QueryGetData(imageInsertQuery)
        } 
    }
    
    return rowEfect;
}

exports.deleteFoodInfor = async (foodId) => {
    queryDelteFoodInfor = `DELETE FROM fooddescription WHERE ID = ${foodId}`

    await sql.QueryUpdateData(queryDelteFoodInfor);
    
    return;
    
}
