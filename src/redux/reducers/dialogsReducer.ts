import {message} from "antd";
import {DialogsAPI} from "../../api/DialogsAPI/api";
import {UsersAPI} from "../../api/UsersAPI/api";

let initialState = {
    isLoading: false,
    dialogs:[],
    activeDialog: null

};
type defaultStateType = typeof initialState
export const SET_DIALOGS = "SET_DIALOGS";
export const SET_ACTIVE_DIALOG = "SET_ACTIVE_DIALOG";
export const SET_DIALOG_LOADING = "SET_DIALOG_LOADING";
export const UPDATE_DIALOG = "UPDATE_DIALOG";


const dialogsReducer = (state = initialState, action: any) => {
    switch(action.type) {//
        case 'SET_DIALOGS':
            return {...state, dialogs: action.payload.dialogs}
        case 'SET_ACTIVE_DIALOG':
            return {...state, activeDialog: action.payload.activeDialog}
        case 'UPDATE_DIALOG':
            return {...state, dialogs:state.dialogs.map((item:any) => item.dialogid === action.payload.id ? {...item, last:{userid:action.payload.userid, message: action.payload.message,lastTimeMessage: action.payload.lastTimeMessage }} : item) }
        case 'SET_DIALOG_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        default:
            return state;
    }
};

const actions = {
    setLoading: (payload:any):any => ({type: SET_DIALOG_LOADING, payload}),
    setDialogs: (payload:any):any => ({type: SET_DIALOGS, payload}),
    setActiveDialog: (payload:any):any => ({type: SET_ACTIVE_DIALOG, payload}),
    updateDialog: (payload:any):any => ({type: UPDATE_DIALOG, payload}),
};

export const actionGetDialogs = ():any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await DialogsAPI.getDialogs();
        if(res.status === 200){
            const usersList = res.data.map((item:any)=>item.userid).join(',');
            const resultUsers = await UsersAPI.getSelectUsers(usersList);
            const users:any = {};
            const status:any = {};
            const avatars:any = {};
            resultUsers.data.rows.forEach((item:any)=>{
                users[item.id] = item.name;
                status[item.id] = item.date;
                avatars[item.id] = item.avatar
            });
            const dialogs = res.data.map((item:any)=>{
                return{
                   ...item,
                    name:users[item.userid],
                    date: status[item.userid],
                    avatar:avatars[item.userid]
                }
            });
            dispatch(actions.setDialogs({ dialogs: dialogs}));
            message.success("Dialogs received")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};
export const actionUpdateDialog = (result:any):any => async (dispatch:any) =>{
    try {
        dispatch(actions.updateDialog({
            id: result.dialogid,
            message:result.message,
            userid:result.userid,
            lastTimeMessage:new Date(result.createdAt).getTime()
        }
        ))
    }
    catch (e) {

    }
};
export const actionRemoveDialog = ():any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try {
        dispatch(actions.setActiveDialog({ activeDialog: null}))
    }
    catch (e) {
        
    }
    dispatch(actions.setLoading({isLoading: false}));

};
export const actionCreateDialog = (userID:number):any => async (dispatch:any) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await DialogsAPI.addDialog(userID);
        if(res.status === 200){
           dispatch(actions.setActiveDialog({ activeDialog: res.data}))
        }
        else if(res.status === 201){
            dispatch(actions.setActiveDialog({ activeDialog: res.data}))
        }
        message.success("Dialogs received")
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};


export default dialogsReducer;
