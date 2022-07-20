import React, {FC, useEffect} from 'react';
import PostItem from "../Profile/PostItem";
import {serverImageUrl} from "../../api/api";
import NoResult from "../NoResult";
import Preloader from "../Preloader";
import {EditPostType, PostsType} from "../../untill/types";


interface PostsListType {
    loading: boolean;
    userID: number;
    profileid: number | undefined;
    myID: number;
    isLocked: boolean | undefined;
    posts: PostsType[];
    getPost: (userID:number)=> void
    updatePost: (value: EditPostType)=> void
    delPost: (id:number)=> void
}


const PostsList:FC<PostsListType> = ({loading,userID,profileid,isLocked,myID,posts,getPost,updatePost,delPost}) => {
    useEffect(()=>{
        getPost(userID);
    },[userID]);
    if(loading) return <Preloader/>;
    if(isLocked && profileid !== myID) return <NoResult header={"Profile is private"} message={"You can't see posts on this profile."}/>;
     return (
        <>
            {posts.length > 0 ?
                posts.map((item:any)=><PostItem
                    key={item.id}
                    id={item.id}
                    date={item.createdAt}
                    controlEdit={myID === item.userid}
                    controlDelete={myID === item.userid || myID === item.profileid}
                    userID={item.User.id}
                    img={item.User.avatar ? serverImageUrl+item.User.avatar :"/images/no-user.jpg"}
                    name={item.User.name}
                    handleDelete={delPost}
                    handleEdit={updatePost}
                    message={item.message}
                />)
                : <NoResult header="No publications yet" message="When a user publish a post, you'll see it here."/>}
        </>
    );

};

export default PostsList;