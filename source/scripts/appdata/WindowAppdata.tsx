interface WindowAppdataIfc extends Window {
    appdata:{
        configured:boolean,
        availableThemes:{
            val:string, name:string
        }[],
        settings:{
            theme:string,
            compact:boolean
        }
    }
}

declare let window:WindowAppdataIfc;

class WindowAppdata {

    constructor() {

        if(window.hasOwnProperty("appdata")) {

            if(window.appdata.hasOwnProperty("configured")) {
                if(window.appdata.configured === true) { return; }
            }

        }

        window.appdata = {
            configured:true,
            availableThemes:[
                { "val":"light", "name":"Light" },
                { "val":"dark", "name":"Dark" }
            ],
            settings:{
                theme:"light",
                compact:false
            }
        }

    }

    public getAll() { return window.appdata; }
    public getAvailableThemes() { return window.appdata.availableThemes; }
    public getTheme() { return window.appdata.settings.theme; }
    public getCompact() { return window.appdata.settings.compact; }

    public setTheme(value:string) { window.appdata.settings.theme = value; }
    public setCompact(value:boolean) { window.appdata.settings.compact = value; }

}

export {
    WindowAppdata
}
