<template>
  <div>
    <y-shelf title="我的出售">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." v-for="(item,i) in productList" :key="i" class="text item" style="background: #EEE;">
          <div style="height: 120px;background-color: white;">
            <div style="float: left;margin: 10px 10px;">
              <img style="height: 100px;width: 100px;border-radius:5px" :src="item.imgFront">
            </div>
            <div style="float: left;margin-left:50px;margin-top: 20px;width: 130px">
              <div>{{ item.name }}</div>
              <div style="margin-top: 10px">{{ item.subName }}</div>
            </div>
            <div style="float: left;margin-left: 100px;margin-top: 50px;width: 30px">
              <div>{{ item.price }}</div>
            </div>
            <div style="float: left;margin-left: 80px;margin-top: 50px;width: 220px">
              <div>{{ item.createTime }}</div>
            </div>
            <div style="float: left;margin-left: 100px;margin-top: 40px">
              <el-button type="danger" round @click="_delOrder(item.id,i)">删除</el-button>
            </div>
          </div>
          <div style="background: #EEE;height: 20px"></div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import {deleteProduct, sellProductList} from '../../../api/goods'
import { getStore } from '/utils/storage'
export default {
  data () {
    return {
      productList: [0],
      userId: '',
      loading: false
    }
  },
  methods: {
    _productList () {
      this.userId = getStore('userId')
      let params = {
        params: {
          userId: this.userId
        }
      }
      sellProductList(params).then(res => {
        if (res.code === 200) {
          this.productList = res.result
          this.loading = false
        }
      })
    },
    _delOrder (productId, i) {
      let params = {
        productId: productId
      }
      deleteProduct(params).then(res => {
        if (res.code === 200) {
          this.productList.splice(i, 1)
          this.$message({
            message: '删除商品成功',
            type: 'success'
          })
        } else {
          this.message('删除失败')
        }
      })
    }
  },
  created () {
    this._productList()
  },
  components: {
    YShelf
  }
}
</script>
<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
