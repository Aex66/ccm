import { CustomCommand, CustomCommandStatus, system } from "@minecraft/server";
import { Logger } from "./logger";
import { Command, commands } from "./manager";
import CME from "./main"
system.beforeEvents.startup.subscribe((start) => {

    function register(command: CustomCommand, parent?: string){
        start.customCommandRegistry.registerCommand({ ...command, name: `${Command.prefix ?? 'ccm'}:${command.name}`}, (origin, ...args) => {
            const name = parent ?? command.name
            system.run(() => CME.emit({ name, origin, args }))
            return { status: CustomCommandStatus.Success }
        })
    }

    commands.forEach((command) => {
        for (const enumData of command.enums.entries()){
            Logger.log(`Registering enum ${enumData[0]}`)
            start.customCommandRegistry.registerEnum(`${Command.prefix ?? 'ccm'}:${enumData[0]}`, enumData[1])
        }

        const name = command.name
        if (name.includes(":")) return;

        Logger.log(`Registering command ${name}`)

        register(command)

        for (const alias of command.aliases){
            Logger.log(`Registering command alias ${alias} for ${name}`)
            let aliase = { ...command, name: alias }
            register(aliase, name)
        }

        if (command?.name.includes(":")) return;        
    })
})

//import './@example/import' <-- Example of usage