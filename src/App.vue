<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDIW_tudji1qPkWQUOHiCmwMDpnsqlp-gc',
  authDomain: 'vue-game.firebaseapp.com',
  databaseURL: 'https://vue-game.firebaseio.com',
  projectId: 'vue-game',
  storageBucket: 'vue-game.appspot.com',
  messagingSenderId: '1089254111327'
}

firebase.initializeApp(config)

export default {
  name: 'App'
}
</script>

<style>
  @import url(https://fonts.googleapis.com/icon?family=Material+Icons);

  body {
    background: #111;
    font-family:"Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif;
    margin: 0;
  }
</style>
