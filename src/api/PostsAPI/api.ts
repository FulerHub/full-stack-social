import {defaultOptions, instance} from '../api';
export const PostsAPI = {
    getMyPosts(){
        return instance.get('posts/',defaultOptions());
    },
    getPosts(userID:number){
        return instance.get(`posts/${userID}`,defaultOptions());
    },
    addPost(userID:number,message:string){
        return instance.post(`posts/`,{profileID:userID, message:message },defaultOptions());
    },
    updatePost(postID:number,message:string){
        return instance.put(`posts/${postID}`,{ message:message },defaultOptions());
    },
    deletePost(postID:number){
        return instance.delete(`posts/${postID}`,defaultOptions());
    },
}
/* *Posts
 *{
 *     "GET", "/api/posts/",  "" //получить все свои посты на странице
 *     "GET", "/api/posts/{userID}",  ""// получить все посты пользователя
 *      "POST", "/api/posts/{userID}",  "" //добавить пост пользователю {userID}, "message"
 *       "PUT", "/api/posts/{id}",  "" //добавить пост пользователю {userID},"message"
 *      "DELETE", "/api/posts/{id}",  "" //Удалить пост  {id}
 *}*/