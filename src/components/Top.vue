<template>
  <div>
    <div class="monsters">
      <div class="monster" v-for="monster in monsters" :key="monster.id">
        <div class="monster-hp">
          <span class="monster-hp-bar" :style="{ width: monster.life + '%', backgroundColor: lifeColor }"></span>
        </div>
        <img :src="monsterImage(monster)" alt="" class="monster-image" :class="{ damage: damaged[monster.id] }" :style="{ opacity: monsterAlive(monster) }">
        <div class="monster-name">{{monster.name}}</div>
        <button class="attack" @click="attack(monster)">攻撃</button>
        <button class="attack" @click="heal(monster)">回復</button>
        <button class="attack" @click="guard(monster)">防御</button>
      </div>
    </div>
    <i class="material-icons bgm" @click="toggleBgm()">volume_{{isBgmPlay ? 'up' : 'off'}}</i>
  </div>
</template>

<script>
import Vue from 'vue'
import * as firebase from 'firebase'

export default {
  data () {
    return {
      isBgmPlay: false,
      guard: false,
      monsters: [],
      damaged: {},
      bgm: new Audio(require('../assets/bgm.mp3')),
      likeSound: new Audio(require('../assets/like.mp3')),
      disLikeSound: new Audio(require('../assets/dislike.mp3'))
    }
  },

  created: function () {
    firebase.database().ref('monsters').on('value', (snapshot) => {
      const data = []
      snapshot.forEach((value, index) => {
        const obj = value.val()
        obj.key = value.key
        data.push(obj)
      })
      this.monsters = data
    })

    this.bgm.loop = true
    this.bgm.volume = 0.3
  },

  watch: {
    monsters: function (newValue, old) {
      console.log('change')
      if (old[0]) {
        newValue.forEach((element, index) => {
          if (element.life > old[index].life) {
            this.healEffect()
          } else if (element.life < old[index].life) {
            console.log(element.name)
            this.damageEffect(element)
          }
        })
      }
    }
  },

  methods: {
    monsterImage: function (monster) {
      return require(`../assets/monster-${monster.id}.jpg`)
    },

    toggleBgm: function () {
      if (this.bgm.paused) {
        this.bgm.play()
        this.isBgmPlay = true
      } else {
        this.bgm.pause()
        this.isBgmPlay = false
      }
    },

    lifeColor: function (monster) {
      if (monster < 40) {
        return 'red'
      } else {
        return 'green'
      }
    },

    guard: function (monster) {
      if (this.guard) {
          this.guard = false
          console.log(this.guard)
        } else {
          this.guard = true
          console.log(this.guard)
       }
    },

    attack: function (monster) {
      let life = monster.life

      if(this.guard) {
        if (monster.life < 10) {
        life = 0
      } else {
        life -= 10
      }} else{
        if (monster.life < 10) {
        life = 0
      } else {
        life -= 1
      }
        this.guard = false
      }

      firebase.database().ref(`monsters/${monster.key}`).update({
        life: life
      })
    },

    heal: function (monster) {
      let life = monster.life

      if (life > 90) {
        life = 100
      } else {
        life += 10
      }

      firebase.database().ref(`monsters/${monster.key}`).update({
        life: life
      })
    },

    healEffect: function () {
      this.likeSound.pause()
      this.likeSound = new Audio(require('../assets/like.mp3'))
      this.likeSound.volume = 0.1
      this.likeSound.play()
    },

    damageEffect: function (monster) {
      this.disLikeSound.pause()
      this.disLikeSound = new Audio(require('../assets/dislike.mp3'))
      this.disLikeSound.volume = 0.1
      this.disLikeSound.play()

      Vue.set(this.damaged, monster.id, true)
      setTimeout(() => {
        Vue.set(this.damaged, monster.id, false)
      }, 820)
    },

    monsterAlive: function (monster) {
      if (monster.life === 0) {
        return 0.3
      } else {
        return 1
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .monsters {
    display: flex;
    justify-content: center;
  }

  .monster {
    text-align: center;
    padding: 40px;
  }
  .monster-image {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 10px solid #fff;
    box-shadow: 0 0 35px #fff;
    transition: 1s;
  }
  .monster-name {
    color: white;
    font-weight: bold;
    font-size: 50px;
  }
  .monster-hp {
    border: 4px solid #fff;
    height: 50px;
    border-radius: 25px;
    width: 400px;
    box-sizing: border-box;
    display: block;
    margin: 20px auto 20px;
    position: relative;
    overflow: hidden;
  }
  .monster-hp-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: green;
    transition: .4s linear;
  }

  .attack {
    background: none;
    border: 2px solid #fff;
    padding: 30px;
    font-size: 30px;
    display: block;
    width: 400px;
    margin: 0 auto;
    color: #ffffff;
    border-radius: 20px;
    margin-top: 20px;
    cursor: pointer;
    outline: none;
  }

  .bgm {
    font-size: 50px;
    color: #ffffff;
    position: absolute;
    bottom: 30px;
    left: 30px;
    cursor: pointer;
  }

  .damage {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
