export default {
  namespaced: true,

  state: {
    categories: null,
    cascaderCategories: null,
    limit: 10
  },

  mutations: {
    setCategories (state, payload) {
      state.categories = payload
      state.categories.items.push({})
      state.categories.items.pop()
    },

    removeCategoryById (state, id) {
      const categoryIndex = state.categories.items[0].children.findIndex(c => c.id === id)
      if (categoryIndex !== -1) {
        state.categories.items[0].children.splice(categoryIndex, 1)
      }
    }
  },

  actions: {
    fetchCategories ({ commit, state }, { page, parentId }) {
    },

    fetchCascaderCategories ({ commit }) {
    },

    fetchCategory ({ state }, id) {
      return { data: state.categories?.items?.[0]?.children?.find(cat => cat.id === id) }
    },

    createCategory ({ state, commit }, data) {
      if (!state.categories?.items?.[0]?.children) {
        commit('setCategories', {
          items: [
            {
              children: []
            }
          ]
        })
      }

      commit('setCategories', {
        items: [
          {
            children: [
              ...state.categories.items[0].children,
              {
                id: String(Date.now()),
                name: data.name,
                nameAz: data.name__az,
                description: data.description,
                descriptionAz: data.description__az,
                slug: data.slug,
                slugAz: data.slug__az,
                parent: data.parent,
                meta: data.meta,
                image: {
                  alt: data.alt,
                  url: data.file ? URL.createObjectURL(data.file) : null
                }
              }
            ]
          }
        ]
      })
    },

    updateCategory ({ state, commit }, data) {
      const newCats = state.categories.items[0].children.slice()
      newCats.splice(newCats.findIndex(cat => cat.id === data.id), 1, {
        id: data.id,
        name: data.name,
        nameAz: data.name__az,
        description: data.description,
        descriptionAz: data.description__az,
        slug: data.slug,
        slugAz: data.slug__az,
        parent: data.parent,
        meta: data.meta,
        image: {
          alt: data.alt,
          url: data.file ? URL.createObjectURL(data.file) : null
        }
      })
      commit('setCategories', {
        items: [
          {
            children: newCats
          }
        ]
      })
    },

    removeCategory ({ commit }, id) {
      commit('removeCategoryById', id)
    },

    async saveMeta (_, data) {
    }
  }
}
