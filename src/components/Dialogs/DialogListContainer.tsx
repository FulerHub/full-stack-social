import React from 'react';
import {connect} from "react-redux";
import DialogList from "./DialogList";
import {actionGetDialogs} from "../../redux/reducers/dialogsReducer";
import {RootStateType} from "../../redux/store";
import {selectDialogsLoading, selectGetDialogs} from "../../selectors/selectors";

const mapStateToProps = (state:RootStateType) => ({
    dialogs: selectGetDialogs(state),
    loading: selectDialogsLoading(state)
});


const mapDispatchToProps = (dispatch:any) =>({
    getDialogs(){
        dispatch(actionGetDialogs())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
