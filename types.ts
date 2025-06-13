import { CustomCommandOrigin } from "@minecraft/server";

export interface CustomCommandEvent {
    /**
     * The name of this command.
     */
    name: string;
    /**
     * The origin that executed this command.
     */
    origin: CustomCommandOrigin,
    /**
     * The parameters of this command.
     */
    args: any[]
}