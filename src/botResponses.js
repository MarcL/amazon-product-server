import * as chatfuel from './transformers/chatfuel';

// Elf "no" gif
const NO_GIF = 'https://media.giphy.com/media/MhVdjqeKACHmM/giphy.gif';
const DEFAULT_TEXT = "🎁 Oops! I'm having trouble finding that!";
const notFound = (text = DEFAULT_TEXT) => {
    return chatfuel.imageAndText(NO_GIF, text);
};

export {notFound};
