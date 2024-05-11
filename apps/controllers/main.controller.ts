import { Request, Response } from 'express';
import { Singleton } from '../../server';
import { quotes } from '../data/quotes';
import axios from 'axios';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default class MainController {

  // public static serveHtml(req: Request, res: Response) {
  //   const _dirname = dirname(fileURLToPath(import.meta.url))
  //   res.sendFile(join(__dirname, 'index.html'))
  // }

  public static ping(req: Request, res: Response) {
    res.send(`OK @ ${new Date()}`);
  }

  public static async getAll(req: Request, res: Response) {
    try {
      await Singleton.mongodb.connect();
      const db = Singleton.mongodb.db('interview');
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
      await Singleton.mongodb.close();
    }
  }

  public static async averagePrices(req: Request, res: Response) {
    try {
      await Singleton.mongodb.connect();
      const db = Singleton.mongodb.db('interview');
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
      await Singleton.mongodb.close();
    }
  }

  public static async post(req: Request, res: Response) {
    try {
      await Singleton.mongodb.connect();
      const db = Singleton.mongodb.db('interview');
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
      await Singleton.mongodb.close();
    }
  }
}
