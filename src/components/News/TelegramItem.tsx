import React, {FC} from 'react';

interface TelegramItemType {
    logo: string;
    channel: string;
    contentImage:string;
    contentText: string;
    contentMediaPoster: string;
    contentMediaVideo:string;
    statisticViews: string;
    statisticShares: string;
    date: string;
}

const TelegramItem:FC<TelegramItemType> = ({logo,channel,contentImage,contentMediaVideo,statisticShares,statisticViews,date,contentMediaPoster,contentText}) => {
    return (
        <div className="list__item">
            <div className="list__img"><a><img src={logo} alt=""/></a></div>
            <a>
                <div className="list__wrap">
                    <div className="list__name">{channel}</div>
                    {contentImage && <a href={contentImage} data-fancybox="gallery"><img src={contentImage} alt=""/></a>}
                    {contentMediaVideo && <video controls poster={contentMediaPoster}><source src={contentMediaVideo} type="video/mp4"/></video>}
                    <div className="list__content" dangerouslySetInnerHTML={{__html: contentText}}/>
                    {date && <div className="list__date">Views: {statisticViews} Shares: {statisticShares} {date}</div> }
                </div>
            </a>
        </div>
    );
};

export default TelegramItem;