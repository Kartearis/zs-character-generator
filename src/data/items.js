
const armor = [
  {
    label: 'Латы',
    defence: 2,
    price: 150
  },
  {
    label: 'Панцирь',
    defence: 3,
    price: 80
  },
  {
    label: 'Серебряная кольчуга',
    defence: 4,
    price: 50
  },
  {
    label: 'Железная кольчуга',
    defence: 5,
    price: 40
  },
  {
    label: 'Кожано-серебряный доспех',
    defence: 6,
    price: 30
  },
  {
    label: 'Кожаный доспех',
    defence: 7,
    price: 20
  },
  {
    label: 'Щит',
    defence: '-1',
    price: 15
  },
];

const weapons = [
  {
    label: 'Короткий меч',
    attack: {
      min: 1, max: 6
    },
    ranged: false,
    price: 15
  },
  {
    label: 'Длинный меч',
    attack: {
      min: 2, max: 7
    },
    ranged: false,
    price: 20
  },
  {
    label: 'Двуручный меч',
    attack: {
      min: 4, max: 9
    },
    twoHanded: true,
    ranged: false,
    price: 35
  },
  {
    label: 'Кинжал',
    attack: {
      min: 1, max: 3
    },
    ranged: false,
    price: 3
  },
  {
    label: 'Серебряный кинжал',
    attack: {
      min: 1, max: 6
    },
    ranged: false,
    price: 60
  },
  {
    label: 'Золотой кинжал',
    attack: {
      min: 1, max: 5
    },
    ranged: false,
    price: 30
  },
  {
    label: 'Алебарда',
    attack: {
      min: 3, max: 8
    },
    twoHanded: true,
    ranged: false,
    price: 25
  },
  {
    label: 'Копьё',
    attack: {
      min: 2, max: 4
    },
    ranged: false,
    price: 7
  },
  {
    label: 'Боевой молот',
    attack: {
      min: 1, max: 3
    },
    ranged: false,
    price: 6
  },
  {
    label: 'Боевой топор',
    attack: {
      min: 1, max: 9
    },
    ranged: false,
    price: 30
  },
  {
    label: 'Длинный лук',
    attack: {
      min: 2, max: 7
    },
    ammo: 'Длинная стрела',
    twoHanded: true,
    ranged: true,
    price: 40
  },
  {
    label: 'Короткий лук',
    attack: {
      min: 1, max: 6
    },
    ammo: 'Короткая стрела',
    twoHanded: true,
    ranged: true,
    price: 25
  },
  {
    label: 'Арбалет',
    attack: {
      min: 2, max: 4
    },
    ammo: "Болт",
    ranged: true,
    price: 20
  },
  {
    label: 'Праща',
    attack: {
      min: 1, max: 3
    },
    ranged: true,
    ammo: ['Камень', 'Ядро для пращи'],
    price: 30
  },
  {
    label: 'Катапульта',
    attack: {
      min: 1, max: 18
    },
    ammo: 'Ядро для катапульты',
    ranged: true,
    price: 250
  },
  {
    label: 'Дротик',
    attack: {
      min: 1, max: 3
    },
    ranged: true,
    price: 1
  },
  {
    label: 'Метательный топор',
    attack: {
      min: 2, max: 4
    },
    ranged: true,
    price: 5
  },
];

const ammo = [
  {
    label: 'Длинная стрела',
    price: 1
  },
  {
    label: 'Короткая стрела',
    price: 1
  },
  {
    label: 'Болт',
    price: 1
  },
  {
    label: 'Камень',
    price: 0
  },
  {
    label: 'Ядро для пращи',
    price: 1
  },
  {
    label: 'Ядро для катапульты',
    price: 20
  },
]

const bags = [
  {
    label: 'Мешок',
    price: 1,
    volume: 200
  },
  {
    label: 'Большой мешок',
    price: 2,
    volume: 400
  },
  {
    label: 'Повозка',
    price: 100,
    volume: 6000
  }
];

const items = [
  {
    label: 'Вино (3л)',
    price: 3,
  },
  {
    label: 'Распознавание напитков',
    price: 200,
  },
  {
    label: 'Кол',
    price: 2,
  },
  {
    label: 'Набор ключей для открывания сундуков',
    price: 5,
  },
  {
    label: 'Святая вода',
    price: 25,
  },
  {
    label: 'Священный аконит',
    price: 50,
  },
  {
    label: 'Верёвка (15м)',
    price: 5,
  },
  {
    label: 'Огниво',
    price: 1,
  },
  {
    label: 'Факел',
    price: 2,
  },
  {
    label: 'Советчик',
    price: 1000,
  },
];

const animals = [
  {
    label: 'Мул',
    price: 25,
    volume: 1500
  },
  {
    label: 'Лошадь',
    price: 50,
    volume: 1700
  },
  {
    label: 'Боевой конь',
    price: 200,
    volume: 1700,
  },
];

const stone = {
  label: 'Булыжник',
  price: 0,
  attack: {
    min: 0,
    max: 1
  }
}

export {armor, weapons, ammo, bags, animals, items, stone};
