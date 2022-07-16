import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {getFormatedText, getTimeDate} from "../../untill/scripts";
import {EditPostType} from "../../untill/types";
import {useInput} from "../../hook/useInput";
interface PostItemProps {
    id: number,
    userID?: number;
    img: string;
    name: string;
    message: string;
    controlEdit?: boolean;
    controlDelete?: boolean;
    date?: string
    handleEdit: (value:EditPostType)=> void;
    handleDelete: (id:number)=> void;
}
const PostItem:FC<PostItemProps> = ({id,userID,img,name,message,controlDelete,controlEdit,date,handleDelete,handleEdit}) => {
    const [edit,setEdit] = useState<boolean>(false);
    const {bind,value} = useInput(message);
    const handleEditPost = ()=>{
        setEdit(!edit);
        if(edit){
            handleEdit({
                id:id,
                message: value
            })
        }
    };
    return (
        <div className="list__item">
            <div className="list__img"><Link to={`/user/${userID}`}><img src={img} alt=""/></Link></div>
            <a>
                <div className="list__wrap">
                    <div className="list__name"><Link to={`/user/${userID}`}>{name}</Link></div>
                    <div className="list__content">{edit ? <textarea {...bind} className={"textarea"}  value={value}/> : getFormatedText(value)}</div>
                    {date && <div className="list__date">{getTimeDate(date)}</div> }
                    {controlDelete ?
                        <div className="list__control">
                            {controlEdit ?
                                edit
                                ? <i onClick={()=>handleEditPost()} className="fa fa-check" aria-hidden="true"/>
                                : <i onClick={()=>handleEditPost()} className="fa fa-pencil" aria-hidden="true"/>
                                : ''
                            }
                            {controlDelete &&  <i onClick={()=>handleDelete(id)} className="fa fa-trash" aria-hidden="true"/> }
                        </div>
                        : ""}
                </div>
            </a>
        </div>
    );
};

export default PostItem;