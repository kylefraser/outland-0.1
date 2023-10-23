import { createContext, useContext, useState } from 'react';

interface InitContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext({} as InitContextProps);

export function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
