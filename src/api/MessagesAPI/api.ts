import {defaultOptions, instance} from '../api';
export const MessagesAPI = {
    getMessages(dialogID:number){
        return instance.get(`messages/${dialogID}`,defaultOptions());
    },
    addMessage(dialogID:number,message:string){
        return instance.post(`messages/`,{dialogID:dialogID, message:message },defaultOptions());
    },
    updateMessage(postID:number,message:string){
        return instance.put(`messages/${postID}`,{ message:message },defaultOptions());
    },
    deleteMessage(postID:number){
        return instance.delete(`messages/${postID}`,defaultOptions());
    },
}

/*
*
*  *Messages
 *{
 *     "GET", "/api/messages/{id}",  "" //Получить сообщения с диалога
 *      "POST", "/api/messages/",  "" //Создать сообщение в диалог {dialogID}
 *      "DELETE", "/api/messages/{id}",  "" //Удалить сообщение с диалога {dialogID}
 *}
*
*
* */