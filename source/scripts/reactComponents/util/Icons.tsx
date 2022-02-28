import React from "react";
import ReactDOM from "react-dom";

class Icons {

    getIcon(name:string) {

        let icon = null;

        switch(name) {
            case "bars":
                icon = <i className="fa-solid fa-bars"></i>;
                break;
            case "cross":
                icon = <i className="fa-solid fa-xmark"></i>;
                break;
            case "tick":
                icon = <i className="fa-solid fa-check"></i>;
                break;
            case "toggleoff":
                icon = <i className="fa-solid fa-toggle-off"></i>;
                break;
            case "toggleon":
                icon = <i className="fa-solid fa-toggle-on"></i>;
                break;
            case "refresh":
                icon = <i className="fa-solid fa-arrows-rotate"></i>;
                break;
            case "download":
                icon = <i className="fa-solid fa-file-arrow-down"></i>;
                break;
            case "gear":
                icon = <i className="fa-solid fa-gear"></i>;
                break;
            case "envelope":
                icon = <i className="fa-solid fa-envelope"></i>;
                break;
            case "search":
                icon = <i className="fa-solid fa-magnifying-glass"></i>;
                break;
            case "sort":
                icon = <i className="fa-solid fa-sort"></i>;
                break;
            default:
                icon = <i className="fa-solid fa-bug"></i>;
                break;
        }

        return icon;

    }

}

export {
    Icons
};
