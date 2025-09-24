import React, { Suspense } from 'react';
import { FlightProps } from './Flight.types';

const LazyFlight =  React.lazy(() => import('./Flight'));

/**
 * USAGE: Flight description to complete.
 * @example
 * <Flight /> 
 */
const Flight = (props: JSX.IntrinsicAttributes & FlightProps) => (
  <Suspense fallback={null}>
    <LazyFlight {...props} />
  </Suspense>
);
Flight.displayName = 'Flight Lazy Loaded';

export default Flight;
