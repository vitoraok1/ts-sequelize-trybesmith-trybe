import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function validateParams({
  name,
  price,
  orderId,
}: ProductInputtableTypes): string | null {
  if (!name) return 'Name is required';
  if (!price) return 'Price is required';
  if (!orderId) return 'orderId is required';

  return null;
}

async function registerNewProduct(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const error = validateParams(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct.dataValues };

  return responseService;
}

async function listAllProducts(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
}

export default {
  registerNewProduct,
  listAllProducts,
};