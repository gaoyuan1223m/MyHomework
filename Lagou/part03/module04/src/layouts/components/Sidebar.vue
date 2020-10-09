<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item v-for="item in constantRouterMap" :key="item.path" :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>
<static-query>
query {
  allStrapiPage(sortBy: "id") {
    edges {
      node {
        title
        icon
        path
        id
      }
    }
  }
}
</static-query>
<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      parentUrl: '',
      menuList: [],
    }
  },

  computed: {
    constantRouterMap() {
      return this.$static.allStrapiPage.edges
        .map((item) => item.node)
        .sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id)
        })
    },
    active() {
      let active = ''
      this.constantRouterMap.forEach((item) => {
        if (this.$route.path.startsWith(item.path)) {
          active = item.path
        }
      })
      return active
    },
  },
  methods: {
    onSelect(index) {
      this.$router.push(index)
    },
  },
}
</script>
