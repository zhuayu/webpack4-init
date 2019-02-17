<template>
  <div>
    <div class="example">{{ msg }}</div>
    <img :src="avatar_url">
  </div>
</template>

<script>
import Avatar from './../img/avatar.png';
export default {
  data () {
    return {
      msg: 'Hello world!',
      avatar_url: Avatar,
    }
  }
}
</script>

<style lang="less">
.example {
  color: red;
}
</style>