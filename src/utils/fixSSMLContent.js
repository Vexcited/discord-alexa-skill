/**
 * Cleaning text and returning the result.
 * @param {string} text - The text to clean
 */
const fixSSMLContent = (text) => {
    let newText = text;

    // Symbols to escape.
    const symols = ["<", ">"];

    // Escape symbols.
    symols.forEach(symbol => {
        newText = newText.replace(new RegExp(symbol, "g"), `\\${symbol}`);
    });

    return newText;
}

module.exports = fixSSMLContent;