import dotenv from 'dotenv';
import express, { Application } from 'express';
import MainRoute from './apps/routes/main.route';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
dotenv.config();

export class Server {
  public static app: Application;
  public static mongodb: MongoClient;
  public static connectionString = `mongodb://localhost:27017`;
  public _PORT: number = 8080;

  constructor(PORT) {
    Server.app = express();
    Server.mongodb = new MongoClient(Server.connectionString);
    this._PORT = PORT;
  }

  public init() {
    Server.app.use(bodyParser.json());
    Server.app.use(bodyParser.urlencoded({ extended: true}));
    MainRoute.init();
  }

  public start() {
    Server.app.listen(this._PORT, () => {
      console.log(`app listen to: ${this._PORT}`);
    });
  }
}

(async () => {
  const server = new Server(process.env.PORT);
  server.init();
  server.start();
})();
