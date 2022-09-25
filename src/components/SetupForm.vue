<template>
  <v-container>
    <v-item-group
      v-model="selectedRaceIndex"
      class="grid-view"
    >
      <v-item
        v-slot="{ toggle }"
        v-for="(race, key) in races"
        :key="key"
      >
        <v-card
          @click="() => {toggle(); $router.push(`/generator/${key}`);}"
        >
          <v-card-title>
            {{ race.title }}
          </v-card-title>
          <v-card-text>
            {{ race.help }}
          </v-card-text>
        </v-card>
      </v-item>
    </v-item-group>
  </v-container>
</template>

<script>
import races from '@/data/races';

export default {
  name: 'SetupForm',
  data: () => ({
    races,
    selectedRaceIndex: undefined,
  }),
};
</script>

<style scoped>
  .grid-view {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
</style>
