import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type PropTypes = {
    index: number; // 0 = Login, 1 = Signup
};

const FormPage: React.FC<PropTypes> = ({ index }) => {
    const loginSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    });

    const signupSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    return (
        <>
            {index === 0 && (
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        console.log('Login Submitted', values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form noValidate>
                            <div className="second-section d-flex justify-content-center flex-column">
                                <label htmlFor="email" className="visually-hidden">Email</label>
                                <Field id="email" name="email" type="email" placeholder="Email Address" className={`${errors.email && touched.email ? 'mb-0' : 'mb-3'}`}/>
                                <div className="text-start">
                                <ErrorMessage name="email" component="small" className="text-danger" />
                                </div>
                                <div className="password-wrapper d-flex justify-content-center flex-column mt-3">
                                    <label htmlFor="password" className="visually-hidden">Password</label>
                                    <Field id="password" name="password" type="password" placeholder="Password" />
                                    <div className="text-start">
                                    <ErrorMessage name="password" component="small" className="text-danger" />
                                    </div>
                                    <button type="button" className="forgot-password text-primary text-start mt-2">
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>

                            <div className="third-section pb-3 d-flex justify-content-center flex-column">
                                <button
                                    type="submit"
                                    className="btn mt-5 mb-3 text-light d-flex bg-primary align-items-center justify-content-center"
                                >
                                    Login
                                </button>
                                <span>
                                    Not a member?{' '}
                                    <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">
                                        Signup now
                                    </a>
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

            {index === 1 && (
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={signupSchema}
                    onSubmit={(values) => {
                        console.log('Signup Submitted', values);
                    }}
                >
                    {() => (
                        <Form noValidate>
                            <div className="second-section d-flex justify-content-center flex-column">
                                <label htmlFor="email" className="visually-hidden">Email</label>
                                <Field id="email" name="email" type="email" placeholder="Email Address" />
                                <div className="text-start">
                                <ErrorMessage name="email" component="small" className="text-danger" />
                                </div>
                                <div className="password-wrapper d-flex justify-content-center flex-column mt-3">
                                    <label htmlFor="password" className="visually-hidden">Password</label>
                                    <Field id="password" name="password" type="password" placeholder="Password" />
                                    <div className="text-start">
                                    <ErrorMessage name="password" component="small" className="text-danger" />
                                    </div>
                                    <label htmlFor="confirmPassword" className="visually-hidden">Confirm Password</label>
                                    <Field
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="mt-4"
                                    />
                                     <div className="text-start">
                                    <ErrorMessage name="confirmPassword" component="small" className="text-danger" />
                                    </div>
                                </div>
                            </div>

                            <div className="third-section pb-3 d-flex justify-content-center flex-column">
                                <button
                                    type="submit"
                                    className="btn mt-5 mb-3 text-light d-flex bg-primary align-items-center justify-content-center"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default FormPage;
