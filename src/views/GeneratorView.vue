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
          v-model="stat.value"
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
          v-for="(item) in characterSheet.abilities"
          :key="item.label"
          :label="item.label"
          :value="item.special ? item.special.description : ''"
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
          :value="`${item.special ? item.special.description : ''} x${item.amount}`"
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
  </v-container>
</template>

<script>
export default {
  name: 'GeneratorView',
  props: ['raceId'],
  data: () => ({
    characterSheet: {
      header: {
        name: {
          label: 'Имя',
          value: ''
        },
        race: {
          label: 'Раса/Класс',
          value: ''
        },
        hp: {
          label: 'ХП (ОР)',
          value: ''
        },
        ac: {
          label: 'КД',
          value: ''
        },
        level: {
          label: 'Уровень',
          value: 0
        }
      },
      stats: {
        str: {
          label: 'Сила',
          value: ''
        },
        dex: {
          label: 'Ловкость',
          value: ''
        },
        wis: {
          label: 'Мудрость',
          value: ''
        },
        con: {
          label: 'Телосложение',
          value: ''
        },
        bra: {
          label: 'Храбрость',
          value: ''
        },
      },
      items: [

      ],
      spells: [

      ],
      abilities: [

      ]
    }
  })
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
