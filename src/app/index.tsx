import './index.css';
// eslint-disable-next-line @conarti/feature-sliced/public-api
import { createRoot } from 'react-dom/client';

import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
