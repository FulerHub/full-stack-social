import React, {FC, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import FormDialog from "../components/FormDialog";

import MessagesListContainer from "../components/Messages/MessagesListContainer";
import {useDispatch, useSelector} from "react-redux";
import { actionGetDialogInfo, actionGetMessages} from "../redux/reducers/messageReducer";

import MessagePanel from "../components/Messages/MessagePanel";
import {actionRemoveDialog} from "../redux/reducers/dialogsReducer";
import {selectMessageInfo, selectMessageLoading} from "../selectors/selectors";
interface FormikType {
    message: string;
}
const Dialog:FC = ({}) => {
    let {pageID} = useParams();
    const dispatch = useDispatch<any>();
    const websocket = useSelector<any,any>(state => state.authReducer.websocket);
    useEffect(()=>{
        dispatch(actionGetDialogInfo(pageID));
        dispatch(actionRemoveDialog());
        dispatch(actionGetMessages(pageID));
    },[pageID]);
    const userDialog = useSelector(selectMessageInfo);

    const isLoading = useSelector(selectMessageLoading);
    const FormSubmit = (values:FormikType)=>{
        websocket.send(JSON.stringify({action:'add_message', data:{message:values.message, dialogid:pageID}}))
    };
    return (
        <div className="content">
            <div className="messages">
                <div className="messages__header">
                    <div className="messages__buttons">
                        <Link to={"/dialogs"}><i className="fa fa-arrow-left" aria-hidden="true"/></Link>
                    </div>
                    <MessagePanel loading={isLoading} user={userDialog}/>
                </div>
                <MessagesListContainer/>
                <FormDialog FormSubmit={FormSubmit}/>
            </div>
        </div>

    );
};

export default Dialog;