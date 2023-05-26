import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { OrderArray } from '../types/OrderArray';

async function listAllOrders(): Promise<ServiceResponse<OrderArray>> {
  const orders = await OrderModel.findAll();
  const products = await ProductModel.findAll();

  const newOrder: OrderArray = [];
  
  orders.forEach(({ dataValues: { id, userId } }) => {
    newOrder.push({
      id,
      userId,
      productIds: products
        .filter(({ dataValues: { orderId } }) => orderId === id)
        .map((product) => product.dataValues.id),
    });
  });

  return { status: 'SUCCESSFUL', data: newOrder };
}

export default {
  listAllOrders,
};