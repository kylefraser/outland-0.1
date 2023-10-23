import * as React from 'react';
import { theme as defaultTheme, darkTheme } from '../../../stitches.config';

const { createContext, useState, useEffect } = React;
export const ColourModeContext = createContext(null);

type ColourMode = string;
type MediaTheme = string;
type ColourModeProviderType = [ColourMode, () => void];

type AvailableThemes = {
  [x: string]: typeof defaultTheme | typeof darkTheme;
};

const available_themes: AvailableThemes = {
  light: defaultTheme.className,
  dark: darkTheme.className,
};

const saveColorMode = (newMode: ColourMode) => {
  try {
    if (typeof newMode === 'string')
      window.localStorage.setItem('color-mode', newMode);
  } catch (e) {
    console.warn(e);
  }
};

const getSavedColorModePreference = (): ColourMode => {
  try {
    const savedMode = window.localStorage.getItem('color-mode');

    if (typeof savedMode === 'string') return savedMode;
  } catch (e) {
    console.warn(e);
    return null;
  }
  return null;
};

const getMediaTheme = (): MediaTheme => {
  const mql = matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) return mql.matches ? 'dark' : 'light';
};

const useColorMode = (): ColourModeProviderType => {
  const [colorMode, setColorMode] = useState('');
  const html = document.documentElement;

  const applyColorMode = (newMode: ColourMode) => {
    html.classList.remove(available_themes[colorMode]);
    html.classList.add(available_themes[newMode]);
    setColorMode(newMode);
  };

  let savedColorMode = getSavedColorModePreference();
  if (savedColorMode == null) {
    savedColorMode = getMediaTheme();
  }
  html.classList.add(available_themes[savedColorMode]);

  useEffect(() => {
    setColorMode(savedColorMode);
  }, [savedColorMode]);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      applyColorMode(e.matches ? 'dark' : 'light');
    });

  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', (e) => {
      applyColorMode(e.matches ? 'light' : 'dark');
    });

  const cycleToggleMode = (): void => {
    const keys = Object.keys(available_themes);
    let index = keys.indexOf(colorMode);
    if (index === keys.length - 1) {
      index = 0;
    } else if (index >= 0) {
      index = index + 1;
    }
    const newMode = keys[index];
    applyColorMode(newMode);
    saveColorMode(newMode);
  };

  return [colorMode, cycleToggleMode];
};

type ColourModeProviderProps = {
  children: any;
};

const ColourModeProvider = ({ children }: ColourModeProviderProps) => {
  const [colorMode, cycleToggleMode] = useColorMode();
  return (
    <ColourModeContext.Provider
      value={{
        colorMode: colorMode,
        cycleToggleMode: cycleToggleMode,
      }}
    >
      {children}
    </ColourModeContext.Provider>
  );
};

export default ColourModeProvider;
