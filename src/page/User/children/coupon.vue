<template>
  <div>
    <y-shelf title="商品出售">
      <div slot="content" style="margin-left: 20px">
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容">
            <template slot="prepend">标&nbsp&nbsp&nbsp题</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容">
            <template slot="prepend">副标题</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;width: 300px">
          <el-input placeholder="请输入内容">
            <template slot="prepend">售&nbsp&nbsp&nbsp价</template>
          </el-input>
        </div>
        <div style="margin-top: 20px;">
          <div style="color: #97a8be">上传相关图片:</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div style="margin:20px 0px 20px 0px;">
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: ''
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
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
