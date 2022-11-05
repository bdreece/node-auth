import type { FC } from 'react';
import { useEffect } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import Layout from '../components/layout';
import type { Response } from '../types/response';

const logout = async () => {
  const res = await fetch('http://localhost:8080/api/auth/logout', {
    credentials: 'include',
  });
  const result: Response<any, any> = await res.json();
  if (!result.success) throw result.error;
};

const Logout: FC = () => {
  const client = useQueryClient();
  useEffect(() => {
    logout().then(() => {
      client.resetQueries('refresh');
      client.setQueryData('refresh', () => ({}));
      client.resetQueries('self');
    });
  }, []);

  return (
    <Layout>
      <p>Logged out!</p>
    </Layout>
  );
};

export default Logout;
