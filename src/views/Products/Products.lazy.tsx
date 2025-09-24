import React, { Suspense } from 'react';

const LazyProducts = React.lazy(() => import('./Products'));

/**
 * USAGE: Products description to complete.
 * @example
 * <Products /> 
 */
const Products = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProducts {...props} />
  </Suspense>
);
Products.displayName = 'Products Lazy Loaded';

export default Products;
