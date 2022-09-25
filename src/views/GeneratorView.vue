<template>
  <v-container class="player-card">
    <v-card class="player-card-header">
      <v-card-title class="player-card-header__inner">
        <v-text-field
          v-for="(header, key) in characterSheet.header"
          :key="key"
          :value="header.value"
          :label="header.label"
        >
        </v-text-field>
      </v-card-title>
    </v-card>
    <!-- TODO: remake list v-cards as component -->
    <v-card class="player-card__stats">
      <v-card-title>Статы</v-card-title>
      <v-card-text>
        <v-text-field
          v-for="(stat, key) in characterSheet.stats"
          :key="key"
          :label="stat.label"
          :value="`${stat.value}${stat.modified ? '*' : ''}`"
        >
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-card class="player-card__items">
      <v-card-title>Предметы</v-card-title>
      <v-card-text>
        <v-text-field
          v-for="(item) in characterSheet.items"
          :key="item.label"
          :label="item.label"
          :value="`${item.special ? item.special.description : ''} x${item.amount}`"
          readonly
        >
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Умения</v-card-title>
      <v-card-text>
        <v-text-field
          v-for="(item, index) in characterSheet.abilities"
          :key="item.label + index"
          :label="item.label"
          :value="item.special"
          readonly
        >
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Заклинания</v-card-title>
      <v-card-text>
        <v-text-field
          v-for="(item) in characterSheet.spells"
          :key="item.label"
          :label="item.label"
          :value="`${item.special ?? ''} x${item.amount}`"
          readonly
        >
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-card class="player-card__extra">
      <v-card-title>Опыт и заметки</v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
    <v-fab-transition>
      <v-btn
        color="blue"
        dark
        fixed
        bottom
        right
        fab
        @click="this.generateCharacter"
      >
        <v-icon>mdi-progress-wrench</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import modifiers from '@/data/modifiers';
import races from '../data/races';

export default {
  name: 'GeneratorView',
  props: ['raceId'],
  data: () => ({
    characterSheet: {
      header: {
        name: {
          label: 'Имя',
          value: '',
        },
        race: {
          label: 'Раса/Класс',
          value: '',
        },
        hp: {
          label: 'ХП (ОР)',
          value: '',
        },
        ac: {
          label: 'КД',
          value: '',
        },
        level: {
          label: 'Уровень',
          value: 0,
        },
      },
      stats: {
        str: {
          label: 'Сила',
          value: '',
        },
        dex: {
          label: 'Ловкость',
          value: '',
        },
        wis: {
          label: 'Мудрость',
          value: '',
        },
        con: {
          label: 'Телосложение',
          value: '',
        },
        bra: {
          label: 'Храбрость',
          value: '',
        },
      },
      items: [

      ],
      spells: [

      ],
      abilities: [

      ],
    },
  }),
  methods: {
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    reset() {
      Object.keys(this.characterSheet.stats).forEach((key) => {
        this.characterSheet.stats[key] = {
          label: this.characterSheet.stats[key].label,
          value: '',
          modified: false,
        };
      });
    },
    generateStat() {
      const rolls = [
        this.randomInt(1, 6),
        this.randomInt(1, 6),
        this.randomInt(1, 6),
        this.randomInt(1, 6),
      ];
      return rolls
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((s, x) => s + x);
    },
    generateStats() {
      Object.keys(this.characterSheet.stats).forEach((key) => {
        this.characterSheet.stats[key].value = this.generateStat();
      });
    },
    generateHp() {
      const { min, max } = races[this.raceId].hp;
      this.characterSheet.header.hp.value = this.randomInt(min, max);
    },
    generateItems() {
      this.characterSheet.items = [];
      this.characterSheet.items.push({
        label: 'Деньги',
        special: {
          description: 'Монеты',
          id: 'money',
        },
        amount: this.generateStat() * 10,
      });
    },
    generateName() {
      this.characterSheet.header.name.value = 'Klevandos Ortego';
    },
    applyModifiers() {
      this.characterSheet.spells = [];
      races[this.raceId].postProcessing(this.characterSheet);
      modifiers.forEach((modifier) => {
        modifier(this.characterSheet);
      });
    },
    copyAbilities() {
      this.characterSheet.abilities = structuredClone(races[this.raceId].abilities);
    },
    generateCharacter() {
      this.reset();
      this.characterSheet.header.race.value = races[this.raceId].title;
      this.generateName();
      this.generateHp();
      this.generateStats();
      while (this.raceId && !races[this.raceId].requirements(this.characterSheet.stats)) {
        this.generateStats();
      }
      this.copyAbilities();
      this.applyModifiers();
      this.generateItems();
    },
  },
};
</script>

<style scoped>
  .player-card {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content 1fr 1fr 1fr;
  }

  .player-card-header {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
  }

  .player-card-header__inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }

  .player-card__stats {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }

  .player-card__items {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }

  .player-card__extra {
    grid-column: 1 / span 2;
  }
</style>
