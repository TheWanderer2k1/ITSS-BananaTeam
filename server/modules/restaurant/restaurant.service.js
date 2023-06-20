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

