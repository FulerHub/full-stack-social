import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {actionDeletePost, actionGetPosts, actionUpdatePost} from "../../redux/reducers/postsReducer";
import {
    selectMyID,
    selectPosts,
    selectPostsLoading,
    selectProfileID,
    selectProfileLocked
} from "../../selectors/selectors";
import {RootStateType} from "../../redux/store";

const mapStateToProps = (state:RootStateType) => ({
    posts: selectPosts(state),
    myID: selectMyID(state),
    loading: selectPostsLoading(state),
    isLocked: selectProfileLocked(state),
    profileid: selectProfileID(state)
});

const mapDispatchToProps = (dispatch:any) =>({
    getPost(user:number){
        dispatch(actionGetPosts(user));
    },
    delPost(id:number){
        dispatch(actionDeletePost(id));
    },
    updatePost(values:any){
        dispatch(actionUpdatePost(values));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);