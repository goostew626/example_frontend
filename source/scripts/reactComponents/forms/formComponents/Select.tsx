import React from "react";
import ReactDOM from "react-dom";

type TypeProps = {
    name:string,
    field:string,
    options:any[],
    handleChange:any
}

type TypeState = {
}

class Select extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
        };

    }

    map(items:any[]) {

        return items.map(function(item:string, idx:number) {
            return item;
        });

    }

    getOption(key:number, val:string, name:string) {

        return (
            <option
                key={ "option" + key }
                value={ val }
            >
                { name }
            </option>
        );

    }

    render() {

        let self = this;

        let handleChange = function(event:any) {
            self.props.handleChange(event);
        }

        let options:JSX.Element[] = [];
        this.props.options.forEach(function(option:{val:string, name:string}, idx:number) {
            options.push(self.getOption(idx, option.val, option.name));
        });

        return (
            <select
                name={ self.props.name }
                value={ self.props.field }
                onChange={ handleChange }
            >
                { this.map(options) }
            </select>
        );

    }

}

export {
    Select
};
