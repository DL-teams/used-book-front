<template>
  <div>
    <el-card class="box-card">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div v-for="forum in forumData" :key="forum.id" style="margin-top: 5px">
            <el-card>
              <a v-if="forum.userId === userId" class="el-icon-delete" style="float:right;" @click="remove(forum, '')"></a>
              <a v-if="forum.userId === userId" class="el-icon-edit" style="float:right;margin-right: 5px" @click="edit(forum)"></a>
              <img :src="forum.userImg" style="width: 40px;height: 40px; float: left;">
              <a style="font-size: 20px; margin-left: 10px" @click="detail(forum.id)">{{ forum.title }}</a>
              <p style="margin-left: 50px"> 发帖人姓名：{{ forum.userName }}</p>
              <p style="margin-left: 50px">{{ forum.content }}</p>
              <img v-for="img in forum.imgParams" :src="img.img" style="width: 100px;height: 100px;margin-left: 50px; margin-top: 10px">
              <div>
                <i class="el-icon-edit" style="margin-left: 50px">100</i>
                <i class="el-icon-share">100</i>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="论坛" name="second">
          <div v-for="forum in forumData" :key="forum.id" style="margin-top: 5px">
            <el-card>
              <a v-if="forum.userId === userId" class="el-icon-delete" style="float:right;" @click="remove(forum, 0)"></a>
              <a v-if="forum.userId === userId" class="el-icon-edit" style="float:right;margin-right: 5px" @click="edit(forum)"></a>
              <img :src="forum.userImg" style="width: 40px;height: 40px; float: left;">
              <a style="font-size: 20px; margin-left: 10px" @click="detail(forum.id)">{{ forum.title }}</a>
              <p style="margin-left: 50px"> 发帖人姓名：{{ forum.userName }}</p>
              <p style="margin-left: 50px">{{ forum.content }}</p>
              <img v-for="img in forum.imgParams" :src="img.img" style="width: 100px;height: 100px;margin-left: 50px; margin-top: 10px">
              <div>
                <i class="el-icon-edit" style="margin-left: 50px">100</i>
                <i class="el-icon-share">100</i>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="求购贴" name="third">
          <div v-for="forum in forumData" :key="forum.id" style="margin-top: 5px">
            <el-card>
              <a v-if="forum.userId === userId" class="el-icon-delete" style="float:right;" @click="remove(forum, 1)"></a>
              <a v-if="forum.userId === userId" class="el-icon-edit" style="float:right;margin-right: 5px" @click="edit(forum)"></a>
              <img :src="forum.userImg" style="width: 40px;height: 40px; float: left;">
              <a style="font-size: 20px; margin-left: 10px" @click="detail(forum.id)">{{ forum.title }}</a>
              <p style="margin-left: 50px"> 发帖人姓名：{{ forum.userName }}</p>
              <p style="margin-left: 50px">{{ forum.content }}</p>
              <img v-for="img in forum.imgParams" :src="img.img" style="width: 100px;height: 100px;margin-left: 50px; margin-top: 10px">
              <div>
                <i class="el-icon-edit" style="margin-left: 50px">100</i>
                <i class="el-icon-share">100</i>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card class="box-card-right">
      <el-button @click="add(0)">新建论坛帖子</el-button>
      <el-button @click="add(1)">新建求购贴</el-button>
      <el-button @click="checkIn">打卡</el-button>
    </el-card>
  </div>
</template>
<script>
import {checkIn, delForum, forumList} from '../../api/forum'
import {userInfo} from '../../api'
import {getStore} from '../../utils/storage'

export default {
  data () {
    return {
      activeName: 'first',
      forumData: [],
      userId: '',
      forumQuery: {
        category: ''
      },
      params: {
        params: {
          token: ''
        }
      }
    }
  },
  mounted () {
    // 验证是否需要刷新
    if (this.$route.query.isReload !== undefined && this.$route.query.isReload === true) {
      this.$router.go(0)
    }

    this.params.params.token = getStore('token')
    if (this.params.params.token === null) {
      this.params.params.token = 1
    }
    userInfo(this.params).then(response => {
      if (response.result.state === 1) { // 没登录
        this.userId = response.result.id
      }
    })
    this.getList('')
  },
  methods: {
    getList (category) {
      forumList(category).then(response => {
        this.forumData = response.result
      })
    },
    handleClick (tab, event) {
      switch (tab.label) {
        case '全部':
          this.getList('')
          break
        case '论坛':
          this.getList(0)
          break
        case '求购贴':
          this.getList(1)
          break
        default:
          break
      }
    },
    detail (id) {
      this.$router.push({
        path: `forumDetail`,
        query: {id: id}
      })
    },
    add (category) {
      this.$router.push({
        path: `forumAdd`, query: {category: category}
      })
    },
    edit (forum) {
      this.$router.push({
        path: `forumEdit`,
        query: {info: forum}
      })
    },
    remove (forum, category) {
      delForum(forum.id).then(response => {
        if (response.code === 200) {
          this.getList(category)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    checkIn () {
      checkIn(this.userId).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '打卡成功',
            type: 'success'
          })
          this.$router.go(0)
        } else {
          this.$message.error('打卡失败')
        }
      })
    }
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 60%;
  margin-left: 200px;
  margin-top: 30px;
  float: left;
}

.box-card-right {
  width: 25%;
  margin-right: 10px;
  margin-top: 30px;
  float: right;
}
</style>
