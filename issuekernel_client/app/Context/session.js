'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

const UserSessionContext = createContext();

export const UserSessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => useContext(UserSessionContext);
