import React, {FC} from 'react';
import ProfileForm from "./ProfileForm";
import {useSelector} from "react-redux";
import Preloader from "../Preloader";
import {selectProfile, selectProfileLoading} from "../../selectors/selectors";


const ProfileContent:FC = ({}) => {
    const {status,city,lang} = useSelector(selectProfile);
    const isLoading = useSelector(selectProfileLoading);
    if(isLoading) return <div className="profile__content"><Preloader/></div>;
    return (
        <div className="profile__content">
            <div className="profile__info block">
                <h2>Information</h2>
                <div className="profile__info-wrap">
                    <div className="profile__info-item">
                        <span>{status}</span>
                    </div>
                    <div className="profile__info-item">
                        <span>City:</span> {city}
                    </div>
                    <div className="profile__info-item">
                        <span>Language:</span> {lang}
                    </div>
                </div>
            </div>
            <div className="profile-form block">
                <ProfileForm/>
            </div>
        </div>
    );
};

export default ProfileContent;