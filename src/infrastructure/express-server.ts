import express from 'express';
import {ExpressRouter} from './expresse-router';
import bodyParser from 'body-parser';

export class ExpressServer {

    private cors = require('cors');

    private bodyParser = require('body-parser');


    private express = express();


    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureBodyParser();
        this.configureRoutes();
    }

    bootstrap(): void {
        this.express.use(this.cors());
        this.express.use(this.bodyParser.json());
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }


}