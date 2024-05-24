<template>
  <the-header></the-header>
  <router-view/>
</template>
<script>
import theHeader from "../the-header.vue";
export default {
  components: { theHeader },
};
</script>