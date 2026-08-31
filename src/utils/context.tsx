import { useState, createContext, useMemo, ReactNode } from "react";

interface ContextProps {
  isFirstClickDone: boolean;
  setIsFirstClickDone: React.Dispatch<React.SetStateAction<boolean>>;

  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;

  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const DataContext = createContext({} as ContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isFirstClickDone, setIsFirstClickDone] = useState(false);
  const [options, setOptions] = useState([] as string[]);
  const [loggedIn, setLoggedIn] = useState(false);

  const providerValue = useMemo(
    () => ({
      isFirstClickDone,
      setIsFirstClickDone,
      options,
      setOptions,
      loggedIn,
      setLoggedIn,
    }),
    [isFirstClickDone, options, loggedIn]
  );

  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};
