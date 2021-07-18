<template>
  <div class="parameters-page">
    <page-header :title="`Parameters of ${category ? category.name : ''}`">
      <button class="g-button g-button--icon" @click="onCreateDialog">
        <font-awesome-icon icon="plus" />
      </button>
    </page-header>
    <page-box>
      <parameters-table :page="page" @set-page="page = $event" @edit-parameter="onEditDialog" />
    </page-box>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <page-tabs @input="setActiveLang" :value="activeLang" :options="filteredLangs" />
      <custom-input
        v-if="activeLang === 'ru'"
        v-model="name"
        label="Name"
        placeholder="Enter placeholder's name"
        class="mb-20"
      />
      <custom-input
        v-else-if="activeLang === 'az'"
        v-model="nameAz"
        label="Name"
        placeholder="Enter placeholder's name"
        class="mb-20"
      />
      <button class="g-button" @click="onCreate" v-if="dialogType === 'create'">Create</button>
      <button class="g-button" @click="onEdit" v-else-if="dialogType === 'edit'">Update</button>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Categories',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    ParametersTable: () => import('@/containers/parameters/Table'),
    CustomInput: () => import('@/components/CustomInput')
  },

  data () {
    return {
      category: null,
      dialogVisible: false,
      page: 1,

      name: '',
      nameAz: '',
      dialogTitle: '',
      dialogType: ''
    }
  },

  async created () {
    await this.fetchCategory(this.$route.params.id)
      .then(res => {
        this.category = res.data
      })
      .catch(e => {
        console.error(e)
        this.$router.push('/categories')
      })
  },

  computed: {
    ...mapState(['activeLang', 'langs']),

    filteredLangs () {
      return this.langs.map(lang => ({
        ...lang,
        error: lang.title === 'ru' ? this.defaultLangError : (lang.title === 'az' ? this.azLangError : false)
      }))
    }
  },

  methods: {
    ...mapMutations(['setActiveLang']),
    ...mapActions('categories', ['fetchCategory']),
    ...mapActions('parameters', ['createParameter', 'fetchParameters', 'updateParameter']),

    onCreateDialog () {
      this.dialogTitle = 'Creating a new parameter'
      this.dialogType = 'create'
      this.dialogVisible = true
    },

    onEditDialog (item) {
      this.dialogTitle = `Updating the parameter ${item.name}`
      this.dialogType = 'edit'
      this.name = item.name
      this.nameAz = item.name__az
      this.dialogVisible = true
    },

    onCreate () {
      const data = {
        name: this.name,
        name__az: this.nameAz,
        category: this.category.id
      }

      this.createParameter(data)
        .then(() => {
          this.$toasted.success(`The new parameter ${this.name} was created`)
          this.name = ''
          this.nameAz = ''
          if (this.page !== 1)
            this.page = 1
          else {
            this.fetchParameters({
              page: this.page,
              categoryId: this.category.id
            })
          }
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
        })
    },

    onEdit () {
      const data = {
        name: this.name,
        name__az: this.nameAz,
        category: this.category.id
      }

      this.updateParameter({ data, id: this.category.id })
        .then(() => {
          this.$toasted.success(`The parameter ${this.name} was updated`)
          this.name = ''
          this.nameAz = ''
          if (this.page !== 1)
            this.page = 1
          else {
            this.fetchParameters({
              page: this.page,
              categoryId: this.category.id
            })
          }
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error(e.response.data.message)
        })
    }
  }
}
</script>
