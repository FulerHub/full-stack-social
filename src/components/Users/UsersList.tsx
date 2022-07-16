import React, {FC} from 'react';
import UserItem from "./UserItem";
import Pagination from "../Pagination";
import NoResult from "../NoResult";
import Preloader from "../Preloader";
import {UserType} from "../../untill/types";

interface UsersListType {
    pagination?:(id:number)=> void;
    handleSubscribe:(userID:number,type:boolean) => void;
    loading?: boolean;
    users: UserType[];
    totalCount?: number;
}

const UsersList:FC<UsersListType> = ({pagination,handleSubscribe,loading,users,totalCount}) => {
    if(loading) return <div className="users"><Preloader/></div>;
    return (
        <div className="users">
            {
                users.length>0 ?
                    users.map((item)=>
                        <UserItem
                            key={item.id}
                            id={(item.linkID) ? item.linkID : -1}
                            img={item.avatar}
                            name={item.name}
                            city={(item.city) ? item.city : ''}
                            handleSubscribe={handleSubscribe}
                            isFriend={(item.isFriend) ? item.isFriend : false}
                        />) : <NoResult header="Ups..." message="There are no results for your request"/>
            }
            {pagination && totalCount &&  <Pagination totalItems={totalCount} itemsPerPage={9} pagination={pagination}/>}
        </div>
    );
};

export default UsersList;