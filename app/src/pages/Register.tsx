import type { FC } from 'react';
import type { Response } from '../types/response';
import Layout from '../components/layout';
import { useMutation } from 'react-query';
import { Formik, Form, Field } from 'formik';
import * as y from 'yup';

import styles from '../styles/Register.module.scss';

const schema = y.object({
  firstName: y.string().required(),
  lastName: y.string().required(),
  email: y.string().required(),
  password: y.string().required(),
});

type RegisterForm = y.InferType<typeof schema>;

const register = async (form: RegisterForm) => {
  const res = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  const result: Response<string, any> = await res.json();
  if (!result.success) throw result.error;
};

const Register: FC = () => {
  const { mutate } = useMutation(register);
  return (
    <Layout>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmit={form => mutate(form)}
        validationSchema={schema}
      >
        {props => (
          <Form className={styles.form}>
            <label htmlFor='firstName'>First Name</label>
            <Field
              id='firstName'
              name='firstName'
            />
            <label htmlFor='lastName'>Last Name</label>
            <Field
              id='lastName'
              name='lastName'
            />
            <label htmlFor='email'>Email Address</label>
            <Field
              id='email'
              name='email'
            />
            <label htmlFor='password'>Password</label>
            <Field
              id='password'
              name='password'
            />
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Register;
