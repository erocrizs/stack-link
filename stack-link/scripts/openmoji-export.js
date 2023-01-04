const openmoji = require("openmoji");
const fs = require("fs");

const colorDirectory = "public/emoji/color";
const blackDirectory = "public/emoji/black";
const omColorDirectory = "node_modules/openmoji/color/svg/";
const omBlackDirectory = "node_modules/openmoji/black/svg/";

const emojiList = [
  "🥵", "🙀", "🤣", "🤢", "🥶", "👾", "🤡", "🌚",
  "🎅", "🦸‍♀️", "👸", "🧌", "🧙", "🧕", "👨‍🍳", "🥷",
  "🍓", "🍊", "🥭", "🍏", "🫐", "🍆", "🧄", "🍙",
  "⛩", "🕍", "🚍", "🚜", "🗽", "☂", "⛪", "🚛",
  "🦜", "🐅", "🐝", "🐢", "🐋", "🐖", "🐏", "🦍",
  "💄", "🦺", "🩴", "🪖", "👖", "👛", "🥼", "🕶",
  "🥊", "🏀", "🏆", "🪢", "⛸", "🪀", "⚽", "♟",
  "⛔", "☢", "⚠", "♻", "♿", "♓", "☮", "☯",
];

emojiList.forEach(
  emoji => {
    const codepoint = emoji.codePointAt(0).toString(16).toUpperCase();
    console.log(`copying for ${emoji} - ${codepoint}`);
    fs.copyFileSync(`${omColorDirectory}/${codepoint}.svg`, `${colorDirectory}/${codepoint}.svg`);
    fs.copyFileSync(`${omBlackDirectory}/${codepoint}.svg`, `${blackDirectory}/${codepoint}.svg`);
  }
);