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
          :key="item.item.label"
          :label="item.item.label"
          :value="showItem(item.item, item.amount)"
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
import {
  armor, weapons, ammo, bags, items, animals, stone,
} from '@/data/items';
import races from '../data/races';

// TODO: make price changes for dwarf!!

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
      // Can be made more hardcore by switching round with floor
      return Math.round(Math.random() * (max - min) + min);
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
    showItem(item, amount) {
      if (item.label === 'Деньги') return `Монеты ${amount}`;
      if (item.defence) return `КД ${item.defence} ${amount > 1 ? `x${amount}` : ''}`;
      if (item.attack) return `${item.ranged === true ? 'ДБ' : 'ББ'} ${item.attack.min} - ${item.attack.max} ${amount > 1 ? `x${amount}` : ''}`;
      if (item.special) return `${item.special} ${amount > 1 ? `x${amount}` : ''}`;
      return `${item.label} ${amount > 1 ? `x${amount}` : ''}`;
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
      let money = this.generateStat() * 10;
      this.characterSheet.items.push({
        item: {
          label: 'Деньги',
        },
        amount: money,
      });
      const allowedArmor = armor.filter(races[this.raceId].itemFilter)
        .filter((item) => item.price < money)
        .sort((a, b) => b.price - a.price);
      if (allowedArmor.length > 0) {
        this.characterSheet.items.push({
          item: allowedArmor[0],
          amount: 1,
        });
        money -= allowedArmor[0].price;
      }
      const shield = allowedArmor.find((x) => x.label === 'Щит');
      let shieldTaken = false;
      if (money > 50 && shield && this.randomInt(0, 10) > 2) {
        this.characterSheet.items.push({
          item: shield,
          amount: 1,
        });
        money -= shield.price;
        shieldTaken = true;
      }
      const allowedWeaponsMelee = weapons.filter(races[this.raceId].itemFilter)
        .filter((item) => item.price < money && item.ranged !== true && (shieldTaken ? item.twoHanded !== true : true))
        .sort((a, b) => b.attack.max - a.attack.max);
      const allowedWeaponsRanged = weapons.filter(races[this.raceId].itemFilter)
        .filter((item) => item.price < money && item.ranged === true && (shieldTaken ? item.twoHanded !== true : true))
        .sort((a, b) => b.attack.max - a.attack.max);
      if (allowedWeaponsMelee.length > 0 && allowedWeaponsRanged.length > 0) {
        if (this.randomInt(0, 10) > 2) {
          this.characterSheet.items.push({
            item: allowedWeaponsMelee[0],
            amount: 1,
          });
          money -= allowedWeaponsMelee[0].price;
        } else {
          this.characterSheet.items.push({
            item: allowedWeaponsRanged[0],
            amount: 1,
          });
          money -= allowedWeaponsRanged[0].price;
        }
      } else if (allowedWeaponsMelee.length > 0) {
        this.characterSheet.items.push({
          item: allowedWeaponsMelee[0],
          amount: 1,
        });
        money -= allowedWeaponsMelee[0].price;
      } else if (allowedWeaponsRanged.length > 0) {
        this.characterSheet.items.push({
          item: allowedWeaponsRanged[0],
          amount: 1,
        });
        money -= allowedWeaponsRanged[0].price;
      } else {
        this.characterSheet.items.push({
          item: stone,
          amount: 1,
        });
      }
      const ammoRequired = this.characterSheet.items
        .filter((item) => item.item.ammo)
        .map((item) => item.item.ammo);
      if (ammoRequired.length > 0) {
        ammoRequired.forEach((ammoName) => {
          const ammoItem = ammo.find((item) => item.label === ammoName);
          if (ammoItem.price < money) {
            const amount = money >= ammoItem.price * 12 ? 12 : money / ammoItem.price;
            this.characterSheet.items.push({
              item: ammoItem,
              amount,
            });
            money -= ammoItem.price * amount;
          }
        });
      }
      this.characterSheet.items.find((item) => item.item.label === 'Деньги')
        .amount = money;
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
    calculateArmorAndHp() {
      const itemsSimplified = this.characterSheet.items
        .map((item) => item.item);
      const topArmor = itemsSimplified
        .filter((item) => typeof item.defence === 'number')
        .sort((a, b) => b.defence - a.defence)
        .at(0);
      let ac = 8;
      if (topArmor) ac = topArmor.defence;
      if (itemsSimplified.find((item) => item.label === 'Щит')) ac -= 1;
      this.characterSheet.abilities
        .filter((ability) => ability.modifier && ability.modifier.type === 'ac')
        .forEach((ability) => {
          ac += ability.modifier.value;
        });
      this.characterSheet.header.ac.value = ac;
      let hp = this.characterSheet.header.hp.value;
      this.characterSheet.abilities
        .filter((ability) => ability.modifier && ability.modifier.type === 'hp')
        .forEach((ability) => {
          hp += ability.modifier.value;
        });
      this.characterSheet.header.hp.value = hp;
      // Can be disabled to show what affected ac and hp
      this.characterSheet.abilities = this.characterSheet.abilities
        .filter((ability) => !ability.modifier || !['ac', 'hp'].includes(ability.modifier.type));
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
      this.calculateArmorAndHp();
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
