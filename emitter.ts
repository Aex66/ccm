type Listener<T> = (event: T) => void;
export class EventEmitter<T> {
    private listeners: Listener<T>[] = [];
    static EventPriority = {
        LOW: 1,
        HIGH: 2
    }

    subscribe(listener: Listener<T>, priority: keyof typeof EventEmitter.EventPriority = "LOW") {
        const priorityValue = EventEmitter.EventPriority[priority];

        if (priorityValue === EventEmitter.EventPriority.HIGH) {
            this.listeners.unshift(listener);
        } else {
            this.listeners.push(listener);
        }
    }

    unsubscribe(listener: Listener<T>) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    emit(event: T) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}
