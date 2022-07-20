import React, {FC} from 'react';

const Updates:FC = () => {
    return (
        <div className={"content"}>
            <h1>Logs Updates</h1>

            <div className="list__item">
                <div className="list__wrap">
                    <div className="list__name">Admin</div>
                    <div className="list__content">(Update: v.0.0.6) Added a new section function Private Profile. You can change your profile in the settings on Private or Public status. Visual updates in Setting</div>
                    <div className="list__date">10.07.2022</div>
                </div>
            </div>
            <div className="list__item">
                <div className="list__wrap">
                    <div className="list__name">Admin</div>
                    <div className="list__content">(Update: v.0.0.3) Added sort dialogs. Added display of unread messages. Add notification of new messages on the pages </div>
                    <div className="list__date">9.07.2022</div>
                </div>
            </div>
            <div className="list__item">
                <div className="list__wrap">
                    <div className="list__name">Admin</div>
                    <div className="list__content">(Update: v.0.0.2) Added a new section World News. Now watch posts from telegram channels that you specify in the settings</div>
                    <div className="list__date">08.07.2022</div>
                </div>
            </div>
            <div className="list__item">
                <div className="list__wrap">
                    <div className="list__name">Admin</div>
                    <div className="list__content">(Update: v.0.0.1) Added the ability to leave links / pictures / YouTube videos in messages</div>
                    <div className="list__date">07.07.2022</div>
                </div>
            </div>
        </div>
    );
};

export default Updates;