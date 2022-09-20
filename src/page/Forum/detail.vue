<template>
  <div>
    <el-card class="box-card">
      <img :src="forum.userImg" style="width: 40px;height: 40px;float: right">
      <p style="font-size: 20px;margin-top: 20px">{{ forum.title }}</p>
      <p style="margin-top: 20px"> 发帖人姓名：{{ forum.userName }}</p>
      <p style="width: 70%;margin-top: 10px"> 发帖时间：{{ forum.createTime | formatDateTime}}</p>
      <hr style="margin-top: 20px">
      <p style="width: 70%;margin-top: 10px">{{ forum.content }}</p>
      <img v-for="img in forum.imgParams" :src="img.img" style="width: 100px;height: 100px;margin-left: 5px; margin-top: 10px">
      <hr style="margin-top: 10px">
    </el-card>
    <el-card class="box-card-right">

    </el-card>
    <el-card class="box-card">
      <p>回复</p>
      <hr>
      <el-card v-for="comment in commentData" :key="comment.id" style="margin-top: 10px">
        <a v-if="comment.userId === userId" class="el-icon-delete" style="float:right;" @click="removeComment(comment)"></a>
        <img :src="comment.userImg" style="width: 40px;height: 40px;float: left">
        <p style="margin-left: 50px">{{ comment.userName }} {{ comment.createTime | formatDateTime }}</p>
        <p style="margin-left: 50px"> {{ comment.comment }}</p>
      </el-card>
    </el-card>
    <el-card class="box-card">
      <p style="float: left">添加一条新的回复</p><p style="margin-left: 80%;">请注意用语规范</p>
      <hr>
      <el-input style="margin-top: 10px" type="textarea" v-model="comment.comment" placeholder="请输入内容"></el-input>
      <el-button style="margin-top: 10px; float: left" size="mini" @click="addComment()">回复</el-button>
      <p style="margin-left: 70%; margin-top: 10px">请尽量让自己的回复对别人有帮助</p>
    </el-card>

  </div>
</template>
<script>

import { formatDate } from '@/utils/date'
import {addComment, commentList, delComment, forumDetail} from '../../api/forum'
import {userInfo} from '../../api'
import {getStore} from '../../utils/storage'

export default {
  filters: {
    formatDateTime (time) {
      console.log(time)
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data () {
    return {
      activeName: 'first',
      forum: {},
      forumId: '',
      userId: '',
      commentData: [],
      comment: {
        id: '',
        forumId: '',
        userId: '',
        userName: '',
        userImg: '',
        comment: ''
      },
      params: {
        params: {
          token: ''
        }
      }
    }
  },
  mounted () {
    this.forumId = this.$route.query.id
    this.comment.forumId = this.$route.query.id
    this.detail(this.$route.query.id)
    this.commentList(this.$route.query.id)
  },
  methods: {
    removeComment (comment) {
      delComment(comment.id).then(response => {
        if (response.code === 200) {
          this.commentList(this.forumId)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    addComment () {
      this.params.params.token = getStore('token')
      if (this.params.params.token === null) {
        this.params.params.token = 1
      }
      userInfo(this.params).then(response => {
        if (response.result.state !== 1) { // 没登录
          this.$router.push({path: '/login'})
        } else {
          this.comment.userId = response.result.id
          this.userId = response.result.id
          this.comment.userName = response.result.username
          this.comment.userImg = response.result.file
          addComment(this.comment).then(response => {
            if (response.code === 200) {
              this.commentList(this.comment.forumId)
              this.$message({
                message: '回复成功',
                type: 'success'
              })
            } else {
              this.$message.error('回复失败')
            }
          })
        }
      })
    },
    commentList (forumId) {
      commentList(forumId).then(response => {
        this.commentData = response.result
      })
    },
    detail (forumId) {
      forumDetail(forumId).then(response => {
        this.forum = response.result
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    load () {
      this.count += 2
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
