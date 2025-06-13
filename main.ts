import { EventEmitter } from './emitter'
import { CustomCommandEvent } from './types'
import { callbacks } from './manager'

const CME = new EventEmitter<CustomCommandEvent>()

CME.subscribe((command) => {
    const listener = callbacks.get(command.name)
    listener?.(command.origin, ...command.args)
})
export default CME

import './register'
