export enum Emoji {
  // Emote
  HotFace = "🥵",
  WearyCat = "🙀",
  ROFL = "🤣",
  NauseatedFace = "🤢",
  ColdFace = "🥶",
  AlienMonster = "👾",
  Clown = "🤡",
  Robot = "🤖",

  // People
  SantaClaus = "🎅",
  WomanSuperhero = "🦸‍♀️",
  Princess = "👸",
  Troll = "🧌",
  ManGenie = "🧞‍♂️",
  WomanWithHeadscarf = "🧕",
  Cook = "👨‍🍳",
  Ninja = "🥷",

  // Food
  Strawberry = "🍓",
  Tangerine = "🍊",
  Mango = "🥭",
  GreenApple = "🍏",
  Blueberries = "🫐",
  Eggplant = "🍆",
  Garlic = "🧄",
  RiceBall = "🍙",

  // Travel
  ShintoShrine = "⛩",
  Synagogue = "🕍",
  OncomingBus = "🚍",
  Tractor = "🚜",
  StatueOfLiberty = "🗽",
  Umbrella = "☂",
  Church = "⛪",
  ArticulatedLorry = "🚛",

  // Animal
  Parrot = "🦜",
  Tiger = "🐅",
  HoneyBee = "🐝",
  Turtle = "🐢",
  Whale = "🐋",
  Pig = "🐖",
  Ram = "🐏",
  Gorilla = "🦍",

  // Clothing
  Lipstick = "💄",
  SafetyVest = "🦺",
  ThongSandal = "🩴",
  MilitaryHelmet = "🪖",
  Jeans = "👖",
  Purse = "👛",
  LabCoat = "🥼",
  Sunglasses = "🕶",

  // Activity
  BoxingGlove = "🥊",
  Basketball = "🏀",
  Trophy = "🏆",
  Knot = "🪢",
  IceSkate = "⛸",
  Yoyo = "🪀",
  SoccerBall = "⚽",
  ChessPawn = "♟",

  // Symbol
  NoEntry = "⛔",
  Radioactive = "☢",
  Warning = "⚠",
  Recycle = "♻",
  Wheelchair = "♿",
  Pisces = "♓",
  Peace = "☮",
  YinYang = "☯"
}

export enum EmojiCategory {
  Emote = 0,
  People,
  Food,
  Travel,
  Animal,
  Clothing,
  Activity,
  Symbol
}

export enum EmojiColor {
  Red = 0,
  Orange,
  Yellow,
  Green,
  Blue,
  Violet,
  White,
  Black
}

const EmojiGroup = [
  [Emoji.HotFace,  Emoji.WearyCat,  Emoji.ROFL,  Emoji.NauseatedFace,  Emoji.ColdFace,  Emoji.AlienMonster,  Emoji.Clown,  Emoji.Robot],
  [Emoji.SantaClaus,  Emoji.WomanSuperhero,  Emoji.Princess,  Emoji.Troll,  Emoji.ManGenie,  Emoji.WomanWithHeadscarf,  Emoji.Cook,  Emoji.Ninja],
  [Emoji.Strawberry,  Emoji.Tangerine,  Emoji.Mango,  Emoji.GreenApple,  Emoji.Blueberries,  Emoji.Eggplant,  Emoji.Garlic,  Emoji.RiceBall],
  [Emoji.ShintoShrine,  Emoji.Synagogue,  Emoji.OncomingBus,  Emoji.Tractor,  Emoji.StatueOfLiberty,  Emoji.Umbrella,  Emoji.Church,  Emoji.ArticulatedLorry],
  [Emoji.Parrot,  Emoji.Tiger,  Emoji.HoneyBee,  Emoji.Turtle,  Emoji.Whale,  Emoji.Pig,  Emoji.Ram,  Emoji.Gorilla],
  [Emoji.Lipstick,  Emoji.SafetyVest,  Emoji.ThongSandal,  Emoji.MilitaryHelmet,  Emoji.Jeans,  Emoji.Purse,  Emoji.LabCoat,  Emoji.Sunglasses],
  [Emoji.BoxingGlove,  Emoji.Basketball,  Emoji.Trophy,  Emoji.Knot,  Emoji.IceSkate,  Emoji.Yoyo,  Emoji.SoccerBall,  Emoji.ChessPawn],
  [Emoji.NoEntry,  Emoji.Radioactive,  Emoji.Warning,  Emoji.Recycle,  Emoji.Wheelchair,  Emoji.Pisces,  Emoji.Peace,  Emoji.YinYang],
];

export function GetEmoji(category: EmojiCategory, color: EmojiColor): Emoji {
  return EmojiGroup[category as number][color as number];
}

export function GetEmojiGroup(category: EmojiCategory): Emoji[] {
  return [...EmojiGroup[category as number]];
}