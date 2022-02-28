import React from "react";
import ReactDOM from "react-dom";

import { EventBus } from "../util/EventBus";
import { Icons } from "../util/Icons";
import { FormHandlers } from "../forms/formComponents/FormHandlers";
import { Input } from "../forms/formComponents/Input";
import { Textarea } from "../forms/formComponents/Textarea";

type TypeProps = {
    name:string
}

type TypeState = {
    fields:{
        yourName:string,
        yourEmail:string,
        subject:string,
        message:string
    },
    valid:{
        yourName:boolean,
        yourEmail:boolean,
        subject:boolean,
        message:boolean
    }
}

type TypeValidate = {
    compact:boolean
}

class ContactForm extends React.Component<TypeProps, TypeState> {

    eventBus:EventBus;
    icons:Icons;

    constructor(props:TypeProps) {

        super(props);

        this.eventBus = new EventBus();
        this.icons = new Icons();

        this.state = {
            fields:{
                yourName:"",
                yourEmail:"",
                subject:"",
                message:""
            },
            valid:{
                yourName:true,
                yourEmail:true,
                subject:true,
                message:true
            }
        };

    }

    accept(event:any) {

        if(!this.hasRequired(event)) {
            this.eventBus.dispatch("notifyError", { error:"Please Enter Required Fields" });
            return;
        }

        if(!this.inputValid(event)) {
            this.eventBus.dispatch("notifyError", { error:"Invalid Characters Detected" });
            return;
        }

        this.eventBus.dispatch("closeOverlay", {});
        this.eventBus.dispatch("notifyInfo", { info:"Message Sent (Not Really Though)" });

    }

    hasRequired(event:any) {

        let fields:{[index:string]:any} = Object.assign({}, this.state.fields);
        let valid:{[index:string]:boolean} = Object.assign({}, this.state.valid);

        let result = true;
        for(var key in fields) {
            if(fields[key].length == 0 || fields[key].trim() == "") {
                valid[key] = false;
                result = false;
            }
        }

        this.setState ({
            valid:valid
        } as Pick<TypeState, keyof TypeState>);

        return result;

    }

    inputValid(event:any) {

        let valid:{[index:string]:boolean} = Object.assign({}, this.state.valid);

        let result = true;
        for(var key in valid) {
            if(!valid[key]) {
                result = false;
            }
        }

        return result;

    }

    cancel(event:any) {

        this.eventBus.dispatch("closeOverlay", {});
        this.eventBus.dispatch("notifyError", { error:"Message Not Sent" });

    }

    render() {

        let handleChange = new FormHandlers({}).handleChange.bind(this);
        let handleValidate = new FormHandlers({}).handleValidate.bind(this);

        let accept = this.accept.bind(this);
        let cancel = this.cancel.bind(this);

        return (
            <div className="formWrapper">
                <div className="formTitle">
                    <div>
                        <p>Contact</p>
                    </div>
                </div>
                <form id="formSettings" action="formSettings">
                    <div className="row">
                        <div className="cell">
                            <label htmlFor="yourName">Your Name</label>
                        </div>
                        <div className="cell">
                            <Input
                                name={ "yourName" }
                                field={ this.state.fields.yourName }
                                handleChange={ handleChange }
                                valid={ this.state.valid.yourName }
                                handleValidate={ handleValidate }
                                validRules={ ["required", "text"] }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <label htmlFor="yourEmail">Your Email</label>
                        </div>
                        <div className="cell">
                            <Input
                                name={ "yourEmail" }
                                field={ this.state.fields.yourEmail }
                                handleChange={ handleChange }
                                valid={ this.state.valid.yourEmail }
                                handleValidate={ handleValidate }
                                validRules={ ["required", "text"] }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <label htmlFor="yourName">Subject</label>
                        </div>
                        <div className="cell">
                            <Input
                                name={ "subject" }
                                field={ this.state.fields.subject}
                                handleChange={ handleChange }
                                valid={ this.state.valid.subject}
                                handleValidate={ handleValidate }
                                validRules={ ["required", "text"] }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <label htmlFor="yourName">Message</label>
                        </div>
                        <div className="cell">
                            <Textarea
                                name={ "message" }
                                field={ this.state.fields.message}
                                handleChange={ handleChange }
                                valid={ this.state.valid.message}
                                handleValidate={ handleValidate }
                                validRules={ ["required", "text"] }
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
    ContactForm
}
