import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

function verifyIfFieldsExists({
  name,
  price,
}: ProductInputtableTypes): string | null {
  if (!name) return '"name" is required';
  if (!price) return '"price" is required';  

  return null;
}

function validateParams({
  name,
  price,
}: ProductInputtableTypes): string | null {
  // Name validations
  if (typeof name !== 'string') return '"name" must be a string';
  if (name.length < 3) return '"name" length must be at least 3 characters long';
  // Price validations
  if (typeof price !== 'string') return '"price" must be a string';
  if (price.length < 3) return '"price" length must be at least 3 characters long'; 

  return null;
}

async function registerNewProduct(
  product: ProductInputtableTypes,
): Promise<ServiceResponse<Product>> {
  let responseService: ServiceResponse<Product>;
  const errorContain = verifyIfFieldsExists(product);
  const errorFormat = validateParams(product);

  if (errorContain) {
    responseService = { status: 'INVALID_DATA', data: { message: errorContain } };
    return responseService;
  }

  if (errorFormat) {
    responseService = { status: 'UNPROCESSABLE_ENTITY', data: { message: errorFormat } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  return { status: 'SUCCESSFUL', data: newProduct.dataValues };
}

async function listAllProducts(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
}

export default {
  registerNewProduct,
  listAllProducts,
};