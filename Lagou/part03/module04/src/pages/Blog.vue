<template>
  <Layout>
    <div style="min-height: 600px">
      <div v-if="blogs&&blogs.length>0">
        <el-card
          shadow="hover"
          v-for="(item,index) in blogs"
          :key="'p'+index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link style="text-decoration:none;cursor:pointer" :to="`/blog-details/${item.id}`">
                    <i class="el-icon-edit-outline"></i>
                    &nbsp;&nbsp; {{item.title}}
                  </g-link>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;"></div>
              </el-col>
            </el-row>
          </div>
          <div
            style="font-size: 0.9rem;line-height: 1.5;color: #606c71;"
          >最近更新 {{$dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}}</div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
          >{{item.description}}</div>
        </el-card>
        <div style="text-align: center">
          <!-- <el-pagination
            @current-change="list"
            background
            layout="prev, pager, next"
            :current-page.sync="query.page"
            :page-size="query.pageSize"
            :total="query.pageNumber*query.pageSize"
          ></el-pagination>-->
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!blogs||blogs.length==0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query {
  blogs: allStrapiBlog {
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
  name: 'Blog',
  metaInfo: {
    title: '我的博客',
  },
  computed: {
    blogs() {
      return this.$page.blogs.edges.map((item) => item.node)
    },
  }
}
</script>
