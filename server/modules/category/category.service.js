const sql = require("../../seed/queryMysqlDB");

exports.getCategories = async () => {
    queryGetCategories = 'SELECT * FROM category'

    return await sql.QueryGetData(queryGetCategories)
}