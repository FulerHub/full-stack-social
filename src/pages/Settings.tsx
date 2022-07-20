import React, {FC} from 'react';
import {Formik} from "formik";
import Input from "../components/Input";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateSetting, actionUploadAvatar} from "../redux/reducers/authReducer";
import {serverImageUrl} from "../api/api";
import {Select, Switch} from "antd";
import {selectAuthReducer} from "../selectors/selectors";


interface SettingsFormikType {
    status: string;
    city:string
    lang: string;
    name: string;
    groupList:string
    mood: number;
    moodAvatar: string
    isLocked: boolean
}

const Settings:FC = () => {
    const dispatch = useDispatch<any>();
    const valSchema = yup.object().shape({
        name: yup.string().typeError('This field only accepts text').min(3,'The field must be at least 3 characters long'),
    });
    const FormSubmit = (values:SettingsFormikType) =>{
        dispatch(actionUpdateSetting(values));
    };
    const handleFile = (e:React.ChangeEvent<HTMLInputElement>) =>{
        let formData = new FormData();
        formData.append("file",  e.target.files![0]);
        dispatch(actionUploadAvatar(formData));
    };

    const {name, avatar, status, lang, city, groupList, mood, moodAvatar, isLocked} = useSelector(selectAuthReducer);
    return (
        <div className={"settings content"}>
            <h1>Settings</h1>
            <div className={'camera'}>
                <img src={serverImageUrl+avatar} alt=""/>
                <label htmlFor="avatar">
                    <div className="camera__body">
                        <i className="fa fa-camera" aria-hidden="true"/>
                    </div>

                </label>
                <input id={'avatar'} name={'file'} type="file" onChange={handleFile}/>

            </div>
            <Formik
                initialValues={{
                    status:status,
                    city: city,
                    lang: lang,
                    name: name,
                    groupList: groupList,
                    mood:  mood,
                    moodAvatar:moodAvatar ,
                    isLocked: isLocked
                }}
                validationSchema={valSchema}
                onSubmit={(values) => FormSubmit(values)}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>

                        <Input name={"name"} type={"text"} placeholder={"Login"} onChange={handleChange} onBlur={handleBlur} value={values.name} message={errors.name && touched.name && errors.name}/>
                        <Input name={"status"} type={"text"} placeholder={"Your status"} onChange={handleChange} onBlur={handleBlur} value={values.status} message={errors.status && touched.status && errors.status}/>
                        <Input name={"city"} type={"text"} placeholder={"Your city"} onChange={handleChange} onBlur={handleBlur} value={values.city} message={errors.city && touched.city && errors.city}/>
                        <Input name={"lang"} type={"text"} placeholder={"Language"} onChange={handleChange} onBlur={handleBlur} value={values.lang} message={errors.lang && touched.lang && errors.lang}/>
                        <div className="input-block">
                            <Select placeholder={"Telegram groups (nameGroup1,nameGroup2,nameGroup3)"} open={false} autoClearSearchValue size={'large'} mode="tags" style={{ width: '100%' }} defaultValue={(groupList) ? groupList.split(',') : []} onChange={(value:any)=>values.groupList=value.join(',')} tokenSeparators={[',']}/>
                        </div>
                        <div className="input-block">
                            <Switch checkedChildren="Private profile" unCheckedChildren="Public profile" defaultChecked={isLocked} onChange={(value:boolean)=>values.isLocked=value} />
                        </div>

                      {/*  <Input name={"mood"} type={"text"} placeholder={"Mood(test)"} onChange={handleChange} onBlur={handleBlur} value={values.mood} message={errors.mood && touched.mood && errors.mood}/>
                        <Input name={"moodAvatar"} type={"text"} placeholder={"Mood(test)"} onChange={handleChange} onBlur={handleBlur} value={values.mood} message={errors.mood && touched.mood && errors.mood}/>
*/}
                       {/* <Switch defaultChecked onChange={onChange} />
    */}
                       <div className="input-block">
                            <button type="submit" className="btn" >Save</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Settings;