import React from "react";
import ReactDOM from "react-dom";

import { EventBus } from "../util/EventBus";
import { WindowAppdata } from "../../appdata/WindowAppdata";
import { Icons } from "../util/Icons";
import { FormHandlers } from "../forms/formComponents/FormHandlers";
import { Select } from "../forms/formComponents/Select";
import { Checkbox } from "../forms/formComponents/Checkbox";

type TypeProps = {
    name:string
}

type TypeState = {
    fields:{
        theme:string,
        compact:boolean
    },
    valid:{
    }
}

type TypeValidate = {
    compact:boolean
}

class SettingsForm extends React.Component<TypeProps, TypeState> {

    eventBus:EventBus;
    windowAppdata:WindowAppdata;
    icons:Icons;

    constructor(props:TypeProps) {

        super(props);

        this.eventBus = new EventBus();
        this.windowAppdata = new WindowAppdata();
        this.icons = new Icons();

        this.state = {
            fields:{
                theme:this.windowAppdata.getTheme(),
                compact:this.windowAppdata.getCompact()
            },
            valid:{
            }
        };

    }

    accept(event:any) {

        this.windowAppdata.setTheme(this.state.fields.theme);
        this.windowAppdata.setCompact(this.state.fields.compact);

        this.applyTheme();

        this.eventBus.dispatch("closeOverlay", {});
        this.eventBus.dispatch("notifyInfo", { info:"Settings Applied" });

    }

    applyTheme() {

        let contentMain:HTMLElement|null = document.getElementById("contentMain");

        if(contentMain) {

            let classNames:string[] = Array.from(contentMain.classList);
            classNames = classNames.filter(function(className:string, idx:number) {
                return !(className.includes("theme-", 0));
            });

            contentMain.removeAttribute("class");
            contentMain.classList.add(...classNames, "theme-" + this.state.fields.theme);

        } else {

            this.eventBus.dispatch("notifyError", { error:"Cannot Apply Theme" });

        }

    }

    cancel(event:any) {

        this.eventBus.dispatch("closeOverlay", {});
        this.eventBus.dispatch("notifyError", { error:"Settings Not Applied" });

    }

    render() {

        let handleChange = new FormHandlers({}).handleChange.bind(this);

        let accept = this.accept.bind(this);
        let cancel = this.cancel.bind(this);

        return (
            <div className="formWrapper">
                <div className="formTitle">
                    <div>
                        <p>Settings</p>
                    </div>
                </div>
                <form id="formSettings" action="formSettings">
                    <div className="row">
                        <div className="cell">
                            <label htmlFor="theme">Theme</label>
                        </div>
                        <div className="cell">
                            <Select
                                name={ "theme" }
                                field={ this.state.fields.theme }
                                options={ this.windowAppdata.getAvailableThemes() }
                                handleChange={ handleChange }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <label htmlFor="compact">Compact</label>
                        </div>
                        <div className="cell">
                            <Checkbox
                                name={ "compact" }
                                field={ this.state.fields.compact }
                                handleChange={ handleChange }
                            />
                        </div>
                    </div>
                </form>
                <div className="formActions">
                    <div>
                        <button
                            className="accept"
                            onClick={ accept }
                        >
                            { this.icons.getIcon("tick") }
                        </button>
                    </div>
                    <div>
                        <button
                            className="cancel"
                            onClick={ cancel }
                        >
                            { this.icons.getIcon("cross") }
                        </button>
                    </div>
                </div>
            </div>
        );

    }

}

export {
    SettingsForm
}
