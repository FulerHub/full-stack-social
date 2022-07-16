import React from 'react';
import {connect} from "react-redux";
import MessagesList from "./MessagesList";
import {actionDeletePost, actionUpdatePost} from "../../redux/reducers/postsReducer";

const mapStateToProps = (state:any) => ({
    messages: state.messageReducer.messages,
    loading: state.messageReducer.isLoading
});

const mapDispatchToProps = (dispatch:any) =>({
    deleteMessage(id:number){
        dispatch(actionDeletePost(id));
    },
    updateMessage(values:any){
        dispatch(actionUpdatePost(values));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);