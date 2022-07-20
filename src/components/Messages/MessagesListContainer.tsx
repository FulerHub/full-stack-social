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

export default connect(mapStateToProps, {
    deleteMessage:actionDeletePost,
    updateMessage:actionUpdatePost
})(MessagesList);