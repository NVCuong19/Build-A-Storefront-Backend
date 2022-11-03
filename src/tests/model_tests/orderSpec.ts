import { Order, OrderStore } from './../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { OrderProducts, OrderProductsStore } from '../../models/order_products';


const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderProductsStore = new OrderProductsStore();

let selectedOrderId = 0;

describe('Order Model - ', () => {

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('should have a addOrder method', () => {
        expect(orderStore.addOrder).toBeDefined();
    });

    it('create a new order using addOrder method', async () => {
        const user: User = {firstName: 'user-2', lastName: 'user-2', account: 'user2', password: 'user2'};
        const userResult = await userStore.create(user);
        const order: Order = {userId: userResult.id as number, status: 0};
        const orderResult = await orderStore.addOrder(order);
        const product: Product = {name: 'product-2', price: 1234, category: 1};  
        const productResult = await productStore.create(product);
        const orderProduct: OrderProducts = {productId: productResult.id as number, orderId: orderResult.id as number, quantity: 2}
        const orderProductResult = await orderProductsStore.addOrderProduct(orderProduct);
        selectedOrderId = orderResult.id as number;
        expect(orderResult.id).toBeGreaterThan(0);
    });

    it('should return the correct order using show method', async () => {
        const result = await orderStore.show(selectedOrderId);
        expect(result[0].order_id).toBeGreaterThan(0);
    });
});