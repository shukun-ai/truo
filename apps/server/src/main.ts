import { initializeWebServer } from './app';

initializeWebServer({ port: process.env.PORT ?? '3000' });
