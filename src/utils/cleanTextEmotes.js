/**
 * Removing emotes from text and returning the result.
 * @param {string} text - The text to clean
 */
const cleanTextEmotes = (text) => {
    let newText = text.toLowerCase();

    // Defining some emotes.
    const emotes = [":d", "xd", "<3", ":)", ":(", "-.-", ".-.", "'-'", ":')"];

    // Replace emotes with void.
    emotes.forEach(emote => {
        newText = newText.replace(emote, "");
    });

    return newText;
}

module.exports = cleanTextEmotes;