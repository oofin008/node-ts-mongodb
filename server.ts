import dotenv from 'dotenv';
import express, { Application } from 'express';
import MainRoute from './apps/routes/main.route';
import { MongoClient } from 'mongodb';
import { createServer, Server } from 'node:http';
import bodyParser from 'body-parser';
dotenv.config();

export class Singleton {
  public static app: Application;
  public static mongodb: MongoClient;
  public static server: Server;
  public static connectionString = `mongodb://localhost:27017`;
  public _PORT: number = 8080;

  constructor(PORT) {
    Singleton.app = express();
    Singleton.server = createServer(Singleton.app);
    Singleton.mongodb = new MongoClient(Singleton.connectionString);
    this._PORT = PORT;
  }

  public init() {
    Singleton.app.use(bodyParser.json());
    Singleton.app.use(bodyParser.urlencoded({ extended: true}));
    MainRoute.init();
  }

  public start() {
    // Singleton.app.listen(this._PORT, () => {
    //   console.log(`app listen to: ${this._PORT}`);
    // });
    Singleton.server.listen(this._PORT, () => {
      console.log(`app listen to: ${this._PORT}`);
    });
  }
}

(async () => {
  const server = new Singleton(process.env.PORT);
  server.init();
  server.start();
})();
