/* Global Imports */
// Add any necessary imports here


/* Application Imports */
// Add any necessary imports here

/* Local Imports */
import { ProductDTO } from "@/core/dto/product.dto";
import { ProductsLogic } from "./Products.types";
import { useEffect, useState } from "react";
import { productService } from "@/core/services/product.service";

export const useLogic = (): ProductsLogic => {

    const [products, setProducts] = useState<ProductDTO[]>([])

    useEffect( () =>{
        productService.read().then(setProducts)
    },[])

    return {
        products
    };
}