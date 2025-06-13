import { CustomCommandParameter as CommandParameter, CustomCommandOrigin, CommandPermissionLevel as PermissionLevel } from "@minecraft/server";

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

export declare class CommandBuilder {
    /**
     * The name of the command
     */
    public name: string
    /**
     * The description of the command
     */
    public description: string;
    /**
     * The permission level required to execute this command.
     */
    public permissionLevel: PermissionLevel;
    /**
     * The required parameters
     */
    public mandatoryParameters: CommandParameter[];
    /**
     * The optional parameters
     */
    public optionalParameters: CommandParameter[];
    /**
     * The list of enums registered by this command.
     */
    public enums: Map<string, string[]>;
    /**
     * The list of aliases of this command.
     */
    public aliases: string[];
    /**
     * A predicate function that receives the command origin and returns a boolean.
     */
    required?: (origin: CustomCommandOrigin) => boolean;
}