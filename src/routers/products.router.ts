import { Router } from 'express';
import productsController from '../controllers/products.controller';

const transactionsRouter = Router();
transactionsRouter.post('/products', productsController.registerNewProduct);
transactionsRouter.get('/products', productsController.listAllProducts);

export default transactionsRouter;