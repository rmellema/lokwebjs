<template>
  <MainLayout>
    <p>For the course Multi Agent Systems the RuG has developed a webapp to see
    applications of Epistemic Logic in the area of communication protocols. The
    webapp visualises the execution of three protocols, the two protocols from
    the book "Epistemic Logic for AI and Computer Science" from W. van der Hoek
    and J.J.Ch. Meyer, and the Transmission Control Protocol (TCP). All these
    protocols can be reached by using the buttons in the navigation bar at the
    top. The visualizations for the protocols from the book also allow you to
    experiment with the rules in the protocols. This makes it possible to see
    why all the rules are necessary.</p>
  </MainLayout>
</template>

<script>
import MainLayout from '../components/MainLayout'
import NavBar from '../components/NavBar'

export default {
  components: {
    MainLayout,
    NavBar
  }
}
</script>

<style scoped>
p {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
