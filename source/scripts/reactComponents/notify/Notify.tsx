import React from "react";
import ReactDOM from "react-dom";

import { EventBus } from "../util/EventBus";

type TypeProps = {
    name:string
}

type TypeState  = {
    info:string,
    error:string
}

class Notify extends React.Component<TypeProps, TypeState> {

    eventBus:EventBus;

    constructor(props:TypeProps) {

        super(props);

        this.eventBus = new EventBus();

        this.state = {
            info:"",
            error:""
        };

    }

    closeNotifyOverride(event:any) {

        event.stopPropagation();

    }

    notifyInfo(info:string) {

        this.setState({ info:info });

    }

    notifyError(error:string) {

        this.setState({ error:error });

    }

    getNotifyComp(text:string, exec:Function) {

        let execFunc = function(event:any) {
            exec(event);
        }

        return (
            <div>
                <div className="panel notifyClose">
                    <button onClick={ execFunc }>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <p>{ text }</p>
                <div className="panel"></div>
            </div>
        );

    }

    render() {

        let closeNotifyInfo = this.notifyInfo.bind(this, "");
        let closeNotifyError = this.notifyError.bind(this, "");
        let closeNotifyOverride = this.closeNotifyOverride.bind(this);

        return (
            <div className="notify" onClick={ closeNotifyOverride }>
                <div className={ `info ${ this.state.info ? "show" : "" }` }>
                    { this.getNotifyComp(this.state.info, closeNotifyInfo) }
                </div>
                <div className={ `error ${ this.state.error ? "show" : "" }` }>
                    { this.getNotifyComp(this.state.error, closeNotifyError) }
                </div>
            </div>
        );

    }

    componentDidMount() {

        let self = this;

        self.eventBus.on("notifyInfo", function(event:any) {
            self.notifyInfo(event.detail.info);
        });

        self.eventBus.on("notifyError", function(event:any) {
            self.notifyError(event.detail.error);
        });

    }

    componentWillUnmount() {

        this.eventBus.remove("notifyInfo");
        this.eventBus.remove("notifyError");

    }

}

ReactDOM.render(<Notify name="notify" />, document.getElementById("reactNotify"));
