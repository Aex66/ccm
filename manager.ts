import { CustomCommandParameter as CommandParameter, CustomCommandOrigin, CustomCommandParamType as ParamType, CommandPermissionLevel as PermissionLevel } from "@minecraft/server";
const PERMISSION_MAP = {
  Any: PermissionLevel.Any,
  GameDirectors: PermissionLevel.GameDirectors,
  Admin: PermissionLevel.Admin,
  Host: PermissionLevel.Host,
  Owner: PermissionLevel.Owner,
};

export const commands: Set<CommandBuilder> = new Set()
export const callbacks: Map<string, (origin: CustomCommandOrigin, ...args: any[]) => void> = new Map();

class CommandBuilder {
    public description: string;
    public permissionLevel: PermissionLevel;
    public mandatoryParameters: CommandParameter[];
    public optionalParameters: CommandParameter[]
    public enums: Map<string, string[]>;
    public aliases: string[];
    constructor(
        public name: string
    ){
        this.description = "";
        this.permissionLevel = PermissionLevel.Any;
        this.mandatoryParameters = [];
        this.optionalParameters = [];
        this.enums = new Map();
        this.aliases = []
    }

    /**
     * Creates an exact copy of this command with a different name.
     * @param value 
     */
    alias(value: string){
        this.aliases.push(value)
        return this;
    }

    /**
     * Sets the description of the command
     * @param text 
     * @returns 
     */
    describe(text: string) {
        this.description = text;
        return this;
    }

    /**
     * Sets the permission level required to execute this command
     * @param level 
     * @returns 
     */
    permission(level: PermissionLevel | string) {
        const resolved = typeof level === "string" ? PERMISSION_MAP[level as keyof typeof PERMISSION_MAP] : level;
        if (resolved === undefined) {
            throw new Error(`Invalid permission level: ${level}`);
        }
        this.permissionLevel = resolved;
        return this;
    }

    private _addEnum(name: string, values: string[], required: boolean = false) {
        if (name.includes(':')) return this;
        const id = `${Command.prefix}:${name}`
        const param = { name: id, type: ParamType.Enum };
        (required ? this.mandatoryParameters : this.optionalParameters).push(param);
        this.enums.set(name, values)
        return this;
    }

    private _addParam(type: ParamType, name: string, required: boolean = false) {
        const param = { name, type };
        (required ? this.mandatoryParameters : this.optionalParameters).push(param);
        return this;
    }

    /**
     * Adds a string parameter
     * @param name 
     * @param required 
     * @returns 
     */
    string(name: string, required: boolean = false) {
        return this._addParam(ParamType.String, name, required);
    }

    /**
     * Adds an integer parameter
     * @param name 
     * @param required 
     * @returns 
     */
    int(name: string, required: boolean = false) {
        return this._addParam(ParamType.Integer, name, required);
    }

    /**
     * Adds a float parameter
     * @param name 
     * @param required 
     * @returns 
     */
    float(name: string, required: boolean = false) {
        return this._addParam(ParamType.Float, name, required);
    }

    /**
     * Adds a boolean parameter
     * @param name 
     * @param required 
     * @returns 
     */
    bool(name: string, required: boolean = false) {
        return this._addParam(ParamType.Boolean, name, required);
    }

    /**
     * Adds a player parameter
     * @param name 
     * @param required 
     * @returns 
     */
    player(name: string = "player", required: boolean = false) {
        return this._addParam(ParamType.PlayerSelector, name, required);
    }

    /**
     * Adds an entity parameter
     * @param name 
     * @param required 
     * @returns 
     */
    entity(name: string = "entity", required: boolean = false) {
        return this._addParam(ParamType.EntitySelector, name, required);
    }

    /**
     * Adds a position parameter
     * @param name 
     * @param required 
     * @returns 
     */
    position(name: string = "position", required: boolean = false) {
        return this._addParam(ParamType.Location, name, required);
    }

    /**
     * Adds an itemType parameter
     * @param name 
     * @param required 
     * @returns 
     */
    item(name: string = "item", required: boolean = false) {
        return this._addParam(ParamType.ItemType, name, required);
    }

    /**
     * Adds a blockType parameter
     * @param name 
     * @param required 
     * @returns 
     */
    block(name: string = "item", required: boolean = false) {
        return this._addParam(ParamType.BlockType, name, required);
    }

    /**
     * Adds an enum parameter
     * @param name 
     * @param values
     * @param required 
     * @returns 
     */
    enum(name: string = "item", values: string[], required: boolean = false) {
        return this._addEnum(name, values, required);
    }
}

export class Command {
    public static prefix: string;

    /**
     * Register a slash command
     * @param {string} name
     */
    static register(name: string) {
        const command = new CommandBuilder(name);
        commands.add(command)
        return command
    }

    /**
     * Sets the slash commands prefix
     * @param prefix 
     */
    static _prefix(prefix: string){
        Command.prefix = prefix
    }

    /**
     * Registers a callback for a custom command.
     * @param name 
     * @param call 
     */
    static run(name: string, callback: (origin: CustomCommandOrigin, ...args: any[]) => void){
        if (![...commands.values()].some(command => command.name === name)) return;
        callbacks.set(name, callback)
    }
}