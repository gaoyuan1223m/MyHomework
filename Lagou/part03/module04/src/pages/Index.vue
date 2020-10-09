<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{blog.title}}</span>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{blog.createTime}}
          <br />
          更新 {{blog.updateTime}}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px"
        >
          <pre style="font-family: '微软雅黑'">{{blog.description}}</pre>
        </div>
        <div v-html="markdown(blog.content)" class="markdown-body" style="padding-top: 20px"></div>
      </el-card>
      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!blog.id"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query {
  allStrapiBlog {
    edges {
      node {
        title,
        description,
        content,
        id,
        created_at,
        updated_at
      }
    }
  }
}
</page-query>
<script>

export default {
  name: 'New',
  metaInfo: {
    title: '最新动态',
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    blogs() {
      return this.$page.allStrapiBlog.edges
        .map((item) => item.node)
        .sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id)
        })
    },
    blog() {
      if (this.blogs.length) {
        let blog = this.blogs[0]
        return {
          id: blog.id,
          title: blog.title,
          content: blog.content,
          description: blog.description,
          createTime: this.$dayjs(blog.created_at).format('YYYY-MM-DD HH:mm:ss'),
          updateTime: this.$dayjs(blog.updated_at).format('YYYY-MM-DD HH:mm:ss'),
        }
      } else {
        return {
          id: '',
          title: '',
          content: '',
          description: '',
          createTime: '',
          updateTime: '',
        }
      }
    },
  },
  methods: {
    markdown(content){
      return this.$md.render(content)
    }
  },
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
