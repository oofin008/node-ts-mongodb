import { Application, Request, Response } from "express";
import { Server } from "../../server";
import MainController from "../controllers/main.controller";

export default class MainRoute {
  public static init(){
    Server.app.get('/ping', MainController.ping);
    Server.app.get('/prices', MainController.getAll);
    Server.app.get('/averagePrices', MainController.averagePrices);
    Server.app.post('/seed', MainController.post);
  }
}