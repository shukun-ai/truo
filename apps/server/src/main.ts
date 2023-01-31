import { WebServer } from './app';

new WebServer({ port: process.env.PORT ?? '3000' }).start();
