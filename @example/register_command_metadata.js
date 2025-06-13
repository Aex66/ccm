import { Command } from "../manager";
Command.register('help')
    .alias('h')
    .int('page', false);
Command.register('launch')
    .float('height', false);
