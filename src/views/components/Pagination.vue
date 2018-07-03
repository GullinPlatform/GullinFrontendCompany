<template>
  <nav>
    <ul class="pagination pagination-split justify-content-center">
      <li class="page-item">
        <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage" class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </button>
      </li>
      <li v-for="page in pages" class="page-item"  :class="{ active: page.name===current_page }">
        <a @click="onClickPage(page.name)" :disabled="page.isDisabled" href="#" class="page-link ">
          {{ page.name }}
        </a>
      </li>
      <li class="page-item">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage" class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">»</span>
          <span class="sr-only">Next</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      max_visible_buttons: {
        type: Number,
        required: false,
        default: 5,
      },
      total_pages: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      per_page: {
        type: Number,
        required: true,
      },
      current_page: {
        type: Number,
        required: true,
      },
    },
    computed: {
      startPage() {
        // When on the first page
        if (this.current_page === 1) {
          return 1;
        }
        // When on the last page
        if (this.current_page === this.total_pages) {
          return this.total_pages + -this.max_visible_buttons + 1;
        }

        if (this.total_pages - this.current_page < Math.floor(this.max_visible_buttons / 2)) {
          return (-2 * Math.floor(this.max_visible_buttons / 2)) + (this.total_pages);
        }

        if (this.current_page - 1 < Math.floor(this.max_visible_buttons / 2)) {
          return 1;
        }

        // When in between
        return this.current_page - 2;
      },
      endPage() {
        return Math.min(this.startPage + this.max_visible_buttons + -1, Number(this.total_pages));
      },
      pages() {
        const range = [];

        for (let i = this.startPage; i <= this.endPage; i += 1) {
          range.push({
            name: i,
            isDisabled: i === this.current_page,
          });
        }

        return range;
      },
      isInFirstPage() {
        return this.current_page === 1;
      },
      isInLastPage() {
        return this.current_page === this.total_pages;
      },
    },
    methods: {
      onClickFirstPage() {
        this.$emit('pagechanged', 1);
      },
      onClickPreviousPage() {
        this.$emit('pagechanged', this.current_page - 1);
      },
      onClickPage(page) {
        this.$emit('pagechanged', page);
      },
      onClickNextPage() {
        this.$emit('pagechanged', this.current_page + 1);
      },
      onClickLastPage() {
        this.$emit('pagechanged', this.total_pages);
      },
      isPageActive(page) {
        return this.current_page === page;
      },
    },
  };
</script>

<style scoped>

</style>
