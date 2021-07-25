<template>
  <div class="parameters-box">
    <page-tabs @input="setActiveLang" :value="activeLang" :options="langs"/>
    <page-box>
      <template v-slot:outer-content>
        <loading
          :active.sync="loading"
          :can-cancel="false"
          :is-full-page="false"
        />

        <page-header class="mb-20 w-100">
          <template v-slot:content>
            <h2 class="g-title">Parameters</h2>
          </template>
          <button class="g-button" :class="{ 'g-button--blinking': dataUpdated }" @click="onSubmit"
                  :disabled="loading">
            <font-awesome-icon icon="save"/>
            <span>Save</span>
          </button>
        </page-header>
        <custom-input
          v-for="(param, index) in dataValues"
          :key="index"
          :class="{'mb-20': index !== dataValues.length}"
          :value="param[activeLang === defaultActiveLang ? 'value' : `value__${activeLang}`]"
          :label="param[`name__${activeLang}`] || param[`name__${defaultActiveLang}`]"
          :placeholder="`Enter ${param[`name__${activeLang}`] || param[`name__${defaultActiveLang}`]}`"
          @input="onParamInput($event, param)"
        />
      </template>
    </page-box>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import CustomInput from '@/components/CustomInput'

export default {
  name: 'ParametersBox',

  components: {
    CustomInput,
    PageTabs: () => import('@/components/PageTabs'),
    PageBox: () => import('@/components/PageBox'),
    PageHeader: () => import('@/components/PageHeader')
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    initialData: {
      default: null
    },
    dataUpdated: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      data: {},
      justSetInitialData: false,
      initialDataSet: false
    }
  },

  mounted () {
    this.setInitialData()

    this.$watch(vm => [
      vm.data
    ], () => {
      if (!this.justSetInitialData) {
        this.$emit('set-updated', true)
      } else {
        this.justSetInitialData = false
        this.$emit('set-updated', false)
      }
    })
  },

  watch: {
    initialData () {
      this.setInitialData()
    }
  },

  computed: {
    ...mapState(['activeLang', 'defaultActiveLang', 'langs']),

    dataValues () {
      return Object.values(this.data)
    }
  },

  methods: {
    ...mapMutations(['setActiveLang']),

    onSubmit () {
      this.$emit('submit', this.dataValues.map(v => ({
        id: v.relationId,
        parameter: v.parameter,
        value: v.value,
        value__az: v.value__az
      })))
    },

    setInitialData () {
      if (this.initialData && this.initialData.length && !this.initialDataSet) {
        const data = {}
        this.initialData.forEach(p => {
          data[p.id.toString()] = {
            parameter: p.id,
            name__ru: p.name,
            name__az: p.name__az,
            value: p.value || '',
            value__az: p.value__az || '',
            relationId: p.relationId
          }
        })
        this.$set(this, 'data', data)
        this.justSetInitialData = true
        this.initialDataSet = true
      }
    },

    onParamInput (value, param) {
      const data = Object.assign({}, this.data)
      data[param.parameter.toString()][this.activeLang === this.defaultActiveLang ? 'value' : `value__${this.activeLang}`] = value
      this.$set(this, 'data', data)
    }
  }
}
</script>

<style scoped>

</style>
