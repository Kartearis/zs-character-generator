const spells = {
  light: {
    special: '"Свет" - Вспыхивает свет',
    amount: 5,
  },
  darkness: {
    special: '"Тьма" - Становится темно (автопобег)',
    amount: 5,
  },
  voice: {
    special: '"Голос" - Враг бежит за голосом (66%)',
    amount: 5,
  },
  fightFear: {
    special: '"Борьба со страхом" - Возвращает убегающего врага (БУ 12)',
    amount: 5,
  },
  initiative: {
    special: '"Инициатива" - Игрок бьёт первым',
    amount: 10,
  },
};

export default spells;

const spellsByLevels = [
  [spells.light, spells.darkness, spells.voice, spells.fightFear, spells.initiative],
  [],
  [],
];

export { spellsByLevels };
