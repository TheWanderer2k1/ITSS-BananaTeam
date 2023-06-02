const sql = require("../../seed/initMysqlDB");
const getCategoryData="Select categoryId,name,src from category,image where category.imageId=image.ID";
const getSliderData="select ID,Src FROM (Select foodDesciption.ID ,Name,Src ,AVG(rating) AS rate from food,foodDesciption,foodreview,image where foodDesciption.ID=FoodDesID AND foodDesciption.FoodID=food.ID   AND image.GroupID=fooddesciption.GroupImageID GROUP By foodDesciption.FoodID,RestaurantID ORDER BY rate DESC limit 6) AS Query_table";
const getFoodMostLiked="select ID,Src,Name FROM (Select foodDesciption.ID ,Name,Src ,AVG(rating) AS rate from food,foodDesciption,foodreview,image where foodDesciption.ID=FoodDesID AND foodDesciption.FoodID=food.ID   AND image.GroupID=fooddesciption.GroupImageID GROUP By foodDesciption.FoodID,RestaurantID ORDER BY rate DESC limit 6) AS Query_table";
const getRestaurantMostLiked="Select RestaurantID,Name,Src FROM (Select RestaurantID,FoodID,rate from ( Select foodDesciption.ID,RestaurantID,foodDesciption.FoodID ,Name,Src ,AVG(rating) AS rate from food,foodDesciption,foodreview,image where foodDesciption.ID=FoodDesID AND foodDesciption.FoodID=food.ID   AND image.GroupID=fooddesciption.GroupImageID GROUP By foodDesciption.FoodID,RestaurantID ) As t1"+
"where (SELECT COUNT(*) FROM ( Select foodDesciption.ID,RestaurantID,foodDesciption.FoodID ,Name,Src ,AVG(rating) AS rate from food,foodDesciption,foodreview,image where foodDesciption.ID=FoodDesID AND foodDesciption.FoodID=food.ID   AND image.GroupID=fooddesciption.GroupImageID GROUP By foodDesciption.FoodID,RestaurantID ) As t2 WHERE t1.RestaurantID=t2.RestaurantID AND t2.rate>=t1.rate ) <=3 ORDER BY t1.RestaurantID,t1.rate DESC) As t3 , restaurant,image where t3.RestaurantID=restaurant.ID AND restaurant.GroupImageID=image.GroupID GROUP BY t3.RestaurantID order by AVG(t3.rate) desc limit 6";
exports.getDataHomePage=async()=>{
  var resultSlideData,resultFoodMostLiked,resultCategory,resultRestaurantMostLiked;
sql.QueryGetData(getSliderData)
  .then(data => {
    resultSlideData=data
  })
  .catch(error => {
    console.error(error);
    // Handle the error here
  });


  sql.QueryGetData(getCategoryData)
  .then(data => {
    resultCategory=data;
  })
  .catch(error => {
    console.error(error);
    // Handle the error here
  });

  sql.QueryGetData(getFoodMostLiked)
  .then(data => {
    resultFoodMostLiked=data;
  })
  .catch(error => {
    console.error(error);
    // Handle the error here
  });

  sql.QueryGetData(getRestaurantMostLiked)
  .then(data => {
    //console.log(data);
    resultRestaurantMostLiked=data
  })
  .catch(error => {
    console.error(error);
    
  });
   return result ={
    food_slider:resultSlideData,
    categories:resultCategory,
    foodDecription:resultFoodMostLiked,
    restaurant:resultRestaurantMostLiked
   }
}