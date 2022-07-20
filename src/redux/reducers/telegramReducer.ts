import {message} from "antd";
import {TelegramAPI} from "../../api/TelegramAPI/api";
import {TelegramType} from "../../untill/types";

export interface TelegramReducerType{
    isLoading: boolean;
    posts: TelegramType[]
}

let initialState = {
    isLoading: true,
    posts: []
};
type defaultStateType = typeof initialState
export const LOAD_TELEGRAM = "LOAD_TELEGRAM";
export const SET_TELEGRAM_LOADING = "SET_TELEGRAM_LOADING";

const telegramReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'LOAD_TELEGRAM':
            return {...state, posts: action.payload.posts}
        case 'SET_TELEGRAM_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        default:
            return state;
    }
};

const actions = {
    setLoading: (payload:any):any => ({type: SET_TELEGRAM_LOADING, payload}),
    loadTelegram: (payload:any):any => ({type: LOAD_TELEGRAM, payload}),
};

export const actionGetTelegram = (groupList: string):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await TelegramAPI.getPosts(groupList);
        if(res.status === 200){
            dispatch(actions.loadTelegram({ posts: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export default telegramReducer;