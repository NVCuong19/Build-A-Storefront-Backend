"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./../../models/product");
const store = new product_1.ProductStore();
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
    it('create product using create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = { name: 'product-1', price: 100, category: 1 };
        const result = yield store.create(product);
        expect(result.name).toEqual('product-1');
    }));
    it('should return all product using index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        const haveProduct = result.length > 0;
        expect(haveProduct).toBeTrue();
    }));
    it('should return the correct product using show method', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 1;
        const result = yield store.show(id);
        expect(result.id).toEqual(1);
    }));
});
