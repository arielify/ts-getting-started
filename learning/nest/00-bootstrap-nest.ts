/**
 * @fileOverview Bootstrap Nest application in the console application
 * @description Demonstrates how to write a console application that uses Nest.
 * @example npx ts-node learning/nest/00-bootstrap-nest.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    // Bootstrap the application
    const app = await NestFactory.createApplicationContext(AppModule);

    // Application logic here
    const config = app.get(ConfigService);
    console.log('App config:', JSON.stringify(config, null, 2));

    // Close the application, especially when running as a CRON job
    await app.close();
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
