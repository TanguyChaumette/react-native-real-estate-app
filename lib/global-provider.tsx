import React, { createContext, ReactNode, useContext } from "react";
import { Models } from "react-native-appwrite";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface GlobalContextType {
  isLogged: boolean;
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: async () => await getCurrentUser(),
  });

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch: async () => {
          await refetch({});
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
