<template>
  <v-container>
    <v-item-group
      v-model="selectedRaceIndex"
      class="grid-view"
    >
      <v-item
        v-slot="{ toggle }"
        v-for="race in races"
        :key="race.title"
      >
        <v-card
          @click="() => {toggle(); $router.push(`/generator/${race.id}`);}"
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
export default {
  name: 'SetupForm',
  data: () => ({
    races: [
      {
        id: 'warrior',
        title: 'Воин',
        help: 'Танкует и бьёт',
      },
      {
        id: 'elf',
        title: 'Эльф',
        help: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate mi purus, in faucibus quam viverra nec. Morbi eu est enim. Praesent pulvinar neque at nibh venenatis gravida eu et dui. Morbi placerat purus id libero sollicitudin, ut dignissim nisi molestie. Fusce sit amet pulvinar elit. Aliquam sit amet magna aliquam ex pellentesque iaculis. Aenean et tempor nisl. In hac habitasse platea dictumst. Sed mattis egestas magna, fermentum interdum eros vehicula in. Nam accumsan elit et dui auctor, id condimentum lacus auctor.\n'
          + '\n'
          + 'Cras ante urna, iaculis pretium ultrices at, egestas ac enim. Cras congue pharetra nisl, vitae tempor diam sollicitudin ac. Quisque a odio imperdiet, bibendum augue a, cursus justo. In in sagittis massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque placerat nisl a augue luctus gravida. Aliquam sagittis lacus sit amet metus facilisis, in mattis arcu facilisis. Sed tincidunt, nisi at sagittis facilisis, nulla diam gravida felis, at vulputate elit elit ut nisi.',
      },
      {
        id: 'wizard',
        title: 'Маг',
        help: 'Быстро растёт',
      },
    ],
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
