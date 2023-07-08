const sql = require("../../seed/queryMysqlDB");
const { convertFilePath } = require("../../helpers/readFile")

exports.getUserById = async (userId) => {
    queryGetData = `SELECT Username as username,AvatarLink as avatarLink , Email as email,Phone as phone, Address as address, Sex as sex, Point as point
                    FROM user
                    WHERE ID = ${userId}`
    let result = await sql.QueryGetData(queryGetData)
    result[0]['avatarLink'] = convertFilePath(result[0]['avatarLink'])
    return result[0]
}

exports.getUserByPhone = async (phone) => {
    queryGetData = `SELECT Id as userId, Username as username, AvatarLink as avatarLink, Point as point
                    FROM user
                    WHERE phone like '%${phone}%'`
    let result = await sql.QueryGetData(queryGetData)
    result[0]['avatarLink'] = convertFilePath(result[0]['avatarLink'])
    return result[0]
}

exports.updateUserPoint = async (userId, point) => {
    query = `UPDATE user
        SET Point=${point}
        WHERE id=${userId}`
    await sql.QueryGetData(query)
}