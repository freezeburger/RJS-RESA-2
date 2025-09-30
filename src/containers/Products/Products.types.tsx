import { ProductDTO } from "@/core/dto/product.dto";

export interface ProductsProps {
   logic: ProductsLogic;
}

export interface ProductsLogic {
  // Add your logic here
  products:ProductDTO[]
}