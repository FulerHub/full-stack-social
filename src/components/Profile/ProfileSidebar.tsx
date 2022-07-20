import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useParams} from "react-router";
import {
    actionGetProfile,
    actionGetProfileSubscribers,
    actionSubscribe,
    actionUnsubscribe
} from "../../redux/reducers/profileReducer";
import {serverImageUrl} from "../../api/api";
import {actionCreateDialog} from "../../redux/reducers/dialogsReducer";
import Preloader from "../Preloader";
import {selectDialogsActive, selectMyID, selectProfileReducer} from "../../selectors/selectors";

interface ValueType {
    dialogid:number;
}
interface ProfileSidebarType {
    //wsSendEcho: (action:string,value:ValueType) => void
}


const ProfileSidebar:FC<ProfileSidebarType> = ({}) => {
    let {userID} = useParams();
    const dispatch = useDispatch<any>();
    const myID = useSelector(selectMyID);
    const {isLoading,profile,subscribers} = useSelector(selectProfileReducer);
    const currentID = userID ? Number(userID) : myID;
    useEffect(()=>{
        dispatch(actionGetProfile(currentID));
        dispatch(actionGetProfileSubscribers(currentID));
    },[userID]);

    const activeDialog = useSelector(selectDialogsActive);

    const isSubscribe = subscribers.find((item)=>item.userid === myID);

    const handleClick = (type:boolean)=>{
        dispatch((type) ? actionUnsubscribe(userID) : actionSubscribe(userID));
    };
    const handleClickDialog = ()=>{
        dispatch(actionCreateDialog(currentID));
    };
    const websocket = useSelector<any,any>(state => state.authReducer.websocket);
    if(activeDialog !== null){
        websocket.send(JSON.stringify({action:'load_dialog', data:{dialogid:activeDialog![0].dialogid}}));

        return <Navigate to={userID? '/dialogs/'+activeDialog![0].dialogid : '/'} />
    }
    if(isLoading) return <div className="profile__sidebar"><Preloader/></div>;
    return (
        <div className="profile__sidebar">
            <div className="profile__avatar">
                <img src={profile.avatar && serverImageUrl+profile.avatar } alt=""/>
            </div>

            <div className="profile__buttons">
                <h1>{profile.name}</h1>
                <ul className={"menu profile__menu"}>
                    <li className={"profile__friends"}>Subscribers: <span>{subscribers.length}</span></li>
                    {userID ? <li className={"profile__add-friends"}>
                            { isSubscribe ?
                                <a style={{backgroundColor:'#4d1818'}}  onClick={()=>handleClick(true)} > Unsubscribe</a>
                                : <a style={{backgroundColor:'#219108'}} onClick={()=>handleClick(false)} > Subscribe</a>
                            }
                    </li>: ""}
                    {userID ? <li className={"profile__send-message"}><a onClick={handleClickDialog}>Send Message</a></li>: ""}
                </ul>
            </div>
        </div>
    );
};

export default ProfileSidebar;