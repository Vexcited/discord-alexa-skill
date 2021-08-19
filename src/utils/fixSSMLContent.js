/**
 * Cleaning text and returning the result.
 * @param {string} text - The text to clean
 */
const fixSSMLContent = (text) => {
    let newText = text;

    // Defining some emotes.
    const symols = ["<", ">"];

    // Replace emotes with void.
    symols.forEach(symbol => {
        // Regex replace every symbol with void.
        newText = newText.replace(new RegExp(symbol, "g"), `\\${symbol}`);
    });

    return newText;
}

module.exports = fixSSMLContent;