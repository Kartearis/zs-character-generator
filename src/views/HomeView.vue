<template>
  <div class="home">
    <setup-form/>
  </div>
</template>

<script>
// @ is an alias to /src
import SetupForm from '@/components/SetupForm.vue';

export default {
  name: 'HomeView',
  components: {
    SetupForm,
  },
};
</script>
