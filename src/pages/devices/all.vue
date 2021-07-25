<template>
  <div class="devices-page">
    <page-header title="Devices">
      <button class="g-button g-button--icon" @click="creatingNew = true">
        <font-awesome-icon icon="plus" />
      </button>
    </page-header>
    <page-box>
      <devices-table :creating-new="creatingNew" @set-creating-new="creatingNew = $event" />
    </page-box>
  </div>
</template>

<script>
export default {
  name: 'Devices',

  components: {
    PageHeader: () => import('@/components/PageHeader'),
    PageBox: () => import('@/components/PageBox'),
    DevicesTable: () => import('@/containers/devices/Table')
  },

  data () {
    return {
      creatingNew: false
    }
  }
}
</script>
