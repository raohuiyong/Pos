import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Post'


Vue.use(Router)

export default new Router({
  // mode:'history',  使用这个模式需要后端配合
  routes: [
    {
      path: '/',
      name: 'Post',
      component: Pos
    }
  ]
})
