import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {serverImageUrl} from "../../api/api";
import {getNameLastTime} from "../../untill/scripts";
import Preloader from "../Preloader";
import {InfoMessagesType} from "../../untill/types";
//RootStateType

interface MessagePanelType {
    loading: boolean;
    user:InfoMessagesType
}

const MessagePanel:FC<MessagePanelType> = ({loading,user}) => {
    if(loading || !user.hasOwnProperty('id')) return <Preloader/>;
    const date = Math.ceil((Date.now() - Number(user?.User?.date))/1000/60);
    return (
        <div className="messages-dialog">
            <div className="messages-dialog__img">
               <Link to={`/user/${user?.User?.id}`  }>
                    <img src={serverImageUrl+user?.User?.avatar } alt=""/>
                </Link>
            </div>
            <div className="messages-dialog__wrap">
                <div className="messages-dialog__name">{user?.User?.name}</div>
                <div className="messages-dialog__status">{getNameLastTime(date)}</div>
            </div>
        </div>
    );
};

export default MessagePanel;