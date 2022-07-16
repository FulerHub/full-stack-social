import React, {FC, useEffect} from 'react';
import DialogItem from "./DialogItem";

import Preloader from "../Preloader";
import {serverImageUrl} from "../../api/api";
import NoResult from "../NoResult";
import {DialogsType} from "../../untill/types";
interface DialogListType {
    dialogs: DialogsType[],
    loading: boolean
    getDialogs: () => void

}
const DialogList:FC<DialogListType> = ({dialogs, loading, getDialogs}) => {
    useEffect(()=>{
        getDialogs();
    },[]);

    if(loading) return <div className="messages-body"><Preloader/></div>;
    return (
        <div className="messages-body">
            {
                dialogs.length > 0 ?
                dialogs.map((item)=><DialogItem key={item.id}
                                                          img={serverImageUrl+item.avatar }
                                                          name={item.name}
                                                          date={item.date}
                                                          message={item.last.message}
                                                          userID={item.userid}
                                                          dialogID={item.dialogid}
                                                          unReaded={item?.unReadMessages}
                    />
                                                          )
                : <NoResult header={"No dialogues yet"} message={"When you create a dialog, you will see them here."}/>
            }
        </div>
    );
};

export default DialogList;