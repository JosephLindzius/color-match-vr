import React, { lazy, Suspense } from 'react';

const LazyGamePiece = lazy(() => import('./GamePiece'));

const GamePiece = props => (
  <Suspense fallback={null}>
    <LazyGamePiece {...props} />
  </Suspense>
);

export default GamePiece;
