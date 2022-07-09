<template>
  <div class="products-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="false"
    />
    <page-header title="Products">
      <button class="g-button g-button--icon" @click="creatingNew = true">
        <font-awesome-icon icon="plus" />
      </button>
    </page-header>
    <page-box>
      <filters
        :filters="filters"
        :filters-prototype="filtersPrototype"
        @update="$set(filters, $event.key, $event.value)"
      />
      <products-table :creating-new="creatingNew" :filters="filters" @set-creating-new="creatingNew = $event" />
    </page-box>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Products',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    Filters: () => import('@/components/Filters'),
    ProductsTable: () => import('@/containers/products/Table')
  },

  data () {
    return {
      loading: true,
      creatingNew: false,
      filters: {
        category: undefined,
        sort: 'id',
        sortOrder: 'desc',
        color: undefined,
        discount: undefined,
        brand: undefined,
        discountCat: undefined
      }
    }
  },

  async created () {
    await this.fetchAllBrands()
    await this.fetchAllColors()
    await this.fetchAllCategories()
    this.loading = false
  },

  computed: {
    ...mapState({
      allBrands: state => state.products.allBrands,
      allColors: state => state.products.allColors,
      allCategories: state => state.products.allCategories
    }),

    filtersPrototype () {
      return {
        category: {
          name: 'Category',
          type: 'select',
          clearable: true,
          options: (this.allCategories || []).map(b => ({
            label: b.name,
            value: b.id
          }))
        },
        sort: {
          name: 'Sort',
          type: 'select',
          options: [
            {
              label: 'ID',
              value: 'id'
            },
            {
              label: 'Name RU',
              value: 'name'
            },
            {
              label: 'Name AZ',
              value: 'name__az'
            },
            {
              label: 'Slug',
              value: 'slug'
            },
            {
              label: 'Slug AZ',
              value: 'slug__az'
            }
          ]
        },
        sortOrder: {
          name: 'Sort order',
          type: 'select',
          options: [
            {
              label: 'Ascending',
              value: 'asc'
            },
            {
              label: 'Descending',
              value: 'desc'
            }
          ]
        },
        color: {
          name: 'Color',
          type: 'select',
          clearable: true,
          options: (this.allColors || []).map(c => ({
            label: `[#${c.hex}] ${c.name}`,
            value: c.id
          }))
        },
        discount: {
          name: 'Discount',
          type: 'select',
          clearable: true
        },
        brand: {
          name: 'Brand',
          type: 'select',
          clearable: true,
          options: (this.allBrands || []).map(b => ({
            label: b.name,
            value: b.id
          }))
        },
        discountCat: {
          name: 'Discount category',
          type: 'select',
          clearable: true
        }
      }
    }
  },

  methods: {
    ...mapActions({
      fetchAllBrands: 'products/fetchAllBrands',
      fetchAllColors: 'products/fetchAllColors',
      fetchAllCategories: 'products/fetchAllCategories'
    })
  }
}
</script>
