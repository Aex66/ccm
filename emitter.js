export class EventEmitter {
    constructor() {
        this.listeners = [];
    }
    subscribe(listener, priority = "LOW") {
        const priorityValue = EventEmitter.EventPriority[priority];
        if (priorityValue === EventEmitter.EventPriority.HIGH) {
            this.listeners.unshift(listener);
        }
        else {
            this.listeners.push(listener);
        }
    }
    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    emit(event) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}
EventEmitter.EventPriority = {
    LOW: 1,
    HIGH: 2
};
