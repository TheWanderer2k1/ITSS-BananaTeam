const sql = require("../../seed/queryMysqlDB");

exports.getCategories = async () => {
    queryGetCategories = 'SELECT * FROM Category'

    return await sql.QueryGetData(queryGetCategories)
}