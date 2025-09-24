import React, { Suspense } from 'react';

const LazyHome = React.lazy(() => import('./Home'));

/**
 * USAGE: Home description to complete.
 * @example
 * <Home /> 
 */
const Home = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHome {...props} />
  </Suspense>
);
Home.displayName = 'Home Lazy Loaded';

export default Home;
