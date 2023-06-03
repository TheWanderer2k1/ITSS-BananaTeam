const mongoose = require("mongoose");
const { initModels, connect, autoRun, backup } = require("./helpers/dbHelper");
const models = require("./models");
const { Configuration } = models;
const CronJob = require("cron").CronJob;

module.exports = async (server) => {
    // Socket.io realtime
    global.CONNECTED_CLIENTS = [];

    /**
    * docs setup socket:
    * setup server (từ v3 trở lên phải setup cors): https://socket.io/docs/v4/server-initialization/
    * setup client: https://socket.io/docs/v4/client-initialization/
    */
    global.SOCKET_IO = require("socket.io")(server, {
        cors: {
            origin: [
                "http://localhost:3000",
            ],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    SOCKET_IO.on("connection", function (socket) {
        CONNECTED_CLIENTS.push({
            socketId: socket.id,
            userId: socket.handshake.query.userId,
        });

        socket.on("disconnect", function () {
            CONNECTED_CLIENTS = CONNECTED_CLIENTS.filter(
                (client) => client.socketId !== socket.id
            );
        });

        console.log("User connected: ", CONNECTED_CLIENTS);
    });


    let path = require("path");
    global.SERVER_DIR = __dirname;
    global.SERVER_BACKUP_DIR = path.resolve(__dirname, "..", "backup");
    global.SERVER_MODELS_DIR = SERVER_DIR + "/models";
    global.SERVER_MODULES_DIR = SERVER_DIR + "/modules";
    global.SERVER_HELPERS_DIR = SERVER_DIR + "/helpers";
    global.SERVER_MIDDLEWARE_DIR = SERVER_DIR + "/middleware";
    global.SERVER_SEED_DIR = SERVER_DIR + "/seed";
    global.SERVER_LOGS_DIR = SERVER_DIR + "/logs";


    let connectOptions = process.env.DB_AUTHENTICATION === 'true' ?
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            auth: {
                authSource: 'admin'
            }
        } : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

    global.DB_CONNECTION = mongoose.createConnection(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || "27017"}/${process.env.DB_NAME}`,
        connectOptions
    );
    initModels(DB_CONNECTION, models);

    // Init backup for many company
    const backupMongo = await Configuration(
        connect(DB_CONNECTION, process.env.DB_NAME)
    ).find();
    global.BACKUP = {};
    for (let i = 0; i < backupMongo.length; i++) {
        let { time } = backupMongo[i].backup;
        let timeConfig = `${time.second} ${time.minute} ${time.hour} ${time.date} ${time.month} ${time.day}`;
        BACKUP[backupMongo[i].name] = {
            auto: backupMongo[i].backup.auto,
            limit: backupMongo[i].backup.limit,
            time: backupMongo[i].backup.time,
            job: new CronJob({
                cronTime: timeConfig,
                onTick: () =>
                    backup({
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        db:
                            backupMongo[i].name !== "all"
                                ? backupMongo[i].name
                                : undefined,
                    }),
                timezone: "Asia/Ho_Chi_Minh",
            }),
        };
    }
    for (const [db] of Object.entries(BACKUP)) {
        if (BACKUP[db].auto) BACKUP[db].job.start();
    }

    global.PORTAL = process.env.DB_NAME; // tên db cần kết nối
};
