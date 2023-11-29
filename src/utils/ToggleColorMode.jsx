import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('dark');
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#f44336' : '#1976d2',
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
