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

exports.getFoodByAddress = async (data) => {
    let result=[];
   
    queryFindRestaurantByAddress = `Select ID as id, Name as name, OpenTime as openTime, CloseTime as closeTime, Province as province, District as district, Ward as ward, DetailedAddress as detailedAddress From Restaurant
                               WHERE Province like  '%${data.province}%' AND District like '%${data.district}%' AND Ward like '%${data.ward}%'`
    arrayRestaurant= await sql.QueryGetData(queryFindRestaurantByAddress)
    
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
