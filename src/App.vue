<template>
  <div id="app">
    <v-app>
      <v-app-bar app class="d-print-none">
        <router-link to="/">К настройкам</router-link>
      </v-app-bar>
      <v-main app>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media print {

}
</style>
