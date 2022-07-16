import React, {FC} from 'react';
import {Formik} from "formik";
import * as yup from "yup";

interface FormikType {
    message: string;
}
interface FormDialogType {
    FormSubmit: (values:FormikType)=> void
}
const FormDialog:FC<FormDialogType> = ({FormSubmit}) => {
    const valSchema = yup.object().shape({
        message:yup.string().typeError('This field only accepts text').required('This field is required').min(1,'The field must be at least 3 characters long'),
    });

    const FormKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>, handleSubmit:() => void) =>{
        if(e.keyCode == 13 && (e.ctrlKey || e.metaKey)){
        }
        else if(e.keyCode===13) {
            e.preventDefault();
            handleSubmit()
        }
    };
    return (
        <div className="form-message">
            <Formik
                initialValues={{ message: ''}}
                validationSchema={valSchema}
                onSubmit={(values,{ resetForm }) => {
                    FormSubmit(values);
                    resetForm()
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                       <div className={"form-message__input"}>
                            <textarea onKeyDown={(e)=>FormKeyDown(e,handleSubmit)} name={"message"} onChange={handleChange} onBlur={handleBlur} value={values.message} className="textarea"/>
                       </div>
                       <div className={"form-message__button"}>
                            <button type={"submit"} className="btn-circle"><i className="fa fa-arrow-right" aria-hidden="true"/></button>
                       </div>
                    </form>
                )}
            </Formik>
        </div>
    );


};

export default FormDialog;