import {defaultOptions, instance} from '../api';
export const DialogsAPI = {
    getDialogs(){
        return instance.get('dialogs/',defaultOptions());
    },
    getDialog(dialogID:number){
        return instance.get(`dialogs/${dialogID}`,defaultOptions());
    },
    addDialog(user:number){
        return instance.post(`dialogs`,{ userid: user,name:`user${user}`},defaultOptions());
    },
    deleteDialog(id:number){
        return instance.delete(`dialogs/${id}`,defaultOptions());
    },
}