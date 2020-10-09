<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ project.name }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right;"></div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ project.createTime }}
          <br />
          更新 {{ project.updateTime }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0px 0px 0px"
        >{{ project.description }}</div>
        <div
          style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #E4E7ED;"
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star '+project.stargazers_count"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ project.stargazers_count }}
              <el-tooltip
                effect="dark"
                :content="'watch '+project.watchers_count"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.watchers_count }}
              <el-tooltip effect="dark" :content="'fork '+project.forks_count" placement="bottom">
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.forks_count }}
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag size="small" type="danger" v-if="project.license && project.license.name">{{
                  project.license.name
                }}</el-tag>
              <el-tag size="small" type="success" v-if="project.language" style="margin-left: 12px">{{
                  project.language
                }}</el-tag>
            </el-col>
          </el-row>
        </div>
        <div
          v-html="project.content"
          v-if="project.content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
        <div v-if="!project" style="padding: 20px 0px 20px 0px;text-align: center">
          <font style="font-size: 30px;color:#dddddd ">
            <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($id: ID!) {
  project(id: $id) {
    name,
    url,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
    license {
        name
    },
    language
  }
}
</page-query>
<script>
export default {
  name: 'ProjectDetails',
  computed: {
    project() {
      return this.$page.Project
    },
  },
}
</script>

<style>
</style>
