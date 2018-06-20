<template>
  <div class="wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            Whitelist
          </div>
        </div>
      </div>
      <div class="card-box">
        <p>personal info
          how much
          can invest or not
          signup time
          totally eth estimation
          pre-sale</p>
      </div>
    </div>
  </div>


</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Whitelist',
    data() {
      return { }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        verification_level: 'verification_level',
        me: 'me',
        me_wallet: 'me_wallet',
        me_phone: 'me_phone',
      }),
    },
    methods: {},

  }
</script>
