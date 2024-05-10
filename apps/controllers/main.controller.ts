import { Request, Response } from 'express';
import { Server } from '../../server';
import { quotes } from '../data/quotes';
import axios from 'axios';

export default class MainController {
  public static ping(req: Request, res: Response) {
    res.send(`OK @ ${new Date()}`);
  }

  public static async getAll(req: Request, res: Response) {
    try {
      await Server.mongodb.connect();
      const db = Server.mongodb.db('interview');
      const collection = db.collection('prices');

      const findResult = await collection.find();
      let result = [];
      for await (const doc of findResult) {
        console.log(doc);
        result.push(doc);
      };
      res.status(200).json({
        data: result,
        status: 200,
      });
    } catch (e: any) {
      console.log('error: ', (e as Error).message);
      res.status(500).json({
        message: e,
      });
    } finally {
      await Server.mongodb.close();
    }
  }

  public static async averagePrices(req: Request, res: Response) {
    try {
      await Server.mongodb.connect();
      const db = Server.mongodb.db('interview');
      const collection = db.collection('prices');

      const aggResult = await collection.aggregate([
        // Stage 2: Group remaining documents by date and calculate results
        {
          $group: {
            _id: '$symbol',
            averagePrice: { $avg: '$price' },
          },
        }
      ]);
      let result = [];
      for await (const doc of aggResult) {
        // console.log(doc._id);
        // const apiRes = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${doc._id}`);
        // console.log('response: ',apiRes);
        result.push(doc);
      }
      res.status(200).json({
        data: result,
        status: 200,
      });
    } catch (e: any) {
      console.log('error: ', (e as Error).message);
      res.status(500).json({
        message: e,
      });
    } finally {
      await Server.mongodb.close();
    }
  }

  public static async post(req: Request, res: Response) {
    try {
      await Server.mongodb.connect();
      const db = Server.mongodb.db('interview');
      const collection = db.collection('prices');
      const result = await collection.insertMany(quotes);
      res.status(200).json({
        data: result.insertedCount,
        status: 200,
      });
    } catch (e: any) {
      console.log('error: ', (e as Error).message);
      res.status(500).json({
        message: e,
      });
    } finally {
      await Server.mongodb.close();
    }
  }
}
