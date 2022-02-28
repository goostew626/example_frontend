class Validation {

    check(field:string, validRules:string[], event:any) {

        let result:boolean = true;

        if(validRules.includes("required")) {
            if(!this.validRequired(field)) { result = false; }
        }

        if(validRules.includes("text")) {
            if(!this.validText(field)) { result = false; }
        }

        if(validRules.includes("integerPos")) {
            if(!this.validIntegerPos(field)) { result = false; }
        }

        if(validRules.includes("integerNeg")) {
            if(!this.validIntegerNeg(field)) { result = false; }
        }

        return result;

    }

    validRequired(field:string) {

        let result:boolean = true;

        if (
            field.length == 0 ||
            field.trim() == ""
        ) {
            result = false;
        }

        return result;

    }

    validText(field:string) {

        let pattern:string = (
            '[^' +
            'a-zA-Z0-9' +
            '\\_\\-' +
            '\\ \\s\\.\\,\\\'\\"' +
            '\\!\\?\\&\\%\\$\\#\\@\\:' +
            '\\(\\)\\<\\>' +
            ']'
        );

        let regex:RegExp = new RegExp(pattern);

        let result:boolean = true;
        if(regex.test(field)) {
            result = false;
        }

        return result;

    }

    validIntegerPos(field:string) {

        let pattern:string = (
            '[^' +
            '0-9' +
            ']'
        );

        let regex:RegExp = new RegExp(pattern);

        let result:boolean = true;
        if(regex.test(field)) {
            result = false;
        }

        return result;

    }

    validIntegerNeg(field:string) {

        let pattern:string = (
            '[^' +
            '0-9' +
            '\\-' +
            ']'
        );

        let regex:RegExp = new RegExp(pattern);

        let result:boolean = true;
        if(regex.test(field)) {
            result = false;
        }

        return result;

    }

}

export {
    Validation
}
