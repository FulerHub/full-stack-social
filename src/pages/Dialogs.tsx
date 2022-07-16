import React, {FC} from 'react';
import DialogListContainer from "../components/Dialogs/DialogListContainer";


const Dialogs:FC = () => {
    return (
        <div className="content">
            <DialogListContainer/>
        </div>
    );
};

export default Dialogs;