import * as chatfuel from './transformers/chatfuel';

// Elf "no" gif
const NO_GIF = 'https://media.giphy.com/media/MhVdjqeKACHmM/giphy.gif';
const notFound = chatfuel.image(
    NO_GIF,
    "🎁 Oops! I'm having trouble finding that!"
);

export {notFound};
