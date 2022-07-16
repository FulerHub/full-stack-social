import {defaultOptions, instance} from '../api';
export const TelegramAPI = {
    getPosts(groupList:string){
        return instance.get(`telegram/`,{
            ...defaultOptions(),
            params:{
                channels:groupList,
            },
        });
    }

}