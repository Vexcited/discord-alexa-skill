/**
 * Cleaning text and returning the result.
 * @param {string} text - The text to clean
 */
const fixSSMLContent = (text) => {
    return text.replace(/[<>]/g, c => `\\${c}`);
}

module.exports = fixSSMLContent;