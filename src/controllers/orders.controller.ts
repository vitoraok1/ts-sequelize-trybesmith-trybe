import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

async function listAllOrders(_req: Request, res: Response) {
  const serviceResponse = await ordersService.listAllOrders(); 
  
  res.status(200).json(serviceResponse.data);
}

export default {
  listAllOrders,
};