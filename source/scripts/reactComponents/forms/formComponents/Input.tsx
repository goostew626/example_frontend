import React from "react";
import ReactDOM from "react-dom";

import { Validation } from "./Validation";

type TypeProps = {
    name:string,
    field:string,
    handleChange:any,
    valid?:boolean,
    handleValidate?:any,
    validRules?:any
}

type TypeState = {
    valid:boolean
}

class Input extends React.Component<TypeProps, TypeState> {

    validation:Validation;

    constructor(props:TypeProps) {

        super(props);

        this.validation = new Validation();

        this.state = {
            valid:true
        };

    }

    isValid(event:any) {

        let result = this.validation.check(this.props.field, this.props.validRules, event);

        this.props.handleValidate(event, result);

    }

    handleChange(event:any) {

        let self = this;

        let isValid:any|undefined = undefined;
        if(self.props.valid !== undefined) {
            isValid = self.isValid.bind(self, event);
        }

        this.props.handleChange(event, isValid);

    }

    render() {

        let self = this;

        let valid:boolean = true;
        if(self.props.valid !== undefined) {
            valid = self.props.valid;
        }

        let handleChange = self.handleChange.bind(self);

        return (
            <input
                className={ `${ valid ? "valid" : "invalid" }` }
                name={ self.props.name }
                type="text"
                value={ self.props.field }
                onChange={ handleChange }
            ></input>
        );

    }

}

export {
    Input
};
