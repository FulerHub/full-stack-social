import {message} from "antd";
//import {ThunkAction} from "redux-thunk";

import {MessagesAPI} from "../../api/MessagesAPI/api";
import {DialogsAPI} from "../../api/DialogsAPI/api";
import {InfoMessagesType, MessagesType} from "../../untill/types";

export interface messageReducerType{
    isLoading: boolean;
    messages:MessagesType[],
    info:InfoMessagesType
}


let initialState = {
    isLoading: false,
    messages:[],
    info:{}
};
type defaultStateType = typeof initialState
export const LOAD_MESSAGES = "LOAD_MESSAGES";
export const LOAD_INFO_MESSAGE = "LOAD_INFO_MESSAGE";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const SET_MESSAGES_LOADING = "SET_MESSAGES_LOADING";

const messageReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'LOAD_MESSAGES':
            return {
                ...state,
                messages: action.payload.messages
            };
        case 'LOAD_INFO_MESSAGE':
            return {
                ...state,
                info: action.payload.info
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages:[...state.messages, action.payload]
            };
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                messages:state.messages.map((item:any) => item.id === action.payload.id ? {
                    ...item,
                    message: action.payload.message
                } : item)
            };
        case 'DELETE_MESSAGE':
            return {
                ...state,
                messages: state.messages.filter((item:any) => item.id !== action.payload.id)
            };
        case 'SET_MESSAGES_LOADING':
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
};

const actions = {
    setLoading: (payload:any):any => ({type: SET_MESSAGES_LOADING, payload}),
    setMessages: (payload:any):any => ({type: LOAD_MESSAGES, payload}),
    setInfoDialog: (payload:any):any => ({type: LOAD_INFO_MESSAGE, payload}),
    addMessage: (payload:any):any => ({type: ADD_MESSAGE, payload}),
    updateMessage: (payload:any):any => ({type: UPDATE_MESSAGE, payload}),
    deleteMessage: (payload:any):any => ({type: DELETE_MESSAGE, payload}),
};

export const actionGetMessages = (dialog:any):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await MessagesAPI.getMessages(dialog);
        if(res.status === 200){
            dispatch(actions.setMessages({ messages: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    finally {
        dispatch(actions.setLoading({isLoading: false}));
    }

};
export const actionGetDialogInfo = (dialog:any):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await DialogsAPI.getDialog(dialog);
        if(res.status === 200){
            dispatch(actions.setInfoDialog({ info: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    finally {
        dispatch(actions.setLoading({isLoading: false}));
    }
};

export const actionAddMessage = (values:any):any => async (dispatch:any) =>{
    try{
        dispatch(actions.addMessage(values));
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`);
    }
};

export const actionUpdateMessage = (values:any):any => async (dispatch:any) =>{
    try{
        const res = await MessagesAPI.updateMessage(values.id,values.message);
        if(res.status === 200){
            dispatch(actions.updateMessage(values));
            message.success("Post update");
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`);
    }
};

export const actionDeleteMessage = (id:number):any => async (dispatch:any) =>{
    try{
        const res = await MessagesAPI.deleteMessage(id);
        if(res.status === 200){
            dispatch(actions.deleteMessage({id}));
            message.success("Post delete");
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`);
    }
};

export default messageReducer;
