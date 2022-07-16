import {message} from "antd";
import {ThunkAction} from "redux-thunk";

import {UsersAPI} from "../../api/UsersAPI/api";
import {SubscribersAPI} from "../../api/SubcribersAPI/api";

let initialState = {
    isLoading: true,
    profile:[],
    subscribers:[]

};
type defaultStateType = typeof initialState
export const LOAD_PROFILE = "LOAD_PROFILE";
export const LOAD_PROFILE_SUBS = "LOAD_PROFILE_SUBS";
export const SET_PROFILE_LOADING = "SET_PROFILE_LOADING";
export const ADD_PROFILE_SUBS = "ADD_PROFILE_SUBS";
export const DELETE_PROFILE_SUBS = "DELETE_PROFILE_SUBS";

const profileReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'LOAD_PROFILE':
            return {...state, profile: action.payload.profile}
        case 'LOAD_PROFILE_SUBS':
            return {...state, subscribers: action.payload.subscribers}
        case 'ADD_PROFILE_SUBS':
            return {...state, subscribers: [action.payload,...state.subscribers] }
        case 'DELETE_PROFILE_SUBS':
            return {...state, subscribers: state.subscribers.filter((item:any)=> item.userid !== action.payload.id ) }
        case 'SET_PROFILE_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        default:
            return state;
    }
};

const actions = {
    setLoading: (payload:any):any => ({type: SET_PROFILE_LOADING, payload}),
    setProfile: (payload:any):any => ({type: LOAD_PROFILE, payload}),
    setSubs: (payload:any):any => ({type: LOAD_PROFILE_SUBS, payload}),
    addSubs: (payload:any):any => ({type: ADD_PROFILE_SUBS, payload}),
    deleteSubs: (payload:any):any => ({type: DELETE_PROFILE_SUBS, payload}),
};

export const actionGetProfile = (userid:number):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await UsersAPI.getUser(userid);
        if(res.status === 200){
            dispatch(actions.setProfile({ profile: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};
export const actionGetProfileSubscribers = (userid:number):any => async (dispatch:any) =>{
    try{
        const res = await SubscribersAPI.getSubscribersUser(userid);
        if(res.status === 200){

            dispatch(actions.setSubs({ subscribers: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};
export const actionUnsubscribe = (user:any):any => async (dispatch:any) =>{
    try{
        const res = await SubscribersAPI.deleteSubscriber(user);
        if(res.status === 200){
            dispatch(actions.deleteSubs({ id: res.data.userid}))
            message.success("Unsubscribe")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};

export const actionSubscribe = (user:any):any => async (dispatch:any) =>{
    try{
        const res = await SubscribersAPI.addSubscriber(user);
        if(res.status === 200){
            dispatch(actions.addSubs(res.data));
            message.success("Subscriber")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }

};

export default profileReducer;
