import abilities from '@/data/abilities';

// TODO: refactor
export default [
  (characterSheet) => {
    const stat = 'str';
    const abilityPrefix = 'penetrationMelee';
    if (characterSheet.stats[stat].value >= 18) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 3]);
    } else if (characterSheet.stats[stat].value >= 16) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 2]);
    } else if (characterSheet.stats[stat].value >= 13) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 1]);
    } else if (characterSheet.stats[stat].value <= 8) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${1}`]);
    } else if (characterSheet.stats[stat].value <= 5) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${2}`]);
    } else if (characterSheet.stats[stat].value <= 3) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${3}`]);
    }
  },
  (characterSheet) => {
    const stat = 'dex';
    const abilityPrefix = 'penetrationRanged';
    const abilityPrefix2 = 'armorClass';
    if (characterSheet.stats[stat].value >= 18) {
      characterSheet.abilities.push(abilities[abilityPrefix + 3]);
      characterSheet.abilities.push(abilities[abilityPrefix2 + 3]);
    } else if (characterSheet.stats[stat].value >= 16) {
      characterSheet.abilities.push(abilities[abilityPrefix + 2]);
      characterSheet.abilities.push(abilities[abilityPrefix2 + 2]);
    } else if (characterSheet.stats[stat].value >= 13) {
      characterSheet.abilities.push(abilities[abilityPrefix + 1]);
      characterSheet.abilities.push(abilities[abilityPrefix2 + 1]);
    } else if (characterSheet.stats[stat].value <= 8) {
      characterSheet.abilities.push(abilities[`${abilityPrefix}N${1}`]);
      characterSheet.abilities.push(abilities[`${abilityPrefix2}N${1}`]);
    } else if (characterSheet.stats[stat].value <= 5) {
      characterSheet.abilities.push(abilities[`${abilityPrefix}N${2}`]);
      characterSheet.abilities.push(abilities[`${abilityPrefix2}N${2}`]);
    } else if (characterSheet.stats[stat].value <= 3) {
      characterSheet.abilities.push(abilities[`${abilityPrefix}N${3}`]);
      characterSheet.abilities.push(abilities[`${abilityPrefix2}N${3}`]);
    }
  },
  (characterSheet) => {
    const stat = 'wis';
    const abilityPrefix = 'challengeCompletion';
    if (characterSheet.stats[stat].value >= 18) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 3]);
    } else if (characterSheet.stats[stat].value >= 16) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 2]);
    } else if (characterSheet.stats[stat].value >= 13) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 1]);
    } else if (characterSheet.stats[stat].value <= 8) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${1}`]);
    } else if (characterSheet.stats[stat].value <= 5) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${2}`]);
    } else if (characterSheet.stats[stat].value <= 3) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${3}`]);
    }
  },
  (characterSheet) => {
    const stat = 'con';
    const abilityPrefix = 'health';
    if (characterSheet.stats[stat].value >= 18) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 3]);
    } else if (characterSheet.stats[stat].value >= 16) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 2]);
    } else if (characterSheet.stats[stat].value >= 13) {
      characterSheet.abilities
        .push(abilities[abilityPrefix + 1]);
    } else if (characterSheet.stats[stat].value <= 8) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${1}`]);
    } else if (characterSheet.stats[stat].value <= 5) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${2}`]);
    } else if (characterSheet.stats[stat].value <= 3) {
      characterSheet.abilities
        .push(abilities[`${abilityPrefix}N${3}`]);
    }
  },
];
