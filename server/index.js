// NODE_MODULES
let path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").createServer(app);

require("dotenv").config();

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());


// Route upload
app.use("/upload/avatars", express.static("upload/avatars"));
app.use("/upload/template-imports", express.static("upload/template-imports"));

app.use("/upload/img-resource/foods", express.static("upload/img-resource/foods"));            //food img
app.use("/upload/img-resource/categories", express.static("upload/img-resource/categories"));  //category img
app.use("/upload/img-resource/favicon", express.static("upload/img-resource/favicon"));        //favicon img
app.use("/upload/review/food", express.static("upload/review/food"));                           //review img

app.use("/upload/restaurant/avatar", express.static("upload/restaurant/avatar"));
app.use("/upload/restaurant/food", express.static("upload/restaurant/food"));
app.use("/upload/restaurant/image", express.static("upload/restaurant/image"));
app.use("/upload/human-resource/avatars", express.static("upload/human-resource/avatars"));

const router = express.Router();

router.use("/api/v1", require("./modules/homepageInfor/route"));
router.use("/api/v1", require("./modules/food/food.route"));
router.use("/api/v1", require("./modules/restaurant/restaurant.route"));
router.use("/api/v1", require("./modules/category/category.route"));
router.use("/api/v1", require("./modules/user/user.route"));

app.use(router);

/**
 * Server initial
 */
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server up and running on: ${port} !`)
});
