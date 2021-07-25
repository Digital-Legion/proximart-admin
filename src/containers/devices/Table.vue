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
              v-model="newDeviceName"
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
              <a :href="`/devices/${props.row.id}`" target="_blank" class="g-button g-button--edit g-table__actions-item">
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
    <pagination v-model="page" :total-elems="total" :per-page="limit" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { debounce } from '@/utils/debounce'

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

      newDeviceName: ''
    }
  },

  async created () {
    this.loading = true
    await this.fetchDevices(this.page)
    this.loading = false
  },

  watch: {
    page () {
      this.debounceFetch()
    },

    creatingNew () {
      this.newDeviceName = ''
    }
  },

  computed: {
    ...mapState('devices', ['devices', 'limit']),

    tableData () {
      const data = JSON.parse(JSON.stringify(this.devices?.items ?? []))
      if (this.creatingNew)
        data.unshift({
          new: true,
          id: 'NEW',
          name: ''
        })
      return data
    },

    total () {
      return parseInt(this.devices?.meta?.totalItems.toString() ?? '0')
    }
  },

  methods: {
    ...mapActions('devices', ['fetchDevices', 'removeDevice', 'createDevice']),

    debounceFetch: debounce(async function () {
      this.loading = true
      await this.fetchDevices(this.page)
      this.loading = false
    }, 200),

    onRemove (id) {
      this.$confirm('This will permanently delete the device. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.removeDevice(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `Device with id ${id} was removed`
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
    },

    onCreate () {
      this.createDevice({
        name: this.newDeviceName
      }).then(() => {
        this.$emit('set-creating-new', false)
        if (this.page !== 1)
          this.page = 1
        else this.fetchDevices(this.page)
      }).catch(e => {
        this.$toasted.error(e.response.data.error || e.response.data.message)
      })
    },

    onRemoveLocal () {
      this.$emit('set-creating-new', false)
      this.newDeviceName = ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table.scss';
</style>