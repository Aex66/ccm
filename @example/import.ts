/**
 * This is the file that is loaded in early execution.
 */

import { world } from "@minecraft/server";

import './register_command_metadata' //<-- Imports the command metada

world.afterEvents.worldLoad.subscribe(() => {
    import("./index")
})