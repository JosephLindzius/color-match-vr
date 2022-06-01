import React, { lazy, Suspense } from 'react';

const LazyTitleScreen = lazy(() => import('./TitleScreen'));

const TitleScreen = props => (
  <Suspense fallback={null}>
    <LazyTitleScreen {...props} />
  </Suspense>
);

export default TitleScreen;
