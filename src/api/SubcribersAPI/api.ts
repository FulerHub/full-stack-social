import {defaultOptions, instance} from '../api';
export const SubscribersAPI = {
    getSubscribers(){
        return instance.get('/subscribers/',defaultOptions());
    },
    getSubscribersUser(user:any){
        return instance.get(`subscribers/${user}`,defaultOptions());
    },
    addSubscriber(user:any){
        return instance.post(`subscribers`,{userID:user},defaultOptions());
    },
    deleteSubscriber(user:any){
        return instance.delete(`subscribers/${user}`,defaultOptions());
    },
}