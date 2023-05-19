const express = require('express');
const mongoose = require('mongoose');
const client = require('./singletonClient/redisClient').getRedisClient();
const session = require('express-session');
const cors = require('cors');
const RedisStore = require('connect-redis').default;
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET } = require('./config/config');

const cityRouter = require("./routes/cityRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB...");
        })
        .catch(err => {
            console.log(err);
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

app.enable('trust proxy');
app.use(cors({}));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: client }),
    
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60000,
    }
}));

app.get("/api/v1", (req, res) => {
    res.send("<h2>Anarik komarik</h2>");
    console.log("it works");
});

app.use(express.json());
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/users", userRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});