<template>
  <div id="app">
    <leftNav></leftNav>
    <div class="appConten">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import leftNav from "@/components/common/leftNav";
  export default {
    name: 'app',
    components: {
      leftNav
    }
  }

</script>

<style>
  #app {
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .appConten{
    position: absolute;
   left: 80px;
   top:0;
   width: 100%;
   height: 100%;
  }
</style>
