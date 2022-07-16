import {message} from "antd";
//import {ThunkAction} from "redux-thunk";

import {PostsAPI} from "../../api/PostsAPI/api";

let initialState = {
    isLoading: true,
    posts:[],

};
type defaultStateType = typeof initialState
export const LOAD_POSTS = "LOAD_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const SET_POSTS_LOADING = "SET_POSTS_LOADING";

const postsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'LOAD_POSTS':
            return {...state, posts: action.payload.posts}
        case 'ADD_POST':
            return {...state, posts:[action.payload,...state.posts]}
        case 'UPDATE_POST':
            return {...state, posts:state.posts.map((item:any) => item.id === action.payload.id ? {...item, message: action.payload.message } : item) }
        case 'DELETE_POST':
            return {...state, posts: state.posts.filter((item:any) => item.id !== action.payload.id)}
        case 'SET_POSTS_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        default:
            return state;
    }
}

const actions = {
    setLoading: (payload:any):any => ({type: SET_POSTS_LOADING, payload}),
    setPosts: (payload:any):any => ({type: LOAD_POSTS, payload}),
    addPost: (payload:any):any => ({type: ADD_POST, payload}),
    updatePost: (payload:any):any => ({type: UPDATE_POST, payload}),
    deletePost: (payload:any):any => ({type: DELETE_POST, payload}),
};

export const actionGetPosts = (user:any):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await PostsAPI.getPosts(user);
        if(res.status === 200){
            dispatch(actions.setPosts({ posts: res.data.reverse()}))
            message.success("Posts received")
        }
    }
    catch (error:any) {

    }
    dispatch(actions.setLoading({isLoading: false}));
};

export const actionAddPost = (values:any):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const profileID = values.profileID ? values.profileID : 0;
        const res = await PostsAPI.addPost(profileID,values.message)
        if(res.status === 200){
            dispatch(actions.addPost(res.data))
            message.success("Post add")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export const actionUpdatePost = (values:any):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await PostsAPI.updatePost(values.id,values.message)
        if(res.status === 200){
            dispatch(actions.updatePost(values));
            message.success("Post update")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export const actionDeletePost = (id:number):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await PostsAPI.deletePost(id);
        if(res.status === 200){
            dispatch(actions.deletePost({id}));
            message.success("Post delete")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export default postsReducer;
