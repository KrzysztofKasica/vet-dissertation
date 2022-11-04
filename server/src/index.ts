import "reflect-metadata";
import express from 'express';
import { clientRouter } from "./routers/client";
import { dataSourceConn } from "./app-data-source";
import { User } from "./entities/User";
import { createClient } from 'redis';
import session from "express-session";
import { __prod__ } from "./constants";
import cors from "cors";
import { petRouter } from "./routers/pet";
import { speciesRouter } from "./routers/species";
const bodyParser = require('body-parser');

const main = async () => {
    await dataSourceConn.initialize().then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
    const app = express();
    const RedisStore = require("connect-redis")(session)

    // redis@v4
    const redisClient = createClient({ legacyMode: true })
    redisClient.connect().catch(console.error)
    app.use(
        session({
        name: 'qid',
        store: new RedisStore({ client: redisClient, disableTouch: true,  }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 356 * 10,// 10 years
            httpOnly: true,
            secure: __prod__, // cookie only works in https
            sameSite: 'lax' // csrf
        },
        saveUninitialized: false,
        secret: "wgrgwrgwrgwrgwwr",
        resave: false,
        })
    )
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.get('/adduser', async (_    , res) => {
        // const user = new User();
        // user.email = 'gowno2';
        // user.password = 'gown2o';
        // user.firstName = 'krzys2ztof';
        // user.lastName = 'kasi2ca';
        // await conn.manager.save(user);
        // console.log('user ', user.firstName, ' added');
        console.log('got req')
        res.send("hellso");
    })
    app.get('/test', async (_, res) => {
        const users = await dataSourceConn.manager.find(User);
        res.send(users);
    })
    app.use('/client', clientRouter);
    app.use('/pet', petRouter);
    app.use('/species', speciesRouter);
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    })
}

main().catch((err) => {
    console.error(err);
  });


