import { FC, useContext } from 'react';
import type { Response } from 'types/response';
import { createContext } from 'react';
import { useAccessToken } from './AccessProvider';
import { useQuery } from 'react-query';

export type SelfContext = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const context = createContext<SelfContext | undefined>(undefined);

export type SelfProviderProps = {
  children?: JSX.Element | string;
};

const self = async (accessToken: string) => {
  const res = await fetch('http://localhost:8080/api/self');
  const result: Response<SelfContext, any> = await res.json();
  if (!result.success) throw result.error;
  return result.data;
};

export const useSelf = () => useContext(context);

const SelfProvider: FC<SelfProviderProps> = ({ children }) => {
  const { accessToken } = useAccessToken();
  const { data: selfData } = useQuery(
    ['self', accessToken],
    () => self(accessToken!),
    { enabled: !!accessToken },
  );

  return <context.Provider value={selfData}>{children}</context.Provider>;
};

export default SelfProvider;
