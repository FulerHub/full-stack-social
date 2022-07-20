import React from "react";

export function getNameLastTime(date:number) {
    let status = "";
    if(date < 5) status = 'online';
    else if(date >= 5 && date < 60) status = date+" minutes ago";
    else if(date >= 60 && date < 120) status = Math.floor(date/60)+" hour ago";
    else if(date >= 60 && date < 1440) status = Math.floor(date/60)+" hours ago";
    else if(date >= 1440 && date < 2880) status = Math.floor(date/60/24)+" day ago";
    else if(date >= 2880 && date < 43200) status = Math.floor(date/60/24)+" days ago";
    return status;
}

export function createSound(sound:string) {
    let audio = new Audio();
    audio.src = sound;
    audio.autoplay = true;
}

export function getTimeDate(dateString:string) {
    const date = new Date(dateString);
    return ("0" + (date.getHours())).slice(-2)+':'+("0" + (date.getMinutes())).slice(-2)+':'+("0" + (date.getSeconds())).slice(-2)+' '+("0" + (date.getDate())).slice(-2)+'.'+("0" + (date.getMonth()+1)).slice(-2)+'.'+date.getFullYear();
}


export const getFormatedText = (text:string) => {
    let newText = text.split(' ').map((item:any) =>{
        let youtube = item.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
        if(youtube) return <iframe width="100%" height="315" src={'https://www.youtube.com/embed/' + youtube[1]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
        let image = item.match(/\b(https?\:\/\/\S+(?:jpg|jpeg|png|gif|svg|webp))/mg);
        if(image) return <img src={image}  alt={''}/>;
        let link = item.match(/\b(https?\:\/\/\S+)/mg);
        if(link) return <a href={link}>{link}</a>;
        return item+" ";
    });
    return newText;
};