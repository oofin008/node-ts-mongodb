import { Application, Request, Response } from "express";
import { Singleton } from "../../server";
import MainController from "../controllers/main.controller";

export default class MainRoute {
  public static init(){
    Singleton.app.get('/ping', MainController.ping);
    Singleton.app.get('/prices', MainController.getAll);
    Singleton.app.get('/averagePrices', MainController.averagePrices);
    Singleton.app.post('/seed', MainController.post);
  }
}