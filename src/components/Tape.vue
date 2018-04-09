<template>
  <div id="tape">
    <table>
      <tr>
        <td>Tape</td>
        <td v-for="(letter, idx) in letters" :key="letter + idx">
          {{ letter }}
        </td>
        <td v-for="n in (size - letters.length)" :key="n">
          .
        </td>
      </tr>
      <tr>
        <td>Index</td>
        <td v-for="n in size" :key="n" :class="{ active: index === n - 1 }">
          {{ n - 1 }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
function TapeError (letter) {
  this.name = 'TapeError'
  this.message = "Adding a letter that does not fit on the tape: '"
  this.message += letter + "'"
  this.stack = (new Error()).stack
}
TapeError.prototype = new Error()

export default {
  name: 'Tape',
  props: {
    index: {
      type: Number,
      default: 0
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
  methods: {
    addLetter (letter) {
      if (this.size <= this.letters.length) {
        throw new TapeError(letter)
      }
      this.letters.push(letter)
    }
  }
}
</script>

<style scoped>
#tape {
  width: 100%;
  background-color: rgba(0,0,0, 0.1);
}

table {
  table-layout: fixed;
  width: 100%;
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
