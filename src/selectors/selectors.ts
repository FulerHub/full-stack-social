import {createSelector} from "reselect";
import {RootStateType} from "../redux/store";

export const selectAuthReducer = (state:RootStateType) => state.authReducer;

export const selectMyID = (state:RootStateType) => state.authReducer.id;
export const selectIsAuth = (state:RootStateType) => state.authReducer.auth;
export const selectLoadingAuth = (state:RootStateType) => state.authReducer.loadingAuth;
export const selectGroupList = (state:RootStateType) => state.authReducer.groupList;


export const selectUsersReducer = (state:RootStateType) => state.usersReducer;
export const selectUsers = (state:RootStateType) => state.usersReducer.users;


export const selectMessageInfo = (state:RootStateType) => state.messageReducer.info;
export const selectMessageLoading = (state:RootStateType) => state.messageReducer.isLoading;
export const selectMessages = (state:RootStateType) => state.messageReducer.messages;

export const selectGetDialogs = (state:RootStateType) => state.dialogsReducer.dialogs;
export const selectDialogsLoading = (state:RootStateType) => state.dialogsReducer.isLoading;
export const selectDialogsActive = (state:RootStateType) => state.dialogsReducer.activeDialog;


export const selectPosts = (state:RootStateType) => state.postsReducer.posts;
export const selectPostsLoading = (state:RootStateType) => state.postsReducer.isLoading;

export const selectProfileReducer = (state:RootStateType) => state.profileReducer;

export const selectProfile = (state:RootStateType) => state.profileReducer.profile;
export const selectProfileLocked = (state:RootStateType) => state.profileReducer.profile.isLocked;
export const selectProfileID = (state:RootStateType) => state.profileReducer.profile.id;
export const selectProfileLoading = (state:RootStateType) => state.profileReducer.isLoading;


export const selectSubscribers = (state:RootStateType) => state.subscribersReducer.subscribers;
export const selectSubscribersLoading = (state:RootStateType) => state.subscribersReducer.isLoading;

export const selectSubscriptions = (state:RootStateType) => state.subscribersReducer.subscriptions;

export const selectTelegramReducer = (state:RootStateType) => state.telegramReducer;


export const selectUsersListData = createSelector(selectUsers,selectSubscriptions, (users,subscriptions)=>{
    let subscriptionsArray = subscriptions.map((item)=>item.profileid);
    return users.map((item)=>{
        return {
            id: item.id,
            linkID: item.id,
            name: item.name,
            city: item.city,
            avatar: item.avatar,
            isFriend: (subscriptionsArray.indexOf(item.id) !== -1)
        }
    })
});

export const selectSubscriptionsList = createSelector(selectSubscriptions, (subscriptions)=>{
    return subscriptions.map((item)=>{
        return {
            id: item.id,
            linkID: item.profileid,
            userid:item.userid,
            profileid: item.profileid,
            name: item.subsProfile.name,
            city: item.subsProfile.city,
            avatar: item.subsProfile.avatar,
            isFriend: true
        }
    })
});

export const selectSubscribersList = createSelector(selectSubscribers,selectSubscriptions, (subscribers,subscriptions)=>{
    let subscriptionsArray = subscriptions.map((item:any)=>item.profileid);
    return subscribers.map((item)=>{
        return {
            id: item.id,
            linkID: item.userid,
            userid:item.userid,
            profileid: item.profileid,
            name: item.subsUser.name,
            city: item.subsUser.city,
            avatar: item.subsUser.avatar,
            isFriend: (subscriptionsArray.indexOf(item.userid) !== -1)
        }
    })
});