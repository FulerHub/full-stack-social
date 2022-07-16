export interface LastMessageType {
    userid: number;
    message: string;
    lastTimeMessage:number
}
export interface DialogsType {
    id: number;
    userid: number;
    dialogid: number;
    unReadMessages: number;
    name: string;
    date: number;
    last: LastMessageType;
    avatar: string;
}


export interface UserType {
    id: number;
    name: string;
    date?: string;
    city?: string;
    avatar: string;
    linkID?: number;
    isFriend?: boolean;

}

export interface MessagesType {
    id: number;
    message: string;
    userid: number;
    dialogid: number;
    createdAt: string;
    updatedAt: string;
    User: UserType
}


export interface EditPostType {
    id: number;
    message: string;
}


export interface InfoMessagesType {
    id: number;
    userid: number;
    dialogid: number;
    groups: boolean;
    lastTime: string;
    createdAt: string;
    updatedAt: string;
    User:UserType
}

export interface PostsType {
    id: number;
    message: string;
    userid: number;
    profileid: number;
    createdAt: string;
    updatedAt: string;
    User:UserType
}