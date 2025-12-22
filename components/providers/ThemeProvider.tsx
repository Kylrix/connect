'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};

const ColorModeContext = createContext<ColorModeContextType>({ toggleColorMode: () => { }, mode: 'light' });

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('whisperrconnect-theme') as 'light' | 'dark' | null;
    if (saved) {
      setMode(saved);
    } else {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    localStorage.setItem('whisperrconnect-theme', mode);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#FFC107', // Tungsten Sun
            contrastText: '#1B1C20',
          },
          secondary: {
            main: '#1A237E', // Adire Indigo
            contrastText: '#FAF8F6',
          },
          background: {
            default: mode === 'light' ? '#FAF8F6' : '#1B1C20', // Solar / Void
            paper: mode === 'light' ? '#EADDD3' : '#2D2421',   // Sand / Laterite
          },
          text: {
            primary: mode === 'light' ? '#1B1C20' : '#FAF8F6',
            secondary: mode === 'light' ? '#5E4E42' : '#A69080',
          },
          divider: mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D',
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: 'var(--font-inter), "Inter", sans-serif',
          h1: {
            fontFamily: 'var(--font-mono), monospace',
            fontWeight: 800,
            letterSpacing: '-0.03em',
          },
          h2: {
            fontFamily: 'var(--font-mono), monospace',
            fontWeight: 700,
          },
          h3: {
            fontFamily: 'var(--font-mono), monospace',
            fontWeight: 700,
          },
          button: {
            fontFamily: 'var(--font-mono), monospace',
            textTransform: 'uppercase',
            fontWeight: 800,
            letterSpacing: '0.05em',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? 'rgba(250, 248, 246, 0.8)' : 'rgba(27, 28, 32, 0.8)',
                color: mode === 'light' ? '#1B1C20' : '#FAF8F6',
                backdropFilter: 'blur(12px)',
                borderBottom: `2px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
                boxShadow: 'none',
              }
            }
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'light' ? '#FAF8F6' : '#1B1C20',
                borderRight: `2px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                padding: '12px 24px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: mode === 'light'
                  ? '0px 2px 4px rgba(26, 35, 126, 0.2), 0px 8px 16px rgba(26, 35, 126, 0.1), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                  : '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 8px 16px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: mode === 'light'
                    ? '0px 4px 8px rgba(26, 35, 126, 0.4), 0px 12px 24px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                    : '0px 4px 8px rgba(0, 0, 0, 0.6), 0px 12px 24px rgba(26, 35, 126, 0.4), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: 'none',
                },
              },
            }
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 24,
                backgroundColor: mode === 'light' ? '#EADDD3' : '#2D2421',
                border: `2px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
                boxShadow: mode === 'light'
                  ? '0px 2px 4px rgba(26, 35, 126, 0.2), 0px 8px 16px rgba(26, 35, 126, 0.1), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                  : '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 8px 16px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                backgroundImage: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: mode === 'light'
                    ? '0px 4px 8px rgba(26, 35, 126, 0.4), 0px 12px 24px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                    : '0px 4px 8px rgba(0, 0, 0, 0.6), 0px 12px 24px rgba(26, 35, 126, 0.4), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                },
              }
            }
          }
        }
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
