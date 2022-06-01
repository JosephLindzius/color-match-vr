import React, { lazy, Suspense } from 'react';

const LazyColorMatch = lazy(() => import('./ColorMatch'));

const ColorMatch = props => (
  <Suspense fallback={null}>
    <LazyColorMatch {...props} />
  </Suspense>
);

export default ColorMatch;
