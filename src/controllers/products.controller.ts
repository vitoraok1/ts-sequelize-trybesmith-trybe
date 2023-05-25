import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function registerNewProduct(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const serviceResponse = await productsService.registerNewProduct({ name, price, orderId });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }

  res.status(201).json(serviceResponse.data);
}

export default {
  registerNewProduct,
};