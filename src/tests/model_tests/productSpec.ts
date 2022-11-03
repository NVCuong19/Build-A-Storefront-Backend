import { Product, ProductStore} from './../../models/product';

const store = new ProductStore();

describe('Product Model - ', () => {
    it('should have a index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create product using create method', async () => {
        const product: Product = {name: 'product-1', price: 100, category: 1};
        const result: Product = await store.create(product);
        expect(result.name).toEqual('product-1');
    });

    it('should return all product using index method', async () => {
        const result: Product[] = await store.index();
        const haveProduct: Boolean = result.length > 0;
        expect(haveProduct).toBeTrue();
    });

    it('should return the correct product using show method', async () => {
        const id = 1;
        const result: Product = await store.show(id);
        expect(result.id).toEqual(1);
    });
});