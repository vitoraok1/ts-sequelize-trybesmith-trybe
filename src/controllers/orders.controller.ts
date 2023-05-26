import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function listAllOrders(_req: Request, res: Response) {
  const serviceResponse = await ordersService.listAllOrders();
  
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  
  res.status(200).json(serviceResponse.data);
}

export default {
  listAllOrders,
};