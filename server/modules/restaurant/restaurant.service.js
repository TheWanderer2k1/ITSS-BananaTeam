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
    queryGetMenu = `SELECT fooddescription.ID as foodID , food.Name as name, price, AVG(rating) AS rating
    FROM fooddescription
    JOIN food on food.id = fooddescription.FoodID
    LEFT JOIN foodreview on fooddescription.id = foodreview.FoodDesId
    JOIN restaurant on fooddescription.RestaurantID = restaurant.ID
    JOIN category ON category.ID = food.CategoryId
    WHERE restaurant.id = ${restaurantId}
    GROUP BY fooddescription.id`

    let listFood = await sql.QueryGetData(queryGetMenu)
    for(foodItem of listFood) {
        queryGetImg = `SELECT src 
                       FROM image
                       JOIN fooddescription ON image.GroupID = fooddescription.GroupImageId 
                       WHERE fooddescription.ID = ${foodItem.foodID}`

        listImg = await sql.QueryGetData(queryGetImg)
       
        arrImg = []
        listImg.map((item)=>{
            arrImg.push(item.src)
        })
        foodItem['img'] = arrImg
    }
    return listFood
}

exports.addFood = async (restaurantId, name, categoryId, description, price, images=null) => {
    let query = `SELECT Name, ID FROM food
        WHERE NAME = '${name}'`
    let currentFood = await sql.QueryGetData(query)
    if (currentFood.length == 0) {
        insertQuery = `INSERT INTO food (Name, CategoryId)
        VALUES ('${name}', ${categoryId})`
        await sql.QueryGetData(insertQuery)
        currentFood = await sql.QueryGetData(query)
    }

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

    let foodDesQuery = `INSERT INTO fooddescription (FoodID, RestaurantID, Description, GroupImageID, Price, Status)
        VALUES (${currentFood[0].ID}, ${restaurantId}, '${description}', ${groupImageId}, ${price}, 1)`
    await sql.QueryGetData(foodDesQuery)

    if (images) {
        for (let image of images) {
            let filePath = `${image.destination}/${image.filename}`.substring(1)
            let imageInsertQuery = `INSERT INTO image (GroupID, Src)
            VALUES (${groupImageId}, '${filePath}')`
            await sql.QueryGetData(imageInsertQuery)
        }
    }
}

exports.editRestaurantInfor = async (data) => {

    let filePath = `${data.files.avatar[0].destination}/${data.files.avatar[0].filename}`.substring(1)
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
                                    Description = '${data.description}'`+
                                   (data.files.avatar?`, Avatar = '${filePath}'`:'') +
                                ` WHERE ID = ${data.restaurantId} `
    

    getGroupImageId = `SELECT GroupImageID AS id
                      FROM restaurant
                      WHERE restaurant.ID = ${data.restaurantId}`
    groupImageIdObj = await sql.QueryGetData(getGroupImageId)
    groupImageId = groupImageIdObj[0].id
    
        queryDelete = `DELETE image
                       FROM image
                       WHERE GroupID = ${groupImageId}`
        if(data.files.img){
            await sql.QueryUpdateData(queryDelete)
            for(let file of data.files.img){
                let filePath = `${file.destination}/${file.filename}`.substring(1)
                let imageInsertQuery = `INSERT INTO image (GroupID, Src)
                VALUES (${groupImageId}, '${filePath}')`
                await sql.QueryGetData(imageInsertQuery) 
            }
        }
        
        console.log(queryEditRestaurantInfor)
    await sql.QueryUpdateData(queryEditRestaurantInfor)
    return
    
}




