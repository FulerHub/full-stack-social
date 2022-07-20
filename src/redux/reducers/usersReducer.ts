import {message} from "antd";
import {ThunkAction} from "redux-thunk";

import {UsersAPI} from "../../api/UsersAPI/api";
import {UserType} from "../../untill/types";

export interface usersReducerType{
    isLoading: boolean;
    users:UserType[],
    totalUsers:number;
}

let initialState = {
    isLoading: false,
    users:[],
    totalUsers:0

};
type defaultStateType = typeof initialState
export const LOAD_USERS = "LOAD_USERS";
export const SET_LOADING = "SET_LOADING";


//type ActionsTypes = getUsersActionType |getLoadingActionType;

type ThunkType = ThunkAction<Promise<void>, defaultStateType, unknown, any>

const usersReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'LOAD_USERS':
            return {...state, users: action.payload.users, totalUsers: action.payload.totalUsers}
        case 'SET_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        default:
            return state;
    }
};

const actions = {
    setLoading: (payload:any):any => ({type: SET_LOADING, payload}),
    setUsers: (payload:any):any => ({type: LOAD_USERS, payload}),
};

export const actionGetUsers = (page=0, size=9):ThunkType => async (dispatch) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await UsersAPI.getUsers(page,size);
        if(res.status === 200){
            dispatch(actions.setUsers({ users: res.data.rows,totalUsers:res.data.count}))
            message.success("Users received")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
}
export const actionGetSearchUsers = (search:string):ThunkType => async (dispatch) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await UsersAPI.findUser(search,0,4);
        if(res.status === 200){
            dispatch(actions.setUsers({ users: res.data.rows,totalUsers:res.data.count}))
            message.success("Found's users received")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export default usersReducer;
