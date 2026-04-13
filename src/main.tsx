import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {TrpcProvider} from './trpc/client.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrpcProvider>
      <App />
    </TrpcProvider>
  </StrictMode>,
);
