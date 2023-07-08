const sql = require("../../seed/queryMysqlDB");

exports.getCategories = async () => {
    queryGetCategories = 'SELECT * FROM category'
    
    return (await sql.QueryGetData(queryGetCategories)).map(item => {
       item.id = item.ID 
       item.name = item.Name
       item.description = item.Description
       delete item.ID 
       delete item.Name 
       delete item.Description
       delete item.ImageId
       return item
    })
}