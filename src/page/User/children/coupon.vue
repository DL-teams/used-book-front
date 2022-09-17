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
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
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
        dialogVisible: false
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
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
</style>
