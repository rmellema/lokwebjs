<template>
  <MainLayout>
    <p>Hello, world!</p>
  </MainLayout>
</template>

<script>
import MainLayout from '../components/MainLayout'
import NavBar from '../components/NavBar'
console.log('Loading Main')

export default {
  components: {
    MainLayout,
    NavBar
  }
}
</script>
