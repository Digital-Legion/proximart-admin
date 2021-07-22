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
      >
        <template slot-scope="props">
          <span v-if="!props.row.new">{{ props.row.name }}</span>
          <div v-else class="g-table__cell">
            <custom-input
              v-model="newProductName"
              @input="onNameInput"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Slug"
      >
        <template slot-scope="props">
          <span v-if="!props.row.new">{{ props.row.slug }}</span>
          <div v-else class="g-table__cell">
            <custom-input
              v-model="newProductSlug"
              @input="onSlugInput"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="props">
          <div class="g-table__actions">
            <template v-if="props.row.new">
              <button class="g-button g-table__actions-item" @click="onCreate">
                <font-awesome-icon icon="save" />
              </button>
              <button class="g-button g-button--danger g-table__actions-item" @click="onRemoveLocal">
                <font-awesome-icon icon="trash" />
              </button>
            </template>
            <template v-else>
              <a :href="`/products/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
                <font-awesome-icon icon="edit" />
              </a>
              <button class="g-button g-button--danger g-table__actions-item" @click="onRemove(props.row.id)">
                <font-awesome-icon icon="trash" />
              </button>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-model="page" :total-elems="total" :per-page="limit" v-if="total > page * limit" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { debounce } from '@/utils/debounce'
import slugify from 'slugify'

export default {
  name: 'Table',

  components: {
    Pagination: () => import('@/components/Pagination'),
    CustomInput: () => import('@/components/CustomInput')
  },

  props: {
    creatingNew: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loading: false,
      page: 1,

      newProductName: '',
      newProductSlug: '',

      slugBasedOnName: true
    }
  },

  async created () {
    await this.fetchProducts(this.page)
  },

  watch: {
    page () {
      this.debounceFetch()
    },

    creatingNew () {
      this.slugBasedOnName = true
      this.newProductName = ''
      this.newProductSlug = ''
    }
  },

  computed: {
    ...mapState('products', ['products', 'limit']),

    tableData () {
      const data = JSON.parse(JSON.stringify(this.products?.items ?? []))
      if (this.creatingNew)
        data.unshift({
          new: true,
          id: 'NEW',
          name: '',
          slug: ''
        })
      return data
    },

    total () {
      return parseInt(this.products?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('products', ['fetchProducts', 'removeProduct', 'createProduct']),

    debounceFetch: debounce(async function () {
      this.fetchProducts(this.page)
    }, 200),

    onRemove (id) {
      this.$confirm('This will permanently delete the product. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        await this.removeProduct(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Product with id ${id} was removed`
            })
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: e.response.data.message
            })
          })
      }).catch(() => {})
    },

    onCreate () {
      this.createProduct({
        name: this.newProductName,
        slug: this.newProductSlug
      }).then(() => {
        this.$emit('set-creating-new', false)
        if (this.page !== 1)
          this.page = 1
        else this.fetchProducts(this.page)
      }).catch(e => {
        this.$toasted.error(e.response.data.error || e.response.data.message)
      })
    },

    onRemoveLocal () {
      this.$emit('set-creating-new', false)
      this.newProductName = ''
      this.newProductSlug = ''
    },

    onNameInput (name) {
      if (this.slugBasedOnName) {
        this.newProductSlug = slugify(name).toLowerCase()
      }
    },

    onSlugInput () {
      this.slugBasedOnName = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>