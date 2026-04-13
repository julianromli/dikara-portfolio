import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {TrpcProvider} from './trpc/client.tsx';
import HomePage from './pages/HomePage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import '@uploadthing/react/styles.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TrpcProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </TrpcProvider>
    </BrowserRouter>
  </StrictMode>,
);
