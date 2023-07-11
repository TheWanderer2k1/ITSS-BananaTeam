const sql = require("../../seed/queryMysqlDB");
const { param } = require("./route");
const { convertFilePath } = require("../../helpers/readFile")

const getCategoryData = "Select category.ID AS categoryid,category.Name as name ,src AS img from category,image where category.imageId=image.ID";
const getSliderData = `
	SELECT img,ID AS foodDescriptionId
	FROM (
	Select fooddescription.ID ,Name, fooddescription.GroupImageID AS img ,AVG(rating) AS rate 
	from food,fooddescription,foodreview
	where fooddescription.ID=FoodDesID 
		AND fooddescription.FoodID=food.ID   
		GROUP By fooddescription.ID
		ORDER BY rate DESC LIMIT 6
	) AS Query_table`
const getFoodMostLiked = `
	SELECT img, ID AS id, Name as name
	FROM (
	Select fooddescription.ID ,Name, fooddescription.GroupImageID AS img ,AVG(rating) AS rate 
	from food,fooddescription,foodreview
	where fooddescription.ID=FoodDesID 
		AND fooddescription.FoodID=food.ID   
		GROUP By fooddescription.ID
		ORDER BY rate DESC LIMIT 8
	) AS Query_table`
const getRestaurantMostLiked = `
	SELECT r.ID, r.GroupImageID as img, r.Name
	FROM restaurant r
		LEFT JOIN fooddescription fd ON r.ID = fd.RestaurantID
		LEFT JOIN foodreview fr ON fd.ID = fr.FoodDesID
	GROUP BY r.ID
	ORDER BY AVG(fr.Rating) DESC
	LIMIT 8`

/**
* Lay du lieu hien thi trang Home
* @param {{
*	}} 
* @returns {{
* ""data"": {
*      ""food_slider"": [{
*          ""img"": ""abc.jpg"",
*          ""foodDescriptionId"": 15
*      }],
*     ""categories"": [{
*        ""img"": ""abc.jpg"",
*        ""categoryId"": 14
*   }],
*   ""foodDecription"": [{
*      ""id"": 1,
*     ""img"": ""food1.jpg"",
*     ""name"": ""Cơm gà"",
* }],
*""restaurant"": [{
*   ""id"": 2,
*  ""img"": ""restaurant1.jpg"",
* ""name"": ""Kơm ngon""
*}]
*},
*}}
*/
exports.getDataHomePage = async () => {
	var resultSlideData, resultFoodMostLiked, resultCategory, resultRestaurantMostLiked;
	resultSlideData = await sql.QueryGetData(getSliderData)
	for (let item of resultSlideData) {
		imgQuery = `select Src as img from image where GroupID = '${item.img}'`
		a_img = await sql.QueryGetData(imgQuery)
		if (a_img[0]) {
			item.img = convertFilePath(a_img[0]['img'])
		} else {
			item.img = null
		}
	}

	resultCategory = await sql.QueryGetData(getCategoryData)
	for (let item of resultCategory) {
		imgQuery = `select Src as img from image where GroupID = '${item.img}'`
		
		a_img = await sql.QueryGetData(imgQuery)
		if (a_img[0]) {
			item.img = convertFilePath(a_img[0]['img'])
		} else {
			item.img = null
		}
	}

	resultFoodMostLiked = await sql.QueryGetData(getFoodMostLiked)
	for (let item of resultFoodMostLiked) {
		imgQuery = `select Src as img from image where GroupID = '${item.img}'`
		
		a_img = await sql.QueryGetData(imgQuery)
		if (a_img[0]) {
			item.img = convertFilePath(a_img[0]['img'])
		} else {
			item.img = null
		}
	}

	resultRestaurantMostLiked = await sql.QueryGetData(getRestaurantMostLiked)
	for (let item of resultRestaurantMostLiked) {
		imgQuery = `select Src as img from image where GroupID = '${item.img}'`
		
		a_img = await sql.QueryGetData(imgQuery)
		if (a_img[0]) {
			item.img = convertFilePath(a_img[0]['img'])
		} else {
			item.img = null
		}
	}

	return result = {
		food_slider: resultSlideData,
		categories: resultCategory,
		foodDecription: resultFoodMostLiked,
		restaurant: resultRestaurantMostLiked
	}
}