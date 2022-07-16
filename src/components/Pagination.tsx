import React, {FC} from 'react';

interface PaginationType {
    totalItems:number;
    itemsPerPage: number;
    pagination:(id:number) => void;
}

const Pagination:FC<PaginationType> = ({totalItems,itemsPerPage,pagination}) => {
    const items = [];
    for(let i=1; i<= Math.ceil(totalItems/itemsPerPage); i++){
        items.push(i)
    }
    return (
        <div className="pagination">
            <ul> {items.length > 0 ? items.map((item:any)=><li key={item}><a onClick={()=>pagination(item)} >{item}</a></li>) : ""}</ul>
        </div>
    );
};

export default Pagination;