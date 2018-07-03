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
      <div class="row">
        <div class="col-lg-12">
          <div class="card-box">
            <table class="table table-bordered table-hover">
              <thead>
              <tr>
                <th @click="getWhitelist({sort_by:'name'})">User Names<i class="mdi mdi-arrow-down justify-content-end"></i></th>
                <th @click="getWhitelist({sort_by:'nationality'})">Nationality</th>
                <th @click="getWhitelist({sort_by:'pledge_amount'})">Pledge Amount</th>
                <th>ID Verification</th>
                <th @click="getWhitelist({sort_by:'joined_whitelist'})">Joined</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="w in whitelist">
                <td>{{w.investor.full_name}}</td>
                <td v-html="">{{w.investor.nationality}}</td>
                <td>{{w.pledge_amount}}</td>
                <td>
                  <span v-if="w.investor.verification_level===-1" class="badge badge-danger">Not Started</span>
                  <span v-else-if="w.investor.verification_level===0" class="badge badge-danger">Not Started</span>
                  <span v-else-if="w.investor.verification_level===1" class="badge badge-danger">Not Started</span>
                  <span v-else-if="w.investor.verification_level===2"  class="badge badge-danger">Not Started</span>
                  <span v-else-if="w.investor.verification_level===3" class="badge badge-warning">ID Processing</span>
                  <span v-else-if="w.investor.verification_level===4" class="badge badge-success">ID Verified</span>
                  <span v-else-if="w.investor.verification_level===5" class="badge badge-warning">Accredited Investor Processing</span>
                  <span v-else-if="w.investor.verification_level===6" class="badge badge-success">Accredited Investor Verified</span>
                </td>
                <td>{{w.joined_whitelist_timestamp}}</td>
              </tr>
              </tbody>
            </table>
            <Pagination :total_pages="20" :total="whitelist.length" :per_page="50" :current_page="current_page" @pagechanged="onPageChange"/>
          </div>
        </div>
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Pagination from '../../components/Pagination';

  export default {
    name: 'Whitelist',
    components: { Pagination },
    data() {
      return {
        current_sort_category: 'name',
        current_sort_direction: 'ascending',
        current_page: 1,
      }
    },
    computed: {
      ...mapGetters({
        is_login: 'is_login',
        verification_level: 'verification_level',
        me: 'me',
        me_wallet: 'me_wallet',
        me_phone: 'me_phone',
        whitelist: 'whitelist',
      }),
    },
    methods: {
      getWhitelist: function (para, change_directions = true) {
        if (para.sort_by === this.current_sort_category && change_directions) {
          this.current_sort_direction = this.current_sort_direction === 'ascending' ? 'descending' : 'ascending';
          this.current_page = 1;
        } else {
          this.current_sort_category = para.sort_by;
        }

        this.$store.dispatch('getWhitelist', {
          category: this.current_sort_category,
          direction: this.current_sort_direction,
          page_number: this.current_page,
        }).then(() => {

        }).catch(() => {
          this.error_message = 'Unable to login using provided email and password'
        })
      },
      onPageChange(page) {
        this.current_page = page;
        this.getWhitelist({ sort_by: this.current_sort_category }, false);
      },
      sortingDisplayDirection() {

      },
    },
    created() {
      this.getWhitelist({ sort_by: 'name' });
    },
   //ounted(){}
  }
</script>
