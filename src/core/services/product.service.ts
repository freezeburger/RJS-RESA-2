
import { ProductDTO } from "../dto/product.dto";
import { CrudAbstract } from "./crud.abstract";

class ProductService extends CrudAbstract<ProductDTO>{
    readonly API = '/products';
}

export const productService = new ProductService();
