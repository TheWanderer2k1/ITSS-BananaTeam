const sql = require("../../seed/queryMysqlDB");
const { param } = require("./route");
const { convertFilePath } = require("../../helpers/readFile")

const getCategoryData = "Select category.ID AS categoryid,category.Name as name ,src AS img from category,image where category.imageId=image.ID";
const getSliderData = `
	SELECT Src As img,ID AS foodDescriptionId 
  	FROM (
    	Select fooddescription.ID ,Name,Src ,AVG(rating) AS rate 
    	from food,fooddescription,foodreview,image 
    	where fooddescription.ID=FoodDesID 
        	AND fooddescription.FoodID=food.ID   
        	AND image.GroupID=fooddescription.GroupImageID 
      	GROUP By fooddescription.ID, src
      	ORDER BY rate DESC LIMIT 6
  	) AS Query_table`
const getFoodMostLiked = `
	select ID AS id,Src AS img ,Name  AS name 
	FROM (
		Select fooddescription.ID ,Name,Src ,AVG(rating) AS rate 
		from food,fooddescription,foodreview,image 
		where fooddescription.ID=FoodDesID 
			AND fooddescription.FoodID=food.ID   
			AND image.GroupID=fooddescription.GroupImageID 
		GROUP By fooddescription.ID, Src
		ORDER BY rate DESC LIMIT 8
	) AS Query_table`
const getRestaurantMostLiked = `
	SELECT RestaurantID AS id, Avatar AS img,Name AS name 
	FROM (
		Select RestaurantID,FoodID,rate 
		FROM (
			SELECT fooddescription.ID,RestaurantID,fooddescription.FoodID ,Name,Src ,AVG(rating) AS rate 
			from food,fooddescription,foodreview,image 
			where fooddescription.ID=FoodDesID 
				AND fooddescription.FoodID=food.ID
				AND image.GroupID=fooddescription.GroupImageID 
			GROUP By fooddescription.ID, Src 
		) AS t1
		WHERE (
			SELECT COUNT(*) 
			FROM ( 
				Select fooddescription.ID,RestaurantID,fooddescription.FoodID ,Name,Src ,AVG(rating) AS rate 
				FROM food,fooddescription,foodreview,image 
				where fooddescription.ID=FoodDesID 
					AND fooddescription.FoodID=food.ID
					AND image.GroupID=fooddescription.GroupImageID 
				GROUP By fooddescription.ID, Src
			) AS t2 
			WHERE t1.RestaurantID=t2.RestaurantID 
				AND t2.rate>=t1.rate ) <=3 
			ORDER BY t1.RestaurantID,t1.rate DESC
		) As t3 , restaurant,image 
	where t3.RestaurantID=restaurant.ID 
		AND restaurant.GroupImageID=image.GroupID 
	GROUP BY t3.RestaurantID, Src
	order by AVG(t3.rate) desc limit 8`

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
	resultSlideData = (await sql.QueryGetData(getSliderData)).map(item=>{
		item.img = convertFilePath(item.img)
		return item
	})

	resultCategory = (await sql.QueryGetData(getCategoryData)).map(item=>{
		item.img = convertFilePath(item.img)
		return item
	})

	resultFoodMostLiked = (await sql.QueryGetData(getFoodMostLiked)).map(item=>{
		item.img = convertFilePath(item.img)
		return item
	})

	resultRestaurantMostLiked = (await sql.QueryGetData(getRestaurantMostLiked)).map(item=>{
		item.img = convertFilePath(item.img)
		return item
	})

	return result = {
		food_slider: resultSlideData,
		categories: resultCategory,
		foodDecription: resultFoodMostLiked,
		restaurant: resultRestaurantMostLiked
	}
}