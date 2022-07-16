import React, {FC} from 'react';
import {Formik} from "formik";
interface UsersFormType {
    FormSubmit: (values:string)=> void;
    FormChange: (value:string)=> void
}

const UsersForm:FC<UsersFormType> = ({FormSubmit, FormChange}) => {
    let time:any;
    const FormChangeTime = (e:React.ChangeEvent<HTMLFormElement>) =>{
        if(time) clearTimeout(time);
        time = setTimeout(()=>{
            FormChange(e.target.value);
        },1000);

    };
    return (
        <div className={"user-search"}>
            <Formik
                initialValues={{ search: ''}}
                onSubmit={(values) => {
                    FormSubmit(values.search);
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit} onChange={FormChangeTime}>
                        <input name={"search"} value={values.search} onChange={handleChange} onBlur={handleBlur} className={"input-search"} type="text" placeholder={"Find User"}/>
                        <button className={"btn-circle"}><i className="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

export default UsersForm;