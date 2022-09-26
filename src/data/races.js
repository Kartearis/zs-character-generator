import abilities from '@/data/abilities';
import { spellsByLevels } from '@/data/spells';

export function selectFromList(list) {
  const id = Math.floor(Math.random() * list.length);
  return list[id];
}

export default {
  warrior: {
    title: 'Воин',
    help: `Обычный человек, тренировался сражаться. Может использовать любые доспехи и оружие.
    Развивается медленно, магией почти не пользуется. Универсал.`,
    abilities: [
      abilities.penetrationMelee1,
      abilities.penetrationRanged1,
    ],
    itemFilter: () => true,
    hp: {
      min: 7,
      max: 8,
    },
    requirements: (stats) => stats.str.value >= 9,
    postProcessing: () => {},
  },
  elf: {
    title: 'Эльф',
    help: `Изящный эльф. Может использовать любое снаряжение, кроме лат и двуручного оружия (потому что дрыщ).
    Умеет колдовать просто потому, что он эльф. Развивается медленно, но силён с самого начала.`,
    abilities: [
      {
        label: 'Сопротивление',
        special: 'Сопротивление яду пауков-крабов',
      },
      {
        label: 'Сопротивление',
        special: 'Сопротивление параличу гулей',
      },
    ],
    itemFilter: (item) => {
      const restricted = ['Латы', 'Двуручный меч', 'Алебарда'];
      return !restricted.includes(item.label);
    },
    hp: {
      min: 4,
      max: 9,
    },
    requirements: (stats) => stats.str.value >= 9 && stats.bra.value >= 9,
    postProcessing: (characterSheet) => {
      // Add spells here
      characterSheet.spells.push(selectFromList(spellsByLevels[0]));
    },
  },
  wizard: {
    title: 'Маг',
    help: `Обычный человек, 30 лет корпел над книгами. При этом магией на 0 уровне не владеет.
    Зато очень быстро растёт, а его атаки и статы с самого начала усилены. Очень ограниченный выбор оружия и доспехов.`,
    abilities: [
      abilities.penetrationMelee2,
      abilities.penetrationRanged2,
      {
        label: 'Увеличение урона',
        special: '+1 к урону при попадании',
      },
      {
        label: 'Отгон',
        special: 'Отгон каменных (сложность 9 - уровень)',
      },
      {
        label: 'Отгон',
        special: 'Отгон оборотней (сложность 9 - уровень)',
      },
    ],
    itemFilter: (item) => {
      const allowed = ['Кинжал', 'Серебряный кинжал', 'Золотой кинжал', 'Кожаный доспех'];
      return allowed.includes(item.label);
    },
    hp: {
      min: 5,
      max: 10,
    },
    requirements: (stats) => stats.wis.value >= 9,
    postProcessing: (characterSheet) => {
      // Upgrade stats here
      const upgrades = [0, 0, 0, 1, 2, 3];
      Object.keys(characterSheet.stats).forEach(
        (key) => {
          const addition = selectFromList(upgrades);
          characterSheet.stats[key].value += addition;
          characterSheet.stats[key].modified = addition > 0;
        },
      );
    },
  },
  cron: {
    title: 'Крон',
    help: `Неизвестный науке покемон, что-то среднее между титаном и гоблином. Вызывает инстинктивный страх у животных.
    Обладает магией, как маг или эльф, растёт со средней скоростью. Не может использовать латы.
    Оружие - только короткий меч или лук.`,
    abilities: [
      {
        label: 'Отгон',
        special: 'Отгон животных (сложность 9 - уровень)',
      },
    ],
    itemFilter: (item) => {
      const restrictedArmor = ['Латы'];
      const allowedWeapons = ['Короткий меч', 'Короткий лук'];
      if (item.defence && !restrictedArmor.includes(item.label)) return true;
      if (item.attack && allowedWeapons.includes(item.label)) return true;
      return false;
    },
    hp: {
      min: 5,
      max: 7,
    },
    requirements: (stats) => stats.wis.value >= 9 && stats.dex.value >= 9,
    postProcessing: (characterSheet) => {
      // Upgrade stats here
      const upgrades = [0, 0, 1];
      Object.keys(characterSheet.stats).forEach(
        (key) => {
          const addition = selectFromList(upgrades);
          characterSheet.stats[key].value += addition;
          characterSheet.stats[key].modified = addition > 0;
        },
      );
    },
  },
  dwarf: {
    title: 'Гном (Дварф)',
    help: `Дварф - коренастый и подкачанный чел, способный носить любые доспехи кроме лат. Не может
    использовать длинное оружие и двуручные мечи (для этого слишком низкий). В него сложнее попасть
    из-за роста.`,
    abilities: [
      {
        label: 'Требуется подгонка',
        special: 'Все доспехи на 5 монет дороже',
      },
      abilities.armorClass1,
    ],
    itemFilter: (item) => {
      const restricted = ['Латы', 'Двуручный меч', 'Длинный меч', 'Длинный лук', 'Алебарда'];
      return !restricted.includes(item.label);
    },
    hp: {
      min: 6,
      max: 8,
    },
    requirements: (stats) => stats.dex.value >= 9 && stats.con.value >= 9,
    postProcessing: () => {},
  },
};
