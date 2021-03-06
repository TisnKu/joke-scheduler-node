import 'reflect-metadata';
import '@tsed/servestatic';
import '@tsed/swagger';
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common';

import * as Path from 'path';
import * as dotenv from 'dotenv';
import * as logger from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { $log } from 'ts-log-debug';
import { createConnection } from 'typeorm';

process.env.TZ = 'Asia/Shanghai';

const getEnvPath = () => process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

dotenv.config({ path: getEnvPath() });

const rootDir = Path.resolve(__dirname);

@ServerSettings({
    rootDir,
    mount: {
        '/api': `${rootDir}/controllers/**/**.controller.{ts,js}`
    },
    componentsScan: [
        `${rootDir}/services/**/**.service.{ts,js}`,
        `${rootDir}/middlewares/**/**.{ts,js}`,
        `${rootDir}/dal/**/**.{ts,js}`
    ],
    serveStatic: {
        '/': `${rootDir}/web`
    },
    httpPort: process.env.PORT || 3000,
    httpsPort: false,
    acceptMimes: ['application/json'],
    swagger: {
        path: '/api-docs'
    }
})
export class Server extends ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public async $onMountingMiddlewares(): Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
            .use(compression())
            .use(express())
            .use(logger('dev'))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    async $onInit(): Promise<any> {
        const connection = await createConnection();
        await connection.runMigrations();
        $log.debug('DB connected');
    }

    public $onReady() {
        $log.info('Server started...');
    }

    public $onServerInitError(err) {
        $log.error(err);
    }
}

