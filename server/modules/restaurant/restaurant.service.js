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
            let imageInsertQuery = `INSERT INTO image (GroupID, Src)
            VALUES (${groupImageId}, '${image.destination}/${image.filename}')`
            await sql.QueryGetData(imageInsertQuery)
        }
    }
}

exports.editRestaurantInfor = async (data) => {
    console.log(data.files.avatar)
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
                                   (data.files.avatar?`, Avatar = '${data.files.avatar[0].destination}/${data.files.avatar[0].filename}'`:'') +
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
                let imageInsertQuery = `INSERT INTO image (GroupID, Src)
                VALUES (${groupImageId}, '${file.destination}/${file.filename}')`
                await sql.QueryGetData(imageInsertQuery) 
            }
        }
        
        console.log(queryEditRestaurantInfor)
    await sql.QueryUpdateData(queryEditRestaurantInfor)
    return
    
}




