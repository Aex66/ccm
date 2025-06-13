import { CustomCommandSource, Player } from "@minecraft/server";
import { Command, commands } from "../../manager";
const COMMANDS_PER_PAGE = 5

Command.run('help', (origin, page: number = 1) => {
    if (origin.sourceType !== CustomCommandSource.Entity || !(origin.sourceEntity instanceof Player)) return;

    const player = origin.sourceEntity;
    const cmdArray = Array.from(commands);
    const totalPages = Math.ceil(cmdArray.length / COMMANDS_PER_PAGE);

    // Clamp page
    const clampedPage = Math.max(1, Math.min(page, totalPages));
    const start = (clampedPage - 1) * COMMANDS_PER_PAGE;
    const end = start + COMMANDS_PER_PAGE;
    const visibleCommands = cmdArray.slice(start, end);

    // Header
    player.sendMessage(`§6=== Help (Page ${clampedPage}/${totalPages}) ===`);

    // List commands
    for (const cmd of visibleCommands) {
        const name = cmd.name;
        const aliases = cmd.aliases?.length ? ` (Aliases: ${cmd.aliases.join(", ")})` : "";
        const desc = cmd.description || "No description.";
        player.sendMessage(`§e/${name}§r - ${desc}${aliases}`);
    }

    // Footer
    if (clampedPage < totalPages) {
        player.sendMessage(`§7Type §e/help ${clampedPage + 1}§7 to see more.`);
    }
})