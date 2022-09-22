<template>
  <div>
    <y-shelf title="商品出售">
      <div slot="content" style="margin-left: 20px">
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容" v-model="title">
            <template slot="prepend">标&nbsp&nbsp&nbsp题</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容" v-model="subTitle">
            <template slot="prepend">副标题</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容" v-model="press">
            <template slot="prepend">出版社</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容" v-model="price">
            <template slot="prepend">售&nbsp&nbsp&nbsp价</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;">
          <div style="color: #97a8be">正面图片:</div>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:9090/bms/upload"
            :show-file-list="false"
            style="border:1px dashed #d9d9d9;width: 178px;height: 178px"
            :on-success="imageFrontSuccess">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div style="margin-top: 20px;">
          <div style="color: #97a8be">背面图片:</div>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:9090/bms/upload"
            :show-file-list="false"
            style="border:1px dashed #d9d9d9;width: 178px;height: 178px"
            :on-success="imageBackSuccess">
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div style="margin:20px 0px 20px 0px;">
          <el-button type="primary" @click="commitAddProduct()">确定</el-button>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import { addProduct } from '../../../api/goods'
  import axios from 'axios'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl1: '',
        imageUrl2: '',
        title: '',
        subTitle: '',
        price: '',
        imageFront1: '',
        imageBack1: '',
        press: ''
      }
    },
    methods: {
      handleRemove (file, fileList) {

      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      imageFrontSuccess (res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw)
        this.uploadFileFront(file)
      },
      imageBackSuccess (res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw)
        this.uploadFileBack(file)
      },
      commitAddProduct () {
        let userInfo = JSON.parse(getStore('userInfo'))
        let params = {
          title: this.title,
          subTitle: this.subTitle,
          price: this.price,
          imageFront: this.imageFront1,
          imageBack: this.imageBack1,
          userName: userInfo.info.username,
          userId: userInfo.info.id,
          press: this.press
        }
        addProduct(params).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '添加商品成功',
              type: 'success'
            })
            this.$router.push('/user/support')
          }
        })
      },
      uploadFileFront (item) {
        let formData = new FormData()
        let file = item.raw
        formData.append('file', file)
        axios.post('/bms/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            this.imageFront1 = res.data.result
          })
      },
      uploadFileBack (item) {
        let formData = new FormData()
        let file = item.raw
        formData.append('file', file)
        axios.post('/bms/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            this.imageBack1 = res.data.result
          })
      }
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  .no-discount {
    line-height: 2em;
    font-size: 22px;
    color: #999;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
