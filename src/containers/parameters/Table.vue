<template>
  <div class="g-table">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
      />
      <el-table-column
        label="Name"
        prop="name"
      />
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <button class="g-button g-button--edit g-table__actions-item" @click="$emit('edit-parameter', props.row)">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="g-button g-button--danger g-table__actions-item" @click="onRemove(props.row.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination :value="page" @input="$emit('set-page', $event)" :total-elems="total" :per-page="limit" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Table',

  components: {
    Pagination: () => import('@/components/Pagination')
  },

  props: {
    page: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      loading: false,
      category: null
    }
  },

  async created () {
    if (!this.categoryId) {
      console.error('No category id')
      return await this.$router.push('/categories')
    }

    this.loading = true
    await this.fetchParameters({
      page: this.page,
      categoryId: this.categoryId?.toString()
    })
    this.loading = false
  },

  watch: {
    async page () {
      this.loading = true
      await this.fetchParameters({
        page: this.page,
        categoryId: this.categoryId?.toString()
      })
      this.loading = false
    }
  },

  computed: {
    ...mapState('parameters', ['parameters', 'limit']),

    tableData () {
      return this.parameters?.items ?? []
    },

    categoryId () {
      return this.$route.params.id ?? null
    },

    total () {
      return parseInt(this.parameters?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('parameters', ['fetchParameters', 'removeParameter']),
    ...mapActions('categories', ['fetchCategory']),

    onRemove (id) {
      this.$confirm('This will permanently delete the parameter. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.removeParameter(id)
          .then(() => {
            this.$toasted.success(
              `Parameter with id ${id} was removed`
            )
          })
          .catch(e => {
            console.error(e)
            this.$toasted.error(
              e.response.data.message
            )
          })
        this.loading = false
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>
