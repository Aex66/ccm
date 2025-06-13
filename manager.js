import { CustomCommandParamType as ParamType, CommandPermissionLevel as PermissionLevel } from "@minecraft/server";
const PERMISSION_MAP = {
    Any: PermissionLevel.Any,
    GameDirectors: PermissionLevel.GameDirectors,
    Admin: PermissionLevel.Admin,
    Host: PermissionLevel.Host,
    Owner: PermissionLevel.Owner,
};
export const commands = new Set();
export const callbacks = new Map();
class CommandBuilder {
    constructor(name) {
        this.name = name;
        this.description = "";
        this.permissionLevel = PermissionLevel.Any;
        this.mandatoryParameters = [];
        this.optionalParameters = [];
        this.enums = new Map();
        this.aliases = [];
    }
    /**
     * Creates an exact copy of this command with a different name.
     * @param value
     */
    alias(value) {
        this.aliases.push(value);
        return this;
    }
    /**
     * Sets the description of the command
     * @param text
     * @returns
     */
    describe(text) {
        this.description = text;
        return this;
    }
    /**
     * Sets the permission level required to execute this command
     * @param level
     * @returns
     */
    permission(level) {
        const resolved = typeof level === "string" ? PERMISSION_MAP[level] : level;
        if (resolved === undefined) {
            throw new Error(`Invalid permission level: ${level}`);
        }
        this.permissionLevel = resolved;
        return this;
    }
    /**
     * Sets a custom requirement function that determines whether the command can be executed.
     *
     * This allows for fine-grained control beyond basic permission levels. The function you provide
     * receives the `CustomCommandOrigin` and must return `true` if the command is allowed to run,
     * or `false` to block it.
     *
     * @example
     * Command.register("kick")
     *   .requires(origin => origin.sourceType === CustomCommandSource.Entity && origin.sourceEntity instanceof Player && origin.sourceEntity.name === "Aex"); // Only allow Aex to use this command
     *
     * @param required A predicate function that receives the command origin and returns a boolean.
     */
    requires(required) {
        this.required = required;
        return this;
    }
    _addEnum(name, values, required = false) {
        if (name.includes(':'))
            return this;
        const id = `${Command.prefix}:${name}`;
        const param = { name: id, type: ParamType.Enum };
        (required ? this.mandatoryParameters : this.optionalParameters).push(param);
        this.enums.set(name, values);
        return this;
    }
    _addParam(type, name, required = false) {
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
    string(name, required = false) {
        return this._addParam(ParamType.String, name, required);
    }
    /**
     * Adds an integer parameter
     * @param name
     * @param required
     * @returns
     */
    int(name, required = false) {
        return this._addParam(ParamType.Integer, name, required);
    }
    /**
     * Adds a float parameter
     * @param name
     * @param required
     * @returns
     */
    float(name, required = false) {
        return this._addParam(ParamType.Float, name, required);
    }
    /**
     * Adds a boolean parameter
     * @param name
     * @param required
     * @returns
     */
    bool(name, required = false) {
        return this._addParam(ParamType.Boolean, name, required);
    }
    /**
     * Adds a player parameter
     * @param name
     * @param required
     * @returns
     */
    player(name = "player", required = false) {
        return this._addParam(ParamType.PlayerSelector, name, required);
    }
    /**
     * Adds an entity parameter
     * @param name
     * @param required
     * @returns
     */
    entity(name = "entity", required = false) {
        return this._addParam(ParamType.EntitySelector, name, required);
    }
    /**
     * Adds a position parameter
     * @param name
     * @param required
     * @returns
     */
    position(name = "position", required = false) {
        return this._addParam(ParamType.Location, name, required);
    }
    /**
     * Adds an itemType parameter
     * @param name
     * @param required
     * @returns
     */
    item(name = "item", required = false) {
        return this._addParam(ParamType.ItemType, name, required);
    }
    /**
     * Adds a blockType parameter
     * @param name
     * @param required
     * @returns
     */
    block(name = "item", required = false) {
        return this._addParam(ParamType.BlockType, name, required);
    }
    /**
     * Adds an enum parameter
     * @param name
     * @param values
     * @param required
     * @returns
     */
    enum(name = "item", values, required = false) {
        return this._addEnum(name, values, required);
    }
}
export class Command {
    /**
     * Register a slash command
     * @param {string} name
     */
    static register(name) {
        const command = new CommandBuilder(name);
        commands.add(command);
        return command;
    }
    /**
     * Sets the slash commands prefix
     * @param prefix
     */
    static _prefix(prefix) {
        Command.prefix = prefix;
    }
    /**
     * Registers a callback for a custom command.
     * @param name
     * @param call
     */
    static run(name, callback) {
        if (![...commands.values()].some(command => command.name === name))
            return;
        callbacks.set(name, callback);
    }
}
