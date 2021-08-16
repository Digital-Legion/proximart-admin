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
        label="Name RU"
        prop="name"
      />
      <el-table-column
        label="Name AZ"
        prop="name__az"
      />
      <el-table-column
        label="Color"
      >
        <template slot-scope="props">
          <div class="g-table__cell">
            <div class="g-table__color" :style="{background: `#${props.row.hex}`}" />
            <span>#{{ props.row.hex }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <a :href="`/colors/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
              <font-awesome-icon icon="edit" />
            </a>
            <button class="g-button g-button--danger g-table__actions-item" @click="onRemove(props.row.id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-model="page" :total-elems="total" :per-page="limit" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { debounce } from '@/utils/debounce'

export default {
  name: 'Table',

  components: {
    Pagination: () => import('@/components/Pagination')
  },

  data () {
    return {
      loading: false,
      page: 1
    }
  },

  async created () {
    this.loading = true
    await this.fetchColors(this.page)
    this.loading = false
  },

  watch: {
    page () {
      this.debounceFetch()
    }
  },

  computed: {
    ...mapState('colors', ['colors', 'limit']),

    tableData () {
      return this.colors?.items ?? []
    },

    total () {
      return parseInt(this.colors?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('colors', ['fetchColors', 'removeColor']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchColors(this.page)
      this.loading = false
    }, 200),

    onRemove (id) {
      this.$confirm('This will permanently delete the color. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.removeColor(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Color with id ${id} was removed`
            })
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: e.response.data.message
            })
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
