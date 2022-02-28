class EventBus {

    action:any;

    constructor() {

        this.action = function(event:any) {};

    }

    on(eventType:string, callback:Function) {

        this.action = function(event:any) {
            callback(event);
        }

        document.addEventListener(eventType, this.action);

    }

    remove(eventType:string) {

        document.removeEventListener(eventType, this.action);

    }

    dispatch(eventType:string, args:{}) {

        document.dispatchEvent(new CustomEvent(eventType, {
            detail:args
        }));

    }

}

export {
    EventBus
};
