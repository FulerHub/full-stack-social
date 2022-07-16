import React, {FC} from 'react';

interface NoResultType {
    header:string;
    message:string;
}

const NoResult:FC<NoResultType> = ({header,message}) => {
    return (
        <div className={'noresult'}>
            <i className="fa fa-user-circle-o" aria-hidden="true"/>
            <b>{header}</b>
            <p>{message}</p>
        </div>
    );
};

export default NoResult;