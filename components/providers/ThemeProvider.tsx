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
          borderRadius: 4,
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
                borderBottom: `1px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
                boxShadow: 'none',
              }
            }
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'light' ? '#FAF8F6' : '#1B1C20',
                borderRight: `1px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 2,
                padding: '10px 20px',
                boxShadow: '4px 4px 0 rgba(26, 35, 126, 0.8)',
                transition: 'all 0.1s ease',
                '&:hover': {
                  transform: 'translate(-2px, -2px)',
                  boxShadow: '6px 6px 0 rgba(26, 35, 126, 0.9)',
                },
                '&:active': {
                  transform: 'translate(2px, 2px)',
                  boxShadow: 'none',
                },
              },
            }
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#EADDD3' : '#2D2421',
                border: `1px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
                boxShadow: mode === 'light'
                  ? '4px 8px 16px rgba(26, 35, 126, 0.15)'
                  : '8px 12px 20px rgba(26, 35, 126, 0.4)',
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
