import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import usersReducer from "./reducers/usersReducer";
import subscribersReducer from "./reducers/subscribersReducer";
import postsReducer from "./reducers/postsReducer";
import profileReducer from "./reducers/profileReducer";
import messageReducer from "./reducers/messageReducer";
import telegramReducer from "./reducers/telegramReducer";


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

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) //composeWithDevTools


