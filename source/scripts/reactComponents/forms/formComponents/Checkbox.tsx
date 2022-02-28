import React from "react";
import ReactDOM from "react-dom";

import { Icons } from "../../util/Icons";

type TypeProps = {
    name:string,
    field:boolean,
    handleChange:any
}

type TypeState = {
}

class Checkbox extends React.Component<TypeProps, TypeState> {

    icons:Icons;

    constructor(props:TypeProps) {

        super(props);

        this.icons = new Icons();

        this.state = {
        };

    }

    render() {

        let self = this;

        let handleChange = function(event:any) {
            self.props.handleChange(event);
        }

        return (
            <label className="checkboxLabel">
                <input
                    name={ self.props.name }
                    type="checkbox"
                    defaultChecked={ self.props.field }
                    onChange={ handleChange }
                />
                <span
                    className={ `checkbox ${ self.props.field ? "checked" : "unchecked" }` }
                    aria-hidden="true"
                >
                    {
                        self.props.field ? (
                            self.icons.getIcon("toggleon")
                        ) : (
                            self.icons.getIcon("toggleoff")
                        )
                    }
                </span>
            </label>
        );

    }

}

export {
    Checkbox
};
