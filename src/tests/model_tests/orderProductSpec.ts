import { Order, OrderStore } from './../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { OrderProducts, OrderProductsStore } from '../../models/order_products';

const orderProductsStore = new OrderProductsStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

describe('OrderProducts Model - ', () => {

    it('should have a addOrderProduct method', () => {
        expect(orderProductsStore.addOrderProduct).toBeDefined();
    });

    it('add new info into OrderProducts table using addOrderProduct method', async () => {
        const user: User = {firstName: 'user-3', lastName: 'user-3', account: 'user3', password: 'user-3'};
        const userResult = await userStore.create(user);
        const order: Order = {userId: userResult.id as number, status: 0};
        const orderResult = await orderStore.addOrder(order);
        const product: Product = {name: 'product-3', price: 1234, category: 1};  
        const productResult = await productStore.create(product);
        const orderProduct: OrderProducts = {productId: productResult.id as number, orderId: orderResult.id as number, quantity: 2}
        const orderProductResult = await orderProductsStore.addOrderProduct(orderProduct);
        expect(orderProductResult.id).toBeGreaterThan(0);
    });
});