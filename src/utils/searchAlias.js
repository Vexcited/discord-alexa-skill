const aliases = require("../../aliases.json");

/**
 * Search the given ID in the given type in the aliases.json file.
 * @param {String} id - Thing ID.
 * @param {String} type - Can be "channels", "guilds" or "users".
 */
const searchAlias = (id, type) => {
    const typeAliases = aliases[type];
    const response = {
        success: false,
        alias: null
    };

    for (const [alias, typeId] of Object.entries(typeAliases)) {
        if (id === typeId) {
            response.success = true;
            response.alias = alias;
        }
    }

    return response;
}

module.exports = searchAlias;