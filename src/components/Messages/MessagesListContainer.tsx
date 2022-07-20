import React from 'react';
import {connect} from "react-redux";
import MessagesList from "./MessagesList";
import {actionDeletePost, actionUpdatePost} from "../../redux/reducers/postsReducer";
import {RootStateType} from "../../redux/store";
import {selectMessageLoading, selectMessages} from "../../selectors/selectors";

const mapStateToProps = (state:RootStateType) => ({
    messages: selectMessages(state),
    loading: selectMessageLoading(state)
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