<!--<script src="../../assets/data/get_ko.js"></script>-->
<template>
  <div>
<!--    <PlaceAndDate/>-->
<!--    <Plann/>-->
    <Unkown :region="this.$route.params.region"/>
  </div>
</template>

<script>
// import PlaceAndDate from "../detail/CreatePage/PlaceAndDate";
// import Plann from "../detail/CreatePage/Plann";
// import region from "../../assets/data/get_ko.js";
import Unkown from "../detail/CreatePage/PlanCreate";
export default {
  name: "Create",
  data () {
    return {

    }
  },
  components: {
    Unkown
    // Plann,
    // PlaceAndDate
  },
  beforeCreate() {

  }
}
</script>

<style scoped>

</style>