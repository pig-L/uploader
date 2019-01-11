<template>
    <main>
      <div class="single">
        <div class="wrap_img">
          <ul>
            <li v-for="(v,i) in imgArr" :key="i">
              <img :src="v" alt="">
              <van-icon name="clear" @click="removeImg(i)"/>
            </li>
          </ul>
        </div>
        <div class="wrap_upload" v-show="isAddImg">
            <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
              <van-icon name="photograph" />
            </van-uploader>
            <div>上传图片</div>
        </div>
      </div>
      <van-button type="primary" @click="upload_1">上传(使用multer实现)</van-button>
      <van-button type="primary" @click="upload_2">上传(使用multiparty实现)</van-button>
    </main>
</template>

<script>
import { Uploader, Icon, Button, Dialog } from 'vant'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
  name: 'Index',
  data () {
    return {
      imgArr: [],
      imgDate: []
    }
  },
  components: {
    VanUploader: Uploader,
    VanIcon: Icon,
    VanButton: Button,
    Dialog
  },
  methods: {
    onRead (file) {
      this.imgArr.push(file.content)
      this.imgDate.push(file.file)
    },
    removeImg (index) {
      this.imgArr.splice(index, 1)
      this.imgDate.splice(index, 1)
    },
    upload_1 () {
      if (this.imgArr.length > 0) {
        var formData = new FormData()
        for (let i = 0; i < this.imgDate.length; i++) {
          formData.append('images', this.imgDate[i])
        }
        axios.post('http://127.0.0.1:3000/upload/useMulter', formData).then(response => {
          if (response.data.success) {
            Dialog.alert({
              title: '上传成功'
            }).then(() => {
              this.imgArr = []
              this.imgDate = []
            })
          }
        })
          .catch(error => {
            console.log(error)
          })
      }
    },
    upload_2 () {
      if (this.imgArr.length > 0) {
        var formData = new FormData()
        for (let i = 0; i < this.imgDate.length; i++) {
          formData.append('images', this.imgDate[i])
        }
        axios.post('http://127.0.0.1:3000/upload/useMultiparty', formData).then(response => {
          if (response.data.success) {
            Dialog.alert({
              title: '上传成功'
            }).then(() => {
              this.imgArr = []
              this.imgDate = []
            })
          }
        })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  computed: {
    isAddImg: function () {
      if (this.imgArr.length > 5) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  main{
    width:100%;
    height:100%;
    padding:10px;
    box-sizing: border-box;
  }
  .single{
    width:100%;
    height:400px;
    padding:10px;
    box-sizing: border-box;
    color:#666666;
    border:1px solid #cccccc;
    .wrap_img{
      width:100%;
      height:300px;
      ul{
        width:100%;
        overflow: hidden;
        li{
          width: calc( 100% / 3 );
          height:150px;
          float:left;
          padding:5px;
          box-sizing: border-box;
          position:relative;
          &>img{
            width:100%;
            height:100%;
          }
          .van-icon-clear{
            position: absolute;
            top:10px;
            right:10px;
            font-size: 20px;
            color:#999999;
          }
        }
      }
    }
    .wrap_upload{
      width:80px;
      height:80px;
      text-align: center;
      border: 1px dashed #999999;
    }
    .van-uploader{
      padding-top:10px;
      font-size: 24px;
      color:#666666;
    }
  }
  button{
    margin-top:20px;
    margin-left:10px;
  }
</style>
