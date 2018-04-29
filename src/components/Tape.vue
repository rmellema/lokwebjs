<template>
  <div id="tape">
    <table>
      <tr>
        <td>Tape</td>
        <td v-for="(letter, idx) in letters" :key="letter + idx">
          {{ letter }}
        </td>
        <td v-for="n in (length - letters.length)" :key="n">
          .
        </td>
      </tr>
      <tr>
        <td>Index</td>
        <td v-for="n in length" :key="n"
          :class="{ active: index === n - 1, offset: offset === n - 1 }">
          {{ n - 1 }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Tape',
  props: {
    index: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: -1
    },
    size: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      letters: []
    }
  },
  computed: {
    length () {
      return Math.max(this.size, this.letters.length)
    }
  },
  methods: {
    reset () {
      this.letters = []
    },
    addLetter (letter) {
      this.letters.push(letter)
    }
  }
}
</script>

<style scoped>
#tape {
  width: 100%;
  background-color: rgba(0,0,0, 0.1);
  overflow: auto;
}

table {
  table-layout: fixed;
  width: 100%;
}

td.offset {
  color: #0000FF;
}

td.active {
  color: #FF0000;
}

td:nth-of-type(1) {
  width: 45px;
}

td {
  width: 18px;
}
</style>
