<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{blog.title}}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right;">
                <el-button
                  style="padding: 3px 0;"
                  type="text"
                  icon="el-icon-backs"
                  @click="$router.back()"
                >返回</el-button>
              </div>
            </el-col>
          </el-row>
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
        <div v-html="$md.render(blog.content)" class="markdown-body" style="padding-top: 20px"></div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($id: ID!) {
  strapiBlog(id: $id) {
    title
    content
    created_at
    updated_at
  }
}
</page-query>
<script>
export default {
  name: 'BlogDetails',
  computed: {
    blog() {
      return this.$page.strapiBlog
    },
  },
}
</script>

<style>
</style>
