import { FC, useContext } from 'react';
import { createContext } from 'react';
import { useQuery } from 'react-query';
import { Response } from '../../types/response';

export type AccessContext = {
  accessToken?: string;
};

const context = createContext<AccessContext>({});

const refresh = async () => {
  const res = await fetch('http://localhost:8080/api/auth/refresh');
  const result: Response<AccessContext, any> = await res.json();
  if (!result.success) throw result.error;
  return result.data;
};

export type AccessProviderProps = {
  children?: JSX.Element | string;
};

export const useAccessToken = () => useContext(context);

const AccessProvider: FC<AccessProviderProps> = ({ children }) => {
  const { data } = useQuery<AccessContext>('refresh', refresh, {
    retry: false,
  });

  return (
    <context.Provider value={{ accessToken: data?.accessToken }}>
      {children}
    </context.Provider>
  );
};

export default AccessProvider;
