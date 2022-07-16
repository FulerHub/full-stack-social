import React, {FC, useEffect, useRef} from 'react';
import PostItem from "../Profile/PostItem";
import {serverImageUrl} from "../../api/api";
import NoResult from "../NoResult";
import Preloader from "../Preloader";
import {EditPostType, MessagesType} from "../../untill/types";

interface MessagesListType {
    loading: boolean;
    messages: MessagesType[];
    updateMessage: (values:EditPostType)=> void;
    deleteMessage: (id: number)=> void
}

const MessagesList:FC<MessagesListType> = ({loading,messages,updateMessage,deleteMessage}) => {
    const nameField = useRef<any>();
    useEffect(()=>{
        if(!loading){
            nameField.current.scrollTop = nameField.current.scrollHeight;
        }
    },[messages]);

    if(loading) return <div className={"message-block"}><Preloader/></div>;
    return (
        <div className={"message-block"} ref={nameField}>
            {
               messages ?
                   messages.map((item)=><PostItem
                       key={item.id}
                       id={item.id}
                       userID={item.User.id}
                       date={item.createdAt}
                       img={item.User.avatar && serverImageUrl+item.User.avatar }
                       name={item.User.name}
                       handleDelete={deleteMessage}
                       handleEdit={updateMessage}
                       message={item.message}
                   />)
                       : <NoResult header="No publications yet" message="When a user publish a post, you'll see it here."/>
            }
        </div>
    );
};

export default MessagesList;