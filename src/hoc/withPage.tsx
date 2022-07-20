import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function withPage(WrappedComponent: any) {
    return class extends React.Component {
        render() {
            return(
                <>
                    <Header/>
                    <div className="wrap">
                        <div className="container">
                            <Sidebar/>
                            <WrappedComponent {...this.props} />
                        </div>
                    </div>
                </>
            );
        }
    }
}
export default withPage;