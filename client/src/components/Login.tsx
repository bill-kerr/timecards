import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useTypedDispatch } from '../store';
import { login } from '../store/auth/actions';
import { IconRefresh } from './icons/IconRefresh';
import history from '../history';
import { AUTH_LOGIN_ERROR } from '../store/auth/types';
import { IconExclamation } from './icons/IconExclamation';
import logo from '../assets/img/timecards_logo_gradient.svg';

interface Values {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    setFailed(false);
    const res = await dispatch(login(values.username, values.password));
    setSubmitting(false);

    if (res.type === AUTH_LOGIN_ERROR) {
      setFailed(true);
      return;
    }

    history.push('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="relative">
        <div className="absolute inset-0 transform -rotate-6 bg-gradient-to-r from-teal-200 to-indigo-400 rounded-lg shadow-lg"></div>
        <div className="relative p-6 rounded shadow-lg bg-white">
          <div className="flex items-center justify-center text-teal-900">
            <img src={logo} alt="Timecards" />
          </div>
          <div className="mt-6">
            <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col" style={{ width: '28rem' }}>
                  <label htmlFor="username" className="font-bold">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:shadow-outline"
                  />

                  <label htmlFor="password" className="mt-4 font-bold">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:shadow-outline"
                  />

                  {failed && (
                    <div className="mt-4 flex items-center leading-none">
                      <IconExclamation className="h-6 w-6 text-red-500" />
                      <span className="ml-2 text-sm text-red-600">Incorrect username or password.</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="mt-4 p-3 w-full flex items-center justify-center text-center bg-indigo-500 text-gray-100 rounded font-bold hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <IconRefresh className="h-6 w-6 animate-spin-reverse" /> : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
