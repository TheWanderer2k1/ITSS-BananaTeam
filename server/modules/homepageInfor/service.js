const sql = require("../../seed/queryMysqlDB");
const { param } = require("./route");
const getCategoryData="Select category.ID AS categoryid,src AS img from category,image where category.imageId=image.ID";
const getSliderData="select Src As img,ID AS foodDescriptionId FROM (Select foodDescription.ID ,Name,Src ,AVG(rating) AS rate from food,foodDescription,foodreview,image where foodDescription.ID=FoodDesID AND foodDescription.FoodID=food.ID   AND image.GroupID=foodDescription.GroupImageID GROUP By foodDescription.FoodID,RestaurantID ORDER BY rate DESC limit 6) AS Query_table";
const getFoodMostLiked="select ID AS id,Src AS img ,Name  AS name FROM (Select foodDescription.ID ,Name,Src ,AVG(rating) AS rate from food,foodDescription,foodreview,image where foodDescription.ID=FoodDesID AND foodDescription.FoodID=food.ID   AND image.GroupID=foodDescription.GroupImageID GROUP By foodDescription.FoodID,RestaurantID ORDER BY rate DESC limit 6) AS Query_table";
const getRestaurantMostLiked="Select RestaurantID AS id,Src AS img,Name AS name FROM (Select RestaurantID,FoodID,rate from ( Select foodDescription.ID,RestaurantID,foodDescription.FoodID ,Name,Src ,AVG(rating) AS rate from food,foodDescription,foodreview,image where foodDescription.ID=FoodDesID AND foodDescription.FoodID=food.ID   AND image.GroupID=foodDescription.GroupImageID GROUP By foodDescription.FoodID,RestaurantID ) As t1 "+
"where (SELECT COUNT(*) FROM ( Select foodDescription.ID,RestaurantID,foodDescription.FoodID ,Name,Src ,AVG(rating) AS rate from food,foodDescription,foodreview,image where foodDescription.ID=FoodDesID AND foodDescription.FoodID=food.ID   AND image.GroupID=foodDescription.GroupImageID GROUP By foodDescription.FoodID,RestaurantID ) As t2 WHERE t1.RestaurantID=t2.RestaurantID AND t2.rate>=t1.rate ) <=3 ORDER BY t1.RestaurantID,t1.rate DESC) As t3 , restaurant,image where t3.RestaurantID=restaurant.ID AND restaurant.GroupImageID=image.GroupID GROUP BY t3.RestaurantID order by AVG(t3.rate) desc limit 6";

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
exports.getDataHomePage=async()=>{
  var resultSlideData,resultFoodMostLiked,resultCategory,resultRestaurantMostLiked;
  resultSlideData= await sql.QueryGetData(getSliderData)
 
  resultCategory=await sql.QueryGetData(getCategoryData) 

  resultFoodMostLiked=await sql.QueryGetData(getFoodMostLiked)
  
  resultRestaurantMostLiked=await sql.QueryGetData(getRestaurantMostLiked)
  
   return result ={
    food_slider:resultSlideData,
    categories:resultCategory,
    foodDecription:resultFoodMostLiked,
    restaurant:resultRestaurantMostLiked
   }
}