import {message} from "antd";
import {AuthAPI} from "../../api/AuthAPI/api";
import {ThunkAction} from "redux-thunk";
import {createSound} from "../../untill/scripts";
import {actionUpdateDialog} from "./dialogsReducer";
import {actionAddMessage} from "./messageReducer";

export interface authReducerType{
    auth: boolean;
    id: number;
    email: string;
    name: string;
    status: string;
    city: string;
    lang: string;
    avatar: string;
    mood: number;
    moodAvatar: string;
    groupList: string;
    isLocked:boolean;
    loadingAuth: boolean;
    websocket: any
}

let initialState = {
    auth: false,
    id: 0,
    email:null,
    name:null,
    status: null,
    city: null,
    lang: null,
    avatar:null,
    mood:null,
    moodAvatar:null,
    groupList:null,
    isLocked:false,
    loadingAuth: false,
    websocket: null
};

type defaultStateType = typeof initialState
export const GET_AUTH = "GET_AUTH";
export const SET_AUTH = "SET_AUTH";
export const SET_LOADING_AUTH = "SET_LOADING_AUTH";
export const SET_WEBSOCKET = "SET_WEBSOCKET";
//export const CLOSE_WEBSOCKET = "CLOSE_WEBSOCKET";

type ThunkType = ThunkAction<Promise<void>, defaultStateType, unknown, any>

const authReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'GET_AUTH':
            return {
                ...state,
                ...action.payload
            };
        case 'SET_AUTH':
            return {
                ...state,
                auth: true
            };
        case 'SET_LOADING_AUTH':
            return {
                ...state,
                loadingAuth: action.payload.loadingAuth
            };
        case 'SET_WEBSOCKET':
            return {
                ...state,
                websocket: action.payload
            };
        default:
            return state;
    }
};

const actions = {
    getAuth: (payload:any):any => ({type: GET_AUTH, payload}),
    setAuth: (payload:any):any => ({type: SET_AUTH, payload}),
    setLoading: (payload:any):any => ({type: SET_LOADING_AUTH, payload}),
    setWebsocket: (payload:any):any => ({type: SET_WEBSOCKET, payload}),
};
export const createWebsocket = ():ThunkType => async (dispatch,getState)=>{
    try {
        let socket = new WebSocket('wss://websocket.river-fuler.space');
        socket.onopen = ()=>{
            console.log('Socket open');
            socket.send(JSON.stringify({
                action:'onLoad',
                data: {
                    token:localStorage.getItem('token')
                }
            }));
        };
        socket.onmessage = (response:any)=>{
            let responseData = JSON.parse(response.data);
            switch (responseData.action) {
                case "add_message":
                    // @ts-ignore
                    const {authReducer,messageReducer} = getState();
                    dispatch(actionUpdateDialog(responseData.data));
                    if(messageReducer.info.dialogid === Number(responseData.data.dialogid)){
                        dispatch(actionAddMessage(responseData.data));
                    }
                    if(responseData.data.userid !== authReducer.id){
                        let path = window.location.pathname.match(/dialogs\/[0-9]/g);
                        if(path === null){
                            message.info(`${responseData.data?.User.name}: ${responseData.data?.message}`)
                        }
                        createSound("/assets/sounds/message_sound.wav");
                    }
                    break;
            }
        };
        socket.onclose = ()=>{
            console.log('close')
        };
        dispatch(actions.setWebsocket(socket))
    }catch (e) {

    }
}
export const checkToken = ():ThunkType => async (dispatch) =>{
    try{
        const token = localStorage.getItem('token');
        if(!token) throw '';
        const res = await AuthAPI.checkAuth(token);
        if(res.status === 200)
        {
            const {id, email, name, status,city,lang, avatar,mood,moodAvatar,groupList,isLocked} = res.data;
            dispatch(actions.getAuth({
                auth: true,
                id, email, name, status, city, lang, avatar, mood, moodAvatar, groupList, isLocked
            }))
        }
    }
    catch (error:any)
    {
        localStorage.removeItem('token');
       // message.error(`${error.response.data.message}`)
    }
    finally {
        dispatch(actions.setLoading({loadingAuth: true}));
    }

};
export const actionLogin = (email:string, password:string):ThunkType => async (dispatch) =>{
    try{
        const res = await AuthAPI.getAuth(email, password);
        if(res.status === 200){
            const {id, email,name,status,city,lang, token,avatar,mood,groupList,moodAvatar,isLocked} = res.data;
            localStorage.setItem('token',token);
            dispatch(actions.getAuth({
                auth: true,
                id, email, name, status, city, lang, avatar, mood, moodAvatar, groupList, isLocked
            }));
            message.success("You're logged in")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};

export const actionLogout = ():ThunkType => async (dispatch,getState) =>{
    try {
        localStorage.removeItem('token');
        // @ts-ignore
        const {authReducer} = getState();
        authReducer.websocket.close();
        dispatch(actions.getAuth({
            auth: false,
            id: null,
            email:null,
            name:null,
            status: null,
            city: null,
            lang: null,
            avatar:null,
            mood:null,
            moodAvatar:null,
            groupList:null,
            isLocked:false,
            websocket: null
        }));
        message.success("You're logout")
    }catch (error:any) {
        message.error(`${error.response.data.message}`);
    }

};

export const actionRegister = (login:string, email: string, password:string):ThunkType => async dispatch =>{
    message.loading({content: 'Register...', key: 'setting'});
    try{
        const res = await AuthAPI.setAuth(login, password, email);
        if(res.status === 200){
            const {id, email,name,status,city,lang, token,avatar,mood,moodAvatar,groupList,isLocked} = res.data;
            localStorage.setItem('token', token);
            dispatch(actions.getAuth({
                auth: true,
                id, email, name, status, city, lang, avatar, mood, moodAvatar, groupList, isLocked
            }));
            message.success("You're sign up")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`);
    }
};

export const actionUpdateSetting = (values:any):ThunkType => async dispatch =>{
    message.loading({content: 'Update...', key: 'setting'});
    try{
        const res = await AuthAPI.setSetting(values.city,values.status,values.lang,values.name,values.groupList,values.isLocked);
        if(res.status === 200){
            const {id, email,name,status,city,lang,avatar,groupList,mood,moodAvatar,isLocked} = res.data;
            dispatch(actions.getAuth({
                auth: true,
                id, email, name, status, city, lang, avatar, mood, moodAvatar, groupList, isLocked
            }));
            message.success({content:"Settings update", key: 'setting'});
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};

export const actionUploadAvatar = (file:FormData):ThunkType => async dispatch =>{
    message.loading({content: 'Upload...', key: 'setting'});
    try{
        const res = await AuthAPI.setAvatar(file);
        if(res.status === 200){
            const {id, email,name,avatar} = res.data;
            dispatch(actions.getAuth({
                auth: true,
                id, email, name, avatar
            }));
            message.success({content: "Avatar upload", key: 'setting'});
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};

export default authReducer;