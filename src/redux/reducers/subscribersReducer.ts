import {message} from "antd";
import {ThunkAction} from "redux-thunk";
import {SubscribersAPI} from "../../api/SubcribersAPI/api";

let initialState = {
    isLoading: false,
    subscribers:[],//подпищики
    subscriptions:[],//подписки

};
type defaultStateType = typeof initialState
export const LOAD_SUBSCRIBERS = "LOAD_SUBSCRIBERS";
export const LOAD_SUBSCRIPTIONS = "LOAD_SUBSCRIPTIONS";
export const ADD_SUBSCRIPTIONS = "ADD_SUBSCRIPTIONS";
export const DELETE_SUBSCRIPTIONS = "DELETE_SUBSCRIPTIONS";
export const SET_SUBSCRIBERS_LOADING = "SET_SUBSCRIBERS_LOADING";


//type ActionsTypes = getSubsActionType |getLoadingActionType | getSubscriptionsActionType | deleteSubscriptionsActionType |addSubscriptionsActionType;

type ThunkType = ThunkAction<Promise<void>, defaultStateType, unknown, any>

const subscribersReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'LOAD_SUBSCRIBERS':
            return {...state, subscribers: action.payload.subscribers}
        case 'LOAD_SUBSCRIPTIONS':
            return {...state, subscriptions: action.payload.subscriptions}
        case 'ADD_SUBSCRIPTIONS':
            return {...state, subscriptions: [action.payload,...state.subscriptions] }

        case 'DELETE_SUBSCRIPTIONS':
            return {...state, subscriptions: state.subscriptions.filter((item:any)=> item.profileid !== action.payload.id ) }

        case 'SET_SUBSCRIBERS_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        default:
            return state;
    }
};

const actions = {
    setLoading: (payload:any):any => ({type: SET_SUBSCRIBERS_LOADING, payload}),
    setSubscribers: (payload:any):any => ({type: LOAD_SUBSCRIBERS, payload}),
    setSubscriptions: (payload:any):any => ({type: LOAD_SUBSCRIPTIONS, payload}),
    addSubscriptions: (payload:any):any => ({type: ADD_SUBSCRIPTIONS, payload}),
    deleteSubscriptions: (payload:any):any => ({type: DELETE_SUBSCRIPTIONS, payload}),
};

export const actionGetSubscribers = (userID:any):ThunkType => async (dispatch) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await SubscribersAPI.getSubscribersUser(userID);
        if(res.status === 200){
            dispatch(actions.setSubscribers({ subscribers: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export const actionGetMySubs = ():ThunkType => async (dispatch) =>{
    dispatch(actions.setLoading({isLoading: true}));
    try{
        const res = await SubscribersAPI.getSubscribers();
        if(res.status === 200){
            dispatch(actions.setSubscriptions({ subscriptions: res.data}))
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
    dispatch(actions.setLoading({isLoading: false}));
};

export const actionUnsubscribe = (user:any):ThunkType => async (dispatch) =>{
    try{
        const res = await SubscribersAPI.deleteSubscriber(user);
        if(res.status === 200){
            dispatch(actions.deleteSubscriptions({ id: res.data.profileid}))
            message.success("Unsubscribe")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};

export const actionSubscribe = (user:any):ThunkType => async (dispatch) =>{
    try{
        const res = await SubscribersAPI.addSubscriber(user);
        if(res.status === 200){
            dispatch(actions.addSubscriptions(res.data));
            message.success("Subscriber")
        }
    }
    catch (error:any) {
        message.error(`${error.response.data.message}`)
    }
};

export default subscribersReducer;
