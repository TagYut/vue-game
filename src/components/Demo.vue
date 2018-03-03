<template>
  <div class="demo">
    <p>{{title}}</p>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'test'
    }
  }
}
</script>

<style scoped>
  .demo {
    color: #ffffff;
  }
</style>
