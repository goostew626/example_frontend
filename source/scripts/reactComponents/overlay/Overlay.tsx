import React from "react";
import ReactDOM from "react-dom";

import { EventBus } from "../util/EventBus";
import { Icons } from "../util/Icons";

type TypeProps = {
    name:string
}

type TypeState  = {
    show:boolean,
    content:any|null
}

class Overlay extends React.Component<TypeProps, TypeState> {

    icons:Icons;
    eventBus:EventBus;

    constructor(props:TypeProps) {

        super(props);

        this.eventBus = new EventBus();
        this.icons = new Icons();

        this.state = {
            show:false,
            content:null
        };

    }

    closeOverlay(event:any) {

        this.setState ({ show:false, content:null });

    }

    openOverlay(content:any) {

        this.eventBus.dispatch("notifyInfo", { info:"" });
        this.eventBus.dispatch("notifyError", { error:"" });
        this.setState ({ show:true, content:content });

    }

    closeOverlayOverride(event:any) {

        event.stopPropagation();

    }

    render() {

        let closeOverlay = this.closeOverlay.bind(this);
        let closeOverlayOverride = this.closeOverlayOverride.bind(this);

        return (
            <div className={ `overlayWrapper ${ this.state.show ? "show" : "" }` }>
                <div className="overlay" onClick={ closeOverlay }>
                    <div className="overlayContent" onClick={ closeOverlayOverride }>
                        <div className="overlayClose" onClick={ closeOverlay }>
                            <button>
                                { this.icons.getIcon("cross") }
                            </button>
                        </div>
                        <div className="overlayContains">
                            { this.state.content }
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    componentDidMount() {

        let self = this;

        self.eventBus.on("closeOverlay", function(event:any) {

            self.closeOverlay(event);

        });

        self.eventBus.on("openOverlay", function(event:any) {

            if(event.detail.hasOwnProperty("content")) {
                self.openOverlay(event.detail.content);
            }

        });

    }

    componentWillUnmount() {

        this.eventBus.remove("openOverlay");

    }

}

ReactDOM.render(<Overlay name="overlay" />, document.getElementById("reactOverlay"));
