import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import authReducer, {authReducerType} from "./reducers/authReducer";
import dialogsReducer, {dialogsReducerType} from "./reducers/dialogsReducer";
import usersReducer, {usersReducerType} from "./reducers/usersReducer";
import subscribersReducer, {subscribersReducerType} from "./reducers/subscribersReducer";
import postsReducer, {postsReducerType} from "./reducers/postsReducer";
import profileReducer, {profileReducerType} from "./reducers/profileReducer";
import messageReducer, {messageReducerType} from "./reducers/messageReducer";
import telegramReducer, {TelegramReducerType} from "./reducers/telegramReducer";

export interface RootStateType {
    authReducer: authReducerType;
    dialogsReducer: dialogsReducerType;
    usersReducer: usersReducerType;
    postsReducer: postsReducerType;
    profileReducer: profileReducerType;
    subscribersReducer: subscribersReducerType;
    messageReducer: messageReducerType;
    telegramReducer: TelegramReducerType;
}

const rootReducer = combineReducers({
    authReducer: authReducer,
    dialogsReducer: dialogsReducer,
    usersReducer: usersReducer,
    postsReducer: postsReducer,
    profileReducer: profileReducer,
    subscribersReducer: subscribersReducer,
    messageReducer: messageReducer,
    telegramReducer: telegramReducer
});


export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); //composeWithDevTools