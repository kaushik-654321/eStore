import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { API_ENDPOINTS } from '../api/apiEndpoints';

type PropTypes = {
    index: number; // 0 = Login, 1 = Signup
};

type formTypes = {
    email: string;
    confirmPassword?: string;
    password: string;
    name?: string;
    mobile?: string;
}

const FormPage: React.FC<PropTypes> = ({ index }) => {
    const loginSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required Email'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required Password'),
    });

    const signupSchema = Yup.object({
        name: Yup.string().required('Required name').test(
            'full-name',
            'Please enter both first and last name',
            value => !!value && value.trim().split(' ').length >= 2
        ),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Required Mobile number'),
        email: Yup.string().email('Invalid email address').required('Required Email'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required Password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Retype password '),
    });

    const handleSubmit = async (values: formTypes, type: string) => {
        const endpoint = type === 'login' ? "/login" : "register";
        const payload = values;
        const response = await axios.post(`${API_ENDPOINTS}${endpoint}`, payload);

        if (type === 'login') {

            console.log('Login Submitted', values);
        }
        else {
            console.log('Signup Submitted', values);
        }
    }

    return (
        <>
            {index === 0 && (
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => handleSubmit(values, 'login')}
                >
                    {({ errors, touched }) => (
                        <Form noValidate>
                            <div className="second-section d-flex justify-content-center flex-column">
                                <label htmlFor="email" className="form-field pb-1 text-primary">Email <span className="text-danger">*</span></label>
                                <Field id="email" name="email" type="email" placeholder="Email Address" className={`${errors.email && touched.email ? 'mb-0' : 'mb-3'}`} />
                                <div className="text-start">
                                    <ErrorMessage name="email" component="small" className="text-danger" />
                                </div>
                                <div className="password-wrapper d-flex justify-content-center flex-column">
                                    <label htmlFor="password" className="form-field pb-1 text-primary">Password <span className="text-danger">*</span></label>
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
                    initialValues={{ name: '', mobile: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={signupSchema}
                    onSubmit={(values) => handleSubmit(values, 'signup')}
                >
                    {() => (
                        <Form noValidate>
                            <div className="second-section d-flex justify-content-center flex-column">
                                <label htmlFor="name" className="form-field pb-1 text-primary">Full Name <span className="text-danger">*</span></label>
                                <Field id="name" type="text" name="name" placeholder="Full Name" />
                                <div className="text-start mb-3">
                                    <ErrorMessage name="name" component="small" className="text-danger" />
                                </div>
                                <label htmlFor="email" className="form-field pb-1 text-primary">Email <span className="text-danger">*</span></label>
                                <Field id="email" name="email" type="email" placeholder="Email Address" />
                                <div className="text-start  mb-3">
                                    <ErrorMessage name="email" component="small" className="text-danger" />
                                </div>
                                <label htmlFor="mobile" className="form-field pb-1 text-primary">Mobile <span className="text-danger">*</span></label>
                                <Field id="mobile" name="mobile" type="text" placeholder="Mobile Number" />
                                <div className="text-start">
                                    <ErrorMessage name="mobile" component="small" className="text-danger" />
                                </div>
                                <div className="password-wrapper d-flex justify-content-center flex-column mt-3">
                                    <label htmlFor="password" className="form-field pb-1 text-primary">Password <span className="text-danger">*</span></label>
                                    <Field id="password" name="password" type="password" placeholder="Password" />
                                    <div className="text-start">
                                        <ErrorMessage name="password" component="small" className="text-danger" />
                                    </div>
                                    <label htmlFor="confirmPassword" className="form-field pb-1 text-primary">Confirm Password <span className="text-danger">*</span></label>
                                    <Field
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="mt-1"
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
