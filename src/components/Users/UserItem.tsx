import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {serverImageUrl} from "../../api/api";

interface UserItemType {
    id:number;
    name: string;
    img:string;
    city:string|null;
    isFriend:boolean;
    handleSubscribe: (id:number,type:boolean)=> void
}

const UserItem:FC<UserItemType> = ({id,img,name,city,isFriend,handleSubscribe}) => {
    return (
        <div className="user-card">
            <div className="user-card__img">
                <Link to={`/user/${id}`}><img src={img && serverImageUrl+img} alt=""/></Link>
            </div>
            <div className="user-card__wrap">
                <div className="user-card__name"><Link to={`/user/${id}`}>{name}</Link></div>
                <div className="user-card__city">{city ? city: "Hidden"}</div>
                <div className="user-card__buttons">
                    {isFriend ?
                        <button className={'btn'} style={{backgroundColor:'#4d1818'}}  onClick={()=>handleSubscribe(id,true)} >Unsubscribe</button>
                        : <button className={'btn'} style={{backgroundColor:'#219108'}} onClick={()=>handleSubscribe(id,false)} >Subscribe</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserItem;