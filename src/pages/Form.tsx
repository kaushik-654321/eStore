import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { API_ENDPOINTS } from '../api/apiEndpoints';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import { addToCartServer, fetchUserCart } from '../features/cartSlice';
import { AppDispatch, persistor, RootState } from '../app/store';

type PropTypes = {
    index: number; // 0 = Login, 1 = Signup
    onClose: () => void;
};

type formTypes = {
    email: string;
    confirmPassword?: string;
    password: string;
    name?: string;
    mobile?: string;
}

const FormPage: React.FC<PropTypes> = ({ index, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const prevCart = useSelector((state: RootState) => state.cart.items);

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
        email: Yup.string().email('Invalid email address').required('Required Email'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required Password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Retype password '),
    });

    const handleSubmit = async (values: formTypes, type: string) => {
        const endpoint = type === 'login' ? "/login" : "/signup";
        const payload = values;
        try {
            const { data, status } = await axios.post(`${API_ENDPOINTS.USER.api}${endpoint}`, payload);
            const { name, userId, email, token } = data;
            if (status === 200 || status === 201) {
                toast.success(`${type === 'login' ? 'Login' : 'Signup'} successful`);
                dispatch(setUser({ name, email, userId, token }));
                if (prevCart && prevCart.length > 0) {
                    dispatch(addToCartServer({ userId, cartItems: prevCart }));
                    persistor.purge();
                }
                else {
                    if (endpoint === "/login") {
                        dispatch(fetchUserCart({ userId: data.userId, token: data.token }));
                    }

                }


                // sessionStorage.setItem("user", JSON.stringify({
                //     name: data.name,
                //     email: data.email,
                //     userId: data.userId,
                //     token: data.token
                // }));
                // sessionStorage.setItem("token", data.token);
                onClose();
            }
            else {
                toast.warn(`Unexpected status code: ${status}`);
                onClose();
            }
        }
        catch (error: any) {
            if (error.response?.data.message) {
                toast.error(error.response?.data.message);
                onClose();
            }
            else {
                toast.error("Something went wrong!");
                onClose();
            }
            console.error(`${type === 'login' ? 'Login' : 'Signup'} failed`, error.response?.data || error.message);
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
                                <Field id="email" name="email" type="email" placeholder="Email Address" className={`${errors.email && touched.email ? 'mb-0' : 'mb-2'}`} />
                                <div className="text-start">
                                    <ErrorMessage name="email" component="small" className="text-danger" />
                                </div>
                                <div className="password-wrapper d-flex justify-content-center flex-column">
                                    <label htmlFor="password" className="form-field pb-1 text-primary">Password <span className="text-danger">*</span></label>
                                    <Field id="password" name="password" type="password" placeholder="Password" />
                                    <div className="text-start">
                                        <ErrorMessage name="password" component="small" className="text-danger" />
                                    </div>
                                    <button type="button" className="forgot-password text-primary text-start mt-3">
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
                                <div className="text-start">
                                    <ErrorMessage name="name" component="small" className="text-danger" />
                                </div>
                                <label htmlFor="email" className="form-field pb-1 mt-1 text-primary">Email <span className="text-danger">*</span></label>
                                <Field id="email" name="email" type="email" placeholder="Email Address" />
                                <div className="text-start">
                                    <ErrorMessage name="email" component="small" className="text-danger" />
                                </div>

                                <div className="password-wrapper d-flex justify-content-center flex-column">
                                    <label htmlFor="password" className="form-field pb-1 mt-1 text-primary">Password <span className="text-danger">*</span></label>
                                    <Field id="password" name="password" type="password" placeholder="Password" />
                                    <div className="text-start">
                                        <ErrorMessage name="password" component="small" className="text-danger" />
                                    </div>
                                    <label htmlFor="confirmPassword" className="form-field pb-1 mt-1 text-primary">Confirm Password <span className="text-danger">*</span></label>
                                    <Field
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"

                                    />
                                    <div className="text-start">
                                        <ErrorMessage name="confirmPassword" component="small" className="text-danger" />
                                    </div>
                                </div>
                            </div>

                            <div className="third-section pb-3 d-flex justify-content-center flex-column">
                                <button
                                    type="submit"
                                    className="btn mt-4 mb-1 text-light d-flex bg-primary align-items-center justify-content-center"
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
