<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="forumData" label-width="80px">
        <el-form-item label="主题">
          <el-input v-model="forumData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="12" v-model="forumData.content"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="http://localhost:9090/users/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 50%" @click="edit">修改</el-button>
    </el-card>
  </div>
</template>
<script>
import {updateForum} from '../../api/forum'
import {getStore} from '../../utils/storage'
import {userInfo} from '../../api'

export default {
  data () {
    return {
      activeName: 'first',
      fileList: [],
      forumData: {
        forumId: '',
        userId: '',
        userName: '',
        userImg: '',
        category: 0,
        imgParams: []
      },
      params: {
        params: {
          token: ''
        }
      },
      dialogImageUrl: '',
      dialogVisible: false,
      img: {}
    }
  },
  mounted () {
    this.forumData = this.$route.query.info
    for (let i = 0; i < this.forumData.imgParams.length; i++) {
      this.fileList.push({url: this.forumData.imgParams[i].img})
    }
  },
  methods: {
    handleSuccess (response, file, fileList) {
      this.img = {}
      this.img.img = 'http://192.168.12.130:9090' + file.response.result
      this.forumData.imgParams.push(this.img)
    },
    handleRemove (file, fileList) {
      for (let i = 0; i < this.forumData.imgParams.length; i++) {
        if (file.response !== undefined) {
          if (this.forumData.imgParams[i].img === 'http://192.168.12.130:9090' + file.response.result) {
            this.forumData.imgParams.splice(i, 1)
          }
        } else {
          if (this.forumData.imgParams[i].img === file.url) {
            this.forumData.imgParams.splice(i, 1)
          }
        }
      }
    },
    beforeAvatarUpload (file, id) {
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    edit () {
      this.params.params.token = getStore('token')
      if (this.params.params.token === null) {
        this.params.params.token = 1
      }
      userInfo(this.params).then(response => {
        if (response.result.state !== 1) { // 没登录
          this.$router.push({path: '/login'})
        } else {
          this.forumData.userId = response.result.id
          this.forumData.userName = response.result.username
          this.forumData.userImg = response.result.file
          updateForum(this.forumData).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({
                path: '/forum'
              })
            } else {
              this.$message.error('修改失败')
            }
          })
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
