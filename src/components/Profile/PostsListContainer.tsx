import React from 'react';
import {connect} from "react-redux";
import PostsList from "./PostsList";
import {actionDeletePost, actionGetPosts, actionUpdatePost} from "../../redux/reducers/postsReducer";
import {selectMyID} from "../../selectors/selectors";

const mapStateToProps = (state:any) => ({
    posts: state.postsReducer.posts,
    myID: selectMyID(state),
    loading: state.postsReducer.isLoading,
    isLocked: state.profileReducer.profile.isLocked,
    profileid: state.profileReducer.profile.id
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