import {defaultOptions, instance} from '../api';
export const AuthAPI = {
    checkAuth(token:string|null){
        return instance.post('auth/check',null,defaultOptions());
    },
    getAuth(email:string,password:string){
        return instance.post('auth/login',{ email: email,password: password });
    },
    setAuth(login:string,password:string,email:string){
        return instance.post('auth/register',{ login: login,email: email,password: password });
    },
    setSetting(city:string,status:string,lang:string,name:string,groupList:string,isLocked: boolean){
        return instance.put('auth/setting',{status:status,city:city,lang:lang,name:name,groupList:groupList,isLocked:isLocked},defaultOptions());
    },
    setAvatar(file:FormData){
        return instance.post('auth/update',file,defaultOptions());
    },
}