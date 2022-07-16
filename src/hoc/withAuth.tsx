import React from "react";
import {Navigate} from "react-router";
import {connect} from "react-redux";

import Preloader from "../components/Preloader";
import {checkToken} from "../redux/reducers/authReducer";
import {WebsocketClass} from "../untill/websocket";



type MyProps = { isAuth: boolean };
type MyState = { value: string };
const mapStateToProps = (state:any) => ({
    isAuth: state.authReducer.auth,
    loadingAuth: state.authReducer.loadingAuth
});
const mapDispatchToProps = (dispatch:any) =>({
    checkAuth(){
        dispatch(checkToken());
    },

});
export function WithAuth(WrappedComponent: any) {

    class WithAuthComponent extends React.Component<any, any> {
        private socket: any;

        constructor(props:any){
            super(props);
         //   this.socket = React.createRef();
        }
        componentDidMount() {
                this.props.checkAuth()//.then(result => console.log(result));
        }
        componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

/*            if(!this.props.loadingAuth && prevProps.loadingAuth){
                this.socket.current = new WebsocketClass('wss://websocket.river-fuler.space');
            }*/
        }

        render() {
            if (this.props.loadingAuth === false) return <Preloader/>;
            if (this.props.isAuth === false) return <Navigate to="/signin" />;//

            // Оборачиваем компонент в контейнер без мутаций. Супер! state={{ from: location }}
            return <WrappedComponent {...this.props} />;
        }
    }


    return connect(mapStateToProps, mapDispatchToProps)(WithAuthComponent);
}


/*
* function withAuth(WrappedComponent) {
  class Wrapper extends React.Component {

    componentDidMount() {
      this.props.checkAuth().then(result => console.log(result));
    }

    render() {
      if (!this.props.authChecked) {
        return <LoadingIndicator />;
      } else if (!this.props.loggedIn && this.props.protected) {
        return (
          <>
            <Login />
            <p>You need to login to view this page.</p>
          </>
        );
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = ({authorization: { authChecked, loggedIn, currentUser }}) => {
    return { authChecked, loggedIn, currentUser };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      checkAuth: () => dispatch(checkAuth())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}

export default withAuth;
*
*
*
*
*
*
*
* */
//export default WithAuth;

/*export function WithAuth(WrappedComponent: any) {
    const WithAuthComponent = (props:any) =>{
        let location = useLocation();
        console.log('a123213123',props.isAuth)
        console.log('location',location)


        if (props.isAuth === false) return <Navigate to="/signin" state={{ from: location }}/>//
        // Оборачиваем компонент в контейнер без мутаций. Супер!
        return <WrappedComponent {...props} />;


    }


    let connectedAuthRedirectComponent = connect(mapStateToProps)(WithAuthComponent);
    return connectedAuthRedirectComponent;
}*/

/*
function WithAuth(WrappedComponent: typeof React.Component) {
    let location = useLocation();
    const isAuth = true//useSelector<any>(state=> state.authReducer.auth)
   // if (!isAuth)  ;
    console.log('AUTH',isAuth)
    if (!isAuth) return <Navigate to="/signin" state={{ from: location }} />//
    return (props:any) => {

       return <WrappedComponent {...props} />//<WrappedComponent {...props} />
    }// <Navigate to="/signin" state={{ from: location }} /> : <WrappedComponent {...props} />
}
*/