import {createSelector} from "reselect";

export const selectMyID = (state:any) => state.authReducer.id;

export const selectUsers = (state:any) => state.usersReducer.users;

export const selectSubscribers = (state:any) => state.subscribersReducer.subscribers;

export const selectSubscriptions = (state:any) => state.subscribersReducer.subscriptions;

export const selectUsersListData = createSelector(selectUsers,selectSubscriptions, (users,subscriptions)=>{
    let subscriptionsArray = subscriptions.map((item:any)=>item.profileid);
    return users.map((item:any)=>{
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
    return subscriptions.map((item:any)=>{
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
    return subscribers.map((item:any)=>{
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