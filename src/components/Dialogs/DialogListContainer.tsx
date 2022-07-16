import React from 'react';
import {connect} from "react-redux";
import DialogList from "./DialogList";
import {actionGetDialogs} from "../../redux/reducers/dialogsReducer";

const mapStateToProps = (state:any) => ({
    dialogs: state.dialogsReducer.dialogs,
    loading: state.dialogsReducer.isLoading
});

const mapDispatchToProps = (dispatch:any) =>({
    getDialogs(){
        dispatch(actionGetDialogs())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
