// NODE_MODULES
let path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const server = require("http").createServer(app);

const { auth } = require(`./middleware`);
require("dotenv").config();
// require("./connectDatabase");
require("./global")(server);

app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());


// Route upload
app.use("/upload/avatars", express.static("upload/avatars"));
app.use("/upload/template-imports", express.static("upload/template-imports"));

app.use("/upload/user-guide/task", express.static("upload/user-guide/task"));
app.use("/upload/user-guide/kpi", express.static("upload/user-guide/kpi"));
app.use("/upload/user-guide/hr", express.static("upload/user-guide/hr"));
app.use("/upload/user-guide/system", express.static("upload/user-guide/system"));
app.use("/upload/user-guide/document", express.static("upload/user-guide/document"));
app.use("/upload/user-guide/asset", express.static("upload/user-guide/asset"));
app.use("/upload/user-guide/bill", express.static("upload/user-guide/bill"));

app.use("/upload/img-resource/foods", express.static("upload/img-resource/foods"));            //food img
app.use("/upload/img-resource/categories", express.static("upload/img-resource/categories"));  //category img
app.use("/upload/img-resource/favicon", express.static("upload/img-resource/favicon"));

const router = express.Router();

router.use("/auth", require("./modules/auth/auth.route"));


router.use("/configuration", require("./modules/super-admin/module-configuration/moduleConfiguration.route"));



router.use("/user", require("./modules/super-admin/user/user.route"));
router.use("/role", require("./modules/super-admin/role/role.route"));
router.use("/component", require("./modules/super-admin/component/component.route"));
router.use("/link", require("./modules/super-admin/link/link.route"));
router.use("/api", require("./modules/super-admin/api/api.route"));
router.use("/organizational-units", require("./modules/super-admin/organizational-unit/organizationalUnit.route"));
router.use("/api/v1", require("./modules/homepageInfor/route"));
router.use("/api/v1", require("./modules/food/food.route"));
router.use("/api/v1", require("./modules/review/review.route"));
router.use("/api/v1", require("./modules/restaurant/restaurant.route"));
router.use("/api/v1", require("./modules/category/category.route"));


router.use("/examples", require("./modules/example/example.route"));



app.use("/news-feed", require("./modules/news-feed/newsFeed.route"));

app.use(router);

/**
 * Server initial
 */
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server up and running on: ${port} !`)
});
