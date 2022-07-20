import React from "react";
import {Navigate} from "react-router";
import {connect} from "react-redux";

import Preloader from "../components/Preloader";
import {checkToken} from "../redux/reducers/authReducer";
import {selectIsAuth, selectLoadingAuth} from "../selectors/selectors";
import {RootStateType} from "../redux/store";


const mapStateToProps = (state:RootStateType) => ({
    isAuth: selectIsAuth(state),
    loadingAuth: selectLoadingAuth(state)
});

const mapDispatchToProps = (dispatch:any) =>({
    checkAuth(){
        dispatch(checkToken());
    },

});

interface WithAuthPropsType {
    loadingAuth: boolean;
    isAuth: boolean;
    checkAuth:() => void
}
interface WithAuthStateType {

}
export function WithAuth(WrappedComponent: any) {
    class WithAuthComponent extends React.Component<WithAuthPropsType, WithAuthPropsType> {
        constructor(props:any){
            super(props);
        }
        componentDidMount() {
            this.props.checkAuth()
        }
        render() {
            if (!this.props.loadingAuth) return <Preloader/>;
            if (!this.props.isAuth) return <Navigate to="/signin" />;
            return <WrappedComponent {...this.props} />;
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(WithAuthComponent);
}