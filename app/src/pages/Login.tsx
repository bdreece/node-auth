import type { FC } from 'react';
import type { Response } from '../types/response';
import type { AccessContext } from '../components/providers/AccessProvider';
import { Formik, Form, Field } from 'formik';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import * as y from 'yup';
import Layout from '../components/layout';

import styles from '../styles/Login.module.scss';

const schema = y.object({
  email: y.string().required(),
  password: y.string().required(),
});

type LoginForm = y.InferType<typeof schema>;

const login = async (form: LoginForm, queryClient: QueryClient) => {
  const res = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(form),
  });
  const result: Response<AccessContext, any> = await res.json();
  if (!result.success) throw result.error;
  queryClient.invalidateQueries('refresh');
  queryClient.invalidateQueries('self');
};

const Login: FC = () => {
  const client = useQueryClient();
  const { mutate } = useMutation((form: LoginForm) => login(form, client));
  return (
    <Layout>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={form => mutate(form)}
        validationSchema={schema}
      >
        <Form className={styles.form}>
          <label htmlFor='email'>Email Address</label>
          <Field
            id='email'
            name='email'
          />
          <label htmlFor='password'>Password</label>
          <Field
            id='password'
            name='password'
            type='password'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </Layout>
  );
};

export default Login;
