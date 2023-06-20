const sql = require("../../seed/queryMysqlDB");

exports.getRestaurantInforById = async (restaurantId) => {
    queryGetRestaurantInfor = `SELECT Name as name, Province as province , District as district , Ward as ward , DetailedAddress as detailedAddress , OpenTime as openTime , CloseTime as closeTime , \`From\` as 'from' , \`To\` as 'to', Phone as phone, Description as description, Avatar as avatar
                               FROM restaurant 
                               WHERE restaurant.ID = ${restaurantId}`
    queryGetImg = `SELECT src 
                   FROM image
                   JOIN restaurant ON restaurant.GroupImageID = image.GroupID
                   WHERE restaurant.ID = ${restaurantId}`

    let restaurantInfor = await sql.QueryGetData(queryGetRestaurantInfor)
    
    arrImg=[]
    let listImg = await sql.QueryGetData(queryGetImg)
    listImg.map((item)=>{
        arrImg.push(item.src);
    })
    for(resItem of restaurantInfor){
        resItem['img'] = arrImg
    }

    return restaurantInfor[0]
}

exports.getMenu = async (restaurantId) => {
    queryGetMenu = `SELECT food.ID as foodId , food.Name as name ,fooddescription.Price as price 
                    FROM food
                    JOIN fooddescription ON fooddescription.FoodID = food.ID
                    JOIN restaurant ON restaurant.ID = fooddescription.restaurantId
                    WHERE restaurant.ID = ${restaurantId}`

    let listMenu = await sql.QueryGetData(queryGetMenu)

    return listMenu
}

exports.editRestaurantInfor = async (data) => {
    queryEditRestaurantInfor = `UPDATE restaurant
                                SET Name = '${data.name}',
                                    Province = '${data.province}',
                                    District = '${data.district}',
                                    Ward = '${data.ward}',
                                    DetailedAddress = '${data.detailedAddress}',
                                    OpenTime = '${data.openTime}',
                                    CloseTime = '${data.closeTime}',
                                    \`From\` = '${data.from}',
                                    \`To\` = '${data.to}',
                                    Phone = '${data.phone}',
                                    Description = '${data.description}'
                                WHERE ID = ${data.restaurantId}`
    await sql.QueryUpdateData(queryEditRestaurantInfor)
    return
    
}



