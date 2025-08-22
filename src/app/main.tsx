import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/providers/router';
import AppThemeProvider from './providers/theme/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </StrictMode>,
);
