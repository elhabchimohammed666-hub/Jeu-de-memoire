export const DIFFICULTIES = [
  { id: "easy", name: "Détente", size: "4 × 4", pairs: 8, columns: 4 },
  { id: "medium", name: "Classique", size: "6 × 6", pairs: 18, columns: 6 },
  { id: "hard", name: "Expert", size: "6 × 8", pairs: 24, columns: 8 },
];

export const THEMES = [
  {
    id: "animals",
    name: "Animaux",
    icon: "🐼",
    cards: [
      "🐼", "🦊", "🐸", "🦁", "🐨", "🐯", "🦄", "🐙",
      "🦋", "🐢", "🦉", "🐳", "🦩", "🐝", "🦖", "🐬",
      "🦥", "🐿️", "🦚", "🐈", "🦔", "🐧", "🦜", "🦦",
    ],
  },
  {
    id: "space",
    name: "Espace",
    icon: "🪐",
    cards: [
      "🪐", "🚀", "🌙", "☄️", "🌎", "👨‍🚀", "🛸", "⭐",
      "🌌", "🌞", "🛰️", "🌠", "🔭", "👽", "🌑", "🌍",
      "🌕", "🌟", "☀️", "🌒", "🪨", "🌗", "🌘", "💫",
    ],
  },
  {
    id: "tech",
    name: "Technologies",
    icon: "🎧",
    cards: [
      "🎧", "💻", "📱", "⌚", "🎮", "📷", "🖨️", "🔋",
      "💡", "🕹️", "📡", "🤖", "🧭", "🔌", "💾", "🖱️",
      "⌨️", "📺", "🎙️", "🔬", "🧬", "⚙️", "🪫", "💿",
    ],
  },
  {
    id: "emojis",
    name: "Émotions",
    icon: "😎",
    cards: [
      "😎", "🥳", "🤩", "😴", "🤗", "😇", "🥰", "🤔",
      "😜", "🫠", "🤓", "😶‍🌫️", "😌", "🫶", "😏", "🥹",
      "🤠", "🫡", "😋", "🤭", "😆", "🫣", "😮‍💨", "😺",
    ],
  },
];

export function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function createDeck(theme, pairCount) {
  const pairValues = shuffle(theme.cards).slice(0, pairCount);
  return shuffle(
    pairValues.flatMap((value, pairId) => [
      { id: `${pairId}-a`, pairId, value },
      { id: `${pairId}-b`, pairId, value },
    ]),
  );
}
