import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Dialogs from "./pages/Dialogs";
import Friends from "./pages/Friends";
import Dialog from "./pages/Dialog";
import withPage from "./hoc/withPage";
import {WithAuth} from "./hoc/withAuth";
import {connect} from "react-redux";
import {checkToken, createWebsocket} from "./redux/reducers/authReducer";
import News from "./pages/News";
import Updates from "./pages/Updates";
import {actionAddMessage} from "./redux/reducers/messageReducer";
import {actionGetDialogs, actionUpdateDialog} from "./redux/reducers/dialogsReducer";
import {selectMyID} from "./selectors/selectors";


const ProfilePage = WithAuth(withPage(Profile));
const FriendsPage =  WithAuth(withPage(Friends));
const DialogsPage =  WithAuth(withPage(Dialogs));
const DialogPage =  WithAuth(withPage(Dialog));
const SettingsPage =  WithAuth(withPage(Settings));
const NewsPage =  WithAuth(withPage(News));
const UpdatesPage =  WithAuth(withPage(Updates));

type MyProps = { initialized: boolean };
interface MyState {
    websocket: boolean
}
interface AppType{
    auth: boolean;
    loadingAuth: boolean;
    currentDialogID: number;
    checkToken: ()=> void;
    UpdateDialog: (message:any)=> void;
    AddMessage: (data:any)=>void
    myID: number;
    createWebsocket: ()=> void;

}

class App extends React.Component<AppType, MyState>{
    socket: any;
    constructor(props:any) {
        super(props);
        this.socket = React.createRef();
        this.state={
            websocket: false
        }
    }

    componentDidMount(): void {

    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<MyState>, snapshot?: any): void {
        if(this.props.loadingAuth && this.props.auth && !this.state.websocket ){//&& this.props.currentDialogID
            this.setState({
                websocket: true,
            });
            this.props.createWebsocket();
        }
        if(this.props.loadingAuth && !this.props.auth && this.state.websocket){
            this.setState({
                websocket: false,
            });
        }
    }

    componentWillUnmount(): void {

    }
    render() {
        return (
            <div className="App">
                <Routes>
                    <Route path="/" element={ <ProfilePage />}/>
                    <Route
                        path="user/:userID"
                        element={<ProfilePage wsSendEcho={(action:any,data:any)=>this.socket.current.send(JSON.stringify({action, data}))}/>}
                    />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<Registration/>} />
                    <Route path="/friends" element={<FriendsPage/>} />
                    <Route path="/dialogs">
                        <Route path=":pageID" element={<DialogPage />} />
                        <Route index element={<DialogsPage wsSendEcho={(action:any,data:any)=>this.socket.current.send(JSON.stringify({action, data}))}/>} />
                    </Route>
                    <Route path="/news" element={<NewsPage/>} />
                    <Route path="/updates" element={<UpdatesPage/>} />
                    <Route path="/settings" element={<SettingsPage/>} />

                </Routes>
            </div>
        );
    }


}

const mapStateToProps = (state:any) => ({
    loadingAuth: state.authReducer.loadingAuth,
    auth: state.authReducer.auth,
    myID: selectMyID(state),
    currentDialogID: state.messageReducer.info.dialogid
});
const mapDispatchToProps = (dispatch:any) =>({
    checkToken(){
        dispatch(checkToken())
    },
    AddMessage(data:any){
        dispatch(actionAddMessage(data))
    },
    UpdateDialog(message:any){
        dispatch(actionUpdateDialog(message))
    },
    GetDialogs(){
        dispatch(actionGetDialogs());
    },
    createWebsocket(){
        dispatch(createWebsocket());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
