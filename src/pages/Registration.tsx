import React, {FC} from 'react';
import Input from "../components/Input";
import {Formik} from "formik";
import * as yup from "yup";
import {Link, Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";
import {actionRegister} from "../redux/reducers/authReducer";
interface FormikType {
    login:string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const Registration:FC = () => {
    const dispatch = useDispatch<any>();

    const valSchema = yup.object().shape({
        login: yup.string().typeError('This field only accepts text').required('This field is required').min(3,'The field must be at least 3 characters long'),
        email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
        password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const FormSubmit = (values:FormikType) =>{
        dispatch(actionRegister(values.login,values.email,values.password))
    };

    let location = useLocation();
    if (localStorage.getItem('token')) return <Navigate to="/" state={{ from: location }}/>;
    return (
        <div className="auth">
            <div className="auth__wrap block">
                <h1>Sign Up</h1>
                <Formik
                    initialValues={{ login:'', email: '', password: '',passwordConfirm:'' }}
                    validationSchema={valSchema}
                    onSubmit={(values) => FormSubmit(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Input name={"login"} type={"text"} placeholder={"Your Login"} onChange={handleChange} onBlur={handleBlur} value={values.login} message={errors.login && touched.login && errors.login}/>
                            <Input name={"email"} type={"email"} placeholder={"E-mail"} onChange={handleChange} onBlur={handleBlur} value={values.email} message={errors.email && touched.email && errors.email}/>
                            <Input name={"password"} type={"password"} placeholder={"Password"} onChange={handleChange} onBlur={handleBlur} value={values.password} message={errors.password && touched.password && errors.password}/>
                            <Input name={"passwordConfirm"} type={"password"} placeholder={"Confirm Password"} onChange={handleChange} onBlur={handleBlur} value={values.passwordConfirm} message={errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm}/>
                            <div className="input-block">
                                <button type="submit" className="btn" disabled={isSubmitting}>Sign Up</button>
                                <Link to={"/signin"} className="btn">Sign In</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;