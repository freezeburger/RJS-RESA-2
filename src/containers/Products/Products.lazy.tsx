import React, { Suspense } from 'react';
import { ProductsProps } from './Products.types';

const LazyProducts =  React.lazy(() => import('./Products'));

/**
 * USAGE: Products description to complete.
 * @example
 * <Products /> 
 */
const Products = (props: JSX.IntrinsicAttributes & ProductsProps) => (
  <Suspense fallback={null}>
    <LazyProducts {...props} />
  </Suspense>
);
Products.displayName = 'Products Lazy Loaded';

export default Products;
