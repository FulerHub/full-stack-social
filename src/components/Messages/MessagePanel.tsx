import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {serverImageUrl} from "../../api/api";
import {getNameLastTime} from "../../untill/scripts";

const MessagePanel:FC = ({}) => {
    const userDialog = useSelector<any,any>(state => state.messageReducer.info);
    const date = Math.ceil((Date.now() - userDialog?.User?.date)/1000/60);
    return (
        <div className="messages-dialog">
            <div className="messages-dialog__img">
               <Link to={"/user/"+(userDialog.hasOwnProperty('User') ? userDialog.User.id : "")  }>
                    <img src={userDialog.hasOwnProperty('User') && serverImageUrl+userDialog.User.avatar } alt=""/>
                </Link>
            </div>
            <div className="messages-dialog__wrap">
                <div className="messages-dialog__name">{userDialog.hasOwnProperty('User') ? userDialog.User.name : ""}</div>
                <div className="messages-dialog__status">{getNameLastTime(date)}</div>
            </div>
        </div>
    );
};

export default MessagePanel;