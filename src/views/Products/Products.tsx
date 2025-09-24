/* Global Imports */
import  { FC } from 'react';

/* Application Level Imports */
import * as UI from '@/components';
import * as Features from '@/containers';
import * as Hooks from '@/hooks';

/* Local Imports */
import './Products.style.css';


interface ProductsProps {}

const Products: FC<ProductsProps> = () => {

   Hooks.useDocumentTitle('Products View');

   return (
   <div className="Products" data-testid="Products">
      <UI.Header>Products</UI.Header>
      <UI.Main>Products Content</UI.Main>
      <UI.Footer />
   </div>
   )
};

export default Products;
