import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionLogout} from "../redux/reducers/authReducer";
import {serverImageUrl} from "../api/api";

const Header:FC = ({}) => {
    const dispatch = useDispatch<any>();
    const {name,avatar} = useSelector<any, any>(state => state.authReducer);
    const Logout = ()=>{
        dispatch(actionLogout())
    };
    return (
        <div className="header">
            <div className="container">
                <div className="header__wrap">
                    <div className="header__logo"/>
                    <div className="user-menu">
                        <div className="user-menu__img"><img src={serverImageUrl+avatar} alt=""/></div>
                        <div className="user-menu__name">{name}</div>
                        <div className="user-menu__wrap">
                            <ul className="menu">
                                <li><Link to={"/updates"}>Updates v.0.0.6</Link></li>
                                <li><Link to={"/settings"}><i className="fa fa-cog" aria-hidden="true"/> Settings</Link></li>
                                <li><a onClick={Logout} href={"#"}><i className="fa fa-sign-out" aria-hidden="true"/> Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;