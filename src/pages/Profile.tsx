import React, {FC} from "react";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import PostsListContainer from "../components/Profile/PostsListContainer";
import {Navigate, useParams} from "react-router";
import { useSelector} from "react-redux";
import {selectMyID} from "../selectors/selectors";

interface ProfileType {
}

const Profile:FC<ProfileType> = () => {
    let {userID} = useParams();
    const myID = useSelector(selectMyID);
    if(Number(userID) == myID) return <Navigate to="/"/>;
    return (
        <div className={"profile"}>
            <div className="profile__wrap">
                <ProfileSidebar />
                <ProfileContent/>
            </div>
            <div className="profile__posts">
                <div className={"block"}>
                    <PostsListContainer userID={userID ? Number(userID) : myID}/>
                </div>
            </div>
        </div>
    );
};

export default Profile;