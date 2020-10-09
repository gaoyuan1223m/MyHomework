// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import utils from '~/utils/util.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
import '~/assets/index.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(ElementUI)
  Vue.prototype.$util = utils
  Vue.prototype.$dayjs = dayjs

  const md = new MarkdownIt()
  // 修改图片渲染后的路径
  const old = md.renderer.rules.image
  md.renderer.rules.image = function (tokens, idx, options, env, slf) {
    const token = tokens[idx]
    token.attrs[token.attrIndex('src')][1] =
      `http://localhost:1337` + token.attrs[token.attrIndex('src')][1]
    token.attrs.push(['width', '100%'])
    return old(tokens, idx, options, env, slf)
  }
  Vue.prototype.$md = md

}
