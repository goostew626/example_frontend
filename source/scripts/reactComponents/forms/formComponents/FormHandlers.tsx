import React from "react";
import ReactDOM from "react-dom";

class FormHandlers extends React.Component<any, any> {

    constructor(props:any) {

        super(props);

    }

    handleChange(event:any, callback?:any) {

        let field = event.target.name;
        let value = event.target.value;

        if(event.target.type == "checkbox") { value = event.target.checked; }

        let fields:{[index:string]:any} = Object.assign({}, this.state.fields);
        fields[field] = value;

        this.setState ({
            fields:fields
        } as Pick<any, keyof any>, function() {
            if(callback !== undefined) { callback(); }
        });

    }

    handleValidate(event:any, isValid:boolean) {

        let field = event.target.name;

        let valid:{[index:string]:any} = Object.assign({}, this.state.valid);
        valid[field] = isValid;

        this.setState ({
            valid:valid
        } as Pick<any, keyof any>);

    }

}

export {
    FormHandlers
};
