const sql = require("../../seed/queryMysqlDB");

exports.getUserById = async (userId) => {
    queryGetData = `SELECT Username as username,AvatarLink as avatarLink , Email as email,Phone as phone, Address as address, Sex as sex, Point as point
                    FROM user
                    WHERE ID = ${userId}`
    let result = await sql.QueryGetData(queryGetData)
    return result[0]
}

exports.getUserByPhone = async (phone) => {
    queryGetData = `SELECT Id as userId, Username as username, AvatarLink as avatarLink, Point as point
                    FROM user
                    WHERE phone like '%${phone}%'`
    let result = await sql.QueryGetData(queryGetData)
    return result[0]
}