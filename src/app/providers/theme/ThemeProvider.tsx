import { ThemeProvider, CssBaseline } from '@mui/material';
import type { ReactNode } from 'react';
import { baseTheme } from './base-theme';

type AppThemeProviderType = {
  children: ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderType) {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
