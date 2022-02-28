import React from "react";
import ReactDOM from "react-dom";

import { EventBus } from "../util/EventBus";
import { Icons } from "../util/Icons";
import { SettingsForm } from "../forms/SettingsForm";
import { ContactForm } from "../forms/ContactForm";

type TypeProps = {
    name:string
}

type TypeState  = {
    show:boolean
}

class Toolbar extends React.Component<TypeProps, TypeState> {

    eventBus:EventBus;
    icons:Icons;

    constructor(props:TypeProps) {

        super(props);

        this.icons = new Icons();
        this.eventBus = new EventBus();

        this.state = {
            show:false
        };

    }

    closeToolbar(event:any) {

        let self = this;
        event.stopPropagation();

        self.setState ({ show:false });

    }

    openToolbar(event:any) {

        let self = this;
        event.stopPropagation();

        self.setState ({ show:true });

    }

    settings(event:any) {

        let self = this;
        event.stopPropagation();

        self.eventBus.dispatch("openOverlay", { content:<SettingsForm name={ "settingsForm" }/> });

    }

    contact(event:any) {

        let self = this;
        event.stopPropagation();

        self.eventBus.dispatch("openOverlay", { content:<ContactForm name={ "contactForm" }/> });

    }

    notYetImplemented(desc:string, event:any) {

        let self = this;
        event.stopPropagation();

        self.eventBus.dispatch("notifyError", { error:desc });

    }

    getActionComp(id:string, icon:string, label:string|null, exec:Function) {

        let execFunc = function(event:any) {
            exec(event);
        }

        return (
            <div>
                <button id={ id } onClick={ execFunc }>
                    <div>
                        { this.icons.getIcon(icon) }
                    </div>
                    {
                        label != null &&
                        <div>
                            <p>{ label }</p>
                        </div>
                    }
                </button>
            </div>
        );

    }

    render() {

        let openToolbar = this.openToolbar.bind(this);
        let closeToolbar = this.closeToolbar.bind(this);
        let refresh = this.notYetImplemented.bind(this, "Refresh Not Yet Implemented");
        let download = this.notYetImplemented.bind(this, "Download Not Yet Implemented");
        let settings = this.settings.bind(this);
        let contact = this.contact.bind(this);

        return (
            <div className="toolbar">
                <div className="left">
                    <div className="logo">
                        <p>CONTAINER APP</p>
                    </div>
                </div>
                <div className="right">
                    <div className="actionsSmall">
                        { this.getActionComp("buttShowToolbar", "bars", null, openToolbar) }
                    </div>
                    <div className={ `actions ${ this.state.show ? "show" : "" }` }>
                        { this.getActionComp("buttCloseToolbar", "cross", null, closeToolbar) }
                        <div className="divider"></div>
                        { this.getActionComp("buttRefresh", "refresh", "Refresh", refresh) }
                        { this.getActionComp("buttDownload", "download", "Download", download) }
                        { this.getActionComp("buttSettings", "gear", "Settings", settings) }
                        { this.getActionComp("buttContact", "envelope", "Contact", contact) }
                    </div>
                </div>
            </div>
        );

    }

    closeToolbarClick() {

        let self = this;
        let targetDocument = document!;

        targetDocument.addEventListener("click", function(event) {
            self.closeToolbar(event);
        });

    }

    closeToolbarResize() {

        let self = this;
        let targetWindow = window!;
        let targetActionsSmall = document.getElementsByClassName("actionsSmall")[0];
        let width = targetWindow.innerWidth;

        targetWindow.addEventListener("resize", function(event) {
            if(width == targetWindow.innerWidth) { return; }
            width = targetWindow.innerWidth;
            if(window.getComputedStyle(targetActionsSmall).display == "none") {
                self.closeToolbar(event);
            }
        });

    }

    componentDidMount() {

        this.closeToolbarClick();
        this.closeToolbarResize();

    }

}

ReactDOM.render(<Toolbar name="toolbar" />, document.getElementById("reactToolbar"));
