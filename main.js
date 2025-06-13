import { EventEmitter } from './emitter';
import { callbacks } from './manager';
const CME = new EventEmitter();
CME.subscribe((command) => {
    const listener = callbacks.get(command.name);
    listener?.(command.origin, ...command.args);
});
export default CME;
import './register';
