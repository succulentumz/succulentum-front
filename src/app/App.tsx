import { type FC } from 'react';

import { Provider, RouterProvider } from './providers';

export const App: FC = () => (
  <Provider>
    <RouterProvider />
  </Provider>
);

export default App;
