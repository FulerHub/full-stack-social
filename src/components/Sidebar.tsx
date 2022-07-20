import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

const Sidebar:FC = ({}) => {
    return (
        <div className={"sidebar"}>
            <ul className="menu">
                <li><NavLink to={"/"} className={({ isActive }) => isActive ? 'active' : undefined}><i className="fa fa-user-circle" aria-hidden="true"/> Me</NavLink></li>
                <li><NavLink to={"/friends"} className={({ isActive }) => isActive ? 'active' : undefined} ><i className="fa fa-users" aria-hidden="true"/> Subscribers</NavLink></li>
                <li><NavLink to={"/dialogs"} className={({ isActive }) => isActive ? 'active' : undefined} ><i className="fa fa-weixin" aria-hidden="true"/> Dialogs</NavLink></li>
                <li><NavLink to={"/settings"} className={({ isActive }) => isActive ? 'active' : undefined} ><i className="fa fa-cog" aria-hidden="true"/> Settings</NavLink></li>
                <li><NavLink to={"/news"} className={({ isActive }) => isActive ? 'active' : undefined} ><i className="fa fa-newspaper-o" aria-hidden="true"/> World News</NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;