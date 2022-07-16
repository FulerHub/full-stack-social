import {defaultOptions, instance} from '../api';
export const UsersAPI = {
    getUser(user:number){
        return instance.get(`/users/${user}`,defaultOptions());
    },
    getUsers(page?:number,size?:number){
        return instance.get(`users/`,{
            ...defaultOptions(),
            params:{
                page:page,
                size:size
            },
        });
    },
    findUser(search?:string,page?:number,size?:number){
        return instance.get(`users/`,{
            ...defaultOptions(),
            params:{
                search:search,
                page:page,
                size:size
            },
        });
    },
    getSelectUsers(users:any,page=0,size=1000){
        return instance.get(`users/`,{
        ...defaultOptions(),
                params:{
                includes: users,
                page:page,
                size:size
            },
        });
    },

}