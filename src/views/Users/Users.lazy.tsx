import React, { Suspense } from 'react';

const LazyUsers = React.lazy(() => import('./Users'));

/**
 * USAGE: Users description to complete.
 * @example
 * <Users /> 
 */
const Users = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyUsers {...props} />
  </Suspense>
);
Users.displayName = 'Users Lazy Loaded';

export default Users;
