// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Order, OrderProduct, Product, CartProduct } = initSchema(schema);

export {
  Order,
  OrderProduct,
  Product,
  CartProduct
};