const sql = require("../../seed/initMysqlDB");
const query1="Select categoryId,name,src from category,image where category.imageId=image.ID";
const query2="Select ID, Name ,src,AVG(rating) from food,foodDescription,image where food.ID=foodDescription.foodId AND image.groupId=foodDescription.groupImageId ";
sql.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql1 = "SELECT 1 + 1 AS solution";
    sql.query(sql1, function (err, results) {
      if (err) throw err;
      console.log(results[0].solution);
    });
  });

