import React, {FC} from 'react';
import {Formik} from "formik";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {actionAddPost} from "../../redux/reducers/postsReducer";
import {useParams} from "react-router";

interface FormSubmitType {
    message: string;
}

const ProfileForm:FC = ({}) => {
    let {userID} = useParams();
    const dispatch = useDispatch<any>();
    const valSchema = yup.object().shape({
        message: yup.string().typeError('This field only accepts text').required('This field is required').min(1,'The field must be at least 3 characters long'),
    });
    const FormSubmit = (values:FormSubmitType) =>{
        dispatch(actionAddPost({
            profileID:userID,
            message:values.message
        }));
    };
    const FormKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>,handleSubmit:()=> void) =>{
        if(e.keyCode===13) {
            e.preventDefault();
            handleSubmit();
        }
        if(e.keyCode == 13 && (e.ctrlKey || e.metaKey)){
        }
    };
    return (
        <div className="profile-form">
            <Formik
                initialValues={{ message: ''}}
                validationSchema={valSchema}
                onSubmit={(values,{resetForm}) => {
                    FormSubmit(values);
                    resetForm()
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                        <textarea name={"message"} placeholder={"Write your message here"} onKeyDown={(e)=>FormKeyDown(e,handleSubmit)} onChange={handleChange} onBlur={handleBlur} value={values.message} className="textarea"/>
                        <button  type={"submit"} className="btn">Post message</button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

export default ProfileForm;