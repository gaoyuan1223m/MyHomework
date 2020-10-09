<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane :label="'粉丝 '+ user.followers" name="followers" style="padding: 5px">
          <div v-if="followers.length">
            <el-row style="min-height: 200px; ">
              <el-col
                :span="8"
                v-for="(item,index) in followers"
                :key="'followers'+index"
                style="padding: 10px"
              >
                <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                  <i class="el-icon-star-off"></i>&emsp;
                  <a
                    @click="$router.push(`/user/social/details/${item.name}`)"
                    style=" text-decoration:none;cursor:pointer"
                  >{{item.login}}</a>
                  <br />
                  <i class="el-icon-message"></i>&emsp;
                  <a
                    :href="item.html_url"
                    target="_blank"
                    style=" text-decoration:none;cursor:pointer"
                  >TA的主页</a>
                  <br />
                  <img :src="item.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px" />
                </el-card>
              </el-col>
            </el-row>
            <div style="text-align: center;margin-top: 10px">
              <!-- <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="followers.query.page"
                  :page-size="followers.query.pageSize"
                  :total="followers.query.pageNumber*followers.query.pageSize"
              ></el-pagination>-->
              <Pager :info="$page.allFollowers.pageInfo" class="el-pagination gridsome-pagination" />
            </div>
          </div>
          <div
            style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
            v-else
          >
            <font style="font-size: 30px;color:#dddddd ">
              <b>(￢_￢) 没有一个粉丝</b>
            </font>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注 '+ user.following " name="following" style="padding: 5px">
          <div v-if="following.length">
            <el-row style="min-height: 200px; ">
              <el-col
                :span="8"
                v-for="(item,index) in following"
                :key="'following'+index"
                style="padding: 10px"
              >
                <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                  <i class="el-icon-star-off"></i>&emsp;
                  <a
                    style=" text-decoration:none;cursor:pointer"
                  >{{item.login}}</a>
                  <br />
                  <i class="el-icon-message"></i>&emsp;
                  <a
                    :href="item.html_url"
                    target="_blank"
                    style=" text-decoration:none;cursor:pointer"
                  >TA的主页</a>
                  <br />
                  <img :src="item.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px" />
                </el-card>
              </el-col>
            </el-row>
            <div style="text-align: center;margin-top: 10px">
              <!-- <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="following.query.page"
                  :page-size="following.query.pageSize"
                  :total="following.query.pageNumber*following.query.pageSize"
              ></el-pagination>-->
              <Pager :info="$page.allFollowing.pageInfo" class="el-pagination gridsome-pagination" />
            </div>
          </div>
          <div
            style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
            v-else
          >
            <font style="font-size: 30px;color:#dddddd ">
              <b>(￢_￢) 还没有关注一个人</b>
            </font>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Layout>
</template>
<page-query>
query ($page: Int) {
  allFollowing (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        avatar_url,
        html_url,
        login,
        id
      }
    }
  }

  allFollowers (perPage: 10, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        avatar_url,
        html_url,
        login,
        id
      }
    }
  },
  allUser {
    edges {
      node {
        followers,
        following
      }
    }
  }
}
</page-query>
<script>
import { Pager } from 'gridsome'
export default {
  name: 'Social',
  components: { Pager },
  metaInfo: {
    title: '社交圈',
  },
  data() {
    return {
      activeTab: 'followers',
    }
  },

  computed: {
    followers() {
      return this.$page.allFollowers.edges
        .map((item) => item.node)
        .filter((item) => item.id !== '-1')
    },
    following() {
      return this.$page.allFollowing.edges.map((item) => item.node)
    },
    user() {
      return this.$page.allUser.edges.map((item) => item.node)[0]
    },
  },
}
</script>
