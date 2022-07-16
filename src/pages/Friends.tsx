import React, {FC, useEffect, useState} from 'react';
import UsersList from "../components/Users/UsersList";
import UsersForm from "../components/Users/UsersForm";
import {useDispatch, useSelector} from "react-redux";
import {actionGetSearchUsers, actionGetUsers} from "../redux/reducers/usersReducer";
import {
    actionGetMySubs,
    actionGetSubscribers,
    actionSubscribe,
    actionUnsubscribe
} from "../redux/reducers/subscribersReducer";
import {selectMyID, selectSubscribersList, selectSubscriptionsList, selectUsersListData} from "../selectors/selectors";


const Friends:FC = () => {
    const [tab,setTab] = useState<any>(1);
    const user = useSelector<any,any>(selectMyID);
    const {totalUsers,isLoading} = useSelector<any,any>(state => state.usersReducer);
    const isLoadingSub = useSelector<any,any>(state => state.subscribersReducer.isLoading);
    const usersListData = useSelector(selectUsersListData);
    const subscriptionsListData = useSelector(selectSubscriptionsList);
    const subscribersListData = useSelector(selectSubscribersList);


    const dispatch = useDispatch<any>();
    useEffect(()=>{
        dispatch(actionGetUsers());
        dispatch(actionGetSubscribers(user));
        dispatch(actionGetMySubs());
    },[]);
    const pagination = (id:number)=>{
        dispatch(actionGetUsers(id-1))
    };
    const handleSubscribe = (userID:number,type:boolean)=>{
        dispatch((type) ? actionUnsubscribe(userID) : actionSubscribe(userID));
    };

    const handleSearch = (value:string)=>{
        dispatch(actionGetSearchUsers(value));
    };

    return (
        <div className="content">
            <UsersForm FormSubmit={handleSearch} FormChange={handleSearch}/>
            <div className="tab">
                <div className={"tab__menu"}>
                    <a href="#" onClick={()=>setTab(1)} className="btn">All</a>
                    <a href="#" onClick={()=>setTab(2)} className="btn">Subscribers</a>
                    <a href="#" onClick={()=>setTab(3)} className="btn">Subscriptions</a>
                </div>
                <div className="tab__content">
                    {tab === 1 && <UsersList users={usersListData} handleSubscribe={handleSubscribe} pagination={pagination} totalCount={totalUsers} loading={isLoading}/>}
                    {tab === 2 && <UsersList users={subscribersListData} handleSubscribe={handleSubscribe} loading={isLoadingSub}/>}
                    {tab === 3 && <UsersList users={subscriptionsListData} handleSubscribe={handleSubscribe} loading={isLoadingSub}/>}
                </div>
            </div>


        </div>
    );
};

export default Friends;