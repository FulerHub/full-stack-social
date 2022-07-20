import React, {FC} from 'react';
import {Formik} from "formik";
import Input from "../components/Input";
import {Link, Navigate} from "react-router-dom";
import * as yup from "yup";
import { useDispatch} from "react-redux";
import {actionLogin} from "../redux/reducers/authReducer";
import {useLocation} from "react-router";

interface valuesTypes {
    email: string
    password: string
}

const Login:FC = () => {

    const dispatch = useDispatch<any>();
    const valSchema = yup.object().shape({
        email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
        password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
    });
    const FormSubmit = (values:valuesTypes) =>{
       dispatch(actionLogin(values.email, values.password));
    };

    let location = useLocation();
    if (localStorage.getItem('token')) return <Navigate to="/" state={{ from: location }}/>;
    return (
        <div className="auth">
            <div className="auth__wrap block">
                <h1>Sign in</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={valSchema}
                    onSubmit={(values) => FormSubmit(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Input name={"email"} type={"email"} placeholder={"E-mail"} onChange={handleChange} onBlur={handleBlur} value={values.email} message={errors.email && touched.email && errors.email}/>
                            <Input name={"password"} type={"password"} placeholder={"Password"} onChange={handleChange} onBlur={handleBlur} value={values.password} message={errors.password && touched.password && errors.password}/>
                            <div className="input-block">
                                <button type="submit" className="btn" >Sign In</button>
                                <Link to={"/signup"} className="btn">Sign Up</Link>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};


export default Login;
//export default Login;