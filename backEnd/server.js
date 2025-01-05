import express, { json } from 'express';
import DATABASE from './utilities/createDb.js';
import TABLES from './utilities/createTables.js';
import usersRoute from './routes/user.js';
import cors from 'cors';
import bodyParser from 'body-parser';

class RAKSHA {

    constructor(port, app) {
        this.port = port;
        this.app = app;
        this.app.use(json())
        this.temp = 0;

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use('/user', usersRoute);
    }

    async init() {
        const db = new DATABASE();
        if (!db.db) {
            await db.initDB();  // Wait for the database initialization
        }
        const connection = db.getConnection();

        const tables = new TABLES(connection);
        await tables.initTable();

        this.listen();
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if (err)
                console.log(err);
            else
                console.log(`Server Started On ${this.port}`);
        })
    }
}

let raksha = new RAKSHA(3001, express());
await raksha.init();