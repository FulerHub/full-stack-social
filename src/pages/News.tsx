import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actionGetTelegram} from "../redux/reducers/telegramReducer";
import TelegramItem from "../components/News/TelegramItem";
import Preloader from "../components/Preloader";

import "@fancyapps/ui/dist/fancybox.css";
import NoResult from "../components/NoResult";

const News:FC = ({}) => {
    const dispatch = useDispatch<any>();
    const groupList = useSelector<any,any>(state => state.authReducer.groupList);
    useEffect(()=>{
        dispatch(actionGetTelegram(groupList))
    },[]);
    const {posts,isLoading} = useSelector<any,any>(state => state.telegramReducer);

    if(isLoading) return <div className="telegramNews content"><Preloader/></div>;
    return (
        <div className="telegramNews content">
            {posts.length > 0 ? posts.map((item:any)=><TelegramItem logo={item.logo}
                                                                         channel={item.channel}
                                                                         date={item.date}
                                                                         contentImage={item.content?.image}
                                                                         contentMediaVideo={item.content.media?.video}
                                                                         contentMediaPoster={item.content.media?.poster}
                                                                         contentText={item.content?.text}
                                                                         statisticViews={item.statistic?.views}
                                                                         statisticShares={item.statistic?.shares}
            />) : <NoResult header={"Telegram posts not found"} message={"When you select your groups in settings, the posts will be here."}/>}
        </div>
    );
};

export default News;