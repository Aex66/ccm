import { CustomCommandSource } from "@minecraft/server";
import { Command } from "../../manager";

Command.run('launch', (origin, height: number = 1.0) => {
    if (origin.sourceType !== CustomCommandSource.Entity) return;

    origin.sourceEntity.applyKnockback({ x: 0, z: 0 }, height)
})