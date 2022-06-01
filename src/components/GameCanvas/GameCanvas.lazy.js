import React, { lazy, Suspense } from 'react';

const LazyGameCanvas = lazy(() => import('./GameCanvas'));

const GameCanvas = props => (
  <Suspense fallback={null}>
    <LazyGameCanvas {...props} />
  </Suspense>
);

export default GameCanvas;
