import React, {FC} from 'react';
import {Link} from "react-router-dom";

interface DialogItemProps {
    userID?: number;
    dialogID?: number;
    img: string;
    name: string;
    date: number;
    message: string;
    unReaded: number;
}

const DialogItem:FC<DialogItemProps> = ({name,date,unReaded,userID,dialogID,img,message}) => {
    const lastTime = Math.ceil((Date.now() - date)/1000/60);
    return (
        <div className="list__item" style={{backgroundColor: (unReaded > 0 ? "#333" : "") }}>
            <div className="list__img">
                <Link to={`/user/${userID}`}>
                    <img src={img} alt=""/>
                    {lastTime < 5 ? <div className="list__status"/> : <div style={{backgroundColor:"#ff7373"}} className="list__status"/>}
                </Link>
            </div>
            <Link to={`/dialogs/${dialogID}`}>
                <div className="list__wrap">
                    <div className="list__name">{name}</div>
                    <div className="list__content">{message}</div>
                    {unReaded > 0 && <div className="list__new"><span>{unReaded}</span></div> }
                </div>
            </Link>
        </div>
    );
};

export default DialogItem;