import React, { createContext, useState, useContext, FC, ReactNode } from 'react';

type MyContextType = [Record<string, any>, React.Dispatch<React.SetStateAction<Record<string, any>>>];

const AppContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyStateProvider');
  }
  return context;
};

interface MyStateProviderProps {
  children: ReactNode;
}

const MyStateProvider: FC<MyStateProviderProps> = ({ children }) => {
  const [state, setState] = useState<Record<string, any>>({});

  return (
    <div>

    <AppContext.Provider value= { [state, setState]} >
    { children }
    < /AppContext.Provider>
    < /div>
    );
};

export default MyStateProvider;

